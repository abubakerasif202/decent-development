import Collaboration from '../components/Collaboration.jsx'
import PageHero from '../components/PageHero.jsx'
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
      />
      <Collaboration />
    </>
  )
}
