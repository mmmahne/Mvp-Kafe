"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Coffee, ShoppingBag, User, QrCode } from "lucide-react"

export function Navbar() {
  const pathname = usePathname()

  return (
    <div className="fixed bottom-4 left-0 right-0 z-50 px-4">
      <nav className="mobile-nav max-w-md mx-auto bg-white rounded-full p-2 shadow-lg border border-gray-100">
        <div className="mobile-nav-content relative">
          <div className="grid grid-cols-5 items-center">
            <NavItem href="/" icon={<Home className="w-6 h-6" />} label="Home" isActive={pathname === "/"} />
            <NavItem href="/menu" icon={<Coffee className="w-6 h-6" />} label="Menu" isActive={pathname === "/menu"} />
            <NavItem
              href="/qr-scan"
              icon={<QrCode className="w-6 h-6" />}
              label="Scan"
              isActive={pathname === "/qr-scan"}
              className="relative -mt-8"
            />
            <NavItem
              href="/profile"
              icon={<User className="w-6 h-6" />}
              label="Profile"
              isActive={pathname === "/profile"}
            />
            <NavItem
              href="/cart"
              icon={<ShoppingBag className="w-6 h-6" />}
              label="Cart"
              isActive={pathname === "/cart"}
            />
          </div>
        </div>
      </nav>
    </div>
  )
}

function NavItem({
  href,
  icon,
  label,
  isActive,
  className = "",
}: {
  href: string
  icon: React.ReactNode
  label: string
  isActive: boolean
  className?: string
}) {
  return (
    <Link href={href}>
      <div className={`flex flex-col items-center ${className}`}>
        <div
          className={`
            p-2 rounded-full relative
            ${isActive ? "bg-black text-white" : "text-gray-400 hover:text-gray-600"}
            ${href === "/qr-scan" ? "bg-white border-2 border-black text-black shadow-lg transform transition-transform hover:scale-105" : ""}
          `}
        >
          {icon}
          {isActive && href !== "/qr-scan" && (
            <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-black rounded-full" />
          )}
        </div>
        <span className={`text-xs mt-1 ${isActive ? "text-black font-medium" : "text-gray-400"}`}>{label}</span>
      </div>
    </Link>
  )
}

