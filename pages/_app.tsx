import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import ProtectedRoutes from "../components/ProtectedRoutes";
import { NextRouter, useRouter } from "next/router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function MyApp({ Component, pageProps }: AppProps<{ session: Session }>) {
  const router: NextRouter = useRouter();

  const authRoutes = ["/dashboard", "/create-profile", "/keys"];

  return (
    <SessionProvider session={pageProps.session}>
      <Navbar />
      {authRoutes.includes(router.pathname) ? (
        <ProtectedRoutes>
          <Component {...pageProps} key={router.asPath} />
        </ProtectedRoutes>
      ) : (
        <Component {...pageProps} key={router.asPath} />
      )}
      <Footer />
    </SessionProvider>
  );
}

export default MyApp;
