import { Band } from '../../../components/Band/Band'
import { Container } from '../../../components/Container/Container'
import onceDesktop from '../../../assets/images/home/once-d.webp'
import onceMobile from '../../../assets/images/home/once-m.webp'
import onceTablet from '../../../assets/images/home/once-t.webp'
import styles from './HeroSection.module.css'

export function HeroSection() {
  return (
    <Band as="section" color="cream" aria-labelledby="our-story-title">
      <Container className={styles.hero}>
        <div className={styles.content}>
          <div className={styles.text}>
            <h1 id="our-story-title" className={styles.title}>
              once upon a time..
            </h1>
            <p className={styles.lead}>
              The art of baking runs deep in our family. Growing up on our family we learned from the best. Our mom
              was an amazing baker. She not only taught us how to bake, she passed along her values of quality,
              honesty and integrity.
            </p>
          </div>
          <picture className={styles.picture}>
            <source media="(min-width: 1440px)" srcSet={onceDesktop} width={494} height={679} />
            <source media="(min-width: 960px)" srcSet={onceTablet} width={375} height={515} />
            <img
              src={onceMobile}
              alt="A cupcake with blue frosting, a raspberry and a chocolate heart in a yellow paper case"
              width={248}
              height={340}
              className={styles.image}
            />
          </picture>
        </div>
      </Container>
    </Band>
  )
}
