import React from 'react'
import { motion } from 'framer-motion'
import { useStore } from '../store/useStore'
import Button from '../components/Button'

const Home = () => {
  const { setScreen, setGameMode, resetSession } = useStore()

  const handleStart = (mode) => {
    resetSession()
    setGameMode(mode)
    setScreen('playerSetup')
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col flex-1 justify-center items-center gap-8"
    >
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-extrabold tracking-tight text-white">
          Ready for <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
            Mayhem?
          </span>
        </h2>
        <p className="text-gray-400">Sri Lankan Party Edition</p>
      </div>

      <div className="w-full space-y-4 mt-8">
        <Button onClick={() => handleStart('game01')} variant="primary" className="py-6">
          <div className="flex flex-col items-center">
            <span className="text-xl font-bold">Random Task Roulette</span>
            <span className="text-sm font-normal text-blue-200 mt-1">Dares & Challenges</span>
          </div>
        </Button>

        <Button onClick={() => handleStart('game02')} variant="accent" className="py-6">
          <div className="flex flex-col items-center">
            <span className="text-xl font-bold">Act It Out</span>
            <span className="text-sm font-normal text-emerald-200 mt-1">Local Charades</span>
          </div>
        </Button>
      </div>
    </motion.div>
  )
}

export default Home
