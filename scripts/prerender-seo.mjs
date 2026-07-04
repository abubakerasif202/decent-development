import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { HOUSE_LAND_ENABLED } from '../src/config/featureFlags.js'
import { houseLandPackages } from '../src/data/houseLandPackages.js'
import { projects } from '../src/data/projects.js'

const siteUrl = 'https://www.decentdevelopment.com.au'
const lastmod = new Date().toISOString().split('T')[0]

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
  '@type': 'GeneralContractor',
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
        text: 'DECENT Development works across New South Wales from its North Sydney office.',
      },
    },
    {
      '@type': 'Question',
      name: 'What construction services are available?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Services include residential construction, commercial construction, property development, project management, renovations, extensions, and building consultation.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you specialize in duplex and triplex developments in Sydney?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, DECENT Development specializes in multi-residential developments, including attached duplex and triplex projects, ensuring optimal land utilization and premium architectural finishes under our NSW contractor licence.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do project enquiries start?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Prospective clients can call, email, or submit the contact form with the project type, contact details, and a short brief.',
      },
    },
  ],
}

const projectListSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  '@id': `${siteUrl}/projects/#completed-projects`,
  name: 'Completed residential projects',
  itemListElement: projects.map((project, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    item: {
      '@type': 'CreativeWork',
      name: project.title,
      description: project.summary,
      url: `${siteUrl}/projects/${project.slug}/`,
      about: project.type,
      provider: {
        '@id': `${siteUrl}/#organization`,
      },
      spatialCoverage: {
        '@type': 'Place',
        name: project.address,
      },
    },
  })),
}

const homeSubheadings = [
  {
    title: 'Premium Residential Construction & Duplex Developments in NSW',
    text: 'DECENT Development specializes in high-end residential construction, custom homes, duplex and triplex developments, and heritage renovations across Sydney and New South Wales. We build with exceptional craftsmanship and architectural integrity.',
  },
  {
    title: 'Professional Project Management & Building Consultation',
    text: 'Our certified builders and project managers oversee every phase of development from planning to handover. We maintain strict compliance, quality control, and transparency, ensuring your project is completed on time and within budget.',
  },
]

if (HOUSE_LAND_ENABLED) {
  homeSubheadings.push({
    title: 'Ava & Bela Residence House and Land Packages',
    text: 'Explore Ava Residence and Bela Residence package pathways with practical guidance across land review, inclusions, pricing, approvals, and construction planning.',
  })
}

const houseAndLandInventorySchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  '@id': `${siteUrl}/house-and-land-packages/#opportunities`,
  name: 'DECENT Development Ava and Bela Residence package pathways',
  description:
    'Ava Residence and Bela Residence house and land package pathways across Sydney and New South Wales.',
  itemListElement: houseLandPackages.map((packageItem, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    item: {
      '@type': 'WebPage',
      name: packageItem.title,
      description: packageItem.description,
      url: `${siteUrl}/house-and-land-packages/${packageItem.slug}/`,
    },
  })),
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
    subheadings: homeSubheadings,
    schemas: [organizationSchema, websiteSchema, serviceSchema, faqSchema],
  },
  {
    path: '/projects/',
    priority: '0.9',
    title: 'Completed Projects | Decent Development Sydney',
    description:
      'Explore completed duplex, triplex and residential development projects by Decent Development across Auburn, Rouse Hill, Canley Vale, Canley Heights and Regents Park.',
    h1: 'Recently completed projects',
    body: [
      'Decent Development is a Sydney property developer presenting completed residential projects across Auburn, Regents Park, Rouse Hill, Canley Vale and Canley Heights.',
      'The project portfolio includes duplex development Sydney work, triplex development Sydney work and broader residential construction Sydney projects.',
    ],
    subheadings: [
      {
        title: 'Completed Residential Projects Across Sydney',
        text: 'Browse completed duplex, triplex and residential development projects with project type, status, suburb, address and concise project stories.',
      },
      {
        title: 'Premium Residential Construction Presentation',
        text: 'Each project page keeps the copy specific to exterior work, street presence, quality finishes and construction and property development NSW capability.',
      },
    ],
    schemas: [organizationSchema, breadcrumb('/projects/', 'Projects'), projectListSchema],
  },
  {
    path: '/collaboration/',
    priority: '0.8',
    title: 'Construction Collaboration Partners | DECENT Development',
    description:
      'Meet the trusted construction partners DECENT Development collaborates with to deliver larger and more complex residential projects across NSW.',
    h1: 'Trusted construction collaboration partners',
    body: [
      'DECENT Development collaborates with established building companies when a project needs additional capacity, specialist expertise, or broader technical coordination.',
      'The collaboration model supports larger and more complex residential projects across New South Wales.',
    ],
    subheadings: [
      {
        title: 'Shared Expertise for Larger Projects',
        text: 'Trusted delivery partners contribute additional building capability and specialist coordination when project scale or complexity requires it.',
      },
      {
        title: 'Clear and Coordinated Delivery',
        text: 'Collaborative project delivery maintains a clear focus on responsibilities, communication, construction quality, and client outcomes.',
      },
    ],
    schemas: [organizationSchema, breadcrumb('/collaboration/', 'Collaboration Partners')],
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
    title: 'Contact DECENT Development | Sydney Construction Enquiries',
    description:
      'Contact DECENT Development to discuss a premium construction, duplex/triplex development, or project management brief in Sydney and New South Wales.',
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

if (HOUSE_LAND_ENABLED) {
  routes.push({
    path: '/house-and-land-packages/',
    priority: '0.8',
    title: 'House & Land Packages | DECENT Development',
    description:
      'Explore Ava Residence and Bela Residence house and land package opportunities with DECENT Development across Sydney and New South Wales. Enquire about single-storey and double-storey residential packages.',
    h1: 'Ava & Bela Residence Packages',
    body: [
      'DECENT Development presents Ava Residence and Bela Residence as premium house and land package pathways for clients seeking quality residential construction across Sydney and New South Wales.',
      'Each package is subject to land availability, planning review, final inclusions, pricing documentation, and construction scope confirmation.',
    ],
    subheadings: [
      {
        title: 'Featured House & Land Packages',
        text: 'Ava Residence is a premium double-storey family residence, while Bela Residence is a compact single-storey design suited to practical Sydney living.',
      },
      {
        title: 'Compare Ava & Bela',
        text: 'Compare storeys, approximate size, bedrooms, bathrooms, garage provision, land requirements, price guide, and the key strengths of each package pathway.',
      },
      {
        title: 'Turnkey Inclusions',
        text: 'Turnkey inclusions may include site works, approvals, structure, facade finishes, roofing, garage, kitchen, bathrooms, laundry, internal finishes, electrical, heating and cooling, landscaping, and BASIX-related items, subject to final specification.',
      },
    ],
    schemas: [
      organizationSchema,
      breadcrumb('/house-and-land-packages/', 'House & Land Packages'),
      {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        '@id': `${siteUrl}/house-and-land-packages/#webpage`,
        name: 'House & Land Packages',
        description:
          'Explore Ava Residence and Bela Residence house and land package opportunities with DECENT Development across Sydney and New South Wales.',
        url: `${siteUrl}/house-and-land-packages/`,
      },
      houseAndLandInventorySchema,
    ],
  })

  for (const packageItem of houseLandPackages) {
    const routePath = `/house-and-land-packages/${packageItem.slug}/`

    routes.push({
      path: routePath,
      priority: '0.7',
      title: packageItem.seoTitle,
      description: packageItem.seoDescription,
      h1: packageItem.title,
      body: [
        packageItem.description,
        `${packageItem.title} is a ${packageItem.packageType.toLowerCase()} pathway for ${packageItem.region}. Pricing, availability, inclusions, land suitability, approvals, and construction scope are confirmed during enquiry.`,
      ],
      subheadings: [
        {
          title: 'Package features',
          text: [...packageItem.features, ...packageItem.highlights].join('. '),
        },
        {
          title: 'Location and land notes',
          text: `${packageItem.locationNotes} ${packageItem.enquiryNotes}`,
        },
      ],
      schemas: [
        organizationSchema,
        packageBreadcrumb(routePath, packageItem.title),
        {
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          '@id': `${siteUrl}${routePath}#webpage`,
          name: packageItem.title,
          description: packageItem.seoDescription,
          url: `${siteUrl}${routePath}`,
          about: packageItem.packageType,
          spatialCoverage: {
            '@type': 'Place',
            name: packageItem.region,
          },
        },
      ],
    })
  }
}

for (const project of projects) {
  routes.push({
    path: `/projects/${project.slug}/`,
    priority: '0.7',
    title: project.seoTitle,
    description: project.seoDescription,
    h1: project.title,
    body: [
      project.story,
      `${project.address} is listed as a ${project.status.toLowerCase()} ${project.type.toLowerCase()} in the Decent Development project portfolio.`,
    ],
    subheadings: [
      {
        title: 'Project Highlights',
        text: project.features.join('. '),
      },
      {
        title: 'Sydney Residential Construction',
        text: `${project.title} supports Decent Development project experience in completed residential projects, residential construction Sydney and construction and property development NSW.`,
      },
    ],
    schemas: [
      organizationSchema,
      projectBreadcrumb(`/projects/${project.slug}/`, project.title),
      {
        '@context': 'https://schema.org',
        '@type': 'CreativeWork',
        '@id': `${siteUrl}/projects/${project.slug}/#project`,
        name: project.title,
        description: project.story,
        url: `${siteUrl}/projects/${project.slug}/`,
        about: project.type,
        provider: {
          '@id': `${siteUrl}/#organization`,
        },
        spatialCoverage: {
          '@type': 'Place',
          name: project.address,
        },
      },
    ],
  })
}

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

function projectBreadcrumb(routePath, name) {
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
        name: 'Completed Projects',
        item: `${siteUrl}/projects/`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name,
        item: `${siteUrl}${routePath}`,
      },
    ],
  }
}

function packageBreadcrumb(routePath, name) {
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
        name: 'House & Land Packages',
        item: `${siteUrl}/house-and-land-packages/`,
      },
      {
        '@type': 'ListItem',
        position: 3,
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
