"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import {
  Flame,
  Droplets,
  Leaf,
  Zap,
  Snowflake,
  Swords,
  Skull,
  Mountain,
  Wind,
  Eye,
  Bug,
  Hexagon,
  Ghost,
  Crown,
  Shield,
  Moon,
  Star,
  Circle,
} from "lucide-react"

const STYLES = `
@font-face {
  font-family: "Pokemon Solid";
  src: url("https://cdn.prod.website-files.com/692e1c94e92e40bdead6b1de/692f113ad85bac52852ece40_pokemon-20solid.woff2") format("woff2"), url("https://cdn.prod.website-files.com/692e1c94e92e40bdead6b1de/692f113afaa6c0e94e6c613e_pokemon-20solid.eot") format("embedded-opentype"), url("https://cdn.prod.website-files.com/692e1c94e92e40bdead6b1de/692f113a666a551cd07d7f34_pokemon-20solid.woff") format("woff"), url("https://cdn.prod.website-files.com/692e1c94e92e40bdead6b1de/692f113a5e32178c21563f12_pokemon-20solid.ttf") format("truetype"), url("https://cdn.prod.website-files.com/692e1c94e92e40bdead6b1de/692f113a84d4668f60a2eb34_pokemon-20solid.svg") format("svg");
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

.pokemon-card-root {
  position: relative;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  color: #ffffff;
}

.pokemon-card-wrapper {
  padding: 16px;
  border-radius: 16px;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

/* CARD CORE */

.card {
  position: relative;
  width: 340px;
  aspect-ratio: 2.5 / 3.5;
  transform-style: preserve-3d;
  transform: rotateX(calc(var(--pointer-y, 0) * -18deg))
             rotateY(calc(var(--pointer-x, 0) * 18deg));
  will-change: transform;
  cursor: pointer;
}

.card-frame {
  position: absolute;
  inset: 0;
  border-radius: 16px;
  background: #fcd34d;
  padding: 12px;
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.45);
}

.card-inner {
  position: relative;
  height: 100%;
  width: 100%;
  border-radius: 10px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

/* HEADER */

.card-header {
  position: relative;
  z-index: 50;
  padding: 6px 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-header-left {
  display: flex;
  flex-direction: column;
}

.card-genus {
  font-size: 13px;
  font-weight: 600;
  text-transform: capitalize;
  color: rgba(0, 0, 0, 0.6);
}

.card-name {
  font-size: 20px;
  font-weight: 700;
  text-transform: capitalize;
  line-height: 1.1;
  color: #000000;
  margin:0;
}

.card-header-right {
  display: flex;
  align-items: center;
  gap: 4px;
}

.card-hp {
  font-size: 18px;
  color: #dc2626;
  font-weight: 700;
}

/* TYPE ICON */

.type-pill {
  width: 26px;
  height: 26px;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.12);
}

.type-icon {
  width: 14px;
  height: 14px;
  color: #ffffff;
}

/* ARTWORK AREA */

.art-wrapper {
  position: relative;
  margin: 0 12px;
  margin-top: 4px;
  border-radius: 4px;
  border: 4px solid #fbbf24;
  background: #ffffff;
  flex:1;
}

.holo-card {
  transform-style: preserve-3d;
  transform: translateZ(20px);
}

.card__content {
  position: relative;
  height: 100%;
  width: 100%;
  overflow: hidden;
}

/* BACKGROUND HOLO FIELD */

.card-bg {
  position: absolute;
  inset: 0;
  overflow: hidden;
  border-radius: 4px;
}

.card-bg-pattern {
  position: absolute;
  inset: 0;
  opacity: 0.5;
  mix-blend-mode: multiply;
  transition: all 0.5s ease;
}

/* WATERMARK LAYER */

.holo-images {
  position: absolute;
  inset: 0;
  z-index: 10;
  pointer-events: none;
}

.mask-svg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
}

/* REFRACTION LAYERS */

.watermark {
  position: absolute;
  inset: 0;
  z-index: 10;
  pointer-events: none;
  mix-blend-mode: hard-light;
  opacity: 0.5;
}

.refraction {
  position: absolute;
  inset: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(
    105deg,
    transparent 20%,
    rgba(255, 200, 200, 0.5) 40%,
    rgba(255, 255, 255, 0.7) 45%,
    rgba(200, 200, 255, 0.7) 50%,
    transparent 70%
  );
  mix-blend-mode: color-dodge;
  opacity: 0.75;
  transform:
    translateX(calc(var(--pointer-x, 0) * -25%))
    translateY(calc(var(--pointer-y, 0) * -25%));
  transition: opacity 0.15s;
  pointer-events: none;
}

.card:hover .refraction {
  opacity: 1;
}

.refraction:nth-child(2) {
  background: linear-gradient(
    125deg,
    transparent 30%,
    rgba(255, 100, 100, 0.4) 45%,
    rgba(100, 255, 200, 0.4) 50%,
    rgba(100, 150, 255, 0.5) 55%,
    transparent 70%
  );
  transform:
    translateX(calc(var(--pointer-x, 0) * -40%))
    translateY(calc(var(--pointer-y, 0) * -40%));
  mix-blend-mode: hard-light;
}

/* SPOTLIGHT */

.spotlight {
  position: absolute;
  inset: 0;
  border-radius: 4px;
  mix-blend-mode: soft-light;
  background:
    radial-gradient(
      circle at calc(50% + var(--pointer-x, 0) * 50%)
                  calc(50% + var(--pointer-y, 0) * 50%),
      rgba(255, 255, 255, 0.6),
      transparent 60%
    );
  pointer-events: none;
  z-index: 40;
}

/* ART IMAGE */

.art-foreground {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 30;
}

.art-img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
  padding: 12px;
  transform:scale(1);
  transition: transform 80ms ease-out;
}

/* META STRIP */

.card-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 6px 12px 4px;
  padding: 2px 8px;
  background: #fbbf24;
  color: #92400e;
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  border-radius: 3px;
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.16);
}

/* FLAVOR TEXT */

.card-flavor {
  margin: 0 12px 10px;
  padding: 6px 8px;
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.08);
  background: rgba(255, 255, 255, 0.6);
  color: rgba(0, 0, 0, 0.82);
  font-size: 12px;
  font-style: italic;
  text-align: center;
}

.card-flavor p {
    margin-bottom:0;
}

/* GRAIN OVERLAY */

.noise-overlay {
  position: absolute;
  inset: 0;
  border-radius: 16px;
  opacity: 0.3;
  mix-blend-mode: overlay;
  pointer-events: none;
  background-image: url("https://grainy-gradients.vercel.app/noise.svg");
  filter: contrast(1.2) brightness(1.05);
}

/* MOTION PERMISSION OVERLAY */

.overlay-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 40;
}

.overlay-card {
  background: #ffffff;
  border-radius: 16px;
  padding: 20px 18px;
  width: 100%;
  max-width: 340px;
  box-shadow: 0 22px 45px rgba(0, 0, 0, 0.55);
  text-align: center;
}

.overlay-icon {
  width: 64px;
  height: 64px;
  border-radius: 999px;
  background: #dbeafe;
  color: #2563eb;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 12px;
}

.overlay-title {
  font-size: 18px;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 4px;
}

.overlay-text {
  font-size: 14px;
  color: #4b5563;
  margin-bottom: 16px;
}

.overlay-primary {
  display: block;
  width: 100%;
  border: none;
  border-radius: 999px;
  padding: 10px 16px;
  background: #2563eb;
  color: #ffffff;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  margin-bottom: 6px;
}

.overlay-primary:hover {
  background: #1d4ed8;
}

.overlay-secondary {
  background: none;
  border: none;
  font-size: 13px;
  color: #6b7280;
  cursor: pointer;
  text-decoration: underline;
}

/* UTILITY */

.sr-only-svg {
  position: absolute;
  width: 0;
  height: 0;
  opacity: 0;
  pointer-events: none;
}
`

