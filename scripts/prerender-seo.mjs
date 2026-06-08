import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'

const siteUrl = 'https://decentdevelopment.com.au'
const lastmod = '2026-06-08'

const company = {
  name: 'DECENT Development',
  url: siteUrl,
  image: `${siteUrl}/og-image.webp`,
  email: 'info@decentdevelopment.com.au',
  telephone: '1800 008 883',
  licence: '476988C',
  acn: '679 810 327',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Level 14, 275 Alfred St North',
    addressLocality: 'North Sydney',
    addressRegion: 'NSW',
    postalCode: '2060',
    addressCountry: 'AU',
  },
  areaServed: {
    '@type': 'AdministrativeArea',
    name: 'New South Wales',
  },
}

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': ['Organization', 'LocalBusiness', 'GeneralContractor'],
  '@id': `${siteUrl}/#organization`,
  name: company.name,
  url: company.url,
  image: company.image,
  email: company.email,
  telephone: company.telephone,
  address: company.address,
  areaServed: company.areaServed,
  identifier: [
    {
      '@type': 'PropertyValue',
      name: 'NSW contractor licence',
      value: company.licence,
    },
    {
      '@type': 'PropertyValue',
      name: 'ACN',
      value: company.acn,
    },
  ],
}

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${siteUrl}/#website`,
  name: company.name,
  url: company.url,
  publisher: {
    '@id': `${siteUrl}/#organization`,
  },
  inLanguage: 'en-AU',
}

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  '@id': `${siteUrl}/#services`,
  name: 'Construction and development services',
  itemListElement: [
    'Residential construction',
    'Commercial construction',
    'Property development',
    'Project management',
    'Renovations and extensions',
    'Building consultation',
  ].map((name, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    item: {
      '@type': 'Service',
      name,
      provider: {
        '@id': `${siteUrl}/#organization`,
      },
      areaServed: company.areaServed,
    },
  })),
}

const teamSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  '@id': `${siteUrl}/meet-the-team/#people`,
  name: 'DECENT Development team',
  itemListElement: [
    ['Nemat Haidari', 'Specialist Project Manager'],
    ['Mohammad Mohsini', 'Certified Builder & Specialist Project Manager'],
    ['Hussain Jafari', 'Home & Land Package Specialist'],
  ].map(([name, jobTitle], index) => ({
    '@type': 'ListItem',
    position: index + 1,
    item: {
      '@type': 'Person',
      name,
      jobTitle,
      worksFor: {
        '@id': `${siteUrl}/#organization`,
      },
    },
  })),
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  '@id': `${siteUrl}/#faq`,
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What areas does DECENT Development service?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'DECENT Development works across New South Wales with an office in North Sydney.',
      },
    },
    {
      '@type': 'Question',
      name: 'What construction services are available?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Services include residential construction, commercial construction, property development, project management, renovations and extensions, and building consultation.',
      },
    },
    {
      '@type': 'Question',
      name: 'How can I contact DECENT Development?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'You can call 1800 008 883, email info@decentdevelopment.com.au, or use the website contact form.',
      },
    },
  ],
}

