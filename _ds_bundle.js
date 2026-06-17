/* @ds-bundle: {"format":3,"namespace":"BoxForgeDesignSystem_c042fe","components":[{"name":"Button","sourcePath":"components/buttons/Button.jsx"},{"name":"IconButton","sourcePath":"components/buttons/IconButton.jsx"},{"name":"Badge","sourcePath":"components/data/Badge.jsx"},{"name":"Card","sourcePath":"components/data/Card.jsx"},{"name":"MetricStat","sourcePath":"components/data/MetricStat.jsx"},{"name":"OptionCard","sourcePath":"components/data/OptionCard.jsx"},{"name":"ProgressRing","sourcePath":"components/data/ProgressRing.jsx"},{"name":"Tooltip","sourcePath":"components/feedback/Tooltip.jsx"},{"name":"InputField","sourcePath":"components/forms/InputField.jsx"},{"name":"SegmentedControl","sourcePath":"components/forms/SegmentedControl.jsx"},{"name":"SliderField","sourcePath":"components/forms/SliderField.jsx"},{"name":"BoxViewer","sourcePath":"viewer/box-viewer.js"}],"sourceHashes":{"components/buttons/Button.jsx":"be92e1de1773","components/buttons/IconButton.jsx":"ab17ad4905a0","components/data/Badge.jsx":"121bed96f55d","components/data/Card.jsx":"1c76710d776e","components/data/MetricStat.jsx":"fb9e9d381b62","components/data/OptionCard.jsx":"30ce05aabc1e","components/data/ProgressRing.jsx":"b63fc24a2109","components/feedback/Tooltip.jsx":"da99d83c6629","components/forms/InputField.jsx":"ec620d1ec092","components/forms/SegmentedControl.jsx":"8ee302e83f72","components/forms/SliderField.jsx":"713f3f094309","ui_kits/configurator/BudgetSection.kit.js":"3b85fc09625d","ui_kits/configurator/Configurator.kit.js":"f7e3d392d753","ui_kits/configurator/Icons.kit.js":"85a855c64f0b","ui_kits/configurator/InputsPanel.kit.js":"95ab4201f6b3","ui_kits/configurator/ResultsPanel.kit.js":"ceb5d3dffef3","ui_kits/configurator/ViewerStage.kit.js":"0be54de9eb63","viewer/box-viewer.js":"cf13f9b9588d","viewer/packing.js":"af9bc1503e53"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.BoxForgeDesignSystem_c042fe = window.BoxForgeDesignSystem_c042fe || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/buttons/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Inject component CSS once. Keeps the component self-contained while still
   giving real :hover / :focus / :active states (no inline-style limitation). */
let injected = false;
function useStyles() {
  if (injected || typeof document === 'undefined') return;
  injected = true;
  const el = document.createElement('style');
  el.id = 'bf-button';
  el.textContent = `
  .bf-btn {
    --_h: var(--control-h);
    display: inline-flex; align-items: center; justify-content: center; gap: 8px;
    height: var(--_h); padding: 0 14px;
    font-family: var(--font-sans); font-size: var(--fs-body); font-weight: var(--fw-medium);
    letter-spacing: var(--ls-snug); line-height: 1; white-space: nowrap;
    border: 1px solid transparent; border-radius: var(--radius-md);
    cursor: pointer; user-select: none; text-decoration: none;
    transition: background var(--dur-fast) var(--ease-standard),
                border-color var(--dur-fast) var(--ease-standard),
                color var(--dur-fast) var(--ease-standard),
                transform var(--dur-fast) var(--ease-standard),
                box-shadow var(--dur-fast) var(--ease-standard);
  }
  .bf-btn:focus-visible { outline: none; box-shadow: var(--ring-focus); }
  .bf-btn:active:not(:disabled) { transform: translateY(0.5px); }
  .bf-btn:disabled { opacity: 0.45; cursor: not-allowed; }
  .bf-btn svg { width: 16px; height: 16px; flex: none; }

  .bf-btn--sm { --_h: var(--control-h-sm); padding: 0 11px; font-size: var(--fs-sm); }
  .bf-btn--lg { --_h: var(--control-h-lg); padding: 0 20px; font-size: var(--fs-h4); }
  .bf-btn--block { display: flex; width: 100%; }

  /* primary — solid sand, dark ink */
  .bf-btn--primary { background: var(--accent); color: var(--text-on-accent); }
  .bf-btn--primary:hover:not(:disabled) { background: var(--accent-hover); }
  .bf-btn--primary:active:not(:disabled) { background: var(--accent-active); }

  /* secondary — raised neutral surface, hairline border */
  .bf-btn--secondary { background: var(--surface-raised); color: var(--text-primary); border-color: var(--border-default); }
  .bf-btn--secondary:hover:not(:disabled) { background: var(--surface-hover); border-color: var(--border-strong); }

  /* ghost — text only */
  .bf-btn--ghost { background: transparent; color: var(--text-secondary); }
  .bf-btn--ghost:hover:not(:disabled) { background: var(--surface-hover); color: var(--text-primary); }

  /* danger */
  .bf-btn--danger { background: var(--danger-quiet); color: var(--danger); border-color: transparent; }
  .bf-btn--danger:hover:not(:disabled) { background: rgba(229,101,95,0.22); }

  .bf-btn__spin { width: 14px; height: 14px; border-radius: 50%;
    border: 2px solid currentColor; border-right-color: transparent;
    animation: bf-spin 0.6s linear infinite; }
  @keyframes bf-spin { to { transform: rotate(360deg); } }
  `;
  document.head.appendChild(el);
}
function Button({
  children,
  variant = 'primary',
  size = 'md',
  block = false,
  loading = false,
  disabled = false,
  iconLeft = null,
  iconRight = null,
  as = 'button',
  className = '',
  ...rest
}) {
  useStyles();
  const Tag = as;
  const cls = ['bf-btn', `bf-btn--${variant}`, size !== 'md' ? `bf-btn--${size}` : '', block ? 'bf-btn--block' : '', className].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement(Tag, _extends({
    className: cls,
    disabled: Tag === 'button' ? disabled || loading : undefined
  }, rest), loading && /*#__PURE__*/React.createElement("span", {
    className: "bf-btn__spin",
    "aria-hidden": "true"
  }), !loading && iconLeft, children && /*#__PURE__*/React.createElement("span", null, children), !loading && iconRight);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/buttons/Button.jsx", error: String((e && e.message) || e) }); }

// components/buttons/IconButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
let injected = false;
function useStyles() {
  if (injected || typeof document === 'undefined') return;
  injected = true;
  const el = document.createElement('style');
  el.id = 'bf-iconbutton';
  el.textContent = `
  .bf-iconbtn {
    --_s: 36px;
    display: inline-flex; align-items: center; justify-content: center;
    width: var(--_s); height: var(--_s); padding: 0;
    border: 1px solid transparent; border-radius: var(--radius-md);
    background: transparent; color: var(--text-secondary);
    cursor: pointer; transition: background var(--dur-fast) var(--ease-standard),
      color var(--dur-fast) var(--ease-standard), border-color var(--dur-fast) var(--ease-standard);
  }
  .bf-iconbtn svg { width: 17px; height: 17px; }
  .bf-iconbtn:hover:not(:disabled) { background: var(--surface-hover); color: var(--text-primary); }
  .bf-iconbtn:focus-visible { outline: none; box-shadow: var(--ring-focus); }
  .bf-iconbtn:disabled { opacity: 0.4; cursor: not-allowed; }
  .bf-iconbtn--sm { --_s: 30px; }
  .bf-iconbtn--sm svg { width: 15px; height: 15px; }
  .bf-iconbtn--outline { border-color: var(--border-default); background: var(--surface-raised); }
  .bf-iconbtn--outline:hover:not(:disabled) { border-color: var(--border-strong); }
  .bf-iconbtn--active { background: var(--accent-quiet); color: var(--accent); }
  .bf-iconbtn--active:hover:not(:disabled) { background: var(--accent-quiet-2); color: var(--accent); }
  `;
  document.head.appendChild(el);
}
function IconButton({
  children,
  variant = 'plain',
  size = 'md',
  active = false,
  disabled = false,
  label,
  className = '',
  ...rest
}) {
  useStyles();
  const cls = ['bf-iconbtn', variant === 'outline' ? 'bf-iconbtn--outline' : '', size === 'sm' ? 'bf-iconbtn--sm' : '', active ? 'bf-iconbtn--active' : '', className].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement("button", _extends({
    className: cls,
    disabled: disabled,
    "aria-label": label,
    title: label
  }, rest), children);
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/buttons/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/data/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
let injected = false;
function useStyles() {
  if (injected || typeof document === 'undefined') return;
  injected = true;
  const el = document.createElement('style');
  el.id = 'bf-badge';
  el.textContent = `
  .bf-badge {
    display: inline-flex; align-items: center; gap: 5px; height: 22px; padding: 0 8px;
    font-family: var(--font-sans); font-size: var(--fs-caption); font-weight: var(--fw-medium);
    letter-spacing: var(--ls-snug); border-radius: var(--radius-full); white-space: nowrap;
    border: 1px solid transparent;
  }
  .bf-badge svg { width: 12px; height: 12px; }
  .bf-badge__dot { width: 6px; height: 6px; border-radius: 50%; background: currentColor; }
  .bf-badge--neutral { background: var(--surface-active); color: var(--text-secondary); }
  .bf-badge--accent { background: var(--accent-quiet); color: var(--accent-hover); }
  .bf-badge--success { background: var(--success-quiet); color: var(--success); }
  .bf-badge--warning { background: var(--warning-quiet); color: var(--warning); }
  .bf-badge--danger { background: var(--danger-quiet); color: var(--danger); }
  .bf-badge--info { background: var(--info-quiet); color: var(--info); }
  .bf-badge--outline { background: transparent; border-color: var(--border-strong); color: var(--text-secondary); }
  .bf-badge--mono { font-family: var(--font-mono); font-variant-numeric: tabular-nums; font-feature-settings: var(--tnum); }
  `;
  document.head.appendChild(el);
}
function Badge({
  children,
  tone = 'neutral',
  dot = false,
  icon = null,
  mono = false,
  className = '',
  ...rest
}) {
  useStyles();
  const cls = ['bf-badge', `bf-badge--${tone}`, mono ? 'bf-badge--mono' : '', className].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement("span", _extends({
    className: cls
  }, rest), dot && /*#__PURE__*/React.createElement("span", {
    className: "bf-badge__dot"
  }), icon, children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/Badge.jsx", error: String((e && e.message) || e) }); }

// components/data/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
let injected = false;
function useStyles() {
  if (injected || typeof document === 'undefined') return;
  injected = true;
  const el = document.createElement('style');
  el.id = 'bf-card';
  el.textContent = `
  .bf-card {
    background: var(--surface-card); border: 1px solid var(--border-subtle);
    border-radius: var(--radius-lg); box-shadow: var(--ring-hairline);
  }
  .bf-card--raised { box-shadow: var(--shadow-md), var(--ring-hairline); }
  .bf-card--flush { border-radius: 0; border: none; box-shadow: none; background: transparent; }
  .bf-card__head {
    display: flex; align-items: center; justify-content: space-between; gap: 12px;
    padding: 14px 16px; border-bottom: 1px solid var(--border-subtle);
  }
  .bf-card__titlewrap { display: flex; align-items: center; gap: 9px; min-width: 0; }
  .bf-card__icon { display: inline-flex; color: var(--text-tertiary); }
  .bf-card__icon svg { width: 16px; height: 16px; }
  .bf-card__title { font-size: var(--fs-h4); font-weight: var(--fw-semibold); color: var(--text-primary); letter-spacing: var(--ls-snug); }
  .bf-card__eyebrow { font-family: var(--font-mono); font-size: var(--fs-micro); font-weight: var(--fw-medium);
    letter-spacing: var(--ls-eyebrow); text-transform: uppercase; color: var(--text-tertiary); }
  .bf-card__body { padding: 16px; }
  .bf-card__body--tight { padding: 12px 16px; }
  `;
  document.head.appendChild(el);
}
function Card({
  children,
  title,
  eyebrow,
  icon,
  actions,
  variant = 'default',
  bodyTight = false,
  padded = true,
  className = '',
  ...rest
}) {
  useStyles();
  const cls = ['bf-card', variant === 'raised' ? 'bf-card--raised' : '', variant === 'flush' ? 'bf-card--flush' : '', className].filter(Boolean).join(' ');
  const hasHead = title || eyebrow || actions || icon;
  return /*#__PURE__*/React.createElement("section", _extends({
    className: cls
  }, rest), hasHead && /*#__PURE__*/React.createElement("header", {
    className: "bf-card__head"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bf-card__titlewrap"
  }, icon && /*#__PURE__*/React.createElement("span", {
    className: "bf-card__icon"
  }, icon), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 2,
      minWidth: 0
    }
  }, eyebrow && /*#__PURE__*/React.createElement("span", {
    className: "bf-card__eyebrow"
  }, eyebrow), title && /*#__PURE__*/React.createElement("span", {
    className: "bf-card__title"
  }, title))), actions && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6,
      flex: 'none'
    }
  }, actions)), padded ? /*#__PURE__*/React.createElement("div", {
    className: `bf-card__body ${bodyTight ? 'bf-card__body--tight' : ''}`
  }, children) : children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/Card.jsx", error: String((e && e.message) || e) }); }

