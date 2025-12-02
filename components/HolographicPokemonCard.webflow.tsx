import { declareComponent } from "@webflow/react"
import { props } from "@webflow/data-types"
import HolographicPokemonCard, {
  type HolographicPokemonCardProps,
  type PokemonType,
  type ColorTheme,
} from "./HolographicPokemonCard"

// Normalize arbitrary text from Webflow CMS / Designer into our union types
function normalizeType(raw: string): PokemonType {
  const value = raw?.toLowerCase().trim()
  const allowed: PokemonType[] = [
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
  ]
  return (allowed.includes(value as PokemonType) ? value : "normal") as PokemonType
}

function normalizeTheme(raw: string): ColorTheme {
  const value = raw?.toLowerCase().trim()
  const allowed: ColorTheme[] = [
    "red",
    "blue",
    "yellow",
    "green",
    "purple",
    "pink",
    "brown",
    "black",
    "gray",
    "white",
  ]
  return (allowed.includes(value as ColorTheme) ? value : "gray") as ColorTheme
}

// Webflow will pass `primaryType` and `colorTheme` as strings,
// so we override those props to string and normalize before
// passing into the actual card component.
type WebflowProps = Omit<HolographicPokemonCardProps, "primaryType" | "colorTheme"> & {
  primaryType: string
  colorTheme: string
}

const HolographicPokemonCardWebflow = (p: WebflowProps) => {
  return (
    <HolographicPokemonCard
      {...p}
      primaryType={normalizeType(p.primaryType)}
      colorTheme={normalizeTheme(p.colorTheme)}
    />
  )
}

export default declareComponent(HolographicPokemonCardWebflow, {
  name: "Holographic Pokémon Card",
  description: "Configurable holographic card with tilt, motion-based shimmer, and SVG lighting.",
  group: "Cards",

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

    primaryType: props.Text({
      name: "Primary Type",
      group: "Card",
      defaultValue: "electric", // must match one of the allowed types
    }),

    colorTheme: props.Text({
      name: "Color Theme",
      group: "Styling",
      defaultValue: "yellow", // must match one of the allowed themes
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
        "https://cdn.prod.website-files.com/692f23994edeff40224accca/692f2ece8be7e9cf0278fc19_25.png",
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
