// components/HolographicPokemonCard.tsx
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

export type PokemonColor =
  | "red"
  | "blue"
  | "yellow"
  | "green"
  | "black"
  | "brown"
  | "purple"
  | "gray"
  | "white"
  | "pink"

export interface HolographicPokemonCardProps {
  name?: string
  genus?: string
  dexNumber?: number
  primaryType?: string
  color?: PokemonColor | string

  hp?: number
  heightMeters?: number
  weightKg?: number

  flavorText?: string
  spriteUrl?: string
}

const PokemonTypeIcon = ({
  type,
  className,
}: {
  type?: string
  className?: string
}) => {
  switch (type?.toLowerCase()) {
    case "fire":
      return <Flame className={className} />
    case "water":
      return <Droplets className={className} />
    case "grass":
      return <Leaf className={className} />
    case "electric":
      return <Zap className={className} />
    case "ice":
      return <Snowflake className={className} />
    case "fighting":
      return <Swords className={className} />
    case "poison":
      return <Skull className={className} />
    case "ground":
      return <Mountain className={className} />
    case "flying":
      return <Wind className={className} />
    case "psychic":
      return <Eye className={className} />
    case "bug":
      return <Bug className={className} />
    case "rock":
      return <Hexagon className={className} />
    case "ghost":
      return <Ghost className={className} />
    case "dragon":
      return <Crown className={className} />
    case "steel":
      return <Shield className={className} />
    case "dark":
      return <Moon className={className} />
    case "fairy":
      return <Star className={className} />
    case "normal":
    default:
      return <Circle className={className} />
  }
}

const getColorClass = (color: string) => {
  const colors: Record<string, string> = {
    red: "bg-red-500",
    blue: "bg-blue-500",
    yellow: "bg-yellow-400",
    green: "bg-green-500",
    black: "bg-zinc-800",
    brown: "bg-amber-700",
    purple: "bg-purple-500",
    gray: "bg-gray-500",
    white: "bg-slate-200",
    pink: "bg-pink-400",
  }
  return colors[color] || "bg-slate-500"
}

const getBackgroundStyle = (color: string) => {
  const map: Record<string, string> = {
    red: "#fca5a5",
    blue: "#93c5fd",
    yellow: "#fde047",
    green: "#86efac",
    black: "#52525b",
    brown: "#d97706",
    purple: "#d8b4fe",
    gray: "#94a3b8",
    white: "#e2e8f0",
    pink: "#f9a8d4",
  }
  return map[color] || "#cbd5e1"
}

