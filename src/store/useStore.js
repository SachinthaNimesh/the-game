import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { game01Presets, game02Presets } from '../data/presets'

export const useStore = create(
  persist(
    (set) => ({
      // App state
      currentScreen: 'home',
      setScreen: (screen) => set({ currentScreen: screen }),
      
      // Global settings
      isMuted: false,
      toggleMute: () => set((state) => ({ isMuted: !state.isMuted })),

      // Game config
      currentGameMode: null, // 'game01' or 'game02'
      setGameMode: (mode) => set({ currentGameMode: mode }),
      
      players: [], // { id, name, score, passes }
      setPlayers: (players) => set({ players }),
      updatePlayerScore: (id, delta) => set((state) => ({
        players: state.players.map(p => p.id === id ? { ...p, score: p.score + delta } : p)
      })),
      addPlayerPass: (id) => set((state) => ({
        players: state.players.map(p => p.id === id ? { ...p, passes: (p.passes || 0) + 1 } : p)
      })),

      // Task configuration
      taskSource: 'preset', // 'preset' or 'custom'
      setTaskSource: (source) => set({ taskSource: source }),
      
      customGame01Tasks: [],
      customGame02Tasks: [],
      setCustomTasks: (mode, tasks) => set((state) => ({
        ...(mode === 'game01' ? { customGame01Tasks: tasks } : { customGame02Tasks: tasks })
      })),

      // Active game state
      activeTasks: [], // tasks loaded for the current game session
      setActiveTasks: (tasks) => set({ activeTasks: tasks }),
      
      usedTasks: [], // array of indices
      addUsedTask: (index) => set((state) => ({ usedTasks: [...state.usedTasks, index] })),
      resetUsedTasks: () => set({ usedTasks: [] }),
      
      activePlayerIndex: 0,
      nextTurn: () => set((state) => ({
        activePlayerIndex: (state.activePlayerIndex + 1) % Math.max(1, state.players.length)
      })),
      
      // Utility to reset game session data (not custom tasks)
      resetSession: () => set({
        players: [],
        activeTasks: [],
        usedTasks: [],
        activePlayerIndex: 0,
        currentGameMode: null
      }),
    }),
    {
      name: 'party-game-storage', // unique name for localStorage
      partialize: (state) => ({
        // only persist custom tasks and settings
        customGame01Tasks: state.customGame01Tasks,
        customGame02Tasks: state.customGame02Tasks,
        isMuted: state.isMuted,
      }),
    }
  )
)
