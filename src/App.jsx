import { useState } from 'react'
import { useEffect } from 'react'
import Header from './components/Header'
import Profile from './components/Profile'
import About from './components/About'
import Projects from './components/Projects'
import Footer from './components/Footer'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {

  return (
    <>
      <Header />
      <Profile />
      <About />
      <Projects />
      <Footer />
    </>
  )
}

export default App
