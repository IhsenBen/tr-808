import { serifGothic } from "@lib/fonts";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={serifGothic.variable}>
      <body>{children}</body>
    </html>
  );
}
