import { type AppType } from "next/dist/shared/lib/utils";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ReactLenis } from "lenis/react";

import "@/styles/globals.css";

import { Space_Grotesk, Inter, Noto_Serif } from "next/font/google";

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

const notoSerif = Noto_Serif({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700"],
});

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ReactLenis root options={{ autoRaf: true, lerp: 0.08 }}>
      <div className={`${spaceGrotesk.variable} ${inter.variable} ${notoSerif.variable} font-body`}>
        <Component {...pageProps} />
        <SpeedInsights />
      </div>
    </ReactLenis>
  );
};

export default MyApp;
