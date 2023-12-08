import { Inter } from "next/font/google";
import Header from "./components/Header";
import "./globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "@fontsource/audiowide";
import "@fontsource/krona-one";
import { WagmiConfig } from "wagmi";
import { chains, wagmiConfig } from "@/util/chain";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "@mui/material/styles";
import { brandingDarkTheme } from "@/util/theme";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Square",
  description: "Filecoin Square",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <WagmiConfig config={wagmiConfig}>
          <ThemeProvider theme={brandingDarkTheme}>
            <RainbowKitProvider chains={chains}>
              <Toaster />
              <>
                <Header />
                {children}
              </>
            </RainbowKitProvider>
          </ThemeProvider>
        </WagmiConfig>
      </body>
    </html>
  );
}
