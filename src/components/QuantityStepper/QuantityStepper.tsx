import minusIcon from '../../assets/icons/minus.svg'
import plusIcon from '../../assets/icons/plus.svg'
import styles from './QuantityStepper.module.css'

type QuantityStepperProps = {
  value: number
  onChange: (next: number) => void
  min?: number
  max?: number
  /** What is being counted, e.g. "Mint Chip": used in the accessible names. */
  itemLabel: string
  className?: string
}

export function QuantityStepper({
  value,
  onChange,
  min = 0,
  max = Number.POSITIVE_INFINITY,
  itemLabel,
  className,
}: QuantityStepperProps) {
  return (
    <div
      className={[styles.stepper, className].filter(Boolean).join(' ')}
      role="group"
      aria-label={`Quantity: ${itemLabel}`}
    >
      <button
        type="button"
        className={styles.control}
        aria-label={`Decrease quantity of ${itemLabel}`}
        disabled={value <= min}
        onClick={() => onChange(Math.max(min, value - 1))}
      >
        <img src={minusIcon} alt="" width={9} height={2} />
      </button>
      <output className={styles.count} aria-live="polite">
        {value}
      </output>
      <button
        type="button"
        className={styles.control}
        aria-label={`Increase quantity of ${itemLabel}`}
        disabled={value >= max}
        onClick={() => onChange(Math.min(max, value + 1))}
      >
        <img src={plusIcon} alt="" width={9} height={10} />
      </button>
    </div>
  )
}
