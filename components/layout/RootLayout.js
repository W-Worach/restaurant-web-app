import Head from "next/head";
import Header from "./Header";
import Footer from "./Footer";

function RootLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Head>
        <title>Restaurant-WEB-APP</title>
        <link rel="favicon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="flex-1 main-content">{children}</main>
      <Footer />
    </div>
  );
}

export default RootLayout;
