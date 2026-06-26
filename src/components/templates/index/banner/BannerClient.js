"use client";

import dynamic from "next/dynamic";

const BannerClient = dynamic(() => import("./Banner"), {
  ssr: false,
});

export default BannerClient;
