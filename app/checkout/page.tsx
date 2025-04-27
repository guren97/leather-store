"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { ArrowLeft, ArrowRight,  ShieldCheck } from "lucide-react"
import { useCart } from "@/lib/cart-context"
import CheckoutSteps from "@/components/checkout-steps"

import jazzcashCard from "@/public/paymentlogo/jazzcash-card.png"
import jazzcashMobile from "@/public/paymentlogo/jazzcash-mobile.png"
import easypaisa from "@/public/paymentlogo/easypaisa.png"

export default function CheckoutPage() {
  const { cart } = useCart()
  const router = useRouter()
  const { toast } = useToast()
  const [currentStep, setCurrentStep] = useState(1)
  const [isProcessing, setIsProcessing] = useState(false)

  // Form state
  const [shippingInfo, setShippingInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "Pakistan",
  })

  const [paymentInfo, setPaymentInfo] = useState({
    mobileNumber: "",
    sameAsShipping: true,
  })

  const [shippingMethod, setShippingMethod] = useState("standard")
  const [paymentMethod, setPaymentMethod] = useState("jazzcash-card")

  // Calculate order totals
  const subtotal = cart?.reduce((total, item) => total + (item.price || 0) * (item.quantity || 0), 0) || 0
  const shippingCost = shippingMethod === "express" ? 4500 : subtotal > 30000 ? 0 : 3000
  const tax = subtotal * 0.08 // 8% tax rate
  const total = subtotal + shippingCost + tax

  // Handle form input changes
  const handleShippingChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setShippingInfo((prev) => ({ ...prev, [name]: value }))
  }

 

  // Validate current step before proceeding
  const validateCurrentStep = () => {
    if (currentStep === 1) {
      // Validate shipping info
      const requiredFields = ["firstName", "lastName", "email", "phone", "address", "city", "state", "zipCode"] as const
      const missingFields = requiredFields.filter((field) => !shippingInfo[field])

      if (missingFields.length > 0) {
        toast({
          title: "Missing information",
          description: "Please fill in all required fields.",
          variant: "destructive",
        })
        return false
      }

      // Basic email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(shippingInfo.email)) {
        toast({
          title: "Invalid email",
          description: "Please enter a valid email address.",
          variant: "destructive",
        })
        return false
      }
    }

    return true
  }

  // Handle next step
  const handleNextStep = () => {
    if (validateCurrentStep()) {
      if (currentStep < 3) {
        setCurrentStep(currentStep + 1)
        window.scrollTo(0, 0)
      }
    }
  }

  // Handle previous step
  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
      window.scrollTo(0, 0)
    }
  }

  // Handle order submission
  const handlePlaceOrder = () => {
    setIsProcessing(true)

    // Simulate order processing
    setTimeout(() => {
      // Generate a random order ID
      const orderId = Math.floor(100000 + Math.random() * 900000).toString()

      // Redirect to order success page with the order ID
      router.push(`/order-success?order-id=${orderId}`)
    }, 2000)
  }

  // If cart is empty or undefined, redirect to cart page
  if (!cart || cart.length === 0) {
    return (
      <div className="container py-16">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="mb-6 text-3xl font-bold tracking-tight">Your cart is empty</h1>
          <p className="mb-8 text-muted-foreground">Add some products to your cart before proceeding to checkout.</p>
          <Button asChild>
            <Link href="/products">Browse Products</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-10">
      <div className="mb-8">
        <Link href="/cart" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to cart
        </Link>
      </div>

      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight">Checkout</h1>
        <p className="text-muted-foreground">Complete your purchase by providing your shipping and payment details.</p>
      </div>

      <CheckoutSteps currentStep={currentStep} />

      <div className="mt-10 grid gap-10 lg:grid-cols-3">
        <div className="lg:col-span-2">
          {/* Step 1: Shipping Information */}
          {currentStep === 1 && (
            <div className="space-y-8">
              <div>
                <h2 className="mb-4 text-xl font-semibold">Shipping Information</h2>
                <div className="grid gap-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        value={shippingInfo.firstName}
                        onChange={handleShippingChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        value={shippingInfo.lastName}
                        onChange={handleShippingChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={shippingInfo.email}
                        onChange={handleShippingChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={shippingInfo.phone}
                        onChange={handleShippingChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Address *</Label>
                    <Textarea
                      id="address"
                      name="address"
                      value={shippingInfo.address}
                      onChange={handleShippingChange}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                    <div className="space-y-2">
                      <Label htmlFor="city">City *</Label>
                      <Input id="city" name="city" value={shippingInfo.city} onChange={handleShippingChange} required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">State/Province *</Label>
                      <Input
                        id="state"
                        name="state"
                        value={shippingInfo.state}
                        onChange={handleShippingChange}
                        required
                      />
                    </div>
                    <div className="space-y-2 sm:col-span-1">
                      <Label htmlFor="zipCode">Zip/Postal Code *</Label>
                      <Input
                        id="zipCode"
                        name="zipCode"
                        value={shippingInfo.zipCode}
                        onChange={handleShippingChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="country">Country *</Label>
                    <Input
                      id="country"
                      name="country"
                      value={shippingInfo.country}
                      onChange={handleShippingChange}
                      required
                    />
                  </div>
                </div>
              </div>

              <div>
                <h2 className="mb-4 text-xl font-semibold">Shipping Method</h2>
                <RadioGroup value={shippingMethod} onValueChange={setShippingMethod} className="space-y-3">
                  <div className="flex items-start space-x-3 rounded-lg border p-4">
                    <RadioGroupItem id="standard" value="standard" className="mt-1" />
                    <div className="flex-1">
                      <Label htmlFor="standard" className="flex cursor-pointer items-center justify-between">
                        <div>
                          <div className="font-medium">Standard Shipping</div>
                          <div className="text-sm text-muted-foreground">3-5 business days</div>
                        </div>
                        <div className="font-medium">{subtotal > 30000 ? "Free" : "Rs 3,000"}</div>
                      </Label>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 rounded-lg border p-4">
                    <RadioGroupItem id="express" value="express" className="mt-1" />
                    <div className="flex-1">
                      <Label htmlFor="express" className="flex cursor-pointer items-center justify-between">
                        <div>
                          <div className="font-medium">Express Shipping</div>
                          <div className="text-sm text-muted-foreground">1-2 business days</div>
                        </div>
                        <div className="font-medium">Rs 4,500</div>
                      </Label>
                    </div>
                  </div>
                </RadioGroup>
              </div>
            </div>
          )}

          {/* Step 2: Payment Information */}
          {currentStep === 2 && (
            <div className="space-y-8">
              <div>
                <h2 className="mb-4 text-xl font-semibold">Payment Method</h2>
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-3">
                  <div className="flex items-start space-x-3 rounded-lg border p-4">
                   
                    <RadioGroupItem id="jazzcash-card" value="jazzcash-card" className="mt-2.5" />
                    
                    <div className="flex-1">
                      <Label htmlFor="jazzcash-card" className="flex cursor-pointer items-center justify-between">
                        <div className="font-medium">Jazzcash Card</div>
                        <Image
                          src={jazzcashCard}
                          alt="Jazzcash Card"
                          width={30}
                          height={30}
                        />
                      </Label>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 rounded-lg border p-4">
                    <RadioGroupItem id="jazzcash-mobile" value="jazzcash-mobile" className="mt-2.5" />
                    <div className="flex-1">
                      <Label htmlFor="jazzcash-mobile" className="flex cursor-pointer items-center justify-between">
                        <div className="font-medium">Jazzcash Mobile Account</div>
                        <Image
                          src={jazzcashMobile}
                          alt="Jazzcash Mobile"
                          width={30}
                          height={30}
                        />
                      </Label>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 rounded-lg border p-4">
                    <RadioGroupItem id="easypaisa" value="easypaisa" className="mt-1" />
                    <div className="flex-1">
                      <Label htmlFor="easypaisa" className="flex cursor-pointer items-center justify-between">
                        <div className="font-medium">Easypaisa</div>
                        <Image
                          src={easypaisa}
                          alt="Easypaisa"
                          width={40}
                          height={30}
                        />
                      </Label>
                    </div>
                  </div>
                </RadioGroup>
              </div>

              <div className="rounded-lg border p-6">
                <div className="flex items-center gap-4">
                  <ShieldCheck className="h-8 w-8 text-primary" />
                  <div>
                    <h3 className="font-medium">Secure Payment</h3>
                    <p className="text-sm text-muted-foreground">
                      Your payment information is encrypted and secure. We never store your payment details.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Review Order */}
          {currentStep === 3 && (
            <div className="space-y-8">
              <div>
                <h2 className="mb-4 text-xl font-semibold">Review Your Order</h2>
                <Card>
                  <CardContent className="p-6">
                    <div className="space-y-6">
                      <div>
                        <h3 className="mb-2 font-medium">Shipping Information</h3>
                        <div className="rounded-lg bg-muted p-3 text-sm">
                          <p className="font-medium">
                            {shippingInfo.firstName} {shippingInfo.lastName}
                          </p>
                          <p>{shippingInfo.address}</p>
                          <p>
                            {shippingInfo.city}, {shippingInfo.state} {shippingInfo.zipCode}
                          </p>
                          <p>{shippingInfo.country}</p>
                          <p className="mt-2">{shippingInfo.email}</p>
                          <p>{shippingInfo.phone}</p>
                        </div>
                      </div>

                      <div>
                        <h3 className="mb-2 font-medium">Shipping Method</h3>
                        <div className="rounded-lg bg-muted p-3 text-sm">
                          <p>
                            {shippingMethod === "standard"
                              ? "Standard Shipping (3-5 business days)"
                              : "Express Shipping (1-2 business days)"}
                          </p>
                        </div>
                      </div>

                      <div>
                        <h3 className="mb-2 font-medium">Payment Method</h3>
                        <div className="rounded-lg bg-muted p-3 text-sm">
                          {paymentMethod === "jazzcash-card" ? (
                            <p>Jazzcash Card</p>
                          ) : paymentMethod === "jazzcash-mobile" ? (
                            <p>Jazzcash Mobile Account</p>
                          ) : (
                            <p>Easypaisa</p>
                          )}
                        </div>
                      </div>

                      <div>
                        <h3 className="mb-2 font-medium">Items</h3>
                        <div className="space-y-3">
                          {cart.map((item) => (
                            <div key={item.id} className="flex items-center gap-4">
                              <div className="relative aspect-square h-16 w-16 min-w-16 overflow-hidden rounded-md">
                                <Image
                                  src={item.image || "/placeholder.svg"}
                                  alt={item.name}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <div className="flex-1">
                                <div className="font-medium">{item.name}</div>
                                <div className="text-sm text-muted-foreground">Qty: {item.quantity}</div>
                              </div>
                              <div className="text-right font-medium">
                                Rs {(item.price * item.quantity).toLocaleString()}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="rounded-lg border p-6">
                <div className="flex items-center gap-4">
                  <ShieldCheck className="h-8 w-8 text-primary" />
                  <div>
                    <h3 className="font-medium">Secure Checkout</h3>
                    <p className="text-sm text-muted-foreground">
                      Your payment information is encrypted and secure. We never store your full card details.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Order Summary */}
        <div>
          <div className="sticky top-20">
            <h2 className="mb-4 text-xl font-semibold">Order Summary</h2>
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>Rs {subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>{shippingCost === 0 ? "Free" : `Rs ${shippingCost.toLocaleString()}`}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>Rs {tax.toLocaleString()}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-medium">
                    <span>Total</span>
                    <span>Rs {total.toLocaleString()}</span>
                  </div>
                </div>

                <div className="mt-6 space-y-4">
                  {currentStep < 3 ? (
                    <Button className="w-full" onClick={handleNextStep}>
                      Continue
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  ) : (
                    <Button className="w-full" onClick={handlePlaceOrder} disabled={isProcessing}>
                      {isProcessing ? "Processing..." : "Place Order"}
                    </Button>
                  )}

                  {currentStep > 1 && (
                    <Button variant="outline" className="w-full" onClick={handlePrevStep}>
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Back
                    </Button>
                  )}
                </div>

                <div className="mt-6 text-center text-xs text-muted-foreground">
                  By placing your order, you agree to our{" "}
                  <Link href="/terms-of-service" className="underline underline-offset-2">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy-policy" className="underline underline-offset-2">
                    Privacy Policy
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

