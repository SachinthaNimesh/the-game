import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useStore } from '../store/useStore'
import { playSound } from '../utils/audio'
import Button from '../components/Button'
import { Check, X, SkipForward } from 'lucide-react'

const Game02 = () => {
  const { 
    activeTasks, 
    usedTasks, 
    addUsedTask, 
    players, 
    activePlayerIndex, 
    nextTurn,
    updatePlayerScore,
    addPlayerPass,
    setScreen,
    isMuted
  } = useStore()

  const [selectedTaskIndex, setSelectedTaskIndex] = useState(null)
  const activePlayer = players[activePlayerIndex]

  const handleTileClick = (index) => {
    if (usedTasks.includes(index)) return
    playSound('click', isMuted)
    setSelectedTaskIndex(index)
  }

  const handleTurnEnd = (result) => {
    if (result === 'success') {
      playSound('success', isMuted)
      updatePlayerScore(activePlayer.id, 1)
    } else if (result === 'fail') {
      playSound('fail', isMuted)
    } else if (result === 'pass') {
      playSound('fail', isMuted)
      addPlayerPass(activePlayer.id)
    }
    
    addUsedTask(selectedTaskIndex)
    setSelectedTaskIndex(null)
    nextTurn()

    if (usedTasks.length + 1 >= activeTasks.length) {
      setScreen('leaderboard')
    }
  }

  return (
    <div className="flex flex-col flex-1 pb-20">
      <div className="text-center mb-6">
        <p className="text-sm text-accent font-bold tracking-widest uppercase mb-1">Up Next to Act</p>
        <h2 className="text-3xl font-extrabold text-white">{activePlayer?.name}</h2>
        <p className="text-sm text-gray-400 mt-2">Score: {activePlayer?.score}</p>
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
                  : 'bg-dark-card border-2 border-accent text-accent hover:bg-accent hover:text-white shadow-[0_0_15px_rgba(16,185,129,0.3)]'
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
              className="glass-modal w-full max-w-sm p-6 rounded-3xl flex flex-col items-center text-center"
            >
              <h3 className="text-xl font-bold mb-6 text-accent uppercase tracking-widest">
                Act It Out
              </h3>
              
              <p className="text-2xl font-semibold mb-10 leading-snug text-white">
                {activeTasks[selectedTaskIndex]}
              </p>
              
              <div className="w-full flex gap-3 mb-3">
                <Button onClick={() => handleTurnEnd('fail')} variant="danger" className="flex-1 !py-3">
                  <X size={24} className="mx-auto" />
                  <span className="text-xs mt-1 block">Fail (0)</span>
                </Button>
                <Button onClick={() => handleTurnEnd('success')} variant="accent" className="flex-1 !py-3">
                  <Check size={24} className="mx-auto" />
                  <span className="text-xs mt-1 block">Success (+1)</span>
                </Button>
              </div>
              <Button onClick={() => handleTurnEnd('pass')} variant="dark" className="w-full !py-3 border border-dark-border">
                <div className="flex items-center justify-center">
                  <SkipForward size={18} className="mr-2" />
                  <span>Pass / Give Up</span>
                </div>
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Game02
