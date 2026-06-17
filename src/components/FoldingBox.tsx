import { useMemo } from 'react'
import * as THREE from 'three'
import { Edges } from '@react-three/drei'
import type { PackingResult } from '../lib/packing'

const CARDBOARD = '#c49a5f'
const CARDBOARD_FLAP = '#b9883f'
const PRODUCT_COLOR = '#3b82f6'

// clamp + remapeo de un sub-rango [a,b] del parámetro global de plegado
function sub(t: number, a: number, b: number) {
  return THREE.MathUtils.clamp((t - a) / (b - a), 0, 1)
}
// easing suave
function ease(x: number) {
  return x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2
}

interface Props {
  result: PackingResult
  fold: number // 0 = plano (desplegado), 1 = montado
  showProduct: boolean
  xray?: boolean // caja translúcida para ver el contenido
}

function Panel({
  size,
  color,
  flap = false,
  opacity = 1,
}: {
  size: [number, number, number]
  color: string
  flap?: boolean
  opacity?: number
}) {
  const transparent = opacity < 1
  return (
    <mesh castShadow={!transparent} receiveShadow>
      <boxGeometry args={size} />
      <meshStandardMaterial
        color={color}
        roughness={0.85}
        metalness={0}
        side={THREE.DoubleSide}
        transparent={transparent}
        opacity={opacity}
        depthWrite={!transparent}
      />
      <Edges threshold={15} color={flap ? '#7a5a23' : '#8a6a2c'} />
    </mesh>
  )
}

export default function FoldingBox({
  result,
  fold,
  showProduct,
  xray = false,
}: Props) {
  const L = result.outer.x // largo (X)
  const H = result.outer.y // alto (Y)
  const W = result.outer.z // ancho (Z)
  const t = Math.max(0.6, result.outer.y - result.inner.y) / 2 || 1 // grosor cartón
  const tt = Math.max(t, 0.8)

  // Escala para que la caja entre cómoda en la escena
  const scale = 6 / Math.max(L, W, H)

  // Fases del plegado
  const wallF = ease(sub(fold, 0.05, 0.65)) // 0..1 paredes suben
  const flapF = ease(sub(fold, 0.68, 1.0)) // 0..1 solapas cierran

  // Opacidad del cartón: translúcido en modo rayos-X (o casi montado en rayos-X)
  const wallOpacity = xray ? 0.18 : 1

  // El contenido (las unidades) está apoyado sobre la base, que nunca se mueve,
  // así que se mantiene visible siempre. La caja opaca lo tapa; en rayos-X se ve.
  const productVisible = showProduct
  const productOpacity = xray ? 0.92 : 1

  const wallAngle = wallF * (Math.PI / 2)
  const flapAngle = flapF * (Math.PI / 2)

  // Posiciones de las unidades: empaquetadas TOCÁNDOSE (sin huecos entre ellas),
  // apoyadas en la base (gravedad) y el bloque centrado en X/Z. La holgura queda
  // como margen alrededor del bloque y de headroom arriba, no entre piezas.
  const units = useMemo(() => {
    const { nx, ny, nz } = result.grid
    const { x: cx, y: cy, z: cz } = result.cell
    // Solo dibujamos las unidades reales que caben (puede sobrar capacidad)
    const fillCount = Math.min(result.unitsPerBox, nx * ny * nz, 400)
    const blockX = nx * cx
    const blockZ = nz * cz
    const startX = -blockX / 2 + cx / 2 // bloque centrado en X
    const startZ = -blockZ / 2 + cz / 2 // bloque centrado en Z
    const startY = tt / 2 + cy / 2 // apoyado sobre la base, apilado tocándose
    const positions: [number, number, number][] = []
    // iy exterior => rellena de abajo a arriba (gravedad: capas inferiores primero)
    for (let iy = 0; iy < ny; iy++)
      for (let ix = 0; ix < nx; ix++)
        for (let iz = 0; iz < nz; iz++)
          positions.push([startX + ix * cx, startY + iy * cy, startZ + iz * cz])
    return positions.slice(0, fillCount)
  }, [result, tt])

  return (
    <group scale={scale} position={[0, (-H / 2) * scale, 0]}>
      {/* Base */}
      <group position={[0, tt / 2, 0]}>
        <Panel size={[L, tt, W]} color={CARDBOARD} opacity={wallOpacity} />
      </group>

      {/* Pared +X (derecha) */}
      <group position={[L / 2, 0, 0]} rotation={[0, 0, wallAngle]}>
        <group position={[H / 2, 0, 0]}>
          <Panel size={[H, tt, W]} color={CARDBOARD} opacity={wallOpacity} />
        </group>
        {/* Solapa superior pared +X */}
        <group position={[H, 0, 0]} rotation={[0, 0, flapAngle]}>
          <group position={[L / 4, 0, 0]}>
            <Panel size={[L / 2, tt, W]} color={CARDBOARD_FLAP} flap opacity={wallOpacity} />
          </group>
        </group>
      </group>

      {/* Pared -X (izquierda) */}
      <group position={[-L / 2, 0, 0]} rotation={[0, 0, -wallAngle]}>
        <group position={[-H / 2, 0, 0]}>
          <Panel size={[H, tt, W]} color={CARDBOARD} opacity={wallOpacity} />
        </group>
        {/* Solapa superior pared -X */}
        <group position={[-H, 0, 0]} rotation={[0, 0, -flapAngle]}>
          <group position={[-L / 4, 0, 0]}>
            <Panel size={[L / 2, tt, W]} color={CARDBOARD_FLAP} flap opacity={wallOpacity} />
          </group>
        </group>
      </group>

      {/* Pared +Z (frontal) */}
      <group position={[0, 0, W / 2]} rotation={[-wallAngle, 0, 0]}>
        <group position={[0, 0, H / 2]}>
          <Panel size={[L, tt, H]} color={CARDBOARD} opacity={wallOpacity} />
        </group>
      </group>

      {/* Pared -Z (trasera) */}
      <group position={[0, 0, -W / 2]} rotation={[wallAngle, 0, 0]}>
        <group position={[0, 0, -H / 2]}>
          <Panel size={[L, tt, H]} color={CARDBOARD} opacity={wallOpacity} />
        </group>
      </group>

      {/* Contenido (unidades del producto) */}
      {productVisible &&
        units.map((p, i) => (
          <mesh key={i} position={p} castShadow>
            <boxGeometry
              args={[
                result.cell.x * 0.99,
                result.cell.y * 0.99,
                result.cell.z * 0.99,
              ]}
            />
            <meshStandardMaterial
              color={PRODUCT_COLOR}
              transparent={productOpacity < 1}
              opacity={productOpacity}
              roughness={0.4}
            />
          </mesh>
        ))}
    </group>
  )
}
