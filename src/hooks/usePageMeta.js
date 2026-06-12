import { useEffect } from 'react'

const SITE_URL = 'https://www.decentdevelopment.com.au'

function updateNode(selector, value, attribute = 'content') {
  const node = document.head.querySelector(selector)

  if (!node) return

  node.setAttribute(attribute, value)
}

export default function usePageMeta({ title, description, path = '/', schemas = [] }) {
  const schemasStr = JSON.stringify(schemas)

  useEffect(() => {
    document.title = title

    let normalizedPath = path
    if (normalizedPath && normalizedPath !== '/' && !normalizedPath.endsWith('/')) {
      normalizedPath = `${normalizedPath}/`
    }

    updateNode('meta[name="description"]', description)
    updateNode('meta[property="og:title"]', title)
    updateNode('meta[property="og:description"]', description)
    updateNode('meta[property="og:url"]', `${SITE_URL}${normalizedPath}`)
    updateNode('meta[name="twitter:title"]', title)
    updateNode('meta[name="twitter:description"]', description)
    updateNode('link[rel="canonical"]', `${SITE_URL}${normalizedPath}`, 'href')

    // Handle dynamic schema injection
    const existingScripts = document.querySelectorAll('script[data-schema-dynamic]')
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
      // Clean up dynamic schemas on unmount
      const existingScriptsOnCleanup = document.querySelectorAll('script[data-schema-dynamic]')
      existingScriptsOnCleanup.forEach((script) => script.remove())
    }
  }, [description, path, title, schemasStr])
}
