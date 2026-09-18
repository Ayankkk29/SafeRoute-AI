import React, { useState } from 'react';
import { analyzeRoadImage } from '../services/api';
import { Camera, Upload, Eye, Sparkles, AlertCircle, FileImage, ShieldAlert, Cpu } from 'lucide-react';

export default function VisionInspector() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setResult(null);
      setError(null);
    }
  };

  const handleAnalyze = async () => {
    if (!selectedFile) {
      setError("Please select or upload a road scene image first.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await analyzeRoadImage(selectedFile);
      setResult(res);
    } catch (err) {
      console.error("Vision Analysis error:", err);
      setError("Failed to run Computer Vision analysis. Please try another image.");
    } finally {
      setLoading(false);
    }
  };

  // Generate synthetic sample image canvas for quick testing
  const handleSampleClick = (sampleType) => {
    const canvas = document.createElement('canvas');
    canvas.width = 400;
    canvas.height = 300;
    const ctx = canvas.getContext('2d');

    if (sampleType === 'fog') {
      ctx.fillStyle = '#94a3b8';
      ctx.fillRect(0, 0, 400, 300);
      ctx.fillStyle = '#64748b';
      ctx.fillRect(50, 150, 300, 100);
    } else if (sampleType === 'rain') {
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(0, 0, 400, 300);
      ctx.strokeStyle = '#38bdf8';
      for (let i = 0; i < 50; i++) {
        ctx.beginPath();
        ctx.moveTo(Math.random() * 400, Math.random() * 300);
        ctx.lineTo(Math.random() * 400, Math.random() * 300);
        ctx.stroke();
      }
    } else {
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, 400, 300);
      ctx.fillStyle = '#f59e0b';
      ctx.fillRect(100, 100, 200, 100);
    }

    canvas.toBlob((blob) => {
      const file = new File([blob], `${sampleType}_sample.jpg`, { type: 'image/jpeg' });
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setResult(null);
      setError(null);
    }, 'image/jpeg');
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
      <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700 shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
            <Camera className="h-6 w-6 text-amber-400" />
            Computer Vision Road Hazard Inspector
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Upload road scene or accident images to extract visual metrics (Brightness, Haze, Contrast, Edge Density) and run vision-assisted severity predictions.
          </p>
        </div>
        <div className="bg-amber-500/10 border border-amber-500/30 px-3 py-1.5 rounded-xl text-xs text-amber-300 font-semibold flex items-center space-x-2">
          <Cpu className="h-4 w-4" />
          <span>OpenCV + ML Feature Extractor</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Upload & Sample Selector Box */}
        <div className="bg-slate-800/90 rounded-xl border border-slate-700 p-6 shadow-xl space-y-4">
          <h3 className="font-bold text-slate-200 flex items-center gap-2">
            <Upload className="h-5 w-5 text-amber-400" />
            Upload Road Scene Image
          </h3>

          <div className="border-2 border-dashed border-slate-700 hover:border-amber-500/50 rounded-xl p-6 text-center transition-colors bg-slate-900/60">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
              id="vision-file-input"
            />
            <label htmlFor="vision-file-input" className="cursor-pointer flex flex-col items-center space-y-2">
              <FileImage className="h-10 w-10 text-slate-400 hover:text-amber-400 transition-colors" />
              <span className="text-sm font-semibold text-slate-200">Click to upload image (JPG / PNG)</span>
              <span className="text-xs text-slate-400">Road scenes, traffic cameras, or accident snapshots</span>
            </label>
          </div>

          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">Or select a sample scene:</span>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleSampleClick('fog')}
                className="bg-slate-900 hover:bg-slate-700 text-xs font-medium text-slate-300 py-2 px-3 rounded-lg border border-slate-700 transition-colors"
              >
                🌁 Fog Scene
              </button>
              <button
                type="button"
                onClick={() => handleSampleClick('rain')}
                className="bg-slate-900 hover:bg-slate-700 text-xs font-medium text-slate-300 py-2 px-3 rounded-lg border border-slate-700 transition-colors"
              >
                🌧️ Rain Scene
              </button>
              <button
                type="button"
                onClick={() => handleSampleClick('clear')}
                className="bg-slate-900 hover:bg-slate-700 text-xs font-medium text-slate-300 py-2 px-3 rounded-lg border border-slate-700 transition-colors"
              >
                ☀️ Clear Scene
              </button>
            </div>
          </div>

          <button
            onClick={handleAnalyze}
            disabled={loading || !selectedFile}
            className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold py-3 rounded-xl transition-all shadow-lg flex items-center justify-center space-x-2 disabled:opacity-50"
          >
            {loading ? (
              <span className="flex items-center">
                <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-slate-950 mr-2"></span>
                Processing Computer Vision Metrics...
              </span>
            ) : (
              <>
                <Sparkles className="h-4 w-4" />
                <span>Run Computer Vision Inspection</span>
              </>
            )}
          </button>

          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg flex items-center space-x-2 text-red-400 text-xs">
              <AlertCircle className="h-4 w-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}
        </div>

        {/* Image Preview Box */}
        <div className="bg-slate-800/90 rounded-xl border border-slate-700 p-6 shadow-xl flex flex-col items-center justify-center min-h-[300px]">
          <h3 className="font-bold text-slate-200 self-start mb-4 flex items-center gap-2">
            <Eye className="h-5 w-5 text-amber-400" />
            Image Preview & Processing Canvas
          </h3>
          {previewUrl ? (
            <div className="w-full h-64 rounded-lg overflow-hidden border border-slate-700 bg-slate-950 flex items-center justify-center">
              <img src={previewUrl} alt="Road Scene Preview" className="max-h-full max-w-full object-contain" />
            </div>
          ) : (
            <div className="text-center text-slate-500 py-12">
              <Camera className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <p className="text-sm">No image selected. Upload an image or select a sample above.</p>
            </div>
          )}
        </div>
      </div>

      {/* Vision Analysis Results */}
      {result && (
        <div className="bg-slate-800/90 rounded-xl border border-amber-500/40 p-6 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-slate-700 pb-4 gap-2">
            <div>
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Vision-Assisted ML Output</span>
              <div className="flex items-center space-x-3 mt-1">
                <span className="text-2xl font-extrabold text-white">Predicted Severity:</span>
                <span className={`text-xl font-bold px-3 py-1 rounded-lg border ${getSeverityBadge(result.ml_severity_prediction)}`}>
                  {result.ml_severity_prediction}
                </span>
              </div>
            </div>
            <div className="text-left sm:text-right">
              <span className="text-xs text-slate-400">Prediction Confidence</span>
              <div className="text-2xl font-extrabold text-amber-400">{result.confidence_percentage}%</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Detected Scene Attributes */}
            <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-700 space-y-3">
              <h4 className="text-xs font-semibold text-amber-400 uppercase tracking-wider">Inferred Scene Conditions</h4>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="bg-slate-800 p-2.5 rounded-lg border border-slate-700">
                  <span className="text-slate-400 block">Weather</span>
                  <span className="font-bold text-white text-sm">{result.detected_features.weather}</span>
                </div>
                <div className="bg-slate-800 p-2.5 rounded-lg border border-slate-700">
                  <span className="text-slate-400 block">Visibility</span>
                  <span className="font-bold text-white text-sm">{result.detected_features.visibility}</span>
                </div>
                <div className="bg-slate-800 p-2.5 rounded-lg border border-slate-700">
                  <span className="text-slate-400 block">Traffic Density</span>
                  <span className="font-bold text-white text-sm">{result.detected_features.traffic_density}</span>
                </div>
                <div className="bg-slate-800 p-2.5 rounded-lg border border-slate-700">
                  <span className="text-slate-400 block">Road Type</span>
                  <span className="font-bold text-white text-sm">{result.detected_features.road_type}</span>
                </div>
              </div>
            </div>

            {/* Extracted Vision Metrics */}
            <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-700 space-y-3">
              <h4 className="text-xs font-semibold text-amber-400 uppercase tracking-wider">Extracted Computer Vision Metrics</h4>
              <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                <div className="bg-slate-800 p-2.5 rounded-lg border border-slate-700">
                  <span className="text-slate-400 block font-sans">Brightness Index</span>
                  <span className="font-bold text-slate-200">{result.vision_metrics.brightness_index}</span>
                </div>
                <div className="bg-slate-800 p-2.5 rounded-lg border border-slate-700">
                  <span className="text-slate-400 block font-sans">Contrast Index</span>
                  <span className="font-bold text-slate-200">{result.vision_metrics.contrast_index}</span>
                </div>
                <div className="bg-slate-800 p-2.5 rounded-lg border border-slate-700">
                  <span className="text-slate-400 block font-sans">Haze Index</span>
                  <span className="font-bold text-slate-200">{result.vision_metrics.haze_index}</span>
                </div>
                <div className="bg-slate-800 p-2.5 rounded-lg border border-slate-700">
                  <span className="text-slate-400 block font-sans">Edge Density</span>
                  <span className="font-bold text-slate-200">{result.vision_metrics.edge_density_pct}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
