import './App.css'
import {Navigate, Route, Routes } from 'react-router-dom'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import { Toaster } from 'react-hot-toast'
import LandingPage from './components/mainPages/LandingPage'
import AboutPage from './components/mainPages/AboutPage'
import RegisterPage from './components/mainPages/RegisterPage'
import DashboardPage from './components/mainPages/DashboardPage'
import LoginPage from './components/mainPages/LoginPage'
import ShortenUrlPage from './components/ShortenUrlPage'
import { useStoredContext } from './contextApi/ContextApi'


const AppRouter = () => {

     const { token } = useStoredContext();


    return (
        <>
        <NavBar/>   
       <Toaster position='bottom-center'/>      
       <Routes>
        <Route path='/' element={<LandingPage/>}/>
        <Route path='/about' element= {<AboutPage/>}/>
        {/* <Route path='/register' element={<RegisterPage/>}/> */}
        {/* <Route path='/login' element={<LoginPage/>}/> */}
        <Route
          path='/register'
          element={ !token ? <RegisterPage/> : <Navigate to="/dashboard" replace /> }
        />
         <Route
          path="/login"
          element={ !token ? <LoginPage /> : <Navigate to="/dashboard" replace /> }
        />
        {/* <Route path='/dashboard' element={<DashboardPage/>}/> */}
         <Route
          path="/dashboard"
          element={ token ? <DashboardPage /> : <Navigate to="/" replace /> }
        />
         <Route path='*' element={<Navigate to="/" replace />}/>
        
      
       </Routes>
       <Footer/>
      </>
    );
}


export default AppRouter;

export const SubDomainRouter = () => {
    return (
        <Routes>
          <Route path="/:url" element={<ShortenUrlPage />} />
        </Routes>
    )
}