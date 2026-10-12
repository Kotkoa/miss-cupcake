import { describe, expect, it } from 'vitest'
import { getNavLinks } from './navigation'

describe('getNavLinks', () => {
  it('links Shop to the cupcake section while keeping it current on the home page', () => {
    const shop = getNavLinks('/').find((link) => link.label === 'Shop')
    expect(shop).toMatchObject({ href: '/#cupcakes', current: true })
  })

  it('marks the page current when the URL has a trailing slash, and nothing on unknown paths', () => {
    expect(getNavLinks('/our-story/').find((link) => link.current)?.label).toBe('Our story')
    expect(getNavLinks('/ui').some((link) => link.current)).toBe(false)
  })
})
