import { Button } from '../../../components/Button/Button'
import { Container } from '../../../components/Container/Container'
import onceDesktop from '../../../assets/images/home/once-d.webp'
import onceMobile from '../../../assets/images/home/once-m.webp'
import onceTablet from '../../../assets/images/home/once-t.webp'
import styles from './OnceUponSection.module.css'

export function OnceUponSection() {
  return (
    <Container as="section" className={styles.once} aria-labelledby="once-upon-title">
      <div className={styles.content}>
        <div className={styles.text}>
          <h2 id="once-upon-title" className={styles.title}>
            once upon a time..
          </h2>
          <p className={styles.lead}>
            The art of baking runs deep in our family. Growing up on our family we learned from the best. Our mom
            was an amazing baker. She not only taught us how to bake, she passed along her values of quality,
            honesty and integrity.
          </p>
          <Button href="/our-story" className={styles.cta}>
            Our story
          </Button>
        </div>
        <picture className={styles.picture}>
          <source media="(min-width: 1440px)" srcSet={onceDesktop} width={494} height={679} />
          <source media="(min-width: 960px)" srcSet={onceTablet} width={364} height={500} />
          <img
            src={onceMobile}
            alt="A cupcake with blue frosting, a raspberry and a chocolate heart in a yellow paper case"
            width={248}
            height={340}
            loading="lazy"
            className={styles.image}
          />
        </picture>
      </div>
    </Container>
  )
}
