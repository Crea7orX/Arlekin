import { ProvidersWithoutTheme } from "@/components/providers/providers-without-theme";
import { Toaster } from "@/components/ui/sonner";
import "@/styles/globals.css";
import { type Metadata } from "next";
import { ThemeProvider } from "next-themes";
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
    <html lang="en" className={`${geist.variable}`} suppressHydrationWarning>
      <body className="bg-background flex min-h-dvh flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ProvidersWithoutTheme>
            {children}
            <Toaster />
          </ProvidersWithoutTheme>
        </ThemeProvider>
      </body>
    </html>
  );
}
