import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { ColorThemeProvider } from "@/providers/color-theme";
import Theme from "@/components/global/theme";
import { ModalProvider } from "@/providers/modal-provider";

const inter = DM_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TeamTalk",
  description: "TeamTalk | The ultimate chat app",
};

export const revalidate = 0;
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ColorThemeProvider>
              <ModalProvider>
                {children}
                <Toaster />
              </ModalProvider>
          </ColorThemeProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
