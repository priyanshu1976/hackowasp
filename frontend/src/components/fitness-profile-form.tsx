'use client'

import type React from 'react'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

interface FormData {
  age: string
  weight: string
  weightUnit: 'kg' | 'lb'
  heightFeet: string
  heightInches: string
  heightCm: string
  heightUnit: 'ft/in' | 'cm'
  gender: 'male' | 'female' | 'other' | ''
  activityLevel:
    | ''
    | 'sedentary'
    | 'light'
    | 'moderate'
    | 'active'
    | 'very-active'
  goal:
    | ''
    | 'lose-weight'
    | 'maintain'
    | 'build-muscle'
    | 'improve-endurance'
    | 'improve-strength'
  duration: '' | '4-weeks' | '8-weeks' | '12-weeks' | '16-weeks' | 'ongoing'
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleRadioChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Fitness profile submitted:', formData)
    // Handle form submission logic here
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 text-white">
      {/* Age */}
      <div>
        <label
          htmlFor="age"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
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
          className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          placeholder="Enter your age"
          required
        />
      </div>

      {/* Weight */}
      <div>
        <label
          htmlFor="weight"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
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
            className="flex-1 px-4 py-3 rounded-l-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="Enter your weight"
            required
          />
          <div className="relative">
            <select
              name="weightUnit"
              value={formData.weightUnit}
              onChange={handleChange}
              className="h-full px-4 py-3 rounded-r-lg border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none pr-8"
            >
              <option value="kg">kg</option>
              <option value="lb">lb</option>
            </select>
            <ChevronDown
              size={16}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none"
            />
          </div>
        </div>
      </div>

