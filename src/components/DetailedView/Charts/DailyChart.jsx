import React from 'react';
import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from 'recharts';
import styles from './Chart.module.css';

export default function DailyChart({ dailyData, currentUnit, unitSymbol }) {
  return (
    <div className={styles.chartWrapper}>
      <h3>5-Day Forecast</h3>
      <ResponsiveContainer width="100%" height={400}>
        <ComposedChart
          data={dailyData}
          margin={{ top: 20, right: 30, left: -20, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
          <XAxis dataKey="day" stroke="#333" />
          <YAxis
            yAxisId="temp"
            stroke="#8884d8"
            tickFormatter={(value) => `${Math.round(value)}${unitSymbol}`}
          />
          <YAxis
            yAxisId="precip"
            orientation="right"
            stroke="#82ca9d"
            tickFormatter={(value) => `${value}%`}
            domain={[0, 100]}
          />
          <Tooltip formatter={(value, name) => {
            if (name.includes('Temp')) {
              return [`${Math.round(value)}${unitSymbol}`, name];
            }
            return [`${value}%`, name];
          }} />
          <Legend />
          <Bar
            yAxisId="temp"
            dataKey={currentUnit === 'celsius' ? 'HighC' : 'HighF'}
            name="High Temp"
            fill="#ff7300"
          />
          <Bar
            yAxisId="temp"
            dataKey={currentUnit === 'celsius' ? 'LowC' : 'LowF'}
            name="Low Temp"
            fill="#007bff"
          />
          <Line
            yAxisId="precip"
            type="monotone"
            dataKey="Precipitation"
            stroke="#38A169"
            strokeWidth={3}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}