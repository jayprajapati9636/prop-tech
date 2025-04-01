import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { Router } from 'react-router-dom'
import Routerr from './user/routerr/Routerr.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <App /> */}
    <Routerr/>
  </StrictMode>,
)
