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
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tenetur vel,
          porro quibusdam voluptate aut temporibus numquam debitis totam iure
          perferendis obcaecati aliquam adipisci suscipit id at assumenda
          ducimus sint aliquid vitae, explicabo quis. Dolore suscipit officia
          vel quisquam explicabo, sunt fugiat omnis nostrum rerum, quidem harum
          porro dolores reprehenderit repellat. Pariatur nesciunt, eveniet
          officiis quia ex consequatur ducimus corrupti maxime, facere tenetur
          sapiente natus vero, quasi deserunt! Officiis totam animi nisi,
          possimus numquam vitae dolore corrupti perferendis vel provident.
          Sapiente similique doloribus voluptatem qui aut. Soluta odio autem,
          blanditiis dolores minus error laudantium doloribus, eius obcaecati
          praesentium, possimus amet earum fugiat nulla sequi? Error hic
          perspiciatis quam laborum ullam asperiores nulla, aut eligendi est
          illum deleniti enim at? Optio, excepturi?
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
