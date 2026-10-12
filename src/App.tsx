import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Home } from './pages/Home/Home'
import { OurStory } from './pages/OurStory/OurStory'
import { UiKit } from './pages/UiKit/UiKit'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/our-story" element={<OurStory />} />
        <Route path="/ui" element={<UiKit />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
