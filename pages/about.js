import Link from "next/link";

export default function About() {
  return (
    <div className="font-sans bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center text-gray-800">
          O naszej restauracji
        </h1>
        <p className="text-xl text-center text-gray-600 mt-4">
          Nasza historia rozpoczęła się w 1990 roku, kiedy to pierwsze danie zostało przygotowane
          przez naszego założyciela, Szefa Kuchni Johna Doe. Od tamtej pory, nasza misja pozostaje
          niezmienna – dostarczać niezapomniane wrażenia kulinarne.
        </p>

        <div className="mt-8">
          <h2 className="text-3xl font-bold text-gray-800">
            Nasza filozofia
          </h2>
          <p className="text-xl text-gray-600 mt-4">
            Wierzymy, że jedzenie to więcej niż tylko posiłek – to doświadczenie, które ma moc
            łączenia ludzi. Nasze dania są przygotowywane z najwyższą starannością, używając
            składników najwyższej jakości pochodzących od lokalnych dostawców.
          </p>
        </div>

        <div className="mt-8">
          <h2 className="text-3xl font-bold text-gray-800">
            Poznaj nasz zespół
          </h2>
          <p className="text-xl text-gray-600 mt-4">
            Nasz zespół to pasjonaci kulinarni, którzy każdego dnia dążą do perfekcji. Każdy członek
            zespołu wnosi coś wyjątkowego do naszej oferty, tworząc niepowtarzalny klimat naszej restauracji.
          </p>
          <div className="flex justify-center mt-6">
            <Link href="/team" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Poznaj nasz zespół
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
