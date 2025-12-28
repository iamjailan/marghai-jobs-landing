import Navbar from "@/components/nav";
import { ReduxProvider } from "@/store/provider";
import "./globals.css";
import Providers from "@/lib/provider";

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
            {children}
          </ReduxProvider>
        </Providers>
      </body>
    </html>
  );
}
