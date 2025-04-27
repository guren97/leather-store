import { Scale, Mail, Phone, MapPin } from "lucide-react"

export default function TermsOfServicePage() {
  return (
    <div className="container py-16">
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold tracking-tight">Terms of Service</h1>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
          Last Updated: March 29, 2025
        </p>
      </div>

      <div className="mx-auto max-w-3xl">
        <div className="rounded-xl bg-card p-8 shadow-sm">
          <div className="prose prose-slate dark:prose-invert max-w-none">
            <div className="mb-8 flex items-center gap-3">
              <Scale className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold tracking-tight">1. Agreement to Terms</h2>
            </div>
            <p className="mb-4">
              By accessing or using our website, you agree to be bound by these Terms of Service and all applicable laws and
              regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this
              site.
            </p>

            <div className="mb-8 flex items-center gap-3">
              <Scale className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold tracking-tight">2. Use License</h2>
            </div>
            <p>
              Permission is granted to temporarily download one copy of the materials on Artisan Leather's website for
              personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and
              under this license you may not:
            </p>
            <ul>
              <li>Modify or copy the materials</li>
              <li>Use the materials for any commercial purpose or for any public display</li>
              <li>Attempt to decompile or reverse engineer any software contained on Artisan Leather's website</li>
              <li>Remove any copyright or other proprietary notations from the materials</li>
              <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
            </ul>
            <p className="mb-4">
              This license shall automatically terminate if you violate any of these restrictions and may be terminated by
              Artisan Leather at any time.
            </p>

            <div className="mb-8 flex items-center gap-3">
              <Scale className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold tracking-tight">3. Disclaimer</h2>
            </div>
            <p>
              The materials on Artisan Leather's website are provided on an 'as is' basis. Artisan Leather makes no
              warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without
              limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or
              non-infringement of intellectual property or other violation of rights.
            </p>
            <p className="mb-4">
              Further, Artisan Leather does not warrant or make any representations concerning the accuracy, likely results,
              or reliability of the use of the materials on its website or otherwise relating to such materials or on any
              sites linked to this site.
            </p>

            <div className="mb-8 flex items-center gap-3">
              <Scale className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold tracking-tight">4. Limitations</h2>
            </div>
            <p className="mb-4">
              In no event shall Artisan Leather or its suppliers be liable for any damages (including, without limitation,
              damages for loss of data or profit, or due to business interruption) arising out of the use or inability to
              use the materials on Artisan Leather's website, even if Artisan Leather or a Artisan Leather authorized
              representative has been notified orally or in writing of the possibility of such damage.
            </p>

            <div className="mb-8 flex items-center gap-3">
              <Scale className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold tracking-tight">5. Accuracy of Materials</h2>
            </div>
            <p className="mb-4">
              The materials appearing on Artisan Leather's website could include technical, typographical, or photographic
              errors. Artisan Leather does not warrant that any of the materials on its website are accurate, complete or
              current. Artisan Leather may make changes to the materials contained on its website at any time without
              notice. However Artisan Leather does not make any commitment to update the materials.
            </p>

            <div className="mb-8 flex items-center gap-3">
              <Scale className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold tracking-tight">6. Links</h2>
            </div>
            <p className="mb-4">
              Artisan Leather has not reviewed all of the sites linked to its website and is not responsible for the
              contents of any such linked site. The inclusion of any link does not imply endorsement by Artisan Leather of
              the site. Use of any such linked website is at the user's own risk.
            </p>

            <div className="mb-8 flex items-center gap-3">
              <Scale className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold tracking-tight">7. Modifications</h2>
            </div>
            <p className="mb-4">
              Artisan Leather may revise these terms of service for its website at any time without notice. By using this
              website you are agreeing to be bound by the then current version of these terms of service.
            </p>

            <div className="mb-8 flex items-center gap-3">
              <Scale className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold tracking-tight">8. Governing Law</h2>
            </div>
            <p className="mb-4">
              These terms and conditions are governed by and construed in accordance with the laws of the State of Oregon
              and you irrevocably submit to the exclusive jurisdiction of the courts in that State.
            </p>

            <div className="mb-8 flex items-center gap-3">
              <Scale className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold tracking-tight">9. Contact Us</h2>
            </div>
            <p>If you have any questions about these Terms of Service, please contact us at:</p>
            <div className="mt-4 space-y-4"> 
              <div className="flex items-start gap-4">
                <div className="rounded-full bg-primary/10 p-3">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Email Us</h3>
                  <a href="mailto:legal@artisan-leather.shop" className="mt-1 text-muted-foreground hover:text-primary">
                    legal@artisan-leather.shop
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

