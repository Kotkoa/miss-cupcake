import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Home } from './pages/Home/Home'
import { UiKit } from './pages/UiKit/UiKit'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ui" element={<UiKit />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
