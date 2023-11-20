"use client";
import "@/assets/styles/globals.css";
import { store } from "@/redux/store";
import { Provider } from "react-redux";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CacheProvider } from "@emotion/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import createCache from "@emotion/cache";
import { prefixer } from "stylis";
import rtlPlugin from "stylis-plugin-rtl";
import { icons } from "@/data";
import { useRouter } from "next/navigation";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = createTheme({
    typography: {
      fontFamily: "IranSans",
    },
  });

  const cacheRtl = createCache({
    key: "muirtl",
    stylisPlugins: [prefixer, rtlPlugin],
  });

  const router = useRouter();

  return (
    <html lang="en">
      <body>
        <ThemeProvider theme={theme}>
          <Provider store={store}>
            <CacheProvider value={cacheRtl}>
              <ToastContainer toastClassName="font-medium" rtl={true} />

              <div className="max-w-[1280px] m-auto min-h-[100vh] flex items-center justify-center p-4">
                <div className="bg-white rounded-lg p-5 pt-10 md:w-[25rem] w-full shadow-[rgba(37,_109,_133,_0.4)_0px_0px_4px_0px]">
                  <div className="flex justify-center mb-10">
                    <img
                      src={icons.logo_blue.src}
                      alt=""
                      onClick={() => router.push("/")}
                      className="cursor-pointer w-20"
                    />
                  </div>
                  {children}
                </div>
              </div>
            </CacheProvider>
          </Provider>
        </ThemeProvider>
      </body>
    </html>
  );
}
