import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Hammer, Heart, Leaf, Star } from "lucide-react"
import craftsmanship from "@/public/craftsmanship.jpg"
import sustainability from "@/public/sustainability.jpg"
import meticulous from "@/public/meticulous.jpg"
import artisanLeather from "@/public/artisan-leather.png"

export default function AboutPage() {
  return (
    <div className="container py-16">
      {/* Hero Section */}
      <div className="relative mb-20 h-[60vh] overflow-hidden rounded-2xl">
        <Image
          src={artisanLeather}
          alt="Leather crafting workshop"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white">
          <h1 className="mb-4 text-5xl font-bold tracking-tight sm:text-6xl">Our Story</h1>
          <p className="mx-auto max-w-2xl text-lg text-white/90">
            Crafting premium leather goods with traditional techniques and sustainable practices
          </p>
        </div>
      </div>

      {/* Values Section */}
      <div className="mb-20 grid gap-8 md:grid-cols-4">
        
        
        <div className="flex flex-col items-center text-center">
          <div className="mb-4 rounded-full bg-orange-100 p-4">
            <Hammer className="h-8 w-8 text-orange-500" />
          </div>
          <h3 className="mb-2 text-xl font-semibold">Expert Craftsmanship</h3>
          <p className="text-muted-foreground">Handcrafted with precision and care</p>
        </div>
        <div className="flex flex-col items-center text-center">
          <div className="mb-4 rounded-full bg-orange-100 p-4">
            <Heart className="h-8 w-8 text-orange-500" />
          </div>
          <h3 className="mb-2 text-xl font-semibold">Quality Materials</h3>
          <p className="text-muted-foreground">Premium leathers and hardware</p>
        </div>
        <div className="flex flex-col items-center text-center">
          <div className="mb-4 rounded-full bg-orange-100 p-4">
            <Leaf className="h-8 w-8 text-orange-500" />
          </div>
          <h3 className="mb-2 text-xl font-semibold">Sustainability</h3>
          <p className="text-muted-foreground">Eco-friendly practices</p>
        </div>
        <div className="flex flex-col items-center text-center">
          <div className="mb-4 rounded-full bg-orange-100 p-4">
            <Star className="h-8 w-8 text-orange-500" />
          </div>
          <h3 className="mb-2 text-xl font-semibold">Customer Satisfaction</h3>
          <p className="text-muted-foreground">Excellence in every detail</p>
        </div>
      </div>

      {/* Our Story Section */}
      <section className="mb-20 grid gap-12 md:grid-cols-2 md:items-center">
        <div className="relative aspect-square overflow-hidden rounded-2xl">
          <Image
            src={craftsmanship}
            alt="Artisan working on leather"
            fill
            className="object-cover"
          />
        </div>
        <div className="space-y-6">
          <h2 className="text-3xl font-bold tracking-tight">Crafting Excellence Since 2010</h2>
          <div className="space-y-4 text-muted-foreground">
            <p>
              Artisan Leather was founded in 2010 by master craftsman James Miller, who had spent over two decades
              perfecting his leatherworking skills. What began as a small workshop in Portland has grown into a
              respected brand known for exceptional quality and timeless designs.
            </p>
            <p>
              Our journey started with a simple belief: that in a world of mass production and disposable goods, there
              is profound value in items crafted with care, designed to last for generations, and that become more
              beautiful with age and use.
            </p>
            <p>
              Today, we remain committed to the traditional techniques that have defined our craft for centuries, while
              embracing innovation that enhances the durability and functionality of our products.
            </p>
          </div>
        </div>
      </section>

      {/* Craftsmanship Section */}
      <section className="mb-20 grid gap-12 md:grid-cols-2 md:items-center">
        <div className="order-last space-y-6 md:order-first">
          <h2 className="text-3xl font-bold tracking-tight">Meticulous Craftsmanship</h2>
          <div className="space-y-4 text-muted-foreground">
            <p>
              Every Artisan Leather product is handcrafted in our workshop by skilled artisans who have spent years
              perfecting their craft. We believe in the value of human touch and the unique character it brings to each
              piece.
            </p>
            <p>
              Our process begins with carefully selecting the finest full-grain leathers, which we cut and shape by
              hand. Each piece is then stitched using traditional saddle-stitching techniques that create stronger, more
              durable seams than machine stitching.
            </p>
            <p>
              Edges are meticulously burnished and treated with natural waxes for a smooth finish and water resistance.
              Hardware is selected for both its aesthetic appeal and longevity, with solid brass being our material of
              choice for its durability and beautiful patina development.
            </p>
          </div>
        </div>
        <div className="relative aspect-square overflow-hidden rounded-2xl">
          <Image
            src={meticulous}
            alt="Leather crafting tools and process"
            fill
            className="object-cover"
          />
        </div>
      </section>

      {/* Sustainability Section */}
      <section className="mb-20 grid gap-12 md:grid-cols-2 md:items-center">
        <div className="relative aspect-square overflow-hidden rounded-2xl">
          <Image
            src={sustainability}
            alt="Sustainable leather tanning process"
            fill
            className="object-cover"
          />
        </div>
        <div className="space-y-6">
          <h2 className="text-3xl font-bold tracking-tight">Commitment to Sustainability</h2>
          <div className="space-y-4 text-muted-foreground">
            <p>
              We believe that true luxury is sustainable. That's why we source our leathers from tanneries that adhere
              to strict environmental standards and use vegetable-based tanning processes that are eco-friendly.
            </p>
            <p>
              Our leather is a byproduct of the food industry, ensuring that no animals are raised solely for their
              hides. We use every part of the hide, minimizing waste, and any scraps are repurposed into smaller goods
              or donated to local art programs.
            </p>
            <p>
              Our packaging is plastic-free and made from recycled materials that can be reused or recycled again. We're
              constantly evaluating our processes to find ways to reduce our environmental footprint while maintaining
              the exceptional quality our customers expect.
            </p>
          </div>
        </div>
      </section>

       

      {/* Call to Action */}
      <section className="rounded-2xl bg-orange-50 p-12 text-center">
        <h2 className="mb-4 text-3xl font-bold tracking-tight">Experience the Difference</h2>
        <p className="mx-auto mb-8 max-w-2xl text-muted-foreground">
          Discover our collection of handcrafted leather goods designed to last a lifetime
        </p>
        <Button asChild size="lg" className="bg-orange-500 text-white hover:bg-orange-600">
          <Link href="/products">Shop Our Collection</Link>
        </Button>
      </section>
    </div>
  )
}

