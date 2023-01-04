import { NextPage } from "next";
import React from "react";
import Link from "next/link";
import { useSession, signOut, signIn } from "next-auth/react";

import Image from "next/image";

const styles = {
  mainDiv:
    "flex items-center min-h-[64px] justify-center px-3 md:px-10 p-3 text-white bg-slate-800",
  navUlStyles: "flex items-center justify-around",
  loginBtn:
    "bg-gray-700 hover:bg-gray-900 text-white font-semibold py-[5px] px-4 w-28 sm:w-32 rounded-lg transition",
  listItem: "hover:text-gray-300 transition cursor-pointer",
};

const Navbar: NextPage = () => {
  const { data, status } = useSession();

  let rightSide;

  if (status === "loading") {
    rightSide = null;
  } else {
    rightSide =
      status === "authenticated" ? (
        <div className="flex items-center justify-center">
          <Link href="/dashboard">
            <a className="md:text-base text-sm font-semibold ml-2">
              <div className="flex flex-col md:flex-row items-center justify-center">
                <Image
                  src={data?.user?.image as any}
                  alt="Picture of the author"
                  className="rounded-full "
                  width={40}
                  height={40}
                />

                <span className="ml-2">{data?.user?.name}</span>
              </div>
            </a>
          </Link>

          <button
            onClick={() =>
              signOut({
                callbackUrl: process.env.NEXT_PUBLIC_CLIENT_URL as string,
              })
            }
            className="bg-gray-700 hover:bg-gray-900 text-white font-semibold text-sm md:text-base y-[5px] md:px-2 px-1 py-[6px] w-28 sm:w-24 rounded-lg transition ml-4"
          >
            Log out
          </button>
        </div>
      ) : (
        <button
          onClick={() =>
            signIn(
              "google",
              {
                callbackUrl: (process.env.NEXT_PUBLIC_CLIENT_URL +
                  "/shortener") as string,
              },
              { prompt: "login" }
            )
          }
          className={styles.loginBtn}
        >
          Login
        </button>
      );
  }

  return (
    <div
      className={styles.mainDiv}
      style={{
        fontFamily: "Montserrat",
      }}
    >
      <div className="flex-1 text-xl md:text-3xl font-bold">
        <Link href="/">
          <a>Url Shortener</a>
        </Link>
      </div>
      <nav className="flex-1 hidden md:block">
        {/* <ul className={styles.navUlStyles}>
          <li className={styles.listItem}>
            <Link href="/">
              <a>Home</a>
            </Link>
          </li>
          <li className={styles.listItem}>
            <Link href="/categories">
              <a>Categories</a>
            </Link>
          </li>
          <li className={styles.listItem}>
            <Link href="/events">
              <a>Events</a>
            </Link>
          </li>
          <li className={styles.listItem}>
            <Link href="/teams">
              <a>Teams</a>
            </Link>
          </li>
          <li className={styles.listItem}>
            <Link href="/profiles">
              <a>Profiles</a>
            </Link>
          </li> 
        </ul>*/}
      </nav>
      <div className="flex flex-row-reverse flex-1">{rightSide}</div>
    </div>
  );
};

export default Navbar;
