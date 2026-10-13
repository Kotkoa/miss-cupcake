import { useLayoutEffect, useReducer, useRef, useState } from 'react'
import type { FormEvent, InputHTMLAttributes } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { Band } from '../../components/Band/Band'
import { Button } from '../../components/Button/Button'
import { Container } from '../../components/Container/Container'
import { Input } from '../../components/Input/Input'
import { PaymentConfirmed } from '../../components/PaymentConfirmed/PaymentConfirmed'
import { SiteFooter } from '../../components/SiteFooter/SiteFooter'
import { Main } from '../../components/Main/Main'
import { SiteHeader } from '../../components/SiteHeader/SiteHeader'
import { deliveryOptions } from '../../data/delivery'
import { formatPrice, useCartActions, useCartCount, useCartSubtotal } from '../../features/cart'
import { clearCheckout, loadCheckout, saveCheckout } from '../../features/checkout/storage'
import { errorReducer, initialErrorState } from '../../features/checkout/errorState'
import { attentionMessage, emptyValues, validateForm } from '../../features/checkout/validation'
import type { FieldName } from '../../features/checkout/validation'
import { formatCardNumber } from './cardNumber'
import decorDesktop from '../../assets/images/payment/decor-d.webp'
import decorTablet from '../../assets/images/payment/decor-t.webp'
import decorMobile from '../../assets/images/payment/decor-m.webp'
import arrow from '../../assets/icons/arrow-left.svg'
import styles from './Payment.module.css'

