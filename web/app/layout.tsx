import type { Metadata } from "next";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import "./globals.css";

export const metadata: Metadata = {
  title: "tiny-agent — Local-first coding agent",
  description: "A tiny, open coding agent that actually works offline. Local models via Ollama, or fast cloud inference via Groq.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${GeistMono.variable} ${GeistSans.variable}`}>
      <body className="min-h-screen bg-black text-white antialiased font-mono">
        {children}
      </body>
    </html>
  );
}
