import { useEffect, useMemo, useRef } from "react";
import * as d3 from "d3";

const MARGIN = { top: 30, right: 30, bottom: 50, left: 50 };

const AreaChart = ({ width, height, data }) => {
  const axesRef = useRef(null);
  const boundsWidth = width - MARGIN.right - MARGIN.left;
  const boundsHeight = height - MARGIN.top - MARGIN.bottom;

  // Parse dates from the data
  data.forEach(d => {
    d.date = new Date(d.date); // Assuming 'date' is the property for the date
  });

  const [min, max] = d3.extent(data, (d) => d.revenue);
  const yScale = useMemo(() => {
    return d3
      .scaleLinear()
      .domain([0, max || 0])
      .range([boundsHeight, 0]);
  }, [data, height]);

  const [dateMin, dateMax] = d3.extent(data, (d) => d.date);
  const xScale = useMemo(() => {
    return d3
      .scaleTime()
      .domain([dateMin || 0, dateMax || 0])
      .range([0, boundsWidth]);
  }, [data, width]);

  useEffect(() => {
    const svgElement = d3.select(axesRef.current);
    svgElement.selectAll("*").remove();
    const xAxisGenerator = d3.axisBottom(xScale).tickFormat(d3.timeFormat("%b %d")); // Format dates as desired
    svgElement
      .append("g")
      .attr("transform", "translate(0," + boundsHeight + ")")
      .call(xAxisGenerator);

    const yAxisGenerator = d3.axisLeft(yScale).tickFormat(d => `$${(d / 1000).toFixed(1)}K`); // Prefix ticks with '$' and postfix with 'K'
    svgElement.append("g").call(yAxisGenerator);

    // Add dotted horizontal lines with minimal style
    svgElement.selectAll(".dotted-line")
      .data(yScale.ticks())
      .enter().append("line")
      .attr("class", "dotted-line")
      .attr("x1", 0)
      .attr("x2", boundsWidth)
      .attr("y1", d => yScale(d))
      .attr("y2", d => yScale(d))
      .style("stroke", "#ddd") // Light gray color
      .style("stroke-width", 1) // Reduced stroke width
      .style("stroke-dasharray", "1,1") // Shorter dashes
      .style("opacity", 0.2); // Reduced opacity
  }, [xScale, yScale, boundsHeight]);

  const areaBuilder = d3
    .area()
    .x((d) => xScale(d.date))
    .y1((d) => yScale(d.revenue))
    .y0(yScale(0));
  const areaPath = areaBuilder(data);

  const lineBuilder = d3
    .line()
    .x((d) => xScale(d.date))
    .y((d) => yScale(d.revenue));
  const linePath = lineBuilder(data);

  if (!linePath || !areaPath) {
    return null;
  }

  return (
    <div>
      <svg width={width} height={height}>
        <defs>
          <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#4cceac" />
            <stop offset="100%" stopColor="rgba(144, 238, 144, 0)" />
          </linearGradient>
        </defs>
        <g
          width={boundsWidth}
          height={boundsHeight}
          transform={`translate(${[MARGIN.left, MARGIN.top].join(",")})`}
        >
          <path
            d={areaPath}
            opacity={1}
            stroke="none"
            fill="url(#areaGradient)" // Use the gradient fill
          />
          <path
            d={linePath}
            opacity={1}
            stroke="#32CD32" // Brighter green color
            fill="none"
            strokeWidth={3} // Increased stroke width for better visibility
          />
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

export default AreaChart;
