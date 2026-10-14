import { EVENT_IMAGES } from '../../data/siteContent'
import { ArrowIcon, SectionEyebrow } from '../ui/SitePrimitives'

export default function AboutSection({ showLink = true, detailed = false }) {
  return (
    <section className="about-feature">
      <div className="about-image-wrap"><img src={EVENT_IMAGES[2]} alt="Publik upplever en kvällsföreställning" loading="lazy" /></div>
      <div className="about-copy reveal">
        <SectionEyebrow>GYK FIREWORKS</SectionEyebrow>
        <h2>Ett starkt butiksnätverk. En gemensam passion för fyrverkerier.</h2>
        {detailed ? (
          <>
            <p>Vår resa började för sex år sedan med en första butik i Karlstad och en passion för fyrverkerier. Sedan dess har GYK Fireworks vuxit till en verksamhet med försäljningsplatser i flera svenska städer. I dag växer vi snabbt och fortsätter att expandera till nya orter.</p>
            <p>Vi säljer fyrverkerier från Vulcan Europe och hjälper våra kunder att hitta rätt produkter för sitt firande. Med personlig service, produktkunskap och ett stort engagemang vill vi göra varje besök hos oss enkelt och inspirerande.</p>
            <p>Säkerhet och ansvar är en självklar del av vårt arbete – från tillstånd och utbildning av personal till hantering och rådgivning i butik. När vi växer tar vi med oss samma engagemang som präglade vår första butik i Karlstad.</p>
          </>
        ) : (
          <>
            <p>GYK Fireworks samlar 12 försäljningsplatser på åtta orter och är Sveriges största återförsäljare för Vulcan Europe. Vårt nätverk gör det enkelt att hitta vidare till fyrverkerier för nyår och andra tillfällen.</p>
            <p>Planerar du ett firande? Kontakta oss och berätta vad du har i åtanke.</p>
          </>
        )}
        {showLink && <a className="text-link" href="/om-gyk">Lär känna GYK <span aria-hidden="true"><ArrowIcon /></span></a>}
      </div>
    </section>
  )
}