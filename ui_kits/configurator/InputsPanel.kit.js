/* BoxForge — left inputs panel. Product + order data in grouped Cards,
   composed from the DS form primitives. */

function InputsPanel({ product, setProduct, order, setOrder }) {
  const { Card, SliderField, InputField, SegmentedControl, Tooltip } = window.BoxForgeDesignSystem_c042fe;
  const I = window.BFIcons;
  const pset = (k) => (v) => setProduct({ ...product, [k]: v });
  const oset = (k) => (v) => setOrder({ ...order, [k]: v });
  const num = (k, set) => (v) => set(k)(v === '' ? 0 : Number(v));

  return (
    <div className="inputs">
      <Card eyebrow="Paso 1" title="Producto" icon={<I.Package size={16} />} bodyTight>
        <div className="field-stack">
          <InputField label="Referencia" value={product.ref} onChange={pset('ref')} placeholder="SKU-0042" />
          <SliderField label="Largo" value={product.length} onChange={pset('length')} min={10} max={600} unit="mm" />
          <SliderField label="Ancho" value={product.width} onChange={pset('width')} min={10} max={600} unit="mm" />
          <SliderField label="Alto" value={product.height} onChange={pset('height')} min={10} max={600} unit="mm" />
          <InputField label="Peso por unidad" numeric value={product.weight} onChange={num('weight', pset)} suffix="g" iconLeft={<I.Weight size={16} />} />
        </div>
      </Card>

      <Card eyebrow="Paso 2" title="Pedido" icon={<I.Boxes size={16} />} bodyTight>
        <div className="field-stack">
          <InputField label="Unidades totales a enviar" numeric value={order.quantity} onChange={num('quantity', oset)} suffix="ud" iconLeft={<I.Layers size={16} />} />
          <div>
            <div className="field-label-row">
              <span className="field-label">Holgura interior</span>
              <Tooltip content="Espacio libre entre el producto y la pared interior de la caja, por lado." />
            </div>
            <SliderField label="" value={order.clearance} onChange={oset('clearance')} min={0} max={40} unit="mm" />
          </div>
          <div>
            <div className="field-label-row">
              <span className="field-label">Canal del cartón</span>
              <Tooltip content="Grosor de la onda corrugada. E ≈ 1.5 mm, B ≈ 3 mm, C ≈ 4 mm." />
            </div>
            <SegmentedControl value={String(order.thickness)} onChange={(v) => oset('thickness')(Number(v))}
              options={[{ value: '1.5', label: 'E · 1.5' }, { value: '3', label: 'B · 3' }, { value: '4', label: 'C · 4' }]} />
          </div>
          <InputField label="Peso máx. por caja (0 = sin límite)" numeric value={order.maxBoxWeight} onChange={num('maxBoxWeight', oset)} suffix="g" />
        </div>
      </Card>
    </div>
  );
}

window.InputsPanel = InputsPanel;
