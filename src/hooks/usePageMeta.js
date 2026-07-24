import { useEffect } from 'react'

const SITE_URL = 'https://www.decentdevelopment.com.au'

function updateNode(selector, value, attribute = 'content') {
  const node = document.head.querySelector(selector)

  if (!node) return

  node.setAttribute(attribute, value)
}

export default function usePageMeta({
  title,
  description,
  path = '/',
  robots = 'index, follow',
  schemas = [],
  socialImage = '/og-image.webp',
  socialImageAlt = 'DECENT Development residential construction and property development in Sydney',
}) {
  const schemasStr = JSON.stringify(schemas)

  useEffect(() => {
    document.title = title

    let normalizedPath = path
    if (normalizedPath && normalizedPath !== '/' && !normalizedPath.endsWith('/')) {
      normalizedPath = `${normalizedPath}/`
    }

    const socialImageUrl = socialImage.startsWith('http') ? socialImage : `${SITE_URL}${socialImage}`

    updateNode('meta[name="description"]', description)
    updateNode('meta[name="robots"]', robots)
    updateNode('meta[property="og:title"]', title)
    updateNode('meta[property="og:description"]', description)
    updateNode('meta[property="og:url"]', `${SITE_URL}${normalizedPath}`)
    updateNode('meta[property="og:image"]', socialImageUrl)
    updateNode('meta[property="og:image:alt"]', socialImageAlt)
    updateNode('meta[name="twitter:title"]', title)
    updateNode('meta[name="twitter:description"]', description)
    updateNode('meta[name="twitter:image"]', socialImageUrl)
    updateNode('meta[name="twitter:image:alt"]', socialImageAlt)
    updateNode('link[rel="canonical"]', `${SITE_URL}${normalizedPath}`, 'href')

    // Replace prerendered route schemas on hydration and stale dynamic schemas after navigation.
    const existingScripts = document.querySelectorAll(
      'script[data-schema-route], script[data-schema-dynamic]',
    )
    existingScripts.forEach((script) => script.remove())

    if (schemasStr) {
      const parsedSchemas = JSON.parse(schemasStr)
      if (Array.isArray(parsedSchemas) && parsedSchemas.length > 0) {
        parsedSchemas.forEach((schemaObj) => {
          const script = document.createElement('script')
          script.type = 'application/ld+json'
          script.setAttribute('data-schema-dynamic', 'true')
          script.textContent = JSON.stringify(schemaObj)
          document.head.appendChild(script)
        })
      }
    }

    return () => {
      // Clean up the active route schemas before the next route injects its own.
      const existingScriptsOnCleanup = document.querySelectorAll(
        'script[data-schema-route], script[data-schema-dynamic]',
      )
      existingScriptsOnCleanup.forEach((script) => script.remove())
    }
  }, [description, path, robots, schemasStr, socialImage, socialImageAlt, title])
}
