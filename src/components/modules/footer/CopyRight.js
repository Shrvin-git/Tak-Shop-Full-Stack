import styles from "./Footer.module.css";


function CopyRight() {
  return (
    <div className={styles["copy_righr_wrapper"]}>
      <img src="./images/svgs/copy-logo.svg" alt="" />
      <span>
        - تمامی حقوق محفوظ است. لطفا برای استفاده از محتوای ما، با ما در تماس
        باشید! -
      </span>
    </div>
  );
}

export default CopyRight;
