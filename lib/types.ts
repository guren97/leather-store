import { StaticImageData } from "next/image"

export interface Product {
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
}

export interface CartItem extends Product {
  quantity: number
}

export interface CartContextType {
  cart: CartItem[]
  addToCart: (product: Product) => void
  updateQuantity: (id: string, quantity: number) => void
  removeFromCart: (id: string) => void
  clearCart: () => void
} 