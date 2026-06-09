const projectImage = (folder, filename) => `/projects/${folder}/${filename}`
const projectThumbnail = (filename) => `/projects/thumbnails/${filename}`

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
    featured: true,
    thumbnailImage: projectThumbnail('21-lewis-street-regents-park.jpg'),
    shortDescription:
      'A premium residential development in Regents Park, displaying highly functional layouts, modern styling, and clean craftsmanship.',
    story:
      'This completed residential development in Regents Park sets a benchmark for modern suburban living. Boasting a striking architectural profile, refined space optimization, and hand-selected modern fixtures, the project offers a seamless flow, quality finishes, and long-term family utility.',
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
    featured: true,
    thumbnailImage: projectThumbnail('10-dorian-street-rouse-hill.jpg'),
    shortDescription:
      'A modern duplex in Rouse Hill showcasing strong street presence, premium materials, and a refined family-focused layout.',
    story:
      'This architectural duplex in Rouse Hill exemplifies sophisticated design and smart space planning. Built to the highest standards with premium external finishes and bright, spacious interiors, the project delivers modern family luxury and strong street appeal, establishing a standout benchmark in the area.',
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
    featured: true,
    thumbnailImage: projectThumbnail('87-the-avenue-canley-vale.jpg'),
    shortDescription:
      'A premium triplex development in Canley Vale, showcasing architectural refinement, smart space utilization, and quality modern finishes.',
    story:
      'This modern triplex development at Canley Vale delivers clean architectural style and functional living. Designed for optimal land use and high-end aesthetics, the project boasts strong street appeal, premium detailing, and beautifully resolved interiors built to exceptional standards.',
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
    featured: true,
    thumbnailImage: projectThumbnail('23-mittiamo-street-canley-heights.jpg'),
    shortDescription:
      'A premium duplex development in Canley Heights featuring a striking contemporary design, clean lines, and high-end residential finishes.',
    story:
      'A modern duplex development that showcases architectural excellence and modern family living in Canley Heights. Built with precision and premium materials, the project features a commanding front presence, spacious and light-filled interiors, and a seamless connection to the private outdoor spaces, designed to stand the test of time.',
    mapQuery: '23 Mittiamo Street, Canley Heights NSW 2166',
    tags: ['duplex development Sydney', 'Canley Heights', 'residential construction Sydney'],
  }),
]

export const featuredProjects = projects.filter((project) => project.featured)

export function getProjectBySlug(slug) {
  return projects.find((project) => project.slug === slug)
}
