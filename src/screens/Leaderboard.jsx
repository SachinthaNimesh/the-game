import React from 'react'
import { motion } from 'framer-motion'
import { useStore } from '../store/useStore'
import Button from '../components/Button'
import { Trophy, RotateCcw, Home } from 'lucide-react'

const Leaderboard = () => {
  const { players, currentGameMode, setScreen, resetSession } = useStore()

  // Sort players by score descending
  const sortedPlayers = [...players].sort((a, b) => b.score - a.score)
  const winner = sortedPlayers[0]

  const handlePlayAgain = () => {
    // Reset session keeps custom tasks but clears players/scores to go to setup
    resetSession()
    setScreen('home')
  }

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col flex-1"
    >
      <div className="text-center mb-8">
        <div className="inline-block p-4 bg-yellow-500/20 rounded-full mb-4">
          <Trophy size={48} className="text-yellow-500" />
        </div>
        <h2 className="text-3xl font-extrabold text-white mb-2">Game Over!</h2>
        {currentGameMode === 'game02' && winner && (
          <p className="text-xl text-yellow-500 font-bold">{winner.name} Wins!</p>
        )}
      </div>

      <div className="flex-1 space-y-3 mb-8">
        {sortedPlayers.map((player, index) => (
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            key={player.id}
            className={`flex items-center p-4 rounded-2xl border ${
              index === 0 && currentGameMode === 'game02'
                ? 'bg-yellow-500/10 border-yellow-500/30' 
                : 'bg-dark-card border-dark-border'
            }`}
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold mr-4 ${
              index === 0 && currentGameMode === 'game02' ? 'bg-yellow-500 text-black' : 'bg-dark-border text-gray-400'
            }`}>
              {index + 1}
            </div>
            
            <div className="flex-1">
              <h3 className="font-bold text-lg text-white">{player.name}</h3>
              {currentGameMode === 'game02' && player.passes > 0 && (
                <p className="text-xs text-danger">Passed {player.passes} times</p>
              )}
            </div>
            
            {currentGameMode === 'game02' && (
              <div className="text-2xl font-black text-white">
                {player.score}
              </div>
            )}
          </motion.div>
        ))}
      </div>

      <Button onClick={handlePlayAgain} variant="primary" className="py-4">
        <Home size={20} className="mr-2" /> Play Again
      </Button>
    </motion.div>
  )
}

export default Leaderboard
