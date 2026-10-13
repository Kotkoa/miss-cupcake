import { Band } from '../../components/Band/Band'
import { Container } from '../../components/Container/Container'
import { SiteFooter } from '../../components/SiteFooter/SiteFooter'
import { Main } from '../../components/Main/Main'
import { SiteHeader } from '../../components/SiteHeader/SiteHeader'
import styles from './OurStory.module.css'
import { CelebratingSection } from './sections/CelebratingSection'
import { HeroSection } from './sections/HeroSection'
import { SimpleLifeSection } from './sections/SimpleLifeSection'
import { VisitSection } from './sections/VisitSection'

export function OurStory() {
  return (
    <div className={styles.page}>
      <title>Our story – Miss Cupcake</title>
      <SiteHeader />
      <Main>
        <HeroSection />
        <CelebratingSection />
        <SimpleLifeSection />
        <VisitSection />
      </Main>
      {/* Same purple as the map section above, so there is no wave between them. */}
      <Band color="purple" className={styles.footerBand}>
        <Container className={styles.footerWrap}>
          <SiteFooter />
        </Container>
      </Band>
    </div>
  )
}
