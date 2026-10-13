import { Button } from '../../components/Button/Button'
import { Main } from '../../components/Main/Main'
import { SiteHeader } from '../../components/SiteHeader/SiteHeader'
import styles from './NotFound.module.css'

export function NotFound() {
  return (
    <>
      <title>Page not found – Miss Cupcake</title>
      <SiteHeader />
      <Main className={styles.page}>
        <h1 className={styles.title}>Page not found</h1>
        <p>We could not find the page you are looking for.</p>
        <Button href="/">Back to the shop</Button>
      </Main>
    </>
  )
}
