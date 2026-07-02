import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import CreateNotePage from './pages/CreateNotePage'
import EditNotePage from './pages/EditNotePage'

function App() {
  return (
    <div className="min-h-screen bg-base-100 text-base-content selection:bg-accent selection:text-accent-content">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Routes>
          <Route path='/' element={<HomePage></HomePage>}></Route>
          <Route path='/createNote' element={<CreateNotePage></CreateNotePage>}></Route>
          <Route path='/editNote/:id' element={<EditNotePage></EditNotePage>}></Route>
        </Routes>
      </main>
    </div>
  )
}

export default App
