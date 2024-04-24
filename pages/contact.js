import React from "react";
import Head from "next/head";

const ContactPage = () => {
  return (
    <div className="container mx-auto px-4 py-4">
      <Head>
        <title>Kontakt</title>
      </Head>
      <h1 className="text-3xl font-bold mb-8">Kontakt</h1>
      <div className="text-lg">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Dane kontaktowe</h2>
          <ul className="list-disc pl-4">
            <li>Email: kontakt@example.com</li>
            <li>Telefon: +48 123 456 789</li>
            <li>Adres: ul. Przykładowa 1, 00-000 Przykładów</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Godziny pracy</h2>
          <p>Poniedziałek - Piątek: 7:00 - 19:00</p>
          <p>Sobota - Niedziela: 9:00 - 21:00</p>
        </section>
      </div>
    </div>
  );
};

export default ContactPage;
