import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, Twitter } from "lucide-react"
import artisanLeatherSvg from "@/public/artisan-leather.svg"

export default function Footer() {
  return (
    <footer className="border-t bg-muted/40">
      <div className="container py-10">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4 text-amber-500">
          <div>
            <h3 className="mb-4 text-lg font-medium flex items-center gap-2">
                <Image src={artisanLeatherSvg} alt="Artisan Leather" className="w-6 h-6 text-amber-500" width={24} height={24} />
                Artisan Leather
            </h3>
            <p className="text-sm text-muted-foreground">
              Handcrafted leather goods made with sustainable materials and traditional craftsmanship.
            </p>
            <div className="mt-4 flex gap-4">
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
            </div>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-medium">Shop</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/products" className="text-muted-foreground hover:text-foreground">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-muted-foreground hover:text-foreground">
                  Leather Apparel & Fashion
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-muted-foreground hover:text-foreground">
                  Leather Footwear
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-muted-foreground hover:text-foreground">
                  Leather Furniture & Decor
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-muted-foreground hover:text-foreground">
                  Industrial Leather Products
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-medium">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-foreground">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-foreground">
                  Contact
                </Link>
              </li> 
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-medium">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/terms-of-service" className="text-muted-foreground hover:text-foreground">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="text-muted-foreground hover:text-foreground">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/shipping-policy" className="text-muted-foreground hover:text-foreground">
                  Shipping Policy
                </Link>
              </li>  
            </ul>
          </div>
        </div>
        <div className="mt-10 border-t pt-6 text-center text-sm text-muted-foreground">
          <p>{/* Copyright ©️ 2025 | Powered by NAFEES ALI TRADERS (SMC-PRIVATE) LIMITED */}
          Copyright ©️ 2025 | Gwen Bautista</p>
        </div>
      </div>
    </footer>
  )
}

