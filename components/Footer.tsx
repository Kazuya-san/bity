import { NextPage } from "next";
import React from "react";
import Link from "next/link";

const styles = {
  mainDiv:
    "flex items-center justify-center p-3 text-white text-sm bg-slate-800",
  navUlStyles: "flex items-center justify-around",
};

const Footer: NextPage = () => {
  return (
    <div
      className={styles.mainDiv}
      style={{
        fontFamily: "Montserrat",
      }}
    >
      Copyright &copy; {new Date().getFullYear()} GetmyTeam
    </div>
  );
};

export default Footer;