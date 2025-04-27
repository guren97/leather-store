"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { CheckCircle, ChevronRight, Package, Printer, ShoppingBag } from "lucide-react"
import { useCart } from "@/lib/cart-context"
import { useSearchParams } from "next/navigation"
import { CartItem } from "@/lib/types"

interface OrderDetails {
  orderNumber: string
  orderDate: string
  items: CartItem[]
  subtotal: number
  shipping: number
  tax: number
  total: number
  shippingAddress: {
    name: string
    street: string
    city: string
    state: string
    zip: string
    country: string
  }
  paymentMethod: string
}

export default function OrderSuccessPage() {
  const { cart, clearCart } = useCart()
  const searchParams = useSearchParams()
  const [orderDetails, setOrderDetails] = useState<OrderDetails>({
    orderNumber: "",
    orderDate: "",
    items: [],
    subtotal: 0,
    shipping: 0,
    tax: 0,
    total: 0,
    shippingAddress: {
      name: "",
      street: "",
      city: "",
      state: "",
      zip: "",
      country: ""
    },
    paymentMethod: ""
  })
  const [initialized, setInitialized] = useState(false)

  useEffect(() => {
    // Only run this effect once
    if (!initialized) {
      try {
        // Generate a random order number
        const orderNumber = `AL-${Math.floor(100000 + Math.random() * 900000)}`

        // Calculate order totals
        const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0)
        const shipping = subtotal > 30000 ? 0 : 3000
        const tax = subtotal * 0.08 // 8% tax rate
        const total = subtotal + shipping + tax

        // Format the current date
        const orderDate = new Date().toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })

        // Set order details without referencing the previous state
        setOrderDetails({
          orderNumber,
          orderDate,
          items: [...cart],
          subtotal,
          shipping,
          tax,
          total,
          shippingAddress: {
            name: "",
            street: "",
            city: "",
            state: "",
            zip: "",
            country: ""
          },
          paymentMethod: "Credit Card"
        })

        // Clear the cart after order is placed
        // Only clear if coming from checkout (has order-id param)
        if (searchParams.has("order-id")) {
          clearCart()
        }

        setInitialized(true)
      } catch (error) {
        console.error("Error processing order:", error)
        // Optionally set an error state here
      }
    }
  }, [cart, clearCart, searchParams, initialized])

  // If no items in order and no order-id param, likely direct navigation to page
  if (orderDetails.items.length === 0 && !searchParams.has("order-id")) {
    return (
      <div className="container py-16">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="mb-6 text-3xl font-bold tracking-tight">No Order Found</h1>
          <p className="mb-8 text-muted-foreground">
            It looks like you haven't placed an order yet or have accessed this page directly.
          </p>
          <Button asChild>
            <Link href="/products">Browse Products</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-10">
      <div className="mx-auto max-w-3xl">
        <div className="mb-10 text-center">
          <div className="mb-4 flex justify-center">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          <h1 className="mb-2 text-3xl font-bold tracking-tight">Order Confirmed!</h1>
          <p className="text-muted-foreground">
            Thank you for your purchase. Your order has been received and is being processed.
          </p>
        </div>

        <div className="mb-8 grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                  <div>
                    <div className="text-sm text-muted-foreground">Order Number</div>
                    <div className="font-medium">{orderDetails.orderNumber}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Date Placed</div>
                    <div className="font-medium">{orderDetails.orderDate}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Total Amount</div>
                    <div className="font-medium">Rs {orderDetails.total.toLocaleString()}</div>
                  </div> 
                </div>

                <Separator className="my-2" />

                <div>
                  <h3 className="mb-3 font-medium">Items Ordered</h3>
                  <div className="space-y-4">
                    {orderDetails.items.map((item) => (
                      <div key={item.id} className="flex items-start gap-4">
                        <div className="relative aspect-square h-16 w-16 min-w-16 overflow-hidden rounded-md">
                          <Image src={item.image} alt={item.name} fill className="object-cover" />
                        </div>
                        <div className="flex-1">
                          <div className="font-medium">{item.name}</div>
                          <div className="text-sm text-muted-foreground">
                            Qty: {item.quantity} × Rs {item.price.toLocaleString()}
                          </div>
                        </div>
                        <div className="text-right font-medium">Rs {(item.price * item.quantity).toLocaleString()}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator className="my-2" />

                <div className="grid gap-2">
                  <div className="flex justify-between">
                    <div className="text-sm">Subtotal</div>
                    <div>Rs {orderDetails.subtotal.toLocaleString()}</div>
                  </div>
                  <div className="flex justify-between">
                    <div className="text-sm">Shipping</div>
                    <div>{orderDetails.shipping === 0 ? "Free" : `Rs ${orderDetails.shipping.toLocaleString()}`}</div>
                  </div>
                  <div className="flex justify-between">
                    <div className="text-sm">Tax</div>
                    <div>Rs {orderDetails.tax.toLocaleString()}</div>
                  </div>
                  <Separator className="my-2" />
                  <div className="flex justify-between font-medium">
                    <div>Total</div>
                    <div>Rs {orderDetails.total.toLocaleString()}</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card> 
        </div>

        <div className="mb-8 rounded-lg border p-6">
          <h3 className="mb-4 text-lg font-medium">What's Next?</h3>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="flex flex-col items-center text-center">
              <Package className="mb-2 h-8 w-8 text-primary" />
              <h4 className="font-medium">Processing Order</h4>
              <p className="text-sm text-muted-foreground">Your order is being prepared for shipment.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <svg
                className="mb-2 h-8 w-8 text-primary"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <h4 className="font-medium">Confirmation Email</h4>
              <p className="text-sm text-muted-foreground">A receipt has been sent to your email.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <svg
                className="mb-2 h-8 w-8 text-primary"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                />
              </svg>
              <h4 className="font-medium">Order Updates</h4>
              <p className="text-sm text-muted-foreground">We'll notify you when your order ships.</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:justify-between">
          <Button asChild variant="outline">
            <Link href="/products">
              <ShoppingBag className="mr-2 h-4 w-4" />
              Continue Shopping
            </Link>
          </Button> 
        </div>
      </div>
    </div>
  )
}

