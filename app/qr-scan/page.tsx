"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { X, ChevronRight, Gift, Coffee, Utensils, Calendar, Search, Plus, Info } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// Sample vouchers data
const sampleVouchers = [
  {
    id: 1,
    name: "50% Off Any Coffee",
    expires: "2023-12-31",
    icon: Coffee,
    color: "bg-amber-100 text-amber-600",
    description: "Get half off on any coffee drink",
  },
  {
    id: 2,
    name: "Free Croissant with Any Drink",
    expires: "2023-11-30",
    icon: Gift,
    color: "bg-emerald-100 text-emerald-600",
    description: "Enjoy a free croissant with your drink purchase",
  },
  {
    id: 3,
    name: "Buy 1 Get 1 Free Lunch Special",
    expires: "2023-10-31",
    icon: Utensils,
    color: "bg-blue-100 text-blue-600",
    description: "Purchase any lunch special and get another one free",
  },
]

export default function QRScan() {
  const [isZoomed, setIsZoomed] = useState(false)
  const [vouchers, setVouchers] = useState(sampleVouchers)
  const [voucherCode, setVoucherCode] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("all")

  const toggleZoom = () => setIsZoomed(!isZoomed)

  const useVoucher = (id: number) => {
    setVouchers(vouchers.filter((voucher) => voucher.id !== id))
  }

  const addVoucher = () => {
    if (voucherCode.trim() !== "") {
      const newVoucher = {
        id: vouchers.length + 1,
        name: `Voucher ${voucherCode}`,
        expires: "2023-12-31",
        icon: Gift,
        color: "bg-purple-100 text-purple-600",
        description: "New voucher added",
      }
      setVouchers([...vouchers, newVoucher])
      setVoucherCode("")
    }
  }

  const filteredVouchers = vouchers.filter(
    (voucher) =>
      voucher.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (activeTab === "all" ||
        (activeTab === "expiringSoon" && new Date(voucher.expires) <= new Date(Date.now() + 30 * 24 * 60 * 60 * 1000))),
  )

  return (
    <div className="min-h-screen flex flex-col items-center justify-start p-4 pb-24">
      <Card
        className={`w-full max-w-md mx-auto overflow-hidden transition-all duration-300 shadow-sm ${isZoomed ? "fixed inset-0 z-50 m-0 max-w-none rounded-none" : "rounded-3xl"}`}
      >
        <CardContent className="p-6 space-y-4">
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-bold">Your Membership Card</h1>
            <p className="text-sm text-gray-500">Scan this QR code at the counter</p>
          </div>
          <div
            className="relative aspect-square bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer"
            onClick={toggleZoom}
          >
            <Image
              src="https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=CafeDelightsMember123456"
              alt="Membership QR Code"
              layout="fill"
              objectFit="contain"
              className="p-4"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-10 transition-all duration-300 flex items-center justify-center">
              <span className="text-white text-lg font-semibold opacity-0 hover:opacity-100 transition-opacity duration-300">
                Click to zoom
              </span>
            </div>
          </div>
          <div className="text-center space-y-1">
            <p className="font-semibold">John Doe</p>
            <p className="text-sm text-gray-500">Member since June 2023</p>
          </div>
          <div className="bg-gray-100 rounded-lg p-4 text-center">
            <p className="text-sm font-medium">Current Points</p>
            <p className="text-3xl font-bold">2,500</p>
          </div>
        </CardContent>
      </Card>

      {isZoomed && (
        <Button variant="outline" size="icon" className="fixed top-4 right-4 z-50 rounded-full" onClick={toggleZoom}>
          <X className="h-4 w-4" />
        </Button>
      )}

      <Card className="w-full max-w-md mx-auto mt-8 shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl font-bold">Your Vouchers</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex space-x-2">
            <div className="relative flex-grow">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="Search vouchers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Plus className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Add new voucher</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          {voucherCode && (
            <div className="flex space-x-2">
              <Input
                type="text"
                placeholder="Enter voucher code"
                value={voucherCode}
                onChange={(e) => setVoucherCode(e.target.value)}
                className="flex-grow"
              />
              <Button onClick={addVoucher}>Add</Button>
            </div>
          )}

          <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="all">All Vouchers</TabsTrigger>
              <TabsTrigger value="expiringSoon">Expiring Soon</TabsTrigger>
            </TabsList>
          </Tabs>

          <AnimatePresence>
            {filteredVouchers.map((voucher) => (
              <motion.div
                key={voucher.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="overflow-hidden">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-full ${voucher.color}`}>
                          <voucher.icon className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-semibold">{voucher.name}</p>
                          <p className="text-sm text-gray-500 flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            Expires: {voucher.expires}
                          </p>
                        </div>
                      </div>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <Info className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{voucher.description}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <Button variant="outline" size="sm" className="w-full mt-2" onClick={() => useVoucher(voucher.id)}>
                      Use Voucher
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
          {filteredVouchers.length === 0 && (
            <Card>
              <CardContent className="p-6 text-center">
                <p className="text-gray-500">No vouchers available</p>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

