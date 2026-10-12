import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ScrollToHash } from './components/ScrollToHash/ScrollToHash'
import { Home } from './pages/Home/Home'
import { OurStory } from './pages/OurStory/OurStory'
import { WhyMissCupcake } from './pages/WhyMissCupcake/WhyMissCupcake'
import { UiKit } from './pages/UiKit/UiKit'

function App() {
  return (
    <BrowserRouter>
      <ScrollToHash />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/our-story" element={<OurStory />} />
        <Route path="/why-miss-cupcake" element={<WhyMissCupcake />} />
        <Route path="/ui" element={<UiKit />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
