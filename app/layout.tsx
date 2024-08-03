import type { Metadata } from "next";
import Header from "@/components/ui/header";
import Footer from "@/components/ui/footer";
import ScrollToTopButton from "@/components/ui/scroll-to-top-button";
import "./globals.css";

export const metadata: Metadata = {
  title: "🧑‍💻 Hacker News App",
  description:
    "Stay updated with the latest tech news, discussions, and trends from the Hacker News community.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">{children}</main>
          <ScrollToTopButton />
          <Footer />
        </div>
      </body>
    </html>
  );
}
