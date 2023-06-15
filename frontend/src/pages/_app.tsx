import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Layout from './shared/layout';
import { Input, ThemeProvider } from '@material-tailwind/react';
import { useRouter } from 'next/router';

export default function App({ Component, pageProps }: AppProps) {

  const router = useRouter()
  if (router.pathname.startsWith(`/checkout`) || router.pathname.startsWith(`/sales/checkout`) || router.pathname.startsWith(`/sales/createorder`)) {
    return (
      // <Provider store={storeSaga}>
      <Component {...pageProps} />
      // </Provider>
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

