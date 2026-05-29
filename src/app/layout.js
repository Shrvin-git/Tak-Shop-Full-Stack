import "./globals.css";
import "@/styles/swal-custom.css";
import ClientLayoutController from "@/components/layouts/ClientLayoutContorollers";
import ThemeProvider from "@/providers/ThemeProvider";
import { authUser } from "@/utils/auth-server";
import UserModel from "@/models/User";

export default async function RootLayout({ children }) {
  const user = await authUser();
  let findUser = null;
  if (user) {
    findUser = await UserModel.findById({ _id: user._id });
  }

  return (
    <html lang="fa" dir="rtl">
      <body>
        <ThemeProvider>
          <ClientLayoutController user={JSON.parse(JSON.stringify(findUser))}>
            {children}
          </ClientLayoutController>
        </ThemeProvider>
      </body>
    </html>
  );
}
