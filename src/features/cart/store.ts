import { createStore } from 'jotai'

/** One store for the app (`<Provider store={store}>`), also usable outside React and in tests. */
export const store = createStore()
