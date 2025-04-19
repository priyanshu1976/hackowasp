"use client"

import { ArrowRight } from "lucide-react"

export default function HomePage({ navigateTo }) {
    return (
        <main className="min-h-screen bg-gray-900">
            <div className="max-w-6xl mx-auto px-4 py-12 md:py-24">
                <div className="flex flex-col items-center text-center mb-12">
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                        Track Your Fitness Journey with <span className="text-green-400">GymRat+</span>
                    </h1>
                    <p className="text-xl text-gray-400 max-w-3xl mb-8">
                        The ultimate workout tracker for fitness enthusiasts. Monitor your progress, set goals, and achieve results.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <button
                            onClick={() => navigateTo("login")}
                            className="px-8 py-3 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition-colors"
                        >
                            Log In
                        </button>
                        <button
                            onClick={() => navigateTo("signup")}
                            className="px-8 py-3 bg-gray-800 border border-gray-700 text-gray-300 rounded-lg font-medium hover:bg-gray-700 transition-colors"
                        >
                            Sign Up
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-sm">
                        <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white mb-4">
                            <span className="text-2xl">📊</span>
                        </div>
                        <h3 className="text-xl font-semibold text-white mb-2">Track Progress</h3>
                        <p className="text-gray-400">
                            Monitor your personal records and see your improvement over time with detailed analytics.
                        </p>
                    </div>
                    <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-sm">
                        <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white mb-4">
                            <span className="text-2xl">🏋️‍♂️</span>
                        </div>
                        <h3 className="text-xl font-semibold text-white mb-2">Workout Plans</h3>
                        <p className="text-gray-400">
                            Access personalized workout routines designed to help you reach your fitness goals faster.
                        </p>
                    </div>
                    <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-sm">
                        <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white mb-4">
                            <span className="text-2xl">👥</span>
                        </div>
                        <h3 className="text-xl font-semibold text-white mb-2">Community</h3>
                        <p className="text-gray-400">
                            Connect with like-minded fitness enthusiasts, share tips, and stay motivated together.
                        </p>
                    </div>
                </div>

                <div className="text-center">
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">Ready to start your fitness journey?</h2>
                    <button
                        onClick={() => navigateTo("signup")}
                        className="inline-flex items-center px-6 py-3 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition-colors"
                    >
                        Get Started <ArrowRight className="ml-2 h-5 w-5" />
                    </button>
                </div>
            </div>
        </main>
    )
}
