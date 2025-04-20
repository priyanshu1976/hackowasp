import { Link, useNavigate } from 'react-router-dom'
import { ChevronLeft, Check } from 'lucide-react'
import FitnessProfileForm from '../components/fitness-profile-form'

export default function ProfileSetupPage() {
  
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      {/* Header */}
      <header className="py-4 px-6 bg-gray-800 border-b border-gray-700">
        <div className="max-w-3xl mx-auto flex items-center">
          <Link
            to="/"
            className="flex items-center text-gray-300 hover:text-white"
          >
            <ChevronLeft size={20} />
            <span className="ml-1">Back</span>
          </Link>
          <div className="text-2xl font-bold text-green-500 mx-auto">
            GymRat+
          </div>
          <div className="w-20"></div> {/* Spacer for centering */}
        </div>
      </header>

      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-2xl">
          <div className="bg-gray-800 rounded-2xl shadow-sm border border-gray-700 overflow-hidden">
            <div className="p-6">
              <div className="mb-6 text-center">
                <h1 className="text-2xl font-bold text-white">
                  Create Your Fitness Profile
                </h1>
                <p className="text-gray-400 mt-2">
                  Help us personalize your workout plan by providing some
                  information about yourself
                </p>
              </div>

              <FitnessProfileForm />
            </div>
          </div>

          {/* Benefits - Hardcoded */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-800 p-4 rounded-xl border border-gray-700 shadow-sm flex items-start">
              <div className="w-10 h-10 rounded-full bg-green-900 flex items-center justify-center text-green-500 mr-3 flex-shrink-0">
                <Check size={18} />
              </div>
              <div>
                <h3 className="font-medium text-white">Personalized Plan</h3>
                <p className="text-sm text-gray-400">
                  Get a workout plan tailored to your specific needs
                </p>
              </div>
            </div>

            <div className="bg-gray-800 p-4 rounded-xl border border-gray-700 shadow-sm flex items-start">
              <div className="w-10 h-10 rounded-full bg-green-900 flex items-center justify-center text-green-500 mr-3 flex-shrink-0">
                <Check size={18} />
              </div>
              <div>
                <h3 className="font-medium text-white">Track Progress</h3>
                <p className="text-sm text-gray-400">
                  Monitor your improvements with detailed metrics
                </p>
              </div>
            </div>

            <div className="bg-gray-800 p-4 rounded-xl border border-gray-700 shadow-sm flex items-start">
              <div className="w-10 h-10 rounded-full bg-green-900 flex items-center justify-center text-green-500 mr-3 flex-shrink-0">
                <Check size={18} />
              </div>
              <div>
                <h3 className="font-medium text-white">Expert Guidance</h3>
                <p className="text-sm text-gray-400">
                  Receive tips and adjustments based on your progress
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-4 px-6 text-center text-gray-400 text-sm">
        <p>© 2025 GymRat+. All rights reserved.</p>
      </footer>
    </div>
  )
}
