import type { Metadata } from "next";
import { Cormorant, Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { ChatWidget } from "@/components/ui/ChatWidget";
import { agent } from "@/content/agent";

const cormorant = Cormorant({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://norcalgoldhomes.example.com"),
  title: {
    default: `${agent.name} | ${agent.brokerage} — Oroville & Butte County Real Estate`,
    template: `%s | ${agent.name}`,
  },
  description: agent.tagline + " " + agent.serviceArea,
  openGraph: {
    title: `${agent.name} | ${agent.brokerage}`,
    description: agent.tagline,
    images: ["/brand/headshot.png"],
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-ground text-paper">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <ChatWidget />
      </body>
    </html>
  );
}
