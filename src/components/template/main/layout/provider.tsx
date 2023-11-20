"use client";
import "leaflet/dist/leaflet.css";
import "@/assets/styles/swiper.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { prefixer } from "stylis";
import rtlPlugin from "stylis-plugin-rtl";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "@/assets/styles/globals.css";
import Navbar from "./navbar";
import Footer from "./footer";
import { ReactNode } from "react";
import { QueryClientProvider, QueryClient } from "react-query";

interface ProvderType {
  children: ReactNode;
}

const PageProvider = ({ children }: ProvderType) => {
  const queryClient = new QueryClient();
  const theme = createTheme({
    typography: {
      fontFamily: "IranSans",
    },
  });

  const cacheRtl = createCache({
    key: "muirtl",
    stylisPlugins: [prefixer, rtlPlugin],
  });
  return (
    <html lang="en">
      <head>
        <title>OtO | اُتو</title>
      </head>
      <body>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider theme={theme}>
            <Provider store={store}>
              <CacheProvider value={cacheRtl}>
                <ToastContainer toastClassName="font-medium" rtl={true} />
                <Navbar />
                <div className="max-w-[1280px] m-auto lg:p-0 p-4 min-h-[calc(100vh_-_550px)]">
                  {children}
                </div>
                <Footer />
              </CacheProvider>
            </Provider>
          </ThemeProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
};

export default PageProvider;
