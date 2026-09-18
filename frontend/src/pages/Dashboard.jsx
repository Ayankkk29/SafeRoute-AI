import React, { useEffect, useState } from 'react';
import { fetchAnalytics } from '../services/api';
import StatCard from '../components/StatCard';
import {
  Car, AlertTriangle, Skull, CloudRain, Building2, Brain, BarChart, PieChart as PieIcon
} from 'lucide-react';
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart as ReBarChart, Bar, XAxis, YAxis, CartesianGrid, Legend
} from 'recharts';

export default function Dashboard({ setActiveTab }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics()
      .then((res) => {
        setData(res);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Dashboard analytics error:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 text-slate-400">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-400 mr-3"></div>
        Loading Academic Dashboard...
      </div>
    );
  }

  if (!data) return <div className="text-red-400 p-6">Failed to load analytics data.</div>;

  const COLORS = ['#3b82f6', '#f59e0b', '#ef4444', '#10b981', '#8b5cf6', '#ec4899'];

  const riskPieData = [
    { name: 'Low Risk (0.00-0.33)', value: data.risk_categories.low, color: '#10b981' },
    { name: 'Medium Risk (0.34-0.66)', value: data.risk_categories.medium, color: '#f59e0b' },
    { name: 'High Risk (0.67-1.00)', value: data.risk_categories.high, color: '#ef4444' },
  ];

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-gradient-to-r from-slate-800 via-slate-800 to-amber-950/40 p-6 rounded-2xl border border-slate-700/80 shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Academic Decision-Support Dashboard
          </h1>
          <p className="text-slate-400 text-sm mt-1 max-w-2xl">
            Historical Road Accident Severity & Risk Analytics system based on 20,000+ records from Indian Road Accident Dataset 2022–2025.
          </p>
        </div>
        <button
          onClick={() => setActiveTab('prediction')}
          className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-5 py-2.5 rounded-xl transition-all shadow-lg hover:shadow-amber-500/25 flex items-center space-x-2"
        >
          <Brain className="h-5 w-5" />
          <span>Predict Severity</span>
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Accidents"
          value={data.total_accidents.toLocaleString()}
          subtitle="Analyzed historical dataset records"
          icon={Car}
          color="blue"
        />
        <StatCard
          title="Average Risk Score"
          value={data.average_risk_score}
          subtitle="Scale 0.00 (Low) to 1.00 (High)"
          icon={AlertTriangle}
          color="amber"
        />
        <StatCard
          title="Fatal Accidents"
          value={data.fatal_accidents.toLocaleString()}
          subtitle={`${((data.fatal_accidents / data.total_accidents) * 100).toFixed(1)}% of total accidents`}
          icon={Skull}
          color="red"
        />
        <StatCard
          title="Best ML Model"
          value={data.best_ml_model}
          subtitle={`Weighted F1-Score: ${(data.best_model_f1 * 100).toFixed(1)}%`}
          icon={Brain}
          color="emerald"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <StatCard
          title="Most Common Weather"
          value={data.most_common_weather}
          subtitle="Highest frequency atmospheric condition"
          icon={CloudRain}
          color="purple"
        />
        <StatCard
          title="Highest Accident City"
          value={data.highest_accident_city}
          subtitle="City with maximum recorded cases"
          icon={Building2}
          color="blue"
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Severity Distribution */}
        <div className="bg-slate-800/80 p-5 rounded-xl border border-slate-700 shadow-md">
          <div className="flex items-center space-x-2 mb-4">
            <PieIcon className="h-5 w-5 text-amber-400" />
            <h3 className="font-bold text-slate-200">Accident Severity Distribution</h3>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data.severity_distribution}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(1)}%`}
                >
                  {data.severity_distribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#1e293b', borderColor: '#475569' }} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Risk Categories */}
        <div className="bg-slate-800/80 p-5 rounded-xl border border-slate-700 shadow-md">
          <div className="flex items-center space-x-2 mb-4">
            <BarChart className="h-5 w-5 text-amber-400" />
            <h3 className="font-bold text-slate-200">Dataset Risk Score Categories</h3>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={riskPieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={4}
                  label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
                >
                  {riskPieData.map((entry, index) => (
                    <Cell key={`cell-risk-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#1e293b', borderColor: '#475569' }} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Accidents by Weather */}
        <div className="bg-slate-800/80 p-5 rounded-xl border border-slate-700 shadow-md">
          <h3 className="font-bold text-slate-200 mb-4 flex items-center gap-2">
            <CloudRain className="h-5 w-5 text-amber-400" />
            Accidents by Weather Condition
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <ReBarChart data={data.weather_distribution}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="name" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip contentStyle={{ backgroundColor: '#1e293b', borderColor: '#475569' }} />
                <Bar dataKey="value" fill="#3b82f6" radius={[6, 6, 0, 0]} />
              </ReBarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Accidents by Road Type */}
        <div className="bg-slate-800/80 p-5 rounded-xl border border-slate-700 shadow-md">
          <h3 className="font-bold text-slate-200 mb-4 flex items-center gap-2">
            <Car className="h-5 w-5 text-amber-400" />
            Accidents by Road Type
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <ReBarChart data={data.road_type_distribution}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="name" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip contentStyle={{ backgroundColor: '#1e293b', borderColor: '#475569' }} />
                <Bar dataKey="value" fill="#f59e0b" radius={[6, 6, 0, 0]} />
              </ReBarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
