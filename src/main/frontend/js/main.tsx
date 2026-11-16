import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../css/app.css'
import './lib/fontawesome'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
