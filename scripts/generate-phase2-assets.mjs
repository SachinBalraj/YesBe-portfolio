import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const out = {
  visuals: path.join(root, "public/images/visuals"),
  industries: path.join(root, "public/images/industries"),
  projects: path.join(root, "public/images/projects"),
  videos: path.join(root, "public/videos"),
};

for (const dir of Object.values(out)) fs.mkdirSync(dir, { recursive: true });

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1600, height: 1000 }, deviceScaleFactor: 1 });

await page.exposeFunction("__saveAsset", (relativePath, base64) => {
  const destination = path.join(root, relativePath);
  fs.mkdirSync(path.dirname(destination), { recursive: true });
  fs.writeFileSync(destination, Buffer.from(base64, "base64"));
  return fs.statSync(destination).size;
});

await page.exposeFunction("__log", (message) => {
  console.log(message);
});

await page.setContent("<!doctype html><html><body style='margin:0;background:#041022'></body></html>");

await page.evaluate(() => {
  const TAU = Math.PI * 2;

  const palettes = {
    intelligence: { a: "#7aa7ff", b: "#5eead4", c: "#9b8cff", bg1: "#071a3d", bg2: "#020713" },
    enterprise: { a: "#8fb6ff", b: "#60a5fa", c: "#38bdf8", bg1: "#06162f", bg2: "#020812" },
    web: { a: "#a5b4fc", b: "#67e8f9", c: "#818cf8", bg1: "#091a3b", bg2: "#030916" },
    cloud: { a: "#7dd3fc", b: "#818cf8", c: "#67e8f9", bg1: "#061a35", bg2: "#020a18" },
    transformation: { a: "#93c5fd", b: "#f0abfc", c: "#67e8f9", bg1: "#0a1634", bg2: "#030814" },
    product: { a: "#a7b8ff", b: "#7dd3fc", c: "#f0abfc", bg1: "#081733", bg2: "#020814" },
    company: { a: "#9dbcff", b: "#6ee7f9", c: "#a5b4fc", bg1: "#071a37", bg2: "#020812" },
    automation: { a: "#8ec5ff", b: "#5eead4", c: "#a5b4fc", bg1: "#071a35", bg2: "#020a16" },
    analytics: { a: "#8fb6ff", b: "#67e8f9", c: "#c4b5fd", bg1: "#081a38", bg2: "#020912" },
    integration: { a: "#9fc0ff", b: "#67e8f9", c: "#a7b8ff", bg1: "#071b3a", bg2: "#020813" },
    healthcare: { a: "#7dd3fc", b: "#5eead4", c: "#93c5fd", bg1: "#061b33", bg2: "#020b16" },
    education: { a: "#c4b5fd", b: "#7dd3fc", c: "#f0abfc", bg1: "#0a1735", bg2: "#030914" },
    retail: { a: "#f9a8d4", b: "#93c5fd", c: "#fcd34d", bg1: "#101a39", bg2: "#040914" },
    manufacturing: { a: "#86efac", b: "#67e8f9", c: "#93c5fd", bg1: "#061b2e", bg2: "#020a12" },
    logistics: { a: "#fdba74", b: "#7dd3fc", c: "#a5b4fc", bg1: "#0b1833", bg2: "#030914" },
    finance: { a: "#fde68a", b: "#93c5fd", c: "#5eead4", bg1: "#081a33", bg2: "#020a17" },
    "hero-film": { a: "#a8c3ff", b: "#6ee7f9", c: "#a5b4fc", bg1: "#071c3f", bg2: "#020611" },
    "systems-film": { a: "#7dd3fc", b: "#93c5fd", c: "#67e8f9", bg1: "#061a38", bg2: "#020813" },
  };

  const hexToRgb = (hex) => {
    const value = hex.replace("#", "");
    return [
      parseInt(value.slice(0, 2), 16),
      parseInt(value.slice(2, 4), 16),
      parseInt(value.slice(4, 6), 16),
    ];
  };

  const rgba = (hex, alpha) => {
    const [r, g, b] = hexToRgb(hex);
    return `rgba(${r},${g},${b},${alpha})`;
  };

  const mix = (a, b, t) => {
    const aa = hexToRgb(a);
    const bb = hexToRgb(b);
    return `rgb(${Math.round(aa[0] + (bb[0] - aa[0]) * t)},${Math.round(aa[1] + (bb[1] - aa[1]) * t)},${Math.round(aa[2] + (bb[2] - aa[2]) * t)})`;
  };

  const mulberry32 = (seed) => {
    let a = seed >>> 0;
    return () => {
      a += 0x6d2b79f5;
      let t = a;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  };

  let ctx = null;
  let W = 1600;
  let H = 1000;
  let cam = null;
  let palette = palettes.company;
  let time = 0;

  const P = (x, y, z) => {
    const cyaw = Math.cos(cam.yaw);
    const syaw = Math.sin(cam.yaw);
    const cp = Math.cos(cam.pitch);
    const sp = Math.sin(cam.pitch);
    const x1 = x * cyaw - z * syaw;
    const z1 = x * syaw + z * cyaw;
    const y1 = y * cp - z1 * sp;
    const z2 = y * sp + z1 * cp;
    const depth = cam.dist + z2;
    const scale = (cam.scale * cam.zoom * cam.dist) / Math.max(320, depth);
    return {
      x: W / 2 + x1 * scale + cam.offsetX,
      y: H / 2 - y1 * scale + cam.offsetY,
      z: depth,
      s: scale,
    };
  };

  const line = (a, b, color, width = 1, alpha = 1) => {
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.beginPath();
    ctx.moveTo(a.x, a.y);
    ctx.lineTo(b.x, b.y);
    ctx.stroke();
    ctx.restore();
  };

  const polygon = (points, fill, stroke, lineWidth = 1) => {
    if (!points.length) return;
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length; i += 1) ctx.lineTo(points[i].x, points[i].y);
    ctx.closePath();
    if (fill) {
      ctx.fillStyle = fill;
      ctx.fill();
    }
    if (stroke) {
      ctx.strokeStyle = stroke;
      ctx.lineWidth = lineWidth;
      ctx.stroke();
    }
  };

  const faceFill = (points, colorA, colorB, alpha) => {
    const xs = points.map((point) => point.x);
    const ys = points.map((point) => point.y);
    const minX = Math.min(...xs);
    const maxX = Math.max(...xs);
    const minY = Math.min(...ys);
    const maxY = Math.max(...ys);
    const gradient = ctx.createLinearGradient(minX, minY, maxX, maxY);
    gradient.addColorStop(0, rgba(colorA, alpha));
    gradient.addColorStop(1, rgba(colorB, alpha * 0.45));
    return gradient;
  };

  const box = (options) => {
    const {
      x,
      y,
      z,
      w,
      h,
      d,
      top = palette.a,
      side = palette.c,
      edge = palette.a,
      topAlpha = 0.22,
      sideAlpha = 0.12,
      strokeAlpha = 0.32,
      glow = 0,
      grid = false,
    } = options;

    const corners = [];
    for (const yy of [y, y + h]) {
      for (const zz of [z, z + d]) {
        for (const xx of [x, x + w]) {
          corners.push(P(xx, yy, zz));
        }
      }
    }

    const idx = (xi, yi, zi) => yi * 4 + zi * 2 + xi;
    const faces = [];
    faces.push({ points: [corners[idx(0, 1, 0)], corners[idx(1, 1, 0)], corners[idx(1, 1, 1)], corners[idx(0, 1, 1)]], kind: "top" });
    faces.push({ points: [corners[idx(0, 0, 1)], corners[idx(1, 0, 1)], corners[idx(1, 1, 1)], corners[idx(0, 1, 1)]], kind: "front" });
    faces.push({ points: [corners[idx(0, 0, 0)], corners[idx(0, 1, 0)], corners[idx(0, 1, 1)], corners[idx(0, 0, 1)]], kind: "left" });
    faces.push({ points: [corners[idx(1, 0, 0)], corners[idx(1, 1, 0)], corners[idx(1, 1, 1)], corners[idx(1, 0, 1)]], kind: "right" });
    faces.push({ points: [corners[idx(0, 0, 0)], corners[idx(1, 0, 0)], corners[idx(1, 1, 0)], corners[idx(0, 1, 0)]], kind: "back" });

    for (const face of faces) {
      const avgZ = face.points.reduce((sum, point) => sum + point.z, 0) / face.points.length;
      face.avgZ = avgZ;
    }
    faces.sort((a, b) => b.avgZ - a.avgZ);

    ctx.save();
    if (glow > 0) {
      ctx.shadowColor = rgba(edge, glow);
      ctx.shadowBlur = 48;
    }
    for (const face of faces) {
      const fill = faceFill(face.points, top, side, face.kind === "top" ? topAlpha : sideAlpha);
      polygon(face.points, fill, rgba(edge, face.kind === "top" ? strokeAlpha + 0.1 : strokeAlpha), 1);
    }
    ctx.restore();

    if (grid) {
      ctx.save();
      ctx.globalAlpha = 0.18;
      ctx.strokeStyle = rgba(palette.b, 0.5);
      ctx.lineWidth = 1;
      const divisions = 6;
      for (let i = 1; i < divisions; i += 1) {
        const xx = x + (w * i) / divisions;
        line(P(xx, y + h + 0.002, z), P(xx, y + h + 0.002, z + d), rgba(palette.b, 0.4), 1, 0.5);
      }
      for (let i = 1; i < divisions; i += 1) {
        const zz = z + (d * i) / divisions;
        line(P(x, y + h + 0.002, zz), P(x + w, y + h + 0.002, zz), rgba(palette.b, 0.4), 1, 0.5);
      }
      ctx.restore();
    }
  };

  const node = (x, y, z, radius = 0.12, color = palette.a, alpha = 0.95) => {
    const point = P(x, y, z);
    const r = Math.max(2.2, radius * point.s * 1.35);
    const glow = ctx.createRadialGradient(point.x, point.y, 0, point.x, point.y, r * 5);
    glow.addColorStop(0, rgba(color, alpha));
    glow.addColorStop(0.25, rgba(color, alpha * 0.55));
    glow.addColorStop(1, rgba(color, 0));
    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(point.x, point.y, r * 5, 0, TAU);
    ctx.fill();
    ctx.fillStyle = rgba("#ffffff", 0.85);
    ctx.beginPath();
    ctx.arc(point.x, point.y, r * 0.5, 0, TAU);
    ctx.fill();
    ctx.strokeStyle = rgba(color, 0.8);
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(point.x, point.y, r * 1.4, 0, TAU);
    ctx.stroke();
  };

  const edge = (a, b, color = palette.a, alpha = 0.35, packets = true, width = 1.2) => {
    const pa = P(a[0], a[1], a[2]);
    const pb = P(b[0], b[1], b[2]);
    const gradient = ctx.createLinearGradient(pa.x, pa.y, pb.x, pb.y);
    gradient.addColorStop(0, rgba(color, alpha * 0.2));
    gradient.addColorStop(0.5, rgba(color, alpha));
    gradient.addColorStop(1, rgba(color, alpha * 0.2));
    ctx.save();
    ctx.strokeStyle = gradient;
    ctx.lineWidth = width;
    ctx.beginPath();
    ctx.moveTo(pa.x, pa.y);
    ctx.lineTo(pb.x, pb.y);
    ctx.stroke();
    ctx.restore();

    if (packets) {
      for (let i = 0; i < 2; i += 1) {
        const t = (time * 0.16 + i * 0.5 + Math.abs(a[0] + b[2]) * 0.15) % 1;
        const px = pa.x + (pb.x - pa.x) * t;
        const py = pa.y + (pb.y - pa.y) * t;
        const packet = ctx.createRadialGradient(px, py, 0, px, py, 10);
        packet.addColorStop(0, rgba("#ffffff", 0.95));
        packet.addColorStop(0.35, rgba(color, 0.8));
        packet.addColorStop(1, rgba(color, 0));
        ctx.fillStyle = packet;
        ctx.beginPath();
        ctx.arc(px, py, 10, 0, TAU);
        ctx.fill();
      }
    }
  };

  const floor = () => {
    ctx.save();
    ctx.strokeStyle = rgba(palette.b, 0.15);
    ctx.lineWidth = 1;
    for (let i = -14; i <= 14; i += 2) {
      line(P(i, -0.7, -10), P(i, -0.7, 10), rgba(palette.b, 0.13), 1, 0.8);
    }
    for (let i = -10; i <= 10; i += 2) {
      line(P(-14, -0.7, i), P(14, -0.7, i), rgba(palette.b, 0.13), 1, 0.8);
    }
    ctx.restore();
  };

  const background = () => {
    const bg = ctx.createLinearGradient(0, 0, W, H);
    bg.addColorStop(0, palette.bg1);
    bg.addColorStop(0.55, mix(palette.bg1, palette.bg2, 0.55));
    bg.addColorStop(1, palette.bg2);
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);

    const glowOne = ctx.createRadialGradient(W * 0.18, H * 0.1, 0, W * 0.18, H * 0.1, W * 0.62);
    glowOne.addColorStop(0, rgba(palette.a, 0.28));
    glowOne.addColorStop(0.45, rgba(palette.a, 0.08));
    glowOne.addColorStop(1, rgba(palette.a, 0));
    ctx.fillStyle = glowOne;
    ctx.fillRect(0, 0, W, H);

    const glowTwo = ctx.createRadialGradient(W * 0.86, H * 0.72, 0, W * 0.86, H * 0.72, W * 0.55);
    glowTwo.addColorStop(0, rgba(palette.b, 0.18));
    glowTwo.addColorStop(0.5, rgba(palette.b, 0.05));
    glowTwo.addColorStop(1, rgba(palette.b, 0));
    ctx.fillStyle = glowTwo;
    ctx.fillRect(0, 0, W, H);

    const topLight = ctx.createLinearGradient(0, 0, 0, H * 0.55);
    topLight.addColorStop(0, "rgba(255,255,255,0.055)");
    topLight.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = topLight;
    ctx.fillRect(0, 0, W, H);
  };

  const floatingPanels = () => {
    ctx.save();
    const rand = mulberry32(17);
    for (let i = 0; i < 5; i += 1) {
      const x = W * (0.08 + rand() * 0.84);
      const y = H * (0.08 + rand() * 0.8);
      const w = 90 + rand() * 180;
      const h = 34 + rand() * 80;
      const alpha = 0.035 + rand() * 0.05;
      const gradient = ctx.createLinearGradient(x, y, x + w, y + h);
      gradient.addColorStop(0, rgba("#ffffff", alpha * 1.4));
      gradient.addColorStop(1, rgba(palette.a, alpha * 0.3));
      ctx.fillStyle = gradient;
      ctx.strokeStyle = rgba(palette.a, alpha * 2);
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.roundRect(x, y, w, h, 6);
      ctx.fill();
      ctx.stroke();
    }
    ctx.restore();
  };

  const vignette = () => {
    const vignetteGradient = ctx.createRadialGradient(W / 2, H * 0.46, W * 0.12, W / 2, H * 0.5, W * 0.82);
    vignetteGradient.addColorStop(0, "rgba(0,0,0,0)");
    vignetteGradient.addColorStop(0.65, "rgba(0,5,18,0.08)");
    vignetteGradient.addColorStop(1, "rgba(0,3,12,0.62)");
    ctx.fillStyle = vignetteGradient;
    ctx.fillRect(0, 0, W, H);

    const rand = mulberry32(91);
    ctx.save();
    ctx.fillStyle = "rgba(255,255,255,0.035)";
    for (let i = 0; i < 700; i += 1) {
      ctx.fillRect(Math.floor(rand() * W), Math.floor(rand() * H), 1, 1);
    }
    ctx.restore();
  };

  const drawNetwork = (count, spread = 4) => {
    const rand = mulberry32(29);
    const nodes = [];
    for (let i = 0; i < count; i += 1) {
      const x = (rand() - 0.5) * spread * 2;
      const z = (rand() - 0.5) * spread;
      const y = 0.8 + rand() * 2.7;
      nodes.push([x, y, z]);
    }
    const sorted = nodes.slice().sort((a, b) => P(a[0], a[1], a[2]).z - P(b[0], b[1], b[2]).z);
    for (let i = 0; i < sorted.length; i += 1) {
      for (let j = i + 1; j < sorted.length; j += 1) {
        const distance = Math.hypot(sorted[i][0] - sorted[j][0], sorted[i][1] - sorted[j][1], sorted[i][2] - sorted[j][2]);
        if (distance < spread * 1.15) {
          edge(sorted[i], sorted[j], palette.a, 0.18);
        }
      }
    }
    for (const point of sorted) node(point[0], point[1], point[2], 0.1, palette.b, 0.95);
  };

  const sceneCompany = () => {
    box({ x: -7, y: -0.62, z: -5, w: 14, h: 0.52, d: 10, top: palette.a, side: palette.c, topAlpha: 0.1, sideAlpha: 0.07, strokeAlpha: 0.23, grid: true });
    const towers = [
      [-5.1, -2.8, 1.5, 1.5, 1.15],
      [-3.0, -1.4, 1.1, 1.1, 2.15],
      [-0.9, -3.0, 1.7, 1.5, 1.5],
      [1.7, -1.7, 1.25, 1.25, 2.8],
      [4.3, -2.6, 1.8, 1.2, 0.95],
      [-3.6, 1.4, 1.15, 1.15, 1.75],
      [0.4, 1.5, 1.9, 1.3, 2.35],
      [3.6, 1.1, 1.2, 1.2, 1.35],
    ];
    towers.sort((a, b) => P(a[0], 0, a[1]).z - P(b[0], 0, b[1]).z);
    for (const [x, z, w, d, h] of towers) {
      box({ x, y: 0, z, w, h, d, top: palette.a, side: palette.b, topAlpha: 0.2, sideAlpha: 0.1, glow: 0.25, grid: false });
    }
    const hubs = [
      [-3.8, 2.9, -0.5],
      [-1.5, 3.55, 0.7],
      [1.3, 3.2, -0.8],
      [3.6, 2.5, 0.4],
    ];
    for (let i = 0; i < hubs.length - 1; i += 1) edge(hubs[i], hubs[i + 1], palette.b, 0.45);
    for (const hub of hubs) node(hub[0], hub[1], hub[2], 0.15, palette.b, 0.95);
    edge([-1.5, 3.55, 0.7], [0.4, 2.4, 1.5], palette.a, 0.25);
    edge([1.3, 3.2, -0.8], [1.7, 2.8, -1.7], palette.a, 0.25);
  };

  const sceneIntelligence = () => {
    box({ x: -4.8, y: -0.6, z: -4.2, w: 9.6, h: 0.5, d: 8.4, top: palette.a, side: palette.c, topAlpha: 0.08, sideAlpha: 0.06, strokeAlpha: 0.2, grid: true });
    const blocks = [
      [-2.1, -1.5, 1.35, 1.35, 0.9],
      [-0.4, -1.9, 1.05, 1.05, 1.8],
      [1.5, -1.4, 1.6, 1.3, 1.1],
      [-1.7, 1.0, 1.25, 1.25, 1.45],
      [0.5, 1.2, 1.7, 1.4, 0.8],
      [2.1, 1.0, 1.0, 1.0, 1.7],
    ];
    for (const [x, z, w, d, h] of blocks) {
      box({ x, y: 0, z, w, h, d, top: palette.a, side: palette.b, topAlpha: 0.24, sideAlpha: 0.12, glow: 0.15 });
    }
    const centers = [
      [-1.45, 1.7, -0.8],
      [0.1, 2.6, -1.3],
      [2.3, 1.55, -0.5],
      [-0.9, 2.1, 1.6],
      [1.4, 2.25, 1.7],
    ];
    for (let i = 0; i < centers.length; i += 1) {
      for (let j = i + 1; j < centers.length; j += 1) {
        if (Math.hypot(centers[i][0] - centers[j][0], centers[i][2] - centers[j][2]) < 3.5) {
          edge(centers[i], centers[j], palette.a, 0.24);
        }
      }
    }
    for (const center of centers) node(center[0], center[1], center[2], 0.14, palette.b, 0.95);
    edge([-1.45, 1.7, -0.8], [-1.4, 0.9, -0.8], palette.b, 0.15, false);
    edge([2.3, 1.55, -0.5], [2.1, 1.7, 0.5], palette.b, 0.15, false);
  };

  const sceneEnterprise = () => {
    box({ x: -5.5, y: -0.62, z: -4.5, w: 11, h: 0.5, d: 9, top: palette.a, side: palette.c, topAlpha: 0.08, sideAlpha: 0.06, strokeAlpha: 0.2, grid: true });
    const positions = [
      [-3.6, -2.8], [-2.1, -2.8], [-0.6, -2.8], [0.9, -2.8], [2.4, -2.8],
      [-3.6, -1.4], [-2.1, -1.4], [-0.6, -1.4], [0.9, -1.4], [2.4, -1.4],
      [-3.6, 0], [-2.1, 0], [-0.6, 0], [0.9, 0], [2.4, 0],
      [-3.6, 1.4], [-2.1, 1.4], [-0.6, 1.4], [0.9, 1.4], [2.4, 1.4],
    ];
    for (let i = 0; i < positions.length; i += 1) {
      const [x, z] = positions[i];
      const center = Math.abs(x + 0.6) < 0.1 && Math.abs(z) < 0.1;
      box({
        x: x - 0.45,
        y: 0,
        z: z - 0.45,
        w: 0.9,
        h: center ? 2.2 : 0.45 + ((i * 7) % 5) * 0.12,
        d: 0.9,
        top: center ? palette.b : palette.a,
        side: palette.b,
        topAlpha: center ? 0.36 : 0.15,
        sideAlpha: 0.08,
        glow: center ? 0.6 : 0,
      });
    }
    const core = [-0.15, 2.5, 0];
    for (const [x, z] of positions) {
      if (Math.abs(x - core[0]) < 0.2 && Math.abs(z - core[2]) < 0.2) continue;
      edge(core, [x - 0.15, 0.55, z - 0.15], palette.a, 0.12, false, 0.8);
    }
    node(core[0], core[1], core[2], 0.18, palette.b, 0.95);
  };

  const sceneWeb = () => {
    box({ x: -5.2, y: -0.64, z: -4.6, w: 10.4, h: 0.52, d: 9.2, top: palette.a, side: palette.c, topAlpha: 0.08, sideAlpha: 0.06, strokeAlpha: 0.2, grid: true });
    const screens = [
      { x: -3.6, z: -2.6, w: 4.35, h: 2.75, alpha: 0.16 },
      { x: -1.3, z: 0.35, w: 4.7, h: 3.15, alpha: 0.2 },
      { x: 2.2, z: -1.1, w: 3.9, h: 2.45, alpha: 0.13 },
    ];
    screens.sort((a, b) => P(a.x, 0, a.z).z - P(b.x, 0, b.z).z);
    for (const screen of screens) {
      box({ x: screen.x, y: 0, z: screen.z, w: screen.w, h: screen.h, d: 0.12, top: palette.a, side: palette.b, topAlpha: screen.alpha, sideAlpha: 0.1, glow: 0.25 });
      const zFront = screen.z + 0.14;
      ctx.save();
      for (let i = 0; i < 5; i += 1) {
        const yy = 0.28 + i * (screen.h - 0.55) / 5;
        const x1 = screen.x + 0.32;
        const x2 = screen.x + screen.w * (i === 1 ? 0.45 : i === 4 ? 0.65 : 0.88);
        line(P(x1, yy, zFront), P(x2, yy, zFront), rgba(palette.b, 0.38), 1.4, 0.7);
      }
      ctx.restore();
      const topLeft = P(screen.x + 0.25, screen.h - 0.2, zFront);
      const topRight = P(screen.x + 1.4, screen.h - 0.2, zFront);
      line(topLeft, topRight, rgba(palette.a, 0.8), 2, 0.7);
    }
    const nodes = [
      [-1.2, 3.3, 1.0],
      [0.6, 2.8, 2.4],
      [2.5, 2.5, 1.3],
    ];
    for (let i = 0; i < nodes.length - 1; i += 1) edge(nodes[i], nodes[i + 1], palette.b, 0.4);
    for (const n of nodes) node(n[0], n[1], n[2], 0.12, palette.b, 0.9);
  };

  const sceneCloud = () => {
    box({ x: -5.6, y: -0.66, z: -4.8, w: 11.2, h: 0.5, d: 9.4, top: palette.a, side: palette.c, topAlpha: 0.06, sideAlpha: 0.05, strokeAlpha: 0.18, grid: true });
    const platforms = [
      { x: -4.0, y: 0.2, z: -1.8, w: 3.0, d: 2.2 },
      { x: 0.8, y: 1.3, z: -2.8, w: 3.4, d: 2.4 },
      { x: -1.2, y: 2.45, z: 0.6, w: 3.8, d: 2.4 },
      { x: 2.9, y: 0.9, z: 0.7, w: 2.3, d: 1.9 },
    ];
    platforms.sort((a, b) => P(a.x, a.y, a.z).z - P(b.x, b.y, b.z).z);
    for (const platform of platforms) {
      box({ x: platform.x, y: platform.y, z: platform.z, w: platform.w, h: 0.22, d: platform.d, top: palette.a, side: palette.b, topAlpha: 0.24, sideAlpha: 0.1, glow: 0.5 });
      const cx = platform.x + platform.w / 2;
      const cz = platform.z + platform.d / 2;
      node(cx, platform.y + 0.7, cz, 0.13, palette.b, 0.95);
      line(P(cx, platform.y, cz), P(cx, platform.y + 0.7, cz), rgba(palette.b, 0.55), 1.4, 0.6);
    }
    for (let i = 0; i < platforms.length - 1; i += 1) {
      const a = platforms[i];
      const b = platforms[i + 1];
      edge([a.x + a.w / 2, a.y + 0.7, a.z + a.d / 2], [b.x + b.w / 2, b.y + 0.7, b.z + b.d / 2], palette.b, 0.28);
    }
  };

  const sceneTransformation = () => {
    box({ x: -6.2, y: -0.66, z: -4.2, w: 12.4, h: 0.5, d: 8.4, top: palette.a, side: palette.c, topAlpha: 0.07, sideAlpha: 0.05, strokeAlpha: 0.18, grid: true });
    const left = [
      [-4.8, -2.2, 1.2, 1.2, 0.65],
      [-3.6, -0.8, 0.95, 0.95, 1.1],
      [-4.2, 0.9, 1.15, 1.15, 0.8],
      [-2.9, 1.5, 0.85, 0.85, 0.55],
    ];
    const right = [
      [1.1, -1.9, 1.7, 1.5, 0.85],
      [3.1, -1.1, 2.1, 1.8, 1.1],
      [1.6, 0.8, 1.45, 1.35, 0.7],
    ];
    for (const [x, z, w, d, h] of left.concat(right)) {
      box({ x, y: 0, z, w, h, d, top: palette.a, side: palette.b, topAlpha: 0.18, sideAlpha: 0.08, glow: 0.15 });
    }
    const path = [
      [-3.2, 1.9, -1.1],
      [-1.6, 1.7, -0.2],
      [0.0, 1.55, 0.5],
      [1.4, 1.75, -0.5],
      [2.9, 1.9, -0.2],
    ];
    for (let i = 0; i < path.length - 1; i += 1) edge(path[i], path[i + 1], palette.b, 0.6);
    for (const p of path) node(p[0], p[1], p[2], 0.1, palette.b, 0.85);
  };

  const sceneProduct = () => {
    box({ x: -5.2, y: -0.66, z: -4.4, w: 10.4, h: 0.5, d: 8.8, top: palette.a, side: palette.c, topAlpha: 0.07, sideAlpha: 0.05, strokeAlpha: 0.18, grid: true });
    const layers = [
      { y: 0.05, x: -2.7, z: -1.8, w: 5.4, d: 3.6, h: 0.32 },
      { y: 0.95, x: -2.1, z: -1.3, w: 4.4, d: 3.0, h: 0.3 },
      { y: 1.7, x: -1.4, z: -0.8, w: 3.4, d: 2.4, h: 0.28 },
      { y: 2.35, x: -0.7, z: -0.3, w: 2.4, d: 1.8, h: 0.26 },
    ];
    for (const layer of layers) {
      box({ ...layer, top: palette.a, side: palette.b, topAlpha: 0.28, sideAlpha: 0.12, glow: 0.25, grid: false });
    }
    const top = [0.5, 3.1, 0.6];
    node(top[0], top[1], top[2], 0.18, palette.b, 0.95);
    for (const layer of layers) {
      edge(top, [layer.x + layer.w / 2, layer.y + 0.2, layer.z + layer.d / 2], palette.a, 0.18, false, 0.8);
    }
  };

  const sceneAutomation = () => {
    box({ x: -5.4, y: -0.64, z: -4.4, w: 10.8, h: 0.5, d: 8.8, top: palette.a, side: palette.c, topAlpha: 0.08, sideAlpha: 0.06, strokeAlpha: 0.2, grid: true });
    const stations = [-4.1, -2.1, 0, 2.1, 4.1];
    for (let i = 0; i < stations.length; i += 1) {
      box({ x: stations[i] - 0.65, y: 0, z: -1.5, w: 1.3, h: 0.55 + (i % 3) * 0.18, d: 1.5, top: palette.a, side: palette.b, topAlpha: 0.2, sideAlpha: 0.09, glow: i === 2 ? 0.35 : 0 });
    }
    const route = stations.map((x, i) => [x, 1.05 + (i % 2) * 0.2, -1.5]);
    for (let i = 0; i < route.length - 1; i += 1) edge(route[i], route[i + 1], palette.b, 0.42);
    const branches = [
      [stations[1], 1.05, -1.5],
      [-2.8, 1.9, 1.2],
      [-1.4, 1.75, 1.6],
    ];
    for (let i = 0; i < branches.length - 1; i += 1) edge(branches[i], branches[i + 1], palette.a, 0.3);
    const returnPath = [
      [stations[3], 1.25, -1.5],
      [3.1, 1.95, 1.1],
      [1.6, 1.8, 1.7],
    ];
    for (let i = 0; i < returnPath.length - 1; i += 1) edge(returnPath[i], returnPath[i + 1], palette.c, 0.28);
    for (const point of [...route, ...branches.slice(1), ...returnPath.slice(1)]) node(point[0], point[1], point[2], 0.11, palette.b, 0.9);
  };

  const sceneAnalytics = () => {
    box({ x: -5.4, y: -0.64, z: -4.4, w: 10.8, h: 0.5, d: 8.8, top: palette.a, side: palette.c, topAlpha: 0.08, sideAlpha: 0.06, strokeAlpha: 0.2, grid: true });
    const bars = [-3.8, -2.5, -1.2, 0.1, 1.4, 2.7, 4.0];
    const heights = [0.85, 1.45, 1.1, 2.35, 1.85, 2.7, 2.1];
    for (let i = 0; i < bars.length; i += 1) {
      box({ x: bars[i] - 0.42, y: 0, z: -1.8, w: 0.84, h: heights[i], d: 0.9, top: i === 5 ? palette.b : palette.a, side: palette.b, topAlpha: 0.24, sideAlpha: 0.1, glow: i === 5 ? 0.45 : 0 });
    }
    const trend = [
      [-3.9, 1.6, -1.6],
      [-2.5, 2.15, -1.3],
      [-1.1, 1.85, -1.5],
      [0.2, 2.85, -1.1],
      [1.5, 2.4, -1.4],
      [2.8, 3.3, -0.9],
      [4.0, 2.85, -1.2],
    ];
    for (let i = 0; i < trend.length - 1; i += 1) edge(trend[i], trend[i + 1], palette.b, 0.5);
    for (const point of trend) node(point[0], point[1], point[2], 0.1, palette.b, 0.92);
    box({ x: -4.6, y: 1.2, z: 1.6, w: 9.2, h: 0.24, d: 0.65, top: palette.c, side: palette.c, topAlpha: 0.16, sideAlpha: 0.06, grid: false });
  };

  const sceneIntegration = () => {
    box({ x: -5.5, y: -0.64, z: -4.5, w: 11, h: 0.5, d: 9, top: palette.a, side: palette.c, topAlpha: 0.08, sideAlpha: 0.06, strokeAlpha: 0.2, grid: true });
    const islands = [
      [-3.9, -2.3, 1.4, 1.3, 1.2],
      [-1.8, 1.5, 1.25, 1.25, 1.85],
      [0.4, -1.8, 1.7, 1.4, 1.05],
      [2.6, 1.3, 1.3, 1.3, 2.2],
      [4.3, -2.1, 1.15, 1.15, 1.45],
    ];
    for (const [x, z, w, d, h] of islands) {
      box({ x, y: 0, z, w, h, d, top: palette.a, side: palette.b, topAlpha: 0.22, sideAlpha: 0.1, glow: h > 2 ? 0.35 : 0 });
    }
    const hub = [0.3, 3.2, 0.1];
    for (const [x, z, , , h] of islands) edge(hub, [x + 0.6, h + 0.25, z + 0.6], palette.b, 0.34);
    const ring = [
      [-4.2, 1.6, -0.4],
      [-2.2, 2.2, 0.9],
      [0.6, 2.5, 1.4],
      [3.2, 2.0, 0.6],
      [4.5, 1.5, -0.8],
    ];
    for (let i = 0; i < ring.length - 1; i += 1) edge(ring[i], ring[i + 1], palette.c, 0.28);
    node(hub[0], hub[1], hub[2], 0.19, palette.b, 0.98);
    for (const point of ring) node(point[0], point[1], point[2], 0.1, palette.a, 0.82);
  };

  const sceneIndustry = (kind) => {
    box({ x: -5.4, y: -0.64, z: -4.2, w: 10.8, h: 0.5, d: 8.4, top: palette.a, side: palette.c, topAlpha: 0.08, sideAlpha: 0.06, strokeAlpha: 0.2, grid: true });
    if (kind === "healthcare") {
      for (let i = 0; i < 3; i += 1) {
        for (let j = 0; j < 2; j += 1) {
          box({ x: -3.9 + i * 2.7, y: 0, z: -2.1 + j * 2.8, w: 1.4, h: 0.8 + ((i + j) % 3) * 0.4, d: 1.4, top: palette.a, side: palette.b, topAlpha: 0.18, sideAlpha: 0.08 });
        }
      }
      box({ x: -1.2, y: 1.1, z: -1.1, w: 2.4, h: 0.25, d: 0.7, top: palette.b, side: palette.b, topAlpha: 0.42, sideAlpha: 0.15, glow: 0.5 });
      box({ x: -0.55, y: 1.35, z: -1.7, w: 0.7, h: 0.25, d: 2.4, top: palette.b, side: palette.b, topAlpha: 0.42, sideAlpha: 0.15, glow: 0.5 });
    } else if (kind === "education") {
      for (let i = 0; i < 5; i += 1) {
        box({ x: -3.1 + i * 0.15, y: i * 0.28, z: -1.6 + i * 0.25, w: 5.4 - i * 0.4, h: 0.22, d: 3.1, top: i % 2 ? palette.a : palette.b, side: palette.a, topAlpha: 0.2, sideAlpha: 0.09, glow: i === 4 ? 0.5 : 0 });
      }
      node(0.1, 2.0, 0.2, 0.14, palette.b, 0.9);
    } else if (kind === "retail") {
      for (let i = 0; i < 4; i += 1) {
        for (let j = 0; j < 3; j += 1) {
          box({ x: -3.7 + i * 1.9, y: 0, z: -2.2 + j * 1.9, w: 1.0, h: 0.55 + ((i + j * 2) % 3) * 0.35, d: 1.0, top: palette.a, side: palette.b, topAlpha: 0.2, sideAlpha: 0.09 });
        }
      }
    } else if (kind === "manufacturing") {
      for (let i = 0; i < 4; i += 1) {
        box({ x: -3.9 + i * 2.2, y: 0, z: -1.8, w: 1.35, h: 0.7 + (i % 3) * 0.55, d: 3.5, top: palette.a, side: palette.b, topAlpha: 0.2, sideAlpha: 0.09 });
      }
      const path = [
        [-3.2, 1.0, -0.2],
        [-1.4, 1.45, 0.6],
        [0.9, 1.15, 0.2],
        [3.0, 1.7, -0.4],
      ];
      for (let i = 0; i < path.length - 1; i += 1) edge(path[i], path[i + 1], palette.b, 0.4);
    } else if (kind === "logistics") {
      const hubs = [
        [-3.7, 0.7, -2.2],
        [-1.9, 1.1, 1.5],
        [0.6, 0.8, -1.4],
        [3.1, 1.2, 0.9],
      ];
      for (let i = 0; i < hubs.length; i += 1) {
        box({ x: hubs[i][0] - 0.6, y: 0, z: hubs[i][2] - 0.6, w: 1.2, h: 0.5, d: 1.2, top: palette.a, side: palette.b, topAlpha: 0.2, sideAlpha: 0.09 });
        node(hubs[i][0], hubs[i][1], hubs[i][2], 0.12, palette.b, 0.9);
        if (i > 0) edge(hubs[i - 1], hubs[i], palette.b, 0.45);
      }
    } else {
      const heights = [0.55, 0.95, 1.35, 1.85, 2.4];
      for (let i = 0; i < heights.length; i += 1) {
        box({ x: -3.7 + i * 1.55, y: 0, z: -1.4, w: 1.05, h: heights[i], d: 2.8, top: palette.a, side: palette.b, topAlpha: 0.2 + i * 0.025, sideAlpha: 0.08, glow: i === 4 ? 0.45 : 0 });
      }
      const points = heights.map((height, i) => [-3.17 + i * 1.55, height + 0.25, 0.0]);
      for (let i = 0; i < points.length - 1; i += 1) edge(points[i], points[i + 1], palette.b, 0.45);
    }
  };

  const drawScene = (type, seconds, width, height, quality = 0.92) => {
    W = width;
    H = height;
    time = seconds;
    palette = palettes[type] || palettes.company;

    const canvas = document.createElement("canvas");
    canvas.width = W;
    canvas.height = H;
    ctx = canvas.getContext("2d");

    const wide = type === "hero-film" || type === "company";
    const yawBase = wide ? 0.56 : type === "web" ? 0.48 : 0.62;
    const yawMotion = type.includes("film") ? Math.sin(seconds * 0.38) * 0.1 : Math.sin(seconds * 0.1) * 0.022;
    cam = {
      yaw: yawBase + yawMotion,
      pitch: -0.48 + Math.sin(seconds * 0.22) * 0.012,
      zoom: wide ? 0.99 : 0.94,
      dist: 1400,
      scale: wide ? 87 : 82,
      offsetX: 0,
      offsetY: wide ? 56 : 44,
    };

    background();
    floatingPanels();
    floor();

    if (type === "intelligence") sceneIntelligence();
    else if (type === "enterprise") sceneEnterprise();
    else if (type === "web") sceneWeb();
    else if (type === "cloud" || type === "systems-film") sceneCloud();
    else if (type === "transformation") sceneTransformation();
    else if (type === "product") sceneProduct();
    else if (type === "automation") sceneAutomation();
    else if (type === "analytics") sceneAnalytics();
    else if (type === "integration") sceneIntegration();
    else if (type === "healthcare" || type === "education" || type === "retail" || type === "manufacturing" || type === "logistics" || type === "finance") sceneIndustry(type);
    else sceneCompany();

    if (type === "hero-film") {
      drawNetwork(9, 6.5);
    }

    if (type === "systems-film") {
      const lanes = [
        [-4.5, 0.7, -2.8],
        [-1.6, 1.5, -0.4],
        [1.4, 1.1, 1.6],
        [4.2, 2.1, -1.1],
      ];
      for (let i = 0; i < lanes.length - 1; i += 1) edge(lanes[i], lanes[i + 1], palette.b, 0.48);
      for (const lane of lanes) node(lane[0], lane[1], lane[2], 0.12, palette.a, 0.9);
    }

    vignette();
    return canvas.toDataURL("image/webp", quality);
  };

  window.__drawAsset = (type, width = 1600, height = 1000, quality = 0.92) =>
    drawScene(type, 0.35, width, height, quality);

  window.__recordFilms = async () => {
    const record = async (type, durationMs, bitrate) => {
      const width = 1280;
      const height = 720;
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const context = canvas.getContext("2d");
      const stream = canvas.captureStream(30);
      const mimeTypes = ["video/webm;codecs=vp9", "video/mp4;codecs=avc1.42E01E"];
      const recorders = mimeTypes.map((mimeType) => {
        const recorder = new MediaRecorder(stream, { mimeType, videoBitsPerSecond: bitrate });
        const chunks = [];
        recorder.ondataavailable = (event) => {
          if (event.data.size) chunks.push(event.data);
        };
        return { recorder, chunks, mimeType };
      });

      const finished = recorders.map(
        ({ recorder, chunks, mimeType }) =>
          new Promise((resolve) => {
            recorder.onstop = async () => {
              const blob = new Blob(chunks, { type: mimeType });
              const buffer = await blob.arrayBuffer();
              const bytes = new Uint8Array(buffer);
              let binary = "";
              const chunkSize = 0x8000;
              for (let index = 0; index < bytes.length; index += chunkSize) {
                binary += String.fromCharCode(...bytes.subarray(index, index + chunkSize));
              }
              const base64 = btoa(binary);
              const extension = mimeType.includes("mp4") ? "mp4" : "webm";
              const relativePath = `public/videos/yesbe-${type === "hero-film" ? "hero" : "systems"}-film.${extension}`;
              const size = await window.__saveAsset(relativePath, base64);
              window.__log(`saved ${relativePath} (${(size / 1024 / 1024).toFixed(2)} MB)`);
              resolve();
            };
          })
      );

      for (const { recorder } of recorders) recorder.start(1000);
      const started = performance.now();
      await new Promise((resolve) => {
        const frame = (now) => {
          const elapsed = now - started;
          const frames = drawScene(type, elapsed / 1000, width, height);
          const image = new Image();
          image.onload = () => {
            context.drawImage(image, 0, 0);
            if (elapsed < durationMs) requestAnimationFrame(frame);
            else resolve();
          };
          image.src = frames;
        };
        requestAnimationFrame(frame);
      });
      for (const { recorder } of recorders) recorder.stop();
      await Promise.all(finished);
      stream.getTracks().forEach((track) => track.stop());
    };

    await record("hero-film", 8000, 2600000);
    await record("systems-film", 8000, 2400000);
  };

  window.__drawProject = (options) => {
    const { title, category, layout, accent, slug } = options;
    const width = 1200;
    const height = 760;
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const c = canvas.getContext("2d");

    const rgb = (hex, alpha) => {
      const [r, g, b] = hexToRgb(hex);
      return `rgba(${r},${g},${b},${alpha})`;
    };

    c.fillStyle = "#e9eef7";
    c.fillRect(0, 0, width, height);

    const bgGlow = c.createRadialGradient(980, 90, 20, 980, 90, 680);
    bgGlow.addColorStop(0, rgb(accent, 0.18));
    bgGlow.addColorStop(1, rgb(accent, 0));
    c.fillStyle = bgGlow;
    c.fillRect(0, 0, width, height);

    c.save();
    c.shadowColor = "rgba(12,30,64,0.22)";
    c.shadowBlur = 54;
    c.shadowOffsetY = 28;
    c.fillStyle = "#ffffff";
    c.beginPath();
    c.roundRect(54, 42, 1092, 678, 20);
    c.fill();
    c.restore();

    c.save();
    c.beginPath();
    c.roundRect(54, 42, 1092, 678, 20);
    c.clip();

    c.fillStyle = "#07162f";
    c.fillRect(54, 42, 1092, 46);
    const dots = ["#ff7a72", "#ffc857", "#53d68b"];
    dots.forEach((color, index) => {
      c.fillStyle = color;
      c.beginPath();
      c.arc(82 + index * 18, 65, 5.2, 0, TAU);
      c.fill();
    });
    c.fillStyle = "rgba(255,255,255,0.08)";
    c.beginPath();
    c.roundRect(160, 55, 450, 20, 10);
    c.fill();
    c.fillStyle = "rgba(255,255,255,0.55)";
    c.font = "500 11px -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
    c.fillText(`yesbe.local / ${slug}`, 174, 69);

    c.fillStyle = "#07162f";
    c.fillRect(54, 88, 212, 632);
    c.fillStyle = "#ffffff";
    c.font = "700 19px -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
    c.fillText("YESBE", 80, 132);
    c.fillStyle = rgb(accent, 0.95);
    c.beginPath();
    c.roundRect(80, 151, 44, 4, 2);
    c.fill();
    const navItems = ["Overview", "Workspace", "Records", "Analytics", "Settings"];
    navItems.forEach((item, index) => {
      c.fillStyle = index === 0 ? rgb(accent, 0.2) : "rgba(255,255,255,0.035)";
      c.beginPath();
      c.roundRect(72, 190 + index * 44, 172, 34, 7);
      c.fill();
      c.fillStyle = index === 0 ? "#ffffff" : "rgba(255,255,255,0.56)";
      c.font = "500 12px -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
      c.fillText(item, 88, 212 + index * 44);
    });
    c.fillStyle = "rgba(255,255,255,0.3)";
    c.font = "500 10px -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
    c.fillText("Illustrative interface preview", 72, 690);

    c.fillStyle = "#f7f9fd";
    c.fillRect(266, 88, 880, 632);

    c.fillStyle = "#0a1220";
    c.font = "650 24px -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
    c.fillText(title, 306, 142);
    c.fillStyle = "#657084";
    c.font = "500 12px -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
    c.fillText(category, 306, 164);

    c.fillStyle = rgb(accent, 0.12);
    c.beginPath();
    c.roundRect(1012, 118, 94, 30, 15);
    c.fill();
    c.fillStyle = accent;
    c.font = "600 10px -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
    c.fillText("UI STUDY", 1033, 137);

    const card = (x, y, w, h, fill = "#ffffff", stroke = "#e5ebf4", radius = 12) => {
      c.fillStyle = fill;
      c.strokeStyle = stroke;
      c.lineWidth = 1;
      c.beginPath();
      c.roundRect(x, y, w, h, radius);
      c.fill();
      c.stroke();
    };

    const label = (text, x, y, size = 10, color = "#7b8698") => {
      c.fillStyle = color;
      c.font = `600 ${size}px -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`;
      c.fillText(text, x, y);
    };

    const tab = (text, x, y, active = false) => {
      c.fillStyle = active ? rgb(accent, 0.13) : "#f3f6fb";
      c.beginPath();
      c.roundRect(x, y, 88, 28, 7);
      c.fill();
      c.fillStyle = active ? accent : "#6a7485";
      c.font = "600 10px -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
      c.fillText(text, x + 15, y + 18);
    };

    if (layout === "commerce" || layout === "catalog") {
      tab("Catalogue", 306, 190, true);
      tab("Orders", 402, 190);
      tab("Inventory", 498, 190);
      card(306, 234, 530, 426);
      label("COLLECTION", 328, 260);
      const swatches = ["#17213a", "#cfd8e8", "#a9856f", "#6b7f9e", "#d9c4ae", "#34435c"];
      swatches.forEach((swatch, index) => {
        const x = 328 + (index % 3) * 164;
        const y = 280 + Math.floor(index / 3) * 180;
        c.fillStyle = swatch;
        c.beginPath();
        c.roundRect(x, y, 146, 122, 8);
        c.fill();
        c.fillStyle = "#ffffff";
        c.globalAlpha = 0.28;
        c.beginPath();
        c.arc(x + 98, y + 41, 23, 0, TAU);
        c.fill();
        c.globalAlpha = 1;
        c.fillStyle = "#1a2332";
        c.font = "600 10px -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
        c.fillText(index % 2 ? "Studio piece" : "Core item", x + 10, y + 148);
      });
      card(856, 234, 250, 212);
      label("CART SUMMARY", 878, 260);
      c.fillStyle = "#0a1220";
      c.font = "700 30px -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
      c.fillText("₹ 18,400", 878, 302);
      c.fillStyle = "#7b8698";
      c.font = "500 11px -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
      c.fillText("3 items · checkout ready", 878, 322);
      c.fillStyle = accent;
      c.beginPath();
      c.roundRect(878, 348, 206, 42, 8);
      c.fill();
      c.fillStyle = "#ffffff";
      c.font = "650 11px -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
      c.fillText("Continue to checkout", 908, 373);
      card(856, 466, 250, 194);
      label("ORDER SIGNALS", 878, 492);
      [54, 78, 62, 96, 74].forEach((value, index) => {
        c.fillStyle = rgb(accent, 0.18 + index * 0.07);
        c.beginPath();
        c.roundRect(880 + index * 38, 600 - value, 18, value, 4);
        c.fill();
      });
    } else if (layout === "ordering") {
      tab("Live orders", 306, 190, true);
      tab("Menu", 402, 190);
      tab("Tables", 498, 190);
      card(306, 234, 360, 426);
      label("ORDER QUEUE", 328, 260);
      ["#T-04", "#T-11", "#T-07", "#T-02"].forEach((table, index) => {
        card(328, 280 + index * 88, 316, 72, index === 0 ? rgb(accent, 0.08) : "#ffffff", index === 0 ? rgb(accent, 0.35) : "#e5ebf4", 9);
        c.fillStyle = "#0a1220";
        c.font = "700 14px -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
        c.fillText(table, 346, 306 + index * 88);
        c.fillStyle = "#7b8698";
        c.font = "500 10px -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
        c.fillText(index === 0 ? "New · 4 items" : "Preparing · 2 items", 346, 326 + index * 88);
        c.fillStyle = index === 0 ? accent : "#9aa5b5";
        c.beginPath();
        c.arc(610, 315 + index * 88, 8, 0, TAU);
        c.fill();
      });
      card(686, 234, 420, 196);
      label("TABLE SESSION", 708, 260);
      c.fillStyle = "#0a1220";
      c.font = "700 44px -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
      c.fillText("T-04", 708, 318);
      c.fillStyle = "#7b8698";
      c.font = "500 11px -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
      c.fillText("QR menu scanned · order in progress", 708, 340);
      card(686, 450, 420, 210);
      label("MENU SIGNALS", 708, 476);
      [86, 64, 110, 76, 96, 58, 88].forEach((value, index) => {
        c.fillStyle = index === 2 ? accent : rgb(accent, 0.23);
        c.beginPath();
        c.roundRect(710 + index * 52, 620 - value * 0.7, 26, value * 0.7, 5);
        c.fill();
      });
    } else if (layout === "records") {
      tab("Catalogue", 306, 190, true);
      tab("Members", 402, 190);
      tab("Loans", 498, 190);
      card(306, 234, 800, 426);
      c.fillStyle = "#f3f6fb";
      c.beginPath();
      c.roundRect(328, 256, 756, 36, 7);
      c.fill();
      c.fillStyle = "#7b8698";
      c.font = "600 10px -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
      c.fillText("TITLE", 346, 278);
      c.fillText("STATUS", 676, 278);
      c.fillText("DUE", 878, 278);
      ["Design systems", "Applied analytics", "Modern web", "Operations"].forEach((row, index) => {
        c.fillStyle = index % 2 === 0 ? "#ffffff" : "#fbfcfe";
        c.fillRect(328, 304 + index * 58, 756, 58);
        c.fillStyle = "#0a1220";
        c.font = "600 12px -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
        c.fillText(row, 346, 338 + index * 58);
        c.fillStyle = index === 0 ? accent : "#8993a3";
        c.font = "500 10px -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
        c.fillText(index === 0 ? "Available" : "On loan", 676, 338 + index * 58);
        c.fillStyle = "#657084";
        c.fillText(index === 0 ? "—" : `0${index + 2} May`, 878, 338 + index * 58);
        c.strokeStyle = "#edf1f7";
        c.beginPath();
        c.moveTo(328, 362 + index * 58);
        c.lineTo(1084, 362 + index * 58);
        c.stroke();
      });
    } else if (layout === "editorial") {
      card(306, 218, 500, 250, "#0b1b38", "#0b1b38");
      c.fillStyle = rgb(accent, 0.33);
      c.beginPath();
      c.arc(710, 300, 94, 0, TAU);
      c.fill();
      c.fillStyle = "rgba(255,255,255,0.12)";
      c.beginPath();
      c.arc(752, 352, 72, 0, TAU);
      c.fill();
      c.fillStyle = "#ffffff";
      c.font = "650 30px -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
      c.fillText("A clear digital", 334, 300);
      c.fillText("first impression.", 334, 336);
      c.fillStyle = "rgba(255,255,255,0.58)";
      c.font = "500 11px -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
      c.fillText("Corporate website · content system · enquiry flow", 334, 364);
      card(826, 218, 280, 118);
      label("POSITIONING", 848, 244);
      c.fillStyle = "#0a1220";
      c.font = "650 17px -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
      c.fillText("Clarity before volume", 848, 280);
      card(826, 350, 280, 118);
      label("CONTENT", 848, 376);
      c.fillStyle = "#0a1220";
      c.font = "650 17px -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
      c.fillText("Structured proof", 848, 412);
      card(306, 490, 800, 170);
      label("EDITORIAL RHYTHM", 328, 518);
      [0.85, 0.62, 0.72, 0.45].forEach((value, index) => {
        c.fillStyle = index === 0 ? rgb(accent, 0.55) : "#dce4f0";
        c.beginPath();
        c.roundRect(328 + index * 192, 544, 164, 84, 8);
        c.fill();
      });
    } else if (layout === "assistant") {
      card(306, 218, 500, 442);
      label("CONVERSATION", 328, 244);
      const bubbles = [
        { text: "Summarise this month's supplier exposure.", left: false },
        { text: "Three suppliers account for 62% of open commitments. Two invoices are due this week.", left: true },
        { text: "Show the supporting records.", left: false },
      ];
      let bubbleY = 270;
      bubbles.forEach((bubble, index) => {
        const x = bubble.left ? 328 : 470;
        const w = bubble.left ? 284 : 250;
        c.fillStyle = bubble.left ? "#f1f4f9" : rgb(accent, 0.13);
        c.beginPath();
        c.roundRect(x, bubbleY, w, index === 1 ? 76 : 46, 9);
        c.fill();
        c.fillStyle = "#243044";
        c.font = "500 10.5px -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
        const words = bubble.text.split(" ");
        let row = "";
        let lineNumber = 0;
        for (const word of words) {
          const test = row ? `${row} ${word}` : word;
          if (c.measureText(test).width > w - 26 && row) {
            c.fillText(row, x + 13, bubbleY + 19 + lineNumber * 16);
            row = word;
            lineNumber += 1;
          } else row = test;
        }
        c.fillText(row, x + 13, bubbleY + 19 + lineNumber * 16);
        bubbleY += (index === 1 ? 76 : 46) + 16;
      });
      card(826, 218, 280, 442);
      label("SOURCES", 848, 244);
      ["Policy register", "ERP ledger", "Contract index"].forEach((source, index) => {
        card(848, 266 + index * 92, 236, 74, "#fbfcfe", "#e5ebf4", 8);
        c.fillStyle = accent;
        c.beginPath();
        c.arc(868, 292 + index * 92, 5, 0, TAU);
        c.fill();
        c.fillStyle = "#0a1220";
        c.font = "600 11px -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
        c.fillText(source, 884, 296 + index * 92);
        c.fillStyle = "#7b8698";
        c.font = "500 9px -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
        c.fillText("Grounded reference", 884, 312 + index * 92);
      });
    } else if (layout === "erp") {
      tab("Finance", 306, 190, true);
      tab("Sales", 402, 190);
      tab("Inventory", 498, 190);
      const modules = [
        ["Revenue", "₹ 42.6L", accent],
        ["Open orders", "128", "#6b7f9e"],
        ["Inventory", "94%", "#5f9e8b"],
      ];
      modules.forEach(([title, value, color], index) => {
        card(306 + index * 200, 234, 184, 104);
        label(title.toUpperCase(), 326 + index * 200, 260);
        c.fillStyle = "#0a1220";
        c.font = "700 24px -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
        c.fillText(value, 326 + index * 200, 300);
        c.fillStyle = color;
        c.beginPath();
        c.roundRect(326 + index * 200, 316, 48, 4, 2);
        c.fill();
      });
      card(306, 358, 800, 302);
      label("OPERATIONS TABLE", 328, 386);
      ["Ref", "Account", "Status", "Value"].forEach((column, index) => {
        c.fillStyle = "#8a94a4";
        c.font = "600 9px -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
        c.fillText(column, 328 + index * 190, 414);
      });
      ["ORD-1841", "ORD-1842", "ORD-1843", "ORD-1844"].forEach((row, index) => {
        c.fillStyle = index === 0 ? "#ffffff" : "#fbfcfe";
        c.fillRect(328, 430 + index * 50, 750, 50);
        c.fillStyle = "#0a1220";
        c.font = "600 10.5px -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
        c.fillText(row, 328, 460 + index * 50);
        c.fillStyle = "#536074";
        c.font = "500 10.5px -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
        c.fillText(index === 0 ? "Northline Retail" : "Operating account", 518, 460 + index * 50);
        c.fillStyle = index === 1 ? "#b58a2e" : "#4f8c7a";
        c.fillText(index === 1 ? "Pending" : "Posted", 708, 460 + index * 50);
        c.fillStyle = "#0a1220";
        c.fillText(`₹ ${(index + 2) * 18400}`, 898, 460 + index * 50);
      });
    } else if (layout === "analytics") {
      card(306, 218, 500, 250);
      label("PERFORMANCE TREND", 328, 244);
      const points = [178, 152, 164, 126, 136, 104, 112, 78, 88];
      c.strokeStyle = rgb(accent, 0.85);
      c.lineWidth = 3;
      c.beginPath();
      points.forEach((value, index) => {
        const x = 330 + index * 54;
        const y = 414 - value;
        if (index === 0) c.moveTo(x, y);
        else c.lineTo(x, y);
      });
      c.stroke();
      c.lineTo(766, 430);
      c.lineTo(330, 430);
      c.closePath();
      c.fillStyle = rgb(accent, 0.1);
      c.fill();
      card(826, 218, 280, 118);
      label("CONVERSION", 848, 244);
      c.fillStyle = "#0a1220";
      c.font = "700 30px -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
      c.fillText("4.82%", 848, 286);
      c.fillStyle = "#4f8c7a";
      c.font = "600 10px -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
      c.fillText("↑ 0.64 pts", 944, 286);
      card(826, 350, 280, 118);
      label("AVG. ORDER", 848, 376);
      c.fillStyle = "#0a1220";
      c.font = "700 30px -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
      c.fillText("₹ 3,260", 848, 418);
      card(306, 490, 800, 170);
      label("CHANNEL MIX", 328, 518);
      [0.62, 0.42, 0.28, 0.18].forEach((value, index) => {
        c.fillStyle = index === 0 ? accent : rgb(accent, 0.2 + index * 0.05);
        c.beginPath();
        c.roundRect(328 + index * 192, 544, 164, 84 * value + 12, 8);
        c.fill();
      });
    } else if (layout === "growth") {
      card(306, 218, 500, 250);
      label("SEARCH VISIBILITY", 328, 244);
      const points = [224, 206, 188, 196, 164, 150, 158, 126, 132, 108];
      c.strokeStyle = rgb(accent, 0.9);
      c.lineWidth = 3;
      c.beginPath();
      points.forEach((value, index) => {
        const x = 330 + index * 48;
        const y = 406 - value;
        if (index === 0) c.moveTo(x, y);
        else c.lineTo(x, y);
      });
      c.stroke();
      card(826, 218, 280, 250);
      label("ANSWER COVERAGE", 848, 244);
      ["Direct answers", "Structured data", "Entity clarity"].forEach((row, index) => {
        c.fillStyle = "#0a1220";
        c.font = "600 10.5px -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
        c.fillText(row, 848, 286 + index * 48);
        c.fillStyle = "#e8edf5";
        c.beginPath();
        c.roundRect(848, 296 + index * 48, 200, 8, 4);
        c.fill();
        c.fillStyle = accent;
        c.beginPath();
        c.roundRect(848, 296 + index * 48, 200 * (0.82 - index * 0.16), 8, 4);
        c.fill();
      });
      card(306, 490, 800, 170);
      label("QUERY THEMES", 328, 518);
      ["Intelligent automation", "ERP selection", "Web platform"].forEach((row, index) => {
        c.fillStyle = index === 0 ? "#0a1220" : "#657084";
        c.font = "600 11px -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
        c.fillText(row, 328 + index * 260, 566);
        c.fillStyle = "#e8edf5";
        c.beginPath();
        c.roundRect(328 + index * 260, 582, 208, 8, 4);
        c.fill();
        c.fillStyle = accent;
        c.beginPath();
        c.roundRect(328 + index * 260, 582, 208 * (0.8 - index * 0.12), 8, 4);
        c.fill();
      });
    } else {
      card(306, 218, 800, 442);
      label("AUTOMATION FLOW", 328, 244);
      const flow = [
        { x: 356, y: 300, w: 154, title: "Request" },
        { x: 558, y: 300, w: 154, title: "Validate" },
        { x: 760, y: 300, w: 154, title: "Approve" },
        { x: 962, y: 300, w: 108, title: "Post" },
      ];
      flow.forEach((step, index) => {
        card(step.x, step.y, step.w, 72, index === 1 ? rgb(accent, 0.1) : "#ffffff", index === 1 ? rgb(accent, 0.32) : "#e5ebf4", 9);
        c.fillStyle = "#0a1220";
        c.font = "650 12px -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
        c.fillText(step.title, step.x + 16, step.y + 31);
        c.fillStyle = "#8490a2";
        c.font = "500 9px -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
        c.fillText(`Step 0${index + 1}`, step.x + 16, step.y + 50);
        if (index < flow.length - 1) {
          c.strokeStyle = rgb(accent, 0.5);
          c.lineWidth = 1.5;
          c.beginPath();
          c.moveTo(step.x + step.w, step.y + 36);
          c.lineTo(flow[index + 1].x, step.y + 36);
          c.stroke();
        }
      });
      card(356, 414, 714, 200);
      label("RECENT RUNS", 378, 442);
      ["Supplier invoice", "New employee", "Sales order"].forEach((row, index) => {
        c.fillStyle = index === 1 ? "#ffffff" : "#fbfcfe";
        c.fillRect(378, 460 + index * 50, 670, 50);
        c.fillStyle = "#0a1220";
        c.font = "600 10.5px -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
        c.fillText(row, 394, 490 + index * 50);
        c.fillStyle = "#4f8c7a";
        c.font = "500 10px -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
        c.fillText(index === 0 ? "Completed" : "Awaiting review", 946, 490 + index * 50);
      });
    }

    c.restore();
    c.strokeStyle = "rgba(15,33,62,0.12)";
    c.lineWidth = 1;
    c.beginPath();
    c.roundRect(54, 42, 1092, 678, 20);
    c.stroke();

    return canvas.toDataURL("image/webp", 0.91);
  };
});

