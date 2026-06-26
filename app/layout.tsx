import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./_mycommponents/AppNav/navbar";
import ServerSession from "./_mycommponents/serverSession/ServerSession";
import { Toast } from "radix-ui";
import { Toaster } from "sonner";
import { ThemeProvider } from "./_mycommponents/theme-provider";
import ScrollToTop from "./_mycommponents/ScrollToTop";
import Footer from "./_mycommponents/Footer/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "ShopHub",
  description: "Modern E-commerce built with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          <ServerSession>
            <Navbar />
            <Toaster position="bottom-right"></Toaster>
            {children}
            <ScrollToTop />
            <Footer />
          </ServerSession>
        </ThemeProvider>
      </body>
    </html>
  );
}
