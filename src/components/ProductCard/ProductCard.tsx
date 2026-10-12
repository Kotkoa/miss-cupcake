import { Button } from '../Button/Button'
import { QuantityStepper } from '../QuantityStepper/QuantityStepper'
import styles from './ProductCard.module.css'

type ProductCardProps = {
  name: string
  description: string
  imageSrc: string
  imageWidth: number
  imageHeight: number
  quantity: number
  onQuantityChange: (next: number) => void
  addToCartLabel: string
  onAddToCart: () => void
}

export function ProductCard({
  name,
  description,
  imageSrc,
  imageWidth,
  imageHeight,
  quantity,
  onQuantityChange,
  addToCartLabel,
  onAddToCart,
}: ProductCardProps) {
  return (
    <article className={styles.card}>
      <img src={imageSrc} alt="" width={imageWidth} height={imageHeight} className={styles.image} />
      <h3 className={styles.name}>{name}</h3>
      <p className={styles.description}>{description}</p>
      <div className={styles.actions}>
        <QuantityStepper value={quantity} onChange={onQuantityChange} itemLabel={name} />
        <Button className={styles.add} onClick={onAddToCart}>
          {addToCartLabel}
        </Button>
      </div>
    </article>
  )
}
