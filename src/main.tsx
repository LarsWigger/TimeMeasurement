import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import dayjs from 'dayjs'
import utc from "dayjs/plugin/utc"

dayjs.extend(utc)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
