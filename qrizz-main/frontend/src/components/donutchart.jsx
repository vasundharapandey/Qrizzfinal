import React, { useMemo } from "react";
import * as d3 from "d3";

const MARGIN = 30;

const colors = ["red", "white", "blue"]; // Updated colors

const DonutChart = ({ width, height, data }) => {
  const radius = Math.min(width, height) / 2 - MARGIN;

  const pie = useMemo(() => {
    const pieGenerator = d3.pie().value((d) => d.value);
    return pieGenerator(data);
  }, [data]);

  const arcs = useMemo(() => {
    const arcPathGenerator = d3.arc();
    return pie.map((p) =>
      arcPathGenerator({
        innerRadius: 70,
        outerRadius: radius,
        startAngle: p.startAngle,
        endAngle: p.endAngle,
      })
    );
  }, [radius, pie]);

  return (
    <svg width={width} height={height} style={{ display: "inline-block" }}>
      <g transform={`translate(${width / 3.5}, ${height / 1.12})`}>
        {arcs.map((arc, i) => {
          return <path key={i} d={arc} fill={colors[i]} />;
        })}
      </g>
      <g transform={`translate(${width - 100}, ${height / 2 - data.length * 10})`}>
        {data.map((item, i) => (
          <g key={i} transform={`translate(0, ${i * 20})`}>
            <rect width={15} height={15} fill={colors[i]} />
            {/* Updated the fill color of the text to white */}
            <text x={20} y={12.5} style={{ fontSize: "12px", fill: "white" }}>
              {`${item.name}: ${item.value}`}
            </text>
          </g>
        ))}
      </g>
    </svg>
  );
};

export default DonutChart;
