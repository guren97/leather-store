"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"
import { useCart } from "@/lib/cart-context"
import { useToast } from "@/components/ui/use-toast"
import { motion } from "framer-motion"
import { ScaleIn } from "./animated-wrapper"

interface Product {
    id: string
    name: string
    description: string
    price: number
    image: any // Using any for now since it's a Next.js Image type
    category: string
    color: string
    featured: boolean
    rating: number
    reviewCount: number
    date: string
    quantity?: number
}

interface ProductCardProps {
    product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
    const { addToCart } = useCart()
    const { toast } = useToast()

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()

        addToCart({ ...product })

        toast({
            title: "Added to cart",
            description: `${product.name} has been added to your cart.`,
        })
    }

    return (
        <ScaleIn>
            <motion.div
                className="group relative flex flex-col overflow-hidden rounded-lg border"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
            >
                <Link href={`/products/${product.id}`} className="aspect-square overflow-hidden">
                    <Image
                        src={product.image}
                        alt={product.name}
                        width={300}
                        height={300}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                </Link>
                <div className="flex flex-1 flex-col p-4">
                    <h3 className="font-medium">
                        <Link href={`/products/${product.id}`}>{product.name}</Link>
                    </h3>
                    <p className="text-sm text-muted-foreground">{product.category}</p>
                    <div className="mt-2 flex items-center justify-between">
                        <span className="font-medium">Rs {product.price.toLocaleString()}</span>
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Button
                                size="sm"
                                variant="ghost"
                                className="bg-orange-500 text-white hover:text-orange-600"
                                onClick={handleAddToCart}
                            >
                                <ShoppingCart className="h-4 w-4" /> Add to Cart
                            </Button>
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        </ScaleIn>
    )
}

