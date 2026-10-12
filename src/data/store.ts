import mapImage from '../assets/images/our-story/map.webp'

/**
 * The Miss Cupcake store. The Figma map shows London, so the place comes from the project owner's
 * Google Maps share link (https://share.google/Qho2IaQqiXrVBRdqa), which resolves to the town of
 * Pego (Alicante, Spain), not to a street address. Coordinates are the OpenStreetMap centre of Pego
 * (Nominatim, relation 345292).
 */
export const store = {
  name: 'Miss Cupcake',
  town: 'Pego',
  address: '03780 Pego, Alicante, Spain',
  lat: 38.8421876,
  lng: -0.1178782,
} as const

/** Interactive map shown after the visitor asks for it (no API key needed). */
export const storeEmbedUrl = `https://www.google.com/maps?q=${store.lat},${store.lng}&z=15&output=embed`

/** Opens the same place in the Google Maps site or app. */
export const storeMapsUrl = `https://www.google.com/maps/search/?api=1&query=${store.lat},${store.lng}`

/** Static map of the store area: OpenStreetMap tiles stitched around `store`, so the pin sits in the middle. */
export const storeMap = {
  imageSrc: mapImage,
  imageWidth: 1600,
  imageHeight: 902,
  alt: `Map of ${store.town} with the ${store.name} store marked`,
  embedUrl: storeEmbedUrl,
  embedTitle: `${store.name} store location`,
  linkUrl: storeMapsUrl,
  linkLabel: 'Open in Google Maps',
  showLabel: 'Show interactive map',
  attribution: { label: '© OpenStreetMap contributors', href: 'https://www.openstreetmap.org/copyright' },
}
