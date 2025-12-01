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
.pokemon-card-root {
  position: relative;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  color: #ffffff;
}

.pokemon-card-wrapper {
  background: #020617;
  padding: 16px;
  border-radius: 16px;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.6);
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
  z-index: 1;
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
  box-shadow:
    inset 0 0 0 1px rgba(0, 0, 0, 0.08),
    0 6px 14px rgba(0, 0, 0, 0.4);
  aspect-ratio: 4 / 3;
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
  opacity: 0.6;
  mix-blend-mode: multiply;
}

.card-bg-gradient {
  position: absolute;
  inset: -50%;
  width: 200%;
  height: 200%;
  background:
    radial-gradient(circle at 0% 0%, rgba(255, 255, 255, 0.9), transparent 55%),
    radial-gradient(circle at 100% 0%, rgba(255, 255, 255, 0.7), transparent 55%),
    radial-gradient(circle at 0% 100%, rgba(255, 255, 255, 0.6), transparent 55%),
    radial-gradient(circle at 100% 100%, rgba(255, 255, 255, 0.85), transparent 55%);
}

/* REFRACTION LAYERS */

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
  opacity: 0;
  transform:
    translateX(calc(var(--pointer-x, 0) * -25%))
    translateY(calc(var(--pointer-y, 0) * -25%));
  transition: opacity 0.3s;
  pointer-events: none;
}

.card:hover .refraction {
  opacity: 0.75;
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
}

/* ART IMAGE */

.art-foreground {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.art-img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
  padding: 12px;
  transform: scale(var(--poke-scale, 1.25));
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

/* SMALL UTILS */

.hidden {
  display: none;
}
`

type PokemonType =
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

type ColorTheme = "red" | "blue" | "yellow" | "green" | "purple" | "pink" | "brown" | "black" | "gray" | "white"

type SpriteInput = unknown

function resolveSpriteUrl(sprite: SpriteInput): string {
  if (!sprite) return ""

  // Direct string URL
  if (typeof sprite === "string") return sprite

  if (typeof sprite === "object") {
    const anySprite = sprite as any

    // Common fields
    if (typeof anySprite.url === "string") return anySprite.url
    if (typeof anySprite.src === "string") return anySprite.src
    if (typeof anySprite.href === "string") return anySprite.href

    // Nested shapes like { file: { url } }
    if (anySprite.file && typeof anySprite.file.url === "string") {
      return anySprite.file.url
    }

    // { value: string | { url } }
    if (anySprite.value) {
      if (typeof anySprite.value === "string") return anySprite.value
      if (typeof anySprite.value.url === "string") return anySprite.value.url
      if (typeof anySprite.value.src === "string") return anySprite.value.src
    }
  }

  return ""
}

export interface HolographicPokemonCardProps {
  name: string
  genus: string
  dexNumber: string
  primaryType: PokemonType
  colorTheme: ColorTheme
  hp: number
  heightM: number
  weightKg: number
  flavorText: string
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
      return { cardBg: "#fecaca", typeBg: "#ef4444" }
    case "blue":
      return { cardBg: "#bfdbfe", typeBg: "#3b82f6" }
    case "yellow":
      return { cardBg: "#fef08a", typeBg: "#facc15" }
    case "green":
      return { cardBg: "#bbf7d0", typeBg: "#22c55e" }
    case "purple":
      return { cardBg: "#e9d5ff", typeBg: "#a855f7" }
    case "pink":
      return { cardBg: "#fbcfe8", typeBg: "#ec4899" }
    case "brown":
      return { cardBg: "#fed7aa", typeBg: "#b45309" }
    case "black":
      return { cardBg: "#71717a", typeBg: "#020617" }
    case "gray":
      return { cardBg: "#cbd5f5", typeBg: "#6b7280" }
    case "white":
      return { cardBg: "#e2e8f0", typeBg: "#94a3b8" }
    default:
      return { cardBg: "#e2e8f0", typeBg: "#64748b" }
  }
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

  // Debug to see what Webflow passes, check this in the browser console
  console.log("spriteUrl prop from Webflow:", spriteUrl)

  const resolvedSpriteUrl = resolveSpriteUrl(spriteUrl)

  const cardRef = useRef<HTMLDivElement | null>(null)
  const lightRef = useRef<SVGFEPointLightElement | null>(null)

  const [showPermissionOverlay, setShowPermissionOverlay] = useState(false)
  const [permissionGranted, setPermissionGranted] = useState(false)

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
          window.addEventListener("deviceorientation", handleOrientation)
        }
      } else {
        setPermissionGranted(true)
        setShowPermissionOverlay(false)
        window.addEventListener("deviceorientation", handleOrientation)
      }
    } catch (error) {
      console.error("Motion permission request failed", error)
    }
  }

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

        const tiltUp = Math.max(0, -state.currentRy)
        const dynamicScale = 1.25 + tiltUp * 0.4
        card.style.setProperty("--poke-scale", dynamicScale.toFixed(3))

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

  useEffect(() => {
    if (!showMotionPrompt) return

    const ua = typeof window !== "undefined" ? window.navigator.userAgent : ""
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua)

    if (isMobile) {
      setShowPermissionOverlay(true)
    }

    return () => {
      window.removeEventListener("deviceorientation", handleOrientation)
    }
  }, [showMotionPrompt])

  const theme = getThemeColors(colorTheme)

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

              <div className="art-wrapper holo-card">
                <div className="card__content">
                  <div className="card-bg">
                    <div className="card-bg-gradient" />
                    <div className="refraction" />
                    <div className="refraction" />
                  </div>

                  <div className="spotlight" />

                  <div className="art-foreground">
                    <img
                      src={resolvedSpriteUrl}
                      alt={name}
                      className="art-img"
                    />
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

      <svg className="hidden" aria-hidden="true">
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
