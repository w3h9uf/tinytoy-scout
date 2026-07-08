import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TinyToy Scout - Baby Toy Signals",
  description:
    "A safety-first MVP for comparing baby and toddler toys using parent discussion signals."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
