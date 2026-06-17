import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei'
import { useControls, button } from 'leva'
import { computePacking } from './lib/packing'
import FoldingBox from './components/FoldingBox'

// Anima el plegado UNA vez hacia un objetivo (0 = abrir, 1 = cerrar) y se detiene.
function FoldAnimator({
  fold,
  target,
  set,
}: {
  fold: number
  target: React.MutableRefObject<number | null>
  set: (v: { fold: number }) => void
}) {
  useFrame((_, delta) => {
    if (target.current === null) return
    const t = target.current
    const diff = t - fold
    if (Math.abs(diff) < 0.012) {
      set({ fold: t })
      target.current = null
      return
    }
    const step = Math.sign(diff) * Math.min(Math.abs(diff), delta * 1.2)
    set({ fold: fold + step })
  })
  return null
}

export default function App() {
  // Objetivo de la animación de plegado (null = sin animar, control manual)
  const foldTarget = useRef<number | null>(null)
  const foldRef = useRef(1)

  const product = useControls('Producto', {
    length: { value: 120, min: 10, max: 500, step: 1, label: 'Largo (mm)' },
    width: { value: 80, min: 10, max: 500, step: 1, label: 'Ancho (mm)' },
    height: { value: 40, min: 5, max: 500, step: 1, label: 'Alto (mm)' },
    weight: { value: 250, min: 1, max: 5000, step: 1, label: 'Peso/ud (g)' },
  })

  const box = useControls('Caja', {
    quantity: { value: 12, min: 1, max: 200, step: 1, label: 'Cantidad (N)' },
    clearance: { value: 6, min: 0, max: 40, step: 1, label: 'Holgura (mm)' },
    thickness: { value: 3, min: 1, max: 10, step: 0.5, label: 'Grosor (mm)' },
    maxBoxWeight: {
      value: 12000,
      min: 0,
      max: 30000,
      step: 100,
      label: 'Peso máx (g)',
    },
  })

  const [view, setView] = useControls('Vista', () => ({
    'Abrir / Cerrar caja': button(() => {
      // Anima hacia el estado contrario al actual
      foldTarget.current = foldRef.current > 0.5 ? 0 : 1
    }),
    fold: { value: 1, min: 0, max: 1, step: 0.01, label: 'Plegado' },
    showProduct: { value: true, label: 'Ver contenido' },
    xray: { value: false, label: 'Caja transparente' },
  }))

  // Mantiene foldRef sincronizado con el valor actual para el botón y el animador
  foldRef.current = view.fold

  const result = useMemo(
    () =>
      computePacking(
        {
          length: product.length,
          width: product.width,
          height: product.height,
          weight: product.weight,
        },
        {
          quantity: box.quantity,
          clearance: box.clearance,
          thickness: box.thickness,
          maxBoxWeight: box.maxBoxWeight,
        }
      ),
    [product, box]
  )

  const fold = view.fold

  return (
    <div className="app">
      <Canvas shadows camera={{ position: [7, 5, 9], fov: 45 }} dpr={[1, 2]}>
        <color attach="background" args={['#0e1116']} />
        <ambientLight intensity={0.6} />
        <directionalLight
          position={[6, 10, 6]}
          intensity={1.4}
          castShadow
          shadow-mapSize={[1024, 1024]}
        />
        <Environment preset="city" />

        <FoldingBox
          result={result}
          fold={fold}
          showProduct={view.showProduct}
          xray={view.xray}
        />

        <ContactShadows
          position={[0, -3.01, 0]}
          opacity={0.5}
          scale={20}
          blur={2.2}
          far={6}
        />
        <gridHelper args={[24, 24, '#27303d', '#1a212b']} position={[0, -3, 0]} />

        <OrbitControls
          enableDamping
          target={[0, 0, 0]}
          minDistance={4}
          maxDistance={30}
        />
        <FoldAnimator fold={view.fold} target={foldTarget} set={setView} />
      </Canvas>

      <ResultsPanel result={result} />
      <header className="brand">
        <span className="dot" />
        Box Designer · cajas RSC
      </header>
    </div>
  )
}

function ResultsPanel({
  result,
}: {
  result: ReturnType<typeof computePacking>
}) {
  const mm = (n: number) => `${n.toFixed(0)} mm`
  return (
    <div className="results">
      <h2>Resultado</h2>
      <Row
        label="Caja (ext.)"
        value={`${mm(result.outer.x)} × ${mm(result.outer.y)} × ${mm(
          result.outer.z
        )}`}
      />
      <Row
        label="Caja (int.)"
        value={`${mm(result.inner.x)} × ${mm(result.inner.y)} × ${mm(
          result.inner.z
        )}`}
      />
      <Row
        label="Disposición"
        value={`${result.grid.nx} × ${result.grid.ny} × ${result.grid.nz}`}
      />
      <Row label="Uds. por caja" value={`${result.unitsPerBox}`} />
      <Row label="Cajas necesarias" value={`${result.boxesNeeded}`} />
      <Row label="Peso caja llena" value={`${(result.boxWeight / 1000).toFixed(2)} kg`} />
      <Row
        label="Aprovechamiento"
        value={`${result.fillRate.toFixed(1)} %`}
        highlight={result.fillRate > 55}
      />
      {result.limitedByWeight && (
        <p className="note">⚠️ Capacidad limitada por el peso máximo de la caja.</p>
      )}
    </div>
  )
}

function Row({
  label,
  value,
  highlight,
}: {
  label: string
  value: string
  highlight?: boolean
}) {
  return (
    <div className="row">
      <span className="k">{label}</span>
      <span className={highlight ? 'v hi' : 'v'}>{value}</span>
    </div>
  )
}
