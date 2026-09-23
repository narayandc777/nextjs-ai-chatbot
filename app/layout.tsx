import type { Metadata } from "next";
import ThemeRegistry from "./ThemeRegistry";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Chatbot",
  description: "Chat app built with Next.js + MUI + AI SDK",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>
        <ThemeRegistry>{children}</ThemeRegistry>
      </body>
    </html>
  );
}