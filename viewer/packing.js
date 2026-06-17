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
  function clamp(v, lo, hi) { return Math.min(hi, Math.max(lo, v)); }

  // The 6 possible orientations of a rectangular product.
  function orientations(p) {
    const { length: l, width: w, height: h } = p;
    return [
      [l, w, h], [l, h, w], [w, l, h],
      [w, h, l], [h, l, w], [h, w, l],
    ];
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
          z: nz * cz + c.clearance,
        };
        const outer = {
          x: inner.x + 2 * c.thickness,
          y: inner.y + 2 * c.thickness,
          z: inner.z + 2 * c.thickness,
        };
        const volume = outer.x * outer.y * outer.z;
        const maxd = Math.max(outer.x, outer.y, outer.z);
        const mind = Math.min(outer.x, outer.y, outer.z);
        const cubeness = maxd / mind;
        const score = volume * (1 + 0.04 * (cubeness - 1));

        if (!best || score < best.volume) {
          best = {
            result: {
              grid: { nx, ny, nz },
              cell: { x: cx, y: cy, z: cz },
              inner, outer,
              unitsPerBox: cap, capacity,
              boxesNeeded: 1, boxWeight: 0, fillRate: 0, limitedByWeight: false,
            },
            volume: score,
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
    result.fillRate = innerVolume > 0 ? (productVolume / innerVolume) * 100 : 0;

    return result;
  }

  // Cardboard surface area (m²) of the RSC blank — used for the budget.
  // Approx. an RSC: 2*(L*W) base+top flaps + 2*(L+W)*H walls, plus glue lap.
  function blankAreaM2(result) {
    const L = result.outer.x, W = result.outer.z, H = result.outer.y;
    const mm2 = 2 * (L * W) + 2 * (L + W) * H + L * H * 0.15;
    return mm2 / 1e6;
  }

  const api = { computePacking, blankAreaM2, clamp };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  root.BoxForgePacking = api;
})(typeof window !== 'undefined' ? window : this);
