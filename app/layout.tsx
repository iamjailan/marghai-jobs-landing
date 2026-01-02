import Navbar from "@/components/nav";
import { ReduxProvider } from "@/store/provider";
import "./globals.css";
import Providers from "@/lib/provider";
import AuthGuard from "@/components/auth";
import { Analytics } from "@vercel/analytics/next";

export const metadata = {
  title: "Marghai Jobs | Top Jobs Website in Afghanistan",
  description:
    "Marghai Jobs د افغانستان د کارموندنې مخکښ ویب‌سایټ دی. دلته د افغانستان تر ټولو غوره دندې ومومئ. مرغه‌ای جابز بهترین وب‌سایت کاریابی در افغانستان است که جدیدترین فرصت‌های شغلی را ارائه می‌دهد.",

  keywords: [
    "Marghai Jobs",
    "Top jobs Afghanistan",
    "Top jobs website Afghanistan",
    "Afghanistan jobs",
    "Jobs in Afghanistan",
    "Remote jobs Afghanistan",

    "د افغانستان دندې",
    "د کار فرصتونه",
    "غوره دندې افغانستان",
    "کاریابي افغانستان",

    "وظایف افغانستان",
    "کاریابی افغانستان",
    "بهترین سایت کاریابی افغانستان",
    "فرصت‌های شغلی افغانستان",
  ],

  openGraph: {
    title: "Marghai Jobs | Top Jobs Website in Afghanistan",
    description:
      "Find top jobs in Afghanistan with Marghai Jobs – د افغانستان غوره دندې – بهترین فرصت‌های کاری در افغانستان",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Marghai Jobs Logo",
      },
    ],
    type: "website",
    locale: "en_US",
  },

  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
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
