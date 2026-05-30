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

    updateNode('meta[name="description"]', description)
    updateNode('meta[property="og:title"]', title)
    updateNode('meta[property="og:description"]', description)
    updateNode('meta[property="og:url"]', `${SITE_URL}${path}`)
    updateNode('meta[name="twitter:title"]', title)
    updateNode('meta[name="twitter:description"]', description)
    updateNode('link[rel="canonical"]', `${SITE_URL}${path}`, 'href')
  }, [description, path, title])
}
