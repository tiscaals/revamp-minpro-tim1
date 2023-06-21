import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Layout from './shared/layout';
import { Input, ThemeProvider } from '@material-tailwind/react';
import { useRouter } from 'next/router';
import { Provider } from 'react-redux';
import store from './redux/users-schema/store';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <ThemeProvider>
      {router.pathname.startsWith('/signin') ||
      router.pathname.startsWith('/external/signup') ||
      router.pathname.startsWith('/internal/signup') ||
      router.pathname.startsWith('/signup/confirm') ||
      router.pathname.startsWith('/error-page/error-403') ||
      router.pathname.startsWith('/apply-jobs/confirm') ? (
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
