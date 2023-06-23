import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Layout from './shared/layout';
import { Input, ThemeProvider } from '@material-tailwind/react';
import { useRouter } from 'next/router';
import store from './redux/store';
import { Provider } from 'react-redux';

export default function App({ Component, pageProps }: AppProps) {

  const router = useRouter()
  if (router.pathname.startsWith(`/checkout`) || router.pathname.startsWith(`/sales/checkout`) || router.pathname.startsWith(`/sales/createorder`) || router.pathname.startsWith(`/sales/receipt`)) {
    return (
      <Provider store={store}>
      <Component {...pageProps} />
      </Provider>
    )
  } else if (router.pathname.startsWith(`/landing`)) {
    return (
      // Render komponen khusus untuk halaman landing
      <Component {...pageProps} />
    )
  }

  return (
    <ThemeProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}

