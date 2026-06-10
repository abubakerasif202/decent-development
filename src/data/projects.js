const projectImage = (folder, filename) => `/projects/${folder}/${filename}`
const projectThumbnail = (filename) => `/projects/thumbnails/${filename}`

const shotLabels = {
  front: 'Front Exterior',
  rear: 'Back Exterior',
  side: 'Side View',
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

const defaultShotOrder = ['front', 'rear', 'side', 'interior', 'detail']

const createRealShots = (folder, project, shotOverrides = {}) =>
  defaultShotOrder
    .map((key) => {
      const override = shotOverrides[key]

      if (override === false) return null

      const filename = override?.filename || `${key}.${project.shotExtension || 'png'}`
      const label = override?.label || shotLabels[key]
      const altDescription = override?.altDescription || label.toLowerCase()

      return {
        key,
        label,
        src: projectImage(folder, filename),
        alt: `${project.title} ${altDescription}`,
      }
    })
    .filter(Boolean)

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
  shotOverrides,
  featured = false,
  thumbnailImage,
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
    thumbnailImage,
    category,
    shortDescription,
    summary: shortDescription,
    story,
    mapQuery,
    tags,
    features: baseFeatures[category] || [],
    shotExtension,
  }

  project.shots = realPhotography ? createRealShots(folder, project, shotOverrides) : createPlaceholderShots(project)
  project.heroImage = project.shots[0]?.src || null
  project.heroShot = project.shots[0]
  project.thumbnailImage = project.heroImage
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
    shotExtension: 'webp',
    featured: true,
    thumbnailImage: projectThumbnail('34-antwerp-street-auburn.webp'),
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
    shotExtension: 'jpg',
    shotOverrides: {
      front: { filename: 'rear.jpg' },
      rear: { filename: 'side.jpg' },
      side: { filename: 'front.jpg', label: 'Front Balcony', altDescription: 'front balcony' },
      detail: { filename: 'detail.jpg', label: 'Backyard', altDescription: 'backyard' },
    },
    featured: true,
    thumbnailImage: projectThumbnail('21-lewis-street-regents-park.jpg'),
    shortDescription:
      'A premium residential development in Regents Park, displaying highly functional layouts, modern styling, and clean craftsmanship.',
    story:
      'This residential development in Regents Park presents a modern suburban design. With a clear architectural profile, practical use of space, and contemporary fixtures, the project offers connected living areas, considered finishes, and long-term family utility.',
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
    shotExtension: 'jpg',
    shotOverrides: {
      rear: false,
      side: false,
      detail: false,
    },
    featured: true,
    thumbnailImage: projectThumbnail('10-dorian-street-rouse-hill.jpg'),
    shortDescription:
      'A modern duplex in Rouse Hill showcasing strong street presence, premium materials, and a refined family-focused layout.',
    story:
      'This architectural duplex in Rouse Hill presents considered design and practical space planning. External finishes and bright interiors support modern family living and a strong street presence.',
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
    shotOverrides: {
      rear: { filename: 'detail.png', label: 'Aerial Site View', altDescription: 'aerial view of the triplex site' },
      side: { filename: 'side.png', label: 'Frontage Detail', altDescription: 'front exterior and landscaping' },
      interior: { filename: 'interior.png', label: 'Living Area', altDescription: 'living area' },
      detail: { filename: 'rear.png', label: 'Kitchen / Dining', altDescription: 'kitchen and dining area' },
    },
    featured: true,
    thumbnailImage: projectThumbnail('24-the-avenue-canley-vale.webp'),
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
    shotExtension: 'jpg',
    shotOverrides: {
      rear: { filename: 'rear.jpg', label: 'Twilight Exterior', altDescription: 'front exterior at twilight' },
      side: { filename: 'side.jpg', label: 'Entry Detail', altDescription: 'front entry and landscaped path' },
      interior: { filename: 'interior.jpg', label: 'Upper Hallway', altDescription: 'upper hallway' },
      detail: { filename: 'detail.jpg', label: 'Bathroom Detail', altDescription: 'bathroom detail' },
    },
    featured: true,
    thumbnailImage: projectThumbnail('87-the-avenue-canley-vale.jpg'),
    shortDescription:
      'A premium triplex development in Canley Vale, showcasing architectural refinement, smart space utilization, and quality modern finishes.',
    story:
      'This modern triplex development at Canley Vale presents a clean architectural style and functional living. The design uses the site efficiently and combines strong street presence with considered detailing and resolved interiors.',
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
    shotExtension: 'jpg',
    shotOverrides: {
      rear: { filename: 'detail.jpg', label: 'Back Exterior', altDescription: 'back exterior and patio' },
      side: false,
      interior: { filename: 'rear.jpg', label: 'Living Area', altDescription: 'living area' },
      detail: { filename: 'interior.jpg', label: 'Bedroom', altDescription: 'bedroom' },
    },
    featured: true,
    thumbnailImage: projectThumbnail('23-mittiamo-street-canley-heights.jpg'),
    shortDescription:
      'A premium duplex development in Canley Heights featuring a striking contemporary design, clean lines, and high-end residential finishes.',
    story:
      'A modern duplex development designed for family living in Canley Heights. The project features a strong front presence, spacious and light-filled interiors, and a clear connection to private outdoor spaces.',
    mapQuery: '23 Mittiamo Street, Canley Heights NSW 2166',
    tags: ['duplex development Sydney', 'Canley Heights', 'residential construction Sydney'],
  }),
]

export const featuredProjects = projects.filter((project) => project.featured)

export function getProjectBySlug(slug) {
  return projects.find((project) => project.slug === slug)
}
