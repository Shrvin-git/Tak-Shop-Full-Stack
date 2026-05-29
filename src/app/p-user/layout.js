// app/p-user/layout.js
import SideBar from "@/components/modules/user-panel/Sidebar";
import styles from "@/styles/p-user/UserPanelLayout.module.css";
import { authUser } from "@/utils/auth-server";
import { ProfileImageProvider } from "@/context/ProfileImageContext";
import Topbar from "@/components/modules/user-panel/Topbar";

export default async function UserPanelLayout({ children }) {
  const user = await authUser();

  return (
    <ProfileImageProvider>
      <div className={styles.main}>
        <div className="container">
          <Topbar />
          <div className={styles["profile-content-wrapper"]}>
            <SideBar />
            <div className={styles["user-panel-container"]}>{children}</div>
          </div>
        </div>
      </div>
    </ProfileImageProvider>
  );
}
