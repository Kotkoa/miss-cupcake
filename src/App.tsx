import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { UiKit } from './pages/UiKit/UiKit'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={null} />
        <Route path="/ui" element={<UiKit />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