const MOTION_CONSENT_KEY = "holo-card-motion-consent"

export type PokemonType =
  | "normal"
  | "fire"
  | "water"
  | "grass"
  | "electric"
  | "ice"
  | "fighting"
  | "poison"
  | "ground"
  | "flying"
  | "psychic"
  | "bug"
  | "rock"
  | "ghost"
  | "dragon"
  | "steel"
  | "dark"
  | "fairy"

export type ColorTheme =
  | "red"
  | "blue"
  | "yellow"
  | "green"
  | "purple"
  | "pink"
  | "brown"
  | "black"
  | "gray"
  | "white"

type SpriteInput = unknown

export interface HolographicPokemonCardProps {
  name: string
  genus: string
  dexNumber: string
  primaryType: PokemonType
  colorTheme: ColorTheme
  hp: number
  heightM: number
  weightKg: number
  flavorText: React.ReactNode
  /** Image URL or Webflow Image prop */
  spriteUrl: SpriteInput
  /** If true, shows the gyroscope permission overlay on mobile devices */
  showMotionPrompt?: boolean
}

const TypeIcon = ({ type }: { type: PokemonType }) => {
  switch (type) {
    case "fire":
      return <Flame className="type-icon" />
    case "water":
      return <Droplets className="type-icon" />
    case "grass":
      return <Leaf className="type-icon" />
    case "electric":
      return <Zap className="type-icon" />
    case "ice":
      return <Snowflake className="type-icon" />
    case "fighting":
      return <Swords className="type-icon" />
    case "poison":
      return <Skull className="type-icon" />
    case "ground":
      return <Mountain className="type-icon" />
    case "flying":
      return <Wind className="type-icon" />
    case "psychic":
      return <Eye className="type-icon" />
    case "bug":
      return <Bug className="type-icon" />
    case "rock":
      return <Hexagon className="type-icon" />
    case "ghost":
      return <Ghost className="type-icon" />
    case "dragon":
      return <Crown className="type-icon" />
    case "steel":
      return <Shield className="type-icon" />
    case "dark":
      return <Moon className="type-icon" />
    case "fairy":
      return <Star className="type-icon" />
    case "normal":
    default:
      return <Circle className="type-icon" />
  }
}

