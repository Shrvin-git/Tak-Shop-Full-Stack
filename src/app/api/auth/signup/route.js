import UserModel from "@/models/User";
import connectToDB from "../../../../../configs/db";
import { generateAccessToken, hashPassword } from "@/utils/auth";

export async function POST(req) {
  await connectToDB();

  try {
    const body = await req.json();
    const { firstName, lastName, userName, password, email, phone } = body;

    if (!firstName || !lastName || !userName || !password) {
      return Response.json(
        { message: "Required fields cannot be empty." },
        { status: 400 },
      );
    }

    if (firstName.length < 2) {
      return Response.json(
        { message: "First name must contain at least 2 characters." },
        { status: 400 },
      );
    }

    if (lastName.length < 2) {
      return Response.json(
        { message: "Last name must contain at least 2 characters." },
        { status: 400 },
      );
    }

    if (userName.length < 4) {
      return Response.json(
        { message: "Username must be at least 4 characters long." },
        { status: 400 },
      );
    }

    if (password.length < 6) {
      return Response.json(
        { message: "Password must contain at least 6 characters." },
        { status: 400 },
      );
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (email && !emailRegex.test(email)) {
      return Response.json(
        { message: "Invalid email address format." },
        { status: 400 },
      );
    }

    const phoneRegex = /^(\+98|0)?9[0-9]{9}$/;

    if (phone && !phoneRegex.test(phone)) {
      return Response.json(
        { message: "Invalid Iranian phone number format." },
        { status: 400 },
      );
    }

    const existingEmail = email ? await UserModel.findOne({ email }) : null;
    const existingPhone = phone ? await UserModel.findOne({ phone }) : null;
    const existingUserName = await UserModel.findOne({ userName });

    if (existingEmail) {
      return Response.json(
        { message: "Email already exists." },
        { status: 400 },
      );
    }

    if (existingPhone) {
      return Response.json(
        { message: "Phone number already exists." },
        { status: 400 },
      );
    }

    if (existingUserName) {
      return Response.json(
        { message: "Username already exists." },
        { status: 400 },
      );
    }

    const user = await UserModel.find({});

    const hashedPassword = await hashPassword(password);
    const accessToken = await generateAccessToken({ userName });

    await UserModel.create({
      firstName,
      lastName,
      userName,
      password: hashedPassword,
      email,
      phone,
      role: user.length >= 1 ? "USER" : "ADMIN",
    });

    return Response.json(
      { message: "User registered successfully." },
      {
        status: 201,
        headers: {
          "Set-Cookie": `token=${accessToken}; Path=/; HttpOnly; Max-Age=${60 * 60 * 24 * 60}; SameSite=Lax`,
        },
      },
    );
  } catch (err) {
    return Response.json(
      { message: "Internal server error.", error: err.message },
      { status: 500 },
    );
  }
}