      {/* Height */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Height
        </label>
        <div className="flex items-center mb-2">
          <div className="flex items-center mr-4">
            <input
              type="radio"
              id="height-cm"
              name="heightUnit"
              value="cm"
              checked={formData.heightUnit === 'cm'}
              onChange={() => handleRadioChange('heightUnit', 'cm')}
              className="h-4 w-4 text-green-500 border-gray-300 focus:ring-green-500"
            />
            <label htmlFor="height-cm" className="ml-2 text-sm text-gray-700">
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
              className="h-4 w-4 text-green-500 border-gray-300 focus:ring-green-500"
            />
            <label htmlFor="height-ft" className="ml-2 text-sm text-gray-700">
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
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="Enter your height in cm"
            required
          />
        ) : (
          <div className="flex gap-2">
            <div className="flex-1">
              <input
                type="number"
                id="heightFeet"
                name="heightFeet"
                min="3"
                max="8"
                value={formData.heightFeet}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Feet"
                required
              />
            </div>
            <div className="flex-1">
              <input
                type="number"
                id="heightInches"
                name="heightInches"
                min="0"
                max="11"
                value={formData.heightInches}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Inches"
                required
              />
            </div>
          </div>
        )}
      </div>

      {/* Gender */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Gender
        </label>
        <div className="grid grid-cols-3 gap-3">
          <button
            type="button"
            onClick={() => handleRadioChange('gender', 'male')}
            className={`px-4 py-3 rounded-lg border ${
              formData.gender === 'male'
                ? 'border-green-500 bg-green-50 text-green-700'
                : 'border-gray-200 hover:bg-gray-50'
            }`}
          >
            Male
          </button>
          <button
            type="button"
            onClick={() => handleRadioChange('gender', 'female')}
            className={`px-4 py-3 rounded-lg border ${
              formData.gender === 'female'
                ? 'border-green-500 bg-green-50 text-green-700'
                : 'border-gray-200 hover:bg-gray-50'
            }`}
          >
            Female
          </button>
          <button
            type="button"
            onClick={() => handleRadioChange('gender', 'other')}
            className={`px-4 py-3 rounded-lg border ${
              formData.gender === 'other'
                ? 'border-green-500 bg-green-50 text-green-700'
                : 'border-gray-200 hover:bg-gray-50'
            }`}
          >
            Other
          </button>
        </div>
      </div>

      {/* Activity Level */}
      <div>
        <label
          htmlFor="activityLevel"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Activity Level
        </label>
        <div className="relative">
          <select
            id="activityLevel"
            name="activityLevel"
            value={formData.activityLevel}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none"
            required
          >
            <option value="" disabled>
              Select your activity level
            </option>
            <option value="sedentary">Sedentary (little or no exercise)</option>
            <option value="light">Light (exercise 1-3 days/week)</option>
            <option value="moderate">Moderate (exercise 3-5 days/week)</option>
            <option value="active">Active (exercise 6-7 days/week)</option>
            <option value="very-active">
              Very Active (intense exercise daily)
            </option>
          </select>
          <ChevronDown
            size={16}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none"
          />
        </div>
      </div>

      {/* Fitness Goal */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Fitness Goal
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => handleRadioChange('goal', 'lose-weight')}
            className={`px-4 py-3 rounded-lg border ${
              formData.goal === 'lose-weight'
                ? 'border-green-500 bg-green-50 text-green-700'
                : 'border-gray-200 hover:bg-gray-50'
            }`}
          >
            Lose Weight
          </button>
          <button
            type="button"
            onClick={() => handleRadioChange('goal', 'maintain')}
            className={`px-4 py-3 rounded-lg border ${
              formData.goal === 'maintain'
                ? 'border-green-500 bg-green-50 text-green-700'
                : 'border-gray-200 hover:bg-gray-50'
            }`}
          >
            Maintain Weight
          </button>
          <button
            type="button"
            onClick={() => handleRadioChange('goal', 'build-muscle')}
            className={`px-4 py-3 rounded-lg border ${
              formData.goal === 'build-muscle'
                ? 'border-green-500 bg-green-50 text-green-700'
                : 'border-gray-200 hover:bg-gray-50'
            }`}
          >
            Build Muscle
          </button>
          <button
            type="button"
            onClick={() => handleRadioChange('goal', 'improve-endurance')}
            className={`px-4 py-3 rounded-lg border ${
              formData.goal === 'improve-endurance'
                ? 'border-green-500 bg-green-50 text-green-700'
                : 'border-gray-200 hover:bg-gray-50'
            }`}
          >
            Improve Endurance
          </button>
          <button
            type="button"
            onClick={() => handleRadioChange('goal', 'improve-strength')}
            className={`px-4 py-3 rounded-lg border ${
              formData.goal === 'improve-strength'
                ? 'border-green-500 bg-green-50 text-green-700'
                : 'border-gray-200 hover:bg-gray-50'
            }`}
          >
            Improve Strength
          </button>
        </div>
      </div>

      {/* Program Duration */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Program Duration
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <button
            type="button"
            onClick={() => handleRadioChange('duration', '4-weeks')}
            className={`px-4 py-3 rounded-lg border ${
              formData.duration === '4-weeks'
                ? 'border-green-500 bg-green-50 text-green-700'
                : 'border-gray-200 hover:bg-gray-50'
            }`}
          >
            4 Weeks
          </button>
          <button
            type="button"
            onClick={() => handleRadioChange('duration', '8-weeks')}
            className={`px-4 py-3 rounded-lg border ${
              formData.duration === '8-weeks'
                ? 'border-green-500 bg-green-50 text-green-700'
                : 'border-gray-200 hover:bg-gray-50'
            }`}
          >
            8 Weeks
          </button>
          <button
            type="button"
            onClick={() => handleRadioChange('duration', '12-weeks')}
            className={`px-4 py-3 rounded-lg border ${
              formData.duration === '12-weeks'
                ? 'border-green-500 bg-green-50 text-green-700'
                : 'border-gray-200 hover:bg-gray-50'
            }`}
          >
            12 Weeks
          </button>
          <button
            type="button"
            onClick={() => handleRadioChange('duration', '16-weeks')}
            className={`px-4 py-3 rounded-lg border ${
              formData.duration === '16-weeks'
                ? 'border-green-500 bg-green-50 text-green-700'
                : 'border-gray-200 hover:bg-gray-50'
            }`}
          >
            16 Weeks
          </button>
          <button
            type="button"
            onClick={() => handleRadioChange('duration', 'ongoing')}
            className={`px-4 py-3 rounded-lg border ${
              formData.duration === 'ongoing'
                ? 'border-green-500 bg-green-50 text-green-700'
                : 'border-gray-200 hover:bg-gray-50'
            }`}
          >
            Ongoing
          </button>
        </div>
      </div>

      {/* Submit Button */}
      <div className="pt-4">
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-3 rounded-lg font-medium hover:bg-green-600 transition-colors"
        >
          Create My Fitness Profile
        </button>
      </div>
    </form>
  )
}
