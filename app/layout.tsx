import Navbar from "@/components/nav";
import { ReduxProvider } from "@/store/provider";
import "./globals.css";
import Providers from "@/lib/provider";
import AuthGuard from "@/components/auth";
import { Analytics } from "@vercel/analytics/next";

export const metadata = {
  title: "Marghai Jobs",
  description: "Find your dream job in Afghanistan with Marghai",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900">
        <Providers>
          <ReduxProvider>
            <Navbar />
            <Analytics />
            <AuthGuard>{children}</AuthGuard>
          </ReduxProvider>
        </Providers>
      </body>
    </html>
  );
}
