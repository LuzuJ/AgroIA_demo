import React, { useState, useRef } from 'react';
import { Card, Button, Icons } from '../components/UI';
import { analyzePlantHealth } from '../services/geminiService';
import { DiagnosisResult } from '../types';

export const DiagnosisView: React.FC = () => {
  const [description, setDescription] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<DiagnosisResult | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // Remove data URL prefix (e.g., "data:image/jpeg;base64,") for API usage if raw base64 needed, 
        // but @google/genai inlineData usually takes raw base64.
        const result = reader.result as string;
        // Split to get just the base64 part
        setImage(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDiagnose = async () => {
    if (!description && !image) return;
    setLoading(true);
    setResult(null);
    try {
      const base64Data = image ? image.split(',')[1] : undefined;
      const diagnosis = await analyzePlantHealth(description, base64Data);
      setResult(diagnosis);
    } catch (error) {
      alert("Hubo un error en el diagnóstico. Por favor intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 pb-20">
      <div className="bg-emerald-600 p-6 rounded-2xl shadow-lg text-white">
        <h2 className="text-2xl font-bold mb-2">Doctor de Plantas AI</h2>
        <p className="opacity-90">Sube una foto o describe el problema para recibir un diagnóstico instantáneo.</p>
      </div>

      <Card className="p-4">
        <div className="space-y-4">
          
          {/* Image Preview Area */}
          <div 
            className={`border-2 border-dashed rounded-xl h-48 flex flex-col items-center justify-center cursor-pointer transition-colors ${image ? 'border-emerald-500 bg-emerald-50' : 'border-gray-300 hover:bg-gray-50'}`}
            onClick={() => fileInputRef.current?.click()}
          >
            {image ? (
              <img src={image} alt="Preview" className="h-full w-full object-cover rounded-lg" />
            ) : (
              <>
                <div className="bg-emerald-100 p-3 rounded-full mb-2">
                  <Icons.Camera className="w-6 h-6 text-emerald-600" />
                </div>
                <span className="text-sm text-gray-500 font-medium">Toca para subir foto</span>
              </>
            )}
            <input 
              ref={fileInputRef} 
              type="file" 
              accept="image/*" 
              className="hidden" 
              onChange={handleImageUpload} 
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Descripción del problema</label>
            <textarea 
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none resize-none"
              rows={3}
              placeholder="Ej: Las hojas se están poniendo amarillas y tienen manchas negras..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <Button 
            className="w-full" 
            onClick={handleDiagnose} 
            isLoading={loading}
            disabled={(!image && !description) || loading}
          >
            {loading ? 'Analizando...' : 'Diagnosticar'}
          </Button>
        </div>
      </Card>

      {result && (
        <div className="animate-fade-in space-y-4">
          <Card className="p-5 border-l-4 border-emerald-500">
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-xl font-bold text-gray-800">{result.diseaseName}</h3>
              <span className={`px-2 py-1 rounded text-xs font-bold ${
                result.confidence === 'Alto' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
              }`}>
                Confianza: {result.confidence}
              </span>
            </div>
            
            <p className="text-gray-600 mb-4">{result.description}</p>
            
            <div className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">Tratamiento Recomendado</h4>
                <p className="text-blue-800 text-sm">{result.treatment}</p>
              </div>

              <div className="bg-orange-50 p-4 rounded-lg">
                <h4 className="font-semibold text-orange-900 mb-2">Prevención</h4>
                <ul className="list-disc list-inside text-orange-800 text-sm space-y-1">
                  {result.preventativeMeasures.map((m, i) => (
                    <li key={i}>{m}</li>
                  ))}
                </ul>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};