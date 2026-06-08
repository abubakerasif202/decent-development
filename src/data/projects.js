const projectImage = (folder, filename) => `/projects/${folder}/${filename}`

const highlightSets = {
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

export const projects = [
  {
    id: 'auburn-34-antwerp',
    slug: 'auburn-duplex-development',
    title: 'Auburn Duplex Development',
    address: '34 Antwerp Street, Auburn NSW 2144',
    suburb: 'Auburn',
    type: 'Duplex Development',
    category: 'duplex',
    status: 'Completed',
    featured: true,
    summary:
      'A contemporary duplex development showcasing modern architectural design, refined street presence and quality residential construction.',
    story:
      'A contemporary duplex development showcasing modern architectural design, refined street presence and quality residential construction. The project features a strong modern facade, premium stone detailing, clean geometric forms and a family-focused layout designed for comfortable modern living.',
    folder: 'auburn',
    heroImage: projectImage('auburn', 'hero.webp'),
    images: [
      projectImage('auburn', 'hero.webp'),
      projectImage('auburn', 'street.webp'),
      projectImage('auburn', 'detail.webp'),
      projectImage('auburn', 'gallery-1.webp'),
      projectImage('auburn', 'gallery-2.webp'),
      projectImage('auburn', 'gallery-3.webp'),
    ],
    tags: ['duplex development Sydney', 'Auburn', 'residential construction Sydney'],
    highlights: highlightSets.duplex,
  },
  {
    id: 'regents-park-21-lewis',
    slug: 'regents-park-residential-development',
    title: 'Regents Park Residential Development',
    address: '21 Lewis Street, Regents Park NSW 2143',
    suburb: 'Regents Park',
    type: 'Residential Development',
    category: 'residential',
    status: 'Completed',
    featured: false,
    summary:
      'A completed residential development focused on practical family living, quality construction and efficient use of land.',
    story:
      'A completed residential development focused on practical family living, quality construction and efficient use of land. Designed to suit the established character of Regents Park while delivering modern comfort, functionality and long-term value.',
    folder: 'regents-park',
    heroImage: projectImage('regents-park', 'hero.webp'),
    images: [
      projectImage('regents-park', 'hero.webp'),
      projectImage('regents-park', 'street.webp'),
      projectImage('regents-park', 'detail.webp'),
      projectImage('regents-park', 'gallery-1.webp'),
      projectImage('regents-park', 'gallery-2.webp'),
      projectImage('regents-park', 'gallery-3.webp'),
    ],
    tags: ['completed residential projects', 'Regents Park', 'construction and property development NSW'],
    highlights: highlightSets.residential,
  },
  {
    id: 'rouse-hill-10-dorian',
    slug: 'rouse-hill-duplex-development',
    title: 'Rouse Hill Duplex Development',
    address: '10 Dorian Street, Rouse Hill NSW 2155',
    suburb: 'Rouse Hill',
    type: 'Duplex Development',
    category: 'duplex',
    status: 'Completed',
    featured: true,
    summary:
      'A modern duplex development in Rouse Hill delivering contemporary family living with strong street appeal.',
    story:
      "A modern duplex development in Rouse Hill delivering contemporary family living with strong street appeal. The project combines brickwork, rendered finishes, balcony detailing and clean architectural lines to create a premium residential outcome in one of Sydney's growing family suburbs.",
    folder: 'rouse-hill',
    heroImage: projectImage('rouse-hill', 'hero.webp'),
    images: [
      projectImage('rouse-hill', 'hero.webp'),
      projectImage('rouse-hill', 'street.webp'),
      projectImage('rouse-hill', 'detail.webp'),
      projectImage('rouse-hill', 'gallery-1.webp'),
      projectImage('rouse-hill', 'gallery-2.webp'),
      projectImage('rouse-hill', 'gallery-3.webp'),
    ],
    tags: ['duplex development Sydney', 'Rouse Hill', 'completed residential projects'],
    highlights: highlightSets.duplex,
  },
  {
    id: 'canley-vale-24-the-avenue',
    slug: 'canley-vale-triplex-development-24-the-avenue',
    title: 'Canley Vale Triplex Development',
    address: '24 The Avenue, Canley Vale NSW 2166',
    suburb: 'Canley Vale',
    type: 'Triplex Development',
    category: 'triplex',
    status: 'Completed',
    featured: true,
    summary:
      'A premium triplex development delivering three modern residences with a strong streetscape presence.',
    story:
      "A premium triplex development delivering three modern residences with a strong streetscape presence. The project highlights Decent Development's capability in multi-dwelling residential construction, with contemporary facade treatments, glass balconies, detailed brickwork and practical family-oriented layouts.",
    folder: 'canley-vale-24',
    heroImage: projectImage('canley-vale-24', 'hero.webp'),
    images: [
      projectImage('canley-vale-24', 'hero.webp'),
      projectImage('canley-vale-24', 'street.webp'),
      projectImage('canley-vale-24', 'detail.webp'),
      projectImage('canley-vale-24', 'gallery-1.webp'),
      projectImage('canley-vale-24', 'gallery-2.webp'),
      projectImage('canley-vale-24', 'gallery-3.webp'),
    ],
    tags: ['triplex development Sydney', 'Canley Vale', 'multi-dwelling residential construction'],
    highlights: highlightSets.triplex,
  },
  {
    id: 'canley-vale-87-the-avenue',
    slug: 'canley-vale-triplex-development-87-the-avenue',
    title: 'The Avenue Triplex Collection',
    address: '87 The Avenue, Canley Vale NSW 2166',
    suburb: 'Canley Vale',
    type: 'Triplex Development',
    category: 'triplex',
    status: 'Completed',
    featured: false,
    summary:
      'A completed triplex project designed to maximise land potential while maintaining a clean, modern residential presentation.',
    story:
      "A completed triplex project designed to maximise land potential while maintaining a clean, modern residential presentation. With multiple residences, landscaped street frontage and contemporary architectural form, this project demonstrates Decent Development's experience in delivering quality multi-unit developments.",
    folder: 'canley-vale-87',
    heroImage: projectImage('canley-vale-87', 'hero.webp'),
    images: [
      projectImage('canley-vale-87', 'hero.webp'),
      projectImage('canley-vale-87', 'street.webp'),
      projectImage('canley-vale-87', 'detail.webp'),
      projectImage('canley-vale-87', 'gallery-1.webp'),
      projectImage('canley-vale-87', 'gallery-2.webp'),
      projectImage('canley-vale-87', 'gallery-3.webp'),
    ],
    tags: ['triplex development Sydney', 'Canley Vale', 'Sydney property developer'],
    highlights: highlightSets.triplex,
  },
  {
    id: 'canley-heights-23-mittiamo',
    slug: 'canley-heights-duplex-development',
    title: 'Canley Heights Duplex Development',
    address: '23 Mittiamo Street, Canley Heights NSW 2166',
    suburb: 'Canley Heights',
    type: 'Duplex Development',
    category: 'duplex',
    status: 'Completed',
    featured: false,
    summary:
      'A modern duplex development built for practical family living with a contemporary facade and quality exterior finishes.',
    story:
      "A modern duplex development built for practical family living with a contemporary facade, quality exterior finishes and a strong suburban streetscape presence. The project reflects Decent Development's attention to detail across design, construction and presentation.",
    folder: 'canley-heights',
    heroImage: projectImage('canley-heights', 'hero.webp'),
    images: [
      projectImage('canley-heights', 'hero.webp'),
      projectImage('canley-heights', 'street.webp'),
      projectImage('canley-heights', 'detail.webp'),
      projectImage('canley-heights', 'gallery-1.webp'),
      projectImage('canley-heights', 'gallery-2.webp'),
      projectImage('canley-heights', 'gallery-3.webp'),
    ],
    tags: ['duplex development Sydney', 'Canley Heights', 'residential construction Sydney'],
    highlights: highlightSets.duplex,
  },
]

export const featuredProjects = projects.filter((project) => project.featured)

export function getProjectBySlug(slug) {
  return projects.find((project) => project.slug === slug)
}
