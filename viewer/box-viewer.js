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
    THREE = await import(/* @vite-ignore */ base);
    ({ OrbitControls } = await import(/* @vite-ignore */ base + '/examples/jsm/controls/OrbitControls.js'));
    ({ RoomEnvironment } = await import(/* @vite-ignore */ base + '/examples/jsm/environments/RoomEnvironment.js'));
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
const ease = (x) => (x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2);

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

    const renderer = new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: true });
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
    key.shadow.camera.near = 1; key.shadow.camera.far = 40;
    key.shadow.camera.left = -10; key.shadow.camera.right = 10;
    key.shadow.camera.top = 10; key.shadow.camera.bottom = -10;
    key.shadow.bias = -0.0004;
    scene.add(key);
    const fill = new THREE.DirectionalLight(0x9fb4d6, 0.4);
    fill.position.set(-7, 4, -5);
    scene.add(fill);

    const ground = new THREE.Mesh(
      new THREE.PlaneGeometry(40, 40),
      new THREE.ShadowMaterial({ opacity: 0.42 })
    );
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

    this.addEventListener('pointerenter', () => { if (!this._keepOpen) this._foldTarget = 0.6; });
    this.addEventListener('pointerleave', () => { if (!this._keepOpen) this._foldTarget = 1; });
  }

  _buildOverlay() {
    const o = document.createElement('div');
    o.style.cssText = 'position:absolute;inset:0;pointer-events:none;overflow:hidden;';
    this.appendChild(o);
    this._overlay = o;
    this._dimEls = {};
    [['L', 'largo'], ['W', 'ancho'], ['H', 'alto']].forEach(([k]) => {
      const el = document.createElement('div');
      el.style.cssText = "position:absolute;transform:translate(-50%,-50%);font-family:'Geist Mono',ui-monospace,monospace;" +
        'font-size:11px;font-weight:500;letter-spacing:-0.01em;color:#E9EBEF;background:rgba(14,17,22,0.82);' +
        'border:1px solid rgba(255,255,255,0.14);border-radius:5px;padding:2px 7px;white-space:nowrap;' +
        'backdrop-filter:blur(4px);display:none;';
      o.appendChild(el);
      this._dimEls[k] = el;
    });
  }

  // ---- public API ----
  setResult(result) { this._result = result; this._rebuild(); }
  setMode(opts = {}) {
    const { fold, showProduct, xray, keepOpen } = opts;
    if (typeof fold === 'number') { this._fold = fold; this._foldTarget = null; }
    if (typeof showProduct === 'boolean') this._showProduct = showProduct;
    if (typeof xray === 'boolean') this._xray = xray;
    if (typeof keepOpen === 'boolean') this._keepOpen = keepOpen;
    this._rebuild();
  }
  open() { this._keepOpen = true; this._foldTarget = 0.55; }
  close() { this._keepOpen = false; this._foldTarget = 1; }
  toggleOpen() { (this._fold > 0.8 ? this.open() : this.close()); }
  resetView() { if (!this._cam) return; this._cam.position.set(8.5, 6, 11); this._controls.target.set(0, 0, 0); }

  _panel(parent, size, color, opacity) {
    const transparent = opacity < 1;
    const mat = new THREE.MeshStandardMaterial({
      color, roughness: 0.82, metalness: 0, side: THREE.DoubleSide,
      transparent, opacity, depthWrite: !transparent,
    });
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(size[0], size[1], size[2]), mat);
    mesh.castShadow = !transparent;
    mesh.receiveShadow = true;
    const edges = new THREE.LineSegments(
      new THREE.EdgesGeometry(mesh.geometry, 15),
      new THREE.LineBasicMaterial({ color: EDGE, transparent: true, opacity: transparent ? 0.4 : 0.85 })
    );
    mesh.add(edges);
    parent.add(mesh);
    return mesh;
  }

  _rebuild() {
    const g = this._boxGroup;
    if (!g) return;
    while (g.children.length) {
      const c = g.children.pop();
      c.traverse && c.traverse((o) => { o.geometry && o.geometry.dispose(); o.material && o.material.dispose && o.material.dispose(); });
      g.remove(c);
    }
    const r = this._result;
    if (!r) return;

    const L = r.outer.x, H = r.outer.y, W = r.outer.z;
    const tt = Math.max(0.8, (r.outer.y - r.inner.y) / 2) || 1;
    const scale = 6 / Math.max(L, W, H);
    this._scale = scale;
    this._dims = { L, H, W };

    const wallF = ease(sub(this._fold, 0.05, 0.65));
    const flapF = ease(sub(this._fold, 0.68, 1.0));
    const wallOpacity = this._xray ? 0.16 : 1;
    const wallAngle = wallF * (Math.PI / 2);
    const flapAngle = flapF * (Math.PI / 2);

    g.scale.setScalar(scale);
    g.position.set(0, (-H / 2) * scale, 0);

    // base
    const base = new THREE.Group(); base.position.set(0, tt / 2, 0);
    this._panel(base, [L, tt, W], CARDBOARD, wallOpacity); g.add(base);

    // +X wall + top flap
    const wpx = new THREE.Group(); wpx.position.set(L / 2, 0, 0); wpx.rotation.z = wallAngle;
    const wpxIn = new THREE.Group(); wpxIn.position.set(H / 2, 0, 0);
    this._panel(wpxIn, [H, tt, W], CARDBOARD, wallOpacity); wpx.add(wpxIn);
    const fpx = new THREE.Group(); fpx.position.set(H, 0, 0); fpx.rotation.z = flapAngle;
    const fpxIn = new THREE.Group(); fpxIn.position.set(L / 4, 0, 0);
    this._panel(fpxIn, [L / 2, tt, W], CARDBOARD_FLAP, wallOpacity); fpx.add(fpxIn); wpx.add(fpx);
    g.add(wpx);

    // -X wall + top flap
    const wnx = new THREE.Group(); wnx.position.set(-L / 2, 0, 0); wnx.rotation.z = -wallAngle;
    const wnxIn = new THREE.Group(); wnxIn.position.set(-H / 2, 0, 0);
    this._panel(wnxIn, [H, tt, W], CARDBOARD, wallOpacity); wnx.add(wnxIn);
    const fnx = new THREE.Group(); fnx.position.set(-H, 0, 0); fnx.rotation.z = -flapAngle;
    const fnxIn = new THREE.Group(); fnxIn.position.set(-L / 4, 0, 0);
    this._panel(fnxIn, [L / 2, tt, W], CARDBOARD_FLAP, wallOpacity); fnx.add(fnxIn); wnx.add(fnx);
    g.add(wnx);

    // +Z / -Z walls
    const wpz = new THREE.Group(); wpz.position.set(0, 0, W / 2); wpz.rotation.x = -wallAngle;
    const wpzIn = new THREE.Group(); wpzIn.position.set(0, 0, H / 2);
    this._panel(wpzIn, [L, tt, H], CARDBOARD, wallOpacity); wpz.add(wpzIn); g.add(wpz);

    const wnz = new THREE.Group(); wnz.position.set(0, 0, -W / 2); wnz.rotation.x = wallAngle;
    const wnzIn = new THREE.Group(); wnzIn.position.set(0, 0, -H / 2);
    this._panel(wnzIn, [L, tt, H], CARDBOARD, wallOpacity); wnz.add(wnzIn); g.add(wnz);

    // product fill (instanced)
    if (this._showProduct) {
      const { nx, ny, nz } = r.grid;
      const { x: cx, y: cy, z: cz } = r.cell;
      const cap = nx * ny * nz;
      const fillCount = Math.min(r.unitsPerBox, cap, 400);
      const blockX = nx * cx, blockZ = nz * cz;
      const startX = -blockX / 2 + cx / 2;
      const startZ = -blockZ / 2 + cz / 2;
      const startY = tt / 2 + cy / 2;
      const pOpacity = this._xray ? 0.96 : 1;
      const geo = new THREE.BoxGeometry(cx * 0.96, cy * 0.96, cz * 0.96);
      const mat = new THREE.MeshStandardMaterial({ color: PRODUCT, roughness: 0.4, metalness: 0.02, transparent: pOpacity < 1, opacity: pOpacity });
      const inst = new THREE.InstancedMesh(geo, mat, Math.max(1, fillCount));
      inst.castShadow = true;
      const m = new THREE.Matrix4();
      let n = 0;
      for (let iy = 0; iy < ny && n < fillCount; iy++)
        for (let ix = 0; ix < nx && n < fillCount; ix++)
          for (let iz = 0; iz < nz && n < fillCount; iz++) {
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
      visible: p.z < 1,
    };
  }

  _updateDims() {
    const show = this.getAttribute('dims') === 'true' && this._dims && this._fold > 0.9;
    const keys = ['L', 'W', 'H'];
    if (!show) { keys.forEach((k) => (this._dimEls[k].style.display = 'none')); return; }
    const { L, H, W } = this._dims;
    const s = this._scale;
    const half = { x: (L / 2) * s, y: (H / 2) * s, z: (W / 2) * s };
    const anchors = {
      L: new THREE.Vector3(0, -half.y, half.z + 0.45),
      W: new THREE.Vector3(half.x + 0.45, -half.y, 0),
      H: new THREE.Vector3(half.x + 0.4, 0, half.z + 0.4),
    };
    const labels = {
      L: `L ${Math.round(L)} mm`,
      W: `An ${Math.round(W)} mm`,
      H: `Al ${Math.round(H)} mm`,
    };
    keys.forEach((k) => {
      const sc = this._project(anchors[k]);
      const el = this._dimEls[k];
      if (!sc.visible) { el.style.display = 'none'; return; }
      el.textContent = labels[k];
      el.style.display = 'block';
      el.style.left = sc.x + 'px';
      el.style.top = sc.y + 'px';
    });
  }

  _resize() {
    if (!this._renderer) return;
    const w = this.clientWidth, h = this.clientHeight;
    if (!w || !h) return;
    this._renderer.setSize(w, h);
    this._cam.aspect = w / h;
    this._cam.updateProjectionMatrix();
  }

  _animate() {
    this._raf = requestAnimationFrame(this._animate);
    if (this._foldTarget !== null) {
      const d = this._foldTarget - this._fold;
      if (Math.abs(d) < 0.002) { this._fold = this._foldTarget; this._foldTarget = null; }
      else this._fold += d * 0.12;
      this._rebuild();
    }
    this._controls.update();
    this._renderer.render(this._scene, this._cam);
    this._updateDims();
  }
}

if (!customElements.get('box-viewer')) customElements.define('box-viewer', BoxViewer);
export { BoxViewer };
