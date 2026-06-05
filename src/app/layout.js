import "./globals.css";
import "@/styles/swal-custom.css";
import ClientLayoutController from "@/components/layouts/ClientLayoutContorollers";
import ThemeProvider from "@/providers/ThemeProvider";
import { authUser } from "@/utils/auth-server";
import UserModel from "@/models/User";
import connectToDB from "../../configs/db";
import AOSInit from "@/utils/Aos";
import LenisProvider from "@/components/common/LenisProvider";

export default async function RootLayout({ children }) {
  await connectToDB();

  const user = await authUser();

  let findUser = null;

  if (user) {
    findUser = await UserModel.findById(user._id).lean();
  }

  return (
    <html lang="fa" dir="rtl">
      <body>
        <LenisProvider />
        <AOSInit />
        <ThemeProvider>
          <ClientLayoutController user={JSON.parse(JSON.stringify(findUser))}>
            {children}
          </ClientLayoutController>
        </ThemeProvider>
      </body>
    </html>
  );
}
