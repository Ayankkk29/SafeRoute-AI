import React from 'react';
import { ShieldAlert, LayoutDashboard, BrainCircuit, BarChart3, MapPin, Award, Camera } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab }) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'prediction', label: 'Severity Prediction', icon: BrainCircuit },
    { id: 'vision', label: 'AI Vision Inspector', icon: Camera },
    { id: 'analytics', label: 'Accident Analytics', icon: BarChart3 },
    { id: 'risk-map', label: 'Accident Risk Map', icon: MapPin },
    { id: 'performance', label: 'Model Performance', icon: Award },
  ];

  return (
    <header className="bg-slate-800/90 backdrop-blur border-b border-slate-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('dashboard')}>
            <div className="bg-amber-500/20 p-2 rounded-lg border border-amber-500/30">
              <ShieldAlert className="h-6 w-6 text-amber-400" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-amber-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
                SafeRoute AI
              </span>
              <span className="hidden sm:inline-block ml-2 text-xs font-semibold px-2 py-0.5 rounded bg-slate-700 text-slate-300 border border-slate-600">
                CV & ML Academic
              </span>
            </div>
          </div>

          <nav className="flex space-x-1 sm:space-x-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span className="hidden md:inline">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
}
