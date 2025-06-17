import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Button } from 'react-bootstrap'
import EmojiPicker from 'emoji-picker-react'
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './AppRoutes'
import { Slide, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import useAuth from './hooks/useAuthContext'

function App() {
  const {userData} = useAuth()

  return (
    <>
      {userData.authIsReady &&  (
        <Router>
            <AppRoutes />
        </Router>
      )}

      <ToastContainer 
        position="top-center"
        hideProgressBar
        pauseOnFocusLoss={false}
        transition={Slide}
        autoClose={3000}
      />
    </>
  )
}

export default App
