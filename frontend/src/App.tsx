"use client"

import { useState } from "react"
import LoginPage from "./pages/LoginPage"
import SignupPage from "./pages/SignupPage"
import HomePage from "./pages/HomePage"

export default function App() {
  const [currentPage, setCurrentPage] = useState("home")

  // Simple routing
  const navigateTo = (page) => {
    setCurrentPage(page)
  }

  // Render the current page
  const renderPage = () => {
    switch (currentPage) {
      case "login":
        return <LoginPage navigateTo={navigateTo} />
      case "signup":
        return <SignupPage navigateTo={navigateTo} />
      default:
        return <HomePage navigateTo={navigateTo} />
    }
  }

  return <div className="min-h-screen bg-white">{renderPage()}</div>
}
