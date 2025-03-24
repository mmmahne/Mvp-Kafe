"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search, Plus, ArrowLeft, Users, ChevronDown, ShoppingBag } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { motion, AnimatePresence } from "framer-motion"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface MenuItem {
  id: number
  name: string
  price: number
  description: string
  image: string
  category: string
  mostOrdered?: boolean
}

const menuItems: Record<string, MenuItem[]> = {
  recommended: [
    {
      id: 1,
      name: "Grilled Chicken Rice",
      price: 55000,
      description: "Tender grilled chicken with special sauce",
      image: "https://images.unsplash.com/photo-1562967914-608f82629710",
      category: "Main Course",
      mostOrdered: true,
    },
    {
      id: 2,
      name: "Fried Chicken Rice",
      price: 52000,
      description: "Crispy fried chicken with sambal",
      image: "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58",
      category: "Main Course",
      mostOrdered: true,
    },
    {
      id: 3,
      name: "Fruit Ice",
      price: 35000,
      description: "Mixed fruits with sweet syrup",
      image: "https://images.unsplash.com/photo-1570696516188-ade861b84a49",
      category: "Beverages",
      mostOrdered: true,
    },
    {
      id: 4,
      name: "Crispy Mushroom",
      price: 32000,
      description: "Breaded and fried mushrooms",
      image: "https://images.unsplash.com/photo-1509482560494-4126f8225994",
      category: "Appetizer",
    },
  ],
  mainCourse: [
    {
      id: 5,
      name: "Beef Rendang",
      price: 65000,
      description: "Slow-cooked spicy beef",
      image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84",
      category: "Main Course",
    },
    {
      id: 6,
      name: "Grilled Fish",
      price: 58000,
      description: "Fresh fish with special sauce",
      image: "https://images.unsplash.com/photo-1594041680534-e8c8cdebd659",
      category: "Main Course",
    },
    {
      id: 7,
      name: "Nasi Goreng",
      price: 48000,
      description: "Indonesian fried rice with chicken satay",
      image: "https://images.unsplash.com/photo-1632646779420-1a39e1a29323",
      category: "Main Course",
    },
    {
      id: 8,
      name: "Vegetable Curry",
      price: 45000,
      description: "Mixed vegetables in a rich curry sauce",
      image: "https://images.unsplash.com/photo-1631292784640-2b24be784d5d",
      category: "Main Course",
    },
    {
      id: 9,
      name: "Seafood Pasta",
      price: 62000,
      description: "Spaghetti with mixed seafood in tomato sauce",
      image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8",
      category: "Main Course",
    },
  ],
  appetizers: [
    {
      id: 10,
      name: "Spring Rolls",
      price: 28000,
      description: "Vegetable spring rolls",
      image: "https://images.unsplash.com/photo-1544025162-d76694265947",
      category: "Appetizer",
    },
    {
      id: 11,
      name: "Chicken Satay",
      price: 35000,
      description: "Grilled chicken skewers with peanut sauce",
      image: "https://images.unsplash.com/photo-1529563021893-cc83d45c46b9",
      category: "Appetizer",
    },
    {
      id: 12,
      name: "Calamari Rings",
      price: 40000,
      description: "Crispy fried squid rings with tartar sauce",
      image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0",
      category: "Appetizer",
    },
    {
      id: 13,
      name: "Bruschetta",
      price: 30000,
      description: "Toasted bread with tomato, garlic, and basil",
      image: "https://images.unsplash.com/photo-1572695157366-5e585ab2b69f",
      category: "Appetizer",
    },
  ],
  beverages: [
    {
      id: 14,
      name: "Ice Tea",
      price: 18000,
      description: "Fresh brewed tea",
      image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc",
      category: "Beverages",
    },
    {
      id: 15,
      name: "Lemon Juice",
      price: 22000,
      description: "Fresh squeezed lemon",
      image: "https://images.unsplash.com/photo-1621263764928-df1444c5e859",
      category: "Beverages",
    },
    {
      id: 16,
      name: "Cappuccino",
      price: 28000,
      description: "Espresso with steamed milk and foam",
      image: "https://images.unsplash.com/photo-1572442388796-11668a67e53d",
      category: "Beverages",
    },
    {
      id: 17,
      name: "Mango Smoothie",
      price: 32000,
      description: "Blended mango with yogurt and honey",
      image: "https://images.unsplash.com/photo-1623065422902-30a2d299bbe4",
      category: "Beverages",
    },
    {
      id: 18,
      name: "Green Tea Latte",
      price: 30000,
      description: "Matcha green tea with steamed milk",
      image: "https://images.unsplash.com/photo-1515823064-d6e0c04616a7",
      category: "Beverages",
    },
  ],
  desserts: [
    {
      id: 19,
      name: "Ice Cream",
      price: 25000,
      description: "Vanilla ice cream with toppings",
      image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb",
      category: "Dessert",
    },
    {
      id: 20,
      name: "Banana Split",
      price: 32000,
      description: "Classic banana split with three ice cream flavors",
      image: "https://images.unsplash.com/photo-1557142046-c704a3adf364",
      category: "Dessert",
    },
    {
      id: 21,
      name: "Tiramisu",
      price: 35000,
      description: "Italian coffee-flavored dessert",
      image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9",
      category: "Dessert",
    },
    {
      id: 22,
      name: "Fruit Tart",
      price: 28000,
      description: "Pastry crust filled with custard and fresh fruits",
      image: "https://images.unsplash.com/photo-1519915028121-7d3463d20b13",
      category: "Dessert",
    },
  ],
  salads: [
    {
      id: 23,
      name: "Caesar Salad",
      price: 42000,
      description: "Romaine lettuce with Caesar dressing and croutons",
      image: "https://images.unsplash.com/photo-1550304943-4f24f54ddde9",
      category: "Salad",
    },
    {
      id: 24,
      name: "Greek Salad",
      price: 45000,
      description: "Mixed vegetables with feta cheese and olives",
      image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe",
      category: "Salad",
    },
    {
      id: 25,
      name: "Quinoa Salad",
      price: 48000,
      description: "Quinoa with roasted vegetables and vinaigrette",
      image: "https://images.unsplash.com/photo-1505576399279-565b52d4ac71",
      category: "Salad",
    },
  ],
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(amount)
}

