import { Band } from '../../../components/Band/Band'
import { Button } from '../../../components/Button/Button'
import { Container } from '../../../components/Container/Container'
import desktopMain from '../../../assets/images/our-story/simple-d-main.webp'
import desktopSmall from '../../../assets/images/our-story/simple-d-small.webp'
import mobile from '../../../assets/images/our-story/simple-m.webp'
import tablet from '../../../assets/images/our-story/simple-t.webp'
import styles from './SimpleLifeSection.module.css'

const alt = 'Cupcakes with chocolate and pink frosting, one topped with a chocolate-dipped strawberry'

export function SimpleLifeSection() {
  return (
    <Band as="section" color="cream" wave flip aria-labelledby="simple-life-title" className={styles.band}>
      <Container className={styles.simple}>
        <div className={styles.content}>
          <div className={styles.text}>
            <h2 id="simple-life-title" className={styles.title}>
              The Simple, Sweet Life
            </h2>
            <p className={styles.lead}>
              We are proud to offer cupcakes and cakes that are freshly baked within hours, if not minutes, for your
              enjoyment.
            </p>
            <Button href="/why-miss-cupcake" className={styles.cta}>
              Why Miss cupcake
            </Button>
          </div>
          <picture className={styles.picture}>
            <source media="(min-width: 960px)" srcSet={tablet} width={283} height={699} />
            <img src={mobile} alt={alt} width={186} height={323} loading="lazy" className={styles.image} />
          </picture>
          <div className={styles.desktopImages}>
            <img src={desktopSmall} alt="" width={189} height={194} loading="lazy" className={styles.desktopSmall} />
            <img src={desktopMain} alt={alt} width={353} height={536} loading="lazy" className={styles.desktopMain} />
          </div>
        </div>
      </Container>
    </Band>
  )
}
