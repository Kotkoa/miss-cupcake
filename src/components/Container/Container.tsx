import type { ElementType, HTMLAttributes } from 'react'
import styles from './Container.module.css'

type ContainerProps = HTMLAttributes<HTMLElement> & {
  as?: ElementType
}

/** Centered column limited by --container-max-width, with side padding from tokens. */
export function Container({ as: Tag = 'div', className, ...rest }: ContainerProps) {
  return <Tag {...rest} className={[styles.container, className].filter(Boolean).join(' ')} />
}
