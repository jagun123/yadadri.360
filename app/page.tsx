"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  Phone,
  MapPin,
  Mail,
  Clock,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Star,
  MapPinned,
  Building,
  Landmark,
  Send,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog"
import { Card, CardContent } from "@/components/ui/card"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

// Testimonial data
const testimonials = [
  {
    id: 1,
    name: "Rajesh Kumar",
    role: "Property Buyer",
    content:
      "Yadadri 360° helped me find the perfect plot for my dream home. Their expertise and guidance made the process smooth and hassle-free.",
    avatar: "/placeholder.svg?height=60&width=60",
    rating: 5,
  },
  {
    id: 2,
    name: "Priya Sharma",
    role: "Land Investor",
    content:
      "I've been investing in real estate for years, and Yadadri 360° has been the most professional and transparent agency I've worked with.",
    avatar: "/placeholder.svg?height=60&width=60",
    rating: 5,
  },
  {
    id: 3,
    name: "Venkat Reddy",
    role: "Property Seller",
    content:
      "Sold my agricultural land through Yadadri 360° and got a fair price. Their market knowledge and negotiation skills are excellent.",
    avatar: "/placeholder.svg?height=60&width=60",
    rating: 4,
  },
]

// Gallery images
const galleryImages = [
  "/placeholder.svg?height=600&width=800",
  "/placeholder.svg?height=600&width=800",
  "/placeholder.svg?height=600&width=800",
  "/placeholder.svg?height=600&width=800",
  "/placeholder.svg?height=600&width=800",
]

// Services data
const services = [
  {
    icon: <MapPin className="h-8 w-8 text-purple-600" />,
    title: "Open Plots",
    description: "Find the perfect plot to build your dream home in prime locations across Yadadri.",
  },
  {
    icon: <MapPinned className="h-8 w-8 text-purple-600" />,
    title: "Agricultural Lands",
    description: "Invest in fertile agricultural lands with excellent growth potential and returns.",
  },
  {
    icon: <Building className="h-8 w-8 text-purple-600" />,
    title: "Residential Properties",
    description: "Explore our collection of buildings and individual houses in the most sought-after neighborhoods.",
  },
  {
    icon: <Landmark className="h-8 w-8 text-purple-600" />,
    title: "Commercial Properties",
    description: "Discover high-value commercial properties for your business needs and investment portfolio.",
  },
]

