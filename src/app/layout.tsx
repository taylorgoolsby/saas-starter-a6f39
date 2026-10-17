import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Setup status",
  description: "Check that your app is connected and ready.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