export default function Menu() {
  const [cart, setCart] = useState<{ id: number; name: string; price: number; quantity: number }[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [activeCategory, setActiveCategory] = useState("recommended")
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const addToCart = (item: { id: number; name: string; price: number }) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id)
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem,
        )
      }
      return [...prevCart, { ...item, quantity: 1 }]
    })
  }

  const removeFromCart = (itemId: number) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === itemId)
      if (existingItem && existingItem.quantity > 1) {
        return prevCart.map((cartItem) =>
          cartItem.id === itemId ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem,
        )
      }
      return prevCart.filter((cartItem) => cartItem.id !== itemId)
    })
  }

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Improved Header */}
      <motion.header
        className={`sticky top-0 z-10 bg-white ${isScrolled ? "shadow-md" : ""}`}
        initial={{ height: "auto" }}
        animate={{ height: isScrolled ? "auto" : "auto" }}
        transition={{ duration: 0.3 }}
      >
        <div className="max-w-md mx-auto">
          <motion.div
            className="flex items-center justify-between p-4"
            initial={{ opacity: 1, height: "auto" }}
            animate={{ opacity: 1, height: "auto" }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="md:hidden">
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                  <Image
                    src="https://images.unsplash.com/photo-1518057111178-44a106bad636?w=100&h=100&fit=crop&crop=faces"
                    alt="Cafe Delights Logo"
                    width={32}
                    height={32}
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <h1 className="text-base font-bold truncate">Cafe Delights</h1>
                  <p className="text-xs text-gray-500 truncate">Indonesian Cuisine</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="hidden md:flex gap-2">
                    <Users className="h-4 w-4" />
                    Group Order
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Start Group Order</DropdownMenuItem>
                  <DropdownMenuItem>Join Group Order</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </motion.div>

          {/* Search Bar and Cart Icon */}
          <motion.div
            className="px-4 pb-4 flex items-center gap-2"
            initial={{ y: 0, opacity: 1 }}
            animate={{
              y: isScrolled ? 0 : 0,
              opacity: 1,
              paddingBottom: isScrolled ? 4 : 16,
            }}
            transition={{ duration: 0.3 }}
          >
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="search"
                placeholder="Cari menu..."
                className="pl-10 pr-4 h-10 rounded-full bg-gray-100 border-none text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="relative flex-shrink-0"
              onClick={() => {
                /* Handle cart click */
              }}
            >
              <ShoppingBag className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Button>
          </motion.div>

          {/* Category Tabs */}
          <motion.div
            className="px-4 pb-4 -mx-1"
            initial={{ y: 0 }}
            animate={{ y: isScrolled ? 0 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex overflow-x-auto scrollbar-hide gap-2 pb-1">
              {Object.keys(menuItems).map((category) => (
                <Button
                  key={category}
                  variant={activeCategory === category ? "default" : "outline"}
                  className={`whitespace-nowrap px-4 py-2 text-sm ${
                    activeCategory === category ? "bg-black text-white hover:bg-gray-800" : "text-black hover:bg-gray-100"
                  }`}
                  onClick={() => setActiveCategory(category)}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </Button>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.header>

      {/* Menu Grid */}
      <div className="px-4 pt-4 pb-6">
        <div className="max-w-md mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {menuItems[activeCategory as keyof typeof menuItems].map((item) => (
              <Card key={item.id} className="overflow-hidden">
                <div className="relative aspect-square">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform hover:scale-105"
                  />
                  {item.mostOrdered && (
                    <div className="absolute top-2 left-2 bg-black text-white text-xs px-2 py-1 rounded-full">
                      Most ordered
                    </div>
                  )}
                  <Button
                    className="absolute bottom-2 right-2 rounded-full w-10 h-10 p-0 bg-black hover:bg-gray-800"
                    onClick={() => addToCart(item)}
                  >
                    <Plus className="h-5 w-5" />
                  </Button>
                </div>
                <div className="p-3">
                  <h3 className="font-medium text-sm mb-1 truncate">{item.name}</h3>
                  <p className="text-sm font-semibold">{formatCurrency(item.price)}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* New table menu section */}
      <div className="mt-16 px-4">
        <div className="max-w-md mx-auto">
          <h2 className="text-2xl font-bold mb-6">Menu Lengkap</h2>
          <div className="rounded-md border overflow-hidden">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[40%]">Menu</TableHead>
                    <TableHead className="w-[20%]">Kategori</TableHead>
                    <TableHead className="w-[25%] hidden md:table-cell">Deskripsi</TableHead>
                    <TableHead className="w-[15%] text-right">Harga</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {Object.values(menuItems).flat().map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-md overflow-hidden flex-shrink-0">
                            <Image
                              src={item.image}
                              alt={item.name}
                              width={48}
                              height={48}
                              className="object-cover"
                            />
                          </div>
                          <div className="min-w-0">
                            <div className="font-medium truncate">{item.name}</div>
                            <div className="text-sm text-gray-500 md:hidden truncate">{item.description}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="whitespace-nowrap">{item.category}</TableCell>
                      <TableCell className="hidden md:table-cell">
                        <div className="truncate">{item.description}</div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <span className="whitespace-nowrap">{formatCurrency(item.price)}</span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => addToCart(item)}
                            className="h-8 w-8 p-0"
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </div>

      {/* Cart Summary */}
      {totalItems > 0 && (
        <div className="fixed bottom-20 left-0 right-0 p-4 bg-white border-t">
          <div className="max-w-md mx-auto">
            <Button className="w-full bg-black hover:bg-gray-800" size="lg">
              View Cart ({totalItems} items) - {formatCurrency(totalPrice)}
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

