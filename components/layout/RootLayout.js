import Head from 'next/head';
import Header from './Header';
import Footer from './Footer';

function RootLayout({ children }) {
  return (
    <>
      <Header />
      <main className='main-content'>
        {children}
      </main>
      <Footer />
    </>
  );
}

export default RootLayout;