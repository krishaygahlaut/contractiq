import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ContractIQ — AI Contract Risk Analyzer",
  description: "Instantly analyze any contract for risk, red flags, and negotiation tips using AI.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;700&display=swap" rel="stylesheet" />
      </head>
      <body style={{ margin: 0, padding: 0, fontFamily: "'IBM Plex Mono', monospace", background: "#0a0a0f", color: "white" }}>
        {children}
      </body>
    </html>
  );
}
