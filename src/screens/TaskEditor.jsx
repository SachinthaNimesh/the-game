import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useStore } from '../store/useStore'
import Button from '../components/Button'
import { Plus, X, Play, Save } from 'lucide-react'

const TaskEditor = () => {
  const { 
    setScreen, 
    currentGameMode, 
    customGame01Tasks, 
    customGame02Tasks,
    setCustomTasks,
    setActiveTasks
  } = useStore()

  const initialTasks = currentGameMode === 'game01' ? customGame01Tasks : customGame02Tasks
  const [tasks, setTasks] = useState(initialTasks)
  const [newTask, setNewTask] = useState('')

  const handleAdd = () => {
    if (newTask.trim()) {
      setTasks([...tasks, newTask.trim()])
      setNewTask('')
    }
  }

  const handleRemove = (index) => {
    setTasks(tasks.filter((_, i) => i !== index))
  }

  const handleSaveAndPlay = () => {
    if (tasks.length > 0) {
      setCustomTasks(currentGameMode, tasks)
      setActiveTasks(tasks)
      setScreen(currentGameMode)
    }
  }

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex flex-col flex-1"
    >
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Custom Tasks</h2>
        <p className="text-gray-400 text-sm">Add tasks one by one. This list is saved locally for future sessions.</p>
      </div>

      <div className="flex flex-col gap-2 mb-6">
        <textarea 
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Enter a dare or charade scenario..."
          rows="3"
          className="w-full bg-dark-card border border-dark-border rounded-xl p-4 text-white focus:outline-none focus:border-accent resize-none"
        />
        <Button onClick={handleAdd} variant="dark" className="border border-dark-border">
          <Plus size={20} className="mr-2" /> Add Task
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto space-y-2 mb-4 pb-4">
        {tasks.map((task, index) => (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            key={index}
            className="flex items-start justify-between bg-dark-card p-4 rounded-xl border border-dark-border gap-4"
          >
            <span className="text-sm flex-1 leading-relaxed">{task}</span>
            <button 
              onClick={() => handleRemove(index)}
              className="text-gray-400 hover:text-danger mt-1 p-1 flex-shrink-0"
            >
              <X size={18} />
            </button>
          </motion.div>
        ))}
        {tasks.length === 0 && (
          <div className="text-center text-gray-500 mt-10">No custom tasks yet.</div>
        )}
      </div>

      <div className="flex gap-2">
        <Button 
          onClick={() => { setCustomTasks(currentGameMode, tasks) }} 
          variant="outline" 
          className="flex-1 py-3"
        >
          <Save size={20} className="mr-2"/> Save
        </Button>
        <Button 
          onClick={handleSaveAndPlay} 
          variant="accent" 
          className={`flex-[2] py-3 ${tasks.length === 0 ? 'opacity-50 pointer-events-none' : ''}`}
        >
          <Play size={20} className="mr-2 fill-current"/> Start Game
        </Button>
      </div>
    </motion.div>
  )
}

export default TaskEditor
