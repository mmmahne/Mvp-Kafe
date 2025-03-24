"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import { ArrowLeft, CreditCard, Wallet } from "lucide-react"
import { Progress } from "@/components/ui/progress"

export default function Checkout() {
  const [paymentMethod, setPaymentMethod] = useState("cashier")
  const router = useRouter()

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real application, you would process the payment here
    alert(`Payment processed via ${paymentMethod}. Thank you for your order!`)
    router.push("/") // Redirect to home page after payment
  }

  return (
    <div className="space-y-6 pb-16">
      <div className="sticky top-0 z-10 bg-background border-b">
        <div className="max-w-md mx-auto">
          <div className="flex items-center p-4">
            <Button variant="ghost" size="sm" onClick={() => router.back()} className="mr-2">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-lg font-bold">Checkout</h1>
          </div>
          <div className="px-4 pb-3">
            <Progress value={66} className="h-1" />
            <div className="flex justify-between text-xs text-gray-600 mt-1">
              <span>Cart</span>
              <span>Checkout</span>
              <span>Complete</span>
            </div>
          </div>
        </div>
      </div>
      <div className="px-4">
        <Card>
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>Rp 350,000</span>
            </div>
            <div className="flex justify-between">
              <span>Tax (10%)</span>
              <span>Rp 35,000</span>
            </div>
            <div className="flex justify-between font-bold">
              <span>Total</span>
              <span>Rp 385,000</span>
            </div>
          </CardContent>
        </Card>
      </div>
      <form onSubmit={handlePayment} className="space-y-6 px-4">
        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" placeholder="John Doe" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" placeholder="john@example.com" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" type="tel" placeholder="+62 123 4567 890" required />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Payment Method</CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-4">
              <div className="flex items-center space-x-3 border rounded-lg p-3">
                <RadioGroupItem value="cashier" id="cashier" />
                <Label htmlFor="cashier" className="flex items-center space-x-3 cursor-pointer flex-1">
                  <Wallet className="h-5 w-5" />
                  <span>Pay at Cashier</span>
                </Label>
              </div>
              <div className="flex items-center space-x-3 border rounded-lg p-3">
                <RadioGroupItem value="card" id="card" />
                <Label htmlFor="card" className="flex items-center space-x-3 cursor-pointer flex-1">
                  <CreditCard className="h-5 w-5" />
                  <span>Credit/Debit Card</span>
                </Label>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>
        <Button type="submit" className="w-full">
          Pay Rp 385,000
        </Button>
      </form>
    </div>
  )
}

