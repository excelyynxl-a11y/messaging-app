import React, { use, useEffect } from 'react'
import Navbar from './components/Navbar'
import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import SettingsPage from './pages/SettingsPage';
import ProfilePage from './pages/ProfilePage';
import { useAuthStore } from './store/useAuthStore';
import { Loader } from 'lucide-react';

const App = () => {

  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  console.log({ authUser });

  // if loading / checking / no user detected, display a loading spinner 
  if (isCheckingAuth && !authUser) {
    return (
      <div className='flex items-center justify-center h-screen'>
        <Loader className='size-10 animate-spin' />
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <Routes>
        {/* if user authenticated, go to HomePage, else go to LoginPage  */}
        <Route path='/' element={authUser ? <HomePage /> : <Navigate to='/login' />} /> 

        {/* if user is not authenticated, go to SignUpPage, else go to HomePage  */}
        <Route path='/signup' element={!authUser ? <SignUpPage /> : <Navigate to='/' />} /> 

        {/* if user authenticated, go to LoginPage, else go to HomePage  */}
        <Route path='/login' element={!authUser ? <LoginPage /> : <Navigate to='/' />} /> 
        
        <Route path='/settings' element={<SettingsPage />} /> 

        {/* if user authenticated, go to ProfilePage, else go to LoginPage  */}
        <Route path='/profile' element={authUser ? <ProfilePage /> : <Navigate to='/login' />} /> 
      </Routes>
    </div>
  )
}

export default App