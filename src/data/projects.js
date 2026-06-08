const projectImage = (folder, filename) => `/projects/${folder}/${filename}`

const shotLabels = {
  front: 'Front Exterior',
  side: 'Side View',
  rear: 'Rear View',
  interior: 'Kitchen / Living',
  detail: 'Detail Shot',
}

const baseFeatures = {
  duplex: [
    'Two-residence development',
    'Contemporary street presence',
    'Family-focused planning',
    'Quality exterior finishes',
    'Built for long-term value',
  ],
  triplex: [
    'Three-residence development',
    'Multi-dwelling construction capability',
    'Strong streetscape presentation',
    'Efficient land use',
    'Premium residential outcome',
  ],
  residential: [
    'Completed residential project',
    'Practical family living',
    'Efficient use of land',
    'Quality construction approach',
    'Designed for long-term value',
  ],
}

const createPlaceholderShots = (project) =>
  Object.entries(shotLabels).map(([key, label]) => ({
    key,
    label,
    src: null,
    alt: `${project.title} ${label} placeholder`,
    placeholderTitle: project.address,
    placeholderSubtitle: project.type,
    placeholderLabel: label,
  }))

const createRealShots = (folder, project) => [
  {
    key: 'front',
    label: shotLabels.front,
    src: projectImage(folder, `front.${project.shotExtension || 'png'}`),
    alt: `${project.title} front exterior`,
  },
  {
    key: 'side',
    label: shotLabels.side,
    src: projectImage(folder, `side.${project.shotExtension || 'png'}`),
    alt: `${project.title} side view`,
  },
  {
    key: 'rear',
    label: shotLabels.rear,
    src: projectImage(folder, `rear.${project.shotExtension || 'png'}`),
    alt: `${project.title} rear view`,
  },
  {
    key: 'interior',
    label: shotLabels.interior,
    src: projectImage(folder, `interior.${project.shotExtension || 'png'}`),
    alt: `${project.title} kitchen and living area`,
  },
  {
    key: 'detail',
    label: shotLabels.detail,
    src: projectImage(folder, `detail.${project.shotExtension || 'png'}`),
    alt: `${project.title} premium detail shot`,
  },
]

const createProject = ({
  slug,
  title,
  address,
  suburb,
  postcode,
  type,
  status = 'Completed',
  category,
  folder,
  realPhotography = false,
  shotExtension = 'png',
  featured = false,
  shortDescription,
  story,
  mapQuery,
  tags,
}) => {
  const project = {
    slug,
    title,
    address,
    suburb,
    postcode,
    type,
    status,
    featured,
    category,
    shortDescription,
    summary: shortDescription,
    story,
    mapQuery,
    tags,
    features: baseFeatures[category] || [],
    shotExtension,
  }

  project.shots = realPhotography ? createRealShots(folder, project) : createPlaceholderShots(project)
  project.heroImage = project.shots[0]?.src || null
  project.heroShot = project.shots[0]
  project.galleryImages = project.shots.map((shot) => shot.src)
  project.seoTitle = `${project.address} | ${project.type} Project | Decent Development`
  project.seoDescription = `Explore Decent Development’s ${project.type.toLowerCase()} project at ${project.address}, showcasing premium residential construction and property development in Sydney, NSW.`

  return project
}

