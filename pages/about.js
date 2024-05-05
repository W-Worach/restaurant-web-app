import Link from "next/link";

export default function About() {
  return (
    <div className="font-sans bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center text-gray-800">
          About our restaurant
        </h1>
        <p className="text-xl text-center text-gray-600 mt-4">
          Our history began in 1990, when the first dish was prepared by our
          founder, Chef John Doe. Since then, our mission has remained unchanged
          - to deliver an unforgettable culinary experience.
        </p>

        <div className="mt-8">
          <h2 className="text-3xl font-bold text-gray-800">Nasza filozofia</h2>
          <p className="text-xl text-gray-600 mt-4">
            We believe that food is more than just a meal - it is an an
            experience that has the power to bring people together. Our dishes
            are prepared with the utmost care, using the highest quality
            ingredients from local suppliers. the highest quality sourced from
            local suppliers.
          </p>
        </div>

        <div className="mt-8">
          <h2 className="text-3xl font-bold text-gray-800">Meet our team</h2>
          <p className="text-xl text-gray-600 mt-4">
            Our team are passionate culinary professionals who strive every day
            for perfection. Each member of the team brings something unique to
            our offer, creating a unique atmosphere in our restaurant.
          </p>
          <div className="flex justify-center mt-6">
            <Link
              href="/team"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Meet our team
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
