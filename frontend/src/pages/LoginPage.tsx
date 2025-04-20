'use client'

import { ChevronLeft } from 'lucide-react'
import LoginForm from '../components/login-form'
import { useNavigate } from 'react-router-dom'

export default function LoginPage() {
  const nav = useNavigate();
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col">
      {/* Header */}
      <header className="py-4 px-6 bg-gray-800 border-b border-gray-700">
        <div className="max-w-3xl mx-auto flex items-center">
          <button
            onClick={() => {
              console.log('cl')
            }}
            className="flex items-center text-gray-400 hover:text-gray-200"
          >
            <ChevronLeft size={20} />
            <span className="ml-1">Back</span>
          </button>
          <div className="text-2xl font-bold text-green-400 mx-auto">
            GymRat+
          </div>
          <div className="w-20"></div> {/* Spacer for centering */}
        </div>
      </header>

      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="bg-gray-800 rounded-2xl shadow-sm border border-gray-700 overflow-hidden">
            <div className="p-6">
              <div className="mb-6 text-center">
                <h1 className="text-2xl font-bold text-gray-100">
                  Welcome back
                </h1>
                <p className="text-gray-400 mt-2">
                  Log in to your GymRat+ account
                </p>
              </div>
              <LoginForm />
            </div>
          </div>

          <div className="text-center mt-6">
            <p className="text-gray-400">
              Don't have an account?{' '}
              <button
                onClick={() => {
                  return nav('/signup')
                }}
                className="text-green-400 font-medium hover:text-green-300"
              >
                Sign up
              </button>
            </p>
          </div>

          {/* Features */}
        </div>
      </div>

      {/* Footer */}
      <footer className="py-4 px-6 text-center text-gray-500 text-sm">
        <p>© 2025 GymRat+. All rights reserved.</p>
      </footer>
    </div>
  )
}
