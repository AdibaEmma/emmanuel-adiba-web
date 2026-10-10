"use client";

/**
 * PillarDiagram — the flat, SVG form of the hero tetrahedron.
 *
 * Used wherever the WebGL scene is not: while the 3D chunk loads, under
 * reduced motion, and on small screens, where it sits in the layout beside
 * the copy instead of behind it. No three.js import, so it costs nothing to
 * render on the server or on a phone.
 *
 * `compact` enlarges labels and hit areas for the small mobile rendering,
 * where the viewBox is scaled down to well under half size.
 */

import { PILLARS, pillarUppercase, type Pillar } from "@/lib/brand";

const ACCENT = "#C7F65E";

const VERTS: Array<[number, number]> = [
  [200, 90],
  [110, 240],
  [290, 240],
  [200, 195],
];

const EDGES: Array<[number, number]> = [
  [0, 1],
  [0, 2],
  [0, 3],
  [1, 2],
  [1, 3],
  [2, 3],
];

export function PillarDiagram({
  onVertexClick,
  compact = false,
  className,
}: {
  onVertexClick?: (pillar: Pillar) => void;
  compact?: boolean;
  className?: string;
}) {
  const interactive = !!onVertexClick;
  const hitRadius = compact ? 52 : 32;
  const fontSize = compact ? 22 : 9;
  const labelOffset = compact ? 30 : 24;

  return (
    <svg
      viewBox={compact ? "60 40 280 230" : "0 0 400 320"}
      className={className}
      role={interactive ? "group" : undefined}
      aria-label={interactive ? "The four pillars" : undefined}
      aria-hidden={interactive ? undefined : true}
    >
      <defs>
        <radialGradient id="pillarVertGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={ACCENT} stopOpacity="1" />
          <stop offset="60%" stopColor={ACCENT} stopOpacity="0.2" />
          <stop offset="100%" stopColor={ACCENT} stopOpacity="0" />
        </radialGradient>
      </defs>

      {EDGES.map(([a, b], i) => (
        <line
          key={i}
          x1={VERTS[a][0]}
          y1={VERTS[a][1]}
          x2={VERTS[b][0]}
          y2={VERTS[b][1]}
          stroke={ACCENT}
          strokeOpacity="0.5"
          strokeWidth={compact ? 1.5 : 1}
        />
      ))}

      {VERTS.map(([x, y], i) => {
        const pillar = PILLARS[i];
        const label = pillarUppercase(pillar);
        return (
          <g
            key={pillar}
            className="pillar-vertex"
            role={interactive ? "button" : undefined}
            aria-label={interactive ? `Open the ${label.toLowerCase()} pillar` : undefined}
            tabIndex={interactive ? 0 : -1}
            onClick={interactive ? () => onVertexClick?.(pillar) : undefined}
            onKeyDown={
              interactive
                ? (e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      onVertexClick?.(pillar);
                    }
                  }
                : undefined
            }
            style={{ cursor: interactive ? "pointer" : "default" }}
          >
            {/* Larger transparent hit target */}
            <circle cx={x} cy={y} r={hitRadius} fill="transparent" pointerEvents="all" />
            <circle cx={x} cy={y} r={compact ? 26 : 20} fill="url(#pillarVertGlow)" />
            <circle cx={x} cy={y} r={compact ? 6 : 4} fill={ACCENT} />
            {/* Drawn only when the vertex has keyboard focus (see globals.css) */}
            <circle className="pillar-vertex__ring" cx={x} cy={y} r={compact ? 20 : 14} fill="none" />
            <text
              x={x}
              y={y - labelOffset}
              fill="currentColor"
              fontSize={fontSize}
              fontFamily="ui-monospace, monospace"
              textAnchor="middle"
              letterSpacing={compact ? 3 : 2}
            >
              {label.slice(0, 3)}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