function getThemeColors(theme: ColorTheme) {
  switch (theme) {
    case "red":
      return { cardBg: "#fca5a5", typeBg: "#ef4444" }
    case "blue":
      return { cardBg: "#93c5fd", typeBg: "#3b82f6" }
    case "yellow":
      return { cardBg: "#fde047", typeBg: "#facc15" }
    case "green":
      return { cardBg: "#86efac", typeBg: "#22c55e" }
    case "purple":
      return { cardBg: "#e9d5ff", typeBg: "#a855f7" }
    case "pink":
      return { cardBg: "#f9a8d4", typeBg: "#ec4899" }
    case "brown":
      return { cardBg: "#fed7aa", typeBg: "#b45309" }
    case "black":
      return { cardBg: "#52525b", typeBg: "#020617" }
    case "gray":
      return { cardBg: "#94a3b8", typeBg: "#6b7280" }
    case "white":
      return { cardBg: "#e2e8f0", typeBg: "#94a3b8" }
    default:
      return { cardBg: "#e2e8f0", typeBg: "#64748b" }
  }
}

function generateColorShades(theme: ColorTheme): string[] {
  const map: Record<ColorTheme, string[]> = {
    red: ["#ffffff", "#fafafa", "#f8fafc", "#fff1f2", "#ffe4e6"],
    blue: ["#ffffff", "#fafafa", "#f8fafc", "#eff6ff", "#dbeafe"],
    yellow: ["#ffffff", "#fafafa", "#f8fafc", "#fefce8", "#fef9c3"],
    green: ["#ffffff", "#fafafa", "#f8fafc", "#f0fdf4", "#dcfce7"],
    black: ["#ffffff", "#fafafa", "#f8fafc", "#f4f4f5", "#e4e4e7"],
    brown: ["#ffffff", "#fafafa", "#f8fafc", "#fff7ed", "#ffedd5"],
    purple: ["#ffffff", "#fafafa", "#f8fafc", "#faf5ff", "#f3e8ff"],
    gray: ["#ffffff", "#fafafa", "#f8fafc", "#f8fafc", "#f1f5f9"],
    white: ["#ffffff", "#fafafa", "#f8fafc", "#f1f5f9", "#e2e8f0"],
    pink: ["#ffffff", "#fafafa", "#fff1f2", "#fdf2f8", "#fce7f3"],
  }

  return map[theme] || map.gray
}

