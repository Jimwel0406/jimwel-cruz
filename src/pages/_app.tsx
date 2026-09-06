import { type AppType } from "next/dist/shared/lib/utils";
import { SpeedInsights } from "@vercel/speed-insights/next";

import "@/styles/globals.css";

import { Space_Grotesk, Inter } from "next/font/google";

const spaceGrotesk = Space_Grotesk({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600"],
});

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <div className={`${spaceGrotesk.variable} ${inter.variable} font-body`}>
      <Component {...pageProps} />
      <SpeedInsights />
    </div>
  );
};

export default MyApp;
