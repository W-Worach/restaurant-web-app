import React from "react";
import Head from "next/head";

const ContactPage = () => {
  return (
    <div className="container mx-auto px-4 py-4">
      <Head>
        <title>Contact</title>
      </Head>
      <h1 className="text-3xl font-bold mb-8">Contact</h1>
      <div className="text-lg">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Contact details</h2>
          <ul className="list-disc pl-4">
            <li>Email: contact@example.com</li>
            <li>Phone number: +48 123 456 789</li>
            <li>Address: 1, 00-000 Examples Street</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Working hours</h2>
          <p>Monday - Friday: 7:00 am - 7:00 pm</p>
          <p>Saturday - Sunday: 9:00 am - 9:00 pm</p>
        </section>
      </div>
    </div>
  );
};

export default ContactPage;
