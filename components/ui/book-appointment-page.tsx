'use client'

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { format, addMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay } from "date-fns"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Link from 'next/link'

const timeSlots = [
  "9:00am", "10:00am", "11:00am", "12:00pm", "1:00pm", "2:00pm"
]

export default function BookAppointmentPage() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date())
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    consultationType: '',
    additionalInfo: ''
  })

  const handlePrevMonth = () => {
    setCurrentDate(prev => addMonths(prev, -1))
  }

  const handleNextMonth = () => {
    setCurrentDate(prev => addMonths(prev, 1))
  }

  const handleDateClick = (date: Date) => {
    setSelectedDate(date)
    setSelectedTime(null)
  }

  const handleTimeClick = (time: string) => {
    setSelectedTime(time)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Booking submitted:', { selectedDate, selectedTime, ...formData })
    // Here you would typically send this data to your backend
  }

  const renderCalendar = () => {
    const monthStart = startOfMonth(currentDate)
    const monthEnd = endOfMonth(monthStart)
    const dateRange = eachDayOfInterval({ start: monthStart, end: monthEnd })

    return (
      <div className="bg-darkmoss-100 rounded-lg shadow p-8 flex-1">
        <div className="flex justify-between items-center mb-6">
          <Button onClick={handlePrevMonth} variant="ghost" size="icon" className="text-cornsilk-100 hover:text-pakgreen-100 hover:bg-pakgreen-200">
            <ChevronLeft className="h-20 w-20" />
          </Button>
          <h2 className="text-2xl font-semibold text-cornsilk-100">{format(currentDate, 'MMMM yyyy')}</h2>
          <Button onClick={handleNextMonth} variant="ghost" size="icon" className="text-cornsilk-100 hover:text-pakgreen-100 hover:bg-pakgreen-200">
            <ChevronRight className="h-20 w-20" />
          </Button>
        </div>
        <div className="grid grid-cols-7 gap-2 text-center">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="text-lg font-medium text-cornsilk-100 mb-2">{day}</div>
          ))}
          {dateRange.map((date, i) => (
            <Button
              key={i}
              onClick={() => handleDateClick(date)}
              variant="ghost"
              size="lg"
              className={`
                p-2 text-lg rounded-full
                ${!isSameMonth(date, currentDate) ? 'text-cornsilk-100' : 'text-cornsilk-100'}
                ${isSameDay(date, selectedDate || new Date()) ? 'bg-tigerseye-100 text-cornsilk-100 hover:bg-tigerseye-100' : 'hover:bg-pakgreen-200 hover-text-cornsilk-100'}
              `}
            >
              {format(date, 'd')}
            </Button>
          ))}
        </div>
      </div>
    )
  }

  const renderTimeSlots = () => (
    <div className="bg-darkmoss-100 rounded-lg shadow p-6 flex-1">
      <h3 className="text-xl text-cornsilk-100 font-semibold mb-6">
        {selectedDate ? format(selectedDate, 'EEEE, MMMM d') : 'Select a Time'}
      </h3>
      <div className="space-y-4">
        {timeSlots.map(time => (
          <Button
            key={time}
            onClick={() => handleTimeClick(time)}
            className={`
              w-full justify-between py-3 px-4 rounded-lg text-base
              ${selectedTime === time ? 'bg-tigerseye-100 text-cornsilk-100 hover:bg-tigerseye-100' : 'bg-cornsilk-100 text-darkmoss-100 hover:bg-pakgreen-200'}
              ${!selectedDate ? 'opacity-50 cursor-not-allowed' : ''}
            `}
            disabled={!selectedDate}
          >
            <span>{time}</span>
            <span className={`px-3 py-1 rounded-full text-xs ${selectedTime === time ? 'bg-darkmoss-100 text-cornsilk-100' : 'invisible'}`}>
              Selected
            </span>
          </Button>
        ))}
      </div>
    </div>
  )

  const renderForm = () => (
    <form onSubmit={handleSubmit} className="space-y-4 mt-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-pakgreen-100">Name</label>
        <Input id="name" name="name" value={formData.name} onChange={handleInputChange} required className="border-pakgreen-100 focus:border-pakgreen-200 focus:ring-pakgreen-100" />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-pakgreen-100">Email</label>
        <Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} required className="border-pakgreen-100 focus:border-pakgreen-200 focus:ring-pakgreen-100" />
      </div>
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-pakgreen-100">Phone</label>
        <Input id="phone" name="phone" value={formData.phone} onChange={handleInputChange} required className="border-pakgreen-100 focus:border-pakgreen-200 focus:ring-pakgreen-100" />
      </div>
      <div>
        <label htmlFor="consultationType" className="block text-sm font-medium text-pakgreen-100">Consultation Type</label>
        <Select name="consultationType" onValueChange={(value) => handleInputChange ({target: { name: 'consultationType', value }} as React.ChangeEvent<HTMLInputElement>)}>
          <SelectTrigger className="border-pakgreen-100 focus:border-pakgreen-200 focus:ring-pakgreen-100">
            <SelectValue placeholder="Select consultation type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="vastu">Vastu Consultation</SelectItem>
            <SelectItem value="astrology">Astrology Reading</SelectItem>
            <SelectItem value="gemstone">Gemstone Consultation</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <label htmlFor="additionalInfo" className="block text-sm font-medium text-pakgreen-100">Additional Information</label>
        <Textarea id="additionalInfo" name="additionalInfo" value={formData.additionalInfo} onChange={handleInputChange} className="border-pakgreen-100 focus:border-pakgreen-200 focus:ring-pakgreen-100" />
      </div>
      <Button type="submit" className="w-full bg-tigerseye-100 hover:bg-tigerseye-200 text-cornsilk-100">Book Consultation</Button>
    </form>
  )

  return (
    <div className="flex flex-col min-h-screen bg-cornsilk-100">
      <header className="bg-pakgreen-100 p-4 flex justify-between items-center sticky top-0 z-10 shadow-md">
        <img src="/logo.png" alt="Shree Shyam Jyotish Kendra" className="h-12" />
      </header>

      <main className="flex-grow p-8">
        <h1 className="text-3xl font-bold mb-8 text-pakgreen-100">Book an Online Consultation</h1>
        {step === 1 && (
          <div className="flex flex-col items-center">
            <div className="flex flex-col lg:flex-row gap-8 p-8 rounded-xl max-w-7xl mx-auto">
              {renderCalendar()}
              {renderTimeSlots()}
            </div>
            {selectedDate && selectedTime && (
              <Button onClick={() => setStep(2)} className="mt-8 bg-tigerseye-100 hover:bg-tigerseye-200 hover:text-cornsilk-100 text-cornsilk-100 text-lg py-3 px-6">Next</Button>
            )}
          </div>
        )}
        {step === 2 && (
          <div className="max-w-2xl mx-auto">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-pakgreen-100">Selected Date and Time:</h2>
              <p className="text-pakgreen-100 text-xl">{selectedDate && format(selectedDate, 'MMMM d, yyyy')} at {selectedTime}</p>
            </div>
            {renderForm()}
            <Button onClick={() => setStep(1)} className="mt-8 bg-tigerseye-100 hover:bg-tigerseye-200 hover:text-cornsilk-100 text-cornsilk-100 text-lg">Back</Button>
          </div>
        )}
      </main>
    </div>
  )
}