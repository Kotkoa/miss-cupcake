import { Button } from '../../../components/Button/Button'
import { Container } from '../../../components/Container/Container'
import decorCupcake from '../../../assets/images/why/decor-cupcake.webp'
import decorMobile from '../../../assets/images/why/decor-mobile.webp'
import decorPair from '../../../assets/images/why/decor-pair.webp'
import styles from './HeroSection.module.css'

export function HeroSection() {
  return (
    <Container as="section" aria-labelledby="why-title" className={styles.hero}>
      <div className={styles.content}>
        <h1 id="why-title" className={styles.title}>
          The Simple, Sweet Life
        </h1>
        <p className={styles.lead}>
          We are proud to offer cupcakes and cakes that are freshly baked within hours, if not minutes, for your
          enjoyment.
        </p>
        <Button href="/#cupcakes" className={styles.cta}>
          Shop now
        </Button>
        {/* Decorative: Tablet and Desktop get two separate pieces, Mobile one picture with both. */}
        <img src={decorCupcake} alt="" aria-hidden="true" width={246} height={252} className={styles.decorCupcake} />
        <img src={decorPair} alt="" aria-hidden="true" width={193} height={292} className={styles.decorPair} />
        <img src={decorMobile} alt="" aria-hidden="true" width={319} height={161} className={styles.decorMobile} />
      </div>
    </Container>
  )
}
