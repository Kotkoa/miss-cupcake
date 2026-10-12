import { useEffect, useRef, useState } from 'react'
import pinIcon from '../../assets/icons/map-pin.svg'
import { Button } from '../Button/Button'
import styles from './MapFacade.module.css'

type MapFacadeProps = {
  /** Static map image, centred on the place the pin marks. */
  imageSrc: string
  imageWidth: number
  imageHeight: number
  alt: string
  /** Interactive map; nothing is requested from this address until the visitor clicks the button. */
  embedUrl: string
  embedTitle: string
  /** Always-visible text link to the same place. */
  linkUrl: string
  linkLabel: string
  showLabel: string
  /** Credit for the static image, shown in its corner. */
  attribution?: { label: string; href: string }
  className?: string
}

/**
 * Map facade: a static image with a pin and a button. The third-party iframe (JS, cookies) only
 * replaces the image after the click, in the same box, so the layout does not shift.
 */
export function MapFacade({
  imageSrc,
  imageWidth,
  imageHeight,
  alt,
  embedUrl,
  embedTitle,
  linkUrl,
  linkLabel,
  showLabel,
  attribution,
  className,
}: MapFacadeProps) {
  const [interactive, setInteractive] = useState(false)
  const frameRef = useRef<HTMLIFrameElement>(null)

  useEffect(() => {
    if (interactive) frameRef.current?.focus() // the clicked button is gone: keep keyboard focus on the map
  }, [interactive])

  return (
    <div className={[styles.map, className].filter(Boolean).join(' ')}>
      <div className={styles.box} style={{ aspectRatio: `${imageWidth} / ${imageHeight}` }}>
        {interactive ? (
          <iframe
            ref={frameRef}
            className={styles.frame}
            src={embedUrl}
            title={embedTitle}
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        ) : (
          <>
            <img
              src={imageSrc}
              alt={alt}
              width={imageWidth}
              height={imageHeight}
              loading="lazy"
              className={styles.image}
            />
            <img src={pinIcon} alt="" width={36} height={48} className={styles.pin} />
            <Button className={styles.show} onClick={() => setInteractive(true)}>
              {showLabel}
            </Button>
            {attribution ? (
              <a className={styles.attribution} href={attribution.href} target="_blank" rel="noopener noreferrer">
                {attribution.label}
              </a>
            ) : null}
          </>
        )}
      </div>
      <a className={styles.link} href={linkUrl} target="_blank" rel="noopener noreferrer">
        {linkLabel}
      </a>
    </div>
  )
}
