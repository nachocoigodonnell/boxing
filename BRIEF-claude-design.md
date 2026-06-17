# Brief para Claude Design — Calculadora de cajas de cartón a medida (POC)

> Pega este documento (entero o por secciones) en Claude Design para generar la interfaz.
> Es una **POC** orientada a venderse a una empresa fabricante de cajas de cartón.

---

## 1. Resumen en una línea

Una **app web de cara al cliente final** (self-service) que, a partir de las características de su
producto y la cantidad a empaquetar, **calcula y visualiza en 3D la caja de cartón óptima** para
transportarlo y le genera al instante un **presupuesto orientativo**.

Nombre de trabajo (a elegir): **OptiCaja**, **BoxForge**, **PackWise** o **CajaPro**.

> ⚠️ ESTO ES LO MÁS IMPORTANTE DEL ENCARGO: el diseño tiene que ser **espectacular, ultra-limpio y
> ultra-profesional**, indistinguible de un producto SaaS premium real. **CERO aspecto de "hecho por
> IA"**: nada de gradientes morados genéricos, emojis decorativos, tarjetas flotantes random,
> "blobs", ni copy de relleno. Pixel-perfect, sobrio, con jerarquía tipográfica impecable y mucho
> espacio en blanco. Es la cara comercial con la que se va a vender el producto.

---

## 2. Contexto de negocio y objetivo

El cliente es una **empresa que fabrica y vende cajas de cartón**. Esta herramienta es la que la
empresa pondría a disposición de **sus propios clientes** (marcas, e-commerce, fabricantes) para que
**se hagan ellos mismos un presupuesto** según sus necesidades, sin tener que llamar a un comercial.

Flujo desde la óptica del cliente final:
1. El cliente entra (es la web/herramienta que le ofrece su proveedor de cajas) e introduce las
   **medidas y el peso de su producto** y cuántas unidades quiere meter por caja (o el total a enviar).
2. La app le propone **la caja óptima** (dimensiones, disposición interna, aprovechamiento de espacio,
   peso de la caja llena, nº de cajas necesarias) y se la **muestra en 3D**, desplegada y montada.
3. Le genera al instante un **presupuesto orientativo** (material de cartón, nº de cajas, precio) que
   puede descargar o usar para contactar con el fabricante.

**Objetivo de esta POC:** una demo **visualmente impecable y muy "vendible"** para enseñar a la
empresa de cajas y que quieran comprar el producto. Lo determinante aquí NO es la lógica de negocio
completa (los datos reales de presupuestación aún no los tenemos), sino que **transmita confianza y
profesionalidad de primer nivel**: como es una herramienta de cara al cliente final, representa la
imagen de marca del fabricante, así que tiene que parecer un producto caro y muy cuidado.

---

## 3. Usuario objetivo

- **El cliente final del fabricante de cajas**: responsable de logística/operaciones/compras de una
  marca, un e-commerce o un fabricante que necesita cajas para enviar sus productos.
- Persona **no técnica en 3D ni en packaging**: hay que guiarla, que todo se entienda solo.
- Primera impresión crítica: quiere que la herramienta le inspire **confianza** para fiarse del
  presupuesto y del proveedor que hay detrás.

Prioridades de este usuario: entender de un vistazo qué caja necesita y cuánto le costaría, con una
experiencia tan pulida que dé sensación de empresa seria y solvente.

---

## 4. Flujo principal (de izquierda a derecha)

1. **Datos del producto**: largo, ancho, alto (mm) y peso por unidad (g). Opcional: nombre/referencia,
   fragilidad, ¿se puede apilar?
2. **Datos del pedido**: cantidad de unidades por caja o cantidad total a enviar; holgura interior
   deseada; grosor del cartón (tipo de canal); peso máximo admisible por caja.
3. **Resultado + visor 3D**: la caja óptima calculada, mostrada en 3D (se puede abrir/cerrar y rotar),
   con todas las métricas.
4. **Presupuesto**: resumen para el cliente con cantidades, material y precio orientativo;
   botón para exportar/descargar (PDF) o copiar.

---

## 5. Pantallas / secciones a diseñar

Una **única pantalla tipo "configurador"** (estilo dashboard de producto SaaS), dividida en:

- **Barra superior (header)**: logo + nombre del producto, nombre del cliente/proyecto actual,
  y acciones (Nuevo presupuesto, Guardar, Exportar PDF).
- **Panel izquierdo — Entradas (inputs)**: formularios agrupados en tarjetas:
  - *Producto* (dimensiones, peso, referencia)
  - *Pedido* (cantidad, holgura, grosor/canal de cartón, peso máx.)
  - Inputs claros, con unidades visibles, sliders + campos numéricos, validación suave.
- **Centro — Visor 3D** (protagonista, el "wow"):
  - Caja de cartón renderizada en 3D sobre un fondo neutro elegante.
  - Controles: **Abrir / Cerrar caja** (animación de plegado), **Ver contenido**,
    **Caja transparente (rayos X)** para ver cómo quedan los productos dentro, rotar/zoom.
  - Cota/medidas superpuestas sobre la caja (largo × ancho × alto).
- **Panel derecho — Resultados**: tarjetas con métricas grandes y legibles:
  - Medidas de caja (exterior e interior)
  - Disposición interna (ej. "3 × 2 × 4 unidades")
  - Unidades por caja · Cajas necesarias
  - Peso de la caja llena
  - **% de aprovechamiento del espacio** (destacado, con barra/anillo de progreso)
- **Sección inferior — Presupuesto**: tabla limpia con conceptos (cajas, m² de cartón,
  precio unitario configurable, total estimado) y un botón **"Generar presupuesto"**.

