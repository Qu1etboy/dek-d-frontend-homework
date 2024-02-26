import type { Metadata } from "next";
import { Prompt } from "next/font/google";

import { Toaster } from "react-hot-toast";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./globals.css";

const promt = Prompt({
  subsets: ["thai"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Dek D",
  description: "Dek D Frontend Homework",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={promt.className}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
