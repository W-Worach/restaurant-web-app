import React from "react";
import Head from "next/head";

const TermsPage = () => {
  return (
    <div className="bg-white mx-auto max-w-screen-xl">
      <div className="container mx-auto px-4 py-8">
        <Head>
          <title>Regulations</title>
        </Head>
        <h1 className="text-3xl font-bold mb-8">Regulations</h1>
        <div className="text-lg">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
            <p>
              Welcome to our website. By using our site, you agree to be bound
              by the following terms and conditions, which together with our
              privacy policy, governs our relationship with you in relation to
              this website.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Copyright</h2>
            <p>
              The content of this site is protected by copyright. You may not
              copy or reproduce any material without our express permission.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              Amendments to the Rules of Procedure
            </h2>
            <p>
              We may update these rules from time to time. Changes will be
              published on this page.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Contact</h2>
            <p>If you have any questions about these rules, please contact.</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;
