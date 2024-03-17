import '../styles/globalsStyles.css';
import '../styles/rootLayoutStyles.css';
import RootLayout from '../components/layout/RootLayout';

function MyApp({ Component, pageProps }) {
  return (
    <RootLayout>
      <Component {...pageProps} />
    </RootLayout>
  );
}

export default MyApp;