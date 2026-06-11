import Collaboration from '../components/Collaboration.jsx'
import PageHero from '../components/PageHero.jsx'
import milestoneDevelopmentLogo from '../assets/collaboration/milestone-live/logo-mark.svg'
import usePageMeta from '../hooks/usePageMeta.js'

export default function CollaborationPage() {
  usePageMeta({
    title: 'Construction Collaboration Partners | DECENT Development',
    description:
      'Meet the trusted construction partners DECENT Development collaborates with to deliver larger and more complex residential projects across NSW.',
    path: '/collaboration/',
  })

  return (
    <>
      <PageHero
        eyebrow="Trusted delivery partners"
        title="Built for larger, more complex projects"
        copy="DECENT Development collaborates with established building companies when a project needs additional capacity, specialist expertise, or broader technical coordination."
        stats={[
          { label: 'Completed projects', value: '28+' },
          { label: 'Delivery model', value: 'Collaborative' },
          { label: 'Project focus', value: 'Larger builds' },
        ]}
        visual={
          <div className="flex min-h-80 items-center justify-center border border-gold/20 bg-charcoal p-8 shadow-[0_30px_70px_rgba(0,0,0,0.35)]">
            <img
              src={milestoneDevelopmentLogo}
              alt="Milestone Development partner logo"
              className="max-h-64 w-full max-w-md object-contain"
            />
          </div>
        }
      />
      <Collaboration />
    </>
  )
}