const routes = [
  {
    path: '/',
    priority: '1.0',
    title: 'DECENT Development | Premium Construction & Property Development',
    description:
      'Premium construction, property development, renovation, and project management solutions delivered across New South Wales with clarity, precision, and long-term value.',
    h1: 'Premium construction and property development in New South Wales',
    body: [
      'DECENT Development delivers residential construction, commercial construction, property development, renovations, extensions, building consultation, and project management.',
      'The company operates from North Sydney and publishes licence, ACN, contact, team, and service information for transparent project enquiries.',
    ],
    subheadings: [
      {
        title: 'Premium Residential Construction & Duplex Developments in NSW',
        text: 'DECENT Development specializes in high-end residential construction, custom homes, duplex and triplex developments, and heritage renovations across Sydney and New South Wales. We build with exceptional craftsmanship and architectural integrity.',
      },
      {
        title: 'Professional Project Management & Building Consultation',
        text: 'Our certified builders and project managers oversee every phase of development from planning to handover. We maintain strict compliance, quality control, and transparency, ensuring your project is completed on time and within budget.',
      },
    ],
    schemas: [organizationSchema, websiteSchema, serviceSchema, faqSchema],
  },
  {
    path: '/completed-projects/',
    priority: '0.8',
    title: 'Portfolio | DECENT Development',
    description:
      'Browse premium concept showcases for attached dwellings, single homes, commercial fit-outs, and heritage restoration by DECENT Development.',
    h1: 'DECENT Development portfolio concepts',
    body: [
      'The portfolio presents attached dwelling, single dwelling, commercial fit-out, and heritage renovation concept showcases.',
      'Imagery is clearly disclosed as AI-generated concept presentation, keeping the portfolio transparent for prospective clients.',
    ],
    subheadings: [
      {
        title: 'Attached & Single Dwelling Concept Showcases',
        text: 'Explore our portfolio of premium concepts for luxury duplexes, multi-residential attached dwellings, and modern single homes. Each concept is designed to maximize spatial efficiency and aesthetic appeal.',
      },
      {
        title: 'Commercial Fit-Outs & Heritage Restorations',
        text: 'Review our design concepts for sophisticated commercial spaces and detailed heritage restorations. We combine modern functionality with historical preservation to create timeless architectural assets.',
      },
    ],
    schemas: [organizationSchema, breadcrumb('/completed-projects/', 'Portfolio')],
  },
  {
    path: '/meet-the-team/',
    priority: '0.8',
    title: 'Meet the Team | DECENT Development',
    description:
      'Meet the specialist project managers and building professionals behind DECENT Development premium delivery approach.',
    h1: 'Meet the DECENT Development team',
    body: [
      'DECENT Development brings together specialist project managers, certified building knowledge, and home-and-land package experience.',
      'Team profiles identify the people responsible for construction services, project management, and client guidance.',
    ],
    subheadings: [
      {
        title: 'Certified Builders & Specialist Project Managers',
        text: 'Our leadership team brings together decades of hands-on building experience and rigorous project management. We combine technical construction expertise with strategic coordination to deliver outstanding results.',
      },
      {
        title: 'Dedicated Client Guidance & Quality Assurance',
        text: 'From initial consultation to final inspection, our professionals guide you through every milestone. We prioritize open communication, safety, and attention to detail, maintaining the high reputation of DECENT Development.',
      },
    ],
    schemas: [organizationSchema, breadcrumb('/meet-the-team/', 'Meet the Team'), teamSchema],
  },
  {
    path: '/contact/',
    priority: '0.8',
    title: 'Contact | DECENT Development',
    description:
      'Contact DECENT Development to discuss a premium construction, development, renovation, or project management brief in New South Wales.',
    h1: 'Contact DECENT Development',
    body: [
      'Contact DECENT Development by phone on 1800 008 883, by email at info@decentdevelopment.com.au, or from Level 14, 275 Alfred St North, North Sydney NSW 2060.',
      'The contact page supports project enquiries for residential construction, commercial construction, property development, renovations, extensions, and building consultation.',
    ],
    subheadings: [
      {
        title: 'Start a Conversation on Your Next NSW Project',
        text: 'Get in touch with DECENT Development to discuss your building plans, duplex development, or commercial fit-out. We offer comprehensive consultation services to help realize your architectural vision.',
      },
      {
        title: 'Request a Detailed Project Enquiry & Consultation',
        text: 'Submit your brief or construction documents to our North Sydney office. Our team will review your requirements and provide professional guidance on project feasibility, timelines, and licensing compliance.',
      },
    ],
    schemas: [organizationSchema, breadcrumb('/contact/', 'Contact')],
  },
]

function breadcrumb(routePath, name) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: `${siteUrl}/`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name,
        item: `${siteUrl}${routePath}`,
      },
    ],
  }
}

function escapeHtml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
}

