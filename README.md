# 📦 Box Designer — diseñador de cajas de cartón (RSC) con 3D

> **👉 Si vienes de Claude Design / vas a (re)diseñar la interfaz:** lee primero
> [`BRIEF-claude-design.md`](./BRIEF-claude-design.md). Ahí está la descripción completa del producto,
> el usuario objetivo (el **cliente final** que se autogenera un presupuesto), el flujo, las pantallas
> y la dirección visual exigida (SaaS premium, ultra-limpio, sin aspecto de "hecho por IA").
>
> Este repo es una **POC funcional**: la lógica de cálculo (`src/lib/packing.ts`) y el visor 3D
> (`src/components/FoldingBox.tsx`) ya funcionan y se pueden reutilizar; lo que toca es **elevar el
> diseño de la UI** al nivel descrito en el brief.

Herramienta web que, dado un **producto** (dimensiones + peso) y una **cantidad** a empaquetar,
calcula la **caja de cartón RSC** que contiene el producto de la forma más óptima posible y la
**visualiza en 3D** con animación de plegado (plano → montado).

## ✨ Qué hace

- **Cálculo de packing en grid**: prueba las 6 orientaciones del producto y elige la disposición
  `nx × ny × nz` que minimiza el volumen de la caja (favoreciendo cajas más cúbicas = más resistentes).
- **Restricciones configurables**: holgura interior, grosor del cartón y **peso máximo por caja**
  (limita las unidades por caja y calcula cuántas cajas hacen falta).
- **Visualización 3D** (Three.js vía React Three Fiber):
  - Caja **montada** con el contenido dentro (unidades semitransparentes).
  - **Troquel desplegado** (la plancha de cartón plana en cruz).
  - **Animación de plegado** plano ↔ montado (auto o con slider manual).
- **Panel de resultados** en vivo: dimensiones interiores/exteriores, disposición, uds. por caja,
  cajas necesarias, peso de la caja llena y **% de aprovechamiento de volumen**.

Todo se recalcula y re-renderiza **en tiempo real** al mover cualquier control.

## 🚀 Uso

```bash
npm install
npm run dev      # abre http://localhost:5173
npm run build    # build de producción (carpeta dist/)
```

Mueve los sliders del panel (esquina superior derecha):
- **Producto**: largo, ancho, alto (mm) y peso por unidad (g).
- **Caja**: cantidad N, holgura, grosor del cartón, peso máximo por caja.
- **Vista**: ver/ocultar contenido, auto-plegado on/off y slider de plegado manual.

## 🧱 Stack

- [Vite](https://vitejs.dev/) + React + TypeScript
- [Three.js](https://threejs.org/) vía [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber) + [drei](https://github.com/pmndrs/drei)
- [leva](https://github.com/pmndrs/leva) para los controles

## 🗂 Estructura

```
src/
  lib/packing.ts          # cálculo de packing en grid + restricciones
  components/FoldingBox.tsx # geometría 3D de la caja RSC y animación de plegado
  App.tsx                 # controles (leva), escena 3D y panel de resultados
```

## 🛣 Ideas para siguientes iteraciones

- Varios tipos de caja seleccionables (bandeja, tapa-fondo, telescópica…).
- Múltiples productos distintos en la misma caja.
- Separadores / divisores internos.
- Exportar el troquel a SVG/DXF (plano de corte real para imprenta).
- Texturas y render fotorrealista (cartón corrugado, sombras suaves).
- Packing de cajas en un palé / contenedor (segundo nivel de optimización).
