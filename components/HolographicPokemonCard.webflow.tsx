// components/HolographicPokemonCard.webflow.tsx
import { declareComponent } from "@webflow/react"
import { props } from "@webflow/data-types"
import { HolographicPokemonCard } from "./HolographicPokemonCard"
import "../app/globals.css"

export default declareComponent(HolographicPokemonCard, {
  name: "Holographic Pokémon Card",
  description: "Holographic Pokémon-style card with motion, driven by Webflow props",
  group: "Cards",

  props: {
    name: props.Text({
      name: "Name",
      defaultValue: "Pikachu",
      group: "Identity",
    }),
    genus: props.Text({
      name: "Genus",
      defaultValue: "Mouse Pokémon",
      group: "Identity",
    }),
    dexNumber: props.Number({
      name: "Dex Number",
      defaultValue: 25,
      decimals: 0,
      min: 1,
      group: "Identity",
    }),
    primaryType: props.Text({
      name: "Primary Type",
      defaultValue: "electric",
      group: "Identity",
    }),
    color: props.Variant({
      name: "Color Theme",
      options: ["yellow", "red", "blue", "green", "purple", "pink", "gray", "black", "brown", "white"],
      defaultValue: "yellow",
      group: "Appearance",
    }),
    hp: props.Number({
      name: "HP",
      defaultValue: 60,
      decimals: 0,
      min: 10,
      max: 300,
      group: "Stats",
    }),
    heightMeters: props.Number({
      name: "Height (m)",
      defaultValue: 0.4,
      decimals: 2,
      min: 0,
      group: "Info",
    }),
    weightKg: props.Number({
      name: "Weight (kg)",
      defaultValue: 6,
      decimals: 2,
      min: 0,
      group: "Info",
    }),
    flavorText: props.Text({
      name: "Flavor Text",
      defaultValue:
        "When several of these Pokémon gather, their electricity could build and cause lightning storms.",
      group: "Content",
    }),
    spriteUrl: props.Text({
      name: "Sprite URL",
      defaultValue:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png",
      group: "Content",
    }),
  },

  options: {
    applyTagSelectors: true,
  },
})
