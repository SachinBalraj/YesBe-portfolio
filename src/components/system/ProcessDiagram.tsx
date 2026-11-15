import { useId } from "react";
import { cn } from "@/utils/cn";

interface ProcessStep {
  label: string;
  detail?: string;
}

interface ProcessDiagramProps {
  steps: ProcessStep[];
  tone?: "light" | "dark";
  className?: string;
  label?: string;
}

export function ProcessDiagram({
  steps,
  tone = "light",
  className,
  label = "Delivery process",
}: ProcessDiagramProps) {
  const titleId = useId();
  const descriptionId = useId();
  const dark = tone === "dark";

  const count = Math.max(steps.length, 2);
  const startX = 96;
  const endX = 804;
  const spacing = (endX - startX) / (count - 1);
  const nodeY = 58;

  const lineColor = dark ? "rgba(255,255,255,0.18)" : "var(--border-strong)";
  const nodeFill = dark ? "var(--navy)" : "var(--card)";
  const nodeStroke = dark ? "rgba(255,255,255,0.24)" : "var(--border-strong)";
  const accent = dark ? "var(--cobalt-bright)" : "var(--primary)";
  const labelColor = dark ? "#f4f7fc" : "var(--ink)";
  const detailColor = dark ? "#b9c5d8" : "var(--body)";

  return (
    <figure className={cn("m-0 w-full", className)}>
      <svg
        viewBox="0 0 900 196"
        role="img"
        aria-labelledby={`${titleId} ${descriptionId}`}
        className="h-auto w-full overflow-visible"
      >
        <title id={titleId}>{label}</title>
        <desc id={descriptionId}>
          {steps.map((step, index) => `${index + 1}. ${step.label}`).join(". ")}
        </desc>

        <line
          x1={startX}
          y1={nodeY}
          x2={endX}
          y2={nodeY}
          stroke={lineColor}
          strokeWidth="1"
          strokeDasharray="4 6"
        />

        {steps.map((step, index) => {
          const x = startX + spacing * index;
          const isLast = index === steps.length - 1;
          return (
            <g key={step.label} className="process-node">
              <circle
                cx={x}
                cy={nodeY}
                r="26"
                fill={nodeFill}
                stroke={isLast ? accent : nodeStroke}
                strokeWidth={isLast ? "1.5" : "1"}
              />
              <text
                x={x}
                y={nodeY + 4}
                textAnchor="middle"
                fill={isLast ? accent : labelColor}
                fontSize="11"
                fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
                fontWeight="600"
                letterSpacing="0.08em"
              >
                {String(index + 1).padStart(2, "0")}
              </text>
              <text
                x={x}
                y="118"
                textAnchor="middle"
                fill={labelColor}
                fontSize="13"
                fontWeight="600"
                letterSpacing="-0.01em"
              >
                {step.label}
              </text>
              {step.detail && (
                <text
                  x={x}
                  y="140"
                  textAnchor="middle"
                  fill={detailColor}
                  fontSize="11"
                  letterSpacing="0"
                >
                  {step.detail}
                </text>
              )}
            </g>
          );
        })}
      </svg>
    </figure>
  );
}
