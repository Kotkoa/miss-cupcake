export const deliveryOptions = [
  { id: 'regular', name: 'Regular Package', cents: 0, description: "Complete your order and we'll bring it to your door." },
  { id: 'birthday', name: 'Birthday Package', cents: 990, description: 'Fun birthday cupcake packages with candles and assorted party favors.' },
  { id: 'valentine', name: "Valentine's day Package", cents: 1290, description: "The perfect delectable treat on the year's most romantic day with flowers and chocolate covered strawberries." },
] as const

export type Delivery = (typeof deliveryOptions)[number]['id']