function getRefractionGradient(theme: ColorTheme, index: number) {
  const gradients: Record<ColorTheme, string[]> = {
    red: [
      "linear-gradient(105deg, transparent 20%, rgba(255, 50, 50, 0.5) 40%, rgba(255, 255, 100, 0.6) 45%, rgba(255, 0, 255, 0.5) 50%, transparent 70%)",
      "linear-gradient(125deg, transparent 30%, rgba(255, 100, 100, 0.4) 45%, rgba(50, 255, 255, 0.4) 50%, rgba(200, 100, 255, 0.4) 55%, transparent 70%)",
    ],
    blue: [
      "linear-gradient(105deg, transparent 20%, rgba(50, 150, 255, 0.5) 40%, rgba(100, 255, 255, 0.6) 45%, rgba(150, 50, 255, 0.5) 50%, transparent 70%)",
      "linear-gradient(125deg, transparent 30%, rgba(0, 100, 255, 0.4) 45%, rgba(50, 255, 255, 0.4) 50%, rgba(200, 100, 255, 0.4) 55%, transparent 70%)",
    ],
    green: [
      "linear-gradient(105deg, transparent 20%, rgba(50, 255, 100, 0.5) 40%, rgba(200, 255, 100, 0.6) 45%, rgba(0, 200, 200, 0.5) 50%, transparent 70%)",
      "linear-gradient(125deg, transparent 30%, rgba(100, 255, 50, 0.4) 45%, rgba(255, 255, 100, 0.4) 50%, rgba(0, 255, 150, 0.4) 55%, transparent 70%)",
    ],
    yellow: [
      "linear-gradient(105deg, transparent 20%, rgba(255, 200, 0, 0.5) 40%, rgba(255, 255, 100, 0.6) 45%, rgba(255, 100, 50, 0.5) 50%, transparent 70%)",
      "linear-gradient(125deg, transparent 30%, rgba(255, 255, 0, 0.4) 45%, rgba(200, 255, 50, 0.4) 50%, rgba(255, 150, 0, 0.4) 55%, transparent 70%)",
    ],
    purple: [
      "linear-gradient(105deg, transparent 20%, rgba(180, 50, 255, 0.5) 40%, rgba(255, 100, 255, 0.6) 45%, rgba(100, 50, 255, 0.5) 50%, transparent 70%)",
      "linear-gradient(125deg, transparent 30%, rgba(200, 0, 255, 0.4) 45%, rgba(255, 50, 255, 0.4) 50%, rgba(150, 0, 255, 0.4) 55%, transparent 70%)",
    ],
    pink: [
      "linear-gradient(105deg, transparent 20%, rgba(255, 100, 200, 0.5) 40%, rgba(255, 200, 250, 0.6) 45%, rgba(255, 50, 150, 0.5) 50%, transparent 70%)",
      "linear-gradient(125deg, transparent 30%, rgba(255, 50, 200, 0.4) 45%, rgba(255, 150, 250, 0.4) 50%, rgba(255, 0, 150, 0.4) 55%, transparent 70%)",
    ],
    brown: [
      "linear-gradient(105deg, transparent 20%, rgba(210, 105, 30, 0.5) 40%, rgba(255, 200, 100, 0.6) 45%, rgba(160, 82, 45, 0.5) 50%, transparent 70%)",
      "linear-gradient(125deg, transparent 30%, rgba(184, 134, 11, 0.4) 45%, rgba(255, 215, 0, 0.4) 50%, rgba(139, 69, 19, 0.4) 55%, transparent 70%)",
    ],
    black: [
      "linear-gradient(105deg, transparent 20%, rgba(100, 100, 100, 0.5) 40%, rgba(200, 200, 200, 0.6) 45%, rgba(50, 50, 80, 0.5) 50%, transparent 70%)",
      "linear-gradient(125deg, transparent 30%, rgba(80, 80, 80, 0.4) 45%, rgba(150, 150, 150, 0.4) 50%, rgba(50, 50, 150, 0.4) 55%, transparent 70%)",
    ],
    gray: [
      "linear-gradient(105deg, transparent 20%, rgba(150, 150, 150, 0.5) 40%, rgba(220, 220, 220, 0.6) 45%, rgba(100, 100, 120, 0.5) 50%, transparent 70%)",
      "linear-gradient(125deg, transparent 30%, rgba(120, 120, 120, 0.4) 45%, rgba(200, 200, 200, 0.4) 50%, rgba(100, 100, 150, 0.4) 55%, transparent 70%)",
    ],
    white: [
      "linear-gradient(105deg, transparent 20%, rgba(200, 200, 255, 0.5) 40%, rgba(255, 255, 255, 0.5) 45%, rgba(200, 255, 255, 0.5) 50%, transparent 70%)",
      "linear-gradient(125deg, transparent 30%, rgba(180, 180, 220, 0.4) 45%, rgba(240, 240, 255, 0.4) 50%, rgba(180, 220, 220, 0.4) 55%, transparent 70%)",
    ],
  }

  const fallback = [
    "linear-gradient(105deg, transparent 20%, rgba(255, 200, 200, 0.5) 40%, rgba(255, 255, 255, 0.5) 45%, rgba(255, 200, 200, 0.5) 50%, transparent 70%)",
    "linear-gradient(125deg, transparent 30%, rgba(255, 100, 100, 0.4) 45%, rgba(100, 255, 100, 0.4) 50%, rgba(100, 100, 255, 0.4) 55%, transparent 70%)",
  ]

  return (gradients[theme] || fallback)[index]
}

function getWatermarkGridData(name: string) {
  const charWidth = 14
  const wordWidth = name.length * charWidth
  const gapX = 40
  const stepX = wordWidth + gapX
  const stepY = 40

  const numCols = Math.ceil(800 / stepX) + 2
  const numRows = Math.ceil(800 / stepY) + 2

  const items: { x: number; y: number; text: string }[] = []

  for (let row = 0; row < numRows; row++) {
    const xOffset = (row % 2) * (stepX / 2)
    for (let col = -1; col < numCols; col++) {
      const x = col * stepX + xOffset - 200
      const y = row * stepY - 200
      items.push({ x, y, text: name })
    }
  }
  return items
}