// components/data/MetricStat.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
let injected = false;
function useStyles() {
  if (injected || typeof document === 'undefined') return;
  injected = true;
  const el = document.createElement('style');
  el.id = 'bf-metric';
  el.textContent = `
  .bf-metric { display: flex; flex-direction: column; gap: 4px; min-width: 0; }
  .bf-metric__label {
    font-size: var(--fs-caption); color: var(--text-tertiary); letter-spacing: var(--ls-snug);
    display: inline-flex; align-items: center; gap: 5px;
  }
  .bf-metric__label svg { width: 13px; height: 13px; }
  .bf-metric__valrow { display: flex; align-items: baseline; gap: 6px; }
  .bf-metric__value {
    font-family: var(--font-mono); font-variant-numeric: tabular-nums; font-feature-settings: var(--tnum);
    font-weight: var(--fw-medium); color: var(--text-primary); letter-spacing: var(--ls-snug); line-height: 1;
  }
  .bf-metric--lg .bf-metric__value { font-size: var(--fs-metric-lg); }
  .bf-metric--md .bf-metric__value { font-size: var(--fs-metric-md); }
  .bf-metric--sm .bf-metric__value { font-size: var(--fs-h3); }
  .bf-metric__unit { font-family: var(--font-mono); font-size: var(--fs-sm); color: var(--text-tertiary); font-weight: var(--fw-regular); }
  .bf-metric__sub { font-size: var(--fs-caption); color: var(--text-secondary); }
  .bf-metric__delta { display: inline-flex; align-items: center; gap: 3px; font-family: var(--font-mono); font-size: var(--fs-caption); }
  .bf-metric__delta--up { color: var(--success); }
  .bf-metric__delta--down { color: var(--danger); }
  `;
  document.head.appendChild(el);
}
function MetricStat({
  label,
  value,
  unit,
  sub,
  icon,
  size = 'md',
  className = '',
  ...rest
}) {
  useStyles();
  return /*#__PURE__*/React.createElement("div", _extends({
    className: `bf-metric bf-metric--${size} ${className}`
  }, rest), /*#__PURE__*/React.createElement("span", {
    className: "bf-metric__label"
  }, icon, label), /*#__PURE__*/React.createElement("span", {
    className: "bf-metric__valrow"
  }, /*#__PURE__*/React.createElement("span", {
    className: "bf-metric__value"
  }, value), unit && /*#__PURE__*/React.createElement("span", {
    className: "bf-metric__unit"
  }, unit)), sub && /*#__PURE__*/React.createElement("span", {
    className: "bf-metric__sub"
  }, sub));
}
Object.assign(__ds_scope, { MetricStat });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/MetricStat.jsx", error: String((e && e.message) || e) }); }

