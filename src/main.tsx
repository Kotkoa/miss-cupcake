import { StrictMode } from 'react'
import { Provider } from 'jotai'
import { createRoot } from 'react-dom/client'
import { store } from './features/cart'
import './styles/tokens.css'
import './styles/fonts.css'
import './styles/reset.css'
import './styles/base.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
)
