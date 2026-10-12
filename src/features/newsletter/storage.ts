export const NEWSLETTER_STORAGE_KEY = 'miss-cupcake:newsletter'

/**
 * Remembers that someone signed up. Only the flag is stored, never the email: nothing in the app
 * reads it back and nothing is sent anywhere.
 */
export function saveSubscribed(): void {
  try {
    localStorage.setItem(NEWSLETTER_STORAGE_KEY, JSON.stringify({ subscribed: true }))
  } catch {
    // Storage can be blocked or full; the signup still counts for this visit.
  }
}
