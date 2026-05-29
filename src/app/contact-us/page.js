import Form from "@/components/templates/contact-us/Form";
import styles from "@/styles/contact-us.module.css";

function page() {
  return (
    <div className={styles["contact-us"]}>
      <div className="container">
        <div className={styles["contact-us-wrapper"]}>
          <div className={styles["contact-us-right"]}>
            <h1>ارتباط با تک شاپ</h1>
            <p>
              اگه مطمئن نیستی دقیقاً چی نیاز داری، اشکالی نداره! فقط اطلاعات
              تماس‌ت رو وارد کن و یه توضیح کوچیک درباره مشکلت یا سوالت برامون
              بنویس. ما اینجاییم تا راهنمایی‌ت کنیم. کارشناسان تک‌شاپ خیلی زود
              باهات تماس می‌گیرن و کمکت می‌کنن بهترین تصمیم رو بگیری.
            </p>

            <div className={styles["info"]}>
              <div>
                <img src="./svgs/gmail.svg" alt="" />
                takshoppp@gmail.com
              </div>
              <div>
                <img src="./svgs/location-icon.svg" alt="" />
                تهران - ولیعصر - پلاک 188
              </div>
              <div>
                <img src="./svgs/phone-icon.svg" alt="" />
                021-12345678
              </div>
            </div>
          </div>
          <Form />
        </div>
      </div>
    </div>
  );
}

export default page;
