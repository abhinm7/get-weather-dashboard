import React from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import styles from './Chart.module.css'; 

export default function WindChart({ hourlyWindData, currentUnit }) {
  
  const speedKey = currentUnit === 'celsius' ? 'speed_ms' : 'speed_mph';
  const unitSymbol = currentUnit === 'celsius' ? 'm/s' : 'mph';

  // Custom Tooltip Formatter
  const renderTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className={styles.tooltip}>
          <p className={styles.tooltipLabel}>{`Time: ${label}`}</p>
          <p>{`Speed: ${data[speedKey].toFixed(1)} ${unitSymbol}`}</p>
          <p>{`Direction: ${data.direction_str} (${data.direction_deg}°)`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className={styles.chartWrapper}>
      <h3>Hourly Wind (Next 24h)</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={hourlyWindData}
          margin={{ top: 5, right: 30, left: -20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
          <XAxis dataKey="time" stroke="#333" />
          <YAxis
            stroke="#333"
            tickFormatter={(value) => `${Math.round(value)} ${unitSymbol}`}
          />
          <Tooltip content={renderTooltip} />
          <Line
            type="monotone"
            dataKey={speedKey}
            name="Wind Speed"
            stroke="#27AE60"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}