function renderWatermarkText(name: string) {
  const items = getWatermarkGridData(name.toUpperCase())
  return items.map((item, i) => (
    <text
      key={i}
      x={item.x}
      y={item.y}
      fontFamily="Pokemon Solid"
      fontSize="24"
      fill="white"
      style={{ letterSpacing: "2px" }}
    >
      {item.text}
    </text>
  ))
}

function resolveSpriteUrl(sprite: SpriteInput): string {
  if (!sprite) return ""
  if (typeof sprite === "string") return sprite

  const anySprite = sprite as any
  if (typeof anySprite.src === "string") return anySprite.src

  return ""
}

export default function HolographicPokemonCard(props: HolographicPokemonCardProps) {
  const {
    name,
    genus,
    dexNumber,
    primaryType,
    colorTheme,
    hp,
    heightM,
    weightKg,
    flavorText,
    spriteUrl,
    showMotionPrompt = true,
  } = props

  const resolvedSpriteUrl = resolveSpriteUrl(spriteUrl)

  const cardRef = useRef<HTMLDivElement | null>(null)
  const lightRef = useRef<SVGFEPointLightElement | null>(null)

  const [showPermissionOverlay, setShowPermissionOverlay] = useState(false)
  const [permissionGranted, setPermissionGranted] = useState(false)
  const [hasStoredConsent, setHasStoredConsent] = useState(false)
  const [isMobileSafari, setIsMobileSafari] = useState(false)

  // PNG mask fallback for iOS Safari
  const [maskImage, setMaskImage] = useState<string>("")

  const orientationState = useRef({
    baselineBeta: 45,
    baselineGamma: 0,
    targetRx: 0,
    targetRy: 0,
    currentRx: 0,
    currentRy: 0,
    lastBeta: 45,
    lastGamma: 0,
    lastMoveTime: 0,
  })

  // Detect iOS Safari
  useEffect(() => {
    if (typeof window === "undefined") return
    const ua = window.navigator.userAgent

    const isIOSLike =
      (/iPad|iPhone|iPod/.test(ua) ||
        (navigator.platform === "MacIntel" && (navigator as any).maxTouchPoints > 1)) &&
      !(window as any).MSStream

    setIsMobileSafari(isIOSLike)
  }, [])

  // Generate PNG fallback mask for iOS, using Pokemon Solid
  useEffect(() => {
    if (!isMobileSafari) return
    if (!name) return

    const generateWatermark = async () => {
      const canvas = document.createElement("canvas")
      const ctx = canvas.getContext("2d")
      if (!ctx) return

      canvas.width = 800
      canvas.height = 800

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      try {
        // @ts-ignore
        if (document.fonts && document.fonts.load) {
          await (document as any).fonts.load('24px "Pokemon Solid"')
        }
      } catch {
        // ignore font loading failure
      }

      ctx.font = '24px "Pokemon Solid", system-ui'
      ctx.fillStyle = "white"

      const scale = canvas.width / 340
      ctx.scale(scale, scale)

      ctx.save()
      ctx.translate(170, 238)
      ctx.rotate((-45 * Math.PI) / 180)
      ctx.translate(-170, -238)

      const items = getWatermarkGridData(name.toUpperCase())
      items.forEach((item) => {
        ctx.fillText(item.text, item.x, item.y)
      })

      ctx.restore()

      const url = canvas.toDataURL("image/png")
      setMaskImage(`url(${url})`)
    }

    generateWatermark()
  }, [isMobileSafari, name])

  // Device orientation handler
  const handleOrientation = (event: DeviceOrientationEvent) => {
    if (event.gamma == null || event.beta == null) return

    const state = orientationState.current
    const now = Date.now()
    const delta = Math.abs(event.beta - state.lastBeta) + Math.abs(event.gamma - state.lastGamma)

    if (delta > 0.5) {
      state.lastMoveTime = now
    }

    state.lastBeta = event.beta
    state.lastGamma = event.gamma
  }

  const requestOrientationPermission = async () => {
    try {
      const DeviceOrientationEventAny = DeviceOrientationEvent as any

      if (typeof DeviceOrientationEventAny?.requestPermission === "function") {
        const permissionState = await DeviceOrientationEventAny.requestPermission()
        if (permissionState === "granted") {
          setPermissionGranted(true)
          setShowPermissionOverlay(false)
          setHasStoredConsent(true)
          try {
            window.localStorage.setItem(MOTION_CONSENT_KEY, "granted")
          } catch {
            // ignore storage issues
          }
          window.addEventListener("deviceorientation", handleOrientation)
        }
      } else {
        setPermissionGranted(true)
        setShowPermissionOverlay(false)
        setHasStoredConsent(true)
        try {
          window.localStorage.setItem(MOTION_CONSENT_KEY, "granted")
        } catch {
          // ignore
        }
        window.addEventListener("deviceorientation", handleOrientation)
      }
    } catch (error) {
      console.error("Motion permission request failed", error)
    }
  }

  // If the user has already granted motion once, skip the popup.
  // On iOS we still need a user gesture to re-request permission.
  useEffect(() => {
    if (typeof window === "undefined") return

    const ua = window.navigator.userAgent
    const isIOSLike =
      (/iPad|iPhone|iPod/.test(ua) ||
        (navigator.platform === "MacIntel" && (navigator as any).maxTouchPoints > 1)) &&
      !(window as any).MSStream

    try {
      const stored = window.localStorage.getItem(MOTION_CONSENT_KEY)
      if (stored === "granted") {
        setHasStoredConsent(true)

        if (!isIOSLike) {
          setPermissionGranted(true)
          window.addEventListener("deviceorientation", handleOrientation)
        } else {
          const onFirstInteraction = () => {
            requestOrientationPermission()
          }

          window.addEventListener("click", onFirstInteraction, { once: true })
          window.addEventListener("touchstart", onFirstInteraction, { once: true })

          return () => {
            window.removeEventListener("click", onFirstInteraction)
            window.removeEventListener("touchstart", onFirstInteraction)
            window.removeEventListener("deviceorientation", handleOrientation)
          }
        }
      }
    } catch {
      // ignore storage issues
    }

    return () => {
      window.removeEventListener("deviceorientation", handleOrientation)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Animation loop that updates CSS variables and light position
  useEffect(() => {
    let animationFrameId: number

    const updateLoop = () => {
      const state = orientationState.current
      const now = Date.now()

      if (permissionGranted) {
        if (now - state.lastMoveTime > 500) {
          const driftSpeed = 0.02
          state.baselineBeta += (state.lastBeta - state.baselineBeta) * driftSpeed
          state.baselineGamma += (state.lastGamma - state.baselineGamma) * driftSpeed
        }

        const rawRx = (state.lastGamma - state.baselineGamma) / 25
        const rawRy = (state.lastBeta - state.baselineBeta) / 25

        state.targetRx = Math.max(-1, Math.min(1, rawRx))
        state.targetRy = Math.max(-1, Math.min(1, rawRy))
      }

      const smooth = 0.1
      state.currentRx += (state.targetRx - state.currentRx) * smooth
      state.currentRy += (state.targetRy - state.currentRy) * smooth

      const card = cardRef.current
      if (card) {
        card.style.setProperty("--pointer-x", state.currentRx.toFixed(3))
        card.style.setProperty("--pointer-y", state.currentRy.toFixed(3))

        if (lightRef.current) {
          const bounds = card.getBoundingClientRect()
          const posX = (state.currentRx * 0.5 + 0.5) * bounds.width
          const posY = (state.currentRy * 0.5 + 0.5) * bounds.height
          lightRef.current.setAttribute("x", posX.toFixed(1))
          lightRef.current.setAttribute("y", posY.toFixed(1))
        }
      }

      animationFrameId = requestAnimationFrame(updateLoop)
    }

    updateLoop()

    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [permissionGranted])

  // Pointer move for desktop
  function updatePointerWithin(bounds: DOMRect, clientX: number, clientY: number) {
    const posX = clientX - bounds.left
    const posY = clientY - bounds.top

    let rx = posX / bounds.width - 0.5
    let ry = posY / bounds.height - 0.5

    const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v))
    rx = clamp(rx * 2, -1, 1)
    ry = clamp(ry * 2, -1, 1)

    const state = orientationState.current
    state.targetRx = rx
    state.targetRy = ry
  }

  useEffect(() => {
    const card = cardRef.current
    if (!card) return

    const handlePointerMove = (event: PointerEvent) => {
      if (permissionGranted) return
      const bounds = card.getBoundingClientRect()
      updatePointerWithin(bounds, event.clientX, event.clientY)
    }

    const handlePointerLeave = () => {
      const state = orientationState.current
      state.targetRx = 0
      state.targetRy = 0
    }

    card.addEventListener("pointermove", handlePointerMove)
    card.addEventListener("pointerleave", handlePointerLeave)

    const bounds = card.getBoundingClientRect()
    updatePointerWithin(bounds, bounds.left + bounds.width / 2, bounds.top + bounds.height)

    return () => {
      card.removeEventListener("pointermove", handlePointerMove)
      card.removeEventListener("pointerleave", handlePointerLeave)
    }
  }, [permissionGranted])

  // Show overlay on mobile if desired
  useEffect(() => {
    if (!showMotionPrompt) return
    if (typeof window === "undefined") return

    const ua = window.navigator.userAgent
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua)

    if (isMobile && !permissionGranted && !hasStoredConsent) {
      setShowPermissionOverlay(true)
    }

    return () => {
      window.removeEventListener("deviceorientation", handleOrientation)
    }
  }, [showMotionPrompt, permissionGranted, hasStoredConsent])

  const theme = getThemeColors(colorTheme)
  const shades = generateColorShades(colorTheme)

  const maskKey =
    dexNumber && dexNumber.trim().length > 0
      ? dexNumber.replace(/[^a-zA-Z0-9_-]/g, "")
      : name.toLowerCase().replace(/[^a-z0-9_-]/g, "-")
  const patternId = `text-pattern-mask-${maskKey}`
  const maskId = `text-mask-${maskKey}`

  const effectiveMaskImage = isMobileSafari && maskImage ? maskImage : `url(#${maskId})`

  return (
    <div className="pokemon-card-root">
      <style>{STYLES}</style>

      {showPermissionOverlay && !permissionGranted && (
        <div className="overlay-backdrop">
          <div className="overlay-card">
            <div className="overlay-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
                <path d="M19 14v8" />
                <path d="M16 17h6" />
              </svg>
            </div>
            <div className="overlay-title">Enable holographic tilt</div>
            <div className="overlay-text">
              Allow access to your device motion sensors to control the shimmer by tilting your phone.
            </div>
            <button className="overlay-primary" type="button" onClick={requestOrientationPermission}>
              Enable motion control
            </button>
            <button
              className="overlay-secondary"
              type="button"
              onClick={() => setShowPermissionOverlay(false)}
            >
              Continue without motion
            </button>
          </div>
        </div>
      )}

      <div className="pokemon-card-wrapper">
        <article ref={cardRef} className="card" data-active="true">
          <div className="card-frame">
            <div className="card-inner" style={{ backgroundColor: theme.cardBg }}>
              {/* Header */}
              <header className="card-header">
                <div className="card-header-left">
                  <span className="card-genus">{genus}</span>
                  <h2 className="card-name">{name}</h2>
                </div>
                <div className="card-header-right">
                  <span className="card-hp">{hp} HP</span>
                  <div className="type-pill" style={{ backgroundColor: theme.typeBg }}>
                    <TypeIcon type={primaryType} />
                  </div>
                </div>
              </header>

              {/* Art + holo */}
              <div className="art-wrapper holo-card">
                <div className="card__content">
                  <div className="card-bg">
                    <div
                      className="card-bg-pattern"
                      style={{
                        // @ts-ignore custom CSS vars
                        "--u": "0.25vmin",
                        // @ts-ignore
                        "--c1": shades[0],
                        // @ts-ignore
                        "--c2": shades[1],
                        // @ts-ignore
                        "--c3": shades[2],
                        // @ts-ignore
                        "--c4": shades[3],
                        // @ts-ignore
                        "--c5": shades[4],
                        // @ts-ignore
                        "--gp": "50%/calc(var(--u) * 10) calc(var(--u) * 17.67)",
                        background: `
                          conic-gradient(from 90deg at 99% 67%, var(--c5) 0 90deg, #fff0 0 360deg) var(--gp),
                          conic-gradient(from 180deg at 1% 67%, var(--c5) 0 90deg, #fff0 0 360deg) var(--gp),
                          conic-gradient(from 0deg at 99% 33%, var(--c5) 0 90deg, #fff0 0 360deg) var(--gp),
                          conic-gradient(from -90deg at 1% 33%, var(--c5) 0 90deg, #fff0 0 360deg) var(--gp),
                          conic-gradient(from -60deg at 50% 15.5%, var(--c3) 0 120deg, #fff0 0 360deg) var(--gp),
                          conic-gradient(from -60deg at 50% 16.75%, var(--c5) 0 120deg, #fff0 0 360deg) var(--gp),
                          conic-gradient(from 120deg at 50% 83.25%, var(--c5) 0 120deg, #fff0 0 360deg) var(--gp),
                          linear-gradient(32deg, #fff0 0 49.5%, var(--c5) 0 50.5%, #fff0 0 100%) var(--gp),
                          linear-gradient(-32deg, #fff0 0 49.5%, var(--c5) 0 50.5%, #fff0 0 100%) var(--gp),
                          linear-gradient(-90deg, #fff0 0 49%, var(--c5) 0 51%, #fff0 0 100%) var(--gp),
                          linear-gradient(60.5deg, #fff0 0 49.5%, var(--c5) 0 50.5%, #fff0 0 100%) var(--gp),
                          linear-gradient(-60.5deg, #fff0 0 49.5%, var(--c5) 0 50.5%, #fff0 0 100%) var(--gp),
                          conic-gradient(from -90deg at 50% 50%, var(--c5) 0 32deg, var(--c3) 0 60.5deg, var(--c4) 0 90deg, var(--c5) 0 119.5deg, var(--c1) 0 148deg, var(--c5) 0 180deg, #fff0 0 360deg) var(--gp),
                          conic-gradient(from 90deg at 50% 50%, var(--c2) 0 32deg, var(--c4) 0 60.5deg, var(--c3) 0 90deg, var(--c1) 0 119.5deg, var(--c5) 0 148deg, var(--c2) 0 180deg, #fff0 0 360deg) var(--gp)
                        `,
                        backgroundColor: shades[4],
                      }}
                    />

                    {/* Watermark mask + refraction */}
                    <div className="holo-images">
                      <svg className="mask-svg">
                        <defs>
                          <pattern
                            id={patternId}
                            x="0"
                            y="0"
                            width="100%"
                            height="100%"
                            patternUnits="userSpaceOnUse"
                          >
                            <g transform="rotate(-45, 170, 238)">{renderWatermarkText(name)}</g>
                          </pattern>
                          <mask id={maskId}>
                            <rect width="100%" height="100%" fill="black" />
                            <rect width="100%" height="100%" fill={`url(#${patternId})`} />
                          </mask>
                        </defs>
                      </svg>

                      <div
                        className="watermark"
                        style={{
                          maskImage: effectiveMaskImage,
                          WebkitMaskImage: effectiveMaskImage,
                          maskType: "luminance",
                          WebkitMaskType: "luminance",
                          maskRepeat: "no-repeat",
                          WebkitMaskRepeat: "no-repeat",
                          maskPosition: "center",
                          WebkitMaskPosition: "center",
                          maskSize: "cover",
                          WebkitMaskSize: "cover",
                        }}
                      >
                        <div
                          className="refraction"
                          style={{ background: getRefractionGradient(colorTheme, 0) }}
                        />
                        <div
                          className="refraction"
                          style={{ background: getRefractionGradient(colorTheme, 1) }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Spotlight */}
                  <div className="spotlight" />

                  {/* Foreground art */}
                  <div className="art-foreground">
                    <img src={resolvedSpriteUrl} alt={name} className="art-img" />
                    <img
                      src={resolvedSpriteUrl}
                      alt=""
                      className="art-img"
                      style={{
                        filter: "url(#puffy)",
                        mixBlendMode: "overlay",
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Meta strip + flavor */}
              <div className="card-meta">
                <span>NO. {dexNumber}</span>
                <span>HT: {heightM.toFixed(1)}m</span>
                <span>WT: {weightKg.toFixed(1)}kg</span>
                <span>{primaryType} type</span>
              </div>

              <div className="card-flavor">{flavorText}</div>
            </div>

            <div className="noise-overlay" />
          </div>
        </article>
      </div>

      {/* SVG filter */}
      <svg className="sr-only-svg" aria-hidden="true">
        <defs>
          <filter id="puffy" colorInterpolationFilters="sRGB" primitiveUnits="userSpaceOnUse">
            <feGaussianBlur in="SourceAlpha" stdDeviation="3" result="blur1" />
            <feSpecularLighting
              result="spec1"
              in="blur1"
              surfaceScale="6"
              specularConstant="0.7"
              specularExponent="40"
              lightingColor="#f0f0f0"
            >
              <fePointLight ref={lightRef} x="150" y="150" z="300" />
            </feSpecularLighting>
            <feComposite in="spec1" in2="SourceAlpha" operator="in" result="specOut2" />
            <feComponentTransfer in="specOut2" result="specOut3">
              <feFuncR type="table" tableValues="0 0.5 0.8" />
              <feFuncG type="table" tableValues="0 0.5 0.8" />
              <feFuncB type="table" tableValues="0 0.5 0.8" />
            </feComponentTransfer>
            <feComposite in="SourceGraphic" in2="specOut3" operator="arithmetic" k1="0" k2="1" k3="1" k4="0" />
          </filter>
        </defs>
      </svg>
    </div>
  )
}
