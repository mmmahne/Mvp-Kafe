"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { motion } from "framer-motion"
import { QrCode, Coffee, Truck, Users2, Ticket, Medal, ArrowRight } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section dengan Promo */}
      <div className="relative h-[70vh] bg-black">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
            <div className="relative w-[350px] h-[350px] md:w-[450px] md:h-[450px]">
              <Image
                src="https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd"
                alt="Cafe Delights Special Drinks"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/80" />
        <div className="relative container mx-auto px-4 py-8">
          <div className="flex flex-col items-center text-center text-white pt-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">SPECIAL DISCOUNT</h1>
            <div className="text-7xl md:text-8xl font-black mb-2">25%</div>
            <p className="text-sm mb-4">*Minimal Pembelian Rp 100.000</p>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-2 border-white text-white hover:bg-white hover:text-black bg-black/50 backdrop-blur-sm"
            >
              <QrCode className="mr-2 h-5 w-5" />
              Scan QR Sekarang
            </Button>
          </div>
        </div>
      </div>

      {/* User Points Section */}
      <div className="container mx-auto px-4 -mt-10 relative z-10">
        <Card className="max-w-md mx-auto p-4 shadow-xl border-2">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Hi, Selamat Datang</p>
              <h2 className="text-xl font-bold">Member Silver</h2>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-2">
                <Medal className="h-5 w-5 text-gray-700" />
                <span className="text-lg font-bold">250</span>
              </div>
              <p className="text-sm text-gray-600">Points</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Menu Actions */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto grid grid-cols-2 gap-4">
          <Link href="/menu" className="block">
            <Card className="p-4 text-center hover:shadow-md transition-shadow border-2">
              <Coffee className="h-8 w-8 mx-auto mb-2 text-black" />
              <p className="font-medium">Pickup</p>
            </Card>
          </Link>
          <Link href="/delivery" className="block">
            <Card className="p-4 text-center hover:shadow-md transition-shadow border-2">
              <Truck className="h-8 w-8 mx-auto mb-2 text-black" />
              <p className="font-medium">Delivery</p>
            </Card>
          </Link>
        </div>
      </div>

      {/* Missions & Rewards */}
      <div className="container mx-auto px-4 pb-8">
        <div className="max-w-md mx-auto space-y-4">
          <h2 className="text-xl font-bold mb-4">Misi & Rewards</h2>
          
          <Card className="p-4 hover:shadow-md transition-shadow border-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Users2 className="h-10 w-10 text-black" />
                <div>
                  <h3 className="font-medium">Referral Program</h3>
                  <p className="text-sm text-gray-600">Ajak teman dapat bonus</p>
                </div>
              </div>
              <Button variant="outline" size="sm" className="border-2">
                Mulai
              </Button>
            </div>
          </Card>

          <Card className="p-4 hover:shadow-md transition-shadow border-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Ticket className="h-10 w-10 text-black" />
                <div>
                  <h3 className="font-medium">Gratis Minuman</h3>
                  <p className="text-sm text-gray-600">Kumpulkan 500 poin</p>
                </div>
              </div>
              <Button variant="outline" size="sm" className="border-2">
                Tukar
              </Button>
            </div>
          </Card>
        </div>
      </div>

      {/* Menu Favorit */}
      <div className="container mx-auto px-4 pb-12">
        <div className="max-w-md mx-auto">
          <h2 className="text-xl font-bold mb-6">Menu Favorit</h2>
          <div className="grid grid-cols-2 gap-4">
            {[
              {
                name: "Espresso",
                price: "Rp 35.000",
                image: "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04",
              },
              {
                name: "Cold Brew",
                price: "Rp 38.000",
                image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735",
              },
              {
                name: "Pour Over",
                price: "Rp 42.000",
                image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085",
              },
              {
                name: "V60 Drip",
                price: "Rp 40.000",
                image: "https://images.unsplash.com/photo-1516486392848-8b67ef89f113",
              },
            ].map((item) => (
              <Card key={item.name} className="overflow-hidden hover:shadow-lg transition-shadow border-2">
                <div className="relative h-32">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover grayscale"
                  />
                </div>
                <div className="p-3">
                  <h3 className="font-medium text-sm mb-1 truncate">{item.name}</h3>
                  <p className="text-black font-semibold text-sm">{item.price}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Promo Banners */}
      <div className="container mx-auto px-4 pb-24">
        <div className="max-w-md mx-auto space-y-4">
          <Link href="/promo/weekday" className="block">
            <Card className="relative overflow-hidden h-48 group border-2">
              <Image
                src="https://images.unsplash.com/photo-1442512595331-e89e73853f31"
                alt="Weekday Promo"
                fill
                className="object-cover grayscale group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/50 p-6 flex flex-col justify-between">
                <div className="text-white">
                  <h3 className="text-xl font-bold mb-2">Weekday Special</h3>
                  <p className="text-sm opacity-90">Buy 1 Get 1 untuk semua minuman manual brew</p>
                </div>
                <Button variant="outline" className="self-start text-white border-2 border-white bg-black/30 backdrop-blur-sm hover:bg-white hover:text-black transition-colors">
                  Lihat Detail <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </Card>
          </Link>

          <Link href="/promo/member" className="block">
            <Card className="relative overflow-hidden h-48 group border-2">
              <Image
                src="https://images.unsplash.com/photo-1498804103079-a6351b050096"
                alt="Member Promo"
                fill
                className="object-cover grayscale group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/50 p-6 flex flex-col justify-between">
                <div className="text-white">
                  <h3 className="text-xl font-bold mb-2">Member Exclusive</h3>
                  <p className="text-sm opacity-90">Diskon 30% untuk member baru</p>
                </div>
                <Button variant="outline" className="self-start text-white border-2 border-white bg-black/30 backdrop-blur-sm hover:bg-white hover:text-black transition-colors">
                  Lihat Detail <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  )
}

