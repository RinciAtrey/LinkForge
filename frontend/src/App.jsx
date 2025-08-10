import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import { Toaster } from 'react-hot-toast'
import LandingPage from './components/mainPages/LandingPage'
import AboutPage from './components/mainPages/AboutPage'
import RegisterPage from './components/mainPages/RegisterPage'
import DashboardPage from './components/mainPages/DashboardPage'
import LoginPage from './components/mainPages/LoginPage'






function App() {
  const [count, setCount] = useState(0)

  return (
    //parent component that stores all the routes
    <>
    <Router>  
    <NavBar/>   
    <Toaster position='bottom-center'/>      
       <Routes>
        <Route path='/' element={<LandingPage/>}/>
        <Route path='/about' element= {<AboutPage/>}/>
        <Route path='/register' element={<RegisterPage/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/dashboard' element={<DashboardPage/>}/>
       </Routes>
       <Footer/>
    </Router>
    </>
  )
}

export default App