// components/data/OptionCard.jsx
try { (() => {
let injected = false;
function useStyles() {
  if (injected || typeof document === 'undefined') return;
  injected = true;
  const el = document.createElement('style');
  el.id = 'bf-optioncard';
  el.textContent = `
  .bf-opt {
    position: relative; display: flex; flex-direction: column; gap: 10px; text-align: left;
    width: 100%; padding: 14px; cursor: pointer;
    background: var(--surface-card); border: 1px solid var(--border-default);
    border-radius: var(--radius-lg); box-shadow: var(--ring-hairline);
    transition: border-color var(--dur-base) var(--ease-standard),
      background var(--dur-base) var(--ease-standard), box-shadow var(--dur-base) var(--ease-standard);
  }
  .bf-opt:hover { border-color: var(--border-strong); background: var(--surface-hover); }
  .bf-opt:focus-visible { outline: none; box-shadow: var(--ring-focus); }
  .bf-opt.is-selected { border-color: var(--accent); background: var(--accent-quiet); box-shadow: 0 0 0 1px var(--accent); }
  .bf-opt__head { display: flex; align-items: flex-start; justify-content: space-between; gap: 10px; }
  .bf-opt__name { font-size: var(--fs-h4); font-weight: var(--fw-semibold); color: var(--text-primary); letter-spacing: var(--ls-snug); }
  .bf-opt__tag { font-family: var(--font-mono); font-size: var(--fs-micro); letter-spacing: var(--ls-eyebrow);
    text-transform: uppercase; color: var(--text-tertiary); margin-top: 3px; }
  .bf-opt__radio { width: 18px; height: 18px; border-radius: 50%; border: 1.5px solid var(--border-strong); flex: none;
    display: inline-flex; align-items: center; justify-content: center; transition: all var(--dur-fast) var(--ease-standard); }
  .bf-opt.is-selected .bf-opt__radio { border-color: var(--accent); background: var(--accent); }
  .bf-opt__radio span { width: 7px; height: 7px; border-radius: 50%; background: var(--text-on-accent); opacity: 0; transition: opacity var(--dur-fast); }
  .bf-opt.is-selected .bf-opt__radio span { opacity: 1; }
  .bf-opt__price { display: flex; align-items: baseline; gap: 4px; }
  .bf-opt__price b { font-family: var(--font-mono); font-variant-numeric: tabular-nums; font-feature-settings: var(--tnum);
    font-size: var(--fs-h2); font-weight: var(--fw-semibold); color: var(--text-primary); letter-spacing: var(--ls-snug); }
  .bf-opt__price span { font-family: var(--font-mono); font-size: var(--fs-caption); color: var(--text-tertiary); }
  .bf-opt__meta { display: flex; gap: 14px; padding-top: 10px; border-top: 1px solid var(--border-subtle); }
  .bf-opt__metaitem { display: flex; flex-direction: column; gap: 2px; }
  .bf-opt__metaitem dt { font-size: var(--fs-micro); color: var(--text-tertiary); }
  .bf-opt__metaitem dd { margin: 0; font-family: var(--font-mono); font-variant-numeric: tabular-nums; font-feature-settings: var(--tnum);
    font-size: var(--fs-sm); color: var(--text-secondary); }
  `;
  document.head.appendChild(el);
}
function OptionCard({
  name,
  tagline,
  price,
  currency = '€',
  badge,
  selected = false,
  onSelect,
  meta = [],
  className = ''
}) {
  useStyles();
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: `bf-opt ${selected ? 'is-selected' : ''} ${className}`,
    "aria-pressed": selected,
    onClick: onSelect
  }, /*#__PURE__*/React.createElement("div", {
    className: "bf-opt__head"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "bf-opt__name"
  }, name), tagline && /*#__PURE__*/React.createElement("div", {
    className: "bf-opt__tag"
  }, tagline)), /*#__PURE__*/React.createElement("span", {
    className: "bf-opt__radio",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("span", null))), badge, price != null && /*#__PURE__*/React.createElement("div", {
    className: "bf-opt__price"
  }, /*#__PURE__*/React.createElement("b", null, price), /*#__PURE__*/React.createElement("span", null, currency, " \xB7 estim.")), meta.length > 0 && /*#__PURE__*/React.createElement("dl", {
    className: "bf-opt__meta"
  }, meta.map((m, i) => /*#__PURE__*/React.createElement("div", {
    className: "bf-opt__metaitem",
    key: i
  }, /*#__PURE__*/React.createElement("dt", null, m.label), /*#__PURE__*/React.createElement("dd", null, m.value)))));
}
Object.assign(__ds_scope, { OptionCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/OptionCard.jsx", error: String((e && e.message) || e) }); }

// components/data/ProgressRing.jsx
try { (() => {
/* Pure inline SVG ring — no external CSS needed. */
function ProgressRing({
  value = 0,
  size = 96,
  stroke = 8,
  tone = 'accent',
  label,
  showValue = true,
  className = ''
}) {
  const clamped = Math.max(0, Math.min(100, value));
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c * (1 - clamped / 100);
  const toneVar = {
    accent: 'var(--accent)',
    success: 'var(--success)',
    warning: 'var(--warning)',
    danger: 'var(--danger)'
  }[tone] || 'var(--accent)';
  return /*#__PURE__*/React.createElement("div", {
    className: className,
    style: {
      position: 'relative',
      width: size,
      height: size,
      display: 'inline-flex',
      flex: 'none'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: `0 0 ${size} ${size}`,
    style: {
      transform: 'rotate(-90deg)'
    }
  }, /*#__PURE__*/React.createElement("circle", {
    cx: size / 2,
    cy: size / 2,
    r: r,
    fill: "none",
    stroke: "var(--gray-4)",
    strokeWidth: stroke
  }), /*#__PURE__*/React.createElement("circle", {
    cx: size / 2,
    cy: size / 2,
    r: r,
    fill: "none",
    stroke: toneVar,
    strokeWidth: stroke,
    strokeLinecap: "round",
    strokeDasharray: c,
    strokeDashoffset: offset,
    style: {
      transition: 'stroke-dashoffset var(--dur-slow) var(--ease-out)'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 1
    }
  }, showValue && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontVariantNumeric: 'tabular-nums',
      fontWeight: 'var(--fw-semibold)',
      fontSize: size > 80 ? 'var(--fs-h2)' : 'var(--fs-h4)',
      color: 'var(--text-primary)',
      letterSpacing: 'var(--ls-snug)',
      lineHeight: 1
    }
  }, Math.round(clamped), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '0.55em',
      color: 'var(--text-tertiary)'
    }
  }, "%")), label && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--fs-micro)',
      color: 'var(--text-tertiary)',
      letterSpacing: 'var(--ls-snug)'
    }
  }, label)));
}
Object.assign(__ds_scope, { ProgressRing });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/ProgressRing.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Tooltip.jsx
try { (() => {
const {
  useState
} = React;
let injected = false;
function useStyles() {
  if (injected || typeof document === 'undefined') return;
  injected = true;
  const el = document.createElement('style');
  el.id = 'bf-tooltip';
  el.textContent = `
  .bf-tt { position: relative; display: inline-flex; }
  .bf-tt__pop {
    position: absolute; z-index: 50; left: 50%; transform: translateX(-50%) translateY(-4px);
    bottom: calc(100% + 8px); width: max-content; max-width: 240px; padding: 8px 10px;
    background: var(--gray-5); color: var(--text-primary); border: 1px solid var(--border-strong);
    border-radius: var(--radius-md); box-shadow: var(--shadow-md);
    font-size: var(--fs-caption); line-height: var(--lh-normal); text-align: left;
    opacity: 0; pointer-events: none; transition: opacity var(--dur-fast) var(--ease-standard), transform var(--dur-fast) var(--ease-standard);
  }
  .bf-tt:hover .bf-tt__pop, .bf-tt:focus-within .bf-tt__pop { opacity: 1; transform: translateX(-50%) translateY(0); }
  .bf-tt__pop::after { content: ''; position: absolute; top: 100%; left: 50%; transform: translateX(-50%);
    border: 5px solid transparent; border-top-color: var(--gray-5); }
  .bf-tt__trigger {
    display: inline-flex; align-items: center; justify-content: center; width: 16px; height: 16px;
    border-radius: 50%; border: 1px solid var(--border-strong); color: var(--text-tertiary);
    background: transparent; cursor: help; font-size: 10px; font-weight: var(--fw-semibold); font-family: var(--font-mono);
  }
  .bf-tt__trigger:hover { color: var(--text-secondary); border-color: var(--text-tertiary); }
  `;
  document.head.appendChild(el);
}
function Tooltip({
  content,
  children,
  className = ''
}) {
  useStyles();
  return /*#__PURE__*/React.createElement("span", {
    className: `bf-tt ${className}`,
    tabIndex: children ? undefined : 0
  }, children || /*#__PURE__*/React.createElement("span", {
    className: "bf-tt__trigger",
    "aria-label": "Ayuda"
  }, "?"), /*#__PURE__*/React.createElement("span", {
    className: "bf-tt__pop",
    role: "tooltip"
  }, content));
}
Object.assign(__ds_scope, { Tooltip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Tooltip.jsx", error: String((e && e.message) || e) }); }

// components/forms/InputField.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
let injected = false;
function useStyles() {
  if (injected || typeof document === 'undefined') return;
  injected = true;
  const el = document.createElement('style');
  el.id = 'bf-inputfield';
  el.textContent = `
  .bf-if { display: flex; flex-direction: column; gap: 6px; }
  .bf-if__label { font-size: var(--fs-sm); font-weight: var(--fw-medium); color: var(--text-secondary); letter-spacing: var(--ls-snug); }
  .bf-if__hint { font-size: var(--fs-caption); color: var(--text-tertiary); }
  .bf-if__box {
    display: flex; align-items: center; height: var(--control-h);
    background: var(--surface-raised); border: 1px solid var(--border-default);
    border-radius: var(--radius-md); padding: 0 2px 0 10px;
    transition: border-color var(--dur-fast) var(--ease-standard), box-shadow var(--dur-fast) var(--ease-standard);
  }
  .bf-if__box:hover { border-color: var(--border-strong); }
  .bf-if__box:focus-within { border-color: var(--border-focus); box-shadow: var(--ring-focus); }
  .bf-if__box--invalid { border-color: var(--danger); }
  .bf-if__box--invalid:focus-within { box-shadow: 0 0 0 3px var(--danger-quiet); }
  .bf-if__icon { display: inline-flex; color: var(--text-tertiary); margin-right: 8px; }
  .bf-if__icon svg { width: 16px; height: 16px; }
  .bf-if__input {
    flex: 1; min-width: 0; border: none; background: transparent; color: var(--text-primary);
    font-family: var(--font-sans); font-size: var(--fs-body); height: 100%; padding: 0;
  }
  .bf-if__input::placeholder { color: var(--text-disabled); }
  .bf-if__input:focus { outline: none; }
  .bf-if--num .bf-if__input { font-family: var(--font-mono); font-variant-numeric: tabular-nums; font-feature-settings: var(--tnum); }
  .bf-if__suffix {
    display: inline-flex; align-items: center; align-self: stretch; padding: 0 10px; margin-left: 6px;
    font-family: var(--font-mono); font-size: var(--fs-caption); color: var(--text-tertiary);
    border-left: 1px solid var(--border-subtle); background: var(--surface-inset);
    border-radius: 0 var(--radius-md) var(--radius-md) 0;
  }
  .bf-if__err { font-size: var(--fs-caption); color: var(--danger); }
  `;
  document.head.appendChild(el);
}
function InputField({
  label,
  hint,
  value,
  onChange,
  placeholder,
  suffix,
  iconLeft,
  type = 'text',
  numeric = false,
  error,
  className = '',
  ...rest
}) {
  useStyles();
  const invalid = Boolean(error);
  return /*#__PURE__*/React.createElement("div", {
    className: `bf-if ${numeric ? 'bf-if--num' : ''} ${className}`
  }, (label || hint) && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      gap: 12
    }
  }, label && /*#__PURE__*/React.createElement("label", {
    className: "bf-if__label"
  }, label), hint && /*#__PURE__*/React.createElement("span", {
    className: "bf-if__hint"
  }, hint)), /*#__PURE__*/React.createElement("div", {
    className: `bf-if__box ${invalid ? 'bf-if__box--invalid' : ''}`
  }, iconLeft && /*#__PURE__*/React.createElement("span", {
    className: "bf-if__icon"
  }, iconLeft), /*#__PURE__*/React.createElement("input", _extends({
    className: "bf-if__input",
    type: numeric ? 'number' : type,
    value: value,
    placeholder: placeholder,
    onChange: e => onChange && onChange(numeric ? e.target.value : e.target.value)
  }, rest)), suffix && /*#__PURE__*/React.createElement("span", {
    className: "bf-if__suffix"
  }, suffix)), invalid && /*#__PURE__*/React.createElement("span", {
    className: "bf-if__err"
  }, error));
}
Object.assign(__ds_scope, { InputField });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/InputField.jsx", error: String((e && e.message) || e) }); }

// components/forms/SegmentedControl.jsx
try { (() => {
let injected = false;
function useStyles() {
  if (injected || typeof document === 'undefined') return;
  injected = true;
  const el = document.createElement('style');
  el.id = 'bf-segmented';
  el.textContent = `
  .bf-seg { display: inline-flex; flex-direction: column; gap: 6px; width: 100%; }
  .bf-seg__label { font-size: var(--fs-sm); font-weight: var(--fw-medium); color: var(--text-secondary); letter-spacing: var(--ls-snug); }
  .bf-seg__track {
    display: inline-flex; padding: 3px; gap: 2px; width: 100%;
    background: var(--surface-inset); border: 1px solid var(--border-subtle);
    border-radius: var(--radius-md);
  }
  .bf-seg__opt {
    flex: 1; display: inline-flex; align-items: center; justify-content: center; gap: 6px;
    height: 28px; padding: 0 10px; border: none; background: transparent; cursor: pointer;
    font-family: var(--font-sans); font-size: var(--fs-sm); font-weight: var(--fw-medium);
    color: var(--text-secondary); border-radius: var(--radius-sm); white-space: nowrap;
    transition: color var(--dur-fast) var(--ease-standard), background var(--dur-fast) var(--ease-standard);
  }
  .bf-seg__opt:hover:not(.is-active) { color: var(--text-primary); }
  .bf-seg__opt.is-active { background: var(--surface-active); color: var(--text-primary); box-shadow: var(--shadow-sm), var(--ring-hairline); }
  .bf-seg__opt:focus-visible { outline: none; box-shadow: var(--ring-focus); }
  .bf-seg__opt svg { width: 15px; height: 15px; }
  `;
  document.head.appendChild(el);
}
function SegmentedControl({
  label,
  options = [],
  value,
  onChange,
  className = ''
}) {
  useStyles();
  return /*#__PURE__*/React.createElement("div", {
    className: `bf-seg ${className}`
  }, label && /*#__PURE__*/React.createElement("span", {
    className: "bf-seg__label"
  }, label), /*#__PURE__*/React.createElement("div", {
    className: "bf-seg__track",
    role: "tablist"
  }, options.map(opt => {
    const v = typeof opt === 'string' ? opt : opt.value;
    const lbl = typeof opt === 'string' ? opt : opt.label;
    const icon = typeof opt === 'string' ? null : opt.icon;
    const active = v === value;
    return /*#__PURE__*/React.createElement("button", {
      key: v,
      role: "tab",
      "aria-selected": active,
      className: `bf-seg__opt ${active ? 'is-active' : ''}`,
      onClick: () => onChange && onChange(v)
    }, icon, lbl);
  })));
}
Object.assign(__ds_scope, { SegmentedControl });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/SegmentedControl.jsx", error: String((e && e.message) || e) }); }

// components/forms/SliderField.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
let injected = false;
function useStyles() {
  if (injected || typeof document === 'undefined') return;
  injected = true;
  const el = document.createElement('style');
  el.id = 'bf-sliderfield';
  el.textContent = `
  .bf-sf { display: flex; flex-direction: column; gap: 9px; }
  .bf-sf__top { display: flex; align-items: baseline; justify-content: space-between; gap: 12px; }
  .bf-sf__label { font-size: var(--fs-sm); font-weight: var(--fw-medium); color: var(--text-secondary); letter-spacing: var(--ls-snug); }
  .bf-sf__valwrap { display: inline-flex; align-items: baseline; gap: 4px;
    background: var(--surface-raised); border: 1px solid var(--border-default);
    border-radius: var(--radius-sm); padding: 3px 8px; }
  .bf-sf__valwrap:focus-within { border-color: var(--border-focus); box-shadow: var(--ring-focus); }
  .bf-sf__input {
    width: 4ch; border: none; background: transparent; text-align: right;
    font-family: var(--font-mono); font-variant-numeric: tabular-nums; font-feature-settings: var(--tnum);
    font-size: var(--fs-sm); font-weight: var(--fw-medium); color: var(--text-primary); padding: 0;
  }
  .bf-sf__input:focus { outline: none; }
  .bf-sf__input::-webkit-outer-spin-button, .bf-sf__input::-webkit-inner-spin-button { -webkit-appearance: none; margin: 0; }
  .bf-sf__unit { font-family: var(--font-mono); font-size: var(--fs-micro); color: var(--text-tertiary); }

  .bf-sf__range { -webkit-appearance: none; appearance: none; width: 100%; height: 4px;
    border-radius: var(--radius-full); cursor: pointer; outline: none; margin: 2px 0; }
  .bf-sf__range:focus-visible { box-shadow: var(--ring-focus); }
  .bf-sf__range::-webkit-slider-thumb {
    -webkit-appearance: none; appearance: none; width: 14px; height: 14px; border-radius: 50%;
    background: var(--text-primary); border: 3px solid var(--accent);
    box-shadow: 0 1px 3px rgba(0,0,0,0.4); cursor: pointer; margin-top: -5px; transition: transform var(--dur-fast) var(--ease-standard); }
  .bf-sf__range::-webkit-slider-thumb:hover { transform: scale(1.12); }
  .bf-sf__range::-moz-range-thumb { width: 14px; height: 14px; border-radius: 50%;
    background: var(--text-primary); border: 3px solid var(--accent); cursor: pointer; }
  .bf-sf__range::-webkit-slider-runnable-track { height: 4px; border-radius: var(--radius-full); }
  .bf-sf__range::-moz-range-track { height: 4px; border-radius: var(--radius-full); background: var(--gray-4); }
  `;
  document.head.appendChild(el);
}
function SliderField({
  label,
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  unit,
  className = '',
  ...rest
}) {
  useStyles();
  const pct = max > min ? (value - min) / (max - min) * 100 : 0;
  const track = `linear-gradient(to right, var(--accent) 0%, var(--accent) ${pct}%, var(--gray-4) ${pct}%, var(--gray-4) 100%)`;
  const emit = v => {
    const n = Number(v);
    if (!Number.isNaN(n) && onChange) onChange(Math.min(max, Math.max(min, n)));
  };
  return /*#__PURE__*/React.createElement("div", {
    className: `bf-sf ${className}`
  }, /*#__PURE__*/React.createElement("div", {
    className: "bf-sf__top"
  }, /*#__PURE__*/React.createElement("label", {
    className: "bf-sf__label"
  }, label), /*#__PURE__*/React.createElement("span", {
    className: "bf-sf__valwrap"
  }, /*#__PURE__*/React.createElement("input", {
    className: "bf-sf__input",
    type: "number",
    value: value,
    min: min,
    max: max,
    step: step,
    onChange: e => emit(e.target.value)
  }), unit && /*#__PURE__*/React.createElement("span", {
    className: "bf-sf__unit"
  }, unit))), /*#__PURE__*/React.createElement("input", _extends({
    className: "bf-sf__range",
    type: "range",
    value: value,
    min: min,
    max: max,
    step: step,
    style: {
      background: track
    },
    onChange: e => emit(e.target.value)
  }, rest)));
}
Object.assign(__ds_scope, { SliderField });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/SliderField.jsx", error: String((e && e.message) || e) }); }

// ui_kits/configurator/BudgetSection.kit.js
try { (() => {
/* BoxForge — budget section. Clean line-item table (concepts, qty, unit, total)
   marked clearly as orientativo, with export actions. */

function BudgetSection({
  result,
  rates
}) {
  const {
    Card,
    Button,
    Badge
  } = window.BoxForgeDesignSystem_c042fe;
  const I = window.BFIcons;
  const fmt = n => new Intl.NumberFormat('es-ES').format(Math.round(n));
  const eur = n => new Intl.NumberFormat('es-ES', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(n) + ' €';
  const areaPerBox = window.BoxForgePacking.blankAreaM2(result);
  const totalArea = areaPerBox * result.boxesNeeded;
  const cartonCost = totalArea * rates.perM2;
  const handling = result.boxesNeeded * rates.perBox;
  const subtotal = cartonCost + handling;
  const total = subtotal;
  const lines = [{
    c: 'Cartón corrugado',
    detail: `${fmt(result.boxesNeeded)} cajas · ${areaPerBox.toFixed(3)} m²/caja`,
    qty: totalArea.toFixed(2) + ' m²',
    unit: eur(rates.perM2),
    amount: cartonCost
  }, {
    c: 'Troquelado y montaje',
    detail: `${fmt(result.boxesNeeded)} cajas`,
    qty: fmt(result.boxesNeeded),
    unit: eur(rates.perBox),
    amount: handling
  }];
  return /*#__PURE__*/React.createElement(Card, {
    padded: false,
    className: "budget"
  }, /*#__PURE__*/React.createElement("header", {
    className: "budget-head"
  }, /*#__PURE__*/React.createElement("div", {
    className: "budget-title"
  }, /*#__PURE__*/React.createElement(I.FileText, {
    size: 17
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "t-eyebrow"
  }, "Presupuesto"), /*#__PURE__*/React.createElement("h3", {
    className: "budget-h"
  }, "Resumen orientativo"))), /*#__PURE__*/React.createElement(Badge, {
    tone: "outline"
  }, "Tarifas del fabricante")), /*#__PURE__*/React.createElement("table", {
    className: "budget-table"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "Concepto"), /*#__PURE__*/React.createElement("th", {
    className: "num"
  }, "Cantidad"), /*#__PURE__*/React.createElement("th", {
    className: "num"
  }, "Precio unit."), /*#__PURE__*/React.createElement("th", {
    className: "num"
  }, "Importe"))), /*#__PURE__*/React.createElement("tbody", null, lines.map((l, i) => /*#__PURE__*/React.createElement("tr", {
    key: i
  }, /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("div", {
    className: "bt-concept"
  }, l.c), /*#__PURE__*/React.createElement("div", {
    className: "bt-detail"
  }, l.detail)), /*#__PURE__*/React.createElement("td", {
    className: "num"
  }, l.qty), /*#__PURE__*/React.createElement("td", {
    className: "num"
  }, l.unit), /*#__PURE__*/React.createElement("td", {
    className: "num strong"
  }, eur(l.amount)))))), /*#__PURE__*/React.createElement("div", {
    className: "budget-foot"
  }, /*#__PURE__*/React.createElement("div", {
    className: "budget-note"
  }, /*#__PURE__*/React.createElement(I.AlertTriangle, {
    size: 13
  }), "Presupuesto orientativo, no vinculante. No incluye IVA ni transporte."), /*#__PURE__*/React.createElement("div", {
    className: "budget-total"
  }, /*#__PURE__*/React.createElement("div", {
    className: "budget-total-row"
  }, /*#__PURE__*/React.createElement("span", null, "Total estimado"), /*#__PURE__*/React.createElement("b", {
    className: "tabular"
  }, eur(total))), /*#__PURE__*/React.createElement("div", {
    className: "budget-actions"
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    size: "sm",
    iconLeft: /*#__PURE__*/React.createElement(I.Copy, {
      size: 15
    })
  }, "Copiar"), /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    iconLeft: /*#__PURE__*/React.createElement(I.Download, {
      size: 15
    })
  }, "Exportar PDF")))));
}
window.BudgetSection = BudgetSection;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/configurator/BudgetSection.kit.js", error: String((e && e.message) || e) }); }

// ui_kits/configurator/Configurator.kit.js
try { (() => {
/* BoxForge — configurator orchestrator. Holds product/order state, runs the
   packing engine in real time, derives the 3 comparison options, and composes
   header + inputs + viewer + results + budget. */

const {
  useState,
  useMemo
} = React;
function Header() {
  const {
    Button
  } = window.BoxForgeDesignSystem_c042fe;
  const I = window.BFIcons;
  return /*#__PURE__*/React.createElement("header", {
    className: "bf-header"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bf-header-left"
  }, /*#__PURE__*/React.createElement("span", {
    className: "bf-logo"
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/boxforge-mark.svg",
    width: "26",
    height: "26",
    alt: ""
  }), /*#__PURE__*/React.createElement("span", {
    className: "bf-logo-text"
  }, "Box", /*#__PURE__*/React.createElement("span", null, "Forge"))), /*#__PURE__*/React.createElement("span", {
    className: "bf-divider"
  }), /*#__PURE__*/React.createElement("span", {
    className: "bf-project"
  }, /*#__PURE__*/React.createElement("span", {
    className: "bf-project-name"
  }, "Pedido \xB7 Acme Cosmetics"), /*#__PURE__*/React.createElement("span", {
    className: "bf-project-meta"
  }, "Calculadora de cajas a medida"))), /*#__PURE__*/React.createElement("div", {
    className: "bf-header-actions"
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    size: "sm",
    iconLeft: /*#__PURE__*/React.createElement(I.Plus, {
      size: 15
    })
  }, "Nuevo"), /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    size: "sm",
    iconLeft: /*#__PURE__*/React.createElement(I.Save, {
      size: 15
    })
  }, "Guardar"), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    size: "sm",
    iconLeft: /*#__PURE__*/React.createElement(I.Download, {
      size: 15
    })
  }, "Exportar PDF")));
}
function deriveOptions(product, order) {
  const P = window.BoxForgePacking;
  const variants = [{
    id: 'compact',
    name: 'Más compacta',
    tagline: 'Menor huella',
    mod: {
      clearance: Math.max(2, order.clearance - 2)
    },
    perM2: 1.65
  }, {
    id: 'cheap',
    name: 'Más barata',
    tagline: 'Menor coste',
    mod: {
      clearance: order.clearance,
      thickness: Math.min(order.thickness, 3)
    },
    perM2: 1.42
  }, {
    id: 'sturdy',
    name: 'Más resistente',
    tagline: 'Doble canal',
    mod: {
      clearance: order.clearance + 4,
      thickness: 4
    },
    perM2: 2.05
  }];
  return variants.map(v => {
    const oc = {
      ...order,
      ...v.mod
    };
    const res = P.computePacking(product, oc);
    const area = P.blankAreaM2(res) * res.boxesNeeded;
    const price = area * v.perM2 + res.boxesNeeded * 0.12;
    return {
      ...v,
      result: res,
      constraints: oc,
      boxes: res.boxesNeeded,
      fill: Math.round(res.fillRate),
      price: new Intl.NumberFormat('es-ES', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }).format(price),
      priceNum: price
    };
  }).sort((a, b) => a.priceNum - b.priceNum).map((o, i, arr) => ({
    ...o,
    recommended: o.id === 'compact'
  }));
}
function Configurator() {
  const [product, setProduct] = useState({
    ref: 'SKU-0042',
    length: 120,
    width: 80,
    height: 55,
    weight: 240
  });
  const [order, setOrder] = useState({
    quantity: 480,
    clearance: 6,
    thickness: 3,
    maxBoxWeight: 15000
  });
  const [selected, setSelected] = useState('compact');
  const [fold, setFold] = useState(false);
  const [showProduct, setShowProduct] = useState(true);
  const [xray, setXray] = useState(false);
  const options = useMemo(() => deriveOptions(product, order), [product, order]);
  const active = options.find(o => o.id === selected) || options[0];
  const result = active.result;
  const rates = {
    perM2: active.perM2,
    perBox: 0.12
  };
  const InputsPanel = window.InputsPanel;
  const ViewerStage = window.ViewerStage;
  const ResultsPanel = window.ResultsPanel;
  const BudgetSection = window.BudgetSection;
  return /*#__PURE__*/React.createElement("div", {
    className: "bf-app"
  }, /*#__PURE__*/React.createElement(Header, null), /*#__PURE__*/React.createElement("main", {
    className: "bf-main"
  }, /*#__PURE__*/React.createElement("aside", {
    className: "bf-col bf-col-inputs"
  }, /*#__PURE__*/React.createElement(InputsPanel, {
    product: product,
    setProduct: setProduct,
    order: order,
    setOrder: setOrder
  })), /*#__PURE__*/React.createElement("section", {
    className: "bf-col bf-col-stage"
  }, /*#__PURE__*/React.createElement(ViewerStage, {
    result: result,
    fold: fold,
    showProduct: showProduct,
    xray: xray,
    onToggleFold: () => setFold(f => !f),
    onToggleProduct: () => setShowProduct(p => !p),
    onToggleXray: () => setXray(x => !x)
  }), /*#__PURE__*/React.createElement(BudgetSection, {
    result: result,
    rates: rates
  })), /*#__PURE__*/React.createElement("aside", {
    className: "bf-col bf-col-results"
  }, /*#__PURE__*/React.createElement(ResultsPanel, {
    result: result,
    product: product,
    options: options,
    selected: selected,
    onSelect: setSelected
  }))));
}
window.Configurator = Configurator;

