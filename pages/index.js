import Link from 'next/link';

export default function Home() {
  return (
    <div className="font-sans">
      {/* Sekcja powitalna */}
      <section className="welcome-section text-center py-20 bg-gray-100">
        <h1 className="text-4xl font-bold text-gray-800">Witaj w naszej restauracji!</h1>
        <p className="text-xl mt-4 text-gray-600">Odkryj smaki, które zapamiętasz na zawsze.</p>
        <Link href="/menu" className="mt-8 inline-block bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600">
          Odkryj nasze menu
        </Link>
      </section>

      {/* Sekcja menu */}
      <section className="menu-section text-center py-20">
        <h2 className="text-3xl font-bold text-gray-800">Poznaj nasze menu</h2>
        <p className="text-xl mt-4 text-gray-600">Odkryj bogactwo smaków naszej kuchni. Zapraszamy do zapoznania się z pełnym menu.</p>
        <Link href="/menu" className="mt-8 inline-block bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">
          Zobacz menu
        </Link>
      </section>

      {/* Sekcja o restauracji */}
      <section className="about-section text-center py-20 bg-gray-100">
        <h2 className="text-3xl font-bold text-gray-800">O naszej restauracji</h2>
        <p className="text-xl mt-4 text-gray-600">Poznaj historię naszej restauracji i pasję, z którą tworzymy nasze dania.</p>
        <Link href="/about" className="mt-8 inline-block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
          Dowiedz się więcej
        </Link>
      </section>

      {/* Sekcja rezerwacji */}
      <section className="reservation-section text-center py-20">
        <h2 className="text-3xl font-bold text-gray-800">Rezerwacja stolików</h2>
        <p className="text-xl mt-4 text-gray-600">Planujesz specjalne spotkanie lub po prostu chcesz zarezerwować stolik? Skorzystaj z naszego systemu rezerwacji online.</p>
        <Link href="/reservation" className="mt-8 inline-block bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600">
          Zarezerwuj stolik
        </Link>
      </section>

      {/* Sekcja kontaktowa */}
      <section className="contact-section text-center py-20 bg-gray-100">
        <h2 className="text-3xl font-bold text-gray-800">Kontakt</h2>
        <p className="text-xl mt-4 text-gray-600">Masz pytania? Chcesz zarezerwować stolik? Skontaktuj się z nami!</p>
        <Link href="/contact" className="mt-8 inline-block bg-purple-500 text-white py-2 px-4 rounded hover:bg-purple-600">
          Skontaktuj się
        </Link>
      </section>
    </div>
  );
}
