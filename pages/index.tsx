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
    "bg-orange-600 hover:bg-orange-700 text-center text-white font-bold text-sm px-4 sm:w-1/2 py-[0.8rem] rounded-full transition mt-3",
  center: "flex justify-center items-center",
};

const Landing: NextPage = () => {
  return (
    <>
      <div
        className={`sm:flex block items-center min-h-[70.6vh] bg-[#37517E]`}
        style={{
          fontFamily: "Montserrat",
        }}
      >
        {/* LEFT SIDE */}
        <div
          className={`flex sm:w-[50%] w-full flex-col items-center justify-center pt-5 sm:h-full text-center sm:text-left text-slate-200`}
        >
          <div className="flex flex-col w-full sm:w-5/6 md:w-4/6 items-center justify-center h-full">
            <h1 className="text-3xl mx-8 md:text-4xl text-white font-medium p-4 sm:p-0 text-center lg:text-6xl mb-5">
              Get your Links Shortened!
            </h1>
            <p className="font-light text-sm mb-5 text-center p-4 sm:p-0">
              Easy way to get your links shortened and share them with your
              within your buisness or with your friends. We provide an easy to
              use API that can handle all your Needs
            </p>

            <Link href="/shortener">
              <a className={styles.logoutBtn}>Get Started</a>
            </Link>
          </div>
        </div>
        {/* RIGHT SIDE */}

        <div
          className={`flex items-center sm:w-[40%] pb-5 pt-5 sm:pb-0 sm:pt-0 w-full justify-center sm:h-full text-white`}
        >
          <div
            className="ml-2 flex items-center bg-[#2c4267] justify-center rounded-br-full rounded-tl-full sm:mt-0 sm:ml-0"
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

      {/* create an about section */}

      <div className="flex flex-col items-center justify-center min-h-[70.6vh]">
        <h1 className="text-3xl mx-8 md:text-4xl text-[#37517E] font-medium p-4 sm:p-0 text-center lg:text-6xl mb-5">
          About
        </h1>

        <p className="font-light w-4/6 text-sm mb-5 text-center p-4 sm:p-0">
          Our website, [website name], is the leading platform for URL
          shortening services. Our goal is to make sharing links on the internet
          as easy and convenient as possible. Our user-friendly interface allows
          you to quickly and easily shorten any long or complicated URL into a
          shorter, more manageable link. With our platform, you can create short
          links for a variety of purposes, including sharing on social media,
          messaging apps, email, and more. In addition to basic link shortening,
          our website also offers advanced features such as link tracking and
          analytics. This allows you to track clicks, views, and other metrics
          on your shortened links, providing valuable insights into the
          performance of your marketing campaigns. You can also customize your
          links with your own branded domain, giving your business a
          professional and polished look. Security is a top priority for us, and
          we ensure that all links created on our platform are encrypted and
          secure. We also offer a range of pricing plans to suit different
          needs, from personal use to businesses. Our basic plan is free and
          perfect for individuals and small business, while our premium plan
          offers advanced features and support for larger businesses. If you are
          looking for a reliable and user-friendly URL shortening service, look
          no further than [website name]. Sign up now and start shortening your
          links today.
        </p>
      </div>

      <div className="flex flex-col bg-[#37517E] items-center justify-center min-h-[70.6vh]">
        <h1 className="text-3xl mx-8 md:text-4xl text-white font-medium p-4 sm:p-0 text-center lg:text-6xl mb-5">
          Contact Us
        </h1>

        {/* create a form */}

        <form className="flex flex-col items-center justify-center">
          <input
            type="text"
            placeholder="Name"
            className="h-12 border-2 border-[#2c4267] rounded-lg mb-5 p-4 w-[55vw]"
          />
          <input
            type="text"
            placeholder="Email"
            className="h-12 border-2 border-[#2c4267] rounded-lg mb-5 p-4 w-[55vw]"
          />
          <textarea
            placeholder="Message"
            className="border-2 border-[#2c4267] rounded-lg mb-5 w-[55vw] p-4"
            rows={5}
          />

          <button className="bg-[#273959] hover:bg-[#3a5686] text-center text-white font-bold text-sm px-4 sm:w-1/2 py-[0.8rem] rounded-full transition mt-3">
            Send
          </button>
        </form>
      </div>
    </>
  );
};

// export const getServerSideProps: GetServerSideProps = async (context) => {

export default Landing;
