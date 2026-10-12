import type { ElementType, HTMLAttributes } from 'react'
import styles from './Band.module.css'

type BandColor = 'pink' | 'yellow' | 'mint' | 'cream' | 'purple'

type BandProps = HTMLAttributes<HTMLElement> & {
  as?: ElementType
  color: BandColor
  /** Draw the wavy edge above the band (every band except the first). */
  wave?: boolean
  /** Mirror the wave so neighbouring edges do not look identical. */
  flip?: boolean
}

/**
 * Full-width colored band. The wavy top edge is an SVG mask on a ::before layer, so the shape
 * comes from one file and the color from tokens. Set --wave-height on the element to resize it.
 */
export function Band({ as: Tag = 'div', color, wave = false, flip = false, className, ...rest }: BandProps) {
  const classes = [styles.band, styles[color], wave && styles.wave, wave && flip && styles.flip, className]
    .filter(Boolean)
    .join(' ')
  return <Tag {...rest} className={classes} />
}
