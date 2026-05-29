import ShowAll from "@/components/modules/showAll/ShowAll";
import Box from "@/components/templates/admin-panel/index/Box";
import ChartBox from "@/components/templates/admin-panel/index/ChartBox";
import Table from "@/components/templates/admin-panel/index/Table";
import SettingsHeader from "@/components/templates/admin-panel/settings/SettingsHeader";
import ShopInfoForm from "@/components/templates/admin-panel/settings/ShopInfoForm";
import DefaultSetting from "@/components/templates/admin-panel/settings/DefaultSetting";
import styles from "@/styles/p-admin/product.module.css";
import DisplayOptions from "@/components/templates/admin-panel/settings/DisplayOptions";

function page() {
  return (
    <div className={styles["admin-page"]}>
      <div className={styles["admin-page__content"]}>
        <SettingsHeader />
        <ShopInfoForm />
        <DefaultSetting />
        <DisplayOptions />
      </div>
    </div>
  );
}

export default page;
