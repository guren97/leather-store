"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Clock, Send } from "lucide-react"
import { SuccessModal } from "@/components/success-modal"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    setTimeout(() => {
      setShowSuccessModal(true)
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      })
      setIsSubmitting(false)
    }, 1500)
  }

  return (
    <>
      <div className="container py-16">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold tracking-tight">Get in Touch</h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Have a question about our leather goods? We're here to help. Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        <div className="grid gap-12 md:grid-cols-2">
          <div className="space-y-8">
            <div className="rounded-xl bg-card p-8 shadow-sm">
              <h2 className="mb-6 text-2xl font-bold tracking-tight">Send us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Your name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="bg-background"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Your email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="bg-background"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    name="subject"
                    placeholder="What's this about?"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="bg-background"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Your message"
                    rows={6}
                    required
                    value={formData.message}
                    onChange={handleChange}
                    className="bg-background"
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? (
                    "Sending..."
                  ) : (
                    <>
                      Send Message <Send className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>
            </div>

           
          </div>

          <div className="space-y-8">
            <div className="rounded-xl bg-card p-8 shadow-sm">
              <h2 className="mb-6 text-2xl font-bold tracking-tight">Contact Information</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                
                </div>
                <div className="flex items-start gap-4">
                  <div className="rounded-full bg-primary/10 p-3">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Email Us</h3>
                    <a href="mailto:info@artisan-leather.shop" className="mt-1 text-muted-foreground hover:text-primary">
                      info@artisan-leather.shop
                    </a>
                  </div>
                </div>
            
              </div>
            </div>

            <div className="rounded-xl bg-card p-8 shadow-sm">
              <h2 className="mb-6 text-2xl font-bold tracking-tight">Business Hours</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between rounded-lg bg-muted/50 p-4">
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-primary" />
                    <span>Monday - Friday</span>
                  </div>
                  <span className="font-medium">9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-muted/50 p-4">
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-primary" />
                    <span>Saturday</span>
                  </div>
                  <span className="font-medium">10:00 AM - 4:00 PM</span>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-muted/50 p-4">
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-primary" />
                    <span>Sunday</span>
                  </div>
                  <span className="font-medium">Closed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> 

      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        title="Message Sent Successfully!"
        description="Thank you for contacting us. We'll get back to you as soon as possible."
        buttonText="Close"
      />
    </>
  )
}

