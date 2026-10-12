import { useId } from 'react'
import type { InputHTMLAttributes } from 'react'
import styles from './Input.module.css'

type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'id'> & {
  label: string
  /** Error message; sets aria-invalid and is linked with aria-describedby. */
  error?: string
  /** default: purple outline (checkout form). light: cream outline on a purple surface (footer signup). */
  tone?: 'default' | 'light'
  /** Keep the label for assistive tech but hide it visually (footer: the label is the placeholder). */
  hideLabel?: boolean
}

export function Input({
  label,
  error,
  tone = 'default',
  hideLabel = false,
  className,
  ...inputProps
}: InputProps) {
  const id = useId()
  const errorId = `${id}-error`

  return (
    <div className={[styles.field, styles[tone], className].filter(Boolean).join(' ')}>
      <label htmlFor={id} className={hideLabel ? styles.visuallyHidden : styles.label}>
        {label}
      </label>
      <input
        {...inputProps}
        id={id}
        className={styles.control}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
      />
      {error ? (
        <p id={errorId} className={styles.error}>
          {error}
        </p>
      ) : null}
    </div>
  )
}
