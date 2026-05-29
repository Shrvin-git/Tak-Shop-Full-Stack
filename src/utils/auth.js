import { compare, hash } from "bcryptjs";
import { sign, verify } from "jsonwebtoken";

const hashPassword = async (password) => {
  const hashedPassword = await hash(password, 10);
  return hashedPassword;
};

const verifyPassword = async (password, hashedPassword) => {
  const isValidPass = await compare(password, hashedPassword);
  return isValidPass;
};

const generateAccessToken = async (data) => {
  const token = await sign(data, process.env.ACCESS_TOKEN_SECRET_KEY, {
    expiresIn: "60d",
  });
  return token;
};

const verifyAccessToken = async (token) => {
  try {
    const tokenPayLoad = verify(token, process.env.ACCESS_TOKEN_SECRET_KEY);
    return tokenPayLoad;
  } catch (err) {
    console.log("Verify Access Token Error ->", err);
    return false;
  }
};
export { hashPassword, generateAccessToken, verifyAccessToken, verifyPassword };
