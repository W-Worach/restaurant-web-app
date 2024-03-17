function Header() {
  return (
    <header className="bg-white shadow-md fixed top-0 w-full z-10">
      <nav className="container mx-auto px-6 py-3 flex justify-between items-center">
        <a href="/" className="text-xl font-bold text-gray-800 hover:text-gray-700">Restaurant-APP</a>
        <div className="nav-links flex space-x-4">
          <a href="/login" className="text-gray-800 hover:text-blue-500">Logowanie</a>
          <a href="/register" className="text-gray-800 hover:text-blue-500">Rejestracja</a>
        </div>
      </nav>
    </header>
  );
}

export default Header;
