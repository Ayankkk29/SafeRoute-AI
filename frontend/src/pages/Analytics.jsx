import React, { useEffect, useState } from 'react';
import { fetchAnalytics } from '../services/api';
import FilterBar from '../components/FilterBar';
import { BarChart3, CloudRain, Car, Clock, Calendar, MapPin, Activity } from 'lucide-react';
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line, AreaChart, Area
} from 'recharts';

export default function Analytics() {
  const [filters, setFilters] = useState({
    city: 'All',
    weather: 'All',
    severity: 'All',
    road_type: 'All'
  });

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadData = () => {
    setLoading(true);
    fetchAnalytics(filters)
      .then((res) => {
        setData(res);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Analytics fetch error:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    loadData();
  }, [filters]);

  const handleReset = () => {
    setFilters({ city: 'All', weather: 'All', severity: 'All', road_type: 'All' });
  };

  if (loading && !data) {
    return (
      <div className="flex items-center justify-center h-64 text-slate-400">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-400 mr-3"></div>
        Loading Interactive Analytics...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
            <BarChart3 className="h-6 w-6 text-amber-400" />
            Accident Risk Analytics Dashboard
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Multidimensional analytics and contextual trends filtered across weather, road type, day, and time.
          </p>
        </div>
      </div>

      <FilterBar filters={filters} setFilters={setFilters} onReset={handleReset} />

      {data && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Accidents by Hour */}
          <div className="bg-slate-800/80 p-5 rounded-xl border border-slate-700 shadow-md">
            <h3 className="font-bold text-slate-200 mb-4 flex items-center gap-2">
              <Clock className="h-5 w-5 text-amber-400" />
              Accidents by Hour of Day (00:00 - 23:00)
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data.hour_distribution}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="hour" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip contentStyle={{ backgroundColor: '#1e293b', borderColor: '#475569' }} />
                  <Area type="monotone" dataKey="count" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Accidents by Day of Week */}
          <div className="bg-slate-800/80 p-5 rounded-xl border border-slate-700 shadow-md">
            <h3 className="font-bold text-slate-200 mb-4 flex items-center gap-2">
              <Calendar className="h-5 w-5 text-amber-400" />
              Accidents by Day of Week
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data.day_of_week_distribution}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="name" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip contentStyle={{ backgroundColor: '#1e293b', borderColor: '#475569' }} />
                  <Bar dataKey="value" fill="#3b82f6" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Accidents by Traffic Density */}
          <div className="bg-slate-800/80 p-5 rounded-xl border border-slate-700 shadow-md">
            <h3 className="font-bold text-slate-200 mb-4 flex items-center gap-2">
              <Activity className="h-5 w-5 text-amber-400" />
              Accidents by Traffic Density
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data.traffic_density_distribution}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="name" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip contentStyle={{ backgroundColor: '#1e293b', borderColor: '#475569' }} />
                  <Bar dataKey="value" fill="#ec4899" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Accidents by City */}
          <div className="bg-slate-800/80 p-5 rounded-xl border border-slate-700 shadow-md">
            <h3 className="font-bold text-slate-200 mb-4 flex items-center gap-2">
              <MapPin className="h-5 w-5 text-amber-400" />
              Accidents by City
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data.city_distribution} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis type="number" stroke="#94a3b8" />
                  <YAxis dataKey="name" type="category" stroke="#94a3b8" width={90} />
                  <Tooltip contentStyle={{ backgroundColor: '#1e293b', borderColor: '#475569' }} />
                  <Bar dataKey="value" fill="#10b981" radius={[0, 6, 6, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
