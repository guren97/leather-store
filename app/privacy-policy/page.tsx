import { Shield, Mail, Phone, MapPin } from "lucide-react"

export default function PrivacyPolicyPage() {
  return (
    <div className="container py-16">
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold tracking-tight">Privacy Policy</h1>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
          Last Updated: March 29, 2025
        </p>
      </div>

      <div className="mx-auto max-w-3xl">
        <div className="rounded-xl bg-card p-8 shadow-sm">
          <div className="prose prose-slate dark:prose-invert max-w-none">
            <div className="mb-8 flex items-center gap-3">
              <Shield className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold tracking-tight">1. Introduction</h2>
            </div>
            <p>
              Artisan Leather ("we," "our," or "us") respects your privacy and is committed to protecting your personal
              information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when
              you visit our website, including any other media form, media channel, mobile website, or mobile application
              related or connected to it (collectively, the "Site").
            </p>
            <p className="mb-4" >
              Please read this Privacy Policy carefully. If you do not agree with the terms of this Privacy Policy, please
              do not access the Site.
            </p>

            <div className="mb-8 flex items-center gap-3">
              <Shield className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold tracking-tight">2. Information We Collect</h2>
            </div>
            <h3 className="text-xl font-semibold">Personal Information</h3>
            <p>
              We may collect personal information that you voluntarily provide to us when you register on the Site, express
              an interest in obtaining information about us or our products, when you participate in activities on the Site,
              or otherwise when you contact us. The personal information we collect may include:
            </p>
            <ul>
              <li>Name</li>
              <li>Email address</li>
              <li>Mailing address</li>
              <li>Phone number</li>
              <li>Billing information</li>
              <li>Order history</li>
            </ul>

            <h3 className="text-xl font-semibold">Automatically Collected Information</h3>
            <p className="mb-4">
              When you visit our Site, we may automatically collect certain information about your device, including
              information about your web browser, IP address, time zone, and some of the cookies that are installed on your
              device. Additionally, as you browse the Site, we collect information about the individual web pages that you
              view, what websites or search terms referred you to the Site, and information about how you interact with the
              Site.
            </p>

            <div className="mb-8 flex items-center gap-3">
              <Shield className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold tracking-tight">3. How We Use Your Information</h2>
            </div>
            <p className="mb-4">We may use the information we collect for various purposes, including to:</p>
            <ul className="mb-4">
              <li>Process and fulfill your orders</li>
              <li>Provide, maintain, and improve our services</li>
              <li>Send you marketing communications</li>
              <li>Respond to your inquiries and provide customer support</li>
              <li>Monitor and analyze usage patterns and trends</li>
              <li>Protect against, identify, and prevent fraud and other illegal activity</li>
            </ul>

            <div className="mb-8 flex items-center gap-3">
              <Shield className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold tracking-tight">4. Sharing Your Information</h2>
            </div>
            <p className="mb-4">We may share your information with third parties in the following situations:</p>
            <ul className="mb-4">
              <li>With service providers who perform services on our behalf</li>
              <li>To comply with legal obligations</li>
              <li>To protect and defend our rights and property</li>
              <li>With your consent or at your direction</li>
            </ul>

            <div className="mb-8 flex items-center gap-3">
              <Shield className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold tracking-tight">5. Your Rights</h2>
            </div>
            <p className="mb-4">
              Depending on your location, you may have certain rights regarding your personal information, such as the right
              to access, correct, or delete your personal information, or to object to or restrict certain processing of
              your personal information.
            </p>

            <div className="mb-8 flex items-center gap-3">
              <Shield className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold tracking-tight">6. Security</h2>
            </div>
            <p className="mb-4">
              We use appropriate technical and organizational measures to protect your personal information. However, no
              method of transmission over the Internet or electronic storage is 100% secure, so we cannot guarantee absolute
              security.
            </p>

            <div className="mb-8 flex items-center gap-3">
              <Shield className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold tracking-tight">7. Changes to This Privacy Policy</h2>
            </div>
            <p className="mb-4">
              We may update this Privacy Policy from time to time. The updated version will be indicated by an updated "Last
              Updated" date and the updated version will be effective as soon as it is accessible.
            </p>

            <div className="mb-8 flex items-center gap-3">
              <Shield className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold tracking-tight">8. Contact Us</h2>
            </div>
            <p>If you have questions or comments about this Privacy Policy, please contact us at:</p>
            <div className="mt-4 space-y-4"> 
              <div className="flex items-start gap-4">
                <div className="rounded-full bg-primary/10 p-3">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Email Us</h3>
                  <a href="mailto:privacy@artisan-leather.shop" className="mt-1 text-muted-foreground hover:text-primary">
                    privacy@artisan-leather.shop
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

