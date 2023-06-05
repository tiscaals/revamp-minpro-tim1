import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Layout from './shared/layout';
import { Input, ThemeProvider } from '@material-tailwind/react';

export default function App({ Component, pageProps }: AppProps) {
  return (
    // <div>
    //   <Input label='asasd'/>
    // </div>
    <ThemeProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}
