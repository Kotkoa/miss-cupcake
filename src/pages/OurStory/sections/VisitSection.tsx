import { Band } from '../../../components/Band/Band'
import { Container } from '../../../components/Container/Container'
import { MapFacade } from '../../../components/MapFacade/MapFacade'
import { storeMap } from '../../../data/store'
import styles from './VisitSection.module.css'

export function VisitSection() {
  return (
    <Band as="section" color="purple" wave aria-labelledby="visit-title" className={styles.band}>
      <Container className={styles.visit}>
        <h2 id="visit-title" className={styles.title}>
          Come and visit the Miss Cupcake store
        </h2>
        <MapFacade className={styles.map} {...storeMap} />
      </Container>
    </Band>
  )
}
