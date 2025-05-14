import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";
import Providers from "@/providers/Providers";

export const metadata: Metadata = {
  title: "Property Pro",
  description: "A Product by Mohi Uddin",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
      <html lang="en">
        <body>
          <Toaster position="top-center" richColors />
          {children}
        </body>
      </html>
    </Providers>
  );
}
