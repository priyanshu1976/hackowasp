'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

type FormData = {
  age: string
  weight: string
  weightUnit: string
  heightFeet: string
  heightInches: string
  heightCm: string
  heightUnit: string
  gender: string
  activityLevel: string
  goal: string
  duration: string
}

export default function FitnessProfileForm() {
  const [formData, setFormData] = useState<FormData>({
    age: '',
    weight: '',
    weightUnit: 'kg',
    heightFeet: '',
    heightInches: '',
    heightCm: '',
    heightUnit: 'cm',
    gender: '',
    activityLevel: '',
    goal: '',
    duration: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleRadioChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const res = await fetch('/api/genai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!res.ok) {
        throw new Error('Failed to submit form')
      }

      const data = await res.json()
      console.log('Success:', data)
      alert('Form submitted successfully!')
    } catch (err) {
      console.error('Error submitting form:', err)
      alert('Something went wrong. Please try again.')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 text-white">
      {/* Age */}
      <div>
        <label htmlFor="age" className="block text-sm font-medium text-gray-300 mb-1">
          Age
        </label>
        <input
          type="number"
          id="age"
          name="age"
          min="13"
          max="100"
          value={formData.age}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg border border-gray-700 bg-gray-800 text-white placeholder-gray-400"
          placeholder="Enter your age"
          required
        />
      </div>

      {/* Weight */}
      <div>
        <label htmlFor="weight" className="block text-sm font-medium text-gray-300 mb-1">
          Weight
        </label>
        <div className="flex">
          <input
            type="number"
            id="weight"
            name="weight"
            min="30"
            max="300"
            value={formData.weight}
            onChange={handleChange}
            className="flex-1 px-4 py-3 rounded-l-lg border border-gray-700 bg-gray-800 text-white placeholder-gray-400"
            placeholder="Enter your weight"
            required
          />
          <div className="relative">
            <select
              name="weightUnit"
              value={formData.weightUnit}
              onChange={handleChange}
              className="h-full px-4 py-3 rounded-r-lg border border-gray-700 bg-gray-800 text-white appearance-none pr-8"
            >
              <option value="kg">kg</option>
              <option value="lb">lb</option>
            </select>
            <ChevronDown size={16} className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Height */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">Height</label>
        <div className="flex items-center mb-2">
          <div className="flex items-center mr-4">
            <input
              type="radio"
              id="height-cm"
              name="heightUnit"
              value="cm"
              checked={formData.heightUnit === 'cm'}
              onChange={() => handleRadioChange('heightUnit', 'cm')}
              className="h-4 w-4 text-green-500 border-gray-600"
            />
            <label htmlFor="height-cm" className="ml-2 text-sm text-gray-300">
              Centimeters
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="radio"
              id="height-ft"
              name="heightUnit"
              value="ft/in"
              checked={formData.heightUnit === 'ft/in'}
              onChange={() => handleRadioChange('heightUnit', 'ft/in')}
              className="h-4 w-4 text-green-500 border-gray-600"
            />
            <label htmlFor="height-ft" className="ml-2 text-sm text-gray-300">
              Feet/Inches
            </label>
          </div>
        </div>

        {formData.heightUnit === 'cm' ? (
          <input
            type="number"
            id="heightCm"
            name="heightCm"
            min="100"
            max="250"
            value={formData.heightCm}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-gray-700 bg-gray-800 text-white placeholder-gray-400"
            placeholder="Enter your height in cm"
            required
          />
        ) : (
          <div className="flex gap-2">
            <input
              type="number"
              id="heightFeet"
              name="heightFeet"
              min="3"
              max="8"
              value={formData.heightFeet}
              onChange={handleChange}
              className="flex-1 px-4 py-3 rounded-lg border border-gray-700 bg-gray-800 text-white placeholder-gray-400"
              placeholder="Feet"
              required
            />
            <input
              type="number"
              id="heightInches"
              name="heightInches"
              min="0"
              max="11"
              value={formData.heightInches}
              onChange={handleChange}
              className="flex-1 px-4 py-3 rounded-lg border border-gray-700 bg-gray-800 text-white placeholder-gray-400"
              placeholder="Inches"
              required
            />
          </div>
        )}
      </div>

      {/* Gender */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">Gender</label>
        <div className="grid grid-cols-3 gap-3">
          {['male', 'female', 'other'].map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => handleRadioChange('gender', option)}
              className={`px-4 py-3 rounded-lg border ${
                formData.gender === option
                  ? 'border-green-500 bg-green-800 text-green-300'
                  : 'border-gray-700 bg-gray-800 text-white hover:bg-gray-700'
              }`}
            >
              {option.charAt(0).toUpperCase() + option.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Activity Level */}
      <div>
        <label htmlFor="activityLevel" className="block text-sm font-medium text-gray-300 mb-1">
          Activity Level
        </label>
        <div className="relative">
          <select
            id="activityLevel"
            name="activityLevel"
            value={formData.activityLevel}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-gray-700 bg-gray-800 text-white"
            required
          >
            <option value="" disabled>
              Select your activity level
            </option>
            <option value="sedentary">Sedentary (little or no exercise)</option>
            <option value="light">Light (1-3 days/week)</option>
            <option value="moderate">Moderate (3-5 days/week)</option>
            <option value="active">Active (6-7 days/week)</option>
            <option value="very-active">Very Active (daily intense exercise)</option>
          </select>
          <ChevronDown size={16} className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
        </div>
      </div>

      {/* Goal */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">Fitness Goal</label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            'lose-weight',
            'maintain',
            'build-muscle',
            'improve-endurance',
            'improve-strength',
          ].map((goal) => (
            <button
              key={goal}
              type="button"
              onClick={() => handleRadioChange('goal', goal)}
              className={`px-4 py-3 rounded-lg border ${
                formData.goal === goal
                  ? 'border-green-500 bg-green-800 text-green-300'
                  : 'border-gray-700 bg-gray-800 text-white hover:bg-gray-700'
              }`}
            >
              {goal.replace('-', ' ').replace(/\b\w/g, (c) => c.toUpperCase())}
            </button>
          ))}
        </div>
      </div>

      {/* Duration */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">Program Duration</label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {['4-weeks', '8-weeks', '12-weeks', '16-weeks', 'ongoing'].map((duration) => (
            <button
              key={duration}
              type="button"
              onClick={() => handleRadioChange('duration', duration)}
              className={`px-4 py-3 rounded-lg border ${
                formData.duration === duration
                  ? 'border-green-500 bg-green-800 text-green-300'
                  : 'border-gray-700 bg-gray-800 text-white hover:bg-gray-700'
              }`}
            >
              {duration === 'ongoing' ? 'Ongoing' : duration.replace('-', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Submit */}
      <div className="pt-4">
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition-colors"
        >
          Submit Fitness Profile
        </button>
      </div>
    </form>
  )
}
