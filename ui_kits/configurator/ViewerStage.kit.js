/* BoxForge — viewer stage. Wraps the <box-viewer> custom element and overlays
   the kraft-styled control bar (open/close, contenido, rayos X, rotate, reset). */

function ViewerStage({ result, fold, showProduct, xray, onToggleFold, onToggleProduct, onToggleXray }) {
  const I = window.BFIcons;
  const ref = React.useRef(null);
  const elRef = React.useRef(null);

  React.useEffect(() => {
    const host = ref.current;
    if (!host) return;
    const el = document.createElement('box-viewer');
    el.setAttribute('dims', 'true');
    el.style.width = '100%';
    el.style.height = '100%';
    host.appendChild(el);
    elRef.current = el;
    return () => { host.removeChild(el); };
  }, []);

  React.useEffect(() => { if (elRef.current && result) elRef.current.setResult(result); }, [result]);
  React.useEffect(() => { if (elRef.current) elRef.current.setMode({ showProduct }); }, [showProduct]);
  React.useEffect(() => { if (elRef.current) elRef.current.setMode({ xray }); }, [xray]);
  React.useEffect(() => {
    if (!elRef.current) return;
    if (fold) elRef.current.open(); else elRef.current.close();
  }, [fold]);

  const Ctrl = ({ active, onClick, label, children }) => (
    <button className={`vs-ctrl ${active ? 'is-active' : ''}`} onClick={onClick} title={label} aria-label={label}>
      {children}
    </button>
  );

  return (
    <div className="vs">
      <div className="vs-canvas" ref={ref} />

      <div className="vs-topbar">
        <span className="vs-tag"><span className="vs-dot" />Vista 3D · tiempo real</span>
        <button className="vs-icon" title="Pantalla completa" aria-label="Pantalla completa"><I.Maximize size={16} /></button>
      </div>

      <div className="vs-toolbar">
        <Ctrl active={fold} onClick={onToggleFold} label="Abrir / cerrar caja"><I.FoldVertical size={17} /><span>{fold ? 'Cerrar' : 'Abrir'}</span></Ctrl>
        <span className="vs-sep" />
        <Ctrl active={showProduct} onClick={onToggleProduct} label="Ver contenido"><I.Boxes size={17} /><span>Contenido</span></Ctrl>
        <Ctrl active={xray} onClick={onToggleXray} label="Caja transparente (rayos X)"><I.Scan size={17} /><span>Rayos X</span></Ctrl>
        <span className="vs-sep" />
        <Ctrl onClick={() => elRef.current && elRef.current.resetView()} label="Restablecer vista"><I.RotateCw size={16} /></Ctrl>
      </div>

      <div className="vs-hint">Arrastra para rotar · rueda para zoom</div>
    </div>
  );
}

window.ViewerStage = ViewerStage;
