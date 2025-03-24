"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { ArrowRight, Package, Camera, Bell } from "lucide-react"

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(amount)
}

const orderHistory = [
  { id: "1234", date: "2023-06-15", total: 385000, items: ["2x Cappuccino", "1x Avocado Toast"], status: "Completed" },
  {
    id: "1235",
    date: "2023-06-10",
    total: 185000,
    items: ["1x Green Tea Latte", "1x Fruit Tart"],
    status: "Completed",
  },
  {
    id: "1236",
    date: "2023-06-05",
    total: 327500,
    items: ["1x Chicken Caesar Salad", "2x Berry Smoothie"],
    status: "Completed",
  },
]

export default function Profile() {
  const [activeTab, setActiveTab] = useState("info")

  return (
    <div className="space-y-6 pb-16">
      <div className="sticky top-0 z-10 p-4">
        <h1 className="text-xl font-bold">Your Profile</h1>
      </div>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full px-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="info">Info</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
        </TabsList>
        <TabsContent value="info">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col items-center space-y-4">
                <div className="relative">
                  <Image
                    src="https://i.pravatar.cc/150?img=68"
                    alt="Profile picture"
                    width={100}
                    height={100}
                    className="rounded-full"
                  />
                  <Button size="icon" className="absolute bottom-0 right-0 rounded-full bg-black text-white">
                    <Camera className="h-4 w-4" />
                  </Button>
                </div>
                <h2 className="text-2xl font-semibold">John Doe</h2>
                <p className="text-sm text-gray-500">Member since June 2023</p>
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" defaultValue="John" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" defaultValue="Doe" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue="john.doe@example.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" type="tel" defaultValue="+62 123 4567 890" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="birthdate">Birthdate</Label>
                  <Input id="birthdate" type="date" defaultValue="1990-01-01" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Textarea id="address" defaultValue="123 Cafe Street, Jakarta, Indonesia" />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-black text-white hover:bg-gray-800">Update Profile</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="orders">
          <div className="space-y-4">
            {orderHistory.map((order) => (
              <Card key={order.id}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex justify-between items-center">
                    <span>Order #{order.id}</span>
                    <span className="text-sm font-normal text-muted-foreground">{order.date}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold">{formatCurrency(order.total)}</span>
                    <span className="text-sm px-2 py-1 bg-green-100 text-green-800 rounded-full">{order.status}</span>
                  </div>
                  <ul className="text-sm text-muted-foreground">
                    {order.items.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    <Package className="mr-2 h-4 w-4" />
                    Track Order
                  </Button>
                </CardFooter>
              </Card>
            ))}
            <Button variant="outline" className="w-full">
              View All Orders
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </TabsContent>
        <TabsContent value="preferences">
          <Card>
            <CardHeader>
              <CardTitle>Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="favorite-drink">Favorite Drink</Label>
                <Input id="favorite-drink" defaultValue="Cappuccino" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dietary">Dietary Restrictions</Label>
                <Input id="dietary" defaultValue="None" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="allergies">Allergies</Label>
                <Input id="allergies" defaultValue="None" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="spice-level">Preferred Spice Level</Label>
                <select id="spice-level" className="w-full p-2 border rounded">
                  <option value="mild">Mild</option>
                  <option value="medium">Medium</option>
                  <option value="hot">Hot</option>
                  <option value="extra-hot">Extra Hot</option>
                </select>
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="newsletter">Receive Newsletter</Label>
                <Switch id="newsletter" />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="notifications">Push Notifications</Label>
                <Switch id="notifications" />
              </div>
              <div className="space-y-2">
                <Label>Notification Preferences</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="order-updates" className="rounded" />
                    <Label htmlFor="order-updates">Order Updates</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="promotions" className="rounded" />
                    <Label htmlFor="promotions">Promotions and Offers</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="new-menu-items" className="rounded" />
                    <Label htmlFor="new-menu-items">New Menu Items</Label>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-black text-white hover:bg-gray-800">Save Preferences</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

