'use client'

import { useState } from 'react'
import { Eye, EyeOff, Check, X } from 'lucide-react'

export default function SignupForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false,
  })

  const [emailError, setEmailError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    const updatedValue = type === 'checkbox' ? checked : value

    setFormData((prev) => ({
      ...prev,
      [name]: updatedValue,
    }))

    if (name === 'email') {
      const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
      setEmailError(isValidEmail ? '' : 'Please enter a valid email address.')
    }

    setSuccessMessage('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match")
      return
    }

    if (emailError) {
      alert('Please fix the email error before submitting.')
      return
    }

    console.log('Signup form submitted:', formData)
    setSuccessMessage('🎉 Account created successfully!')
  }

  // Password validation
  const hasMinLength = formData.password.length >= 8
  const hasUpperCase = /[A-Z]/.test(formData.password)
  const hasNumber = /[0-9]/.test(formData.password)
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(formData.password)
  const passwordsMatch =
    formData.password === formData.confirmPassword && formData.password !== ''

  const isFormValid =
    formData.username &&
    formData.email &&
    !emailError &&
    hasMinLength &&
    hasUpperCase &&
    hasNumber &&
    hasSpecialChar &&
    passwordsMatch &&
    formData.agreeTerms

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 bg-gray-900 text-gray-100 p-6 rounded-lg shadow-lg"
    >
      <div>
        <label
          htmlFor="username"
          className="block text-sm font-medium text-gray-300 mb-1"
        >
          Username
        </label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg border border-gray-700 bg-gray-800 text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Choose a username"
          required
        />
      </div>

      <div>
        <label
          htmlFor="signup-email"
          className="block text-sm font-medium text-gray-300 mb-1"
        >
          Email
        </label>
        <input
          type="email"
          id="signup-email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg border border-gray-700 bg-gray-800 text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Enter your email"
          required
        />
        {emailError && (
          <p className="text-red-500 text-sm mt-1">{emailError}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="signup-password"
          className="block text-sm font-medium text-gray-300 mb-1"
        >
          Password
        </label>
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            id="signup-password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-gray-700 bg-gray-800 text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Create a password"
            required
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        {/* Password strength indicators */}
        <div className="mt-2 space-y-1 text-sm">
          <div className="flex items-center">
            {hasMinLength ? (
              <Check size={16} className="text-green-500 mr-1" />
            ) : (
              <X size={16} className="text-gray-500 mr-1" />
            )}
            <span className={hasMinLength ? 'text-green-500' : 'text-gray-500'}>
              At least 8 characters
            </span>
          </div>
          <div className="flex items-center">
            {hasUpperCase ? (
              <Check size={16} className="text-green-500 mr-1" />
            ) : (
              <X size={16} className="text-gray-500 mr-1" />
            )}
            <span className={hasUpperCase ? 'text-green-500' : 'text-gray-500'}>
              At least one uppercase letter
            </span>
          </div>
          <div className="flex items-center">
            {hasNumber ? (
              <Check size={16} className="text-green-500 mr-1" />
            ) : (
              <X size={16} className="text-gray-500 mr-1" />
            )}
            <span className={hasNumber ? 'text-green-500' : 'text-gray-500'}>
              At least one number
            </span>
          </div>
          <div className="flex items-center">
            {hasSpecialChar ? (
              <Check size={16} className="text-green-500 mr-1" />
            ) : (
              <X size={16} className="text-gray-500 mr-1" />
            )}
            <span
              className={hasSpecialChar ? 'text-green-500' : 'text-gray-500'}
            >
              At least one special character
            </span>
          </div>
        </div>
      </div>

      <div>
        <label
          htmlFor="confirm-password"
          className="block text-sm font-medium text-gray-300 mb-1"
        >
          Confirm Password
        </label>
        <div className="relative">
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            id="confirm-password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-gray-700 bg-gray-800 text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Confirm your password"
            required
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        {formData.confirmPassword && (
          <div className="mt-1 flex items-center text-sm">
            {passwordsMatch ? (
              <Check size={16} className="text-green-500 mr-1" />
            ) : (
              <X size={16} className="text-red-500 mr-1" />
            )}
            <span
              className={passwordsMatch ? 'text-green-500' : 'text-red-500'}
            >
              {passwordsMatch ? 'Passwords match' : "Passwords don't match"}
            </span>
          </div>
        )}
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          id="agreeTerms"
          name="agreeTerms"
          checked={formData.agreeTerms}
          onChange={handleChange}
          className="h-4 w-4 text-green-500 border-gray-700 bg-gray-800 rounded focus:ring-green-500"
          required
        />
        <label
          htmlFor="agreeTerms"
          className="ml-2 block text-sm text-gray-300"
        >
          I agree to the{' '}
          <a href="#" className="text-green-500 hover:text-green-600">
            Terms of Service
          </a>{' '}
          and{' '}
          <a href="#" className="text-green-500 hover:text-green-600">
            Privacy Policy
          </a>
        </label>
      </div>

      <button
        type="submit"
        className={`w-full py-3 rounded-lg font-medium transition-colors ${
          isFormValid
            ? 'bg-green-500 hover:bg-green-600 text-white'
            : 'bg-gray-700 text-gray-400 cursor-not-allowed'
        }`}
        disabled={!isFormValid}
      >
        Create Account
      </button>

      {successMessage && (
        <p className="text-green-400 text-center font-medium">
          {successMessage}
        </p>
      )}

      <div className="relative flex items-center justify-center">
        <div className="border-t border-gray-700 w-full"></div>
        <div className="absolute bg-gray-900 px-4 text-sm text-gray-400">
          or sign up with
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {/* Add external sign-up providers here if needed */}
        <button
          type="button"
          className="flex items-center justify-center py-3 px-4 border border-gray-700 bg-gray-800 text-gray-100 rounded-lg hover:bg-gray-700"
        >
          Google
        </button>
        <button
          type="button"
          className="flex items-center justify-center py-3 px-4 border border-gray-700 bg-gray-800 text-gray-100 rounded-lg hover:bg-gray-700"
        >
          GitHub
        </button>
      </div>
    </form>
  )
}
