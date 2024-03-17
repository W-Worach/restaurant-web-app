function Footer() {
    return (
      <footer className="bg-gray-800 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <span>© 2024 Restaurant-APP. Wszelkie prawa zastrzeżone.</span>
          <nav className="footer-nav">
            <a href="/about" className="text-white px-2 hover:text-gray-300">O nas</a>
            <a href="/contact" className="text-white px-2 hover:text-gray-300">Kontakt</a>
            <a href="/terms" className="text-white px-2 hover:text-gray-300">Regulamin</a>
          </nav>
        </div>
      </footer>
    );
  }
  
  export default Footer;
  