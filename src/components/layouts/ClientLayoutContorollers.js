"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import Navbar from "@/components/modules/navbar/Navbar";
import Newsletter from "../modules/newsletter/Newsletter";
import Footer from "../modules/footer/Footer";
import MobileMenu from "../modules/mobile-menu/MobileMenu";

export default function ClientLayoutController({ children, user }) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  // جلوگیری از اجرای قبل از mount
  useEffect(() => {
    setMounted(true);
  }, []);

  // if (!mounted) return null;

  const hiddenPaths = [
    "/p-user",
    "/p-user/profile",
    "/p-user/orders",
    "/p-admin",
  ];

  const shouldHide = hiddenPaths.some((path) => pathname.startsWith(path));

  return (
    <>
      {!shouldHide && <Navbar user={user} />}
      <div>{children}</div>
      {!shouldHide && <Newsletter />}
      {!shouldHide && <Footer />}
      {!shouldHide && <MobileMenu />}
    </>
  );
}
