import { useState } from 'react'
import type { ReactNode } from 'react'
import mintChip from '../../assets/images/home/cupcakes/mint-chip.webp'
import { Button } from '../../components/Button/Button'
import { Footer } from '../../components/Footer/Footer'
import { Header } from '../../components/Header/Header'
import { Input } from '../../components/Input/Input'
import { MyBag } from '../../components/MyBag/MyBag'
import { MapFacade } from '../../components/MapFacade/MapFacade'
import { ProductCard } from '../../components/ProductCard/ProductCard'
import { QuantityStepper } from '../../components/QuantityStepper/QuantityStepper'
import { cupcakes, UNIT_PRICE_CENTS } from '../../data/cupcakes'
import type { CartLine } from '../../features/cart'
import { storeMap } from '../../data/store'
import styles from './UiKit.module.css'

function Block({ title, nodeId, children }: { title: string; nodeId: string; children: ReactNode }) {
  return (
    <section className={styles.block}>
      <h2 className={styles.blockTitle}>
        {title} <span className={styles.node}>Figma {nodeId}</span>
      </h2>
      {children}
    </section>
  )
}

function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className={styles.row}>
      <p className={styles.rowLabel}>{label}</p>
      <div className={styles.rowBody}>{children}</div>
    </div>
  )
}

/** The Figma "My Bag" scenario: Carrot x1, Red Velvet x3, Mint Chip x2, Pink strawberry x2. */
const bagScenario: [string, number][] = [
  ['carrot', 1],
  ['red-velvet', 3],
  ['mint-chip', 2],
  ['pink-strawberry', 2],
]

const bagLines: CartLine[] = bagScenario.flatMap(([id, qty]) => {
  const cupcake = cupcakes.find((item) => item.id === id)
  if (!cupcake) return []
  return [{ id, name: cupcake.name, image: cupcake.image.src, qty, unitCents: UNIT_PRICE_CENTS, totalCents: qty * UNIT_PRICE_CENTS }]
})

const navLinks = [
  { label: 'Shop', href: '#shop', current: true },
  { label: 'Our story', href: '#story' },
  { label: 'Why Miss cupcake', href: '#why' },
]

export function UiKit() {
  const [zero, setZero] = useState(0)
  const [one, setOne] = useState(1)
  const [many, setMany] = useState(12)
  const [card, setCard] = useState(2)

  return (
    <main className={styles.page}>
      <h1 className={styles.pageTitle}>UI kit</h1>

      <Block title="Button" nodeId="7:278 / 940:8">
        <Row label="filled">
          <Button>add to cart</Button>
          <Button>SHOP NOW</Button>
          <Button disabled>add to cart</Button>
        </Row>
        <Row label="light (on purple)">
          <div className={styles.onPurple}>
            <Button variant="light">send</Button>
            <Button variant="light" disabled>
              send
            </Button>
          </div>
        </Row>
        <Row label="as link (href)">
          <Button href="#link">Our story</Button>
        </Row>
        <Row label="fullWidth">
          <Button fullWidth>Place order</Button>
        </Row>
      </Block>

      <Block title="QuantityStepper" nodeId="7:278">
        <Row label="count 0 at start (minus is aria-disabled)">
          <QuantityStepper value={zero} onChange={setZero} itemLabel="Carrot" />
        </Row>
        <Row label="count 1">
          <QuantityStepper value={one} onChange={setOne} itemLabel="Red Velvet" />
        </Row>
        <Row label="count 12">
          <QuantityStepper value={many} onChange={setMany} itemLabel="Mint Chip" />
        </Row>
      </Block>

      <Block title="Input" nodeId="148:184 / 940:8">
        <Row label="default">
          <Input label="First name" placeholder="Josh" name="firstName" autoComplete="given-name" className={styles.fieldDefault} />
        </Row>
        <Row label="default, error">
          <Input
            label="Phone number"
            defaultValue="123"
            error="* Must be 10 or more digits"
            name="phone"
            autoComplete="tel"
            className={styles.fieldDefault}
          />
        </Row>
        <Row label="light (on purple)">
          <div className={styles.onPurple}>
            <Input tone="light" label="Email address" placeholder="Email address" hideLabel autoComplete="email" className={styles.fieldLight} />
          </div>
        </Row>
      </Block>

      <Block title="Header" nodeId="148:362 / 940:2">
        <Row label="empty cart">
          <div className={styles.frame}>
            <Header navLinks={navLinks} cartCount={0} cartOpen={false} onCartToggle={() => {}} cartPanelId="ui-bag-empty" />
          </div>
        </Row>
        <Row label="cart with 8">
          <div className={styles.frame}>
            <Header navLinks={navLinks} cartCount={8} cartOpen={false} onCartToggle={() => {}} cartPanelId="ui-bag-full" />
          </div>
        </Row>
      </Block>

      <Block title="ProductCard" nodeId="7:278">
        <ProductCard
          name="Mint Chip"
          description="Homemade chocolate cupcakes topped with thick & creamy mint chocolate chip frosting."
          imageSrc={mintChip}
          imageWidth={223}
          imageHeight={235}
          quantity={card}
          onQuantityChange={setCard}
          addToCartLabel="add to cart"
          onAddToCart={() => {}}
        />
      </Block>

      <Block title="MyBag" nodeId="7:40 / 30:232 / 31:843">
        <Row label="with lines">
          <MyBag id="ui-bag" lines={bagLines} subtotalCents={8 * UNIT_PRICE_CENTS} onClose={() => {}} onNavigate={() => {}} checkoutHref="#checkout" shopHref="#shop" />
        </Row>
        <Row label="empty">
          <MyBag id="ui-bag-empty-state" lines={[]} subtotalCents={0} onClose={() => {}} onNavigate={() => {}} checkoutHref="#checkout" shopHref="#shop" />
        </Row>
      </Block>

      <Block title="MapFacade" nodeId="148:301">
        <div className={styles.onPurple}>
          <MapFacade className={styles.mapDemo} {...storeMap} />
        </div>
      </Block>

      <Block title="Footer" nodeId="940:8">
        <div className={styles.footerSurface}>
          <Footer
            brand={['Miss', 'cupcake']}
            navLinks={[
              { label: 'Shop', href: '#shop' },
              { label: 'Our story', href: '#story' },
              { label: 'Why Miss cupcake', href: '#why' },
            ]}
            newsletterTitle="Suger up your Inbox"
            emailLabel="Email address"
            submitLabel="send"
            legalLinks={[
              { label: 'Privacy policy', href: '#privacy' },
              { label: 'Cookies policy', href: '#cookies' },
              { label: 'Terms of use', href: '#terms' },
            ]}
            copyright="Miss cupcakes 2020"
          />
        </div>
      </Block>
    </main>
  )
}
