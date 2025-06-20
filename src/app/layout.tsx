import { ApiProvider } from "@/components/providers/api-provider";
import { Toaster } from "@/components/ui/sonner";
import "@/styles/globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { type Metadata } from "next";
import { Geist } from "next/font/google";

export const metadata: Metadata = {
  title: "Arlekin",
  description: "Discorver & Save Places",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider>
      <html lang="en" className={`${geist.variable}`}>
        <body className="bg-background">
          <ApiProvider>
            {children}
            <Toaster />
          </ApiProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
