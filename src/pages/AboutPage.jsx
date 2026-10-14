import AboutSection from '../components/about/AboutSection'
import { ButtonLink, PageHeading } from '../components/ui/SitePrimitives'

export default function AboutPage() {
  return (
    <main className="inner-page about-page">
      <PageHeading breadcrumb="Om oss" eyebrow="OM GYK FIREWORKS" title="En gemensam passion för fyrverkerier." intro="Ett starkt nätverk av försäljningsplatser och en tydlig koppling till Vulcan Europe." />
      <AboutSection showLink={false} detailed />
      <section className="about-facts wrap"><div><strong>12</strong><span>försäljningsplatser</span></div><div><strong>8</strong><span>orter</span></div><div><strong>Vulcan</strong><span>vår partner</span></div></section>
      <div className="about-cta wrap"><p>Hitta en försäljningsplats nära dig eller berätta om ett kommande event.</p><ButtonLink href="/butiker" variant="navy">Hitta butik & beställ</ButtonLink></div>
    </main>
  )
}