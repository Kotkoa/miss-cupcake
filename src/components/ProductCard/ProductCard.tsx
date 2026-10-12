import type { CSSProperties } from 'react'
import { Button } from '../Button/Button'
import { QuantityStepper } from '../QuantityStepper/QuantityStepper'
import styles from './ProductCard.module.css'

type ProductCardProps = {
  name: string
  description: string
  imageSrc: string
  imageWidth: number
  imageHeight: number
  /** Display width below 960px, when the Figma image is smaller; omit to keep imageWidth. */
  imageMobileWidth?: number
  quantity: number
  /** Lowest quantity the stepper allows (1 when the card adds to a cart). */
  minQuantity?: number
  /** Highest quantity the stepper allows. */
  maxQuantity?: number
  onQuantityChange: (next: number) => void
  addToCartLabel: string
  onAddToCart: () => void
  /** Announced to screen readers ("Added to cart"); empty most of the time. */
  statusMessage?: string
}

export function ProductCard({
  name,
  description,
  imageSrc,
  imageWidth,
  imageHeight,
  imageMobileWidth,
  quantity,
  minQuantity = 0,
  maxQuantity,
  onQuantityChange,
  addToCartLabel,
  onAddToCart,
  statusMessage = '',
}: ProductCardProps) {
  return (
    <article className={styles.card}>
      <img
        src={imageSrc}
        alt=""
        width={imageWidth}
        height={imageHeight}
        loading="lazy"
        className={styles.image}
        style={
          {
            '--image-width': `${imageWidth}px`,
            aspectRatio: `${imageWidth} / ${imageHeight}`,
            ...(imageMobileWidth ? { '--image-mobile-width': `${imageMobileWidth}px` } : null),
          } as CSSProperties
        }
      />
      <h3 className={styles.name}>{name}</h3>
      <p className={styles.description}>{description}</p>
      <div className={styles.actions}>
        <QuantityStepper value={quantity} min={minQuantity} max={maxQuantity} onChange={onQuantityChange} itemLabel={name} />
        <Button className={styles.add} onClick={onAddToCart}>
          {addToCartLabel}
        </Button>
      </div>
      <p role="status" className={styles.visuallyHidden}>
        {statusMessage}
      </p>
    </article>
  )
}
