"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Minus, Plus, Trash2, ArrowLeft, ShoppingBag, ArrowRight, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

// Helper function to format currency
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(amount)
}

// This is a mock data, in a real app this would come from a state management solution or API
const initialCartItems = [
  {
    id: 1,
    name: "Cappuccino",
    price: 35000,
    quantity: 2,
    image: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=300&q=80",
    notes: "Extra hot, less sugar",
  },
  {
    id: 2,
    name: "Croissant",
    price: 25000,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=300&q=80",
    notes: "Warmed up please",
  },
  {
    id: 3,
    name: "Avocado Toast",
    price: 55000,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?auto=format&fit=crop&w=300&q=80",
    notes: "No chili flakes",
  },
]

export default function Cart() {
  const [cartItems, setCartItems] = useState(initialCartItems)
  const [promoCode, setPromoCode] = useState("")
  const [isPromoApplied, setIsPromoApplied] = useState(false)
  const router = useRouter()

  const updateQuantity = (id: number, change: number) => {
    setCartItems((items) =>
      items
        .map((item) => (item.id === id ? { ...item, quantity: Math.max(0, item.quantity + change) } : item))
        .filter((item) => item.quantity > 0),
    )
  }

  const removeItem = (id: number) => {
    setCartItems((items) => items.filter((item) => item.id !== id))
  }

  const applyPromoCode = () => {
    // In a real app, you would validate the promo code here
    setIsPromoApplied(true)
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const discount = isPromoApplied ? subtotal * 0.1 : 0 // 10% discount if promo is applied
  const tax = (subtotal - discount) * 0.1
  const total = subtotal - discount + tax
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  useEffect(() => {
    if (cartItems.length === 0) {
      router.push("/menu")
    }
  }, [cartItems, router])

  return (
    <div className="min-h-screen pb-24 bg-gray-50">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b">
        <div className="max-w-md mx-auto">
          <div className="flex items-center p-4">
            <Button variant="ghost" size="sm" onClick={() => router.back()} className="mr-2">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-lg font-bold">Your Cart</h1>
            <div className="ml-auto flex items-center">
              <ShoppingBag className="h-5 w-5 mr-2" />
              <span>{totalItems}</span>
            </div>
          </div>
          <div className="px-4 pb-3">
            <Progress value={33} className="h-1" />
            <div className="flex justify-between text-xs text-gray-600 mt-1">
              <span>Cart</span>
              <span>Checkout</span>
              <span>Complete</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-6">
        <AnimatePresence>
          {cartItems.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="mb-4">
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    <div className="relative w-20 h-20 flex-shrink-0">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-md"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-base mb-0.5">{item.name}</h3>
                      <p className="text-gray-600 text-sm mb-1">{formatCurrency(item.price)}</p>
                      {item.notes && <p className="text-xs text-gray-500 italic truncate">Note: {item.notes}</p>}
                      <div className="flex items-center mt-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateQuantity(item.id, -1)}
                          className="h-8 w-8 rounded-full p-0"
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="mx-2 min-w-[2ch] text-center">{item.quantity}</span>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateQuantity(item.id, 1)}
                          className="h-8 w-8 rounded-full p-0"
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => removeItem(item.id)}
                          className="ml-auto text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between text-sm">
              <span>Subtotal</span>
              <span>{formatCurrency(subtotal)}</span>
            </div>
            {isPromoApplied && (
              <div className="flex justify-between text-sm text-green-600">
                <span>Discount</span>
                <span>- {formatCurrency(discount)}</span>
              </div>
            )}
            <div className="flex justify-between text-sm">
              <span>Tax (10%)</span>
              <span>{formatCurrency(tax)}</span>
            </div>
            <Separator />
            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span>{formatCurrency(total)}</span>
            </div>
            <div className="pt-4">
              <p className="text-sm font-medium mb-2">Promo Code</p>
              <div className="flex gap-2">
                <Input
                  placeholder="Enter promo code"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="flex-grow"
                />
                <Button onClick={applyPromoCode} disabled={isPromoApplied}>
                  Apply
                </Button>
              </div>
              {isPromoApplied && <p className="text-green-600 text-sm mt-2">Promo code applied successfully!</p>}
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 space-y-4">
          <Button className="w-full" size="lg" onClick={() => router.push("/checkout")}>
            Proceed to Checkout
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button variant="outline" className="w-full" size="lg" onClick={() => router.push("/menu")}>
            Continue Shopping
          </Button>
        </div>
      </div>
    </div>
  )
}

