import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});
const pokemon = localFont({
  src: "./fonts/PokemonSolid.woff",
  variable: "--font-pokemon-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Pokémon Dashboard | Manage and View Your Collection",
  description:
    "Explore, browse, and manage your Pokémon collection easily with pagination. Search for specific Pokémon and view detailed information in one place.",
  keywords:
    "Pokémon, Pokémon Dashboard, Manage Pokémon, View Pokémon, Pokémon Collection, Pokémon Pagination, Pokémon Search",
  openGraph: {
    title: "Pokémon Dashboard | Manage and View Your Pokémon Collection",
    description:
      "Organize and browse through your Pokémon collection with our easy-to-use dashboard. Enjoy a smooth experience with pagination and detailed views of your favorite Pokémon.",
    url: "https://your-site-url.com/pokemon-dashboard", // Update to actual URL
    siteName: "Pokémon Dashboard",
    images: [
      {
        url: "https://your-site-url.com/images/pokemon-dashboard-banner.png", // Add image for social sharing
        width: 1200,
        height: 630,
        alt: "Pokémon Dashboard",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pokémon Dashboard | Manage and View Your Pokémon Collection",
    description:
      "Browse your Pokémon collection with ease. Search and manage your collection in one place.",
    images: ["https://your-site-url.com/images/pokemon-dashboard-banner.png"], // Same image as OpenGraph
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://your-site-url.com/pokemon-dashboard", // Add the canonical URL to avoid duplicate content issues
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${pokemon.variable} antialiased px-3 py-3 md:px-10 md:py-5 bg-white `}
      >
        {children}
      </body>
    </html>
  );
}
