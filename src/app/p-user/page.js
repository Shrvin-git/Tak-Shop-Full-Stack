import PersonalInformation from "@/components/templates/user-panel/personal-information/PersonalInformation";
import { authUser } from "@/utils/auth-server";
import UserModel from "@/models/User";
import { redirect } from "next/navigation";

export default async function profilePage() {
  const user = await authUser();
  if (!user) {
    redirect("/");
  }

  const findUser = await UserModel.findOne({ _id: user._id }).lean();

  return (
    <div>
      <PersonalInformation user={JSON.parse(JSON.stringify(findUser))} />
    </div>
  );
}
