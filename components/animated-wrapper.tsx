"use client"

import { motion } from "framer-motion"
import { ReactNode } from "react"

interface AnimatedWrapperProps {
    children: ReactNode
    delay?: number
    className?: string
}

export function FadeIn({ children, delay = 0, className = "" }: AnimatedWrapperProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay }}
            className={className}
        >
            {children}
        </motion.div>
    )
}

export function ScaleIn({ children, delay = 0, className = "" }: AnimatedWrapperProps) {
    return (
        <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay }}
            className={className}
        >
            {children}
        </motion.div>
    )
}

export function SlideIn({ children, delay = 0, className = "" }: AnimatedWrapperProps) {
    return (
        <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay }}
            className={className}
        >
            {children}
        </motion.div>
    )
}

export function StaggerContainer({ children, className = "" }: AnimatedWrapperProps) {
    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={{
                hidden: { opacity: 0 },
                visible: {
                    opacity: 1,
                    transition: {
                        staggerChildren: 0.1,
                    },
                },
            }}
            className={className}
        >
            {children}
        </motion.div>
    )
}

export function StaggerItem({ children, className = "" }: AnimatedWrapperProps) {
    return (
        <motion.div
            variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.5 }}
            className={className}
        >
            {children}
        </motion.div>
    )
} 