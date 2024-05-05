import React from "react";
import Head from "next/head";

const TermsPage = () => {
  return (
    <div className="container w-3/4 px-4 py-8">
      <Head>
        <title>Regulamin</title>
      </Head>
      <h1 className="text-3xl font-bold mb-8">Regulamin</h1>
      <div className="text-lg">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Wprowadzenie</h2>
          <p>
            Welcome to our website. By using our site, you agree to be bound by
            the following terms and conditions, which together with our privacy
            policy, governs our relationship with you in relation to this
            website.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Prawa autorskie</h2>
          <p>
            The content of this site is protected by copyright. You may not copy
            or reproduce any material without our express permission.
            permission.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Zmiany w regulaminie</h2>
          <p>
            We may update these rules from time to time. Changes will be
            published on this page.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Kontakt</h2>
          <p>If you have any questions about these rules, please contact.</p>
        </section>
      </div>
    </div>
  );
};

export default TermsPage;
