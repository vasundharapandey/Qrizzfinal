import React, { useEffect, useMemo, useRef } from "react";
import * as d3 from "d3";

const MARGIN = { top: 30, right: 30, bottom: 50, left: 50 };

const StackedAreaChart = ({ width, height, data }) => {
  const axesRef = useRef(null);
  const boundsWidth = width - MARGIN.right - MARGIN.left;
  const boundsHeight = height - MARGIN.top - MARGIN.bottom;

  const stackSeries = d3
    .stack()
    .keys(["groupA", "groupB", "groupC", "groupD"])
    .order(d3.stackOrderNone)
    .offset(d3.stackOffsetNone);
  const series = stackSeries(data);

  const max = d3.max(series, d => d3.max(d, d => d[1])); // Find maximum value in the stacked series
  const yScale = useMemo(() => {
    return d3
      .scaleLinear()
      .domain([0, max || 0])
      .range([boundsHeight, 0]);
  }, [data, height]);

  const [xMin, xMax] = d3.extent(data, (d) => d.x);
  const xScale = useMemo(() => {
    return d3
      .scaleLinear()
      .domain([xMin || 0, xMax || 0])
      .range([0, boundsWidth]);
  }, [data, width]);

  useEffect(() => {
    const svgElement = d3.select(axesRef.current);
    svgElement.selectAll("*").remove();
    const xAxisGenerator = d3.axisBottom(xScale);
    svgElement
      .append("g")
      .attr("transform", "translate(0," + boundsHeight + ")")
      .call(xAxisGenerator);

    const yAxisGenerator = d3.axisLeft(yScale);
    svgElement.append("g").call(yAxisGenerator);

    // Draw dotted lines
    svgElement
      .selectAll(".dotted-line")
      .data(yScale.ticks())
      .enter()
      .append("line")
      .attr("class", "dotted-line")
      .attr("x1", 0)
      .attr("x2", boundsWidth)
      .attr("y1", (d) => yScale(d))
      .attr("y2", (d) => yScale(d))
      .attr("stroke", "#ddd") // Very light gray
      .attr("stroke-opacity", 0.2) // Adjust opacity here
      .attr("stroke-dasharray", "2,2");
  }, [xScale, yScale, boundsHeight]);

  const areaBuilder = d3
    .area()
    .x((d) => {
      return xScale(d.data.x);
    })
    .y1((d) => yScale(d[1]))
    .y0((d) => yScale(d[0]));

    const colorScale = d3.scaleOrdinal().domain(["groupA", "groupB", "groupC", "groupD"]).range(["#66c2a5", "blue", "#8da0cb", "#e78ac3"]);

    const allPath = series.map((serie, i) => {
      const path = areaBuilder(serie);
      const fillColor = colorScale(series[i].key);
      const lighterFillColor = d3.color(fillColor).brighter(0.5); // Adjust the brightness level as needed
      const darkerStrokeColor = d3.color(fillColor).darker(0.5);
      return (
        <g key={i}>
          <defs>
            <linearGradient id={`gradient-${i}`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={fillColor} />
              <stop offset="100%" stopColor={lighterFillColor} />
            </linearGradient>
          </defs>
          <path
            d={path}
            opacity={2}
            fill={`url(#gradient-${i})`}
            fillOpacity={0.7} // Fixed fill opacity
            stroke={darkerStrokeColor}
            strokeWidth={2}
          />
        </g>
      );
    });
    
  return (
    <div>
      <svg width={width} height={height}>
        <g
          width={boundsWidth}
          height={boundsHeight}
          transform={`translate(${[MARGIN.left, MARGIN.top].join(",")})`}
        >
          {/* Dotted lines are drawn before the paths */}
          <g
            className="dotted-lines"
            transform={`translate(0,0)`}
          />
          {allPath}
        </g>
        <g
          width={boundsWidth}
          height={boundsHeight}
          ref={axesRef}
          transform={`translate(${[MARGIN.left, MARGIN.top].join(",")})`}
        />
      </svg>
    </div>
  );
};

export default StackedAreaChart;
