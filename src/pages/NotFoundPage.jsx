import { Breadcrumbs, ButtonLink, SectionEyebrow } from '../components/ui/SitePrimitives'

export default function NotFoundPage() {
  return (
    <main className="not-found wrap">
      <Breadcrumbs current="Sidan hittades inte" standalone={false} />
      <SectionEyebrow>404</SectionEyebrow>
      <h1>Sidan kunde inte hittas.</h1>
      <ButtonLink href="/" variant="navy">Till startsidan</ButtonLink>
    </main>
  )
}