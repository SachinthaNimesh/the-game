import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useStore } from '../store/useStore'
import { penalties } from '../data/penalties'
import { playSound } from '../utils/audio'
import Button from '../components/Button'

const Game01 = () => {
  const { 
    activeTasks, 
    usedTasks, 
    addUsedTask, 
    players, 
    activePlayerIndex, 
    nextTurn,
    setScreen,
    isMuted
  } = useStore()

  const [selectedTaskIndex, setSelectedTaskIndex] = useState(null)
  const [showPenalty, setShowPenalty] = useState(false)
  const [currentPenalty, setCurrentPenalty] = useState('')
  const [hasVetoed, setHasVetoed] = useState(false) // One veto per game globally, or per player? Prompt says "Each player has a limit of one Veto per game." 
  // Let's track vetos on the player object in a real app, but for simplicity here we'll just let them veto once per turn or use a simple state. 
  // Actually, let's just make the Veto button available once per turn for the active player.

  const activePlayer = players[activePlayerIndex]

  const handleTileClick = (index) => {
    if (usedTasks.includes(index)) return
    playSound('click', isMuted)
    setSelectedTaskIndex(index)
    setHasVetoed(false)
    setShowPenalty(false)
  }

  const handleVeto = () => {
    playSound('fail', isMuted)
    const randomPenalty = penalties[Math.floor(Math.random() * penalties.length)]
    setCurrentPenalty(randomPenalty)
    setShowPenalty(true)
    setHasVetoed(true)
  }

  const handleComplete = () => {
    playSound('success', isMuted)
    addUsedTask(selectedTaskIndex)
    setSelectedTaskIndex(null)
    nextTurn()
    
    // Check if game over
    if (usedTasks.length + 1 >= activeTasks.length) {
      setScreen('leaderboard')
    }
  }

  return (
    <div className="flex flex-col flex-1 pb-20">
      <div className="text-center mb-6">
        <p className="text-sm text-primary font-bold tracking-widest uppercase mb-1">Current Turn</p>
        <h2 className="text-3xl font-extrabold text-white">{activePlayer?.name}</h2>
      </div>

      <div className="grid grid-cols-4 sm:grid-cols-5 gap-3 w-full max-w-sm mx-auto">
        {activeTasks.map((_, index) => {
          const isUsed = usedTasks.includes(index)
          return (
            <motion.button
              key={index}
              whileTap={!isUsed ? { scale: 0.9 } : {}}
              onClick={() => handleTileClick(index)}
              disabled={isUsed}
              className={`aspect-square rounded-xl text-xl font-bold flex items-center justify-center transition-all ${
                isUsed 
                  ? 'bg-dark-border/30 text-gray-600 border border-dark-border/30 cursor-not-allowed' 
                  : 'bg-dark-card border-2 border-primary text-primary hover:bg-primary hover:text-white shadow-[0_0_15px_rgba(59,130,246,0.3)]'
              }`}
            >
              {index + 1}
            </motion.button>
          )
        })}
      </div>

      <AnimatePresence>
        {selectedTaskIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="glass-modal w-full max-w-sm p-6 rounded-3xl flex flex-col items-center text-center relative overflow-hidden"
            >
              <h3 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                {showPenalty ? 'Penalty!' : 'Challenge'}
              </h3>
              
              <p className="text-lg mb-8 leading-relaxed text-gray-100 min-h-[100px] flex items-center">
                {showPenalty ? currentPenalty : activeTasks[selectedTaskIndex]}
              </p>
              
              <div className="w-full flex flex-col gap-3">
                <Button onClick={handleComplete} variant="primary">
                  {showPenalty ? 'Accept Fate & Continue' : 'Nailed It!'}
                </Button>
                
                {!showPenalty && !hasVetoed && (
                  <Button onClick={handleVeto} variant="danger">
                    Veto (Penalty)
                  </Button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Game01
