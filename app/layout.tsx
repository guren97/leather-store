import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { CartProvider } from "@/lib/cart-context"
import { SearchProvider } from "@/lib/search-context"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Artisan Leather - Premium Leather Goods",
  description: "Discover our collection of handcrafted leather goods, from jackets to accessories.",
  icons: {
    icon: [
      {
        url: "/artisan-leather.svg",
        type: "image/svg+xml",
      },
      {
        url: "/artisan-leather.png",
        type: "image/png",
      }
    ],
    apple: [
      {
        url: "/artisan-leather.png",
        type: "image/png",
      }
    ]
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <CartProvider>
            <SearchProvider>
              <div className="flex min-h-screen flex-col bg-background text-foreground transition-colors duration-300">
                <Navbar />
                <main className="flex-1">{children}</main>
                <Footer />
              </div>
            </SearchProvider>
            <Toaster />
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'