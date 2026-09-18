import React, { useEffect, useState } from 'react';
import { fetchModelPerformance } from '../services/api';
import ConfusionMatrix from '../components/ConfusionMatrix';
import { Award, CheckCircle2, FileText, Cpu, BarChart } from 'lucide-react';

export default function ModelPerformance() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedModel, setSelectedModel] = useState(null);

  useEffect(() => {
    fetchModelPerformance()
      .then((res) => {
        setData(res);
        if (res.best_model) {
          setSelectedModel(res.best_model);
        } else if (res.models && Object.keys(res.models).length > 0) {
          setSelectedModel(Object.keys(res.models)[0]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Model performance fetch error:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 text-slate-400">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-400 mr-3"></div>
        Loading ML Evaluation Metrics...
      </div>
    );
  }

  if (!data || !data.models) {
    return <div className="text-red-400 p-6">No evaluation metrics found. Please train models first.</div>;
  }

  const selectedMetrics = data.models[selectedModel] || {};

  return (
    <div className="space-y-6">
      <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700 shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
            <Award className="h-6 w-6 text-amber-400" />
            Machine Learning Model Performance & Evaluation
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Empirical comparative evaluation of Logistic Regression, Decision Tree, and Random Forest on 20% stratified test set.
          </p>
        </div>
        <div className="bg-emerald-500/10 border border-emerald-500/30 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-emerald-400 flex items-center space-x-2">
          <CheckCircle2 className="h-4 w-4" />
          <span>Selected Model: {data.best_model}</span>
        </div>
      </div>

      {/* Model Comparison Table */}
      <div className="bg-slate-800/90 rounded-xl border border-slate-700 p-5 shadow-xl space-y-4">
        <h3 className="font-bold text-slate-200 flex items-center gap-2">
          <Cpu className="h-5 w-5 text-amber-400" />
          Model Evaluation Summary Matrix
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-700 bg-slate-900/60 text-slate-300 text-xs font-semibold uppercase">
                <th className="p-3">Model</th>
                <th className="p-3">Accuracy</th>
                <th className="p-3">Precision (Weighted)</th>
                <th className="p-3">Recall (Weighted)</th>
                <th className="p-3">F1-Score (Weighted)</th>
                <th className="p-3 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/60 text-sm text-slate-200">
              {Object.entries(data.models).map(([mName, metrics]) => {
                const isBest = mName === data.best_model;
                const isSelected = mName === selectedModel;
                return (
                  <tr
                    key={mName}
                    onClick={() => setSelectedModel(mName)}
                    className={`cursor-pointer transition-colors ${
                      isSelected ? 'bg-amber-500/10' : 'hover:bg-slate-700/30'
                    }`}
                  >
                    <td className="p-3 font-semibold text-white flex items-center space-x-2">
                      <span>{mName}</span>
                      {isBest && (
                        <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded border border-emerald-500/40">
                          Best
                        </span>
                      )}
                    </td>
                    <td className="p-3 font-mono">{(metrics.accuracy * 100).toFixed(2)}%</td>
                    <td className="p-3 font-mono">{(metrics.precision * 100).toFixed(2)}%</td>
                    <td className="p-3 font-mono">{(metrics.recall * 100).toFixed(2)}%</td>
                    <td className="p-3 font-mono font-bold text-amber-400">{(metrics.f1 * 100).toFixed(2)}%</td>
                    <td className="p-3 text-center">
                      <button
                        onClick={() => setSelectedModel(mName)}
                        className={`text-xs px-3 py-1 rounded-lg font-medium transition-colors ${
                          isSelected
                            ? 'bg-amber-500 text-slate-950 font-bold'
                            : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                        }`}
                      >
                        {isSelected ? 'Viewing' : 'Inspect'}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Selected Model Details: Confusion Matrix & Classification Report */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Confusion Matrix */}
        <div className="bg-slate-800/90 rounded-xl border border-slate-700 p-5 shadow-xl space-y-4">
          <h3 className="font-bold text-slate-200 flex items-center gap-2">
            <BarChart className="h-5 w-5 text-amber-400" />
            Confusion Matrix ({selectedModel})
          </h3>
          <p className="text-xs text-slate-400">
            Displays actual vs predicted counts for test set instances. Diagonal values represent correct predictions.
          </p>
          <div className="pt-2">
            <ConfusionMatrix matrix={selectedMetrics.confusion_matrix} labels={selectedMetrics.labels} />
          </div>
        </div>

        {/* Classification Report */}
        <div className="bg-slate-800/90 rounded-xl border border-slate-700 p-5 shadow-xl space-y-4">
          <h3 className="font-bold text-slate-200 flex items-center gap-2">
            <FileText className="h-5 w-5 text-amber-400" />
            Classification Report ({selectedModel})
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-700 text-slate-400 uppercase font-semibold">
                  <th className="p-2">Class</th>
                  <th className="p-2">Precision</th>
                  <th className="p-2">Recall</th>
                  <th className="p-2">F1-Score</th>
                  <th className="p-2">Support</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/60 font-mono text-slate-200">
                {selectedMetrics.labels?.map((label) => {
                  const rep = selectedMetrics.classification_report?.[label] || {};
                  return (
                    <tr key={label}>
                      <td className="p-2 font-bold text-amber-400">{label}</td>
                      <td className="p-2">{(rep.precision || 0).toFixed(3)}</td>
                      <td className="p-2">{(rep.recall || 0).toFixed(3)}</td>
                      <td className="p-2">{(rep['f1-score'] || 0).toFixed(3)}</td>
                      <td className="p-2">{rep.support || 0}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
