import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import ProtectedRoutes from "../components/ProtectedRoutes";
import { NextRouter, useRouter } from "next/router";

function MyApp({ Component, pageProps }: AppProps<{ session: Session }>) {
  const router: NextRouter = useRouter();

  const authRoutes = ["/dashboard"];

  return (
    <SessionProvider session={pageProps.session}>
      {authRoutes.includes(router.pathname) ? (
        <ProtectedRoutes>
          <Component {...pageProps} />
        </ProtectedRoutes>
      ) : (
        <Component {...pageProps} />
      )}
    </SessionProvider>
  );
}

export default MyApp;
