/* BoxForge — configurator orchestrator. Holds product/order state, runs the
   packing engine in real time, derives the 3 comparison options, and composes
   header + inputs + viewer + results + budget. */

const { useState, useMemo } = React;

function Header() {
  const { Button } = window.BoxForgeDesignSystem_c042fe;
  const I = window.BFIcons;
  return (
    <header className="bf-header">
      <div className="bf-header-left">
        <span className="bf-logo">
          <img src="../../assets/boxforge-mark.svg" width="26" height="26" alt="" />
          <span className="bf-logo-text">Box<span>Forge</span></span>
        </span>
        <span className="bf-divider" />
        <span className="bf-project">
          <span className="bf-project-name">Pedido · Acme Cosmetics</span>
          <span className="bf-project-meta">Calculadora de cajas a medida</span>
        </span>
      </div>
      <div className="bf-header-actions">
        <Button variant="ghost" size="sm" iconLeft={<I.Plus size={15} />}>Nuevo</Button>
        <Button variant="ghost" size="sm" iconLeft={<I.Save size={15} />}>Guardar</Button>
        <Button variant="secondary" size="sm" iconLeft={<I.Download size={15} />}>Exportar PDF</Button>
      </div>
    </header>
  );
}

function deriveOptions(product, order) {
  const P = window.BoxForgePacking;
  const variants = [
    { id: 'compact', name: 'Más compacta', tagline: 'Menor huella', mod: { clearance: Math.max(2, order.clearance - 2) }, perM2: 1.65 },
    { id: 'cheap', name: 'Más barata', tagline: 'Menor coste', mod: { clearance: order.clearance, thickness: Math.min(order.thickness, 3) }, perM2: 1.42 },
    { id: 'sturdy', name: 'Más resistente', tagline: 'Doble canal', mod: { clearance: order.clearance + 4, thickness: 4 }, perM2: 2.05 },
  ];
  return variants.map((v) => {
    const oc = { ...order, ...v.mod };
    const res = P.computePacking(product, oc);
    const area = P.blankAreaM2(res) * res.boxesNeeded;
    const price = area * v.perM2 + res.boxesNeeded * 0.12;
    return {
      ...v, result: res, constraints: oc,
      boxes: res.boxesNeeded, fill: Math.round(res.fillRate),
      price: new Intl.NumberFormat('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(price),
      priceNum: price,
    };
  }).sort((a, b) => a.priceNum - b.priceNum).map((o, i, arr) => ({
    ...o, recommended: o.id === 'compact',
  }));
}

function Configurator() {
  const [product, setProduct] = useState({ ref: 'SKU-0042', length: 120, width: 80, height: 55, weight: 240 });
  const [order, setOrder] = useState({ quantity: 480, clearance: 6, thickness: 3, maxBoxWeight: 15000 });
  const [selected, setSelected] = useState('compact');
  const [fold, setFold] = useState(false);
  const [showProduct, setShowProduct] = useState(true);
  const [xray, setXray] = useState(false);

  const options = useMemo(() => deriveOptions(product, order), [product, order]);
  const active = options.find((o) => o.id === selected) || options[0];
  const result = active.result;
  const rates = { perM2: active.perM2, perBox: 0.12 };

  const InputsPanel = window.InputsPanel;
  const ViewerStage = window.ViewerStage;
  const ResultsPanel = window.ResultsPanel;
  const BudgetSection = window.BudgetSection;
  return (
    <div className="bf-app">
      <Header />
      <main className="bf-main">
        <aside className="bf-col bf-col-inputs">
          <InputsPanel product={product} setProduct={setProduct} order={order} setOrder={setOrder} />
        </aside>

        <section className="bf-col bf-col-stage">
          <ViewerStage
            result={result}
            fold={fold} showProduct={showProduct} xray={xray}
            onToggleFold={() => setFold((f) => !f)}
            onToggleProduct={() => setShowProduct((p) => !p)}
            onToggleXray={() => setXray((x) => !x)}
          />
          <BudgetSection result={result} rates={rates} />
        </section>

        <aside className="bf-col bf-col-results">
          <ResultsPanel result={result} product={product} options={options}
            selected={selected} onSelect={setSelected} />
        </aside>
      </main>
    </div>
  );
}

window.Configurator = Configurator;

// Render entry lives here (the last-loaded kit file) so it runs only after all
// sibling globals are defined — avoids Babel external-src ordering races.
(function mount() {
  const elapsed = mount._t = (mount._t || 0);
  const ready = window.InputsPanel && window.ViewerStage && window.ResultsPanel &&
    window.BudgetSection && window.BFIcons && window.BoxForgeDesignSystem_c042fe;
  if (!ready && elapsed < 40) { mount._t++; return setTimeout(mount, 50); }
  const host = document.getElementById('root');
  if (host.__mounted) return;
  host.__mounted = true;
  ReactDOM.createRoot(host).render(<Configurator />);
})();
