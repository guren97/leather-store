"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Search, ShoppingBag, X } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { useCart } from "@/lib/cart-context"
import { useSearch } from "@/lib/search-context"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { useMobile } from "@/hooks/use-mobile"
import { products } from "@/lib/products"
import Image from "next/image"

import artisanLeatherSvg from "@/public/artisan-leather.svg"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
]

export default function Navbar() {
  const router = useRouter()
  const { cart } = useCart()
  const { searchQuery, setSearchQuery, isSearchOpen, setIsSearchOpen } = useSearch()
  const isMobile = useMobile()
  const [isScrolled, setIsScrolled] = useState(false)
  const [suggestions, setSuggestions] = useState<typeof products>([])
  const [isLoading, setIsLoading] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)

  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  useEffect(() => {
    const updateSuggestions = async () => {
      try {
        setIsLoading(true)
        if (searchQuery.trim()) {
          const searchLower = searchQuery.toLowerCase()
          const filtered = products.filter(
            (product) =>
              product.name.toLowerCase().includes(searchLower) ||
              product.description.toLowerCase().includes(searchLower)
          )
          setSuggestions(filtered.slice(0, 5))
        } else {
          setSuggestions([])
        }
      } catch (error) {
        console.error("Error updating suggestions:", error)
        setSuggestions([])
      } finally {
        setIsLoading(false)
      }
    }

    const debounceTimer = setTimeout(updateSuggestions, 300)
    return () => clearTimeout(debounceTimer)
  }, [searchQuery])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (searchQuery.trim()) {
        router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`)
        setIsSearchOpen(false)
        setSearchQuery("")
      }
    } catch (error) {
      console.error("Error handling search:", error)
    }
  }

  const handleProductClick = (productId: string) => {
    try {
      router.push(`/products/${productId}`)
      setIsSearchOpen(false)
      setSearchQuery("")
    } catch (error) {
      console.error("Error navigating to product:", error)
    }
  }

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full transition-all",
        isScrolled ? "bg-background/80 backdrop-blur-sm shadow-sm" : "bg-background",
      )}
    >
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <div className="flex flex-col gap-6 py-6">
                <Link href="/" className="text-xl font-bold">
                  Artisan Leather
                </Link>
                <nav className="flex flex-col gap-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="text-lg font-medium transition-colors hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
              </div>
            </SheetContent>
          </Sheet>

          <Link href="/" className="text-xl font-bold flex items-center gap-2">
            <Image src={artisanLeatherSvg} alt="Artisan Leather" className="w-6 h-6 text-amber-500" width={24} height={24} />
            <h1 className="text-amber-500">Artisan Leather</h1>
          </Link>

          <nav className="hidden md:flex md:gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          {isSearchOpen && !isMobile ? (
            <div ref={searchRef} className="relative w-full max-w-sm">
              <form onSubmit={handleSearch} className="relative flex items-center">
                <Input
                  type="search"
                  placeholder="Search products..."
                  className="pr-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                />
                <Button variant="ghost" size="icon" className="absolute right-0" onClick={() => setIsSearchOpen(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </form>

              {isLoading ? (
                <div className="absolute left-0 right-0 top-full mt-1 rounded-md border bg-background p-4 text-center">
                  Loading...
                </div>
              ) : suggestions.length > 0 ? (
                <div className="absolute left-0 right-0 top-full mt-1 max-h-[400px] overflow-y-auto rounded-md border bg-background shadow-lg">
                  <div className="p-2">
                    {suggestions.map((product) => (
                      <button
                        key={product.id}
                        onClick={() => handleProductClick(product.id)}
                        className="flex w-full items-center gap-3 rounded-md p-2 text-left hover:bg-accent"
                      >
                        <div className="relative h-12 w-12 overflow-hidden rounded-md">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="truncate text-sm font-medium">{product.name}</p>
                          <p className="text-sm text-muted-foreground">Rs {product.price.toLocaleString()}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              ) : searchQuery.trim() ? (
                <div className="absolute left-0 right-0 top-full mt-1 rounded-md border bg-background p-4 text-center">
                  No products found
                </div>
              ) : null}
            </div>
          ) : (
            <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(true)} className="hidden md:flex">
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>
          )}

          <ThemeToggle />

          <Button asChild variant="ghost" size="icon" className="relative">
            <Link href="/cart">
              <ShoppingBag className="h-5 w-5" />
              <span className="sr-only">Cart</span>
              {cartItemsCount > 0 && (
                <Badge variant="destructive" className="absolute text-center -right-1 -top-1 h-5 w-5 rounded-full p-0 text-xs">
                  {cartItemsCount}
                </Badge>
              )}
            </Link>
          </Button>
        </div>
      </div>
    </header>
  )
}

