import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import ThemeRegistry from "./ThemeRegistry";

const roboto = Roboto({
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: {
    default: "ION | Architecture & Design",
    template: "%s | ION",
  },
  description: "ION — Zamonaviy interyer va eksteryer dizayn studiyasi. Premium loyihalar, professional arxitektura xizmatlari.",
  icons: {
    icon: "/ion_main_logo.jpg",
    apple: "/ion_main_logo.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${roboto.className} h-full antialiased`}>
      <body className="min-h-full flex flex-col">

        <ThemeRegistry>
          {children}
        </ThemeRegistry>
      </body>
    </html>
  );
}
