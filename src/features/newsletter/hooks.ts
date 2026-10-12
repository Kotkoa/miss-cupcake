import { useAtomValue, useSetAtom } from 'jotai'
import { dismissNewsletterNoticeAtom, newsletterNoticeAtom, subscribeAtom } from './atoms'

/** The only newsletter API for components, like the cart hooks. */
export function useNewsletterNotice() {
  return { visible: useAtomValue(newsletterNoticeAtom), dismiss: useSetAtom(dismissNewsletterNoticeAtom) }
}

/** Returns `subscribe(email)`: the error text to show, or '' when the signup went through. */
export const useNewsletterSignup = () => useSetAtom(subscribeAtom)
