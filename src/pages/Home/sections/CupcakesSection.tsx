import { Band } from '../../../components/Band/Band'
import { Container } from '../../../components/Container/Container'
import { ProductCard } from '../../../components/ProductCard/ProductCard'
import { cupcakes } from '../../../data/cupcakes'
import styles from './CupcakesSection.module.css'

type CupcakesSectionProps = {
  quantities: Record<string, number>
  /** Card whose "add to cart" was just pressed. */
  addedId: string | null
  onQuantityChange: (id: string, next: number) => void
  onAddToCart: (id: string) => void
}

export function CupcakesSection({ quantities, addedId, onQuantityChange, onAddToCart }: CupcakesSectionProps) {
  return (
    <Band as="section" color="mint" wave flip id="cupcakes" aria-labelledby="cupcakes-title" className={styles.band}>
      <Container className={styles.cupcakes}>
        <h2 id="cupcakes-title" className={styles.title}>
          Make your day a little sweeter
        </h2>
        <div className={styles.grid}>
          {cupcakes.map((cupcake) => (
            <ProductCard
              key={cupcake.id}
              name={cupcake.name}
              description={cupcake.description}
              imageSrc={cupcake.image.src}
              imageWidth={cupcake.image.width}
              imageHeight={cupcake.image.height}
              imageMobileWidth={cupcake.image.mobileWidth}
              quantity={quantities[cupcake.id]}
              minQuantity={1}
              onQuantityChange={(next) => onQuantityChange(cupcake.id, next)}
              addToCartLabel="add to cart"
              onAddToCart={() => onAddToCart(cupcake.id)}
              statusMessage={addedId === cupcake.id ? 'Added to cart' : ''}
            />
          ))}
        </div>
      </Container>
    </Band>
  )
}
