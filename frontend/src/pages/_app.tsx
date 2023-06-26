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
  // if (router.pathname.startsWith('/jobs') || router.pathname.startsWith(`/sales/checkout`) || router.pathname.startsWith(`/sales/createorder`) || router.pathname.startsWith(`/sales/receipt`)) {
  //   return(
  //     <ThemeProvider>
  //       <Provider store={store}>
  //         <Component {...pageProps} />
  //       </Provider>
  //     </ThemeProvider>
  //   )
  // }
  // return (
  //   <ThemeProvider>
  //     <Provider store={store}>
  //       <Layout>
  //         <Component {...pageProps} />
  //       </Layout>
  //     </Provider>
  //   </ThemeProvider>
  // );
  
  return (
    // <ThemeProvider>
    //   {router.pathname.startsWith('/signin') ||
    //   router.pathname.startsWith('/') ||
    //   router.pathname.startsWith('/external/signup') ||
    //   router.pathname.startsWith('/internal/signup') ||
    //   router.pathname.startsWith('/signup/confirm') ||
    //   router.pathname.startsWith('/bootcamp/apply') ||
    //   router.pathname.startsWith('/bootcamp/confirm') ||
    //   router.pathname.startsWith('/profesional/apply') ||
    //   router.pathname.startsWith('/profesional/confirm') ||
    //   router.pathname.startsWith('/sales/checkout') || 
    //   router.pathname.startsWith('/sales/createorder') || 
    //   router.pathname.startsWith('/sales/receipt') ||
    //   // router.pathname.startsWith('/curriculum') ||
    //   // router.pathname.startsWith('/curriculum/edit') ||
    //   // router.pathname.startsWith('/curriculum/create') ||
    //   router.pathname.startsWith('/jobs') ||
    //   router.pathname.startsWith('/error/error-403') ? (
    //     <Provider store={store}>
    //       <Component {...pageProps} />
    //     </Provider>
    //   ) : (
    //     <Provider store={store}>
    //       <Layout>
    //         <Component {...pageProps} />
    //       </Layout>
    //     </Provider>
    //   )}
    // </ThemeProvider>
    <ThemeProvider>
      {router.pathname.startsWith('/app')?
      <Provider store={store}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
      :
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
      }
    </ThemeProvider>
  );
}
