import type { CartLine } from '../../features/cart'
import { formatPrice } from '../../features/cart'
import { QuantityStepper } from '../../components/QuantityStepper/QuantityStepper'
import styles from './CartRow.module.css'

type CartRowProps = {
  line: CartLine
  /** 0 removes the line. */
  onQuantityChange: (next: number) => void
}

/** One cart line on the check out page: picture, name, stepper and line total. */
export function CartRow({ line, onQuantityChange }: CartRowProps) {
  return (
    <li className={styles.row} data-line={line.id}>
      <span className={styles.thumb}>
        <img src={line.image} alt="" className={styles.image} />
      </span>
      <h2 className={styles.name}>{line.name}</h2>
      <div className={styles.controls}>
        <QuantityStepper value={line.qty} onChange={onQuantityChange} itemLabel={line.name} className={styles.stepper} />
        <p className={styles.price}>{formatPrice(line.totalCents)}</p>
      </div>
    </li>
  )
}
