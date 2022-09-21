import type { GetStaticProps, NextPage } from "next";
import { signIn, useSession } from "next-auth/react";
import { NextRouter, useRouter } from "next/router";
import { useEffect } from "react";

const styles = {
  centerScreen: "flex justify-center items-center h-screen",
  loginBtn:
    "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-4",
};

const Login: NextPage = () => {
  const { status }: { status: string } = useSession();
  const router: NextRouter = useRouter();

  console.log(status);

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/dashboard");
    }
  }, [status, router]);

  if (status === "loading")
    return <div className={styles.centerScreen}>Loading...</div>;

  return (
    <div className={styles.centerScreen}>
      {status === "unauthenticated" && (
        <button
          className={styles.loginBtn}
          onClick={() =>
            signIn(
              "github",
              {
                callbackUrl: "http://localhost:3000/dashboard",
              },
              { prompt: "login" }
            )
          }
        >
          Sign in with github
        </button>
      )}
    </div>
  );
};

export default Login;
