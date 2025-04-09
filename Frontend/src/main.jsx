import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import Adminnav from './components/Adminnav/Adminnav.jsx'
import { ScheduleProvider } from './context/ScheduleContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ScheduleProvider>
        <Adminnav />
      </ScheduleProvider>
    </BrowserRouter>
  </StrictMode>,
)
