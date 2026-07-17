import { useStore } from './store/useStore'
import Header from './components/Header'
import Home from './screens/Home'
import PlayerSetup from './screens/PlayerSetup'
import TaskSelection from './screens/TaskSelection'
import TaskEditor from './screens/TaskEditor'
import Game01 from './screens/Game01'
import Game02 from './screens/Game02'
import Leaderboard from './screens/Leaderboard'

function App() {
  const { currentScreen } = useStore()

  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return <Home />
      case 'playerSetup':
        return <PlayerSetup />
      case 'taskSelection':
        return <TaskSelection />
      case 'taskEditor':
        return <TaskEditor />
      case 'game01':
        return <Game01 />
      case 'game02':
        return <Game02 />
      case 'leaderboard':
        return <Leaderboard />
      default:
        return <Home />
    }
  }

  return (
    <div className="min-h-screen w-full flex flex-col items-center">
      <Header />
      <main className="flex-1 w-full max-w-md p-4 flex flex-col relative mt-16">
        {renderScreen()}
      </main>
    </div>
  )
}

export default App