// Render entry lives here (the last-loaded kit file) so it runs only after all
// sibling globals are defined — avoids Babel external-src ordering races.
(function mount() {
  const elapsed = mount._t = mount._t || 0;
  const ready = window.InputsPanel && window.ViewerStage && window.ResultsPanel && window.BudgetSection && window.BFIcons && window.BoxForgeDesignSystem_c042fe;
  if (!ready && elapsed < 40) {
    mount._t++;
    return setTimeout(mount, 50);
  }
  const host = document.getElementById('root');
  if (host.__mounted) return;
  host.__mounted = true;
  ReactDOM.createRoot(host).render(/*#__PURE__*/React.createElement(Configurator, null));
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/configurator/Configurator.kit.js", error: String((e && e.message) || e) }); }

// ui_kits/configurator/Icons.kit.js
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* BoxForge — icon set. Lucide (MIT, lucide.dev) paths, inlined as React
   components at a consistent 1.75 stroke. Sourced from Lucide so the brand
   uses one coherent thin-stroke set (no emoji, no mixed libraries). */

function Ic({
  children,
  size = 18,
  sw = 1.75,
  ...p
}) {
  return /*#__PURE__*/React.createElement("svg", _extends({
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: sw,
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, p), children);
}
const Icons = {
  Box: p => /*#__PURE__*/React.createElement(Ic, p, /*#__PURE__*/React.createElement("path", {
    d: "M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "m3.3 7 8.7 5 8.7-5"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12 22V12"
  })),
  Boxes: p => /*#__PURE__*/React.createElement(Ic, p, /*#__PURE__*/React.createElement("path", {
    d: "M2.97 12.92A2 2 0 0 0 2 14.63v3.24a2 2 0 0 0 .97 1.71l3 1.8a2 2 0 0 0 2.06 0L12 19v-5.5l-5-3-4.03 2.42Z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "m7 16.5-4.74-2.85"
  }), /*#__PURE__*/React.createElement("path", {
    d: "m7 16.5 5-3"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M7 16.5v5.17"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12 13.5V19l3.97 2.38a2 2 0 0 0 2.06 0l3-1.8a2 2 0 0 0 .97-1.71v-3.24a2 2 0 0 0-.97-1.71L17 10.5l-5 3Z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "m17 16.5-5-3"
  }), /*#__PURE__*/React.createElement("path", {
    d: "m17 16.5 4.74-2.85"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M17 16.5v5.17"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M7.97 4.42A2 2 0 0 0 7 6.13v4.37l5 3 5-3V6.13a2 2 0 0 0-.97-1.71l-3-1.8a2 2 0 0 0-2.06 0l-3 1.8Z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12 8 7.26 5.15"
  }), /*#__PURE__*/React.createElement("path", {
    d: "m12 8 4.74-2.85"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12 13.5V8"
  })),
  Ruler: p => /*#__PURE__*/React.createElement(Ic, p, /*#__PURE__*/React.createElement("path", {
    d: "M21.3 15.3a2.4 2.4 0 0 1 0 3.4l-2.6 2.6a2.4 2.4 0 0 1-3.4 0L2.7 8.7a2.41 2.41 0 0 1 0-3.4l2.6-2.6a2.41 2.41 0 0 1 3.4 0Z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "m14.5 12.5 2-2"
  }), /*#__PURE__*/React.createElement("path", {
    d: "m11.5 9.5 2-2"
  }), /*#__PURE__*/React.createElement("path", {
    d: "m8.5 6.5 2-2"
  }), /*#__PURE__*/React.createElement("path", {
    d: "m17.5 15.5 2-2"
  })),
  Weight: p => /*#__PURE__*/React.createElement(Ic, p, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "5",
    r: "3"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M6.5 8h11l2.49 9.94A2 2 0 0 1 18.05 20H5.95a2 2 0 0 1-1.94-2.06Z"
  })),
  Package: p => /*#__PURE__*/React.createElement(Ic, p, /*#__PURE__*/React.createElement("path", {
    d: "m7.5 4.27 9 5.15"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "m3.3 7 8.7 5 8.7-5"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12 22V12"
  })),
  Layers: p => /*#__PURE__*/React.createElement(Ic, p, /*#__PURE__*/React.createElement("path", {
    d: "m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65"
  }), /*#__PURE__*/React.createElement("path", {
    d: "m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65"
  })),
  Gauge: p => /*#__PURE__*/React.createElement(Ic, p, /*#__PURE__*/React.createElement("path", {
    d: "m12 14 4-4"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M3.34 19a10 10 0 1 1 17.32 0"
  })),
  Sparkles: p => /*#__PURE__*/React.createElement(Ic, p, /*#__PURE__*/React.createElement("path", {
    d: "M9.94 14.5 8.31 19a1 1 0 0 1-1.88 0L4.8 14.5a2 2 0 0 0-1.3-1.3L-1 11.57a1 1 0 0 1 0-1.88L3.5 8.06a2 2 0 0 0 1.3-1.3L6.43 2.3a1 1 0 0 1 1.88 0l1.63 4.46a2 2 0 0 0 1.3 1.3l4.5 1.63a1 1 0 0 1 0 1.88l-4.5 1.63a2 2 0 0 0-1.3 1.3Z",
    transform: "translate(2 1)"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M18 6h.01"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M21 12h.01"
  })),
  Download: p => /*#__PURE__*/React.createElement(Ic, p, /*#__PURE__*/React.createElement("path", {
    d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"
  }), /*#__PURE__*/React.createElement("polyline", {
    points: "7 10 12 15 17 10"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "12",
    y1: "15",
    x2: "12",
    y2: "3"
  })),
  Save: p => /*#__PURE__*/React.createElement(Ic, p, /*#__PURE__*/React.createElement("path", {
    d: "M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M7 3v4a1 1 0 0 0 1 1h7"
  })),
  Plus: p => /*#__PURE__*/React.createElement(Ic, p, /*#__PURE__*/React.createElement("path", {
    d: "M5 12h14"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12 5v14"
  })),
  Calculator: p => /*#__PURE__*/React.createElement(Ic, p, /*#__PURE__*/React.createElement("rect", {
    width: "16",
    height: "20",
    x: "4",
    y: "2",
    rx: "2"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "8",
    x2: "16",
    y1: "6",
    y2: "6"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "16",
    x2: "16",
    y1: "14",
    y2: "18"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M8 10h.01"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12 10h.01"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M16 10h.01"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M8 14h.01"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12 14h.01"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M8 18h.01"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12 18h.01"
  })),
  RotateCw: p => /*#__PURE__*/React.createElement(Ic, p, /*#__PURE__*/React.createElement("path", {
    d: "M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M21 3v5h-5"
  })),
  Maximize: p => /*#__PURE__*/React.createElement(Ic, p, /*#__PURE__*/React.createElement("path", {
    d: "M8 3H5a2 2 0 0 0-2 2v3"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M21 8V5a2 2 0 0 0-2-2h-3"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M3 16v3a2 2 0 0 0 2 2h3"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M16 21h3a2 2 0 0 0 2-2v-3"
  })),
  Eye: p => /*#__PURE__*/React.createElement(Ic, p, /*#__PURE__*/React.createElement("path", {
    d: "M2.06 12.35a1 1 0 0 1 0-.7 10.75 10.75 0 0 1 19.88 0 1 1 0 0 1 0 .7 10.75 10.75 0 0 1-19.88 0"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "3"
  })),
  Scan: p => /*#__PURE__*/React.createElement(Ic, p, /*#__PURE__*/React.createElement("path", {
    d: "M3 7V5a2 2 0 0 1 2-2h2"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M17 3h2a2 2 0 0 1 2 2v2"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M21 17v2a2 2 0 0 1-2 2h-2"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M7 21H5a2 2 0 0 1-2-2v-2"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M7 12h10"
  })),
  FoldVertical: p => /*#__PURE__*/React.createElement(Ic, p, /*#__PURE__*/React.createElement("path", {
    d: "M12 22v-6"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12 8V2"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M4 12H2"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M10 12H8"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M16 12h-2"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M22 12h-2"
  }), /*#__PURE__*/React.createElement("path", {
    d: "m15 19-3 3-3-3"
  }), /*#__PURE__*/React.createElement("path", {
    d: "m15 5-3-3-3 3"
  })),
  Check: p => /*#__PURE__*/React.createElement(Ic, p, /*#__PURE__*/React.createElement("path", {
    d: "M20 6 9 17l-5-5"
  })),
  AlertTriangle: p => /*#__PURE__*/React.createElement(Ic, p, /*#__PURE__*/React.createElement("path", {
    d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12 9v4"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12 17h.01"
  })),
  ChevronDown: p => /*#__PURE__*/React.createElement(Ic, p, /*#__PURE__*/React.createElement("path", {
    d: "m6 9 6 6 6-6"
  })),
  Copy: p => /*#__PURE__*/React.createElement(Ic, p, /*#__PURE__*/React.createElement("rect", {
    width: "14",
    height: "14",
    x: "8",
    y: "8",
    rx: "2",
    ry: "2"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"
  })),
  FileText: p => /*#__PURE__*/React.createElement(Ic, p, /*#__PURE__*/React.createElement("path", {
    d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M14 2v4a2 2 0 0 0 2 2h4"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M10 9H8"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M16 13H8"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M16 17H8"
  })),
  Settings: p => /*#__PURE__*/React.createElement(Ic, p, /*#__PURE__*/React.createElement("path", {
    d: "M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2Z"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "3"
  }))
};
window.BFIcons = Icons;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/configurator/Icons.kit.js", error: String((e && e.message) || e) }); }

// ui_kits/configurator/InputsPanel.kit.js
try { (() => {
/* BoxForge — left inputs panel. Product + order data in grouped Cards,
   composed from the DS form primitives. */

function InputsPanel({
  product,
  setProduct,
  order,
  setOrder
}) {
  const {
    Card,
    SliderField,
    InputField,
    SegmentedControl,
    Tooltip
  } = window.BoxForgeDesignSystem_c042fe;
  const I = window.BFIcons;
  const pset = k => v => setProduct({
    ...product,
    [k]: v
  });
  const oset = k => v => setOrder({
    ...order,
    [k]: v
  });
  const num = (k, set) => v => set(k)(v === '' ? 0 : Number(v));
  return /*#__PURE__*/React.createElement("div", {
    className: "inputs"
  }, /*#__PURE__*/React.createElement(Card, {
    eyebrow: "Paso 1",
    title: "Producto",
    icon: /*#__PURE__*/React.createElement(I.Package, {
      size: 16
    }),
    bodyTight: true
  }, /*#__PURE__*/React.createElement("div", {
    className: "field-stack"
  }, /*#__PURE__*/React.createElement(InputField, {
    label: "Referencia",
    value: product.ref,
    onChange: pset('ref'),
    placeholder: "SKU-0042"
  }), /*#__PURE__*/React.createElement(SliderField, {
    label: "Largo",
    value: product.length,
    onChange: pset('length'),
    min: 10,
    max: 600,
    unit: "mm"
  }), /*#__PURE__*/React.createElement(SliderField, {
    label: "Ancho",
    value: product.width,
    onChange: pset('width'),
    min: 10,
    max: 600,
    unit: "mm"
  }), /*#__PURE__*/React.createElement(SliderField, {
    label: "Alto",
    value: product.height,
    onChange: pset('height'),
    min: 10,
    max: 600,
    unit: "mm"
  }), /*#__PURE__*/React.createElement(InputField, {
    label: "Peso por unidad",
    numeric: true,
    value: product.weight,
    onChange: num('weight', pset),
    suffix: "g",
    iconLeft: /*#__PURE__*/React.createElement(I.Weight, {
      size: 16
    })
  }))), /*#__PURE__*/React.createElement(Card, {
    eyebrow: "Paso 2",
    title: "Pedido",
    icon: /*#__PURE__*/React.createElement(I.Boxes, {
      size: 16
    }),
    bodyTight: true
  }, /*#__PURE__*/React.createElement("div", {
    className: "field-stack"
  }, /*#__PURE__*/React.createElement(InputField, {
    label: "Unidades totales a enviar",
    numeric: true,
    value: order.quantity,
    onChange: num('quantity', oset),
    suffix: "ud",
    iconLeft: /*#__PURE__*/React.createElement(I.Layers, {
      size: 16
    })
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "field-label-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "field-label"
  }, "Holgura interior"), /*#__PURE__*/React.createElement(Tooltip, {
    content: "Espacio libre entre el producto y la pared interior de la caja, por lado."
  })), /*#__PURE__*/React.createElement(SliderField, {
    label: "",
    value: order.clearance,
    onChange: oset('clearance'),
    min: 0,
    max: 40,
    unit: "mm"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "field-label-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "field-label"
  }, "Canal del cart\xF3n"), /*#__PURE__*/React.createElement(Tooltip, {
    content: "Grosor de la onda corrugada. E \u2248 1.5 mm, B \u2248 3 mm, C \u2248 4 mm."
  })), /*#__PURE__*/React.createElement(SegmentedControl, {
    value: String(order.thickness),
    onChange: v => oset('thickness')(Number(v)),
    options: [{
      value: '1.5',
      label: 'E · 1.5'
    }, {
      value: '3',
      label: 'B · 3'
    }, {
      value: '4',
      label: 'C · 4'
    }]
  })), /*#__PURE__*/React.createElement(InputField, {
    label: "Peso m\xE1x. por caja (0 = sin l\xEDmite)",
    numeric: true,
    value: order.maxBoxWeight,
    onChange: num('maxBoxWeight', oset),
    suffix: "g"
  }))));
}
window.InputsPanel = InputsPanel;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/configurator/InputsPanel.kit.js", error: String((e && e.message) || e) }); }

// ui_kits/configurator/ResultsPanel.kit.js
try { (() => {
/* BoxForge — right results panel. Big tabular metrics + aprovechamiento ring,
   weight-limit warning, and the 2-option comparison. */

function ResultsPanel({
  result,
  product,
  options,
  selected,
  onSelect
}) {
  const {
    Card,
    MetricStat,
    ProgressRing,
    Badge,
    OptionCard
  } = window.BoxForgeDesignSystem_c042fe;
  const I = window.BFIcons;
  const r = result;
  const fmt = n => new Intl.NumberFormat('es-ES').format(Math.round(n));
  const fmt1 = n => new Intl.NumberFormat('es-ES', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(n);
  const fillTone = r.fillRate >= 80 ? 'accent' : r.fillRate >= 65 ? 'warning' : 'danger';
  return /*#__PURE__*/React.createElement("div", {
    className: "results"
  }, /*#__PURE__*/React.createElement(Card, {
    variant: "flush",
    padded: false
  }, /*#__PURE__*/React.createElement("div", {
    className: "res-hero"
  }, /*#__PURE__*/React.createElement(ProgressRing, {
    value: r.fillRate,
    label: "aprovechamiento",
    size: 120,
    stroke: 9,
    tone: fillTone
  }), /*#__PURE__*/React.createElement("div", {
    className: "res-hero-meta"
  }, /*#__PURE__*/React.createElement("span", {
    className: "t-eyebrow"
  }, "Disposici\xF3n interna"), /*#__PURE__*/React.createElement("span", {
    className: "res-grid-val"
  }, r.grid.nx, " \xD7 ", r.grid.ny, " \xD7 ", r.grid.nz), /*#__PURE__*/React.createElement(Badge, {
    tone: "neutral",
    mono: true
  }, r.unitsPerBox, " ud / caja")))), r.limitedByWeight && /*#__PURE__*/React.createElement("div", {
    className: "res-warn"
  }, /*#__PURE__*/React.createElement(I.AlertTriangle, {
    size: 16
  }), /*#__PURE__*/React.createElement("span", null, "Limitado por peso m\xE1ximo: caben ", r.unitsPerBox, " ud antes de superar el l\xEDmite.")), /*#__PURE__*/React.createElement(Card, {
    title: "Medidas y carga",
    bodyTight: true
  }, /*#__PURE__*/React.createElement("div", {
    className: "res-metrics"
  }, /*#__PURE__*/React.createElement(MetricStat, {
    label: "Exterior (L \xD7 An \xD7 Al)",
    value: `${fmt(r.outer.x)} × ${fmt(r.outer.z)} × ${fmt(r.outer.y)}`,
    unit: "mm"
  }), /*#__PURE__*/React.createElement(MetricStat, {
    label: "Interior \xFAtil",
    value: `${fmt(r.inner.x)} × ${fmt(r.inner.z)} × ${fmt(r.inner.y)}`,
    unit: "mm"
  }), /*#__PURE__*/React.createElement("div", {
    className: "res-metrics-row"
  }, /*#__PURE__*/React.createElement(MetricStat, {
    label: "Cajas necesarias",
    value: fmt(r.boxesNeeded),
    size: "md",
    icon: /*#__PURE__*/React.createElement(I.Boxes, {
      size: 13
    })
  }), /*#__PURE__*/React.createElement(MetricStat, {
    label: "Peso caja llena",
    value: fmt1(r.boxWeight / 1000),
    unit: "kg",
    size: "md",
    icon: /*#__PURE__*/React.createElement(I.Weight, {
      size: 13
    })
  })))), /*#__PURE__*/React.createElement(Card, {
    title: "Comparar opciones",
    icon: /*#__PURE__*/React.createElement(I.Gauge, {
      size: 16
    }),
    bodyTight: true
  }, /*#__PURE__*/React.createElement("div", {
    className: "res-options"
  }, options.map(o => /*#__PURE__*/React.createElement(OptionCard, {
    key: o.id,
    name: o.name,
    tagline: o.tagline,
    price: o.price,
    selected: selected === o.id,
    onSelect: () => onSelect(o.id),
    badge: o.recommended ? /*#__PURE__*/React.createElement(Badge, {
      tone: "accent"
    }, "Recomendada") : null,
    meta: [{
      label: 'Cajas',
      value: String(o.boxes)
    }, {
      label: 'Aprov.',
      value: o.fill + '%'
    }]
  })))));
}
window.ResultsPanel = ResultsPanel;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/configurator/ResultsPanel.kit.js", error: String((e && e.message) || e) }); }

// ui_kits/configurator/ViewerStage.kit.js
try { (() => {
/* BoxForge — viewer stage. Wraps the <box-viewer> custom element and overlays
   the kraft-styled control bar (open/close, contenido, rayos X, rotate, reset). */

function ViewerStage({
  result,
  fold,
  showProduct,
  xray,
  onToggleFold,
  onToggleProduct,
  onToggleXray
}) {
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
    return () => {
      host.removeChild(el);
    };
  }, []);
  React.useEffect(() => {
    if (elRef.current && result) elRef.current.setResult(result);
  }, [result]);
  React.useEffect(() => {
    if (elRef.current) elRef.current.setMode({
      showProduct
    });
  }, [showProduct]);
  React.useEffect(() => {
    if (elRef.current) elRef.current.setMode({
      xray
    });
  }, [xray]);
  React.useEffect(() => {
    if (!elRef.current) return;
    if (fold) elRef.current.open();else elRef.current.close();
  }, [fold]);
  const Ctrl = ({
    active,
    onClick,
    label,
    children
  }) => /*#__PURE__*/React.createElement("button", {
    className: `vs-ctrl ${active ? 'is-active' : ''}`,
    onClick: onClick,
    title: label,
    "aria-label": label
  }, children);
  return /*#__PURE__*/React.createElement("div", {
    className: "vs"
  }, /*#__PURE__*/React.createElement("div", {
    className: "vs-canvas",
    ref: ref
  }), /*#__PURE__*/React.createElement("div", {
    className: "vs-topbar"
  }, /*#__PURE__*/React.createElement("span", {
    className: "vs-tag"
  }, /*#__PURE__*/React.createElement("span", {
    className: "vs-dot"
  }), "Vista 3D \xB7 tiempo real"), /*#__PURE__*/React.createElement("button", {
    className: "vs-icon",
    title: "Pantalla completa",
    "aria-label": "Pantalla completa"
  }, /*#__PURE__*/React.createElement(I.Maximize, {
    size: 16
  }))), /*#__PURE__*/React.createElement("div", {
    className: "vs-toolbar"
  }, /*#__PURE__*/React.createElement(Ctrl, {
    active: fold,
    onClick: onToggleFold,
    label: "Abrir / cerrar caja"
  }, /*#__PURE__*/React.createElement(I.FoldVertical, {
    size: 17
  }), /*#__PURE__*/React.createElement("span", null, fold ? 'Cerrar' : 'Abrir')), /*#__PURE__*/React.createElement("span", {
    className: "vs-sep"
  }), /*#__PURE__*/React.createElement(Ctrl, {
    active: showProduct,
    onClick: onToggleProduct,
    label: "Ver contenido"
  }, /*#__PURE__*/React.createElement(I.Boxes, {
    size: 17
  }), /*#__PURE__*/React.createElement("span", null, "Contenido")), /*#__PURE__*/React.createElement(Ctrl, {
    active: xray,
    onClick: onToggleXray,
    label: "Caja transparente (rayos X)"
  }, /*#__PURE__*/React.createElement(I.Scan, {
    size: 17
  }), /*#__PURE__*/React.createElement("span", null, "Rayos X")), /*#__PURE__*/React.createElement("span", {
    className: "vs-sep"
  }), /*#__PURE__*/React.createElement(Ctrl, {
    onClick: () => elRef.current && elRef.current.resetView(),
    label: "Restablecer vista"
  }, /*#__PURE__*/React.createElement(I.RotateCw, {
    size: 16
  }))), /*#__PURE__*/React.createElement("div", {
    className: "vs-hint"
  }, "Arrastra para rotar \xB7 rueda para zoom"));
}
window.ViewerStage = ViewerStage;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/configurator/ViewerStage.kit.js", error: String((e && e.message) || e) }); }

// viewer/box-viewer.js
try { (() => {
// BoxForge — 3D box viewer (vanilla Three.js, no build step).
// Defines <box-viewer> custom element. Recreates the RSC folding-box geometry
// from the reference react-three-fiber component, with fold animation, x-ray,
// product fill and OrbitControls. Three.js is loaded at runtime via dynamic
// import() from CDN (esm.sh) — a runtime string, so static bundlers leave it
// alone and the element stays a plain <script type="module"> include.
//
// Usage:
//   <script type="module" src="viewer/box-viewer.js"></script>
//   const v = document.querySelector('box-viewer');
//   v.setResult(BoxForgePacking.computePacking(product, constraints));
//   v.setMode({ fold: 1, showProduct: true, xray: false, keepOpen: false });
//   v.open(); v.close();   // animate flaps
// Attribute: dims="true" overlays L×W×H dimension labels.

// Three.js is loaded lazily so this file has no static package imports.
let THREE, OrbitControls, RoomEnvironment, _depsPromise;
function ensureThree() {
  if (_depsPromise) return _depsPromise;
  const base = 'https://esm.sh/three@0.160.0';
  _depsPromise = (async () => {
    THREE = await import(/* @vite-ignore */base);
    ({
      OrbitControls
    } = await import(/* @vite-ignore */base + '/examples/jsm/controls/OrbitControls.js'));
    ({
      RoomEnvironment
    } = await import(/* @vite-ignore */base + '/examples/jsm/environments/RoomEnvironment.js'));
  })();
  return _depsPromise;
}
const CARDBOARD = 0xC49A5F;
const CARDBOARD_FLAP = 0xB9883F;
const EDGE = 0x7A5A23;
const PRODUCT = 0x5B9BE0;
const STAGE_BG = 0x0E1116;
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const sub = (t, a, b) => clamp((t - a) / (b - a), 0, 1);
const ease = x => x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;
class BoxViewer extends HTMLElement {
  connectedCallback() {
    if (this._init) return;
    this._init = true;
    this.style.display = 'block';
    this.style.position = 'relative';
    if (!this.style.width) this.style.width = '100%';
    if (!this.style.height) this.style.height = '100%';
    this._fold = 1;
    this._foldTarget = null;
    this._showProduct = true;
    this._xray = false;
    this._keepOpen = false;
    this._result = null;

    // Three.js loads asynchronously; set up the scene once it's ready, then
    // paint whatever state was set in the meantime.
    ensureThree().then(() => {
      if (!this.isConnected) return;
      this._setupScene();
      this._buildOverlay();
      this._animate = this._animate.bind(this);
      this._raf = requestAnimationFrame(this._animate);
      this._ro = new ResizeObserver(() => this._resize());
      this._ro.observe(this);
      this._rebuild();
    });
  }
  disconnectedCallback() {
    cancelAnimationFrame(this._raf);
    if (this._ro) this._ro.disconnect();
    if (this._renderer) this._renderer.dispose();
  }
  _setupScene() {
    const w = this.clientWidth || 640;
    const h = this.clientHeight || 420;
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      preserveDrawingBuffer: true
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(w, h);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    renderer.domElement.style.display = 'block';
    this.appendChild(renderer.domElement);
    this._renderer = renderer;
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(STAGE_BG);
    this._scene = scene;
    const pmrem = new THREE.PMREMGenerator(renderer);
    scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    const cam = new THREE.PerspectiveCamera(45, w / h, 0.1, 100);
    cam.position.set(8.5, 6, 11);
    this._cam = cam;
    scene.add(new THREE.AmbientLight(0xffffff, 0.5));
    const key = new THREE.DirectionalLight(0xfff4e6, 2.1);
    key.position.set(6, 11, 6);
    key.castShadow = true;
    key.shadow.mapSize.set(2048, 2048);
    key.shadow.camera.near = 1;
    key.shadow.camera.far = 40;
    key.shadow.camera.left = -10;
    key.shadow.camera.right = 10;
    key.shadow.camera.top = 10;
    key.shadow.camera.bottom = -10;
    key.shadow.bias = -0.0004;
    scene.add(key);
    const fill = new THREE.DirectionalLight(0x9fb4d6, 0.4);
    fill.position.set(-7, 4, -5);
    scene.add(fill);
    const ground = new THREE.Mesh(new THREE.PlaneGeometry(40, 40), new THREE.ShadowMaterial({
      opacity: 0.42
    }));
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -3.001;
    ground.receiveShadow = true;
    scene.add(ground);
    const grid = new THREE.GridHelper(24, 24, 0x2b3542, 0x18202a);
    grid.position.y = -3;
    grid.material.transparent = true;
    grid.material.opacity = 0.5;
    scene.add(grid);
    const controls = new OrbitControls(cam, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.minDistance = 4;
    controls.maxDistance = 26;
    controls.maxPolarAngle = Math.PI * 0.92;
    controls.target.set(0, 0, 0);
    this._controls = controls;
    this._boxGroup = new THREE.Group();
    scene.add(this._boxGroup);
    this.addEventListener('pointerenter', () => {
      if (!this._keepOpen) this._foldTarget = 0.6;
    });
    this.addEventListener('pointerleave', () => {
      if (!this._keepOpen) this._foldTarget = 1;
    });
  }
  _buildOverlay() {
    const o = document.createElement('div');
    o.style.cssText = 'position:absolute;inset:0;pointer-events:none;overflow:hidden;';
    this.appendChild(o);
    this._overlay = o;
    this._dimEls = {};
    [['L', 'largo'], ['W', 'ancho'], ['H', 'alto']].forEach(([k]) => {
      const el = document.createElement('div');
      el.style.cssText = "position:absolute;transform:translate(-50%,-50%);font-family:'Geist Mono',ui-monospace,monospace;" + 'font-size:11px;font-weight:500;letter-spacing:-0.01em;color:#E9EBEF;background:rgba(14,17,22,0.82);' + 'border:1px solid rgba(255,255,255,0.14);border-radius:5px;padding:2px 7px;white-space:nowrap;' + 'backdrop-filter:blur(4px);display:none;';
      o.appendChild(el);
      this._dimEls[k] = el;
    });
  }

  // ---- public API ----
  setResult(result) {
    this._result = result;
    this._rebuild();
  }
  setMode(opts = {}) {
    const {
      fold,
      showProduct,
      xray,
      keepOpen
    } = opts;
    if (typeof fold === 'number') {
      this._fold = fold;
      this._foldTarget = null;
    }
    if (typeof showProduct === 'boolean') this._showProduct = showProduct;
    if (typeof xray === 'boolean') this._xray = xray;
    if (typeof keepOpen === 'boolean') this._keepOpen = keepOpen;
    this._rebuild();
  }
  open() {
    this._keepOpen = true;
    this._foldTarget = 0.55;
  }
  close() {
    this._keepOpen = false;
    this._foldTarget = 1;
  }
  toggleOpen() {
    this._fold > 0.8 ? this.open() : this.close();
  }
  resetView() {
    if (!this._cam) return;
    this._cam.position.set(8.5, 6, 11);
    this._controls.target.set(0, 0, 0);
  }
  _panel(parent, size, color, opacity) {
    const transparent = opacity < 1;
    const mat = new THREE.MeshStandardMaterial({
      color,
      roughness: 0.82,
      metalness: 0,
      side: THREE.DoubleSide,
      transparent,
      opacity,
      depthWrite: !transparent
    });
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(size[0], size[1], size[2]), mat);
    mesh.castShadow = !transparent;
    mesh.receiveShadow = true;
    const edges = new THREE.LineSegments(new THREE.EdgesGeometry(mesh.geometry, 15), new THREE.LineBasicMaterial({
      color: EDGE,
      transparent: true,
      opacity: transparent ? 0.4 : 0.85
    }));
    mesh.add(edges);
    parent.add(mesh);
    return mesh;
  }
  _rebuild() {
    const g = this._boxGroup;
    if (!g) return;
    while (g.children.length) {
      const c = g.children.pop();
      c.traverse && c.traverse(o => {
        o.geometry && o.geometry.dispose();
        o.material && o.material.dispose && o.material.dispose();
      });
      g.remove(c);
    }
    const r = this._result;
    if (!r) return;
    const L = r.outer.x,
      H = r.outer.y,
      W = r.outer.z;
    const tt = Math.max(0.8, (r.outer.y - r.inner.y) / 2) || 1;
    const scale = 6 / Math.max(L, W, H);
    this._scale = scale;
    this._dims = {
      L,
      H,
      W
    };
    const wallF = ease(sub(this._fold, 0.05, 0.65));
    const flapF = ease(sub(this._fold, 0.68, 1.0));
    const wallOpacity = this._xray ? 0.16 : 1;
    const wallAngle = wallF * (Math.PI / 2);
    const flapAngle = flapF * (Math.PI / 2);
    g.scale.setScalar(scale);
    g.position.set(0, -H / 2 * scale, 0);

    // base
    const base = new THREE.Group();
    base.position.set(0, tt / 2, 0);
    this._panel(base, [L, tt, W], CARDBOARD, wallOpacity);
    g.add(base);

    // +X wall + top flap
    const wpx = new THREE.Group();
    wpx.position.set(L / 2, 0, 0);
    wpx.rotation.z = wallAngle;
    const wpxIn = new THREE.Group();
    wpxIn.position.set(H / 2, 0, 0);
    this._panel(wpxIn, [H, tt, W], CARDBOARD, wallOpacity);
    wpx.add(wpxIn);
    const fpx = new THREE.Group();
    fpx.position.set(H, 0, 0);
    fpx.rotation.z = flapAngle;
    const fpxIn = new THREE.Group();
    fpxIn.position.set(L / 4, 0, 0);
    this._panel(fpxIn, [L / 2, tt, W], CARDBOARD_FLAP, wallOpacity);
    fpx.add(fpxIn);
    wpx.add(fpx);
    g.add(wpx);

    // -X wall + top flap
    const wnx = new THREE.Group();
    wnx.position.set(-L / 2, 0, 0);
    wnx.rotation.z = -wallAngle;
    const wnxIn = new THREE.Group();
    wnxIn.position.set(-H / 2, 0, 0);
    this._panel(wnxIn, [H, tt, W], CARDBOARD, wallOpacity);
    wnx.add(wnxIn);
    const fnx = new THREE.Group();
    fnx.position.set(-H, 0, 0);
    fnx.rotation.z = -flapAngle;
    const fnxIn = new THREE.Group();
    fnxIn.position.set(-L / 4, 0, 0);
    this._panel(fnxIn, [L / 2, tt, W], CARDBOARD_FLAP, wallOpacity);
    fnx.add(fnxIn);
    wnx.add(fnx);
    g.add(wnx);

    // +Z / -Z walls
    const wpz = new THREE.Group();
    wpz.position.set(0, 0, W / 2);
    wpz.rotation.x = -wallAngle;
    const wpzIn = new THREE.Group();
    wpzIn.position.set(0, 0, H / 2);
    this._panel(wpzIn, [L, tt, H], CARDBOARD, wallOpacity);
    wpz.add(wpzIn);
    g.add(wpz);
    const wnz = new THREE.Group();
    wnz.position.set(0, 0, -W / 2);
    wnz.rotation.x = wallAngle;
    const wnzIn = new THREE.Group();
    wnzIn.position.set(0, 0, -H / 2);
    this._panel(wnzIn, [L, tt, H], CARDBOARD, wallOpacity);
    wnz.add(wnzIn);
    g.add(wnz);

    // product fill (instanced)
    if (this._showProduct) {
      const {
        nx,
        ny,
        nz
      } = r.grid;
      const {
        x: cx,
        y: cy,
        z: cz
      } = r.cell;
      const cap = nx * ny * nz;
      const fillCount = Math.min(r.unitsPerBox, cap, 400);
      const blockX = nx * cx,
        blockZ = nz * cz;
      const startX = -blockX / 2 + cx / 2;
      const startZ = -blockZ / 2 + cz / 2;
      const startY = tt / 2 + cy / 2;
      const pOpacity = this._xray ? 0.96 : 1;
      const geo = new THREE.BoxGeometry(cx * 0.96, cy * 0.96, cz * 0.96);
      const mat = new THREE.MeshStandardMaterial({
        color: PRODUCT,
        roughness: 0.4,
        metalness: 0.02,
        transparent: pOpacity < 1,
        opacity: pOpacity
      });
      const inst = new THREE.InstancedMesh(geo, mat, Math.max(1, fillCount));
      inst.castShadow = true;
      const m = new THREE.Matrix4();
      let n = 0;
      for (let iy = 0; iy < ny && n < fillCount; iy++) for (let ix = 0; ix < nx && n < fillCount; ix++) for (let iz = 0; iz < nz && n < fillCount; iz++) {
        m.makeTranslation(startX + ix * cx, startY + iy * cy, startZ + iz * cz);
        inst.setMatrixAt(n++, m);
      }
      inst.count = n;
      g.add(inst);
    }
  }
  _project(v) {
    const p = v.clone().project(this._cam);
    return {
      x: (p.x * 0.5 + 0.5) * this.clientWidth,
      y: (-p.y * 0.5 + 0.5) * this.clientHeight,
      visible: p.z < 1
    };
  }
  _updateDims() {
    const show = this.getAttribute('dims') === 'true' && this._dims && this._fold > 0.9;
    const keys = ['L', 'W', 'H'];
    if (!show) {
      keys.forEach(k => this._dimEls[k].style.display = 'none');
      return;
    }
    const {
      L,
      H,
      W
    } = this._dims;
    const s = this._scale;
    const half = {
      x: L / 2 * s,
      y: H / 2 * s,
      z: W / 2 * s
    };
    const anchors = {
      L: new THREE.Vector3(0, -half.y, half.z + 0.45),
      W: new THREE.Vector3(half.x + 0.45, -half.y, 0),
      H: new THREE.Vector3(half.x + 0.4, 0, half.z + 0.4)
    };
    const labels = {
      L: `L ${Math.round(L)} mm`,
      W: `An ${Math.round(W)} mm`,
      H: `Al ${Math.round(H)} mm`
    };
    keys.forEach(k => {
      const sc = this._project(anchors[k]);
      const el = this._dimEls[k];
      if (!sc.visible) {
        el.style.display = 'none';
        return;
      }
      el.textContent = labels[k];
      el.style.display = 'block';
      el.style.left = sc.x + 'px';
      el.style.top = sc.y + 'px';
    });
  }
  _resize() {
    if (!this._renderer) return;
    const w = this.clientWidth,
      h = this.clientHeight;
    if (!w || !h) return;
    this._renderer.setSize(w, h);
    this._cam.aspect = w / h;
    this._cam.updateProjectionMatrix();
  }
  _animate() {
    this._raf = requestAnimationFrame(this._animate);
    if (this._foldTarget !== null) {
      const d = this._foldTarget - this._fold;
      if (Math.abs(d) < 0.002) {
        this._fold = this._foldTarget;
        this._foldTarget = null;
      } else this._fold += d * 0.12;
      this._rebuild();
    }
    this._controls.update();
    this._renderer.render(this._scene, this._cam);
    this._updateDims();
  }
}
if (!customElements.get('box-viewer')) customElements.define('box-viewer', BoxViewer);
Object.assign(__ds_scope, { BoxViewer });
})(); } catch (e) { __ds_ns.__errors.push({ path: "viewer/box-viewer.js", error: String((e && e.message) || e) }); }

// viewer/packing.js
try { (() => {
// BoxForge — packing calculation (grid packing for an RSC box).
// Plain-JS port of the reference TypeScript. All lengths in mm, weights in g.
// Exposes window.BoxForgePacking.computePacking(product, constraints).
//
// product:     { length, width, height, weight }
// constraints: { quantity, clearance, thickness, maxBoxWeight }  (maxBoxWeight 0 = no limit)
//
// returns: { grid:{nx,ny,nz}, cell:{x,y,z}, inner:{x,y,z}, outer:{x,y,z},
//            unitsPerBox, capacity, boxesNeeded, boxWeight, fillRate, limitedByWeight }

(function (root) {
  function clamp(v, lo, hi) {
    return Math.min(hi, Math.max(lo, v));
  }

  // The 6 possible orientations of a rectangular product.
  function orientations(p) {
    const {
      length: l,
      width: w,
      height: h
    } = p;
    return [[l, w, h], [l, h, w], [w, l, h], [w, h, l], [h, l, w], [h, w, l]];
  }

  // For a target capacity, find the grid (nx,ny,nz) whose product >= target
  // and which minimises exterior volume (lightly favouring cubic = sturdier).
  function bestGridForOrientation(dims, target, c) {
    const [cx, cy, cz] = dims;
    let best = null;
    const cap = Math.max(1, target);
    for (let nx = 1; nx <= cap; nx++) {
      for (let ny = 1; ny <= Math.ceil(cap / nx); ny++) {
        const nz = Math.ceil(cap / (nx * ny));
        const capacity = nx * ny * nz;
        if (capacity < cap) continue;
        const inner = {
          x: nx * cx + c.clearance,
          y: ny * cy + c.clearance,
          z: nz * cz + c.clearance
        };
        const outer = {
          x: inner.x + 2 * c.thickness,
          y: inner.y + 2 * c.thickness,
          z: inner.z + 2 * c.thickness
        };
        const volume = outer.x * outer.y * outer.z;
        const maxd = Math.max(outer.x, outer.y, outer.z);
        const mind = Math.min(outer.x, outer.y, outer.z);
        const cubeness = maxd / mind;
        const score = volume * (1 + 0.04 * (cubeness - 1));
        if (!best || score < best.volume) {
          best = {
            result: {
              grid: {
                nx,
                ny,
                nz
              },
              cell: {
                x: cx,
                y: cy,
                z: cz
              },
              inner,
              outer,
              unitsPerBox: cap,
              capacity,
              boxesNeeded: 1,
              boxWeight: 0,
              fillRate: 0,
              limitedByWeight: false
            },
            volume: score
          };
        }
      }
    }
    return best;
  }
  function computePacking(p, c) {
    const totalQty = Math.max(1, Math.floor(c.quantity));
    let capacityByWeight = Infinity;
    let limitedByWeight = false;
    if (c.maxBoxWeight > 0 && p.weight > 0) {
      capacityByWeight = Math.max(1, Math.floor(c.maxBoxWeight / p.weight));
      if (capacityByWeight < totalQty) limitedByWeight = true;
    }
    const unitsPerBox = Math.min(totalQty, capacityByWeight);
    let best = null;
    for (const dims of orientations(p)) {
      const candidate = bestGridForOrientation(dims, unitsPerBox, c);
      if (candidate && (!best || candidate.volume < best.volume)) best = candidate;
    }
    const result = best.result;
    result.unitsPerBox = unitsPerBox;
    result.limitedByWeight = limitedByWeight;
    result.boxesNeeded = Math.ceil(totalQty / unitsPerBox);
    result.boxWeight = unitsPerBox * p.weight;
    const productVolume = p.length * p.width * p.height * unitsPerBox;
    const innerVolume = result.inner.x * result.inner.y * result.inner.z;
    result.fillRate = innerVolume > 0 ? productVolume / innerVolume * 100 : 0;
    return result;
  }

  // Cardboard surface area (m²) of the RSC blank — used for the budget.
  // Approx. an RSC: 2*(L*W) base+top flaps + 2*(L+W)*H walls, plus glue lap.
  function blankAreaM2(result) {
    const L = result.outer.x,
      W = result.outer.z,
      H = result.outer.y;
    const mm2 = 2 * (L * W) + 2 * (L + W) * H + L * H * 0.15;
    return mm2 / 1e6;
  }
  const api = {
    computePacking,
    blankAreaM2,
    clamp
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  root.BoxForgePacking = api;
})(typeof window !== 'undefined' ? window : this);
})(); } catch (e) { __ds_ns.__errors.push({ path: "viewer/packing.js", error: String((e && e.message) || e) }); }

__ds_ns.Button = __ds_scope.Button;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.MetricStat = __ds_scope.MetricStat;

__ds_ns.OptionCard = __ds_scope.OptionCard;

__ds_ns.ProgressRing = __ds_scope.ProgressRing;

__ds_ns.Tooltip = __ds_scope.Tooltip;

__ds_ns.InputField = __ds_scope.InputField;

__ds_ns.SegmentedControl = __ds_scope.SegmentedControl;

__ds_ns.SliderField = __ds_scope.SliderField;

__ds_ns.BoxViewer = __ds_scope.BoxViewer;

})();
