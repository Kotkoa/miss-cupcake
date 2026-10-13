/**
 * Plain `<a href>` links in the app are written as site paths ("/our-story", "/#cupcakes"). When the site is
 * served from a sub-path (GitHub Pages: "/miss-cupcake/") this puts the base in front, and ends a page path
 * with a slash: there every route is a folder, and without the slash the host answers with a redirect first.
 * With base "/" nothing changes. Anchors ("#cupcakes"), other sites ("https://...", "//cdn...", "mailto:")
 * and paths to files ("/menu.pdf", no slash added) are handled as described. Links that go through React
 * Router (`<Link>`, `<Navigate>`) already know the base from the router's `basename`.
 */
export function appHref(href: string, base: string = import.meta.env.BASE_URL): string {
  if (!href.startsWith('/') || href.startsWith('//')) return href
  const subPath = base !== '/'
  const [, path, rest = ''] = href.match(/^([^#?]*)(.*)$/) ?? []
  const isFile = /\.[a-z0-9]+$/i.test(path)
  return base.replace(/\/$/, '') + (subPath && !isFile && !path.endsWith('/') ? `${path}/` : path) + rest
}
