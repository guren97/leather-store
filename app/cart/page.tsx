"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react"
import { useCart } from "@/lib/cart-context"
import { useToast } from "@/components/ui/use-toast"

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart()
  const { toast } = useToast()
  const router = useRouter()
  const [promoCode, setPromoCode] = useState("")
  const [discount, setDiscount] = useState(0)
  const [isProcessing, setIsProcessing] = useState(false)

  // Update currency symbols in the cart page
  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0)
  const shipping = subtotal > 30000 ? 0 : 3000
  const total = subtotal + shipping - discount

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity < 1) return
    updateQuantity(id, newQuantity)
  }

  const handleRemoveItem = (id) => {
    removeFromCart(id)
    toast({
      title: "Item removed",
      description: "The item has been removed from your cart.",
    })
  }

  const handleApplyPromoCode = (e) => {
    e.preventDefault()
    if (promoCode.toLowerCase() === "discount20") {
      const discountAmount = subtotal * 0.2
      setDiscount(discountAmount)
      toast({
        title: "Promo code applied",
        description: "20% discount has been applied to your order.",
      })
    } else {
      toast({
        title: "Invalid promo code",
        description: "The promo code you entered is invalid or expired.",
        variant: "destructive",
      })
    }
  }

  const handleCheckout = () => {
    if (cart.length === 0) {
      toast({
        title: "Cart is empty",
        description: "Please add items to your cart before checking out.",
        variant: "destructive",
      })
      return
    }

    setIsProcessing(true)

    // Redirect to checkout page
    router.push("/checkout")
  }

  return (
    <div className="container py-10">
      <h1 className="mb-6 text-3xl font-bold tracking-tight">Your Cart</h1>

      {cart.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed py-16">
          <ShoppingBag className="mb-4 h-16 w-16 text-muted-foreground" />
          <h2 className="mb-2 text-xl font-medium">Your cart is empty</h2>
          <p className="mb-6 text-muted-foreground">Looks like you haven't added anything to your cart yet.</p>
          <Button asChild>
            <Link href="/products">Continue Shopping</Link>
          </Button>
        </div>
      ) : (
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="rounded-lg border">
              <div className="p-6">
                <div className="hidden grid-cols-[1fr_auto_auto_auto] items-center gap-4 pb-4 md:grid">
                  <div>Product</div>
                  <div>Price</div>
                  <div>Quantity</div>
                  <div>Total</div>
                </div>
                <Separator className="mb-6 hidden md:block" />
                <div className="space-y-6">
                  {cart.map((item) => (
                    <div key={item.id} className="space-y-4">
                      <div className="grid grid-cols-1 gap-4 md:grid-cols-[1fr_auto_auto_auto] md:items-center">
                        <div className="flex items-center gap-4">
                          <div className="relative aspect-square h-20 w-20 min-w-20 overflow-hidden rounded-lg">
                            <Image
                              src={item.image || "/placeholder.svg"}
                              alt={item.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <h3 className="font-medium">
                              <Link href={`/products/${item.id}`} className="hover:underline">
                                {item.name}
                              </Link>
                            </h3>
                            <p className="text-sm text-muted-foreground">{item.color}</p>
                            {/* Update in the mobile view */}
                            <div className="mt-1 flex md:hidden">
                              <p>Rs {item.price.toLocaleString()}</p>
                            </div>
                          </div>
                        </div>
                        {/* Update in the cart item display */}
                        <div className="hidden md:block">Rs {item.price.toLocaleString()}</div>
                        <div className="flex h-10 w-32 items-center">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-full rounded-r-none"
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <div className="flex h-full flex-1 items-center justify-center border-y">{item.quantity}</div>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-full rounded-l-none"
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="flex items-center justify-between md:block">
                          {/* Update in the item total */}
                          <div className="md:text-right">Rs {(item.price * item.quantity).toLocaleString()}</div>
                          <Button variant="ghost" size="icon" onClick={() => handleRemoveItem(item.id)}>
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Remove item</span>
                          </Button>
                        </div>
                      </div>
                      <Separator />
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-between bg-muted p-6">
                <Button asChild variant="outline">
                  <Link href="/products">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Continue Shopping
                  </Link>
                </Button>
                <Button variant="outline" onClick={clearCart}>
                  Clear Cart
                </Button>
              </div>
            </div>
          </div>

          <div>
            <div className="rounded-lg border">
              <div className="p-6">
                <h2 className="mb-4 text-lg font-medium">Order Summary</h2>
                {/* Update in the order summary */}
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>Rs {subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? "Free" : `Rs ${shipping.toLocaleString()}`}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between">
                      <span>Discount</span>
                      <span>-Rs {discount.toLocaleString()}</span>
                    </div>
                  )}
                  <Separator />
                  <div className="flex justify-between font-medium">
                    <span>Total</span>
                    <span>Rs {total.toLocaleString()}</span>
                  </div>
                </div>
              </div>
              <Separator />
              <div className="p-6">
                <form onSubmit={handleApplyPromoCode} className="mb-4 flex gap-2">
                  <Input placeholder="Promo code" value={promoCode} onChange={(e) => setPromoCode(e.target.value)} />
                  <Button type="submit" variant="outline">
                    Apply
                  </Button>
                </form>
                <Button className="w-full" size="lg" onClick={handleCheckout} disabled={isProcessing}>
                  {isProcessing ? "Processing..." : "Checkout"}
                </Button>
                <div className="mt-4 text-center text-xs text-muted-foreground">Taxes calculated at checkout</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

