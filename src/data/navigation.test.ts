import { describe, expect, it } from 'vitest'
import { getNavLinks } from './navigation'

describe('getNavLinks', () => {
  it('links Shop to the cupcake section while keeping it current on the home page', () => {
    const shop = getNavLinks('/').find((link) => link.label === 'Shop')
    expect(shop).toMatchObject({ href: '/#cupcakes', current: true })
  })
})
