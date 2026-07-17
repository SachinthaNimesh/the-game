import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useStore } from '../store/useStore'
import Button from '../components/Button'
import { Plus, X, ArrowRight } from 'lucide-react'

const PlayerSetup = () => {
  const { setScreen, setPlayers, players } = useStore()
  const [newPlayer, setNewPlayer] = useState('')
  const [localPlayers, setLocalPlayers] = useState(players.length ? players : [])

  const handleAdd = () => {
    if (newPlayer.trim() && localPlayers.length < 15) {
      setLocalPlayers([...localPlayers, { id: Date.now().toString(), name: newPlayer.trim(), score: 0, passes: 0 }])
      setNewPlayer('')
    }
  }

  const handleRemove = (id) => {
    setLocalPlayers(localPlayers.filter(p => p.id !== id))
  }

  const handleNext = () => {
    if (localPlayers.length >= 2) {
      setPlayers(localPlayers)
      setScreen('taskSelection')
    }
  }

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex flex-col flex-1"
    >
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Who's Playing?</h2>
        <p className="text-gray-400 text-sm">Add at least 2 players or teams.</p>
      </div>

      <div className="flex gap-2 mb-6">
        <input 
          type="text" 
          value={newPlayer}
          onChange={(e) => setNewPlayer(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleAdd()}
          placeholder="Player or Team Name"
          className="flex-1 bg-dark-card border border-dark-border rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary"
        />
        <Button onClick={handleAdd} variant="primary" className="!w-auto px-4">
          <Plus size={24} />
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto space-y-2 mb-4 pb-4">
        {localPlayers.map((player) => (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            key={player.id}
            className="flex items-center justify-between bg-dark-card p-4 rounded-xl border border-dark-border"
          >
            <span className="font-semibold">{player.name}</span>
            <button 
              onClick={() => handleRemove(player.id)}
              className="text-gray-400 hover:text-danger p-1"
            >
              <X size={20} />
            </button>
          </motion.div>
        ))}
        {localPlayers.length === 0 && (
          <div className="text-center text-gray-500 mt-10">No players added yet.</div>
        )}
      </div>

      <Button 
        onClick={handleNext} 
        variant="primary" 
        className={localPlayers.length < 2 ? 'opacity-50 pointer-events-none' : ''}
      >
        <span className="mr-2">Next Step</span>
        <ArrowRight size={20} />
      </Button>
    </motion.div>
  )
}

export default PlayerSetup
