import { Truck, Mail } from "lucide-react"

export default function ShippingPolicyPage() {
  return (
    <div className="container py-16">
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold tracking-tight">Shipping Policy</h1>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
          Last Updated: March 29, 2025
        </p>
      </div>

      <div className="mx-auto max-w-3xl">
        <div className="rounded-xl bg-card p-8 shadow-sm">
          <div className="prose prose-slate dark:prose-invert max-w-none">
            <div className="mb-8 flex items-center gap-3">
              <Truck className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold tracking-tight">1. Processing Time</h2>
            </div>
            <p className="">
              All orders are processed within 1-3 business days (excluding weekends and holidays) after receiving your order
              confirmation email. You will receive another notification when your order has shipped.
            </p>
            <p className="mb-4">
              Custom orders may take 2-4 weeks to process depending on the complexity of the item and our current production
              schedule.
            </p>

            <div className="mb-8 flex items-center gap-3">
              <Truck className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold tracking-tight">2. Shipping Options</h2>
            </div>
            <h3 className="text-xl font-semibold">Domestic Shipping (Pakistan)</h3>
            <ul>
              <li>
                <strong>Standard Shipping:</strong> 3-5 business days (Free on orders over Rs 30,000)
              </li>
              <li>
                <strong>Express Shipping:</strong> 2-3 business days (Rs 500)
              </li>
              <li>
                <strong>Same Day Delivery:</strong> Available in major cities (Rs 1,000)
              </li>
            </ul>

            <h3 className="text-xl font-semibold">International Shipping</h3>
            <p>
              We currently ship to most countries worldwide. International shipping rates are calculated at checkout based
              on destination and package weight.
            </p>
            <ul>
              <li>
                <strong>Standard International:</strong> 7-14 business days (Starting from Rs 5,000)
              </li>
              <li>
                <strong>Express International:</strong> 3-5 business days (Starting from Rs 8,000)
              </li>
            </ul>
            <p className="mb-4">
              Please note that international customers are responsible for all duties, import taxes, and customs fees that
              may be incurred. These charges are not included in the shipping cost or product price.
            </p>

            <div className="mb-8 flex items-center gap-3">
              <Truck className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold tracking-tight">3. Tracking Information</h2>
            </div>
            <p className="mb-4">
              You will receive a shipping confirmation email with a tracking number once your order has shipped. You can
              track your package through our website or the courier service's tracking portal.
            </p>

            <div className="mb-8 flex items-center gap-3">
              <Truck className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold tracking-tight">4. Shipping Delays</h2>
            </div>
            <p>
              While we make every effort to ship orders within the timeframes listed above, occasionally delays may occur
              due to:
            </p>
            <ul>
              <li>High order volume during peak seasons</li>
              <li>Weather conditions affecting delivery routes</li>
              <li>Courier service delays</li>
              <li>Customs processing for international orders</li>
              <li>Local holidays and events</li>
            </ul>
            <p className="mb-4">We will notify you of any significant delays that may affect your order.</p>

            <div className="mb-8 flex items-center gap-3">
              <Truck className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold tracking-tight">5. Damaged or Lost Packages</h2>
            </div>
            <p className="mb-4">
              If your package arrives damaged or is lost during transit, please contact us within 7 days of the expected
              delivery date. We will work with the courier service to file a claim and resolve the issue as quickly as
              possible.
            </p>

            <div className="mb-8 flex items-center gap-3">
              <Truck className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold tracking-tight">6. Address Changes</h2>
            </div>
            <p className="mb-4">
              If you need to change your shipping address after placing your order, please contact us immediately. We can
              only accommodate address changes if the order has not yet been shipped.
            </p>

            <div className="mb-8 flex items-center gap-3">
              <Truck className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold tracking-tight">7. Contact Us</h2>
            </div>
            <p className="mb-4">If you have any questions about our shipping policy, please contact us at:</p>
            <div className="mt-4 space-y-4">
              <div className="flex items-start gap-4">
                <div className="rounded-full bg-primary/10 p-3">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Email Us</h3>
                  <a href="mailto:shipping@artisan-leather.shop" className="mt-1 text-muted-foreground hover:text-primary">
                    shipping@artisan-leather.shop
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