function escapeScriptJson(value) {
  return JSON.stringify(value, null, 2).replaceAll('</', '<\\/')
}

function staticBody(route) {
  const paragraphs = route.body.map((copy) => `<p>${escapeHtml(copy)}</p>`).join('')

  let subheadingsHtml = ''
  if (route.subheadings) {
    subheadingsHtml = route.subheadings
      .map(
        (sub) =>
          `<h2 style="font-family:Georgia,Cambria,Times New Roman,serif;font-size:1.5rem;color:#c5a059;margin-top:1.5rem;margin-bottom:0.5rem">${escapeHtml(sub.title)}</h2><p>${escapeHtml(sub.text)}</p>`,
      )
      .join('')
  }

  return `<main aria-label="${escapeHtml(route.h1)}" style="background:#121212;color:#fffaf2;font-family:ui-sans-serif,system-ui,Segoe UI,Arial,sans-serif;min-height:100vh;padding:6rem 1.25rem 4rem"><section style="max-width:760px;margin:0 auto"><p style="color:#c5a059;text-transform:uppercase;letter-spacing:.18em;font-size:.75rem;font-weight:700">DECENT Development</p><h1 style="font-family:Georgia,Cambria,Times New Roman,serif;font-size:clamp(2.5rem,8vw,5rem);line-height:.95;margin:1rem 0 1.5rem">${escapeHtml(route.h1)}</h1><div style="display:grid;gap:1rem;color:#c9c3b8;font-size:1rem;line-height:1.8">${paragraphs}${subheadingsHtml}</div><p style="margin-top:2rem;color:#c5a059;font-size:.875rem">Licence ${company.licence} &middot; ACN ${company.acn}</p></section></main>`
}

function applyHead(baseHtml, route) {
  const canonical = `${siteUrl}${route.path}`
  const schemaTags = route.schemas
    .map((schema) => `<script type="application/ld+json">${escapeScriptJson(schema)}</script>`)
    .join('\n    ')

  return baseHtml
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(route.title)}</title>`)
    .replace(
      /<link rel="canonical" href="[^"]*" \/>/,
      `<link rel="canonical" href="${canonical}" />`,
    )
    .replace(
      /<meta\s+name="description"\s+content="[^"]*"\s*\/>/,
      `<meta name="description" content="${escapeHtml(route.description)}" />`,
    )
    .replace(
      /<meta property="og:title" content="[^"]*" \/>/,
      `<meta property="og:title" content="${escapeHtml(route.title)}" />`,
    )
    .replace(
      /<meta\s+property="og:description"\s+content="[^"]*"\s*\/>/,
      `<meta property="og:description" content="${escapeHtml(route.description)}" />`,
    )
    .replace(
      /<meta property="og:url" content="[^"]*" \/>/,
      `<meta property="og:url" content="${canonical}" />`,
    )
    .replace(
      /<meta name="twitter:title" content="[^"]*" \/>/,
      `<meta name="twitter:title" content="${escapeHtml(route.title)}" />`,
    )
    .replace(
      /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/>/,
      `<meta name="twitter:description" content="${escapeHtml(route.description)}" />`,
    )
    .replace(
      /<script type="application\/ld\+json">[\s\S]*?<\/script>/,
      schemaTags,
    )
    .replace('<div id="root"></div>', `<div id="root">${staticBody(route)}</div>`)
}

const distDir = path.resolve('dist')
const baseHtml = await readFile(path.join(distDir, 'index.html'), 'utf8')

for (const route of routes) {
  const html = applyHead(baseHtml, route)
  const outputDir = route.path === '/' ? distDir : path.join(distDir, route.path)

  await mkdir(outputDir, { recursive: true })
  await writeFile(path.join(outputDir, 'index.html'), html)
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (route) => `  <url>
    <loc>${siteUrl}${route.path}</loc>
    <lastmod>${lastmod}</lastmod>
    <priority>${route.priority}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>
`

await writeFile(path.join(distDir, 'sitemap.xml'), sitemap)
