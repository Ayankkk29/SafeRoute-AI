import React from 'react';

export default function StatCard({ title, value, subtitle, icon: Icon, color = 'blue' }) {
  const colorMap = {
    blue: 'border-blue-500/30 bg-blue-500/10 text-blue-400',
    red: 'border-red-500/30 bg-red-500/10 text-red-400',
    amber: 'border-amber-500/30 bg-amber-500/10 text-amber-400',
    emerald: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400',
    purple: 'border-purple-500/30 bg-purple-500/10 text-purple-400',
  };

  const badgeStyle = colorMap[color] || colorMap.blue;

  return (
    <div className="bg-slate-800/80 rounded-xl border border-slate-700/60 p-5 shadow-lg backdrop-blur flex flex-col justify-between">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">{title}</span>
        {Icon && (
          <div className={`p-2 rounded-lg border ${badgeStyle}`}>
            <Icon className="h-5 w-5" />
          </div>
        )}
      </div>
      <div className="mt-4">
        <div className="text-3xl font-extrabold tracking-tight text-white">{value}</div>
        {subtitle && <p className="text-xs text-slate-400 mt-1">{subtitle}</p>}
      </div>
    </div>
  );
}
