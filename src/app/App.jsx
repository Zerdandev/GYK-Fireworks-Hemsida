import { Footer, Header } from '../components/layout/SiteLayout'
import { stores } from '../data/stores'
import usePageMeta from '../hooks/usePageMeta'
import AboutPage from '../pages/AboutPage'
import ContactPage from '../pages/ContactPage'
import EventsPage from '../pages/EventsPage'
import HomePage from '../pages/HomePage'
import NotFoundPage from '../pages/NotFoundPage'
import PrivacyPage from '../pages/PrivacyPage'
import StorePage from '../pages/StorePage'
import StoresPage from '../pages/StoresPage'
import '../App.css'

const staticPages = {
  '/': HomePage,
  '/butiker': StoresPage,
  '/event': EventsPage,
  '/om-gyk': AboutPage,
  '/kontakt': ContactPage,
  '/integritet': PrivacyPage,
}

export default function App() {
  const path = window.location.pathname.replace(/\/$/, '') || '/'
  const storeSlug = path.startsWith('/butiker/') ? path.slice('/butiker/'.length) : ''
  const selectedStore = stores.find((store) => store.slug === storeSlug)
  const Page = staticPages[path]

  usePageMeta(path, selectedStore)

  return (
    <>
      <Header path={path} />
      {Page ? <Page /> : selectedStore ? <StorePage store={selectedStore} /> : <NotFoundPage />}
      <Footer />
    </>
  )
}