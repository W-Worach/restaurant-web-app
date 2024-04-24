import React from "react";
import Head from "next/head";

const TermsPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <Head>
        <title>Regulamin</title>
      </Head>
      <h1 className="text-3xl font-bold mb-8">Regulamin</h1>
      <div className="text-lg">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Wprowadzenie</h2>
          <p>
            Witamy na naszej stronie internetowej. Korzystając z naszej strony,
            zgadzasz się na przestrzeganie poniższego regulaminu, który wraz z
            naszą polityką prywatności reguluje nasze relacje z Tobą w związku z
            tą stroną internetową.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Prawa autorskie</h2>
          <p>
            Treść tej strony jest chroniona prawami autorskimi. Nie wolno
            kopiować ani reprodukować żadnych materiałów bez naszej wyraźnej
            zgody.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Zmiany w regulaminie</h2>
          <p>
            Możemy okresowo aktualizować ten regulamin. Zmiany zostaną
            opublikowane na tej stronie.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Kontakt</h2>
          <p>
            Jeśli masz jakiekolwiek pytania dotyczące tego regulaminu, prosimy o
            kontakt.
          </p>
        </section>
      </div>
    </div>
  );
};

export default TermsPage;
