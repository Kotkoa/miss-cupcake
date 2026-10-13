import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode, Ref } from 'react'
import { appHref } from '../../routing/appHref'
import styles from './Button.module.css'

type ButtonVariant = 'filled' | 'light' | 'text'

type CommonProps = {
  /** filled: purple fill, yellow label ("add to cart", "Place order"). light: cream fill, purple label (footer "send"). text: no fill, purple label ("view cart"). */
  variant?: ButtonVariant
  fullWidth?: boolean
  children: ReactNode
}

type ButtonAsButton = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps> & { href?: undefined; ref?: Ref<HTMLButtonElement> }

type ButtonAsLink = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof CommonProps> & { href: string }

export type ButtonProps = ButtonAsButton | ButtonAsLink

export function Button(props: ButtonProps) {
  const { variant = 'filled', fullWidth = false, className, children, ...rest } = props
  const classes = [styles.button, styles[variant], fullWidth && styles.fullWidth, className]
    .filter(Boolean)
    .join(' ')

  if (rest.href !== undefined) {
    return (
      <a {...rest} href={appHref(rest.href)} className={classes}>
        {children}
      </a>
    )
  }

  const { type = 'button', ...buttonRest } = rest
  return (
    <button {...buttonRest} type={type} className={classes}>
      {children}
    </button>
  )
}
