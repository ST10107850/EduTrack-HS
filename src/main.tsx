
import { createRoot } from 'react-dom/client'
import './index.css'

import { AuthProvider } from './context/AuthContext.tsx'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <AuthProvider>
  <App />
</AuthProvider>,
)
