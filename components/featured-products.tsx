"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import ProductCard from "@/components/product-card"
import { products } from "@/lib/products"
import { useMobile } from "@/hooks/use-mobile"

export default function FeaturedProducts() {
  const isMobile = useMobile()
  const [currentIndex, setCurrentIndex] = useState(0)

  const featuredProducts = products.filter((product) => product.featured)
  const displayCount = isMobile ? 1 : 5
  const maxIndex = featuredProducts.length - displayCount

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1))
  }

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide()
    }, 5000)

    return () => clearInterval(interval)
  }, [currentIndex])

  return (
    <div className="relative">
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * (100 / displayCount)}%)`,
            width: `${(featuredProducts.length / displayCount) * 100}%`,
          }}
        >
          {featuredProducts.map((product) => (
            <div key={product.id} className="px-2" style={{ width: `${100 / featuredProducts.length}%` }}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
      <Button
        variant="outline"
        size="icon"
        className="absolute -left-4 top-1/2 z-10 h-8 w-8 -translate-y-1/2 rounded-full"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-4 w-4" />
        <span className="sr-only">Previous</span>
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="absolute -right-4 top-1/2 z-10 h-8 w-8 -translate-y-1/2 rounded-full"
        onClick={nextSlide}
      >
        <ChevronRight className="h-4 w-4" />
        <span className="sr-only">Next</span>
      </Button>
    </div>
  )
}

