"use client";

import Login from "@/components/templates/login-register/Login";
import SignUp from "@/components/templates/login-register/SignUp";
import styles from "@/styles/loginRegister.module.css";
import { useState } from "react";

function page() {
  const [authType, setAuthType] = useState("login");

  const showRegisterForm = () => setAuthType("register");
  const showloginForm = () => setAuthType("login");

  return (
    <div className={styles.main}>
      <div className={styles.sign_up}>
        <div className={styles.sign_up_wrapper}>
          {authType === "login" ? (
            <Login showRegisterForm={showRegisterForm} />
          ) : (
            <SignUp showloginForm={showloginForm} />
          )}
        </div>
      </div>
    </div>
  );
}

export default page;
