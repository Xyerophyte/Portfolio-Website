import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Harsh Chavan - Full Stack Developer | Dubai, UAE",
  description:
    "Experienced Full Stack Developer specializing in React, Next.js, Node.js, and Python. Available for freelance projects in Dubai, UAE. 5+ years of experience building modern web applications.",
  keywords:
    "Full Stack Developer, React Developer, Next.js, Node.js, Python, Dubai Developer, UAE, Web Development, Frontend, Backend, JavaScript, TypeScript",
  authors: [{ name: "Harsh Chavan" }],
  creator: "Harsh Chavan",
  publisher: "Harsh Chavan",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://harshchavan.dev",
    title: "Harsh Chavan - Full Stack Developer",
    description:
      "Experienced Full Stack Developer specializing in modern web technologies. Available for projects in Dubai, UAE.",
    siteName: "Harsh Chavan Portfolio",
    images: [
      {
        url: "/images/harsh-profile.jpg",
        width: 1200,
        height: 630,
        alt: "Harsh Chavan - Full Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Harsh Chavan - Full Stack Developer",
    description:
      "Experienced Full Stack Developer specializing in modern web technologies. Available for projects in Dubai, UAE.",
    images: ["/images/harsh-profile.jpg"],
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
  verification: {
    google: "your-google-verification-code",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="canonical" href="https://harshchavan.dev" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Harsh Chavan",
              jobTitle: "Full Stack Developer",
              description: "Experienced Full Stack Developer specializing in React, Next.js, Node.js, and Python",
              url: "https://harshchavan.dev",
              sameAs: ["https://github.com/Xyerophyte", "http://www.linkedin.com/in/harsh-chavan-369522316/"],
              address: {
                "@type": "PostalAddress",
                addressLocality: "Dubai",
                addressCountry: "UAE",
              },
              email: "harshabasaheb1@gmail.com",
              telephone: "+971502808641",
            }),
          }}
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
