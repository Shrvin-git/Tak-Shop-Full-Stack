export const dynamic = "force-dynamic";
export const runtime = "nodejs";

import UserModel from "@/models/User";

export async function GET() {
  const users = await UserModel.find({});

  return Response.json({ users }, { status: 200 });
}
