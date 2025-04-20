'use client'

import { useState } from 'react'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import HomePage from './pages/HomePage'
import { Routes, Route } from 'react-router-dom'
import UserDetails from './pages/userDetails'
import Avatar from './components/gymrat-plus-interface'
import Dashboard from './pages/dashboard'
import Game from './pages/dino_game'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/form" element={<UserDetails />} />
      <Route path="/avatar" element={<Avatar />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/game" element={<Game />} />
    </Routes>
  )
}
