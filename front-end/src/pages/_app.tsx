import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function App({ Component, pageProps }: AppProps) {
  const router: any = useRouter();

  const defaultPage: any = () => {
    router.push('/signin');
  };

  useEffect(() => {
    defaultPage();
  }, []);

  return <Component {...pageProps} />;
}
