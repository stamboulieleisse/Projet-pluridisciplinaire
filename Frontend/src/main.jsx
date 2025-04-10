import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import PendingRequests from './APP/PendingRequests/PendingRequests.jsx'
import { ScheduleProvider } from './context/ScheduleContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ScheduleProvider>
        <PendingRequests/>
      </ScheduleProvider>
    </BrowserRouter>
  </StrictMode>,
)
