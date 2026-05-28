import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import '@amsterdam/design-system-tokens/dist/index.css'
import '@amsterdam/design-system-assets/font/index.css'
import '@amsterdam/design-system-css/dist/index.css'
import '@privacybydesign/yivi-css/dist/yivi.min.css'
import './styles.css'

import { App } from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
