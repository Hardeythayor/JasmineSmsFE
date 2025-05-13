import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Button } from 'react-bootstrap'
import EmojiPicker from 'emoji-picker-react'
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './AppRoutes'

function App() {

  return (
    <>
      <Router>
          <AppRoutes />
      </Router>
    </>
  )
}

export default App
