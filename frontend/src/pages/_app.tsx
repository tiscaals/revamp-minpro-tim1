import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux'
import Layout from './shared/layout';
import { Input, ThemeProvider } from '@material-tailwind/react';
import { Router, useRouter } from 'next/router';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import store from './redux/storeGlobal';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  if (router.pathname.startsWith('/jobs')) {
    return(
      <ThemeProvider>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </ThemeProvider>
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
