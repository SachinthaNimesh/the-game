import React from 'react'
import { motion } from 'framer-motion'
import { Volume2, VolumeX, Home } from 'lucide-react'
import { useStore } from '../store/useStore'
import { playSound } from '../utils/audio'

const Header = () => {
  const { isMuted, toggleMute, setScreen, currentScreen } = useStore()

  const handleHome = () => {
    playSound('click', isMuted)
    setScreen('home')
  }

  const handleMute = () => {
    toggleMute()
    if (isMuted) playSound('click', false) // play click when unmuting
  }

  return (
    <header className="fixed top-0 left-0 right-0 h-16 glass z-50 flex items-center justify-between px-4">
      {currentScreen !== 'home' ? (
        <motion.button 
          whileTap={{ scale: 0.9 }}
          onClick={handleHome}
          className="p-2 text-gray-300 hover:text-white"
        >
          <Home size={24} />
        </motion.button>
      ) : (
        <div className="w-10"></div> // Spacer
      )}
      
      <h1 className="text-xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
        THE GAME
      </h1>
      
      <motion.button 
        whileTap={{ scale: 0.9 }}
        onClick={handleMute}
        className={`p-2 ${isMuted ? 'text-danger' : 'text-accent-hover'}`}
      >
        {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
      </motion.button>
    </header>
  )
}

export default Header
