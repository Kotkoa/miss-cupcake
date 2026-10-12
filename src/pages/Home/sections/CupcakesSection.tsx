import { Container } from '../../../components/Container/Container'
import { ProductCard } from '../../../components/ProductCard/ProductCard'
import { cupcakes } from '../../../data/cupcakes'
import styles from './CupcakesSection.module.css'

type CupcakesSectionProps = {
  quantities: Record<string, number>
  onQuantityChange: (id: string, next: number) => void
  onAddToCart: (id: string) => void
}

export function CupcakesSection({ quantities, onQuantityChange, onAddToCart }: CupcakesSectionProps) {
  return (
    <Container as="section" id="cupcakes" className={styles.cupcakes} aria-labelledby="cupcakes-title">
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
            onQuantityChange={(next) => onQuantityChange(cupcake.id, next)}
            addToCartLabel="add to cart"
            onAddToCart={() => onAddToCart(cupcake.id)}
          />
        ))}
      </div>
    </Container>
  )
}
