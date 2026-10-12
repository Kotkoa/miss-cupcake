import { Navigate } from 'react-router-dom'
import { SiteHeader } from '../../components/SiteHeader/SiteHeader'
import { useCartCount } from '../../features/cart'

/** Placeholder until task 5.5 builds the payment screen; the route, header and the empty-cart redirect already work. */
export function Payment() {
  const count = useCartCount()
  if (count === 0) return <Navigate to="/checkout" replace />

  return (
    <>
      <SiteHeader currentHref="/checkout/payment" />
      <main>
        <h1>Payment</h1>
      </main>
    </>
  )
}
