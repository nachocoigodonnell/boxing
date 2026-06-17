// Lógica de cálculo de packing en grid para una caja RSC.
// Todas las medidas en milímetros (mm) y pesos en gramos (g).

export interface ProductSpec {
  length: number // L del producto (mm)
  width: number // W del producto (mm)
  height: number // H del producto (mm)
  weight: number // peso por unidad (g)
}

export interface BoxConstraints {
  quantity: number // N total de unidades a empaquetar
  clearance: number // holgura total por dimensión interior (mm)
  thickness: number // grosor del cartón (mm)
  maxBoxWeight: number // peso máximo admisible por caja (g, 0 = sin límite)
}

export interface PackingResult {
  // Grid de unidades dentro de la caja
  grid: { nx: number; ny: number; nz: number }
  // Dimensión de cada unidad ya orientada según la mejor rotación (mm)
  cell: { x: number; y: number; z: number }
  // Dimensiones interiores de la caja (mm)
  inner: { x: number; y: number; z: number }
  // Dimensiones exteriores de la caja (mm)
  outer: { x: number; y: number; z: number }
  unitsPerBox: number // unidades reales que caben en una caja
  capacity: number // capacidad del grid (nx*ny*nz, puede ser >= unitsPerBox)
  boxesNeeded: number // nº de cajas para empaquetar las N unidades
  boxWeight: number // peso de una caja llena (g)
  fillRate: number // % de aprovechamiento de volumen (producto / interior)
  limitedByWeight: boolean // true si el peso máximo limitó la capacidad
}

// Las 6 orientaciones posibles de una caja rectangular.
function orientations(p: ProductSpec): Array<[number, number, number]> {
  const { length: l, width: w, height: h } = p
  return [
    [l, w, h],
    [l, h, w],
    [w, l, h],
    [w, h, l],
    [h, l, w],
    [h, w, l],
  ]
}

// Dada una capacidad objetivo, encuentra el grid (nx,ny,nz) cuyo producto
// es >= target y que minimiza el volumen exterior de la caja.
function bestGridForOrientation(
  dims: [number, number, number],
  target: number,
  c: BoxConstraints
): { result: PackingResult; volume: number } | null {
  const [cx, cy, cz] = dims
  let best: { result: PackingResult; volume: number } | null = null

  // Acotamos la búsqueda: nx, ny hasta target; nz se deduce.
  const cap = Math.max(1, target)
  for (let nx = 1; nx <= cap; nx++) {
    for (let ny = 1; ny <= Math.ceil(cap / nx); ny++) {
      const nz = Math.ceil(cap / (nx * ny))
      const capacity = nx * ny * nz
      if (capacity < cap) continue

      const inner = {
        x: nx * cx + c.clearance,
        y: ny * cy + c.clearance,
        z: nz * cz + c.clearance,
      }
      const outer = {
        x: inner.x + 2 * c.thickness,
        y: inner.y + 2 * c.thickness,
        z: inner.z + 2 * c.thickness,
      }
      const volume = outer.x * outer.y * outer.z

      // Penalización suave para favorecer cajas más cúbicas (más resistentes)
      const maxd = Math.max(outer.x, outer.y, outer.z)
      const mind = Math.min(outer.x, outer.y, outer.z)
      const cubeness = maxd / mind // 1 = cubo perfecto
      const score = volume * (1 + 0.04 * (cubeness - 1))

      if (!best || score < best.volume) {
        const result: PackingResult = {
          grid: { nx, ny, nz },
          cell: { x: cx, y: cy, z: cz },
          inner,
          outer,
          unitsPerBox: cap,
          capacity,
          boxesNeeded: 1,
          boxWeight: 0,
          fillRate: 0,
          limitedByWeight: false,
        }
        best = { result, volume: score }
      }
    }
  }
  return best
}

export function computePacking(p: ProductSpec, c: BoxConstraints): PackingResult {
  const totalQty = Math.max(1, Math.floor(c.quantity))

  // Límite por peso: cuántas unidades aguanta una caja
  let capacityByWeight = Infinity
  let limitedByWeight = false
  if (c.maxBoxWeight > 0 && p.weight > 0) {
    capacityByWeight = Math.max(1, Math.floor(c.maxBoxWeight / p.weight))
    if (capacityByWeight < totalQty) limitedByWeight = true
  }

  const unitsPerBox = Math.min(totalQty, capacityByWeight)

  // Buscamos el mejor grid probando todas las orientaciones
  let best: { result: PackingResult; volume: number } | null = null
  for (const dims of orientations(p)) {
    const candidate = bestGridForOrientation(dims, unitsPerBox, c)
    if (candidate && (!best || candidate.volume < best.volume)) {
      best = candidate
    }
  }

  const result = best!.result
  result.unitsPerBox = unitsPerBox
  result.limitedByWeight = limitedByWeight
  result.boxesNeeded = Math.ceil(totalQty / unitsPerBox)
  result.boxWeight = unitsPerBox * p.weight

  const productVolume = p.length * p.width * p.height * unitsPerBox
  const innerVolume = result.inner.x * result.inner.y * result.inner.z
  result.fillRate = innerVolume > 0 ? (productVolume / innerVolume) * 100 : 0

  return result
}
