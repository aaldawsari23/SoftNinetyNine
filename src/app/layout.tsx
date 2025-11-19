import type { Metadata } from "next";
import "./globals.css";
import StructuredData from "@/components/seo/StructuredData";

export const metadata: Metadata = {
  title: "سوفت تسعة وتسعين | قطع غيار وزيوت الدراجات النارية في جيزان",
  description: "متجر متخصص في قطع الغيار الأصلية وزيوت الصيانة والإكسسوارات للدراجات النارية في جيزان. زيوت موتول، فلاتر، بطاريات وقطع غيار عالية الجودة.",
  keywords: "قطع غيار دراجات نارية، زيوت دراجات، فلاتر دراجات، بطاريات دراجات، إكسسوارات دراجات نارية، متجر قطع غيار جيزان، موتول زيت، فلاتر هيفلو",
  authors: [{ name: "سوفت تسعة وتسعين" }],
  creator: "سوفت تسعة وتسعين",
  publisher: "سوفت تسعة وتسعين",
  openGraph: {
    title: "سوفت تسعة وتسعين | قطع غيار وزيوت الدراجات النارية",
    description: "متجر متخصص في قطع الغيار الأصلية وزيوت الصيانة للدراجات النارية في جيزان",
    url: "https://soft99bikes.com",
    siteName: "سوفت تسعة وتسعين",
    images: [
      {
        url: "/logo.png",
        width: 512,
        height: 512,
        alt: "سوفت تسعة وتسعين - قطع غيار الدراجات النارية",
      },
    ],
    locale: "ar_SA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "سوفت تسعة وتسعين | قطع غيار وزيوت الدراجات النارية",
    description: "متجر متخصص في قطع الغيار الأصلية وزيوت الصيانة للدراجات النارية",
    images: ["/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://soft99bikes.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <StructuredData />
        <link rel="icon" href="/logo.png" sizes="any" type="image/png" />
        <link rel="apple-touch-icon" href="/logo.png" />
        <meta name="theme-color" content="#E50914" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
