import React, { useState } from 'react';

interface StockChartProps {
  data: number[];
  color: string;
}

const StockChart: React.FC<StockChartProps> = ({ data, color }) => {
  const [hoverData, setHoverData] = useState<{ x: number; y: number; value: number; time: string } | null>(null);

  // ViewBox dimensions
  const width = 150;
  const height = 60;
  const yPadding = 4;

  if (data.length < 2) {
    return <div className="w-full h-full" />;
  }

  // Data calculations
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min === 0 ? 1 : max - min;

  const points = data.map((p, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - ((p - min) / range) * (height - yPadding * 2) + yPadding;
    return { x, y, value: p, index: i };
  });

  const path = points.map(p => `${p.x.toFixed(2)},${p.y.toFixed(2)}`).join(' ');
  const areaPath = `${path} ${width},${height} 0,${height}`;
  
  const gradientId = `gradient-${color.replace('#', '')}`;

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    const svg = e.currentTarget;
    const rect = svg.getBoundingClientRect();
    const svgX = ((e.clientX - rect.left) / rect.width) * width;

    // Find the closest point by x-coordinate
    const closestPoint = points.reduce((prev, curr) => 
      Math.abs(curr.x - svgX) < Math.abs(prev.x - svgX) ? curr : prev
    );
    
    // Calculate relative time (assumes 5s interval from useStockPrices)
    const timeAgo = (data.length - 1 - closestPoint.index) * 5;
    const timeLabel = timeAgo === 0 ? 'Now' : `${timeAgo}s ago`;

    setHoverData({ ...closestPoint, time: timeLabel });
  };
  
  const handleMouseLeave = () => {
    setHoverData(null);
  };

  const formatCurrency = (value: number) => {
    return value.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    });
  };

  // Tooltip positioning logic
  const tooltipWidth = 50;
  const tooltipHeight = 24;
  let tooltipX = hoverData ? hoverData.x + 8 : 0;
  let tooltipY = hoverData ? hoverData.y - (tooltipHeight / 2) : 0;
  
  if (hoverData) {
    if (tooltipX + tooltipWidth > width) {
      tooltipX = hoverData.x - tooltipWidth - 8;
    }
    if (tooltipY < 0) tooltipY = 2;
    if (tooltipY + tooltipHeight > height) tooltipY = height - tooltipHeight - 2;
  }

  return (
    <svg 
      viewBox={`0 0 ${width} ${height}`} 
      preserveAspectRatio="none" 
      className="w-full h-full overflow-visible"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity={0.3} />
          <stop offset="100%" stopColor={color} stopOpacity={0} />
        </linearGradient>
      </defs>
      <polyline
        fill="none"
        stroke={color}
        strokeWidth="1"
        points={path}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ vectorEffect: 'non-scaling-stroke' }} 
      />
      <polygon fill={`url(#${gradientId})`} points={areaPath} />
      
      {hoverData && (
        <g style={{ pointerEvents: 'none' }}>
          <line
            x1={hoverData.x}
            y1={0}
            x2={hoverData.x}
            y2={height}
            stroke="#9ca3af"
            strokeWidth="0.5"
            strokeDasharray="2,2"
          />
          <circle
            cx={hoverData.x}
            cy={hoverData.y}
            r="2"
            fill={color}
            stroke="#1E1E1E"
            strokeWidth="1"
            style={{ vectorEffect: 'non-scaling-stroke' }} 
          />
          
          <g transform={`translate(${tooltipX}, ${tooltipY})`}>
            <rect 
              width={tooltipWidth} 
              height={tooltipHeight} 
              rx="2" 
              ry="2" 
              fill="#1E1E1E" 
              stroke="#4b5563"
              strokeWidth="0.5"
            />
            <text 
              x={tooltipWidth / 2} 
              y={10} 
              fontSize="6" 
              fill="#f9fafb" 
              textAnchor="middle"
              fontWeight="bold"
            >
              {formatCurrency(hoverData.value)}
            </text>
            <text 
              x={tooltipWidth / 2} 
              y={19} 
              fontSize="5" 
              fill="#d1d5db" 
              textAnchor="middle"
            >
              {hoverData.time}
            </text>
          </g>
        </g>
      )}
    </svg>
  );
};

export default StockChart;
