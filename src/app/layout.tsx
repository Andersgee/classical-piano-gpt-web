import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: "variable",
});

export const metadata: Metadata = {
  //metadataBase: new URL(process.env.NEXT_PUBLIC_ABSURL),
  title: "Classical Piano GPT",
  description: "A gpt style neural net trained on classical piano music",
  openGraph: {
    title: "Classical Piano GPT",
    description: "A gpt style neural net trained on classical piano music",
    //url: process.env.NEXT_PUBLIC_ABSURL,
    siteName: "Classical Piano GPT",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    title: "Classical Piano GPT",
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.variable}>{children}</body>
    </html>
  );
}
