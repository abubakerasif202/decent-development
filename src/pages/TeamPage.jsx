import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Building2, ClipboardCheck } from 'lucide-react'
import PageHero from '../components/PageHero.jsx'
import Team from '../components/Team.jsx'
import usePageMeta from '../hooks/usePageMeta.js'
import projectCommercial from '../assets/stitch/project-commercial.jpg'

export default function TeamPage({ company, teamAssets }) {
  const teamSchemas = [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      'itemListElement': [
        {
          '@type': 'ListItem',
          'position': 1,
          'name': 'Home',
          'item': 'https://decentdevelopment.com.au/',
        },
        {
          '@type': 'ListItem',
          'position': 2,
          'name': 'Meet the Team',
          'item': 'https://decentdevelopment.com.au/meet-the-team/',
        },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'AboutPage',
      'name': 'Meet the Team | DECENT Development',
      'description':
        'Meet the specialist project managers and building professionals behind DECENT Development’s premium delivery approach.',
      'url': 'https://decentdevelopment.com.au/meet-the-team/',
      'mainEntity': {
        '@type': 'ItemList',
        'name': 'DECENT Development Team Members',
        'itemListElement': [
          {
            '@type': 'Person',
            'name': 'Nemat Haidari',
            'jobTitle': 'Specialist Project Manager',
            'description': 'Brings two decades of construction insight to disciplined project delivery.',
            'worksFor': {
              '@type': 'Organization',
              'name': 'DECENT Development',
              'url': 'https://decentdevelopment.com.au/',
            },
          },
          {
            '@type': 'Person',
            'name': 'Mohammad Mohsini',
            'jobTitle': 'Certified Builder & Specialist Project Manager',
            'description': 'Combines certified building expertise with a practical, client-focused approach.',
            'worksFor': {
              '@type': 'Organization',
              'name': 'DECENT Development',
              'url': 'https://decentdevelopment.com.au/',
            },
          },
          {
            '@type': 'Person',
            'name': 'Hussain Jafari',
            'jobTitle': 'Home & Land Package Specialist',
            'description': 'Focuses on streamlined home-and-land package outcomes with a polished finish.',
            'worksFor': {
              '@type': 'Organization',
              'name': 'DECENT Development',
              'url': 'https://decentdevelopment.com.au/',
            },
          },
        ],
      },
    },
  ]

  usePageMeta({
    title: 'Meet the Team | DECENT Development',
    description:
      'Meet the specialist project managers and building professionals behind DECENT Development’s premium delivery approach.',
    path: '/meet-the-team/',
    schemas: teamSchemas,
  })

  return (
    <>
      <PageHero
        eyebrow="Meet the team"
        title={
          <>
            Specialists who guide
            <br />
            every project forward
          </>
        }
        copy="DECENT Development brings together construction knowledge, project discipline, and practical site experience to deliver a polished, well-managed building journey from start to finish."
        stats={[
          { label: 'Construction focus', value: '20+ years' },
          { label: 'Project management', value: 'End to end' },
          { label: 'Residential expertise', value: 'Sydney based' },
        ]}
        visual={
          <motion.div
            className="relative mx-auto max-w-xl overflow-hidden rounded-[2rem] border border-gold/20 bg-white/5 p-4 shadow-premium backdrop-blur-sm"
            style={{ transformStyle: 'preserve-3d' }}
            initial={{ opacity: 0, y: 24, rotateY: -8 }}
            whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            whileHover={{ rotateY: -4, rotateX: 3, y: -6 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-ink">
              <img
                src={projectCommercial}
                alt="AI-generated interior render used for the team page visual"
                className="aspect-[4/5] h-full w-full object-cover"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute left-5 top-5 rounded-full border border-white/20 bg-black/30 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-ivory backdrop-blur">
                Team overview
              </div>
              <div className="absolute bottom-5 left-5 right-5 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-black/35 px-4 py-4 backdrop-blur">
                  <Building2 className="text-gold" size={18} aria-hidden="true" />
                  <p className="mt-3 text-sm font-semibold text-ivory">Construction services</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/35 px-4 py-4 backdrop-blur">
                  <ClipboardCheck className="text-gold" size={18} aria-hidden="true" />
                  <p className="mt-3 text-sm font-semibold text-ivory">Project management</p>
                </div>
              </div>
            </div>
          </motion.div>
        }
      >
        <div className="flex flex-wrap gap-4">
          <Link
            to="/contact/"
            className="focus-ring gold-gradient-btn inline-flex min-h-12 items-center gap-2 px-6 py-3 text-xs font-bold uppercase"
          >
            Discuss your project
            <ArrowRight size={17} aria-hidden="true" />
          </Link>
          <Link
            to="/completed-projects/"
            className="focus-ring outline-gold-btn inline-flex min-h-12 items-center gap-2 px-6 py-3 text-xs font-bold uppercase"
          >
            View portfolio concepts
          </Link>
        </div>
      </PageHero>

      <Team assets={teamAssets} />

      <span className="sr-only">{company.name}</span>
    </>
  )
}
