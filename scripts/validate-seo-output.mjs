import { existsSync, readFileSync } from 'node:fs'
import path from 'node:path'
import vercelConfig from '../vercel.json' with { type: 'json' }
import { HOUSE_LAND_ENABLED } from '../src/config/featureFlags.js'
import { projects } from '../src/data/projects.js'

const siteUrl = 'https://www.decentdevelopment.com.au'
const distDir = path.resolve('dist')
const failures = []

function fail(message) {
  failures.push(message)
}

function read(relativePath) {
  return readFileSync(path.join(distDir, relativePath), 'utf8')
}

function matchOne(html, pattern, label) {
  const match = html.match(pattern)
  if (!match) fail(`Missing ${label}`)
  return match?.[1]
}

function expectEqual(actual, expected, label) {
  if (actual !== expected) fail(`${label}: expected ${expected}, got ${actual}`)
}

function expectNotIncludes(haystack, needle, label) {
  if (haystack.includes(needle)) fail(`${label}: includes ${needle}`)
}

function getRedirect(source) {
  return vercelConfig.redirects.find((redirect) => redirect.source === source)
}

const publicSitemap = readFileSync(path.resolve('public/sitemap.xml'), 'utf8')
const distSitemap = read('sitemap.xml')
const robots = readFileSync(path.resolve('public/robots.txt'), 'utf8')
const llms = readFileSync(path.resolve('public/llms.txt'), 'utf8')

if (!HOUSE_LAND_ENABLED) {
  if (existsSync(path.join(distDir, 'house-and-land-packages'))) {
    fail('dist/house-and-land-packages exists while HOUSE_LAND_ENABLED=false')
  }

  for (const file of [publicSitemap, distSitemap, llms]) {
    expectNotIncludes(file, '/house-and-land-packages/', 'House & Land hidden output')
  }
}

expectNotIncludes(publicSitemap, '<loc>https://www.decentdevelopment.com.au/projects</loc>', 'public sitemap')
expectNotIncludes(distSitemap, '<loc>https://www.decentdevelopment.com.au/projects</loc>', 'dist sitemap')

const expectedCanonicalPaths = [
  '/',
  '/projects/',
  '/collaboration/',
  '/meet-the-team/',
  '/contact/',
  ...projects.map((project) => `/projects/${project.slug}/`),
]

for (const canonicalPath of expectedCanonicalPaths) {
  const canonical = `${siteUrl}${canonicalPath}`

  if (!distSitemap.includes(`<loc>${canonical}</loc>`)) {
    fail(`dist sitemap missing ${canonical}`)
  }

  if (!publicSitemap.includes(`<loc>${canonical}</loc>`)) {
    fail(`public sitemap missing ${canonical}`)
  }

  const htmlPath = canonicalPath === '/' ? 'index.html' : `${canonicalPath.replace(/^\/|\/$/g, '')}/index.html`
  const html = read(htmlPath)
  const pageCanonical = matchOne(html, /<link rel="canonical" href="([^"]+)" \/>/, `${htmlPath} canonical`)
  const ogUrl = matchOne(html, /<meta property="og:url" content="([^"]+)" \/>/, `${htmlPath} og:url`)

  expectEqual(pageCanonical, canonical, `${htmlPath} canonical`)
  expectEqual(ogUrl, canonical, `${htmlPath} og:url`)
}

for (const redirectedPath of [
  '/projects',
  '/contact',
  '/collaboration',
  '/meet-the-team',
  '/completed-projects',
  '/completed-projects/',
]) {
  if (publicSitemap.includes(`<loc>${siteUrl}${redirectedPath}</loc>`)) {
    fail(`public sitemap contains redirected URL ${redirectedPath}`)
  }

  if (distSitemap.includes(`<loc>${siteUrl}${redirectedPath}</loc>`)) {
    fail(`dist sitemap contains redirected URL ${redirectedPath}`)
  }
}

const expectedRedirects = {
  '/projects': '/projects/',
  '/contact': '/contact/',
  '/collaboration': '/collaboration/',
  '/meet-the-team': '/meet-the-team/',
  '/projects/:slug': '/projects/:slug/',
  '/house-and-land-packages': '/',
  '/house-and-land-packages/': '/',
  '/house-and-land-packages/:slug': '/',
  '/house-and-land-packages/:slug/': '/',
}

for (const [source, destination] of Object.entries(expectedRedirects)) {
  const redirect = getRedirect(source)
  if (!redirect) {
    fail(`Missing redirect for ${source}`)
    continue
  }

  expectEqual(redirect.destination, destination, `Redirect ${source}`)
  if (source === destination) fail(`Redirect loop detected for ${source}`)
}

if (!robots.includes(`Sitemap: ${siteUrl}/sitemap.xml`)) {
  fail('robots.txt does not point at canonical sitemap URL')
}

const titles = new Set()
const descriptions = new Set()
const h1s = new Set()

for (const project of projects) {
  const html = read(`projects/${project.slug}/index.html`)
  const title = matchOne(html, /<title>([\s\S]*?)<\/title>/, `${project.slug} title`)
  const description = matchOne(
    html,
    /<meta name="description" content="([^"]+)" \/>/,
    `${project.slug} description`,
  )
  const h1 = matchOne(html, /<h1[^>]*>([\s\S]*?)<\/h1>/, `${project.slug} h1`)

  if (title) titles.add(title)
  if (description) descriptions.add(description)
  if (h1) h1s.add(h1)

  if (!html.includes('"@type": "BreadcrumbList"')) {
    fail(`${project.slug} missing breadcrumb schema`)
  }

  if (!project.story || project.story.length < 120) {
    fail(`${project.slug} project story is too thin`)
  }

  for (const shot of project.shots) {
    if (!shot.alt || shot.alt.length < 20) {
      fail(`${project.slug} has thin image alt text for ${shot.key}`)
    }
  }
}

expectEqual(String(titles.size), String(projects.length), 'Unique project titles')
expectEqual(String(descriptions.size), String(projects.length), 'Unique project descriptions')
expectEqual(String(h1s.size), String(projects.length), 'Unique project H1s')

if (failures.length > 0) {
  console.error('SEO validation failed:')
  for (const failure of failures) {
    console.error(`- ${failure}`)
  }
  process.exit(1)
}

console.log(`SEO validation passed for ${expectedCanonicalPaths.length} canonical pages.`)
