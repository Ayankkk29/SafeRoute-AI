import React from 'react';

export default function ConfusionMatrix({ matrix, labels }) {
  if (!matrix || !labels) return null;

  // Find max value for color intensity
  const maxVal = Math.max(...matrix.flat(), 1);

  return (
    <div className="overflow-x-auto">
      <div className="inline-block min-w-full">
        <table className="border-collapse text-center mx-auto">
          <thead>
            <tr>
              <th className="p-2 text-xs font-semibold text-slate-400">Actual \ Predicted</th>
              {labels.map((lbl) => (
                <th key={lbl} className="p-2 text-xs font-semibold text-amber-400 border border-slate-700">
                  {lbl}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {matrix.map((row, i) => (
              <tr key={labels[i]}>
                <td className="p-2 text-xs font-semibold text-amber-400 border border-slate-700 bg-slate-800">
                  {labels[i]}
                </td>
                {row.map((val, j) => {
                  const intensity = Math.min(Math.round((val / maxVal) * 100), 100);
                  const isDiagonal = i === j;
                  const bgClass = isDiagonal
                    ? `bg-amber-500/${Math.max(intensity, 20)} text-amber-200 font-bold`
                    : `bg-slate-700/${Math.max(intensity, 10)} text-slate-300`;

                  return (
                    <td
                      key={j}
                      className={`p-4 text-sm border border-slate-700 font-mono transition-all ${bgClass}`}
                    >
                      {val}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
