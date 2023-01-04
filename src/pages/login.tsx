// import type { GetStaticProps, NextPage } from "next";
// import { signIn, useSession } from "next-auth/react";
// import { NextRouter, useRouter } from "next/router";
// import { useEffect } from "react";

// const styles = {
//   centerScreen: "flex justify-center items-center bg-slate-700 ",
//   loginBtn:
//     "bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded m-4",
// };

// const Login: NextPage = () => {
//   const { status }: { status: string } = useSession();
//   const router: NextRouter = useRouter();

//   console.log(status);

//   useEffect(() => {
//     if (status === "authenticated") {
//       router.push("/dashboard");
//     }
//   }, [status, router]);

//   if (status === "loading")
//     return <div className={styles.centerScreen}>Loading...</div>;

//   return (
//     <div
//       className={styles.centerScreen}
//       style={{
//         minHeight: "85.6vh",
//       }}
//     >
//       {status === "unauthenticated" && (
//         <button
//           className={styles.loginBtn}
//           onClick={() =>
//             signIn(
//               "google",
//               {
//                 callbackUrl: "http://localhost:3000/shortener",
//               },
//               { prompt: "login" }
//             )
//           }
//         >
//           Sign in with Google
//         </button>
//       )}
//     </div>
//   );
// };

// export default Login;

import React from "react";

const login = () => {
  return <div>login</div>;
};

export default login;
