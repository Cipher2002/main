'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Phone, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from "./button"
import Link from 'next/link'
import WhatsAppIcon from "./WhatsAppIcon"

export default function VastuConsultantPage() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const handleWhatsApp = () => {
    window.open("https://wa.me/8368532837", "_blank")
  }

  const carouselImages = [
    "/vastu-image-1.jpg",
    "/vastu-image-2.jpg",
    "/vastu-image-3.jpg",
    "/vastu-image-4.jpg",
  ]

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselImages.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselImages.length) % carouselImages.length)
  }

  // Scrolling effects
  const fadeInRef = useRef<(HTMLElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('fade-in')
          }
        })
      },
      { threshold: 0.1 }
    )

    fadeInRef.current.forEach((el) => {
      if (el) observer.observe(el)
    })

    return () => {
      fadeInRef.current.forEach((el) => {
        if (el) observer.unobserve(el)
      })
    }
  }, [])

  return (
    <div className="flex flex-col min-h-screen bg-teal-100">
      <header className="bg-brown-800 p-4 flex justify-between items-center sticky top-0 z-10 shadow-md">
        <div className="flex items-center space-x-4 text-black">
          <Phone className="text-black-200" />
          <span>+91 123456789</span>
        </div>
        <img src="/logo.png" alt="Shree Shyam Jyotish Kendra" className="h-12" />
        <div className="flex items-center space-x-4">
          <Link href="/book-appointment">
            <Button className="bg-yellow-700 hover:bg-yellow-600">BOOK AN APPOINTMENT</Button>
          </Link>
        </div>
      </header>

      <main className="flex-grow">
        <section className="bg-purple-800 text-white p-12 text-center">
          <h1 className="text-4xl font-bold mb-6">Vastu Consultant</h1>
          <Link href="/book-appointment">
            <Button size="lg" className="bg-amber-500 hover:bg-amber-600">
              CONSULT TODAY
            </Button>
          </Link>
        </section>

        <section className="p-12" ref={(el) => { fadeInRef.current[0] = el; }}>
          <h2 className="text-3xl font-bold mb-6">Services</h2>
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-1">
              <p className="mb-4">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime nesciunt atque architecto exercitationem odit eligendi amet laboriosam earum aut assumenda! Consequuntur officia, laudantium exercitationem sed accusantium praesentium est voluptas similique?
              </p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt consequuntur modi distinctio neque, possimus exercitationem corrupti voluptates obcaecati iste totam officiis. Laudantium perspiciatis nemo adipisci exercitationem vero, esse consectetur voluptas!
              </p>
            </div>
            <div className="flex-1">
              <img src="/vastu-image.jpg" alt="Vastu Consultation" className="w-full rounded-lg" />
            </div>
          </div>
        </section>

        <section className="p-12" ref={(el) => { fadeInRef.current[1] = el; }}>
          <h2 className="text-3xl font-bold mb-6">Photo Carousel</h2>
          <div className="relative">
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-300 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {carouselImages.map((src, index) => (
                  <img
                    key={index}
                    src={src}
                    alt={`Vastu Consultation ${index + 1}`}
                    className="w-full h-96 object-cover flex-shrink-0"
                  />
                ))}
              </div>
            </div>
            <Button
              onClick={prevSlide}
              className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80 hover:bg-white"
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <Button
              onClick={nextSlide}
              className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80 hover:bg-white"
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </div>
        </section>
      </main>

      <WhatsAppIcon
        onClick={handleWhatsApp}
        className="fixed bottom-4 right-4 w-12 h-12 transition-transform transform hover:scale-110 hover:opacity-80"
      />
    </div>
  )
}