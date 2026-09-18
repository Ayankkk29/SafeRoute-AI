import React, { useEffect, useState } from 'react';
import { fetchAccidents } from '../services/api';
import FilterBar from '../components/FilterBar';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import { MapPin, Info, AlertTriangle } from 'lucide-react';
import 'leaflet/dist/leaflet.css';

export default function RiskMap() {
  const [filters, setFilters] = useState({
    city: 'All',
    weather: 'All',
    severity: 'All',
    road_type: 'All'
  });

  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchAccidents({ ...filters, limit: 300 })
      .then((data) => {
        setRecords(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Map fetch error:", err);
        setLoading(false);
      });
  }, [filters]);

  const handleReset = () => {
    setFilters({ city: 'All', weather: 'All', severity: 'All', road_type: 'All' });
  };

  // Center of India map (approx 20.5937, 78.9629)
  const mapCenter = [20.5937, 78.9629];

  const getMarkerColor = (riskScore) => {
    if (riskScore <= 0.33) return '#10b981'; // Green (Low Risk)
    if (riskScore <= 0.66) return '#f59e0b'; // Amber (Medium Risk)
    return '#ef4444'; // Red (High Risk)
  };

  return (
    <div className="space-y-6">
      <div className="bg-slate-800/80 p-5 rounded-xl border border-slate-700 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
            <MapPin className="h-6 w-6 text-amber-400" />
            Accident Risk Hotspot Map
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Geospatial visualization of historical accident locations and risk score categories.
          </p>
        </div>
      </div>

      {/* Academic Disclaimer Banner */}
      <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl flex items-start space-x-3 text-amber-300 text-xs sm:text-sm">
        <Info className="h-5 w-5 text-amber-400 flex-shrink-0 mt-0.5" />
        <div>
          <p className="font-semibold text-amber-200">Academic Project Notice & Disclaimer:</p>
          <p className="mt-0.5 text-amber-300/90">
            This map displays historical dataset records from the Indian Road Accident Dataset 2022–2025. It does <strong>NOT</strong> rely on live traffic or weather APIs and does <strong>NOT</strong> provide real-time route navigation. Coordinates include synthetically generated spatial/contextual attributes where applicable for demonstration purposes.
          </p>
        </div>
      </div>

      <FilterBar filters={filters} setFilters={setFilters} onReset={handleReset} />

      <div className="bg-slate-800/90 p-4 rounded-xl border border-slate-700 shadow-xl space-y-4">
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span>Showing {records.length} sample accident markers on map</span>
          <div className="flex items-center space-x-4">
            <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-emerald-500 inline-block"></span> Low Risk (≤ 0.33)</span>
            <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-amber-500 inline-block"></span> Medium Risk (0.34 - 0.66)</span>
            <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-red-500 inline-block"></span> High Risk (&gt; 0.66)</span>
          </div>
        </div>

        {/* Leaflet Map Box */}
        <div className="h-[500px] w-full rounded-lg overflow-hidden border border-slate-700 relative">
          {loading ? (
            <div className="absolute inset-0 bg-slate-900/80 z-20 flex items-center justify-center text-slate-300">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-400 mr-3"></div>
              Rendering Map Points...
            </div>
          ) : null}

          <MapContainer center={mapCenter} zoom={5} scrollWheelZoom={true} className="h-full w-full">
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {records.map((rec, idx) => (
              <CircleMarker
                key={rec.accident_id || idx}
                center={[rec.latitude, rec.longitude]}
                radius={7}
                pathOptions={{
                  fillColor: getMarkerColor(rec.risk_score),
                  color: '#0f172a',
                  weight: 1.5,
                  fillOpacity: 0.8
                }}
              >
                <Popup>
                  <div className="text-slate-900 p-1 text-xs space-y-1 font-sans">
                    <div className="font-bold text-sm text-slate-900 border-b pb-1">
                      {rec.city} ({rec.severity})
                    </div>
                    <div><strong>Risk Score:</strong> {rec.risk_score} ({rec.risk_category})</div>
                    <div><strong>Weather:</strong> {rec.weather}</div>
                    <div><strong>Road Type:</strong> {rec.road_type}</div>
                    <div><strong>Time:</strong> {rec.day_of_week}, {rec.hour}:00</div>
                  </div>
                </Popup>
              </CircleMarker>
            ))}
          </MapContainer>
        </div>
      </div>
    </div>
  );
}
