import { useAtomValue, useSetAtom } from 'jotai'
import { addToCartAtom, cartCountAtom, cartLinesAtom, cartSubtotalAtom, clearCartAtom, removeFromCartAtom, setQtyAtom } from './atoms'

/** The only cart API for components: they never import atoms or call `useAtom` themselves. */
export const useCartLines = () => useAtomValue(cartLinesAtom)
export const useCartCount = () => useAtomValue(cartCountAtom)
export const useCartSubtotal = () => useAtomValue(cartSubtotalAtom)

/** Actions only: a component that just calls them does not re-render when the cart changes. */
export function useCartActions() {
  return {
    add: useSetAtom(addToCartAtom),
    setQty: useSetAtom(setQtyAtom),
    remove: useSetAtom(removeFromCartAtom),
    clear: useSetAtom(clearCartAtom),
  }
}
