import { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ScrollToHash } from './components/ScrollToHash/ScrollToHash'
import { Home } from './pages/Home/Home'

// Home is the landing page and stays in the main bundle; every other route is its own chunk,
// so `/` does not download the Payment form or the Our Story map and video code.
const OurStory = lazy(() => import('./pages/OurStory/OurStory').then((m) => ({ default: m.OurStory })))
const WhyMissCupcake = lazy(() => import('./pages/WhyMissCupcake/WhyMissCupcake').then((m) => ({ default: m.WhyMissCupcake })))
const Checkout = lazy(() => import('./pages/Checkout/Checkout').then((m) => ({ default: m.Checkout })))
const Payment = lazy(() => import('./pages/Payment/Payment').then((m) => ({ default: m.Payment })))
const NotFound = lazy(() => import('./pages/NotFound/NotFound').then((m) => ({ default: m.NotFound })))

function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <ScrollToHash />
      {/* No fallback UI: a chunk is a few kB and the page is blank only for that moment. */}
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/our-story" element={<OurStory />} />
          <Route path="/why-miss-cupcake" element={<WhyMissCupcake />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/checkout/payment" element={<Payment />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App
