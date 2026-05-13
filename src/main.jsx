import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { LessonProvider } from './context/LessonContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* 2. Wrap the App component here: */}
    <LessonProvider>
      <App />
    </LessonProvider>
  </StrictMode>,
)
