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

export default function HourlyChart({ hourlyData, tempKey, unitSymbol }) {
  return (
    <div className={styles.chartWrapper}>
      <h3>Hourly Temperature (Next 24h)</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={hourlyData}
          margin={{ top: 5, right: 30, left: -20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
          <XAxis dataKey="time" stroke="#333" />
          <YAxis
            stroke="#333"
            tickFormatter={(value) => `${Math.round(value)}${unitSymbol}`}
          />
          <Tooltip
            formatter={(value) => [`${Math.round(value)}${unitSymbol}`, "Temp"]}
            labelFormatter={(label) => `Time: ${label}`}
          />
          <Line
            type="monotone"
            dataKey={tempKey}
            stroke="#007bff"
            strokeWidth={3}
            dot={{ r: 5 }}
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}