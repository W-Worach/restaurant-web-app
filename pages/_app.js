import '../styles/globalsStyles.css';
import RootLayout from '../components/layout/RootLayout';
import { AuthProvider } from '../context/AuthContext';

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <RootLayout>
        <Component {...pageProps} />
      </RootLayout>
    </AuthProvider>
  );
}

export default MyApp;