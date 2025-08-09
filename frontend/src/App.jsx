import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LandingPage from './components/LandingPage'
import AboutPage from './components/AboutPage'

function App() {
  const [count, setCount] = useState(0)

  return (
    //parent component that stores all the routes
    <>
    <BrowserRouter>           
       <Routes>
        <Route path='/' element={<LandingPage/>}/>
        <Route path='/about' element={<AboutPage/>}/>
       </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