export default function Home() {
  const [showAlert, setShowAlert] = useState(false)
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [currentGalleryImage, setCurrentGalleryImage] = useState(0)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    propertyType: "",
    message: "",
  })
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("")
  const sectionRefs = {
    hero: useRef(null),
    services: useRef(null),
    advantages: useRef(null),
    gallery: useRef(null),
    testimonials: useRef(null),
    contact: useRef(null),
  }

  useEffect(() => {
    // Show alert when page loads
    setShowAlert(true)

    // Auto-rotate testimonials
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    // Intersection Observer for sections
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.3 },
    )

    // Observe all sections
    Object.values(sectionRefs).forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current)
      }
    })

    return () => {
      clearInterval(interval)
      observer.disconnect()
    }
  }, [])

  const handleFormChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handlePropertyTypeChange = (value) => {
    setFormData((prev) => ({ ...prev, propertyType: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      // In a real implementation, you would send this data to your backend
      console.log("Form submitted:", formData)

      // Show success message
      alert("Thank you for your message! We'll get back to you soon.")

      // Reset form after submission
      setFormData({
        name: "",
        email: "",
        phone: "",
        propertyType: "",
        message: "",
      })
    } catch (error) {
      console.error("Error submitting form:", error)
      alert("There was an error submitting your form. Please try again.")
    }
  }

  const nextGalleryImage = () => {
    setCurrentGalleryImage((prev) => (prev + 1) % galleryImages.length)
  }

  const prevGalleryImage = () => {
    setCurrentGalleryImage((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Alert Dialog */}
      {/* <AlertDialog open={showAlert} onOpenChange={setShowAlert}>
        <AlertDialogContent className="max-w-md bg-gradient-to-br from-gray-900 to-gray-800 text-white border-none">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-2xl font-bold text-purple-400">Welcome to Yadadri 360°</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-300">
              We provide comprehensive real estate solutions in Yadadri. Explore our properties and services to find
              your dream investment.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <Button onClick={() => setShowAlert(false)} className="bg-purple-600 hover:bg-purple-700 text-white">
              Explore Now
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog> */}

      {/* Header */}
      <header className="sticky top-0 z-50 w-full bg-gradient-to-r from-gray-900 to-gray-800 shadow-lg">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2 relative z-10">
            <div className="relative">
              <Image src="/images/logo.png" alt="Yadadri 360° Logo" width={180} height={50} className="h-20 w-auto" />
              <div className="absolute -inset-1 bg-purple-500 rounded-full blur-md opacity-30 -z-10"></div>
            </div>
          </Link>

          {/* Mobile menu button */}
          <button className="md:hidden text-white p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <div
              className={`w-6 h-0.5 bg-white mb-1.5 transition-all ${isMenuOpen ? "rotate-45 translate-y-2" : ""}`}
            ></div>
            <div className={`w-6 h-0.5 bg-white mb-1.5 transition-all ${isMenuOpen ? "opacity-0" : ""}`}></div>
            <div className={`w-6 h-0.5 bg-white transition-all ${isMenuOpen ? "-rotate-45 -translate-y-2" : ""}`}></div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {Object.entries(sectionRefs).map(
              ([key, _]) =>
                key !== "hero" && (
                  <Link
                    key={key}
                    href={`#${key}`}
                    className={cn(
                      "text-gray-300 hover:text-white transition-colors relative py-1 group",
                      activeSection === key && "text-purple-400",
                    )}
                  >
                    <span className="capitalize">{key}</span>
                    <span
                      className={cn(
                        "absolute bottom-0 left-0 w-0 h-0.5 bg-purple-500 transition-all duration-300 group-hover:w-full",
                        activeSection === key && "w-full",
                      )}
                    ></span>
                  </Link>
                ),
            )}
          </nav>

          {/* Mobile Navigation */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="absolute top-full left-0 right-0 bg-gray-900 shadow-lg md:hidden z-50"
              >
                <div className="flex flex-col p-4 space-y-4">
                  {Object.entries(sectionRefs).map(
                    ([key, _]) =>
                      key !== "hero" && (
                        <Link
                          key={key}
                          href={`#${key}`}
                          className={cn(
                            "text-gray-300 hover:text-white transition-colors py-2 px-4 rounded-md",
                            activeSection === key && "bg-gray-800 text-purple-400",
                          )}
                          onClick={() => setIsMenuOpen(false)}
                        >
                          <span className="capitalize">{key}</span>
                        </Link>
                      ),
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <Button className="hidden md:flex bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white shadow-lg shadow-purple-500/20">
            Schedule Visit
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section id="hero" ref={sectionRefs.hero} className="relative h-screen">
        <Image src="/images/hero.jpeg" alt="Yadadri Temple" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/70 to-gray-900/50 flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-white leading-tight">
                  Find Your <span className="text-purple-400">Dream Property</span> in Yadadri
                </h1>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <p className="text-xl md:text-2xl mb-8 text-gray-200">
                  Your trusted partner for all real estate needs in the spiritual hub of Telangana
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Button className="bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white text-lg px-8 py-6 rounded-full shadow-lg shadow-purple-500/30 transform transition-transform hover:scale-105">
                  Explore Properties
                </Button>
                <Button
                  variant="outline"
                  className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-gray-900 text-lg px-8 py-6 rounded-full transition-colors"
                >
                  Contact Us
                </Button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.8 }}
                className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
              >
                <span className="text-white text-sm mb-2">Scroll to explore</span>
                <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center p-1">
                  <motion.div
                    className="w-1.5 h-1.5 bg-white rounded-full"
                    animate={{ y: [0, 12, 0] }}
                    transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Floating stats */}
        <div className="absolute bottom-10 right-10 hidden lg:block">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="bg-white/10 backdrop-blur-lg rounded-lg p-6 border border-white/20 shadow-xl"
          >
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center">
                <p className="text-4xl font-bold text-purple-400">500+</p>
                <p className="text-white text-sm">Properties</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold text-purple-400">300+</p>
                <p className="text-white text-sm">Happy Clients</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold text-purple-400">10+</p>
                <p className="text-white text-sm">Years Experience</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold text-purple-400">24/7</p>
                <p className="text-white text-sm">Support</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Our Services Section */}
      <section id="services" ref={sectionRefs.services} className="py-20 bg-gradient-to-b from-gray-100 to-gray-200">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="px-4 py-2 rounded-full bg-purple-100 text-purple-700 text-sm font-medium inline-block mb-4">
                Our Expertise
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Our Services</h2>
              <div className="w-24 h-1 bg-purple-600 mx-auto mb-6"></div>
              <p className="max-w-2xl mx-auto text-gray-600 text-lg">
                We provide comprehensive real estate solutions tailored to your needs, ensuring you find the perfect
                property.
              </p>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-xl shadow-xl p-8 transform transition-all hover:shadow-2xl hover:-translate-y-2 group"
            >
              <div className="bg-purple-100 w-16 h-16 rounded-lg flex items-center justify-center mb-6 group-hover:bg-purple-600 transition-colors">
                <MapPin className="h-8 w-8 text-purple-600 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800">Property Brokerage</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                We provide solutions for all your real estate needs, including property brokerage. Whether you're
                looking for open plots, agricultural lands, buildings, or individual houses, we ensure that you choose
                the right property at a fair price in Yadadri.
              </p>
              <Button className="bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 group-hover:shadow-lg group-hover:shadow-purple-500/30 transition-all">
                <span>Learn More</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-xl shadow-xl p-8 transform transition-all hover:shadow-2xl hover:-translate-y-2 group"
            >
              <div className="bg-purple-100 w-16 h-16 rounded-lg flex items-center justify-center mb-6 group-hover:bg-purple-600 transition-colors">
                <Building className="h-8 w-8 text-purple-600 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800">Property Investment</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Our property investment services help you make informed decisions for long-term wealth creation. We
                analyze market trends, identify high-potential areas, and guide you through the investment process for
                maximum returns.
              </p>
              <Button className="bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 group-hover:shadow-lg group-hover:shadow-purple-500/30 transition-all">
                <span>Learn More</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="border-none shadow-lg hover:shadow-xl transition-shadow overflow-hidden group">
                  <CardContent className="p-6 text-center relative">
                    <div className="absolute inset-0 bg-purple-600 transform -translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-0"></div>
                    <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 relative z-10 group-hover:bg-white transition-colors">
                      {service.icon}
                    </div>
                    <h3 className="text-xl font-medium mb-2 relative z-10 group-hover:text-white transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 group-hover:text-white/90 relative z-10 transition-colors">
                      {service.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Excellence Section */}
      <section className="py-20 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="px-4 py-2 rounded-full bg-purple-900/50 text-purple-300 text-sm font-medium inline-block mb-4">
                Why Choose Us
              </span>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Excellence</h2>
              <div className="w-24 h-1 bg-purple-500 mx-auto mb-6"></div>
              <p className="max-w-2xl mx-auto text-gray-300 text-lg">
                We are committed to providing exceptional service with integrity, honesty, and trust.
              </p>
            </motion.div>
          </div>

          <div className="flex flex-col md:flex-row justify-center items-center">
            <motion.div
              className="md:w-1/2 mb-8 md:mb-0"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative">
                <Image
                  src="/images/excellence.jpeg"
                  alt="Our Excellence"
                  width={600}
                  height={600}
                  className="rounded-lg shadow-2xl"
                />
                <div className="absolute -inset-4 bg-purple-500 rounded-lg blur-xl opacity-20 -z-10"></div>
              </div>
            </motion.div>

            <div className="md:w-1/2 md:pl-16">
              <motion.div
                className="mb-10 relative"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className="absolute -left-10 top-0 w-16 h-16 bg-purple-600/20 rounded-full flex items-center justify-center">
                  <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">1</span>
                  </div>
                </div>
                <h3 className="text-3xl font-bold mb-4 text-purple-300">Trust</h3>
                <p className="text-gray-300 text-lg">
                  We give the best service and maintain complete transparency in all our dealings, ensuring our clients
                  can trust us with their most important investments.
                </p>
              </motion.div>

              <motion.div
                className="mb-10 relative"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="absolute -left-10 top-0 w-16 h-16 bg-purple-600/20 rounded-full flex items-center justify-center">
                  <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">2</span>
                  </div>
                </div>
                <h3 className="text-3xl font-bold mb-4 text-purple-300">Honesty</h3>
                <p className="text-gray-300 text-lg">
                  We give what we promise, ensuring client satisfaction and building long-term relationships based on
                  honesty and integrity.
                </p>
              </motion.div>

              <motion.div
                className="relative"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <div className="absolute -left-10 top-0 w-16 h-16 bg-purple-600/20 rounded-full flex items-center justify-center">
                  <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">3</span>
                  </div>
                </div>
                <h3 className="text-3xl font-bold mb-4 text-purple-300">Integrity</h3>
                <p className="text-gray-300 text-lg">
                  We are committed to our values and uphold the highest ethical standards in our business practices and
                  client relationships.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Location Advantages */}
      <section id="advantages" ref={sectionRefs.advantages} className="py-20 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="px-4 py-2 rounded-full bg-purple-100 text-purple-700 text-sm font-medium inline-block mb-4">
                Prime Location
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Location Advantages</h2>
              <div className="w-24 h-1 bg-purple-600 mx-auto mb-6"></div>
              <p className="max-w-2xl mx-auto text-gray-600 text-lg">
                Discover why Yadadri is the perfect place for your next property investment.
              </p>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <motion.div
                className="bg-white p-8 rounded-xl shadow-xl mb-8 transform transition-all hover:shadow-2xl hover:-translate-y-1"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                    <Landmark className="h-6 w-6 text-purple-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800">The "Second Tirupati"</h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  Yadadri is a rapidly developing residential neighborhood in Hyderabad, often referred to as the
                  "Second Tirupati." With its spiritual significance and growing infrastructure, it's becoming a prime
                  location for property investment.
                </p>
              </motion.div>

              <motion.div
                className="bg-white p-8 rounded-xl shadow-xl mb-8 transform transition-all hover:shadow-2xl hover:-translate-y-1"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                    <MapPin className="h-6 w-6 text-purple-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800">Excellent Connectivity</h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  Enjoy excellent connectivity to major hospitals and shopping malls, all within a 10-15 minute drive.
                  Additionally, it is just a 20-minute drive from the Outer Ring Road, making it easily accessible.
                </p>
              </motion.div>

              <motion.div
                className="bg-white p-8 rounded-xl shadow-xl transform transition-all hover:shadow-2xl hover:-translate-y-1"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                    <Clock className="h-6 w-6 text-purple-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800">Growing Tourism</h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  With daily floating pilgrims from all corners of the state, Yadadri is showing promising signs of
                  improved living conditions and increasing property values, making it an excellent investment
                  opportunity.
                </p>
              </motion.div>
            </div>

            <motion.div
              className="relative h-[500px] rounded-xl overflow-hidden shadow-2xl"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30558.50300456791!2d78.9204871!3d17.5276403!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb7f4a5d3c9d8d%3A0x7f0c5a4f2b2b2b2b!2sYadadri%20Temple!5e0!3m2!1sen!2sin!4<merged_code>
i768!4f13.1!3m3!1m2!1s0x3bcb7f4a5d3c9d8d%3A0x7f0c5a4f2b2b2b2b!2sYadadri%20Temple!5e0!3m2!1sen!2sin!4v1617123456789!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                title="Yadadri Location Map"
              ></iframe>
              <div className="absolute inset-0 pointer-events-none border-8 border-white rounded-xl"></div>
              <div className="absolute -inset-4 bg-purple-500 rounded-xl blur-xl opacity-20 -z-10"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" ref={sectionRefs.gallery} className="py-20 bg-gradient-to-b from-gray-200 to-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="px-4 py-2 rounded-full bg-purple-100 text-purple-700 text-sm font-medium inline-block mb-4">
                Our Properties
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Property Gallery</h2>
              <div className="w-24 h-1 bg-purple-600 mx-auto mb-6"></div>
              <p className="max-w-2xl mx-auto text-gray-600 text-lg">
                Explore our exclusive collection of premium properties in Yadadri.
              </p>
            </motion.div>
          </div>

          <motion.div
            className="relative"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="overflow-hidden rounded-xl shadow-2xl h-[500px] relative">
              <Image
                src={galleryImages[currentGalleryImage] || "/placeholder.svg"}
                alt={`Gallery image ${currentGalleryImage + 1}`}
                fill
                className="object-cover transition-transform duration-1000 hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                <div className="p-8 text-white">
                  <h3 className="text-2xl font-bold mb-2">Premium Property {currentGalleryImage + 1}</h3>
                  <p className="text-gray-200">Discover our exclusive properties in prime locations of Yadadri.</p>
                </div>
              </div>
            </div>

            <button
              onClick={prevGalleryImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-md rounded-full p-4 shadow-lg hover:bg-white/30 transition-all"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-6 w-6 text-white" />
            </button>

            <button
              onClick={nextGalleryImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-md rounded-full p-4 shadow-lg hover:bg-white/30 transition-all"
              aria-label="Next image"
            >
              <ChevronRight className="h-6 w-6 text-white" />
            </button>

            <div className="flex justify-center mt-8 gap-3">
              {galleryImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentGalleryImage(index)}
                  className={cn(
                    "w-16 h-2 rounded-full transition-all",
                    index === currentGalleryImage ? "bg-purple-600 w-24" : "bg-gray-300 hover:bg-gray-400",
                  )}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            {galleryImages.slice(0, 4).map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative h-40 rounded-lg overflow-hidden cursor-pointer group"
                onClick={() => setCurrentGalleryImage(index)}
              >
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`Thumbnail ${index + 1}`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-purple-900/0 group-hover:bg-purple-900/30 transition-colors flex items-center justify-center">
                  <div className="bg-white rounded-full p-2 scale-0 group-hover:scale-100 transition-transform">
                    <ArrowRight className="h-4 w-4 text-purple-600" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section
        id="testimonials"
        ref={sectionRefs.testimonials}
        className="py-20 bg-gradient-to-r from-gray-900 to-gray-800 text-white"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="px-4 py-2 rounded-full bg-purple-900/50 text-purple-300 text-sm font-medium inline-block mb-4">
                Client Reviews
              </span>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">What Our Clients Say</h2>
              <div className="w-24 h-1 bg-purple-500 mx-auto mb-6"></div>
              <p className="max-w-2xl mx-auto text-gray-300 text-lg">
                Hear from our satisfied clients about their experience working with Yadadri 360°.
              </p>
            </motion.div>
          </div>

          <div className="relative max-w-4xl mx-auto">
            <div className="overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentTestimonial}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-8 shadow-2xl border border-gray-700">
                    <div className="flex flex-col md:flex-row items-center mb-6">
                      <div className="mb-4 md:mb-0 md:mr-6">
                        <div className="relative">
                          <Image
                            src={testimonials[currentTestimonial].avatar || "/placeholder.svg"}
                            alt={testimonials[currentTestimonial].name}
                            width={80}
                            height={80}
                            className="rounded-full border-4 border-purple-500"
                          />
                          <div className="absolute -inset-1 bg-purple-500 rounded-full blur-md opacity-30 -z-10"></div>
                        </div>
                      </div>
                      <div className="text-center md:text-left">
                        <h3 className="font-bold text-2xl text-purple-300">{testimonials[currentTestimonial].name}</h3>
                        <p className="text-gray-400">{testimonials[currentTestimonial].role}</p>
                        <div className="flex items-center justify-center md:justify-start mt-2">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={cn(
                                "h-5 w-5",
                                i < testimonials[currentTestimonial].rating
                                  ? "text-yellow-400 fill-yellow-400"
                                  : "text-gray-600",
                              )}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="relative">
                      <svg
                        className="absolute -top-6 -left-6 h-16 w-16 text-purple-800/30"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                      </svg>
                      <p className="text-gray-300 italic text-xl leading-relaxed">
                        "{testimonials[currentTestimonial].content}"
                      </p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="flex justify-center mt-8 gap-3">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={cn(
                    "w-12 h-2 rounded-full transition-all",
                    index === currentTestimonial ? "bg-purple-500 w-20" : "bg-gray-700 hover:bg-gray-600",
                  )}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact" ref={sectionRefs.contact} className="py-20 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="px-4 py-2 rounded-full bg-purple-100 text-purple-700 text-sm font-medium inline-block mb-4">
                Get In Touch
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Contact Us</h2>
              <div className="w-24 h-1 bg-purple-600 mx-auto mb-6"></div>
              <p className="max-w-2xl mx-auto text-gray-600 text-lg">
                Have questions or ready to explore properties? Reach out to our team today.
              </p>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-xl p-8 border border-gray-100">
                <h3 className="text-2xl font-bold mb-6 text-gray-800">Send Us a Message</h3>

                <div className="mb-6">
                  <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                    Full Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleFormChange}
                    placeholder="Enter your full name"
                    className="border-gray-300 focus:border-purple-500 focus:ring focus:ring-purple-200 transition-all"
                    required
                  />
                </div>

                <div className="mb-6">
                  <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                    Email Address
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleFormChange}
                    placeholder="Enter your email address"
                    className="border-gray-300 focus:border-purple-500 focus:ring focus:ring-purple-200 transition-all"
                    required
                  />
                </div>

                <div className="mb-6">
                  <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">
                    Phone Number
                  </label>
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleFormChange}
                    placeholder="Enter your phone number"
                    className="border-gray-300 focus:border-purple-500 focus:ring focus:ring-purple-200 transition-all"
                    required
                  />
                </div>

                <div className="mb-6">
                  <label htmlFor="propertyType" className="block text-gray-700 font-medium mb-2">
                    Property Type
                  </label>
                  <Select onValueChange={handlePropertyTypeChange} value={formData.propertyType}>
                    <SelectTrigger className="border-gray-300 focus:border-purple-500 focus:ring focus:ring-purple-200 transition-all">
                      <SelectValue placeholder="Select property type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="open-plot">Open Plot</SelectItem>
                      <SelectItem value="agricultural-land">Agricultural Land</SelectItem>
                      <SelectItem value="building">Building</SelectItem>
                      <SelectItem value="individual-house">Individual House</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="mb-6">
                  <label htmlFor="message" className="block text-gray-700 font-medium mb-2">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleFormChange}
                    placeholder="Tell us about your requirements"
                    rows={4}
                    className="border-gray-300 focus:border-purple-500 focus:ring focus:ring-purple-200 transition-all"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white py-3 rounded-lg shadow-lg shadow-purple-500/20 flex items-center justify-center gap-2"
                >
                  <Send className="h-5 w-5" />
                  <span>Send Message</span>
                </Button>
              </form>
            </motion.div>

            <div>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-white rounded-xl shadow-xl p-8 mb-8 border border-gray-100"
              >
                <h3 className="text-2xl font-bold mb-6 text-gray-800">Get in Touch</h3>

                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="bg-purple-100 rounded-lg p-3 mr-4">
                      <MapPin className="h-6 w-6 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800 text-lg">Address</h4>
                      <p className="text-gray-600">
                       Yadadri Bhuvanagiri, Yadagiripally, Yadagirigutta, Near, Main Road, Hyderabad, Telangana 508115
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-purple-100 rounded-lg p-3 mr-4">
                      <Phone className="h-6 w-6 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800 text-lg">Phone</h4>
                      <p className="text-gray-600">+91 9052362639</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-purple-100 rounded-lg p-3 mr-4">
                      <Mail className="h-6 w-6 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800 text-lg">Email</h4>
                      <p className="text-gray-600">yadadri.360@gmail.com</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-purple-100 rounded-lg p-3 mr-4">
                      <Clock className="h-6 w-6 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800 text-lg">Business Hours</h4>
                      <p className="text-gray-600">Monday - Saturday: 9:00 AM - 7:00 PM</p>
                      <p className="text-gray-600">Sunday: 10:00 AM - 2:00 PM</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-gradient-to-r from-purple-600 to-purple-800 rounded-xl shadow-xl p-8 text-white"
              >
                <h3 className="text-2xl font-bold mb-4">Schedule a Site Visit</h3>
                <p className="mb-6 text-purple-100">
                  Interested in visiting our properties? Schedule a site visit with our experts who will guide you
                  through the best options based on your requirements.
                </p>
                <Button
                  variant="outline"
                  className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-purple-700 transition-colors"
                >
                  Schedule Visit
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white pt-20 pb-8">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div>
              <div className="mb-6 relative inline-block">
                <Image src="/images/logo.png" alt="Yadadri 360° Logo" width={180} height={50} className="h-20 w-auto" />
                <div className="absolute -inset-1 bg-purple-500 rounded-full blur-md opacity-30 -z-10"></div>
              </div>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Your friendly real estate partner in Yadadri, helping you find the perfect property for your needs. We
                specialize in open plots, agricultural lands, buildings, and individual houses.
              </p>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="bg-gray-800 hover:bg-purple-600 text-white p-3 rounded-full transition-colors"
                  aria-label="Facebook"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a
                  href="#"
                  className="bg-gray-800 hover:bg-purple-600 text-white p-3 rounded-full transition-colors"
                  aria-label="Twitter"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="bg-gray-800 hover:bg-purple-600 text-white p-3 rounded-full transition-colors"
                  aria-label="Instagram"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-6 relative inline-block">
                Quick Links
                <div className="absolute -bottom-2 left-0 w-12 h-1 bg-purple-500"></div>
              </h3>
              <ul className="space-y-4">
                <li>
                  <Link
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors hover:translate-x-1 inline-block group"
                  >
                    <span className="flex items-center">
                      <ArrowRight className="h-4 w-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                      <span>Home</span>
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="#services"
                    className="text-gray-400 hover:text-white transition-colors hover:translate-x-1 inline-block group"
                  >
                    <span className="flex items-center">
                      <ArrowRight className="h-4 w-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                      <span>Our Services</span>
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="#advantages"
                    className="text-gray-400 hover:text-white transition-colors hover:translate-x-1 inline-block group"
                  >
                    <span className="flex items-center">
                      <ArrowRight className="h-4 w-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                      <span>Location Advantages</span>
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="#gallery"
                    className="text-gray-400 hover:text-white transition-colors hover:translate-x-1 inline-block group"
                  >
                    <span className="flex items-center">
                      <ArrowRight className="h-4 w-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                      <span>Property Gallery</span>
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="#contact"
                    className="text-gray-400 hover:text-white transition-colors hover:translate-x-1 inline-block group"
                  >
                    <span className="flex items-center">
                      <ArrowRight className="h-4 w-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                      <span>Contact Us</span>
                    </span>
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-6 relative inline-block">
                Properties
                <div className="absolute -bottom-2 left-0 w-12 h-1 bg-purple-500"></div>
              </h3>
              <ul className="space-y-4">
                <li>
                  <Link
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors hover:translate-x-1 inline-block group"
                  >
                    <span className="flex items-center">
                      <ArrowRight className="h-4 w-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                      <span>Open Plots</span>
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors hover:translate-x-1 inline-block group"
                  >
                    <span className="flex items-center">
                      <ArrowRight className="h-4 w-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                      <span>Agricultural Lands</span>
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors hover:translate-x-1 inline-block group"
                  >
                    <span className="flex items-center">
                      <ArrowRight className="h-4 w-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                      <span>Buildings</span>
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors hover:translate-x-1 inline-block group"
                  >
                    <span className="flex items-center">
                      <ArrowRight className="h-4 w-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                      <span>Individual Houses</span>
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors hover:translate-x-1 inline-block group"
                  >
                    <span className="flex items-center">
                      <ArrowRight className="h-4 w-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                      <span>Commercial Properties</span>
                    </span>
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-6 relative inline-block">
                Newsletter
                <div className="absolute -bottom-2 left-0 w-12 h-1 bg-purple-500"></div>
              </h3>
              <p className="text-gray-400 mb-6">
                Subscribe to our newsletter to receive updates on new properties and offers.
              </p>
              <form className="space-y-4">
                <div className="relative">
                  <Input
                    type="email"
                    placeholder="Your email address"
                    className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 pr-12"
                  />
                  <Button className="absolute right-1 top-1 h-8 w-8 p-0 bg-purple-600 hover:bg-purple-700">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-xs text-gray-500">
                  By subscribing, you agree to our{" "}
                  <Link href="#" className="text-purple-400 hover:underline">
                    Privacy Policy
                  </Link>{" "}
                  and consent to receive updates.
                </p>
              </form>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-center text-gray-400 mb-4 md:mb-0">
                &copy; {new Date().getFullYear()} Yadadri 360°. All rights reserved.
              </p>
              <div className="flex space-x-6">
                <Link href="#" className="text-gray-400 hover:text-white text-sm hover:underline">
                  Privacy Policy
                </Link>
                <Link href="#" className="text-gray-400 hover:text-white text-sm hover:underline">
                  Terms of Service
                </Link>
                <Link href="#" className="text-gray-400 hover:text-white text-sm hover:underline">
                  Sitemap
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* WhatsApp Fixed Button */}
      <a
        href="https://wa.me/90523 62639"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-green-500 text-white rounded-full p-4 shadow-xl hover:bg-green-600 transition-colors z-50 group"
        aria-label="Contact on WhatsApp"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="group-hover:scale-110 transition-transform"
        >
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
        </svg>
        <div className="absolute right-full mr-3 bg-white text-green-600 px-3 py-2 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap">
          Chat with us
        </div>
      </a>
    </div>
  )
}