const generateColorShades = (baseColor: string) => {
  const colorMap: Record<string, string[]> = {
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

  return colorMap[baseColor] || colorMap["gray"]
}

const getRefractionGradient = (color: string, index: number) => {
  const gradients: Record<string, string[]> = {
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

  const def = [
    "linear-gradient(105deg, transparent 20%, rgba(255, 200, 200, 0.5) 40%, rgba(255, 255, 255, 0.5) 45%, rgba(255, 200, 200, 0.5) 50%, transparent 70%)",
    "linear-gradient(125deg, transparent 30%, rgba(255, 100, 100, 0.4) 45%, rgba(100, 255, 100, 0.4) 50%, rgba(100, 100, 255, 0.4) 55%, transparent 70%)",
  ]

  return (gradients[color] || def)[index]
}

const formatDex = (n?: number) => {
  if (!n || n < 1) return "000"
  return n.toString().padStart(3, "0")
}

const getWatermarkGridData = (name: string) => {
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

const generateWatermarkGrid = (name: string) => {
  const items = getWatermarkGridData(name)
  return items.map((item, i) => (
    <text
      key={i}
      x={item.x}
      y={item.y}
      fontFamily="Pokemon Solid"
      fontSize="24"
      fill="white"
      className="uppercase"
      style={{ letterSpacing: "2px" }}
    >
      {item.text}
    </text>
  ))
}

export const HolographicPokemonCard: React.FC<HolographicPokemonCardProps> = (props) => {
  const {
    name = "Pikachu",
    genus = "Mouse Pokémon",
    dexNumber = 25,
    primaryType = "electric",
    color = "yellow",
    hp = 60,
    heightMeters = 0.4,
    weightKg = 6,
    flavorText = "When several of these Pokémon gather, their electricity could build and cause lightning storms.",
    spriteUrl = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png",
  } = props

  const [maskImage, setMaskImage] = useState<string>("")
  const [isMobileSafari, setIsMobileSafari] = useState(false)
  const [showPermissionOverlay, setShowPermissionOverlay] = useState(false)
  const [permissionGranted, setPermissionGranted] = useState(false)

  const cardRef = useRef<HTMLDivElement>(null)
  const lightRef = useRef<SVGFEPointLightElement>(null)

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
    if (event.gamma === null || event.beta === null) return

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
    if (typeof (DeviceOrientationEvent as any).requestPermission === "function") {
      try {
        const permissionState = await (DeviceOrientationEvent as any).requestPermission()
        if (permissionState === "granted") {
          setPermissionGranted(true)
          setShowPermissionOverlay(false)
          window.addEventListener("deviceorientation", handleOrientation)
        }
      } catch (error) {
        console.error("Permission request failed", error)
      }
    } else {
      setPermissionGranted(true)
      setShowPermissionOverlay(false)
      window.addEventListener("deviceorientation", handleOrientation)
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

      const smoothFactor = 0.1

      state.currentRx += (state.targetRx - state.currentRx) * smoothFactor
      state.currentRy += (state.targetRy - state.currentRy) * smoothFactor

      document.documentElement.style.setProperty("--pointer-x", state.currentRx.toFixed(3))
      document.documentElement.style.setProperty("--pointer-y", state.currentRy.toFixed(3))

      const tiltUp = Math.max(0, -state.currentRy)
      const dynamicScale = 1.25 + tiltUp * 0.4
      document.documentElement.style.setProperty("--poke-scale", dynamicScale.toFixed(3))

      if (lightRef.current && cardRef.current) {
        const bounds = cardRef.current.getBoundingClientRect()
        const posX = (state.currentRx * 0.5 + 0.5) * bounds.width
        const posY = (state.currentRy * 0.5 + 0.5) * bounds.height

        lightRef.current.setAttribute("x", posX.toFixed(1))
        lightRef.current.setAttribute("y", posY.toFixed(1))
      }

      animationFrameId = requestAnimationFrame(updateLoop)
    }

    updateLoop()

    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [permissionGranted])

  useEffect(() => {
    const ua = window.navigator.userAgent
    const isIOS =
      (/iPad|iPhone|iPod/.test(ua) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)) &&
      !(window as any).MSStream

    if (isIOS) {
      setIsMobileSafari(true)
    }

    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua)
    if (isMobile) {
      setShowPermissionOverlay(true)
    }

    return () => {
      window.removeEventListener("deviceorientation", handleOrientation)
    }
  }, [])

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

  const handlePointerMove = (event: PointerEvent) => {
    if (permissionGranted) return
    const bounds = cardRef.current?.getBoundingClientRect()
    if (bounds) {
      updatePointerWithin(bounds, event.clientX, event.clientY)
    }
  }

  const handlePointerLeave = () => {
    const state = orientationState.current
    state.targetRx = 0
    state.targetRy = 0
  }

  useEffect(() => {
    const card = cardRef.current
    if (!card) return

    card.addEventListener("pointermove", handlePointerMove)
    card.addEventListener("pointerleave", handlePointerLeave)

    const bounds = card.getBoundingClientRect()
    updatePointerWithin(bounds, bounds.left + bounds.width / 2, bounds.top + bounds.height)

    return () => {
      card.removeEventListener("pointermove", handlePointerMove)
      card.removeEventListener("pointerleave", handlePointerLeave)
    }
  }, [])

  useEffect(() => {
    if (!isMobileSafari) return

    const generateWatermark = async () => {
      try {
        await document.fonts.load('24px "Pokemon Solid"')
      } catch (e) {
        console.error("Font loading failed", e)
      }

      const canvas = document.createElement("canvas")
      const ctx = canvas.getContext("2d")
      if (!ctx) return

      canvas.width = 800
      canvas.height = 800

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      ctx.font = '24px "Pokemon Solid"'
      ctx.fillStyle = "white"

      const scale = canvas.width / 340
      ctx.scale(scale, scale)

      ctx.save()
      ctx.translate(170, 238)
      ctx.rotate((-45 * Math.PI) / 180)
      ctx.translate(-170, -238)

      const items = getWatermarkGridData(name)
      items.forEach((item) => {
        ctx.fillText(item.text.toUpperCase(), item.x, item.y)
      })

      ctx.restore()

      setMaskImage(`url(${canvas.toDataURL("image/png")})`)
    }

    generateWatermark()
  }, [name, isMobileSafari])

  const shades = generateColorShades(color)

  return (
    <div className="relative flex flex-col items-center justify-center">
      {showPermissionOverlay && !permissionGranted && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-white rounded-xl p-6 max-w-sm w-full text-center space-y-4 shadow-2xl">
            <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
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
            <h3 className="text-xl font-bold text-gray-900">Enable Holographic Effect</h3>
            <p className="text-gray-600">
              Allow access to your device&apos;s gyroscope to control the holographic shimmer by tilting your phone.
            </p>
            <button
              onClick={requestOrientationPermission}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-all"
            >
              Enable Motion Control
            </button>
            <button
              onClick={() => setShowPermissionOverlay(false)}
              className="text-sm text-gray-500 hover:text-gray-700 underline"
            >
              Continue without motion
            </button>
          </div>
        </div>
      )}

      <div className="perspective-[1000px] transform-gpu">
        <article
          ref={cardRef}
          className="card relative w-[340px] aspect-[2.5/3.5] touch-none perspective-[1600px] cursor-pointer group"
          data-active="true"
        >
          <div className="absolute inset-0 rounded-[16px] backface-hidden bg-[#fcd34d] p-[12px] shadow-xl">
            <div
              className="relative h-full w-full rounded-[8px] flex flex-col overflow-hidden"
              style={{ backgroundColor: getBackgroundStyle(color) }}
            >
              <div className="relative z-50 flex justify-between items-center px-3 py-1.5">
                <div className="flex flex-col">
                  <span className="font-bold text-sm text-black/60 capitalize">{genus}</span>
                  <h2 className="font-bold text-xl leading-none text-black capitalize">{name}</h2>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-red-600 font-bold text-lg">{hp} HP</span>
                  <div
                    className={`w-6 h-6 rounded-full ${getColorClass(color)} border border-white shadow-sm flex items-center justify-center`}
                  >
                    <PokemonTypeIcon type={primaryType} className="w-3.5 h-3.5 text-white" />
                  </div>
                </div>
              </div>

              <div className="holo-card relative mx-3 aspect-[4/3] border-4 border-[#fbbf24] shadow-inner bg-[#fff] rounded-sm">
                <div className="card__content h-full w-full">
                  <div className="card__front h-full w-full relative">
                    <div className="absolute inset-0 overflow-hidden rounded-sm">
                      <div
                        className="absolute inset-0 z-0 opacity-50 mix-blend-multiply transition-all duration-500"
                        style={
                          {
                            "--u": "0.25vmin",
                            "--c1": shades[0],
                            "--c2": shades[1],
                            "--c3": shades[2],
                            "--c4": shades[3],
                            "--c5": shades[4],
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
                          } as React.CSSProperties
                        }
                      />

                      <div className="holo-images absolute inset-0 z-10 pointer-events-none">
                        <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0 }}>
                          <defs>
                            <pattern
                              id={`text-pattern-mask-${dexNumber}`}
                              x="0"
                              y="0"
                              width="100%"
                              height="100%"
                              patternUnits="userSpaceOnUse"
                            >
                              <g transform="rotate(-45, 170, 238)">{generateWatermarkGrid(name)}</g>
                            </pattern>
                            <mask id={`text-mask-${dexNumber}`}>
                              <rect width="100%" height="100%" fill="black" />
                              <rect width="100%" height="100%" fill={`url(#text-pattern-mask-${dexNumber})`} />
                            </mask>
                          </defs>
                        </svg>

                        <div
                          className="watermark absolute inset-0 z-10"
                          style={{
                            maskImage: isMobileSafari && maskImage ? maskImage : `url(#text-mask-${dexNumber})`,
                            WebkitMaskImage:
                              isMobileSafari && maskImage ? maskImage : `url(#text-mask-${dexNumber})`,
                            maskType: "luminance",
                            WebkitMaskType: "luminance",
                            maskRepeat: "no-repeat",
                            WebkitMaskRepeat: "no-repeat",
                            maskPosition: "center",
                            WebkitMaskPosition: "center",
                            maskSize: "cover",
                            WebkitMaskSize: "cover",
                            mixBlendMode: "hard-light",
                            opacity: 0.5,
                          }}
                        >
                          <div
                            className="refraction"
                            style={{ background: getRefractionGradient(color, 0) }}
                          ></div>
                          <div
                            className="refraction"
                            style={{ background: getRefractionGradient(color, 1) }}
                          ></div>
                        </div>
                      </div>

                      <div className="spotlight absolute inset-0 z-40"></div>
                    </div>

                    <div className="absolute inset-0 z-30 pointer-events-none">
                      <img
                        src={spriteUrl || "/placeholder.svg"}
                        alt={name}
                        className="absolute inset-0 w-full h-full object-contain p-4 transition-transform duration-75"
                        style={{ transform: "scale(var(--poke-scale, 1.25))" }}
                      />
                      <img
                        src={spriteUrl || "/placeholder.svg"}
                        alt=""
                        className="absolute inset-0 w-full h-full object-contain p-4 transition-transform duration-75"
                        style={{
                          filter: "url(#puffy)",
                          mixBlendMode: "overlay",
                          transform: "scale(var(--poke-scale, 1.25))",
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mx-4 my-1.5 bg-[#fbbf24] px-2 py-0.5 flex justify-between items-center text-[10px] font-bold text-amber-900 shadow-sm skew-x-[-10deg]">
                <span className="skew-x-[10deg]">NO. {formatDex(dexNumber)}</span>
                <span className="skew-x-[10deg]">HT: {heightMeters.toFixed(1)}m</span>
                <span className="skew-x-[10deg]">WT: {weightKg.toFixed(1)}kg</span>
                <span className="skew-x-[10deg] capitalize">{primaryType} Type</span>
              </div>

              <div className="mx-3 mb-2 p-1.5 border border-black/10 bg-white/30 rounded text-xs leading-snug italic text-black/80 flex-1 flex items-center justify-center text-center [text-wrap:balance]">
                {flavorText}
              </div>
            </div>

            <div className="absolute inset-0 rounded-[16px] opacity-30 mix-blend-overlay pointer-events-none z-30 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] brightness-100 contrast-125" />

            <div
              className="absolute inset-0 rounded-[16px] z-40 pointer-events-none mix-blend-soft-light opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background: `radial-gradient(
                  circle at calc(50% + var(--pointer-x) * 50%) calc(50% + var(--pointer-y) * 50%), 
                  rgba(255,255,255,0.4) 0%, 
                  transparent 60%
                )`,
              }}
            />
          </div>
        </article>
      </div>

      <svg className="invisible absolute w-0 h-0">
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
            <feComposite
              in="SourceGraphic"
              in2="specOut3"
              operator="arithmetic"
              k1="0"
              k2="1"
              k3="1"
              k4="0"
              result="litPaint"
            />
          </filter>
        </defs>
      </svg>
    </div>
  )
}

export default HolographicPokemonCard
