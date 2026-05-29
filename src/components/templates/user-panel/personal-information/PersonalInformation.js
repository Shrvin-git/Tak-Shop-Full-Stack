"use client";

import UserPanelHeader from "@/components/modules/user-panel/UserPanelHeader";
import styles from "./PersonalInformation.module.css";
import { useState } from "react";
import { showSwal } from "@/utils/helper";
import { useRouter } from "next/navigation";
import ChangeProfileIcon from "@/components/modules/svgs/ChangeProfileIcon";
import { useContext } from "react";
import { ProfileImageContext } from "@/context/ProfileImageContext";

function PersonalInformation({ user }) {
  const { selectedImage } = useContext(ProfileImageContext);

  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);
  const [address, setAddress] = useState(user.address);
  const [postalCode, setPostalCode] = useState(user.postalCode || "");

  const updateUserInfo = async (e, id) => {
    e.preventDefault();

    const formData = new FormData();
    if (selectedImage) {
      formData.append("image", selectedImage);
    }
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("address", address);
    formData.append("postalCode", postalCode);

    const res = await fetch(`/api/user/${id}`, {
      method: "PUT",
      body: formData, // بدون هدر Content-Type
    });

    const data = await res.json();

    if (res.status === 200) {
      showSwal(
        "موفق",
        "اطلاعات با موفقیت آپدیت شدند",
        "success",
        "فهمیدم",
        () => {
          window.location.reload();
        },
      );
    }
  };

  return (
    <div
      id={styles["main-info"]}
      className={`${styles["user-profile-content"]} ${styles["user-panel"]} ${styles["user-panel--active"]}`}
      style={{ display: "block" }}
    >
      {
        <UserPanelHeader
          title={"اطلاعات فردی"}
          desc={
            "در این بخش شما میتوانید اطلاعات فردی خودتون رو مشاهده یا ویرایش کنید"
          }
        />
      }

      <form
        onSubmit={(e) => updateUserInfo(e, user._id)}
        id={styles["edit-info"]}
      >
        {/* <!--نام--> */}
        <div className={styles["form-items"]}>
          <label htmlFor="name">نام</label>
          <div className={styles["input-wrapper"]}>
            <div className={styles["input-right"]}>
              <svg
                width="18"
                height="21"
                viewBox="0 0 18 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16.6188 19.75C16.6188 16.148 12.6028 13.22 9.00081 13.22C5.39881 13.22 1.38281 16.148 1.38281 19.75M9.00081 9.956C10.1553 9.956 11.2625 9.49738 12.0788 8.68104C12.8952 7.86469 13.3538 6.75749 13.3538 5.603C13.3538 4.44851 12.8952 3.34131 12.0788 2.52496C11.2625 1.70862 10.1553 1.25 9.00081 1.25C7.84633 1.25 6.73912 1.70862 5.92278 2.52496C5.10643 3.34131 4.64781 4.44851 4.64781 5.603C4.64781 6.75749 5.10643 7.86469 5.92278 8.68104C6.73912 9.49738 7.84633 9.956 9.00081 9.956Z"
                  stroke="#2A2A2A"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>

              <input
                value={`${firstName}`}
                type="text"
                name="name"
                id={styles["name-family"]}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className={styles["edit-btn"]}>
              <ChangeProfileIcon className={styles.change_profile} />
            </div>
          </div>
        </div>

        {/* <!-- نام خانوادگی --> */}
        <div className={styles["form-items"]}>
          <label htmlFor="name"> نام خانوادگی</label>
          <div className={styles["input-wrapper"]}>
            <div className={styles["input-right"]}>
              <svg
                width="18"
                height="21"
                viewBox="0 0 18 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16.6188 19.75C16.6188 16.148 12.6028 13.22 9.00081 13.22C5.39881 13.22 1.38281 16.148 1.38281 19.75M9.00081 9.956C10.1553 9.956 11.2625 9.49738 12.0788 8.68104C12.8952 7.86469 13.3538 6.75749 13.3538 5.603C13.3538 4.44851 12.8952 3.34131 12.0788 2.52496C11.2625 1.70862 10.1553 1.25 9.00081 1.25C7.84633 1.25 6.73912 1.70862 5.92278 2.52496C5.10643 3.34131 4.64781 4.44851 4.64781 5.603C4.64781 6.75749 5.10643 7.86469 5.92278 8.68104C6.73912 9.49738 7.84633 9.956 9.00081 9.956Z"
                  stroke="#2A2A2A"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>

              <input
                value={`${lastName}`}
                type="text"
                name="name"
                onChange={(e) => setLastName(e.target.value)}
                id={styles["name-family"]}
              />
            </div>
            <div className={styles["edit-btn"]}>
              <ChangeProfileIcon className={styles.change_profile} />
            </div>
          </div>
        </div>

        {/* <!-- ایمیل --> */}
        <div className={styles["form-items"]}>
          <label htmlFor="email"> ایمیل </label>
          <div className={styles["input-wrapper"]}>
            <div className={styles["input-right"]}>
              <svg
                width="28"
                height="25"
                viewBox="0 0 28 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_424_10899)">
                  <path
                    d="M25.4294 22.7857H3.14369C1.72084 22.7857 0.572266 21.6372 0.572266 20.2143V4.78572C0.572266 3.36287 1.72084 2.21429 3.14369 2.21429H25.4294C26.8523 2.21429 28.0008 3.36287 28.0008 4.78572V20.2143C28.0008 21.6372 26.8523 22.7857 25.4294 22.7857ZM3.14369 3.92858C2.66369 3.92858 2.28655 4.30572 2.28655 4.78572V20.2143C2.28655 20.6943 2.66369 21.0714 3.14369 21.0714H25.4294C25.9094 21.0714 26.2866 20.6943 26.2866 20.2143V4.78572C26.2866 4.30572 25.9094 3.92858 25.4294 3.92858H3.14369Z"
                    fill="#2A2A2A"
                  ></path>
                  <path
                    d="M14.2856 15.86C13.0856 15.86 11.9884 15.38 11.1656 14.5057L2.16558 4.94001C1.83987 4.59715 1.85701 4.04858 2.19987 3.72286C2.54273 3.39715 3.0913 3.41429 3.41701 3.75715L12.417 13.3229C13.3942 14.3686 15.177 14.3686 16.1542 13.3229L25.1542 3.77429C25.4799 3.43144 26.0284 3.41429 26.3713 3.74001C26.7142 4.06572 26.7313 4.61429 26.4056 4.95715L17.4056 14.5229C16.5827 15.3972 15.4856 15.8771 14.2856 15.8771V15.86Z"
                    fill="#2A2A2A"
                  ></path>
                </g>
                <defs>
                  <clipPath id={styles["clip0_424_10899"]}>
                    <rect
                      width="27.4286"
                      height="24"
                      fill="white"
                      transform="translate(0.572266 0.5)"
                    ></rect>
                  </clipPath>
                </defs>
              </svg>

              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
                id={styles["email"]}
              />
            </div>
            <div className={styles["edit-btn"]}>
              <ChangeProfileIcon className={styles.change_profile} />
            </div>
          </div>
        </div>

        {/* <!-- شماره تماس --> */}
        <div className={styles["form-items"]}>
          <label htmlFor="tel"> شماره تماس </label>
          <div className={styles["input-wrapper"]}>
            <div className={styles["input-right"]}>
              <svg
                width="16"
                height="21"
                viewBox="0 0 16 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.57039 6.38699C1.28389 4.49999 2.61439 2.80499 4.64689 2.18399C5.00758 2.07446 5.39643 2.1062 5.73458 2.27277C6.07274 2.43934 6.33489 2.72828 6.46789 3.08099L7.12039 4.82099C7.22543 5.10091 7.24442 5.40583 7.17493 5.69663C7.10544 5.98742 6.95064 6.25081 6.73039 6.45299L4.78939 8.23049C4.69359 8.3182 4.62222 8.42929 4.58225 8.55287C4.54228 8.67645 4.53509 8.8083 4.56139 8.93549L4.57939 9.01349L4.62589 9.20849C4.86788 10.1558 5.23565 11.0664 5.71939 11.916C6.24757 12.8181 6.90222 13.64 7.66339 14.3565L7.72339 14.4105C7.82029 14.4965 7.93782 14.5559 8.06453 14.583C8.19123 14.6101 8.3228 14.6039 8.44639 14.565L10.9559 13.7745C11.2411 13.6849 11.5465 13.6827 11.833 13.7679C12.1195 13.8532 12.374 14.0221 12.5639 14.253L13.7519 15.6945C14.2469 16.2945 14.1869 17.1765 13.6184 17.706C12.0629 19.1565 9.92389 19.4535 8.43589 18.258C6.61116 16.7875 5.07342 14.993 3.89989 12.9645C2.71487 10.9387 1.92546 8.70692 1.57039 6.38699ZM6.13339 9.03449L7.74139 7.55849C8.18214 7.1543 8.49204 6.62759 8.63129 6.046C8.77054 5.46441 8.73279 4.85447 8.52289 4.29449L7.87189 2.55449C7.60482 1.84465 7.07755 1.26308 6.39721 0.927925C5.71686 0.592766 4.93444 0.529148 4.20889 0.749992C1.68439 1.52249 -0.342112 3.78599 0.0868879 6.61349C0.386888 8.58749 1.07839 11.0985 2.60389 13.7205C3.87006 15.9077 5.52881 17.8425 7.49689 19.428C9.72889 21.2205 12.7079 20.6085 14.6429 18.8055C15.1966 18.29 15.5326 17.5826 15.5825 16.8277C15.6324 16.0729 15.3924 15.3274 14.9114 14.7435L13.7234 13.3005C13.3433 12.8392 12.8342 12.502 12.2612 12.332C11.6882 12.162 11.0775 12.1671 10.5074 12.3465L8.42389 13.002C7.8859 12.4474 7.4147 11.8317 7.01989 11.1675C6.63891 10.4958 6.34169 9.77998 6.13489 9.03599"
                  fill="#2A2A2A"
                ></path>
              </svg>

              <input
                onChange={(e) => setPhone(e.target.value)}
                value={phone}
                type="tel"
                id={styles["tel"]}
              />
            </div>
            <div className={styles["edit-btn"]}>
              <ChangeProfileIcon className={styles.change_profile} />
            </div>
          </div>
        </div>

        {/* <!-- آدرس --> */}
        <div className={styles["form-items"]}>
          <label htmlFor="location"> آدرس </label>
          <div className={styles["input-wrapper"]}>
            <div className={styles["input-right"]}>
              <svg
                width="18"
                height="21"
                viewBox="0 0 18 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.55978 19.32C9.39658 19.4372 9.20071 19.5003 8.99978 19.5003C8.79885 19.5003 8.60298 19.4372 8.43978 19.32C3.61078 15.878 -1.51422 8.798 3.66678 3.682C5.08912 2.28285 7.00462 1.49912 8.99978 1.5C10.9998 1.5 12.9188 2.285 14.3328 3.681C19.5138 8.797 14.3888 15.876 9.55978 19.32Z"
                  stroke="#2A2A2A"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
                <path
                  d="M9 10.5C9.53043 10.5 10.0391 10.2893 10.4142 9.91421C10.7893 9.53914 11 9.03043 11 8.5C11 7.96957 10.7893 7.46086 10.4142 7.08579C10.0391 6.71071 9.53043 6.5 9 6.5C8.46957 6.5 7.96086 6.71071 7.58579 7.08579C7.21071 7.46086 7 7.96957 7 8.5C7 9.03043 7.21071 9.53914 7.58579 9.91421C7.96086 10.2893 8.46957 10.5 9 10.5Z"
                  stroke="#2A2A2A"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>

              <input
                value={address}
                type="text"
                id={styles["location"]}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className={styles["edit-btn"]}>
              <ChangeProfileIcon className={styles.change_profile} />
            </div>
          </div>
        </div>

        {/* <!-- کد پستی --> */}
        <div className={styles["form-items"]}>
          <label htmlFor="post"> کد پستی </label>
          <div className={styles["input-wrapper"]}>
            <div className={styles["input-right"]}>
              <svg
                width="22"
                height="21"
                viewBox="0 0 22 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20.9181 8.625L17.7663 5.12156C17.6432 4.98496 17.4928 4.87573 17.3249 4.80096C17.1569 4.72618 16.9751 4.68753 16.7913 4.6875H10.5625V1.5C10.5625 1.35082 10.5032 1.20774 10.3977 1.10225C10.2923 0.996763 10.1492 0.9375 10 0.9375C9.85082 0.9375 9.70774 0.996763 9.60225 1.10225C9.49676 1.20774 9.4375 1.35082 9.4375 1.5V4.6875H1.75C1.4019 4.6875 1.06806 4.82578 0.821922 5.07192C0.575781 5.31806 0.4375 5.6519 0.4375 6V12C0.4375 12.3481 0.575781 12.6819 0.821922 12.9281C1.06806 13.1742 1.4019 13.3125 1.75 13.3125H9.4375V19.5C9.4375 19.6492 9.49676 19.7923 9.60225 19.8977C9.70774 20.0032 9.85082 20.0625 10 20.0625C10.1492 20.0625 10.2923 20.0032 10.3977 19.8977C10.5032 19.7923 10.5625 19.6492 10.5625 19.5V13.3125H16.7913C16.9751 13.3125 17.1569 13.2738 17.3249 13.199C17.4928 13.1243 17.6432 13.015 17.7663 12.8784L20.9181 9.375C21.0104 9.27187 21.0614 9.13836 21.0614 9C21.0614 8.86164 21.0104 8.72813 20.9181 8.625ZM16.93 12.1266C16.9125 12.146 16.8911 12.1615 16.8672 12.1722C16.8433 12.1828 16.8174 12.1884 16.7913 12.1884H1.75C1.70027 12.1884 1.65258 12.1687 1.61742 12.1335C1.58225 12.0984 1.5625 12.0507 1.5625 12.0009V6C1.5625 5.95027 1.58225 5.90258 1.61742 5.86742C1.65258 5.83225 1.70027 5.8125 1.75 5.8125H16.7913C16.8174 5.81256 16.8433 5.8181 16.8672 5.82876C16.8911 5.83941 16.9125 5.85495 16.93 5.87438L19.7425 9L16.93 12.1266Z"
                  fill="#2A2A2A"
                ></path>
              </svg>

              <input
                value={postalCode}
                type="number"
                id={styles["post"]}
                onChange={(e) => setPostalCode(e.target.value)}
              />
            </div>
            <div className={styles["edit-btn"]}>
              <ChangeProfileIcon className={styles.change_profile} />
            </div>
          </div>
        </div>

        {/* <!--  دکمه تایید --> */}
        <div
          onClick={(e) => updateUserInfo(e, user._id)}
          className={styles["form-items"]}
        >
          <button className={styles.user_info_btn_update}>آپدیت اطلاعات</button>
        </div>
      </form>
    </div>
  );
}

export default PersonalInformation;
