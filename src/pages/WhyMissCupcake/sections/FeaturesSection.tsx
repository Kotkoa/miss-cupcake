import { Container } from '../../../components/Container/Container'
import exploded from '../../../assets/images/why/exploded.webp'
import explodedSmall from '../../../assets/images/why/exploded-m.webp'
import handmadeIcon from '../../../assets/images/why/icons/handmade.webp'
import recipesIcon from '../../../assets/images/why/icons/recipes.webp'
import swirlIcon from '../../../assets/images/why/icons/swirl.webp'
import styles from './FeaturesSection.module.css'

/* DOM order is the Mobile frame order; Tablet and Desktop place the items around the picture with grid lines. */
const features = [
  {
    id: 'handmade',
    icon: handmadeIcon,
    text: 'Each and every item produced by Cupcake Boutique is lovingly handmade, with great pride taken in the preparation, baking and delivery.',
  },
  {
    id: 'recipes',
    icon: recipesIcon,
    text: 'The recipes are inspired by both authentic local ingredients, as well as international favourites.',
  },
  {
    id: 'swirl',
    icon: swirlIcon,
    text: 'From the iconic swirl and modern dot to the specially sourced ingredients, our cupcakes are the definition of quality.',
  },
] as const

export function FeaturesSection() {
  return (
    <Container as="section" aria-label="What makes our cupcakes special" className={styles.features}>
      <div className={styles.exploded}>
        <img
          src={exploded}
          srcSet={`${explodedSmall} 562w, ${exploded} 802w`}
          sizes="(min-width: 1440px) 802px, (min-width: 960px) 561px, 281px"
          alt="A chocolate cupcake pulled apart: frosting, sponge and paper case"
          width={802}
          height={899}
          className={styles.image}
        />
        <ul className={styles.list}>
          {features.map((feature) => (
            <li key={feature.id} className={`${styles.feature} ${styles[feature.id]}`}>
              <img src={feature.icon} alt="" width={120} height={120} className={styles.icon} />
              <p className={styles.text}>{feature.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </Container>
  )
}
