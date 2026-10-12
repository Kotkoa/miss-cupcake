import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ScrollToHash } from './components/ScrollToHash/ScrollToHash'
import { Checkout } from './pages/Checkout/Checkout'
import { Home } from './pages/Home/Home'
import { NotFound } from './pages/NotFound/NotFound'
import { OurStory } from './pages/OurStory/OurStory'
import { Payment } from './pages/Payment/Payment'
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
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/checkout/payment" element={<Payment />} />
        <Route path="/ui" element={<UiKit />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
