import React from 'react'
import { motion } from 'framer-motion'
import { useStore } from '../store/useStore'
import Button from '../components/Button'
import { List, Edit3 } from 'lucide-react'
import { game01Presets, game02Presets } from '../data/presets'

const TaskSelection = () => {
  const { 
    setScreen, 
    setTaskSource, 
    currentGameMode, 
    setActiveTasks,
    customGame01Tasks,
    customGame02Tasks
  } = useStore()

  const handleSelect = (source) => {
    setTaskSource(source)
    if (source === 'preset') {
      setActiveTasks(currentGameMode === 'game01' ? game01Presets : game02Presets)
      setScreen(currentGameMode)
    } else {
      // For custom, they need to go to the editor first to confirm/edit their list
      setScreen('taskEditor')
    }
  }

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex flex-col flex-1 justify-center gap-6"
    >
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">Choose Task Pool</h2>
        <p className="text-gray-400 text-sm">Play with curated Sri Lankan classics or create your own inside jokes.</p>
      </div>

      <Button onClick={() => handleSelect('preset')} variant="primary" className="py-8 relative overflow-hidden">
        <div className="absolute -right-4 -bottom-4 opacity-10">
          <List size={120} />
        </div>
        <div className="flex flex-col items-center relative z-10">
          <span className="text-xl font-bold mb-1">Preset List</span>
          <span className="text-sm text-blue-200 font-normal">15 Curated Challenges</span>
        </div>
      </Button>

      <Button onClick={() => handleSelect('custom')} variant="dark" className="py-8 relative overflow-hidden border border-dark-border">
        <div className="absolute -right-4 -bottom-4 opacity-10">
          <Edit3 size={120} />
        </div>
        <div className="flex flex-col items-center relative z-10">
          <span className="text-xl font-bold mb-1">Custom List</span>
          <span className="text-sm text-gray-400 font-normal">
            {currentGameMode === 'game01' ? customGame01Tasks.length : customGame02Tasks.length} Saved Tasks
          </span>
        </div>
      </Button>
    </motion.div>
  )
}

export default TaskSelection
