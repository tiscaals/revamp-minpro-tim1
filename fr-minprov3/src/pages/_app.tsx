import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "./shared/layout";
import Layout2 from "./shared/layout2";
import { useRouter } from "next/router";
import { Provider } from "react-redux";
import store from "./redux/storeGlobal";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  if (router.pathname.startsWith("/jobs")) {
    return (
      <Provider store={store}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    );
  }

  return (
    <Provider store={store}>
      <Layout2>
        <Component {...pageProps} />
      </Layout2>
    </Provider>
  );
}
