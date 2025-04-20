'use client'

import { ChevronLeft } from 'lucide-react'
import SignupForm from '../components/signup-form'

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 flex flex-col">
      {/* Header */}
      <header className="py-4 px-6 bg-gray-800 border-b border-gray-700">
        <div className="max-w-3xl mx-auto flex items-center">
          <button
            onClick={() => {
              console.log('heelo')
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
                  Create your account
                </h1>
                <p className="text-gray-400 mt-2">
                  Join GymRat+ to start tracking your fitness journey
                </p>
              </div>
              <SignupForm />
            </div>
          </div>

          <div className="text-center mt-6">
            <p className="text-gray-400">
              Already have an account?{' '}
              <button
                onClick={() => {
                  console.log('heelo')
                }}
                className="text-green-400 font-medium hover:text-green-300"
              >
                Log in
              </button>
            </p>
          </div>

          {/* Benefits */}
          <div className="mt-8">
            <h3 className="text-center font-medium text-gray-300 mb-4">
              Why join GymRat+?
            </h3>
            <div className="bg-gray-800 p-5 rounded-xl border border-gray-700 shadow-sm">
              <ul className="space-y-3">
                <li className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-green-900 flex items-center justify-center text-green-400 mr-3 flex-shrink-0">
                    <span className="text-lg">✓</span>
                  </div>
                  <span className="text-gray-300">
                    Track your personal records and progress
                  </span>
                </li>
                <li className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-green-900 flex items-center justify-center text-green-400 mr-3 flex-shrink-0">
                    <span className="text-lg">✓</span>
                  </div>
                  <span className="text-gray-300">
                    Access to premium workout plans and routines
                  </span>
                </li>
                <li className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-green-900 flex items-center justify-center text-green-400 mr-3 flex-shrink-0">
                    <span className="text-lg">✓</span>
                  </div>
                  <span className="text-gray-300">
                    Connect with a community of fitness enthusiasts
                  </span>
                </li>
                <li className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-green-900 flex items-center justify-center text-green-400 mr-3 flex-shrink-0">
                    <span className="text-lg">✓</span>
                  </div>
                  <span className="text-gray-300">
                    Detailed analytics and performance insights
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-4 px-6 text-center text-gray-500 text-sm">
        <p>© 2025 GymRat+. All rights reserved.</p>
      </footer>
    </div>
  )
}
