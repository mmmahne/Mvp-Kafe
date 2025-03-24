import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Coffee, Clock, Phone, MapPin, Star, Utensils } from "lucide-react"

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-bold text-gray-900">Cafe Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <DashboardCard
          icon={<Coffee className="w-6 h-6 text-blue-600" />}
          title="Today's Special"
          description="Chef's recommendation"
          content={
            <div className="space-y-3">
              <div className="relative h-48 rounded-lg overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c"
                  alt="Grilled Salmon Salad"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <h3 className="font-semibold text-lg text-gray-900">Grilled Salmon Salad</h3>
              <p className="text-sm text-gray-600">
                Fresh grilled salmon on a bed of mixed greens with our house vinaigrette
              </p>
              <p className="text-green-600 font-bold text-xl">$16.99</p>
            </div>
          }
        />
        <DashboardCard
          icon={<Clock className="w-6 h-6 text-blue-600" />}
          title="Opening Hours"
          description="When you can visit us"
          content={
            <div className="space-y-3">
              <p className="text-gray-700">Monday - Friday: 8:00 AM - 10:00 PM</p>
              <p className="text-gray-700">Saturday - Sunday: 9:00 AM - 11:00 PM</p>
              <div className="relative h-48 rounded-lg overflow-hidden mt-3">
                <Image
                  src="https://images.unsplash.com/photo-1554118811-1e0d58224f24"
                  alt="Cafe Clock"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            </div>
          }
        />
        <DashboardCard
          icon={<Phone className="w-6 h-6 text-blue-600" />}
          title="Contact Information"
          description="Get in touch with us"
          content={
            <div className="space-y-3">
              <p className="text-gray-700">Phone: (123) 456-7890</p>
              <p className="text-gray-700">Email: info@cafedelights.com</p>
              <p className="text-gray-700">Address: 123 Cafe Street, City, Country</p>
              <div className="relative h-48 rounded-lg overflow-hidden mt-3">
                <Image
                  src="https://images.unsplash.com/photo-1534536281715-e28d76689b4d"
                  alt="Contact Us"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            </div>
          }
        />
        <DashboardCard
          icon={<MapPin className="w-6 h-6 text-blue-600" />}
          title="Location"
          description="Find us here"
          content={
            <div className="space-y-3">
              <div className="relative h-48 rounded-lg overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd"
                  alt="Cafe Location"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <p className="text-sm text-gray-600">
                Located in the heart of the city, our cafe is easily accessible by public transport.
              </p>
            </div>
          }
        />
        <DashboardCard
          icon={<Star className="w-6 h-6 text-blue-600" />}
          title="Customer Reviews"
          description="What our customers say"
          content={
            <div className="space-y-3">
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-sm text-gray-600">"Amazing coffee and pastries!" - John D.</p>
              <p className="text-sm text-gray-600">"The best brunch in town!" - Sarah M.</p>
              <p className="text-sm text-gray-600">"Cozy atmosphere and friendly staff" - Mike R.</p>
              <div className="relative h-48 rounded-lg overflow-hidden mt-3">
                <Image
                  src="https://images.unsplash.com/photo-1511920170033-f8396924c348"
                  alt="Happy Customers"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            </div>
          }
        />
        <DashboardCard
          icon={<Utensils className="w-6 h-6 text-blue-600" />}
          title="Popular Menu Items"
          description="Our customers' favorites"
          content={
            <div className="space-y-3">
              <ul className="list-disc list-inside text-gray-700">
                <li>Avocado Toast</li>
                <li>Cappuccino</li>
                <li>Blueberry Pancakes</li>
                <li>Chicken Caesar Wrap</li>
              </ul>
              <div className="relative h-48 rounded-lg overflow-hidden mt-3">
                <Image
                  src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085"
                  alt="Popular Menu Items"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            </div>
          }
        />
      </div>
    </div>
  )
}

function DashboardCard({
  icon,
  title,
  description,
  content,
}: {
  icon: React.ReactNode
  title: string
  description: string
  content: React.ReactNode
}) {
  return (
    <Card className="overflow-hidden transition-shadow duration-300 hover:shadow-lg">
      <CardHeader className="border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="bg-blue-100 p-2 rounded-full">{icon}</div>
          <div>
            <CardTitle className="text-xl font-semibold text-gray-900">{title}</CardTitle>
            <CardDescription className="text-sm text-gray-500">{description}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-4">{content}</CardContent>
    </Card>
  )
}

