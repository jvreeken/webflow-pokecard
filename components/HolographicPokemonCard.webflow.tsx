import { declareComponent } from "@webflow/react"
import { props } from "@webflow/data-types"
import HolographicPokemonCard, {
  type HolographicPokemonCardProps,
} from "./HolographicPokemonCard"

type WebflowProps = HolographicPokemonCardProps

const HolographicPokemonCardWebflow = (p: WebflowProps) => {
  return <HolographicPokemonCard {...p} />
}

export default declareComponent(HolographicPokemonCardWebflow, {
  name: "Holographic Pokémon Card",
  description: "Configurable holographic card with tilt, motion-based shimmer, and SVG lighting.",
  group: "Cards",

  // Props that show up in Webflow Designer
  props: {
    name: props.Text({
      name: "Name",
      defaultValue: "Pikachu",
      group: "Card",
    }),

    genus: props.Text({
      name: "Genus",
      defaultValue: "Mouse Pokémon",
      group: "Card",
    }),

    dexNumber: props.Text({
      name: "Dex Number",
      defaultValue: "025",
      group: "Card",
    }),

    primaryType: props.Variant({
      name: "Primary Type",
      group: "Card",
      options: [
        "normal",
        "fire",
        "water",
        "grass",
        "electric",
        "ice",
        "fighting",
        "poison",
        "ground",
        "flying",
        "psychic",
        "bug",
        "rock",
        "ghost",
        "dragon",
        "steel",
        "dark",
        "fairy",
      ],
      defaultValue: "electric",
    }),

    colorTheme: props.Variant({
      name: "Color Theme",
      group: "Styling",
      options: ["red", "blue", "yellow", "green", "purple", "pink", "brown", "black", "gray", "white"],
      defaultValue: "yellow",
    }),

    hp: props.Number({
      name: "HP",
      group: "Stats",
      defaultValue: 60,
      min: 10,
      max: 300,
      decimals: 0,
    }),

    heightM: props.Number({
      name: "Height (m)",
      group: "Stats",
      defaultValue: 0.4,
      min: 0,
      max: 20,
      decimals: 2,
    }),

    weightKg: props.Number({
      name: "Weight (kg)",
      group: "Stats",
      defaultValue: 6.0,
      min: 0,
      max: 1000,
      decimals: 2,
    }),

    flavorText: props.RichText({
      name: "Flavor Text",
      group: "Card",
      defaultValue:
        "When several of these Pokémon gather, their electricity could build and cause lightning storms.",
    }),

    spriteUrl: props.Image({
      name: "Sprite Image",
      group: "Media",
      defaultValue:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png",
    }),

    showMotionPrompt: props.Boolean({
      name: "Show motion prompt on mobile",
      group: "Behavior",
      defaultValue: true,
      trueLabel: "Show",
      falseLabel: "Hide",
    }),
  },
})
