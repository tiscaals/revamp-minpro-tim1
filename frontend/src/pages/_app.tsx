import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { ThemeProvider } from '@material-tailwind/react';
import { useRouter } from 'next/router';
import { Provider } from 'react-redux';
import store from './redux/users-schema/store';
import Layout from './shared/layout';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <ThemeProvider>
      {router.pathname.startsWith('/signin') ||
      router.pathname.startsWith('/external/signup') ||
      router.pathname.startsWith('/internal/signup') ||
      router.pathname.startsWith('/signup/confirm') ||
      router.pathname.startsWith('/bootcamp/apply') ||
      router.pathname.startsWith('/bootcamp/confirm') ||
      router.pathname.startsWith('/profesional/apply') ||
      router.pathname.startsWith('/profesional/confirm') ||
      router.pathname.startsWith('/error/error-403') ? (
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      ) : (
        <Provider store={store}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Provider>
      )}
    </ThemeProvider>
  );
}
