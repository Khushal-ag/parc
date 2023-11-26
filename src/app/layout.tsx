import type { Metadata } from "next";

import "@/styles/globals.css";

import Profilebar from "@/components/Profilebar";
import Providers from "@/components/Providers";
import Sidebar from "@/components/Sidebar";

export const metadata: Metadata = {
  title: "ParC",
  description:
    "ParC is an automated parking system that allows users to find parking slots automatically by scanning their license plate.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <main className="flex h-screen w-full flex-col gap-px lg:flex-row">
          <Sidebar />

          <div className="h-full flex-1 flex-col">
            <Profilebar />
            <div className="h-[92%] w-full">
              <Providers>{children}</Providers>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
