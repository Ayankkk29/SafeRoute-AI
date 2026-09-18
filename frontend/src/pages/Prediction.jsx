import React, { useState } from 'react';
import { predictSeverity } from '../services/api';
import { BrainCircuit, CheckCircle2, AlertCircle, ShieldAlert, Sparkles } from 'lucide-react';

export default function Prediction() {
  const [formData, setFormData] = useState({
    city: 'Pune',
    road_type: 'highway',
    lanes: 3,
    traffic_signal: 1,
    weather: 'clear',
    visibility: 'high',
    temperature: 30,
    traffic_density: 'high',
    hour: 18,
    day_of_week: 'Friday',
    is_weekend: 0,
    is_peak_hour: 1,
    festival: 'None'
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await predictSeverity(formData);
      setResult(res);
    } catch (err) {
      console.error("Prediction error:", err);
      setError("Failed to run prediction. Please check inputs and ensure backend API is running.");
    } finally {
      setLoading(false);
    }
  };

  const getSeverityBadge = (severity) => {
    switch (severity?.toLowerCase()) {
      case 'fatal':
        return 'bg-red-500/20 text-red-400 border-red-500/40';
      case 'major':
        return 'bg-amber-500/20 text-amber-400 border-amber-500/40';
      case 'minor':
      default:
        return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40';
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700 shadow-xl">
        <div className="flex items-center space-x-3 mb-2">
          <div className="p-2 bg-amber-500/20 rounded-lg border border-amber-500/30">
            <BrainCircuit className="h-6 w-6 text-amber-400" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-white">Accident Severity Prediction</h1>
            <p className="text-slate-400 text-sm">
              Input road, temporal, and environmental factors to obtain real ML model severity classification & confidence output.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* City */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">City</label>
              <select
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-sm text-slate-200 focus:outline-none focus:border-amber-500"
              >
                {['Pune', 'Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Hyderabad', 'Kolkata', 'Chandigarh'].map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            {/* Road Type */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Road Type</label>
              <select
                name="road_type"
                value={formData.road_type}
                onChange={handleChange}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-sm text-slate-200 focus:outline-none focus:border-amber-500"
              >
                <option value="highway">Highway</option>
                <option value="urban">Urban Road</option>
                <option value="rural">Rural Road</option>
              </select>
            </div>

            {/* Lanes */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Number of Lanes</label>
              <input
                type="number"
                name="lanes"
                min="1"
                max="8"
                value={formData.lanes}
                onChange={handleChange}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-sm text-slate-200 focus:outline-none focus:border-amber-500"
              />
            </div>

            {/* Traffic Signal */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Traffic Signal Present</label>
              <select
                name="traffic_signal"
                value={formData.traffic_signal}
                onChange={handleChange}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-sm text-slate-200 focus:outline-none focus:border-amber-500"
              >
                <option value={1}>Yes (Signal Present)</option>
                <option value={0}>No Signal</option>
              </select>
            </div>

            {/* Weather */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Weather Condition</label>
              <select
                name="weather"
                value={formData.weather}
                onChange={handleChange}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-sm text-slate-200 focus:outline-none focus:border-amber-500"
              >
                <option value="clear">Clear</option>
                <option value="rain">Rain</option>
                <option value="fog">Fog</option>
              </select>
            </div>

            {/* Visibility */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Visibility Level</label>
              <select
                name="visibility"
                value={formData.visibility}
                onChange={handleChange}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-sm text-slate-200 focus:outline-none focus:border-amber-500"
              >
                <option value="high">High Visibility</option>
                <option value="medium">Medium Visibility</option>
                <option value="low">Low Visibility</option>
              </select>
            </div>

            {/* Temperature */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Temperature (°C)</label>
              <input
                type="number"
                name="temperature"
                value={formData.temperature}
                onChange={handleChange}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-sm text-slate-200 focus:outline-none focus:border-amber-500"
              />
            </div>

            {/* Traffic Density */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Traffic Density</label>
              <select
                name="traffic_density"
                value={formData.traffic_density}
                onChange={handleChange}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-sm text-slate-200 focus:outline-none focus:border-amber-500"
              >
                <option value="low">Low Traffic</option>
                <option value="medium">Medium Traffic</option>
                <option value="high">High Traffic</option>
              </select>
            </div>

            {/* Hour */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Hour of Day (0 - 23)</label>
              <input
                type="number"
                name="hour"
                min="0"
                max="23"
                value={formData.hour}
                onChange={handleChange}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-sm text-slate-200 focus:outline-none focus:border-amber-500"
              />
            </div>

            {/* Day of Week */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Day of Week</label>
              <select
                name="day_of_week"
                value={formData.day_of_week}
                onChange={handleChange}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-sm text-slate-200 focus:outline-none focus:border-amber-500"
              >
                {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>

            {/* Weekend */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Is Weekend?</label>
              <select
                name="is_weekend"
                value={formData.is_weekend}
                onChange={handleChange}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-sm text-slate-200 focus:outline-none focus:border-amber-500"
              >
                <option value={0}>No (Weekday)</option>
                <option value={1}>Yes (Weekend)</option>
              </select>
            </div>

            {/* Peak Hour */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Is Peak Hour?</label>
              <select
                name="is_peak_hour"
                value={formData.is_peak_hour}
                onChange={handleChange}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-sm text-slate-200 focus:outline-none focus:border-amber-500"
              >
                <option value={0}>No</option>
                <option value={1}>Yes (Rush Hour)</option>
              </select>
            </div>

            {/* Festival */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Festival Context</label>
              <select
                name="festival"
                value={formData.festival}
                onChange={handleChange}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-sm text-slate-200 focus:outline-none focus:border-amber-500"
              >
                <option value="None">None (Regular Day)</option>
                <option value="Diwali">Diwali</option>
                <option value="Holi">Holi</option>
                <option value="Eid">Eid</option>
                <option value="New Year">New Year</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold py-3.5 rounded-xl transition-all shadow-lg hover:shadow-amber-500/25 flex items-center justify-center space-x-2"
          >
            {loading ? (
              <span className="flex items-center">
                <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-slate-950 mr-2"></span>
                Evaluating ML Model...
              </span>
            ) : (
              <>
                <Sparkles className="h-5 w-5" />
                <span>Predict Accident Severity</span>
              </>
            )}
          </button>
        </form>

        {error && (
          <div className="mt-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl flex items-center space-x-3 text-red-400">
            <AlertCircle className="h-5 w-5 flex-shrink-0" />
            <p className="text-sm">{error}</p>
          </div>
        )}

        {/* Prediction Results Box */}
        {result && (
          <div className="mt-8 p-6 bg-slate-900/90 rounded-xl border border-amber-500/40 shadow-2xl space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-slate-800 pb-4 gap-2">
              <div>
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Model Prediction Output</span>
                <div className="flex items-center space-x-3 mt-1">
                  <span className="text-2xl font-extrabold text-white">Predicted Severity:</span>
                  <span className={`text-xl font-bold px-3 py-1 rounded-lg border ${getSeverityBadge(result.predicted_severity)}`}>
                    {result.predicted_severity}
                  </span>
                </div>
              </div>
              <div className="text-left sm:text-right">
                <span className="text-xs text-slate-400">Prediction Confidence</span>
                <div className="text-2xl font-extrabold text-amber-400">{result.confidence_percentage}%</div>
              </div>
            </div>

            {/* Class Probabilities Progress Bars */}
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Class Probability Breakdown</h4>
              {Object.entries(result.class_probabilities || {}).map(([cls, prob]) => {
                const pct = (prob * 100).toFixed(1);
                return (
                  <div key={cls} className="space-y-1">
                    <div className="flex justify-between text-xs text-slate-300 font-medium">
                      <span>{cls}</span>
                      <span>{pct}%</span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-2.5 overflow-hidden">
                      <div
                        className={`h-2.5 rounded-full transition-all duration-500 ${
                          cls === result.predicted_severity ? 'bg-amber-400' : 'bg-slate-600'
                        }`}
                        style={{ width: `${pct}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
