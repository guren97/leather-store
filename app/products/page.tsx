"use client"

import { useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import ProductCard from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { products } from "@/lib/products"
import { StaticImageData } from "next/image"
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animated-wrapper"

const ITEMS_PER_PAGE = 9

interface Product {
    id: string
    name: string
    description: string
    price: number
    image: StaticImageData
    category: string
    color: string
    featured: boolean
    rating: number
    reviewCount: number
    date: string
    quantity?: number
}

export default function ProductsPage() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const page = Number(searchParams.get("page")) || 1
    const search = searchParams.get("search") || ""
    const category = searchParams.get("category") || ""
    const minPrice = Number(searchParams.get("minPrice")) || 0
    const maxPrice = Number(searchParams.get("maxPrice")) || 50000
    const sort = searchParams.get("sort") || "featured"

    const [filteredProducts, setFilteredProducts] = useState<Product[]>(products)
    const [isNavigating, setIsNavigating] = useState(false)

    useEffect(() => {
        let filtered = [...products]

        // Apply search filter
        if (search) {
            const searchLower = search.toLowerCase()
            filtered = filtered.filter(
                (product) =>
                    product.name.toLowerCase().includes(searchLower) ||
                    product.description.toLowerCase().includes(searchLower)
            )
        }

        // Apply category filter
        if (category) {
            filtered = filtered.filter((product) => product.category === category)
        }

        // Apply price filter
        filtered = filtered.filter((product) => product.price >= minPrice && product.price <= maxPrice)

        // Apply sorting
        switch (sort) {
            case "price-asc":
                filtered.sort((a, b) => a.price - b.price)
                break
            case "price-desc":
                filtered.sort((a, b) => b.price - a.price)
                break
            case "rating":
                filtered.sort((a, b) => b.rating - a.rating)
                break
            case "newest":
                filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                break
            default:
                filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
        }

        setFilteredProducts(filtered)
    }, [search, category, minPrice, maxPrice, sort])

    const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE)
    const startIndex = (page - 1) * ITEMS_PER_PAGE
    const paginatedProducts = filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE)

    const categories = Array.from(new Set(products.map((product) => product.category)))

    const updateSearchParams = async (updates: Record<string, string | null>) => {
        if (isNavigating) return

        try {
            setIsNavigating(true)
            const params = new URLSearchParams(searchParams.toString())
            Object.entries(updates).forEach(([key, value]) => {
                if (value === null) {
                    params.delete(key)
                } else {
                    params.set(key, value)
                }
            })
            await router.push(`?${params.toString()}`)
        } catch (error) {
            console.error('Navigation error:', error)
        } finally {
            setIsNavigating(false)
        }
    }

    return (
        <div className="container py-8">
            <FadeIn>
                <div className="mb-8">
                    <h1 className="mb-2 text-3xl font-bold">All Products</h1>
                    <p className="text-muted-foreground">Browse our collection of premium leather goods</p>
                </div>
            </FadeIn>

            <div className="grid gap-8 lg:grid-cols-4">
                <FadeIn delay={0.2}>
                    <div className="lg:col-span-1">
                        <div className="rounded-lg border p-6">
                            <h2 className="mb-4 text-lg font-semibold">Filters</h2>
                            <div className="space-y-6">
                                <div>
                                    <h3 className="mb-2 text-sm font-medium">Categories</h3>
                                    <div className="space-y-2">
                                        {categories.map((cat) => (
                                            <div key={cat} className="flex items-center space-x-2">
                                                <Checkbox
                                                    id={cat}
                                                    checked={category === cat}
                                                    onCheckedChange={() => {
                                                        updateSearchParams({
                                                            category: category === cat ? null : cat,
                                                            page: "1"
                                                        })
                                                    }}
                                                />
                                                <label htmlFor={cat} className="text-sm">
                                                    {cat}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <h3 className="mb-2 text-sm font-medium">Price Range</h3>
                                    <Slider
                                        value={[minPrice, maxPrice]}
                                        min={0}
                                        max={50000}
                                        step={1000}
                                        onValueChange={([min, max]) => {
                                            updateSearchParams({
                                                minPrice: min.toString(),
                                                maxPrice: max.toString(),
                                                page: "1"
                                            })
                                        }}
                                    />
                                    <div className="mt-2 flex justify-between text-sm">
                                        <span>Rs {minPrice.toLocaleString()}</span>
                                        <span>Rs {maxPrice.toLocaleString()}</span>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="mb-2 text-sm font-medium">Sort By</h3>
                                    <Select
                                        value={sort}
                                        onValueChange={(value) => {
                                            updateSearchParams({
                                                sort: value,
                                                page: "1"
                                            })
                                        }}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select sorting" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="featured">Featured</SelectItem>
                                            <SelectItem value="price-asc">Price: Low to High</SelectItem>
                                            <SelectItem value="price-desc">Price: High to Low</SelectItem>
                                            <SelectItem value="rating">Highest Rated</SelectItem>
                                            <SelectItem value="newest">Newest</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </div>
                    </div>
                </FadeIn>

                <div className="lg:col-span-3">
                    <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {paginatedProducts.map((product) => (
                            <StaggerItem key={product.id}>
                                <ProductCard product={product} />
                            </StaggerItem>
                        ))}
                    </StaggerContainer>

                    {totalPages > 1 && (
                        <FadeIn delay={0.4}>
                            <div className="mt-8 flex justify-center gap-2">
                                <Button
                                    variant="outline"
                                    size="icon"
                                    disabled={page === 1}
                                    onClick={() => {
                                        updateSearchParams({
                                            page: (page - 1).toString()
                                        })
                                    }}
                                >
                                    <ChevronLeft className="h-4 w-4" />
                                </Button>
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                                    <Button
                                        key={pageNum}
                                        variant={pageNum === page ? "default" : "outline"}
                                        onClick={() => {
                                            updateSearchParams({
                                                page: pageNum.toString()
                                            })
                                        }}
                                    >
                                        {pageNum}
                                    </Button>
                                ))}
                                <Button
                                    variant="outline"
                                    size="icon"
                                    disabled={page === totalPages}
                                    onClick={() => {
                                        updateSearchParams({
                                            page: (page + 1).toString()
                                        })
                                    }}
                                >
                                    <ChevronRight className="h-4 w-4" />
                                </Button>
                            </div>
                        </FadeIn>
                    )}
                </div>
            </div>
        </div>
    )
}

