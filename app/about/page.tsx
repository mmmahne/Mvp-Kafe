import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { MessageCircle, Instagram, Facebook, Twitter, Coffee, Users, Leaf } from "lucide-react"

export default function AboutUs() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px]">
        <Image
          src="https://images.unsplash.com/photo-1554118811-1e0d58224f24"
          alt="Cafe Interior"
          layout="fill"
          objectFit="cover"
          priority
          className="brightness-50"
        />
        <div className="absolute inset-0 flex items-center justify-center text-center px-4">
          <div className="max-w-md">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 animate-fade-in">Our Story</h1>
            <p className="text-xl text-white animate-fade-in animation-delay-200">
              A journey of passion and dedication
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 px-4">
        <div className="max-w-md mx-auto space-y-8">
          <div className="space-y-4 animate-fade-in">
            <h2 className="text-3xl font-bold text-center">The Beginning</h2>
            <p className="text-gray-600 text-center">
              Founded in 2010 in the heart of Jakarta, Cafe Delights began with a simple mission: to serve the finest
              Indonesian coffee in a warm, welcoming environment.
            </p>
          </div>
          <div className="image-container animate-fade-in animation-delay-200 rounded-lg overflow-hidden shadow-lg">
            <Image
              src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085"
              alt="Our Coffee"
              width={500}
              height={500}
              layout="responsive"
              objectFit="cover"
            />
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 px-4">
        <div className="max-w-md mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
          <div className="grid gap-8">
            {values.map((value, index) => (
              <Card key={value.title} className="animate-fade-in" style={{ animationDelay: `${index * 200}ms` }}>
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <value.icon className="w-12 h-12 text-black mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-4">
        <div className="max-w-md mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Our Team</h2>
          <div className="grid gap-8">
            {team.map((member, index) => (
              <Card key={member.name} className="animate-fade-in" style={{ animationDelay: `${index * 200}ms` }}>
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="relative w-32 h-32 rounded-full overflow-hidden mb-4">
                    <Image src={member.image || "/placeholder.svg"} alt={member.name} layout="fill" objectFit="cover" />
                  </div>
                  <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                  <p className="text-gray-600">{member.role}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Visit Section */}
      <section className="py-16 px-4">
        <div className="max-w-md mx-auto text-center space-y-8">
          <h2 className="text-3xl font-bold">Visit Us</h2>
          <p className="text-gray-600">Join us at our flagship store in Jakarta for the perfect cup of coffee</p>
          <div className="space-y-4">
            <p className="font-semibold">Jalan Sudirman 123, Jakarta Pusat</p>
            <p className="text-gray-600">Open Daily: 7 AM - 10 PM</p>
          </div>
          <div className="flex flex-col space-y-4">
            <Button size="lg" className="bg-black hover:bg-gray-800">
              Get Directions
            </Button>
            <Button variant="outline" size="lg">
              Contact Us
            </Button>
          </div>
        </div>
      </section>

      {/* Social Links */}
      <section className="py-16 px-4">
        <div className="max-w-md mx-auto text-center space-y-8">
          <h2 className="text-3xl font-bold">Connect With Us</h2>
          <div className="flex justify-center space-x-8">
            <SocialLink href="#" icon={Instagram} />
            <SocialLink href="#" icon={Facebook} />
            <SocialLink href="#" icon={Twitter} />
          </div>
        </div>
      </section>

      {/* WhatsApp Button */}
      <a href="https://wa.me/1234567890" className="whatsapp-button" target="_blank" rel="noopener noreferrer">
        <MessageCircle className="w-6 h-6" />
      </a>
    </div>
  )
}

function SocialLink({ href, icon: Icon }: { href: string; icon: any }) {
  return (
    <a
      href={href}
      className="text-gray-600 hover:text-black transition-colors"
      target="_blank"
      rel="noopener noreferrer"
    >
      <Icon className="w-8 h-8" />
    </a>
  )
}

const values = [
  {
    icon: Coffee,
    title: "Quality First",
    description: "We source only the finest Indonesian coffee beans and ingredients",
  },
  {
    icon: Users,
    title: "Community",
    description: "Creating a warm and welcoming space for everyone",
  },
  {
    icon: Leaf,
    title: "Sustainability",
    description: "Committed to eco-friendly practices and supporting local farmers",
  },
]

const team = [
  {
    name: "Siti Nurhayati",
    role: "Founder & CEO",
    image: "https://i.pravatar.cc/300?img=1",
  },
  {
    name: "Budi Santoso",
    role: "Head Barista",
    image: "https://i.pravatar.cc/300?img=2",
  },
  {
    name: "Dewi Putri",
    role: "Executive Chef",
    image: "https://i.pravatar.cc/300?img=3",
  },
]