export function Payment() {
  const count = useCartCount()
  const subtotal = useCartSubtotal()
  const { clear } = useCartActions()
  const navigate = useNavigate()
  const [draft, setDraft] = useState(loadCheckout)
  const [{ errors, attention }, dispatchErrors] = useReducer(errorReducer, initialErrorState)
  const [confirmed, setConfirmed] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)
  const cardSelection = useRef<{ start: number; end: number } | null>(null)

  useLayoutEffect(() => {
    const selection = cardSelection.current
    if (!selection) return
    cardSelection.current = null
    formRef.current?.querySelector<HTMLInputElement>('[name="cardNumber"]')?.setSelectionRange(selection.start, selection.end)
  }, [draft.values])
  const total = subtotal + (deliveryOptions.find((option) => option.id === draft.delivery)?.cents ?? 0)

  function changeField(name: FieldName, input: HTMLInputElement) {
    const value = input.value
    // Keep formatting cosmetic: invalid letters remain visible and are rejected by validation.
    const cardNumber = name === 'cardNumber'
      ? formatCardNumber(value, input.selectionStart, input.selectionEnd)
      : null
    const formatted = cardNumber?.value ?? value
    cardSelection.current = cardNumber?.selection ?? null
    const next = { ...draft, values: { ...draft.values, [name]: formatted } }
    setDraft(next)
    dispatchErrors({ type: 'change', name, values: next.values })
    saveCheckout(next.values, next.delivery)
  }

  function blurField(name: FieldName) {
    dispatchErrors({ type: 'blur', name, values: draft.values })
  }

  function field(name: FieldName, label: string, autoComplete: string, props: InputHTMLAttributes<HTMLInputElement> & { hint?: string } = {}) {
    return <Input {...props} name={name} label={label} autoComplete={autoComplete}
      value={draft.values[name]} onChange={(event) => changeField(name, event.currentTarget)}
      onBlur={() => blurField(name)} error={errors[name]} required={name !== 'entrance'} />
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const nextErrors = validateForm(draft.values)
    dispatchErrors({ type: 'submit', values: draft.values })
    const firstInvalid = Object.keys(nextErrors)[0]
    if (firstInvalid) {
      formRef.current?.querySelector<HTMLInputElement>(`[name="${firstInvalid}"]`)?.focus()
      return
    }
    dispatchErrors({ type: 'reset' })
    setConfirmed(true)
    clear()
    clearCheckout()
    setDraft({ values: { ...emptyValues }, delivery: 'regular' })
  }

  if (count === 0 && !confirmed) return <Navigate to="/checkout" replace />

  return (
    <div className={styles.page}>
      <title>{`${confirmed ? 'Order confirmed' : 'Payment'} – Miss Cupcake`}</title>
      <SiteHeader />
      <Main>
        <Container as="section" aria-labelledby="payment-title" className={styles.hero}>
          <div className={styles.heroContent}>
            <h1 id="payment-title" className={styles.title}>Check out</h1>
            <p className={styles.lead}>Complete your order and we&rsquo;ll bring it to your door.</p>
            <picture className={styles.decor}>
              <source media="(min-width: 1440px)" srcSet={decorDesktop} width={476} height={493} />
              <source media="(min-width: 960px)" srcSet={decorTablet} width={382} height={400} />
              <img src={decorMobile} alt="" aria-hidden="true" width={207} height={211} />
            </picture>
          </div>
        </Container>
        <Container className={styles.content}>
          <Link to="/checkout" className={styles.back}><img src={arrow} alt="" />Back to My cart</Link>
          <form ref={formRef} onSubmit={submit} noValidate>
            <fieldset className={styles.delivery}>
              <legend><h2>Delivery type</h2></legend>
              <div className={styles.packages}>
                {deliveryOptions.map((option) => (
                  <label key={option.id} className={styles.package}>
                    <input type="radio" name="delivery" value={option.id} checked={draft.delivery === option.id}
                      onChange={() => { setDraft({ ...draft, delivery: option.id }); saveCheckout(draft.values, option.id) }} />
                    <span className={styles.packageName}>{option.name}</span>
                    <span className={styles.packagePrice}>{formatPrice(option.cents)}</span>
                    <span className={styles.packageDescription}>{option.description}</span>
                  </label>
                ))}
              </div>
            </fieldset>
            <div className={styles.deliveryTotal}><span>Total to pay</span><output aria-live="polite">{formatPrice(total)}</output></div>
            <fieldset className={styles.recipient}>
              <legend><h2>To be delivered to</h2></legend>
              <div className={styles.fields}>
                {field('firstName', 'First name', 'given-name', { placeholder: 'Josh' })}
                {field('lastName', 'Last name', 'family-name', { placeholder: 'Brown' })}
                {field('email', 'Email address', 'email', { type: 'email', inputMode: 'email', placeholder: 'Joshbrown2@gmail.com' })}
                {field('passcode', 'Passcode', 'new-password', { type: 'password', hint: '* Must be 10 or more characters' })}
              </div>
            </fieldset>
            <fieldset className={styles.address}>
              <legend><h2>Address</h2></legend>
              <div className={styles.fields}>
                {field('street', 'Street', 'address-line1', { placeholder: '12 New N St, Holborn' })}
                {field('city', 'City', 'address-level2', { placeholder: 'London' })}
                {field('postcode', 'Postcode', 'postal-code', { placeholder: 'WC1N 3PJ' })}
                {field('entrance', 'Entrance / Name on door', 'off', { placeholder: '2' })}
              </div>
            </fieldset>
            <fieldset className={styles.contact}>
              <legend><h2>Contact</h2></legend>
              <div className={styles.fields}>
                {field('recipient', "Recipient's Name", 'name', { placeholder: 'Julie Brown' })}
                {field('phone', 'Phone No.', 'tel', { type: 'tel', inputMode: 'tel', placeholder: 'Phone No.' })}
              </div>
            </fieldset>
            <fieldset className={styles.payment}>
              <legend><h2>Payment</h2></legend>
              <div className={styles.fields}>
                {field('cardNumber', 'Credit card No.', 'cc-number', { inputMode: 'numeric', placeholder: '0000 0000 0000 0000' })}
                <fieldset className={styles.expiry}>
                  <legend className={styles.expiryTitle}>Expiration date</legend>
                  <div className={styles.expiryFields}>
                    {field('expiryMonth', 'Month (MM)', 'cc-exp-month', { inputMode: 'numeric', placeholder: 'MM', className: styles.expiryInput })}
                    <span aria-hidden="true">\</span>
                    {field('expiryYear', 'Year (YYYY)', 'cc-exp-year', { inputMode: 'numeric', placeholder: 'YYYY', className: styles.expiryInput })}
                  </div>
                </fieldset>
                {field('cardHolder', 'Card holder', 'cc-name', { placeholder: 'Julie Brown' })}
                {field('cvv', 'CVV', 'cc-csc', { inputMode: 'numeric', placeholder: '000', className: styles.cvv })}
              </div>
            </fieldset>
            <div className={styles.summary}>
              <div className={styles.summaryInner}>
                <span>Total to pay</span><output aria-live="polite">{formatPrice(total)}</output>
                {/* The visible count follows the fixes; the live region says it once, on submit, and not again as fields are fixed. */}
                <p className={styles.attention} aria-hidden="true">{attention ? attentionMessage(errors) : ''}</p>
                {/* Same text on a second submit is not announced again; the focus move to the first invalid field answers it. */}
                <p role="status" className={styles.srOnly}>{attention}</p>
                <Button type="submit" fullWidth className={styles.placeOrder}>Place order</Button>
              </div>
            </div>
          </form>
        </Container>
      </Main>
      <Band color="purple" wave flip className={styles.footerBand}>
        <Container className={styles.footerWrap}><SiteFooter /></Container>
      </Band>
      {confirmed ? <PaymentConfirmed onClose={() => navigate('/', { replace: true })} /> : null}
    </div>
  )
}
