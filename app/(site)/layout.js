import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function SiteLayout({ children }) {
  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} min-h-screen flex flex-col font-sans antialiased`}
    >
      <header className="w-full bg-blue-100 p-4 border-b">
        HEADER USER
      </header>

      <main className="flex-1">{children}</main>

      <footer className="w-full bg-blue-100 p-4 border-t">
        FOOTER USER
      </footer>
    </div>
  );
}