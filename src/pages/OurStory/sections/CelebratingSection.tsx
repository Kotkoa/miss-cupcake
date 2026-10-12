import { Band } from '../../../components/Band/Band'
import { Container } from '../../../components/Container/Container'
import styles from './CelebratingSection.module.css'

export function CelebratingSection() {
  return (
    <Band as="section" color="purple" wave aria-labelledby="celebrating-title" className={styles.band}>
      <Container className={styles.celebrating}>
        <h2 id="celebrating-title" className={styles.title}>
          Celebrating the little things
        </h2>
        <div className={styles.lead}>
          <p>
            We believe in celebrating the little things, working hard, supporting one another and baking the best
            cupcakes we can. We work on creating a caring community through baking.
          </p>
          <p>
            We are committed to building a work environment where we can all learn, grow and be our best selves.
          </p>
        </div>
        {/* No poster: the first frame is the preview (#t=0.1 makes Safari paint it). */}
        <video
          className={styles.video}
          src="/media/our-story.mp4#t=0.1"
          controls
          preload="metadata"
          playsInline
          aria-label="Cupcake turning on a stand"
        />
      </Container>
    </Band>
  )
}
