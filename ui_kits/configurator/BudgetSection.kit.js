/* BoxForge — budget section. Clean line-item table (concepts, qty, unit, total)
   marked clearly as orientativo, with export actions. */

function BudgetSection({ result, rates }) {
  const { Card, Button, Badge } = window.BoxForgeDesignSystem_c042fe;
  const I = window.BFIcons;
  const fmt = (n) => new Intl.NumberFormat('es-ES').format(Math.round(n));
  const eur = (n) => new Intl.NumberFormat('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n) + ' €';

  const areaPerBox = window.BoxForgePacking.blankAreaM2(result);
  const totalArea = areaPerBox * result.boxesNeeded;
  const cartonCost = totalArea * rates.perM2;
  const handling = result.boxesNeeded * rates.perBox;
  const subtotal = cartonCost + handling;
  const total = subtotal;

  const lines = [
    { c: 'Cartón corrugado', detail: `${fmt(result.boxesNeeded)} cajas · ${areaPerBox.toFixed(3)} m²/caja`, qty: totalArea.toFixed(2) + ' m²', unit: eur(rates.perM2), amount: cartonCost },
    { c: 'Troquelado y montaje', detail: `${fmt(result.boxesNeeded)} cajas`, qty: fmt(result.boxesNeeded), unit: eur(rates.perBox), amount: handling },
  ];

  return (
    <Card padded={false} className="budget">
      <header className="budget-head">
        <div className="budget-title">
          <I.FileText size={17} />
          <div>
            <span className="t-eyebrow">Presupuesto</span>
            <h3 className="budget-h">Resumen orientativo</h3>
          </div>
        </div>
        <Badge tone="outline">Tarifas del fabricante</Badge>
      </header>

      <table className="budget-table">
        <thead>
          <tr><th>Concepto</th><th className="num">Cantidad</th><th className="num">Precio unit.</th><th className="num">Importe</th></tr>
        </thead>
        <tbody>
          {lines.map((l, i) => (
            <tr key={i}>
              <td><div className="bt-concept">{l.c}</div><div className="bt-detail">{l.detail}</div></td>
              <td className="num">{l.qty}</td>
              <td className="num">{l.unit}</td>
              <td className="num strong">{eur(l.amount)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="budget-foot">
        <div className="budget-note">
          <I.AlertTriangle size={13} />
          Presupuesto orientativo, no vinculante. No incluye IVA ni transporte.
        </div>
        <div className="budget-total">
          <div className="budget-total-row">
            <span>Total estimado</span>
            <b className="tabular">{eur(total)}</b>
          </div>
          <div className="budget-actions">
            <Button variant="secondary" size="sm" iconLeft={<I.Copy size={15} />}>Copiar</Button>
            <Button size="sm" iconLeft={<I.Download size={15} />}>Exportar PDF</Button>
          </div>
        </div>
      </div>
    </Card>
  );
}

window.BudgetSection = BudgetSection;
