import { Button } from '../../../components/Button/Button'
import { Container } from '../../../components/Container/Container'
import simpleDesktopBottom from '../../../assets/images/home/simple-d2.webp'
import simpleDesktopTop from '../../../assets/images/home/simple-d1.webp'
import simpleMobile from '../../../assets/images/home/simple-m.webp'
import simpleTablet from '../../../assets/images/home/simple-t.webp'
import styles from './SimpleLifeSection.module.css'

const alt = 'A chocolate cupcake with its swirl of frosting lifted above it'

export function SimpleLifeSection() {
  return (
    <Container as="section" className={styles.simple} aria-labelledby="simple-life-title">
      <div className={styles.text}>
        <h2 id="simple-life-title" className={styles.title}>
          The Simple, Sweet Life
        </h2>
        <p className={styles.lead}>
          Our cupcakes are always made with the finest ingredients, creating a spark that makes your taste buds
          dance. You’ll want to indulge in each and every decadent flavor.
        </p>
        <Button href="/why-miss-cupcake" className={styles.cta}>
          Why Miss cupcake
        </Button>
      </div>
      <picture className={styles.picture}>
        <source media="(min-width: 960px)" srcSet={simpleTablet} width={322} height={399} />
        <img src={simpleMobile} alt={alt} width={301} height={372} loading="lazy" className={styles.image} />
      </picture>
      <div className={styles.desktopImages}>
        <img src={simpleDesktopTop} alt={alt} width={430} height={240} loading="lazy" className={styles.desktopTop} />
        <img src={simpleDesktopBottom} alt="" width={396} height={253} loading="lazy" className={styles.desktopBottom} />
      </div>
    </Container>
  )
}
