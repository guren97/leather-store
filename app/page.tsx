import { Button } from "@/components/ui/button"
import { ArrowRight, Star, Award, Heart, Shield, Truck } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import FeaturedProducts from "@/components/featured-products"
import NewsletterForm from "@/components/newsletter-form"

// Import hero image    
import artisanLeather from "@/public/artisan-leather.png"

export default function HomePage() {
  return (
    <div className="flex flex-col gap-16 pb-16">
      {/* Hero Section */}
      <section className="relative h-[90vh] w-full overflow-hidden">
        <Image
          src={artisanLeather}
          alt="Artisan Leather - Premium leather goods"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="container relative z-10 flex h-full flex-col items-center justify-center text-center">
          <span className="mb-4 rounded-full bg-white/10 px-4 py-1 text-sm font-medium text-white backdrop-blur-sm">
            Handcrafted Excellence Since 1990
          </span>
          <h1 className="mb-6 text-5xl font-bold tracking-tight text-white sm:text-6xl md:text-7xl">
            Artisan Leather
          </h1>
          <p className="mb-8 max-w-2xl text-xl text-white/90">
            Where tradition meets innovation. Each piece is meticulously crafted by skilled artisans using the finest leather.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Button asChild size="lg" className="bg-orange-500 text-black hover:bg-orange-400/90">
              <Link href="/products">
                Explore Collection <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white text-white bg-balck/50 hover:bg-black/50 hover:text-white">
              <Link href="/about">Our Craftsmanship</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              icon: Award,
              title: "Premium Quality",
              description: "Handpicked finest leather materials",
            },
            {
              icon: Heart,
              title: "Handcrafted",
              description: "Made with love by skilled artisans",
            },
            {
              icon: Shield,
              title: "Lifetime Warranty",
              description: "Guaranteed quality assurance",
            },
            {
              icon: Truck,
              title: "Free Shipping",
              description: "On orders above Rs. 50,000",
            },
          ].map((feature) => (
            <div key={feature.title} className="flex flex-col items-center text-center">
              <div className="mb-4 rounded-full bg-primary/10 p-3">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-lg font-semibold">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="container">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <span className="mb-2 block text-sm font-medium text-primary">Featured Collection</span>
            <h2 className="text-3xl font-bold tracking-tight">Handcrafted Excellence</h2>
            <p className="text-muted-foreground">Discover our most sought-after pieces</p>
          </div>
          <Button asChild variant="ghost">
            <Link href="/products">
              View All <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        <FeaturedProducts />
      </section>

      {/* Best Sellers */}
      <section className="container">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <span className="mb-2 block text-sm font-medium text-primary">Customer Favorites</span>
            <h2 className="text-3xl font-bold tracking-tight">Best Sellers</h2>
            <p className="text-muted-foreground">Our most loved pieces by our customers</p>
          </div>
          <Button asChild variant="ghost">
            <Link href="/products?sort=rating">
              View All <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              id: "leather-jacket",
              name: "Classic Leather Jacket",
              price: 29500,
              rating: 4.8,
              image: "/images/products/leather_jacket.webp",
              category: "apparel",
            },
            {
              id: "leather-handbag",
              name: "Elegant Leather Handbag",
              price: 14500,
              rating: 4.6,
              image: "/images/products/leather_handbag.webp",
              category: "accessories",
            },
            {
              id: "leather-boots",
              name: "Classic Leather Boots",
              price: 18500,
              rating: 4.9,
              image: "/images/products/leather_boots.webp",
              category: "footwear",
            },
            {
              id: "leather-briefcase",
              name: "Professional Leather Briefcase",
              price: 24500,
              rating: 4.7,
              image: "/images/products/leather_briefcase.webp",
              category: "accessories",
            },
          ].map((product) => (
            <Link key={product.id} href={`/products/${product.id}`} className="group">
              <div className="relative aspect-square overflow-hidden rounded-lg">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 transition-opacity duration-300 group-hover:bg-black/30" />
              </div>
              <div className="mt-4">
                <h3 className="font-medium">{product.name}</h3>
                <div className="mt-1 flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm text-muted-foreground">{product.rating}</span>
                </div>
                <p className="mt-1 font-medium">Rs {product.price.toLocaleString()}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="container">
        <div className="mb-8">
          <span className="mb-2 block text-sm font-medium text-primary">Collections</span>
          <h2 className="text-3xl font-bold tracking-tight">Shop by Category</h2>
          <p className="text-muted-foreground">Explore our curated collections</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              name: "Apparel",
              image: "/images/products/leather_jacket.webp",
              href: "/products?category=apparel",
              description: "Timeless leather jackets and coats",
            },
            {
              name: "Accessories",
              image: "/images/products/leather_handbag.webp",
              href: "/products?category=accessories",
              description: "Elegant bags and accessories",
            },
            {
              name: "Footwear",
              image: "/images/products/leather_boots.webp",
              href: "/products?category=footwear",
              description: "Premium leather footwear",
            },
            {
              name: "Industrial",
              image: "/images/products/leather_toolbag.webp",
              href: "/products?category=industrial",
              description: "Professional leather gear",
            },
          ].map((category) => (
            <Link key={category.name} href={category.href} className="group">
              <div className="relative aspect-square overflow-hidden rounded-lg">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 transition-opacity duration-300 group-hover:bg-black/50" />
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center text-white">
                  <h3 className="text-xl font-semibold">{category.name}</h3>
                  <p className="mt-2 text-sm text-white/90">{category.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Special Offer */}
      <section className="bg-muted py-16">
        <div className="container flex flex-col items-center text-center">
          <span className="mb-2 rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
            Limited Time Offer
          </span>
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">20% Off Your First Purchase</h2>
          <p className="mb-8 max-w-2xl text-muted-foreground">
            Join our community of leather enthusiasts and receive 20% off your first order. Plus, get exclusive access to
            new collections and special offers.
          </p>
          <NewsletterForm />
        </div>
      </section>
    </div>
  )
}

