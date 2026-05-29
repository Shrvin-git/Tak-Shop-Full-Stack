import { cookies } from "next/headers";
import connectToDB from "../../../../../configs/db";
import { verifyAccessToken } from "@/utils/auth";
import UserModel from "@/models/User";

export async function GET() {
  await connectToDB();

  const token = cookies().get("token");
  let user = null;

  if (token?.value) {
    const tokenPayload = await verifyAccessToken(token.value);

    if (tokenPayload) {
      user = await UserModel.findOne({ _id: tokenPayload._id }).select(
        "-__v -refreshToken -password",
      );
    }

    return Response.json({ user }, { status: 200 });
  } else {
    return Response.json({ message: "Not Access!!" }, { status: 401 });
  }
}
