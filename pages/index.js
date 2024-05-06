import Link from "next/link";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";

export default function Home() {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <div className="font-sans">
      {/* Welcome section */}
      <section className="welcome-section text-center py-20 bg-gray-100">
        <h1 className="text-4xl font-bold text-gray-800">
          Welcome to our restaurant!
        </h1>
        <p className="text-xl mt-4 text-gray-600">
          Discover flavours you will remember forever.
        </p>
      </section>

      {/* Menu section */}
      <section className="menu-section text-center py-20">
        <h2 className="text-3xl font-bold text-gray-800">Explore our menu</h2>
        <p className="text-xl mt-4 text-gray-600">
          Discover the rich flavours of our cuisine. We invite you to take a
          look at full menu.
        </p>
        <Link
          href="/menu"
          className="mt-8 inline-block bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
        >
          See menu
        </Link>
      </section>

      {/* Section on the restaurant */}
      <section className="about-section text-center py-20 bg-gray-100">
        <h2 className="text-3xl font-bold text-gray-800">
          About our restaurant
        </h2>
        <p className="text-xl mt-4 text-gray-600">
          Learn about the history of our restaurant and the passion with which
          we create our dishes.
        </p>
        <Link
          href="/about"
          className="mt-8 inline-block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Find out more
        </Link>
      </section>

      {/* Reservation section */}
      <section className="reservation-section text-center py-20">
        <h2 className="text-3xl font-bold text-gray-800">Table reservations</h2>
        <p className="text-xl mt-4 text-gray-600">
          {isLoggedIn ? (
            <>
              Are you planning a special meeting or just want to book a a table?
              Use our online booking system.
            </>
          ) : (
            <>
              The booking function is only available to registered users users
              of.
            </>
          )}
        </p>
        {isLoggedIn ? (
          <Link
            href="/reservations"
            className="mt-8 inline-block bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600"
          >
            Book a table
          </Link>
        ) : (
          <Link
            href="/register"
            className="mt-8 inline-block bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
          >
            Sign up
          </Link>
        )}
      </section>

      {/* Contact section */}
      <section className="contact-section text-center py-20 bg-gray-100">
        <h2 className="text-3xl font-bold text-gray-800">Contact</h2>
        <p className="text-xl mt-4 text-gray-600">
          Do you have questions? Get in touch with us!
        </p>
        <Link
          href="/contact"
          className="mt-8 inline-block bg-purple-500 text-white py-2 px-4 rounded hover:bg-purple-600"
        >
          Contact
        </Link>
      </section>
    </div>
  );
}
