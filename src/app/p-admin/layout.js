import Sidebar from "@/components/modules/admin-panel/Sidebar";
import Topbar from "@/components/modules/admin-panel/Topbar";
import styles from "@/styles/p-admin/AdminPanelLayout.module.css";

function AdminPanelLayout({ children }) {
  return (
    <div className={styles.main}>
      <div className={styles["dashboard-wrapper"]}>
        <Topbar />
        <div className={styles["main-dashboard"]}>
          <Sidebar />
          <div className={styles["dashboard-content"]}>{children}</div>
        </div>
      </div>
    </div>
  );
}

export default AdminPanelLayout;
