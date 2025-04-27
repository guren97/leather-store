"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { useParams, notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Star, Truck, ShieldCheck, ArrowLeft, Minus, Plus, ShoppingCart } from "lucide-react"
import Link from "next/link"
import { products } from "@/lib/products"
import { useCart } from "@/lib/cart-context"
import { useToast } from "@/components/ui/use-toast"
import { FadeIn, ScaleIn } from "@/components/animated-wrapper"
import { motion } from "framer-motion"

export default function ProductDetailsPage() {
  const params = useParams()
  const { toast } = useToast()
  const { addToCart } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [isAddingToCart, setIsAddingToCart] = useState(false)

  const product = products.find((p) => p.id === params.id)

  if (!product) {
    notFound()
  }

  const handleAddToCart = () => {
    if (isAddingToCart) return

    try {
      setIsAddingToCart(true)
      addToCart({ ...product, quantity })
      toast({
        title: "Added to cart",
        description: `${product.name} (${quantity}) has been added to your cart.`,
      })
    } catch (error) {
      console.error('Error adding to cart:', error)
      toast({
        title: "Error",
        description: "Failed to add item to cart. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsAddingToCart(false)
    }
  }

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  const increaseQuantity = () => {
    if (quantity < 10) { // Add a reasonable maximum limit
      setQuantity(quantity + 1)
    }
  }

  const handleQuantityChange = (value: number) => {
    if (value >= 1 && value <= 10) {
      setQuantity(value)
    }
  }

  return (
    <div className="container py-10">
      <FadeIn>
        <Button asChild variant="ghost" className="mb-6">
          <Link href="/products">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Products
          </Link>
        </Button>
      </FadeIn>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Product Images */}
        <FadeIn delay={0.2}>
          <div className="space-y-4">
            <div className="relative aspect-square overflow-hidden rounded-lg">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="relative aspect-square overflow-hidden rounded-md">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={`${product.name} thumbnail ${i + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* Product Details */}
        <FadeIn delay={0.3}>
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">{product.name}</h1>
              <div className="mt-2 flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${i < product.rating ? "fill-primary text-primary" : "fill-muted text-muted"}`}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">{product.reviewCount} reviews</span>
              </div>
            </div>

            <div className="text-2xl font-semibold">Rs {product.price.toLocaleString()}</div>

            <p className="text-muted-foreground">{product.description}</p>

            <div>
              <h3 className="mb-2 font-medium">Color</h3>
              <div className="flex gap-2">
                {["Tan", "Brown", "Black"].map((color) => (
                  <div
                    key={color}
                    className="relative h-10 w-10 cursor-pointer rounded-full border"
                    style={{
                      backgroundColor: color === "Tan" ? "#D2B48C" : color === "Brown" ? "#5D4037" : "#212121",
                    }}
                  >
                    {color === product.color && (
                      <div className="absolute inset-0 rounded-full border-2 border-primary"></div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium">Quantity</h3>
              <div className="flex h-10 w-32 items-center">
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="h-full rounded-r-none" 
                  onClick={decreaseQuantity}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={quantity}
                  onChange={(e) => handleQuantityChange(Number(e.target.value))}
                  className="flex h-full w-16 items-center justify-center border-y bg-background text-center text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="h-full rounded-l-none" 
                  onClick={increaseQuantity}
                  disabled={quantity >= 10}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button 
                size="lg" 
                className="w-full" 
                onClick={handleAddToCart}
                disabled={isAddingToCart}
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                {isAddingToCart ? "Adding..." : "Add to Cart"}
              </Button>
            </motion.div>

            <div className="grid grid-cols-3 gap-4 pt-4">
              <div className="flex flex-col items-center text-center">
                <Truck className="mb-2 h-6 w-6 text-muted-foreground" />
                <span className="text-sm">Free Shipping</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <ShieldCheck className="mb-2 h-6 w-6 text-muted-foreground" />
                <span className="text-sm">2 Year Warranty</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <svg
                  className="mb-2 h-6 w-6 text-muted-foreground"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                <span className="text-sm">30-Day Returns</span>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>

      <FadeIn delay={0.4}>
        <div className="mt-16">
          <Tabs defaultValue="description">
            <TabsList className="w-full justify-start">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="mt-6">
              <div className="space-y-4">
                <p>
                  Our {product.name} is crafted from premium full-grain leather, known for its durability and character
                  that develops a beautiful patina over time. Each piece is meticulously handcrafted by our skilled
                  artisans using traditional techniques passed down through generations.
                </p>
                <p>
                  The leather is sourced from sustainable tanneries that adhere to strict environmental standards. We use
                  vegetable-based tanning processes that are eco-friendly and produce a rich, natural color that deepens
                  with age.
                </p>
                <p>
                  Every stitch is carefully placed using heavy-duty waxed thread for maximum durability. The edges are
                  hand-burnished and treated with natural waxes for a smooth finish and water resistance.
                </p>
                <p>
                  This product is designed to last for years and will become more beautiful with use as it develops a
                  unique patina that tells the story of your journey together.
                </p>
              </div>
            </TabsContent>
            <TabsContent value="specifications" className="mt-6">
              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <h3 className="font-medium">Materials</h3>
                    <p className="text-sm text-muted-foreground">
                      Full-grain vegetable-tanned leather, waxed thread, solid brass hardware
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-medium">Dimensions</h3>
                    <p className="text-sm text-muted-foreground">8.5" x 4.5" x 1" (21.6cm x 11.4cm x 2.5cm)</p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-medium">Weight</h3>
                    <p className="text-sm text-muted-foreground">8 oz (227g)</p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-medium">Origin</h3>
                    <p className="text-sm text-muted-foreground">Handcrafted in USA</p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-medium">Care Instructions</h3>
                    <p className="text-sm text-muted-foreground">
                      Clean with damp cloth, condition with leather balm every 3-6 months
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-medium">Warranty</h3>
                    <p className="text-sm text-muted-foreground">2-year limited warranty</p>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="reviews" className="mt-6">
              <div className="space-y-6">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-10 w-10 rounded-full bg-muted" />
                        <div>
                          <h4 className="font-medium">Customer {i + 1}</h4>
                          <div className="flex">
                            {[...Array(5)].map((_, j) => (
                              <Star
                                key={j}
                                className={`h-4 w-4 ${j < 5 - i ? "fill-primary text-primary" : "fill-muted text-muted"}`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                      <span className="text-sm text-muted-foreground">2 days ago</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Excellent quality and craftsmanship. The leather is beautiful and the stitching is perfect.
                    </p>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </FadeIn>
    </div>
  )
}

