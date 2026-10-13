import { describe, expect, it } from 'vitest'
import { appHref } from './appHref'

describe('appHref', () => {
  it('leaves site paths as they are at the root', () => {
    expect(appHref('/our-story', '/')).toBe('/our-story')
    expect(appHref('/', '/')).toBe('/')
  })

  it('puts the sub-path in front, keeping the hash and the home path', () => {
    expect(appHref('/our-story', '/miss-cupcake/')).toBe('/miss-cupcake/our-story')
    expect(appHref('/#cupcakes', '/miss-cupcake/')).toBe('/miss-cupcake/#cupcakes')
    expect(appHref('/', '/miss-cupcake/')).toBe('/miss-cupcake/')
  })

  it('does not touch anchors or other sites', () => {
    expect(appHref('#cupcakes', '/miss-cupcake/')).toBe('#cupcakes')
    expect(appHref('https://example.com/a', '/miss-cupcake/')).toBe('https://example.com/a')
  })
})
