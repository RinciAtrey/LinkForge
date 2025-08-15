import './App.css'
import {Route, Routes } from 'react-router-dom'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import { Toaster } from 'react-hot-toast'
import LandingPage from './components/mainPages/LandingPage'
import AboutPage from './components/mainPages/AboutPage'
import RegisterPage from './components/mainPages/RegisterPage'
import DashboardPage from './components/mainPages/DashboardPage'
import LoginPage from './components/mainPages/LoginPage'
import ShortenUrlPage from './components/ShortenUrlPage'
import PrivateRoute from './PrivateRoute'
import ErrorPage from './components/ErrorPage'


const AppRouter = () => {


    return (
        <>
        <NavBar/>   
       <Toaster position='bottom-center'/>      
       <Routes>
        <Route path='/' element={<LandingPage/>}/>
        <Route path='/about' element= {<AboutPage/>}/>
       
          <Route path="/register" element={<PrivateRoute publicPage={true}><RegisterPage /></PrivateRoute>} />
          <Route path="/login" element={<PrivateRoute publicPage={true}><LoginPage /></PrivateRoute>} />
          
          <Route path="/dashboard" element={ <PrivateRoute publicPage={false}><DashboardPage /></PrivateRoute>} />
          <Route path="/error" element={ <ErrorPage message="Error"/>} />
          <Route path="*" element={ <ErrorPage message="We can't seem to find the page you are looking for"/>} />
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