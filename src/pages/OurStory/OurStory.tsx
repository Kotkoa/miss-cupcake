import { Band } from '../../components/Band/Band'
import { Container } from '../../components/Container/Container'
import { Footer } from '../../components/Footer/Footer'
import { SiteHeader } from '../../components/SiteHeader/SiteHeader'
import { footerNavLinks, footerText, legalLinks } from '../../data/navigation'
import styles from './OurStory.module.css'
import { CelebratingSection } from './sections/CelebratingSection'
import { HeroSection } from './sections/HeroSection'
import { SimpleLifeSection } from './sections/SimpleLifeSection'
import { VisitSection } from './sections/VisitSection'

export function OurStory() {
  return (
    <div className={styles.page}>
      <SiteHeader />
      <main>
        <HeroSection />
        <CelebratingSection />
        <SimpleLifeSection />
        <VisitSection />
      </main>
      {/* Same purple as the map section above, so there is no wave between them. */}
      <Band color="purple" className={styles.footerBand}>
        <Container className={styles.footerWrap}>
          <Footer {...footerText} navLinks={footerNavLinks} legalLinks={legalLinks} />
        </Container>
      </Band>
    </div>
  )
}
