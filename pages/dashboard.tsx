import React from "react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { NextPage } from "next";

const styles = {
  centerScreen: "flex justify-center items-center h-screen",
  logoutBtn:
    "bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition m-4",
  center: "flex justify-center items-center",
};

const Dashboard: NextPage = () => {
  const { data, status } = useSession();

  if (status === "loading")
    return <div className={styles.centerScreen}>Loading...</div>;

  if (!data) return null;
  return (
    <div className={`${styles.centerScreen} flex-col`}>
      <h1 className="text-4xl">Dashboard</h1>
      <div className={`${styles.center} flex-col`}>
        <Image
          src={data?.user?.image as any}
          alt="Picture of the author"
          className="rounded-full"
          width={100}
          height={100}
        />

        <p>{data?.user?.name}</p>
        <p>{data?.user?.email}</p>
      </div>

      <button
        className={styles.logoutBtn}
        onClick={() =>
          signOut({
            callbackUrl: "http://localhost:3000/login",
          })
        }
      >
        Log out
      </button>
    </div>
  );
};

export default Dashboard;
