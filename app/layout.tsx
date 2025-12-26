import Navbar from "@/components/nav";
import "./globals.css";

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
        <Navbar />
        {children}
      </body>
    </html>
  );
}