const phase5Only = process.env.PHASE5_ONLY;
const visuals = [
  ["intelligence", 1600, 1000],
  ["enterprise", 1600, 1000],
  ["web", 1600, 1000],
  ["cloud", 1600, 1000],
  ["transformation", 1600, 1000],
  ["product", 1600, 1000],
  ["company", 1600, 1000],
  ["automation", 1600, 1000],
  ["analytics", 1600, 1000],
  ["integration", 1600, 1000],
];

for (const [name, width, height] of visuals) {
  if (phase5Only && name !== phase5Only) continue;
  for (const [variantWidth, variantHeight] of [[width, height], [960, 600], [640, 400]]) {
    const dataUrl = await page.evaluate(
      ({ name, variantWidth, variantHeight }) => window.__drawAsset(name, variantWidth, variantHeight),
      { name, variantWidth, variantHeight }
    );
    const suffix = variantWidth === width ? "" : `-${variantWidth}`;
    const file = path.join(out.visuals, `${name}${suffix}.webp`);
    fs.writeFileSync(file, Buffer.from(dataUrl.split(",")[1], "base64"));
    console.log(`saved public/images/visuals/${name}${suffix}.webp`);
  }
}

if (!phase5Only) {
const industries = ["healthcare", "education", "retail", "manufacturing", "logistics", "finance"];
for (const name of industries) {
  const dataUrl = await page.evaluate(
    ({ name }) => window.__drawAsset(name, 1200, 900),
    { name }
  );
  const file = path.join(out.industries, `${name}.webp`);
  fs.writeFileSync(file, Buffer.from(dataUrl.split(",")[1], "base64"));
  console.log(`saved public/images/industries/${name}.webp`);
}

const projects = [
  { slug: "fashion-fusion", title: "E-Commerce Platform", category: "E-commerce platform", layout: "commerce", accent: "#1f4ed8" },
  { slug: "restaurant-qr-ordering", title: "Restaurant QR Ordering", category: "Ordering system", layout: "ordering", accent: "#0f8f83" },
  { slug: "library-management", title: "Library Management", category: "Education ERP", layout: "records", accent: "#4f46b8" },
  { slug: "business-portfolio", title: "Business Portfolio", category: "Corporate website", layout: "editorial", accent: "#1f4ed8" },
  { slug: "ai-business-assistant", title: "AI Business Assistant", category: "Applied AI", layout: "assistant", accent: "#5b5bd6" },
  { slug: "erp-management", title: "ERP Management", category: "Enterprise platform", layout: "erp", accent: "#0b6b8a" },
  { slug: "powerbi-dashboard", title: "Power BI Sales", category: "Business analytics", layout: "analytics", accent: "#c0891f" },
  { slug: "seo-digital-growth", title: "Digital Growth", category: "SEO / GEO / AEO", layout: "growth", accent: "#2f7d4f" },
  { slug: "business-automation", title: "Business Automation", category: "Workflow platform", layout: "automation", accent: "#1f4ed8" },
];

for (const project of projects) {
  const dataUrl = await page.evaluate((options) => window.__drawProject(options), project);
  const file = path.join(out.projects, `${project.slug}.webp`);
  fs.writeFileSync(file, Buffer.from(dataUrl.split(",")[1], "base64"));
  console.log(`saved public/images/projects/${project.slug}.webp`);
}

await page.evaluate(() => window.__recordFilms());

const poster = await page.evaluate(() => window.__drawAsset("hero-film", 1600, 1000, 0.78));
fs.writeFileSync(path.join(out.visuals, "hero-film-poster.webp"), Buffer.from(poster.split(",")[1], "base64"));
console.log("saved public/images/visuals/hero-film-poster.webp");

const systemsPoster = await page.evaluate(() => window.__drawAsset("systems-film", 1400, 900, 0.78));
fs.writeFileSync(path.join(out.visuals, "systems-film-poster.webp"), Buffer.from(systemsPoster.split(",")[1], "base64"));
console.log("saved public/images/visuals/systems-film-poster.webp");
}

await browser.close();
