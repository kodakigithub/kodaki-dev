'use client';

import { useEffect, useRef } from 'react';

const CELL_SIZE = 16;
const SUB_DIVISIONS = 4;
const STEP_MS = 1600;
const SEED_DENSITY = 0.1;
const FADE_SPEED = 0.9;
const MAX_ALPHA = 0.35;
const RESEED_POPULATION = 0.015;
const DOT_COLOR = 'rgb(144, 104, 247)';

// Classic glider — makes the automaton unmistakably Conway's Game of Life
const GLIDER = [
  [0, 1],
  [1, 2],
  [2, 0],
  [2, 1],
  [2, 2],
];

// 4x4 Bayer matrix (normalized) — each cell is a cluster of sub-dots that turn on
// in this order as the cell is born and off as it dies (dithered fade)
const BAYER_4X4 = [
  0, 8, 2, 10,
  12, 4, 14, 6,
  3, 11, 1, 9,
  15, 7, 13, 5,
].map((value) => value / 16);

const DitherLifeBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let cols = 0;
    let rows = 0;
    let alive = new Uint8Array(0);
    let nextAlive = new Uint8Array(0);
    let intensity = new Float32Array(0);
    let columnWeight = new Float32Array(0);
    let animationFrame = 0;
    let lastFrameTime = 0;
    let stepAccumulator = 0;

    // 0 over the centered content column, ramping to 1 at the left/right screen edges,
    // so the simulation lives in the margins and never sits under the text
    const computeColumnWeights = (width: number) => {
      columnWeight = new Float32Array(cols);
      const center = width / 2;
      const protectedHalf = Math.min(width * 0.3, 430);
      const ramp = Math.max(width * 0.12, 140);
      for (let col = 0; col < cols; col++) {
        const x = col * CELL_SIZE + CELL_SIZE / 2;
        const distance = Math.abs(x - center) - protectedHalf;
        columnWeight[col] = Math.min(Math.max(distance / ramp, 0), 1);
      }
    };

    const randomEdgeColumn = () => {
      let col = Math.floor(Math.random() * cols);
      for (let attempt = 0; attempt < 12; attempt++) {
        col = Math.floor(Math.random() * cols);
        if (Math.random() < columnWeight[col]) break;
      }
      return col;
    };

    const seedGlider = () => {
      const row = Math.floor(Math.random() * rows);
      const col = randomEdgeColumn();
      const flipRow = Math.random() < 0.5 ? -1 : 1;
      const flipCol = Math.random() < 0.5 ? -1 : 1;
      for (const [dr, dc] of GLIDER) {
        const r = (row + dr * flipRow + rows) % rows;
        const c = (col + dc * flipCol + cols) % cols;
        alive[r * cols + c] = 1;
      }
    };

    // Small random blobs near the edges so new life keeps evolving where it's visible
    const seedRandomBlobs = (count: number) => {
      for (let i = 0; i < count; i++) {
        if (Math.random() < 0.4) {
          seedGlider();
          continue;
        }
        const row = Math.floor(Math.random() * rows);
        const col = randomEdgeColumn();
        for (let dr = -1; dr <= 1; dr++) {
          for (let dc = -1; dc <= 1; dc++) {
            if (Math.random() < 0.6) {
              const r = (row + dr + rows) % rows;
              const c = (col + dc + cols) % cols;
              alive[r * cols + c] = 1;
            }
          }
        }
      }
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      cols = Math.max(1, Math.ceil(canvas.offsetWidth / CELL_SIZE));
      rows = Math.max(1, Math.ceil(canvas.offsetHeight / CELL_SIZE));
      alive = new Uint8Array(cols * rows);
      nextAlive = new Uint8Array(cols * rows);
      intensity = new Float32Array(cols * rows);
      computeColumnWeights(canvas.offsetWidth);

      // Life starts from the left and right edges and evolves inward
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const index = row * cols + col;
          alive[index] = Math.random() < SEED_DENSITY * columnWeight[col] ? 1 : 0;
          intensity[index] = alive[index];
        }
      }
      for (let i = 0; i < 6; i++) seedGlider();
    };

    const stepLife = () => {
      let visiblePopulation = 0;
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          let neighbors = 0;
          for (let dr = -1; dr <= 1; dr++) {
            for (let dc = -1; dc <= 1; dc++) {
              if (dr === 0 && dc === 0) continue;
              const r = (row + dr + rows) % rows;
              const c = (col + dc + cols) % cols;
              neighbors += alive[r * cols + c];
            }
          }
          const index = row * cols + col;
          nextAlive[index] = neighbors === 3 || (neighbors === 2 && alive[index] === 1) ? 1 : 0;
          if (columnWeight[col] > 0.1) visiblePopulation += nextAlive[index];
        }
      }
      [alive, nextAlive] = [nextAlive, alive];
      // Still lifes eventually freeze the board — sprinkle fresh life when the edges thin out
      if (visiblePopulation < cols * rows * RESEED_POPULATION) {
        seedRandomBlobs(Math.ceil((cols * rows) / 800));
      }
    };

    const draw = (time: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = DOT_COLOR;
      const breath = 0.88 + 0.12 * Math.sin(time * 0.0003);
      const subPitch = CELL_SIZE / SUB_DIVISIONS;
      const maxRadius = subPitch * 0.36;
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const weight = columnWeight[col];
          if (weight === 0) continue;
          const level = intensity[row * cols + col];
          if (level < 0.04) continue;
          ctx.globalAlpha = MAX_ALPHA * weight * (0.4 + 0.6 * level);
          const cellX = col * CELL_SIZE;
          const cellY = row * CELL_SIZE;
          for (let sub = 0; sub < SUB_DIVISIONS * SUB_DIVISIONS; sub++) {
            const threshold = BAYER_4X4[sub];
            if (level <= threshold) continue;
            const pulse = 0.8 + 0.2 * Math.sin(time * 0.0005 + threshold * Math.PI * 2);
            const sr = Math.floor(sub / SUB_DIVISIONS);
            const sc = sub % SUB_DIVISIONS;
            ctx.beginPath();
            ctx.arc(
              cellX + sc * subPitch + subPitch / 2,
              cellY + sr * subPitch + subPitch / 2,
              maxRadius * pulse * breath,
              0,
              Math.PI * 2
            );
            ctx.fill();
          }
        }
      }
      ctx.globalAlpha = 1;
    };

    const frame = (time: number) => {
      // Clamp delta so a backgrounded tab doesn't fast-forward on return
      const delta = Math.min(time - lastFrameTime, 100);
      lastFrameTime = time;
      stepAccumulator += delta;
      if (stepAccumulator >= STEP_MS) {
        stepAccumulator = 0;
        stepLife();
      }
      const fade = Math.min((delta / 1000) * FADE_SPEED, 1);
      for (let i = 0; i < intensity.length; i++) {
        intensity[i] += (alive[i] - intensity[i]) * fade;
      }
      draw(time);
      animationFrame = requestAnimationFrame(frame);
    };

    const observer = new ResizeObserver(() => {
      resize();
      if (prefersReducedMotion) draw(0);
    });
    observer.observe(canvas);
    resize();

    if (prefersReducedMotion) {
      draw(0);
    } else {
      animationFrame = requestAnimationFrame((time) => {
        lastFrameTime = time;
        animationFrame = requestAnimationFrame(frame);
      });
    }

    return () => {
      cancelAnimationFrame(animationFrame);
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
    />
  );
};

export default DitherLifeBackground;
