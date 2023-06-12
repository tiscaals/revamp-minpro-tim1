import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Layout from './shared/layout';
import { Input, ThemeProvider } from '@material-tailwind/react';
import { useRouter } from 'next/router';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  if(router.pathname.startsWith('/bootcamp')){
    return (
      <ThemeProvider>
          <Component {...pageProps} />
      </ThemeProvider>
    );
  }
  return (
    <ThemeProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}