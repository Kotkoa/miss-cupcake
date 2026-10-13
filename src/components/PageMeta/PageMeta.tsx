type PageMetaProps = {
  title: string
  description: string
}

/**
 * The page's `<title>` and meta description. React 19 hoists both into `<head>`; index.html has neither,
 * so there is exactly one of each per route. Not a Helmet: nothing to unmount, the next page renders its own.
 */
export function PageMeta({ title, description }: PageMetaProps) {
  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
    </>
  )
}
