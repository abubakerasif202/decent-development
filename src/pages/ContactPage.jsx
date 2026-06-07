import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Mail, MapPin, Phone } from 'lucide-react'
import Contact from '../components/Contact.jsx'
import PageHero from '../components/PageHero.jsx'
import usePageMeta from '../hooks/usePageMeta.js'
import heroBuilding from '../assets/stitch/hero-building.jpg'

const directionsUrl =
  'https://www.google.com/maps/search/?api=1&query=Level%2014%20275%20Alfred%20St%20North%20North%20Sydney%20NSW%202060'

export default function ContactPage({ company }) {
  usePageMeta({
    title: 'Contact DECENT Development | Sydney Construction Enquiries',
    description:
      'Contact DECENT Development to discuss a premium construction, duplex/triplex development, or project management brief in Sydney and New South Wales.',
    path: '/contact/',
  })

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={
          <>
            Start the conversation
            <br />
            about your next project
          </>
        }
        copy="Use the form below or connect directly. DECENT Development welcomes construction, development, and project management enquiries across New South Wales with a prompt and professional response."
        stats={[
          { label: 'Email', value: 'Prompt response' },
          { label: 'Phone', value: '1800 008 883' },
          { label: 'Location', value: 'North Sydney' },
        ]}
        visual={
          <motion.div
            className="relative mx-auto max-w-xl overflow-hidden rounded-[2rem] border border-gold/20 bg-white/5 p-4 shadow-premium backdrop-blur-sm"
            style={{ transformStyle: 'preserve-3d' }}
            initial={{ opacity: 0, y: 24, rotateY: 8 }}
            whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            whileHover={{ rotateY: 4, rotateX: 3, y: -6 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-ink">
              <img
                src={heroBuilding}
                alt="AI-generated architectural render used for the contact page visual"
                className="aspect-[4/5] h-full w-full object-cover"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute left-5 top-5 rounded-full border border-white/20 bg-black/30 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-ivory backdrop-blur">
                Direct contact
              </div>
              <div className="absolute bottom-5 left-5 right-5 rounded-[1.5rem] border border-white/10 bg-black/35 p-4 backdrop-blur">
                <div className="grid gap-3 sm:grid-cols-3">
                  <div>
                    <Mail className="text-gold" size={18} aria-hidden="true" />
                    <p className="mt-3 text-[10px] font-semibold uppercase tracking-[0.24em] text-smoke">Email</p>
                    <p className="mt-2 text-sm font-semibold text-ivory">{company.email}</p>
                  </div>
                  <div>
                    <Phone className="text-gold" size={18} aria-hidden="true" />
                    <p className="mt-3 text-[10px] font-semibold uppercase tracking-[0.24em] text-smoke">Phone</p>
                    <p className="mt-2 text-sm font-semibold text-ivory">{company.phone}</p>
                  </div>
                  <div>
                    <MapPin className="text-gold" size={18} aria-hidden="true" />
                    <p className="mt-3 text-[10px] font-semibold uppercase tracking-[0.24em] text-smoke">Office</p>
                    <p className="mt-2 text-sm font-semibold text-ivory">North Sydney</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        }
      >
        <blockquote className="mb-6 border-l border-gold/40 pl-5 text-sm font-light italic leading-6 text-smoke">
          Connect with DECENT Development for premium residential construction and property development services in Sydney and wider NSW. Enquiries can be submitted via our secure portal, email (info@decentdevelopment.com.au), or phone (1800 008 883).
        </blockquote>

        <div className="flex flex-wrap gap-4">
          <a
            href={company.phoneHref}
            className="focus-ring gold-gradient-btn inline-flex min-h-12 items-center gap-2 px-6 py-3 text-xs font-bold uppercase"
          >
            Call now
            <Phone size={17} aria-hidden="true" />
          </a>
          <a
            href={`mailto:${company.email}`}
            className="focus-ring outline-gold-btn inline-flex min-h-12 items-center gap-2 px-6 py-3 text-xs font-bold uppercase"
          >
            Email us
          </a>
          <a
            href={directionsUrl}
            target="_blank"
            rel="noreferrer"
            className="focus-ring inline-flex min-h-12 items-center gap-2 border border-gold/30 px-6 py-3 text-xs font-bold uppercase text-ivory transition duration-200 hover:border-gold hover:text-gold"
          >
            Get directions
          </a>
          <Link
            to="/completed-projects"
            className="focus-ring inline-flex min-h-12 items-center gap-2 border border-gold/30 px-6 py-3 text-xs font-bold uppercase text-ivory transition duration-200 hover:border-gold hover:text-gold"
          >
            View portfolio concepts
            <ArrowRight size={17} aria-hidden="true" />
          </Link>
        </div>
      </PageHero>

      <Contact company={company} />

      <span className="sr-only">{company.name}</span>
    </>
  )
}
