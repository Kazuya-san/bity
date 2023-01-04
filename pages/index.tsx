import { GetServerSideProps, GetStaticProps, NextPage } from "next";
import React from "react";
import prisma from "../lib/prisma";
import Image from "next/image";
import heroImg from "../public/hero11.png";
import Link from "next/link";
// import { options } from "./api/auth/[...nextauth]";
// import { unstable_getServerSession } from "next-auth";

const styles = {
  centerScreen: "flex justify-center items-center h-screen",
  logoutBtn:
    "bg-orange-600 hover:bg-orange-700 text-center text-white font-bold text-sm px-2 sm:w-1/2 py-[0.8rem] rounded-full transition mt-3",
  center: "flex justify-center items-center",
};

const Landing: NextPage = () => {
  return (
    <>
      <div
        className={`sm:flex block items-center min-h-[85.6vh] bg-slate-900`}
        style={{
          fontFamily: "Montserrat",
        }}
      >
        {/* LEFT SIDE */}
        <div
          className={`flex sm:w-[50%] w-full flex-col items-center justify-center pt-5 sm:h-full text-center sm:text-left text-slate-200`}
        >
          <div className="flex flex-col items-center justify-center h-full">
            <h1 className="text-3xl mx-8 md:text-4xl font-medium p-4 sm:p-0 text-center lg:text-6xl mb-5">
              Get your Link Shortened!
            </h1>
            <p className="font-light text-sm mb-5 text-center p-4 sm:p-0">
              Easy way to get your links shortened and share them with your
              friends.
            </p>

            <Link href="/shortener">
              <a className={styles.logoutBtn}>Get Started</a>
            </Link>
          </div>
        </div>
        {/* RIGHT SIDE */}

        <div
          className={`flex items-center sm:w-[50%] pb-5 pt-5 sm:pb-0 sm:pt-0 w-full justify-center sm:h-full text-white`}
        >
          <div
            className="ml-2 flex items-center bg-slate-800 justify-center rounded-br-full rounded-tl-full sm:mt-0 sm:ml-0"
            // style={{
            //   width: "500px",
            //   height: "500px",
            // }}
          >
            <Image
              src={heroImg}
              alt="Picture of the author"
              // width="605px"
              // height="555px"
            />
          </div>
        </div>
      </div>
    </>
  );
};

// export const getServerSideProps: GetServerSideProps = async (context) => {

export default Landing;
