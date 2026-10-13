/**
 * Plain `<a href>` links in the app are written as site paths ("/our-story", "/#cupcakes"). When the site is
 * served from a sub-path (GitHub Pages: "/miss-cupcake/") this puts the base in front, and ends the path with
 * a slash: there every route is a folder, and without the slash the host answers with a redirect first. With
 * base "/" nothing changes. Anchors ("#cupcakes") and other sites ("https://...") are left alone. Links that
 * go through React Router (`<Link>`, `<Navigate>`) already know the base from the router's `basename`.
 */
export function appHref(href: string, base: string = import.meta.env.BASE_URL): string {
  if (!href.startsWith('/')) return href
  const subPath = base !== '/'
  const [, path, rest = ''] = href.match(/^([^#?]*)(.*)$/) ?? []
  return base.replace(/\/$/, '') + (subPath && !path.endsWith('/') ? `${path}/` : path) + rest
}
