import { useEffect, useId, useRef } from 'react'
import closeIcon from '../../assets/icons/close.svg'
import confirmedImage from '../../assets/images/payment/confirmed.webp'
import { Band } from '../Band/Band'
import { Button } from '../Button/Button'
import styles from './PaymentConfirmed.module.css'

type PaymentConfirmedProps = {
  onClose: () => void
}

export function PaymentConfirmed({ onClose }: PaymentConfirmedProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const titleId = useId()
  const descriptionId = useId()

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    const bodyStyle = document.body.style
    const previousOverflow = bodyStyle.getPropertyValue('overflow')
    const previousPriority = bodyStyle.getPropertyPriority('overflow')
    bodyStyle.setProperty('overflow', 'hidden')
    dialog.showModal()
    dialog.querySelector<HTMLButtonElement>('[data-confirmation-done]')?.focus()

    return () => {
      dialog.close()
      if (previousOverflow) {
        bodyStyle.setProperty('overflow', previousOverflow, previousPriority)
      } else {
        bodyStyle.removeProperty('overflow')
      }
    }
  }, [])

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
      className={styles.dialog}
      onCancel={(event) => {
        event.preventDefault()
        onClose()
      }}
    >
      <div className={styles.panel}>
        <button type="button" className={styles.close} aria-label="Close order confirmation" onClick={onClose}>
          <img src={closeIcon} alt="" width={17} height={17} />
        </button>
        <div className={styles.content}>
          <h2 id={titleId} className={styles.title}>Your order is Confirmed!</h2>
          <p id={descriptionId} className={styles.description}>Your order will be delivered within an hour.</p>
          <Button autoFocus data-confirmation-done className={styles.done} onClick={onClose}>Done</Button>
        </div>
        <Band color="pink" wave className={styles.illustrationBand} aria-hidden="true">
          <img src={confirmedImage} alt="" width={229} height={229} className={styles.illustration} />
        </Band>
      </div>
    </dialog>
  )
}
