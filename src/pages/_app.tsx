// @ts-ignore
import React from "react";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from "react-datepicker";
import ptBRLocale from "date-fns/locale/pt-BR";
import "../styles/globals.css";
import Head from "next/head";
import { AppProps } from "next/app";
import { ThemeProvider, CSSReset, ColorModeProvider } from "@chakra-ui/core";
import defaultTheme from "../themes/default";
import { Provider } from "react-redux";
import store from "../ducks";

function MyApp({ Component, pageProps }: AppProps) {
  React.useEffect(() => {
    registerLocale("pt-BR", ptBRLocale);
  }, []);

  return (
    <Provider store={store}>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>SOMASS — Agendamento de Missas</title>
        <meta name="theme-color" content="#3D5AFE" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>
      <ThemeProvider theme={defaultTheme}>
        <ColorModeProvider value="dark">
          <CSSReset />
          <Component {...pageProps} />
        </ColorModeProvider>
      </ThemeProvider>
    </Provider>
  );
}

export default MyApp;
