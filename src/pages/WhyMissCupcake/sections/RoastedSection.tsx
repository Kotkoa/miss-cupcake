import { Band } from '../../../components/Band/Band'
import { Button } from '../../../components/Button/Button'
import { Container } from '../../../components/Container/Container'
import pixelCupcake from '../../../assets/images/why/pixel-cupcake.webp'
import pixelUnicorn from '../../../assets/images/why/pixel-unicorn.webp'
import pixelUnicornTilted from '../../../assets/images/why/pixel-unicorn-tilted.webp'
import styles from './RoastedSection.module.css'

export function RoastedSection() {
  return (
    <Band as="section" color="blush" wave aria-labelledby="roasted-title" className={styles.band}>
      <Container className={styles.roasted}>
        <div className={styles.content}>
          <h2 id="roasted-title" className={styles.title}>
            Roasted with happiness
          </h2>
          <p className={styles.lead}>
            Each and every item produced by Cupcake Boutique is lovingly handmade, with great pride taken in the
            preparation, baking and delivery
          </p>
          <Button href="/#cupcakes" className={styles.cta}>
            Shop now
          </Button>
          <picture className={styles.unicorn}>
            <source media="(min-width: 960px)" srcSet={pixelUnicorn} width={46} height={60} />
            <img src={pixelUnicornTilted} alt="" aria-hidden="true" width={65} height={70} />
          </picture>
          <img
            src={pixelCupcake}
            alt=""
            aria-hidden="true"
            width={59}
            height={55}
            className={styles.cupcake}
          />
        </div>
      </Container>
    </Band>
  )
}
