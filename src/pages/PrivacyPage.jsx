import { ArrowIcon, PageHeading } from '../components/ui/SitePrimitives'

export default function PrivacyPage() {
  return (
    <main className="inner-page privacy-page">
      <PageHeading breadcrumb="Integritet" eyebrow="INTEGRITET" title="Integritetsinformation" intro="Kontaktformuläret är inte anslutet och samlar inte in eller skickar några uppgifter. När en formulärtjänst och mottagare har valts kompletteras denna sida med information om personuppgiftshantering." />
      <div className="wrap privacy-body"><a className="text-link" href="/kontakt">Till kontakt <span aria-hidden="true"><ArrowIcon /></span></a></div>
    </main>
  )
}