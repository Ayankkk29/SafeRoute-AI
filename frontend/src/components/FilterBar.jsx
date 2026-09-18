import React from 'react';
import { Filter, RotateCcw } from 'lucide-react';

export default function FilterBar({ filters, setFilters, onReset }) {
  const cities = ['All', 'Pune', 'Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Hyderabad', 'Kolkata', 'Chandigarh'];
  const weathers = ['All', 'Clear', 'Rain', 'Fog'];
  const severities = ['All', 'Minor', 'Major', 'Fatal'];
  const roadTypes = ['All', 'Highway', 'Urban', 'Rural'];

  const handleChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="bg-slate-800/90 rounded-xl border border-slate-700 p-4 mb-6 flex flex-wrap items-center gap-4">
      <div className="flex items-center space-x-2 text-amber-400 font-semibold text-sm mr-2">
        <Filter className="h-4 w-4" />
        <span>Filter Analytics:</span>
      </div>

      <div className="flex flex-col">
        <label className="text-xs text-slate-400 mb-1">City</label>
        <select
          value={filters.city || 'All'}
          onChange={(e) => handleChange('city', e.target.value)}
          className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-sm text-slate-200 focus:outline-none focus:border-amber-500"
        >
          {cities.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      <div className="flex flex-col">
        <label className="text-xs text-slate-400 mb-1">Weather</label>
        <select
          value={filters.weather || 'All'}
          onChange={(e) => handleChange('weather', e.target.value)}
          className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-sm text-slate-200 focus:outline-none focus:border-amber-500"
        >
          {weathers.map((w) => (
            <option key={w} value={w}>{w}</option>
          ))}
        </select>
      </div>

      <div className="flex flex-col">
        <label className="text-xs text-slate-400 mb-1">Severity</label>
        <select
          value={filters.severity || 'All'}
          onChange={(e) => handleChange('severity', e.target.value)}
          className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-sm text-slate-200 focus:outline-none focus:border-amber-500"
        >
          {severities.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      <div className="flex flex-col">
        <label className="text-xs text-slate-400 mb-1">Road Type</label>
        <select
          value={filters.road_type || 'All'}
          onChange={(e) => handleChange('road_type', e.target.value)}
          className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-sm text-slate-200 focus:outline-none focus:border-amber-500"
        >
          {roadTypes.map((r) => (
            <option key={r} value={r}>{r}</option>
          ))}
        </select>
      </div>

      {onReset && (
        <button
          onClick={onReset}
          className="mt-auto flex items-center space-x-1 text-xs text-slate-400 hover:text-amber-400 border border-slate-700 px-3 py-2 rounded-lg hover:border-amber-500/50 transition-colors"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          <span>Reset</span>
        </button>
      )}
    </div>
  );
}
