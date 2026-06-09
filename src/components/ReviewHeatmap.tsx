import React from 'react';
import { DayCount } from '../utils/analytics';

interface ReviewHeatmapProps {
  data: DayCount[];
  weeks?: number;
}

// A compact GitHub-style contribution heatmap of daily review counts.
function intensity(count: number): string {
  if (count === 0) return '#ebedf0';
  if (count < 5) return '#9be9a8';
  if (count < 10) return '#40c463';
  if (count < 20) return '#30a14e';
  return '#216e39';
}

const ReviewHeatmap: React.FC<ReviewHeatmapProps> = ({ data, weeks = 12 }) => {
  const counts = new Map(data.map((d) => [d.date, d.count]));
  const days = weeks * 7;
  const cells: { key: string; count: number }[] = [];

  const today = new Date();
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(today.getTime());
    d.setDate(d.getDate() - i);
    const key = d.toISOString().slice(0, 10);
    cells.push({ key, count: counts.get(key) ?? 0 });
  }

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateRows: 'repeat(7, 12px)',
        gridAutoFlow: 'column',
        gap: 3,
      }}
    >
      {cells.map((cell) => (
        <div
          key={cell.key}
          title={`${cell.key}: ${cell.count} reviews`}
          style={{ width: 12, height: 12, borderRadius: 2, background: intensity(cell.count) }}
        />
      ))}
    </div>
  );
};

export default ReviewHeatmap;
