import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import Appnavbar from './components/Appnavbar/Appnavbar.jsx'
import { ScheduleProvider } from './context/ScheduleContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ScheduleProvider>
        <Appnavbar />
      </ScheduleProvider>
    </BrowserRouter>
  </StrictMode>,
)
