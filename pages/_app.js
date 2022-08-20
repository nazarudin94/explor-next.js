import Layout from "./components/layout";
import Head from "next/head";
import "../styles/globals.css";
function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Aplikasi NextJs</title>
        <link
          rel="icon"
          href="/favicon.ico"
          content="aplikasi yang dibuat dengan next js"
        />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
export default MyApp;
