import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import Reset from './components/Reset/Reset.jsx'
import { ScheduleProvider } from './context/ScheduleContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ScheduleProvider>
        <Reset />
      </ScheduleProvider>
    </BrowserRouter>
  </StrictMode>,
)
