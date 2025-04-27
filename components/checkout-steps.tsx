"use client"

import { Check } from "lucide-react"
import { cn } from "@/lib/utils"
import { useTheme } from "next-themes"

interface Step {
  id: number
  name: string
}

interface CheckoutStepsProps {
  currentStep: number
}

export default function CheckoutSteps({ currentStep }: CheckoutStepsProps) {
  const { theme } = useTheme()
  const isDarkMode = theme === "dark"

  const steps: Step[] = [
    { id: 1, name: "Shipping" },
    { id: 2, name: "Payment" },
    { id: 3, name: "Review" },
  ]

  const renderStepLine = (stepIdx: number) => {
    if (stepIdx === steps.length - 1) return null

    return (
      <span
        className={cn(
          "absolute left-4 top-4 -ml-px h-0.5 w-full bg-muted",
          isDarkMode && "checkout-step-line"
        )}
        aria-hidden="true"
      />
    )
  }

  const renderStepContent = (step: Step, stepIdx: number) => {
    if (step.id < currentStep) {
      return (
        <div className="group">
          <span className="flex items-center">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary">
              <Check className="h-5 w-5 text-primary-foreground" />
            </span>
            <span className="ml-3 text-sm font-medium">{step.name}</span>
          </span>
          {renderStepLine(stepIdx)}
        </div>
      )
    }

    if (step.id === currentStep) {
      return (
        <div className="group" aria-current="step">
          <span className="flex items-center">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-primary">
              <span className="text-sm font-medium text-primary">{step.id}</span>
            </span>
            <span className="ml-3 text-sm font-medium">{step.name}</span>
          </span>
          {renderStepLine(stepIdx)}
        </div>
      )
    }

    return (
      <div className="group">
        <span className="flex items-center">
          <span
            className={cn(
              "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-muted",
              isDarkMode && "checkout-step-border"
            )}
          >
            <span className="text-sm font-medium text-muted-foreground">{step.id}</span>
          </span>
          <span className="ml-3 text-sm font-medium text-muted-foreground">{step.name}</span>
        </span>
        {renderStepLine(stepIdx)}
      </div>
    )
  }

  return (
    <div className="hidden sm:block">
      <nav aria-label="Progress">
        <ol role="list" className="flex items-center">
          {steps.map((step, stepIdx) => (
            <li key={step.name} className={cn(stepIdx !== steps.length - 1 && "flex-1")}>
              {renderStepContent(step, stepIdx)}
            </li>
          ))}
        </ol>
      </nav>
    </div>
  )
}

