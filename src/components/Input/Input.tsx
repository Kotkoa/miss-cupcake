import { useId } from 'react'
import type { InputHTMLAttributes, Ref } from 'react'
import styles from './Input.module.css'

type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'id'> & {
  label: string
  /** Error message; sets aria-invalid and is linked with aria-describedby, with an icon so color is not the only signal. */
  error?: string
  /** Always-visible note ("* Must be 10 or more characters"). While there is an error it is hidden but still announced. */
  hint?: string
  /** default: purple outline (checkout form). light: cream outline on a purple surface (footer signup). */
  tone?: 'default' | 'light'
  /** Keep the label for assistive tech but hide it visually (footer: the label is the placeholder). */
  hideLabel?: boolean
  ref?: Ref<HTMLInputElement>
}

export function Input({
  label,
  error,
  hint,
  tone = 'default',
  hideLabel = false,
  className,
  ...inputProps
}: InputProps) {
  const id = useId()
  const errorId = `${id}-error`
  const hintId = `${id}-hint`
  const describedBy = [inputProps['aria-describedby'], error && errorId, hint && hintId].filter(Boolean).join(' ') || undefined

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
        aria-describedby={describedBy}
      />
      {hint ? <p id={hintId} className={error ? styles.visuallyHidden : styles.note}>{hint}</p> : null}
      {error ? (
        <p id={errorId} className={`${styles.note} ${styles.error}`}>
          <span className={styles.errorIcon} aria-hidden="true" />
          {error}
        </p>
      ) : null}
    </div>
  )
}
