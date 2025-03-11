import "../styles/globals.css";
import Head from "next/head";
import UserState from "../contexts/userContext";
import Router from "next/router";
import cookie from "js-cookie";
import { useEffect } from "react";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    if (!cookie.get("token")) {
      Router.push("/signup")
    }
  }, [])
  return (
    <UserState>
      <Head>
        <link rel="icon" href="/favicon.png" />
        <meta
          name="description"
          content="full-stack social media webapp built with nextjs."
        />
        <title>microgram</title>
      </Head>
      <Component {...pageProps} />
    </UserState >
  );
}
export default MyApp;
