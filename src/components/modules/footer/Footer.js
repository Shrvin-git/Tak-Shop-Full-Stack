import Link from "next/link";
import CopyRight from "./CopyRight";
import styles from "./Footer.module.css";

function Footer() {
  return (
    <div className={styles["footer"]}>
      <div className="container">
        <footer className={styles["footer"]}>
          <div className={styles["container"]}>
            <div className={styles["footer-top"]}>
              <div className={styles["footer-top__right"]}>
                <div className="logo-site">
                  <Link href={"./"}>
                    <img src="/logo/Vector.png" alt="Tak Shop Logo" />
                    <span>تک شاپ</span>
                  </Link>
                </div>

                <p className={styles["footer-top__right__text"]}>
                  فروشگاه اینترنتی تک شاپ فعالیت خود را از سال 1400 آغاز کرد و
                  هدف اصلی آن ارائه بهترین و جدیدترین کالهای دیجیتال با قیمت
                  مناسب و تضمین اصالت کالا است. با تیمی متخصص و پشتیبانی قوی، ما
                  تلاش می کنیم تا تجربه خریدی راحت و مطمئن را برای شما فراهم
                  کنیم.
                </p>
              </div>

              <div className={styles["footer-top__links"]}>
                <div
                  className={`${styles["footer_links"]} ${styles["category_links"]}`}
                >
                  <h2>دسته بندی</h2>
                  <ul>
                    <li>
                      <Link href={"#"}>موبایل</Link>
                    </li>
                    <li>
                      <Link href={"#"}>لپ تاب</Link>
                    </li>
                    <li>
                      <Link href={"#"}>لوازم جانبی لپ تاب</Link>
                    </li>
                    <li>
                      <Link href={"#"}>دوربین</Link>
                    </li>
                    <li>
                      <Link href={"#"}>ساعت هوشمند</Link>
                    </li>
                  </ul>
                </div>

                <div className={`${styles["footer_links"]} ${styles["links"]}`}>
                  <h2>لینک ها</h2>
                  <ul>
                    <li>
                      <Link href={"#"}>تماس با ما</Link>
                    </li>
                    <li>
                      <Link href={"#"}>درباره ما</Link>
                    </li>
                    <li>
                      <Link href={"#"}>سوالات متداول</Link>
                    </li>
                    <li>
                      <Link href={"#"}>لوازم شرایط و قوانین</Link>
                    </li>
                    <li>
                      <Link href={"#"}>حریم خصوصی</Link>
                    </li>
                  </ul>
                </div>

                <div
                  className={`${styles["footer_links"]} ${styles["services_links"]}`}
                >
                  <h2>خدمات</h2>
                  <ul>
                    <li>
                      <Link href={"#"}>پیگیری خرید</Link>
                    </li>
                    <li>
                      <Link href={"#"}>گارانتی</Link>
                    </li>
                    <li>
                      <Link href={"#"}>روش های پرداخت</Link>
                    </li>
                    <li>
                      <Link href={"#"}>روش های سفارش</Link>
                    </li>
                    <li>
                      <Link href={"#"}>خدمات پس از فروش</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className={styles["footer-bottom"]}>
              <div className={styles["footer-bottom__right"]}>
                <div className={styles["site-information_wrapper"]}>
                  <div className={styles["site-information"]}>
                    <div className={styles["email"]}>
                      <img src="/svgs/email.svg" alt="" />
                      <span>پست الکترونیکی</span>
                    </div>
                    <p>takshoppp@gmail.com</p>
                  </div>

                  <div className={styles["site-information"]}>
                    <div className={styles["location"]}>
                      <img src="/svgs/location.svg" alt="" />
                      <span>آدرس</span>
                    </div>
                    <p>تهران - ولیعصر - پلاک 188</p>
                  </div>

                  <div className={styles["site-information"]}>
                    <div className={styles["phone"]}>
                      <img src="/svgs/phone.svg" alt="" />
                      <span>تلفن</span>
                    </div>
                    <p>021-12345678</p>
                  </div>
                </div>
              </div>

              <div className={styles["footer-bottom__left"]}>
                <div className={styles["social-media__wrapper"]}>
                  <div className={styles["social-media_item"]}>
                    <img src="/svgs/telegram.svg" alt="" />
                  </div>
                  <div className={styles["social-media_item"]}>
                    <img src="/svgs/twitter.svg" alt="" />
                  </div>
                  <div className={styles["social-media_item"]}>
                    <img src="/svgs/instagram.svg" alt="" />
                  </div>
                  <div className={styles["social-media_item"]}>
                    <img src="/svgs/facebook.svg" alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
      <CopyRight />
    </div>
  );
}

export default Footer;
