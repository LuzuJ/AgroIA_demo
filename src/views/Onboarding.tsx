import React from 'react';
import { cropsData } from '../data/crops';

interface Props {
  selectedCrops: string[];
  toggleCrop: (id: string) => void;
  onComplete: () => void;
}

const categories = ['Exportación', 'Consumo Local', 'Acuacultura'] as const;

export const Onboarding: React.FC<Props> = ({ selectedCrops, toggleCrop, onComplete }) => {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'linear-gradient(160deg, #14532d 0%, #166534 40%, #15803d 100%)' }}>
      
      {/* Hero Section */}
      <div className="px-6 pt-10 pb-6 text-white">
        <div className="text-5xl mb-4">🌾</div>
        <h1 className="text-3xl font-black leading-tight mb-2">
          ¿Qué cultivas tú?
        </h1>
        <p className="text-green-100 text-sm font-medium leading-relaxed">
          Selecciona tus productos para ver precios del mercado y guías de enfermedades personalizadas.
        </p>
      </div>

      {/* Cards */}
      <div className="flex-1 bg-stone-50 rounded-t-3xl px-4 pt-6 pb-4">
        <div className="space-y-5">
          {categories.map(cat => {
            const items = cropsData.filter(c => c.category === cat);
            if (!items.length) return null;
            return (
              <div key={cat}>
                <p className="text-xs font-black uppercase tracking-widest text-stone-400 mb-2 px-1">
                  {cat}
                </p>
                <div className="grid grid-cols-2 gap-2.5">
                  {items.map(crop => {
                    const sel = selectedCrops.includes(crop.id);
                    return (
                      <button
                        key={crop.id}
                        onClick={() => toggleCrop(crop.id)}
                        className={`flex items-center gap-3 p-3.5 rounded-2xl border-2 text-left transition-all active:scale-95 ${
                          sel
                            ? 'border-green-600 bg-green-50 shadow-sm shadow-green-100'
                            : 'border-stone-200 bg-white hover:border-green-300'
                        }`}
                      >
                        <span className="text-2xl">{crop.icon}</span>
                        <div className="flex-1 min-w-0">
                          <div className={`font-bold text-xs leading-tight ${sel ? 'text-green-800' : 'text-stone-700'}`}>
                            {crop.name}
                          </div>
                        </div>
                        {sel && (
                          <div className="w-5 h-5 rounded-full bg-green-600 flex items-center justify-center flex-shrink-0">
                            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6">
          <button
            onClick={onComplete}
            disabled={selectedCrops.length === 0}
            className={`w-full py-4 rounded-2xl font-black text-base transition-all active:scale-95 ${
              selectedCrops.length > 0
                ? 'bg-green-700 hover:bg-green-800 text-white shadow-lg shadow-green-900/20'
                : 'bg-stone-200 text-stone-400 cursor-not-allowed'
            }`}
          >
            {selectedCrops.length === 0 ? 'Selecciona al menos un cultivo' : `Ver mi catálogo (${selectedCrops.length} cultivos) →`}
          </button>
        </div>
      </div>
    </div>
  );
};
