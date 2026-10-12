import { Button } from '../../../components/Button/Button'
import { Container } from '../../../components/Container/Container'
import heroDesktop from '../../../assets/images/home/hero-d.webp'
import heroMobile from '../../../assets/images/home/hero-m.webp'
import heroTablet from '../../../assets/images/home/hero-t.webp'
import styles from './HeroSection.module.css'

export function HeroSection() {
  return (
    <Container as="section" className={styles.hero} aria-labelledby="hero-title">
      <h1 id="hero-title" className={styles.title}>
        Miss cupcake
      </h1>
      <p className={styles.lead}>
        We are proud to offer cupcakes and cakes that are freshly baked within hours, if not minutes, for your
        enjoyment.
      </p>
      <Button href="#cupcakes" className={styles.cta}>
        SHOP NOW
      </Button>
      <picture className={styles.picture}>
        <source media="(min-width: 1440px)" srcSet={heroDesktop} width={532} height={711} />
        <source media="(min-width: 960px)" srcSet={heroTablet} width={365} height={716} />
        <img
          src={heroMobile}
          alt="Three cupcakes with pink, chocolate and strawberry toppings floating in the air"
          width={266}
          height={356}
          className={styles.image}
          fetchPriority="high"
        />
      </picture>
    </Container>
  )
}
