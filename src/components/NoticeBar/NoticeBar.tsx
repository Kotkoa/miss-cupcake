import { useEffect, useState } from 'react'
import closeIcon from '../../assets/icons/close-light.svg'
import styles from './NoticeBar.module.css'

type NoticeBarProps = {
  message: string
  onClose: () => void
}

/** A full-width bar in the page flow, above the header: centred message and a close button on the right. */
export function NoticeBar({ message, onClose }: NoticeBarProps) {
  // A live region announces changes, not text that arrives with it: mount it empty, fill it on the next frame.
  const [announced, setAnnounced] = useState('')
  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setAnnounced(message))
    return () => window.cancelAnimationFrame(frame)
  }, [message])

  return (
    <div className={styles.bar}>
      <p role="status" className={styles.message}>
        {announced}
      </p>
      <button type="button" className={styles.close} aria-label="Close" onClick={onClose}>
        <img src={closeIcon} alt="" width={12} height={12} />
      </button>
    </div>
  )
}