---

## 6. Funcionalidades clave (para reflejar en el diseño)

- Recálculo **en tiempo real** al cambiar cualquier dato.
- Comparativa opcional de **2-3 opciones de caja** (la más compacta vs. la más barata vs. la más
  resistente) en tarjetas seleccionables.
- Indicadores de calidad: aprovechamiento de espacio, si el peso supera el límite (aviso), etc.
- Exportar a **PDF** un resumen presentable para el cliente (con la imagen 3D de la caja).
- Histórico/lista de presupuestos guardados (puede ser secundario en la POC).

---

## 7. El visor 3D (lo más diferencial)

Debe mostrar una **caja de cartón realista** que el usuario pueda:
- Ver **desplegada (troquel plano)** y **montada**, con una **animación de plegado** suave entre ambos.
- Ver el **contenido empaquetado dentro** (las unidades dispuestas en su rejilla), con un modo
  **transparente / rayos X** para apreciar cómo encajan.
- **Rotar, hacer zoom** y ver las **medidas acotadas** sobre la caja.

Estética del 3D: cartón color kraft realista, iluminación suave de estudio, sombra de contacto,
fondo limpio (no recargado). Que parezca un producto de ingeniería serio, no un juguete.

---

## 8. El presupuesto (cómo enfocarlo sin datos reales todavía)

Como aún no conocemos la fórmula real de presupuestación de este tipo de empresas, diséñalo como
**orientativo**, con las tarifas **preconfiguradas por el fabricante** (no las toca el cliente final):
- Tarifa interna de **precio por m² de cartón** (o por caja) — fija/oculta para el cliente; en la POC
  basta un valor de ejemplo realista.
- Cálculo automático del **material necesario** (m² de cartón por caja a partir del troquel) × nº de cajas.
- Total claramente marcado como *"presupuesto orientativo"* (deja claro que no es una oferta en firme).
- Datos del cliente (nombre/empresa, fecha, validez) para el PDF y para que el fabricante le contacte.

Deja la estructura preparada para enchufar después tarifas reales, descuentos por volumen, etc.

---

## 9. Dirección visual / estilo (LA PARTE MÁS IMPORTANTE)

El objetivo número uno: que parezca **un producto SaaS premium real, diseñado por un estudio top**,
y que **NO se note que lo ha hecho una IA**.

**Referencias a imitar (nivel de acabado):** Linear, Vercel, Stripe, Framer, Arc, Raycast.
Sobrias, con muchísimo cuidado en el detalle, espacio en blanco generoso y tipografía perfecta.

- **Estilo:** B2B SaaS moderno, **minimalista y limpio**, con un toque **industrial/técnico** sutil
  que conecte con el cartón y la logística (sin caer en lo "cutre" ni lo "maker").
- **Modo:** **modo oscuro elegante** para que el visor 3D y la caja kraft destaquen; UI muy legible.
- **Color:** paleta **restringida y disciplinada** — base neutra (grises/antracita) + **un único
  acento** (ámbar/kraft que evoca cartón, o un azul corporativo de confianza). Verde solo para
  indicadores positivos, ámbar/rojo solo para avisos. Nada de arcoíris.
- **Tipografía:** sans-serif moderna y técnica (Inter, Geist o IBM Plex Sans), con **jerarquía clara**
  y **números tabulares** en todas las métricas.
- **Componentes:** bordes finos y sutiles, sombras muy suaves, radios de esquina consistentes, inputs
  con la unidad integrada, métricas grandes y bien jerarquizadas, micro-animaciones discretas y con
  buen easing. Grid y espaciados consistentes (sistema de 4/8 px).
- **Sensación general:** preciso, fiable, caro. Que el cliente piense "esta empresa va en serio".

### ❌ Evitar a toda costa (señales de "hecho por IA")
- Gradientes morado/violeta o azul-rosa genéricos, "glassmorphism" por todas partes, "blobs" o
  manchas de color de fondo.
- Emojis como iconos de UI (usar un set de iconos coherente y fino: Lucide, Phosphor).
- Texto de relleno tipo "Lorem ipsum" o copy vacío y grandilocuente ("Revoluciona tu packaging 🚀").
- Exceso de tarjetas flotantes, sombras duras, bordes de colores chillones, demasiados pesos de
  fuente o demasiados tamaños distintos.
- Layouts simétricos sin jerarquía, botones gigantes, espaciados inconsistentes.

### ✅ Buscar
- Mucho aire (whitespace), alineaciones perfectas, contraste medido, una sola familia tipográfica.
- Detalles que denotan oficio: estados hover/focus cuidados, transiciones suaves, microcopy útil,
  vacíos (empty states) bien resueltos, consistencia milimétrica.

---

## 10. Tono y textos (copy)

- Español, profesional pero cercano.
- Etiquetas claras: "Largo del producto (mm)", "Unidades por caja", "Aprovechamiento del espacio".
- Mensajes de ayuda breves (tooltips) explicando conceptos como holgura, canal del cartón, etc.
- CTA principales: "Calcular caja óptima", "Generar presupuesto", "Exportar PDF".

---

## 11. Alcance de la POC

Es una **prueba de concepto para demo comercial**. Prioriza:
1. Que **impresione visualmente** (el visor 3D y el dashboard).
2. Que el **flujo se entienda** de un vistazo (inputs → caja óptima → presupuesto).
3. Que transmita que detrás hay **cálculo real** (medidas, aprovechamiento, material).

No es necesario backend ni datos reales de tarifas todavía; con datos de ejemplo realistas basta.
