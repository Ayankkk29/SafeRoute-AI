import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Prediction from './pages/Prediction';
import VisionInspector from './pages/VisionInspector';
import Analytics from './pages/Analytics';
import RiskMap from './pages/RiskMap';
import ModelPerformance from './pages/ModelPerformance';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard setActiveTab={setActiveTab} />;
      case 'prediction':
        return <Prediction />;
      case 'vision':
        return <VisionInspector />;
      case 'analytics':
        return <Analytics />;
      case 'risk-map':
        return <RiskMap />;
      case 'performance':
        return <ModelPerformance />;
      default:
        return <Dashboard setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderContent()}
      </main>
      <footer className="bg-slate-950 border-t border-slate-800 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4">
          SafeRoute AI — Multimodal Computer Vision & Road Accident Risk Analysis System | Academic Project
        </div>
      </footer>
    </div>
  );
}
