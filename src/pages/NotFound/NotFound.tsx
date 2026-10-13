import { Button } from '../../components/Button/Button'
import { Main } from '../../components/Main/Main'
import { PageMeta } from '../../components/PageMeta/PageMeta'
import { SiteHeader } from '../../components/SiteHeader/SiteHeader'
import styles from './NotFound.module.css'

export function NotFound() {
  return (
    <>
      <PageMeta title="Page not found – Miss Cupcake" description="This page does not exist. Head back to the Miss Cupcake shop." />
      <SiteHeader />
      <Main className={styles.page}>
        <h1 className={styles.title}>Page not found</h1>
        <p>We could not find the page you are looking for.</p>
        <Button href="/">Back to the shop</Button>
      </Main>
    </>
  )
}
