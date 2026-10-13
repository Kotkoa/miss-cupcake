import { describe, expect, it } from 'vitest'
import { appHref } from './appHref'

describe('appHref', () => {
  it('leaves site paths as they are at the root', () => {
    expect(appHref('/our-story', '/')).toBe('/our-story')
    expect(appHref('/', '/')).toBe('/')
  })

  it('puts the sub-path in front and ends the path with a slash, keeping the hash and the home path', () => {
    expect(appHref('/our-story', '/miss-cupcake/')).toBe('/miss-cupcake/our-story/')
    expect(appHref('/checkout/payment', '/miss-cupcake/')).toBe('/miss-cupcake/checkout/payment/')
    expect(appHref('/#cupcakes', '/miss-cupcake/')).toBe('/miss-cupcake/#cupcakes')
    expect(appHref('/our-story#visit', '/miss-cupcake/')).toBe('/miss-cupcake/our-story/#visit')
    expect(appHref('/', '/miss-cupcake/')).toBe('/miss-cupcake/')
  })

  it('keeps query strings and existing slashes, and does not add a slash to a file', () => {
    expect(appHref('/?a=1', '/miss-cupcake/')).toBe('/miss-cupcake/?a=1')
    expect(appHref('/our-story/', '/miss-cupcake/')).toBe('/miss-cupcake/our-story/')
    expect(appHref('/files/menu.pdf', '/miss-cupcake/')).toBe('/miss-cupcake/files/menu.pdf')
  })

  it('does not touch anchors or other sites', () => {
    expect(appHref('//cdn.example.com/x', '/miss-cupcake/')).toBe('//cdn.example.com/x')
    expect(appHref('mailto:a@example.com', '/miss-cupcake/')).toBe('mailto:a@example.com')
    expect(appHref('#cupcakes', '/miss-cupcake/')).toBe('#cupcakes')
    expect(appHref('https://example.com/a', '/miss-cupcake/')).toBe('https://example.com/a')
  })
})