export const projects = [
  createProject({
    slug: '34-antwerp-street-auburn',
    title: '34 Antwerp Street Duplex',
    address: '34 Antwerp Street, Auburn, NSW 2144',
    suburb: 'Auburn',
    postcode: '2144',
    type: 'Duplex',
    category: 'duplex',
    folder: 'auburn-34-antwerp',
    realPhotography: true,
    featured: true,
    shortDescription:
      'A premium duplex project presented with a clean, restrained residential finish and strong street presence.',
    story:
      'A premium duplex project presented with a clean, restrained residential finish and strong street presence. The project is positioned as a completed residential development with practical planning, refined exterior composition and a clear focus on long-term family value.',
    mapQuery: '34 Antwerp Street, Auburn NSW 2144',
    tags: ['duplex development Sydney', 'Auburn', 'residential construction NSW'],
  }),
  createProject({
    slug: '21-lewis-street-regents-park',
    title: '21 Lewis Street Residential Development',
    address: '21 Lewis Street, Regents Park, NSW 2143',
    suburb: 'Regents Park',
    postcode: '2143',
    type: 'Residential Development',
    category: 'residential',
    folder: 'regents-park-21-lewis',
    realPhotography: true,
    featured: false,
    shortDescription:
      'A completed residential development focused on practical living, quality construction and efficient land use.',
    story:
      'A completed residential development focused on practical living, quality construction and efficient land use. The project sits comfortably within the suburb while maintaining a premium, well-resolved presentation for the portfolio.',
    mapQuery: '21 Lewis Street, Regents Park NSW 2143',
    tags: ['completed residential projects', 'Regents Park', 'property development NSW'],
  }),
  createProject({
    slug: '10-dorian-street-rouse-hill',
    title: '10 Dorian Street Duplex',
    address: '10 Dorian Street, Rouse Hill, NSW 2155',
    suburb: 'Rouse Hill',
    postcode: '2155',
    type: 'Duplex',
    category: 'duplex',
    folder: 'rouse-hill-10-dorian',
    realPhotography: true,
    shotExtension: 'webp',
    featured: true,
    shortDescription:
      'A modern duplex in Rouse Hill with strong street appeal, clean materials and a premium family-focused outcome.',
    story:
      "A modern duplex in Rouse Hill with strong street appeal, clean materials and a premium family-focused outcome. The real project photography gives the portfolio its most complete residential presentation and supports the site's more editorial style.",
    mapQuery: '10 Dorian Street, Rouse Hill NSW 2155',
    tags: ['duplex development Sydney', 'Rouse Hill', 'completed residential projects'],
  }),
  createProject({
    slug: '24-the-avenue-canley-vale',
    title: '24 The Avenue Triplex',
    address: '24 The Avenue, Canley Vale, NSW 2166',
    suburb: 'Canley Vale',
    postcode: '2166',
    type: 'Triplex',
    category: 'triplex',
    folder: 'canley-vale-24-the-avenue',
    realPhotography: true,
    featured: true,
    shortDescription:
      'A triplex development presented as a clean, high-value multi-dwelling project with a clear residential identity.',
    story:
      'A triplex development presented as a clean, high-value multi-dwelling project with a clear residential identity. The project is shown as a premium portfolio entry while waiting for a fuller photography set.',
    mapQuery: '24 The Avenue, Canley Vale NSW 2166',
    tags: ['triplex development Sydney', 'Canley Vale', 'multi-dwelling construction'],
  }),
  createProject({
    slug: '87-the-avenue-canley-vale',
    title: '87 The Avenue Triplex',
    address: '87 The Avenue, Canley Vale, NSW 2166',
    suburb: 'Canley Vale',
    postcode: '2166',
    type: 'Triplex',
    category: 'triplex',
    folder: 'canley-vale-87-the-avenue',
    realPhotography: true,
    featured: false,
    shortDescription:
      'A triplex project with a premium but understated presence, designed to show scale without visual clutter.',
    story:
      'A triplex project with a premium but understated presence, designed to show scale without visual clutter. The gallery remains intentionally placeholder-led until the proper photo set is supplied.',
    mapQuery: '87 The Avenue, Canley Vale NSW 2166',
    tags: ['triplex development Sydney', 'Canley Vale', 'Sydney property developer'],
  }),
  createProject({
    slug: '23-mittiamo-street-canley-heights',
    title: '23 Mittiamo Street Duplex',
    address: '23 Mittiamo Street, Canley Heights, NSW 2166',
    suburb: 'Canley Heights',
    postcode: '2166',
    type: 'Duplex',
    category: 'duplex',
    folder: 'canley-heights-23-mittiamo',
    realPhotography: true,
    featured: false,
    shortDescription:
      'A duplex development shown with a calm, clean portfolio presentation to keep the completed-projects page cohesive.',
    story:
      'A duplex development shown with a calm, clean portfolio presentation to keep the completed-projects page cohesive. The page treatment prioritizes consistency and clear project information over speculative imagery.',
    mapQuery: '23 Mittiamo Street, Canley Heights NSW 2166',
    tags: ['duplex development Sydney', 'Canley Heights', 'residential construction Sydney'],
  }),
]

export const featuredProjects = projects.filter((project) => project.featured)

export function getProjectBySlug(slug) {
  return projects.find((project) => project.slug === slug)
}
