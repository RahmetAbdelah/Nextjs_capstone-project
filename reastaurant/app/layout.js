import localFont from "next/font/local";
import { getSession } from "@/lib/session";
import { CartProvider } from "./CartProvider";
import SiteFooter from "./SiteFooter";
import SiteHeader from "./SiteHeader";
import "./globals.css";

const geistSans = localFont({
  src: "../public/fonts/geist-latin.woff2",
  variable: "--font-geist-sans",
  display: "swap",
  weight: "100 900",
});

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: "Addis Eats | Ethiopian Restaurant",
  description: "Order traditional Ethiopian dishes from Addis Eats.",
  openGraph: {
    title: "Addis Eats | Ethiopian Restaurant",
    description: "Discover comforting Ethiopian favourites, prepared with warm spices and shared with care.",
    type: "website",
  },
};

export default async function RootLayout({ children }) {
  const session = await getSession();
  return (
    <html
      lang="en"
      className={`${geistSans.variable} h-full antialiased`}
    >
      <body className="site-body flex min-h-full flex-col">
        <SiteHeader session={session} />
        <CartProvider>
          <div className="site-content flex min-h-0 flex-1 flex-col">{children}</div>
        </CartProvider>
        <SiteFooter />
      </body>
    </html>
  );
}
