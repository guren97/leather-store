import Image from "next/image"
import Link from "next/link"

const categories = [
  {
    name: "Leather Apparel & Fashion",
    image: "/placeholder.svg?height=400&width=400&text=Leather+Apparel",
    href: "/products",
  },
  {
    name: "Leather Footwear",
    image: "/placeholder.svg?height=400&width=400&text=Leather+Footwear",
    href: "/products",
  },
  {
    name: "Leather Furniture & Home Decor",
    image: "/placeholder.svg?height=400&width=400&text=Leather+Furniture",
    href: "/products",
  },
  {
    name: "Industrial & Specialized Leather",
    image: "/placeholder.svg?height=400&width=400&text=Industrial+Leather",
    href: "/products",
  },
]

export default function CategorySection() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
      {categories.map((category) => (
        <Link key={category.name} href={category.href} className="group overflow-hidden rounded-lg">
          <div className="relative aspect-square overflow-hidden">
            <Image
              src={category.image || "/placeholder.svg"}
              alt={category.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/30 transition-opacity group-hover:bg-black/40" />
            <div className="absolute inset-0 flex items-center justify-center p-4 text-center">
              <h3 className="text-xl font-bold text-white">{category.name}</h3>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}

