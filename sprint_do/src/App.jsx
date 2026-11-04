import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import Dashboard from './pages/Dashboard'
import Navbar from './components/Navbar'

function App() {
  const userName = "John Doe"

  return (
    <div>
      <Navbar />
      <Dashboard />
    </div>

  )
}

export default App
