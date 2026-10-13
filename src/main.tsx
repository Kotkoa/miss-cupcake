import { StrictMode } from 'react'
import { Provider } from 'jotai'
import { createRoot } from 'react-dom/client'
import { store } from './features/cart'
import './styles/tokens.css'
import './styles/fonts.css'
import './styles/reset.css'
import './styles/base.css'
import App from './App.tsx'

// A route chunk that cannot be fetched (offline, or a tab left open across a deploy that renamed the files)
// would blank the app. Load the page again once; a second failure within 10 s is left to fail visibly.
window.addEventListener('vite:preloadError', (event) => {
  const KEY = 'miss-cupcake:chunk-reload'
  const last = Number(sessionStorage.getItem(KEY) ?? 0)
  if (Date.now() - last < 10_000) return
  sessionStorage.setItem(KEY, String(Date.now()))
  event.preventDefault()
  window.location.reload()
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
)
