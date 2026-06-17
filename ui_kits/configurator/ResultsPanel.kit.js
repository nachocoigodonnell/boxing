/* BoxForge — right results panel. Big tabular metrics + aprovechamiento ring,
   weight-limit warning, and the 2-option comparison. */

function ResultsPanel({ result, product, options, selected, onSelect }) {
  const { Card, MetricStat, ProgressRing, Badge, OptionCard } = window.BoxForgeDesignSystem_c042fe;
  const I = window.BFIcons;
  const r = result;
  const fmt = (n) => new Intl.NumberFormat('es-ES').format(Math.round(n));
  const fmt1 = (n) => new Intl.NumberFormat('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n);
  const fillTone = r.fillRate >= 80 ? 'accent' : r.fillRate >= 65 ? 'warning' : 'danger';

  return (
    <div className="results">
      <Card variant="flush" padded={false}>
        <div className="res-hero">
          <ProgressRing value={r.fillRate} label="aprovechamiento" size={120} stroke={9} tone={fillTone} />
          <div className="res-hero-meta">
            <span className="t-eyebrow">Disposición interna</span>
            <span className="res-grid-val">{r.grid.nx} × {r.grid.ny} × {r.grid.nz}</span>
            <Badge tone="neutral" mono>{r.unitsPerBox} ud / caja</Badge>
          </div>
        </div>
      </Card>

      {r.limitedByWeight && (
        <div className="res-warn">
          <I.AlertTriangle size={16} />
          <span>Limitado por peso máximo: caben {r.unitsPerBox} ud antes de superar el límite.</span>
        </div>
      )}

      <Card title="Medidas y carga" bodyTight>
        <div className="res-metrics">
          <MetricStat label="Exterior (L × An × Al)" value={`${fmt(r.outer.x)} × ${fmt(r.outer.z)} × ${fmt(r.outer.y)}`} unit="mm" />
          <MetricStat label="Interior útil" value={`${fmt(r.inner.x)} × ${fmt(r.inner.z)} × ${fmt(r.inner.y)}`} unit="mm" />
          <div className="res-metrics-row">
            <MetricStat label="Cajas necesarias" value={fmt(r.boxesNeeded)} size="md" icon={<I.Boxes size={13} />} />
            <MetricStat label="Peso caja llena" value={fmt1(r.boxWeight / 1000)} unit="kg" size="md" icon={<I.Weight size={13} />} />
          </div>
        </div>
      </Card>

      <Card title="Comparar opciones" icon={<I.Gauge size={16} />} bodyTight>
        <div className="res-options">
          {options.map((o) => (
            <OptionCard key={o.id} name={o.name} tagline={o.tagline} price={o.price}
              selected={selected === o.id} onSelect={() => onSelect(o.id)}
              badge={o.recommended ? <Badge tone="accent">Recomendada</Badge> : null}
              meta={[{ label: 'Cajas', value: String(o.boxes) }, { label: 'Aprov.', value: o.fill + '%' }]} />
          ))}
        </div>
      </Card>
    </div>
  );
}

window.ResultsPanel = ResultsPanel;
