import carrot from '../assets/images/home/cupcakes/carrot.webp'
import cinnamon from '../assets/images/home/cupcakes/cinnamon.webp'
import darkChocolate from '../assets/images/home/cupcakes/dark-chocolate.webp'
import glutenFreeVelvet from '../assets/images/home/cupcakes/gluten-free-velvet.webp'
import marshmallow from '../assets/images/home/cupcakes/marshmallow.webp'
import mintChip from '../assets/images/home/cupcakes/mint-chip.webp'
import pinkStrawberry from '../assets/images/home/cupcakes/pink-strawberry.webp'
import pinkVanilla from '../assets/images/home/cupcakes/pink-vanilla.webp'
import redVelvet from '../assets/images/home/cupcakes/red-velvet.webp'
import saltyCaramel from '../assets/images/home/cupcakes/salty-caramel.webp'
import totallyNuts from '../assets/images/home/cupcakes/totally-nuts.webp'

export type Cupcake = {
  id: string
  name: string
  description: string
  image: {
    src: string
    /** Display size on Tablet and Desktop (Figma px); the file is exported at 2x. */
    width: number
    height: number
    /** Display width on Mobile (Figma px); height follows the aspect ratio. */
    mobileWidth: number
  }
}

/** Every cupcake costs the same: all line totals in Figma are multiples of 3.49. Integer cents. */
export const UNIT_PRICE_CENTS = 349

/** Same order as the Figma Homepage grid (left to right, top to bottom). */
export const cupcakes: Cupcake[] = [
  {
    id: 'carrot',
    name: 'Carrot',
    description: 'Walnut-studded carrot cake with cinnamon cream cheese frosting',
    image: { src: carrot, width: 201, height: 230, mobileWidth: 182 },
  },
  {
    id: 'red-velvet',
    name: 'Red Velvet',
    description: 'A chocolate sponge, coloured naturally with beetroot and topped off with cream cheese.',
    image: { src: redVelvet, width: 223, height: 229, mobileWidth: 180 },
  },
  {
    id: 'mint-chip',
    name: 'Mint Chip',
    description: 'Homemade chocolate cupcakes topped with thick & creamy mint chocolate chip frosting.',
    image: { src: mintChip, width: 223, height: 235, mobileWidth: 179 },
  },
  {
    id: 'pink-strawberry',
    name: 'Pink strawberry',
    description: 'A fluffy strawberry cupcake with strawberry buttercream frosting and chocolate syrup.',
    image: { src: pinkStrawberry, width: 203, height: 244, mobileWidth: 179 },
  },
  {
    id: 'marshmallow',
    name: 'Marshmallow',
    description: 'A super chocolatey cupcake base with a soft marshmallowy buttercream topping.',
    image: { src: marshmallow, width: 217, height: 244, mobileWidth: 180 },
  },
  {
    id: 'dark-chocolate',
    name: 'Dark Chocolate',
    description: 'Belgian chocolate cake with sweet chocolate frosting and cheery.',
    image: { src: darkChocolate, width: 192, height: 244, mobileWidth: 166 },
  },
  {
    id: 'salty-caramel',
    name: 'Salty Caramel',
    description: 'Caramel cake with a buttery caramel cream cheese frosting topped with fleur de sel.',
    image: { src: saltyCaramel, width: 202, height: 244, mobileWidth: 167 },
  },
  {
    id: 'gluten-free-velvet',
    name: 'Gluten Free Velvet',
    description: 'A gluten free twist on our classic red velvet, topped off with cream cheese.',
    image: { src: glutenFreeVelvet, width: 203, height: 244, mobileWidth: 166 },
  },
  {
    id: 'cinnamon',
    name: 'Cinnamon',
    description: 'Lightly spiced buttermilk cake with cinnamon cream cheese frosting with cinnamon sugar.',
    image: { src: cinnamon, width: 218, height: 243, mobileWidth: 181 },
  },
  {
    id: 'totally-nuts',
    name: 'Totally nuts',
    description: 'A sweet hazelnut paste with nutella butter cream and chopped hazelnuts on the top.',
    image: { src: totallyNuts, width: 200, height: 244, mobileWidth: 167 },
  },
  {
    id: 'pink-vanilla',
    name: 'Pink Vanilla',
    description: 'Soft, fluffy, and extra moist creamy vanilla buttercream with extra sprinkles',
    image: { src: pinkVanilla, width: 197, height: 244, mobileWidth: 163 },
  },
]
