// GitHub Pages cannot rewrite paths, so a deep link such as /miss-cupcake/checkout would be answered with
// HTTP 404 (and Lighthouse and search engines treat that as a broken page). After the build this copies the
// app shell to a folder per route: /checkout/ then exists as a real file and answers 200, and Pages redirects
// /checkout to /checkout/. Unknown paths still get 404.html, which is the right status for them.
// The routes are read from src/App.tsx (`<Route path="/x">`, not the home and not the `*` catch-all), so a new
// route cannot be forgotten.
import { copyFileSync, mkdirSync, readFileSync } from 'node:fs'

const routes = [...readFileSync('src/App.tsx', 'utf8').matchAll(/<Route path="\/([^"*]+)"/g)].map((match) => match[1])
if (routes.length === 0) throw new Error('no routes found in src/App.tsx')

copyFileSync('dist/index.html', 'dist/404.html')
for (const route of routes) {
  mkdirSync(`dist/${route}`, { recursive: true })
  copyFileSync('dist/index.html', `dist/${route}/index.html`)
}
console.log(`pages fallback: 404.html + ${routes.length} route folders`)
