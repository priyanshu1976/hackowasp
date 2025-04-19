"use client"

import { useState } from "react"
import { Eye, EyeOff, Check, X } from "lucide-react"

export default function SignupForm() {
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        agreeTerms: false,
    })

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords don't match")
            return
        }
        console.log("Signup form submitted:", formData)
        // Handle signup logic here
    }

    // Password validation
    const hasMinLength = formData.password.length >= 8
    const hasUpperCase = /[A-Z]/.test(formData.password)
    const hasNumber = /[0-9]/.test(formData.password)
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(formData.password)
    const passwordsMatch = formData.password === formData.confirmPassword && formData.password !== ""

    return (
        <form onSubmit={handleSubmit} className="space-y-5 bg-gray-900 text-gray-100 p-6 rounded-lg shadow-lg">
            <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-1">
                    Username
                </label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-700 bg-gray-800 text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Choose a username"
                    required
                />
            </div>

            <div>
                <label htmlFor="signup-email" className="block text-sm font-medium text-gray-300 mb-1">
                    Email
                </label>
                <input
                    type="email"
                    id="signup-email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-700 bg-gray-800 text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Enter your email"
                    required
                />
            </div>

            <div>
                <label htmlFor="signup-password" className="block text-sm font-medium text-gray-300 mb-1">
                    Password
                </label>
                <div className="relative">
                    <input
                        type={showPassword ? "text" : "password"}
                        id="signup-password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-700 bg-gray-800 text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
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
                <div className="mt-2 space-y-1">
                    <div className="flex items-center text-sm">
                        {hasMinLength ? (
                            <Check size={16} className="text-green-500 mr-1" />
                        ) : (
                            <X size={16} className="text-gray-500 mr-1" />
                        )}
                        <span className={hasMinLength ? "text-green-500" : "text-gray-500"}>At least 8 characters</span>
                    </div>
                    <div className="flex items-center text-sm">
                        {hasUpperCase ? (
                            <Check size={16} className="text-green-500 mr-1" />
                        ) : (
                            <X size={16} className="text-gray-500 mr-1" />
                        )}
                        <span className={hasUpperCase ? "text-green-500" : "text-gray-500"}>At least one uppercase letter</span>
                    </div>
                    <div className="flex items-center text-sm">
                        {hasNumber ? (
                            <Check size={16} className="text-green-500 mr-1" />
                        ) : (
                            <X size={16} className="text-gray-500 mr-1" />
                        )}
                        <span className={hasNumber ? "text-green-500" : "text-gray-500"}>At least one number</span>
                    </div>
                    <div className="flex items-center text-sm">
                        {hasSpecialChar ? (
                            <Check size={16} className="text-green-500 mr-1" />
                        ) : (
                            <X size={16} className="text-gray-500 mr-1" />
                        )}
                        <span className={hasSpecialChar ? "text-green-500" : "text-gray-500"}>At least one special character</span>
                    </div>
                </div>
            </div>

            <div>
                <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-300 mb-1">
                    Confirm Password
                </label>
                <div className="relative">
                    <input
                        type={showConfirmPassword ? "text" : "password"}
                        id="confirm-password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-700 bg-gray-800 text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
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
                        <span className={passwordsMatch ? "text-green-500" : "text-red-500"}>
                            {passwordsMatch ? "Passwords match" : "Passwords don't match"}
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
                <label htmlFor="agreeTerms" className="ml-2 block text-sm text-gray-300">
                    I agree to the{" "}
                    <a href="#" className="text-green-500 hover:text-green-600">
                        Terms of Service
                    </a>{" "}
                    and{" "}
                    <a href="#" className="text-green-500 hover:text-green-600">
                        Privacy Policy
                    </a>
                </label>
            </div>

            <button
                type="submit"
                className="w-full bg-green-500 text-white py-3 rounded-lg font-medium hover:bg-green-600 transition-colors"
            >
                Create Account
            </button>

            <div className="relative flex items-center justify-center">
                <div className="border-t border-gray-700 w-full"></div>
                <div className="absolute bg-gray-900 px-4 text-sm text-gray-400">or sign up with</div>
            </div>

            <div className="grid grid-cols-2 gap-3">
                <button
                    type="button"
                    className="flex items-center justify-center py-3 px-4 border border-gray-700 bg-gray-800 text-gray-100 rounded-lg hover:bg-gray-700"
                >
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                        <path
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                            fill="#4285F4"
                        />
                        <path
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                            fill="#34A853"
                        />
                        <path
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                            fill="#FBBC05"
                        />
                        <path
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                            fill="#EA4335"
                        />
                    </svg>
                    Google
                </button>
                <button
                    type="button"
                    className="flex items-center justify-center py-3 px-4 border border-gray-700 bg-gray-800 text-gray-100 rounded-lg hover:bg-gray-700"
                >
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="#1877F2">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                    Facebook
                </button>
            </div>
        </form>
    )
}
