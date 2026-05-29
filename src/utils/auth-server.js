import { cookies } from "next/headers";
import connectToDB from "../../configs/db";
import { verifyAccessToken } from "./auth";
import UserModel from "@/models/User";

const authUser = async () => {
  await connectToDB();

  const token = cookies().get("token");
  let user = null;

  if (token?.value) {
    const tokenPayLoad = await verifyAccessToken(token.value);

    if (tokenPayLoad) {
      user = await UserModel.findById(tokenPayLoad._id);
    }
  }

  return user;
};

const authAdmin = async () => {
  await connectToDB();
  const token = cookies().get("token");
  let user = null;

  if (token) {
    const tokenPayload = verifyAccessToken(token.value);
    if (tokenPayload) {
      user = await UserModel.findById(tokenPayload._id);
      if (user.role === "ADMIN") {
        return user;
      } else {
        return null;
      }
    } else {
      return null;
    }
  } else {
    return null;
  }

  return user;
};

export { authUser, authAdmin };
