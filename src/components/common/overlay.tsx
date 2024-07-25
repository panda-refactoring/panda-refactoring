import { NextPage } from "next";
import React from "react";

const Overlay: NextPage = () => {
  return <div className="fixed left-0 top-0 z-40 h-screen w-[390px] bg-black pt-10 opacity-40" />;
};

export default Overlay;
