import { useEffect } from 'react'

const SITE_URL = 'https://decentdevelopment.com.au'

function updateNode(selector, value, attribute = 'content') {
  const node = document.head.querySelector(selector)

  if (!node) return

  node.setAttribute(attribute, value)
}

export default function usePageMeta({ title, description, path = '/' }) {
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
  }, [description, path, title])
}
