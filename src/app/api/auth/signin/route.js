import UserModel from "@/models/User";
import connectToDB from "../../../../../configs/db";
import { generateAccessToken, verifyPassword } from "@/utils/auth";

export async function POST(req) {
  await connectToDB();

  try {
    const body = await req.json();
    const { email, password } = body || {};

    // validation
    if (!email || !password) {
      return Response.json(
        { message: "Email and password are required." },
        { status: 400 },
      );
    }

    const trimmedEmail = String(email).trim().toLowerCase();
    const trimmedPassword = String(password).trim();

    if (
      trimmedEmail.length < 5 ||
      trimmedEmail.length > 100 ||
      !trimmedEmail.includes("@")
    ) {
      return Response.json(
        { message: "Invalid email format." },
        { status: 400 },
      );
    }

    if (trimmedPassword.length < 6 || trimmedPassword.length > 100) {
      return Response.json(
        { message: "Password must be at least 6 characters." },
        { status: 400 },
      );
    }

    const findUser = await UserModel.findOne({ email: trimmedEmail });

    if (!findUser) {
      return Response.json({ message: "User not found." }, { status: 401 });
    }

    const isCorrectPassword = await verifyPassword(
      trimmedPassword,
      findUser.password,
    );

    if (!isCorrectPassword) {
      return Response.json(
        { message: "Email or password is incorrect." },
        { status: 401 },
      );
    }

    const accessToken = await generateAccessToken({
      _id: findUser._id.toString(),
      email: findUser.email,
    });

    const maxAge = 60 * 60 * 24 * 60; // 60 days

    return Response.json(
      {
        message: "Login successful.",
        user: {
          _id: findUser._id,
          email: findUser.email,
          name: findUser.name,
        },
      },
      {
        status: 200,
        headers: {
          "Set-Cookie": `token=${accessToken}; Path=/; HttpOnly; Max-Age=${maxAge}; SameSite=Lax${
            process.env.ACCESS_TOKEN_SECRET_KEY === "production"
              ? "; Secure"
              : ""
          }`,
        },
      },
    );
  } catch (err) {
    console.error("LOGIN_ERROR:", err);

    return Response.json(
      { message: "Internal server error." },
      { status: 500 },
    );
  }
}
