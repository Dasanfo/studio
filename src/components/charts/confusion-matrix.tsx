import type { ConfusionMatrix } from '@/lib/types';
import { cn } from '@/lib/utils';

type ConfusionMatrixProps = {
  data: ConfusionMatrix;
};

// Helper to get color based on value, max value, and whether it's on the diagonal
function getCellColor(value: number, max: number, isDiagonal: boolean) {
  if (isDiagonal) {
    // Green scale for correct predictions
    const intensity = Math.min(100, 20 + (value / max) * 80);
    return `hsl(140 80% ${100 - intensity / 2}%)`;
  }
  // Red/Orange scale for incorrect predictions
  const intensity = Math.min(100, (value / max) * 100);
  if (intensity < 1) return 'transparent';
  return `hsl(15 ${Math.floor(intensity)}% ${100 - intensity/2.5}%)`;
}

function getTextColor(value: number, max: number, isDiagonal: boolean) {
    if (isDiagonal) {
      const intensity = Math.min(100, 20 + (value / max) * 80);
      return intensity > 50 ? 'hsl(140 80% 10%)' : 'hsl(140 80% 90%)';
    }
    const intensity = Math.min(100, (value / max) * 100);
    if (intensity < 1) return 'hsl(var(--foreground))';
    return intensity > 50 ? 'hsl(15 80% 10%)' : 'hsl(15 80% 90%)';
  }

export function ConfusionMatrixHeatmap({ data }: ConfusionMatrixProps) {
  const { labels, matrix } = data;
  const maxOffDiagonal = Math.max(...matrix.flat().filter((_, i) => i % (labels.length + 1) !== 0));
  const maxDiagonal = Math.max(...matrix.map((row, i) => row[i]));

  return (
    <div className="overflow-x-auto">
      <div className="flex">
        <div className="sticky left-0 z-10 flex flex-col items-end pr-2 py-2 bg-background">
            <div className="h-16 w-24 flex items-end justify-end text-sm font-semibold text-muted-foreground">
                Predicted
            </div>
            <div className="w-24 text-sm font-semibold text-muted-foreground transform -rotate-90 origin-center translate-y-1/2">
                Actual
            </div>
        </div>
        <div className="relative">
            <table className="min-w-full border-collapse">
            <thead>
                <tr>
                {labels.map((label) => (
                    <th key={label} className="h-16 p-2 text-sm font-semibold text-center align-bottom whitespace-nowrap">
                    {label}
                    </th>
                ))}
                </tr>
            </thead>
            <tbody>
                {matrix.map((row, rowIndex) => (
                <tr key={rowIndex}>
                    <th className="sticky left-0 z-10 w-24 p-2 text-sm font-semibold text-right whitespace-nowrap bg-background">
                        {labels[rowIndex]}
                    </th>
                    {row.map((value, colIndex) => {
                    const isDiagonal = rowIndex === colIndex;
                    const max = isDiagonal ? maxDiagonal : maxOffDiagonal;
                    const bgColor = getCellColor(value, max, isDiagonal);
                    const textColor = getTextColor(value, max, isDiagonal);
                    return (
                        <td
                        key={colIndex}
                        className={cn(
                            'w-16 h-16 border text-center font-mono font-medium transition-colors',
                            'hover:shadow-inner hover:ring-2 hover:ring-ring'
                        )}
                        style={{ backgroundColor: bgColor, color: textColor }}
                        >
                        {value}
                        </td>
                    );
                    })}
                </tr>
                ))}
            </tbody>
            </table>
        </div>
      </div>
    </div>
  );
}
