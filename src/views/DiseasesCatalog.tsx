import React, { useState } from 'react';
import { cropsData } from '../data/crops';
import { diseasesData } from '../data/diseases';

const SeverityBadge = ({ severity }: { severity: 'high' | 'medium' | 'low' }) => {
  if (severity === 'high') {
    return <span className="px-3 py-1.5 bg-red-600 text-white text-xs font-black uppercase tracking-widest rounded-full shadow-sm">Peligro Alto</span>;
  }
  if (severity === 'medium') {
    return <span className="px-3 py-1.5 bg-amber-500 text-white text-xs font-black uppercase tracking-widest rounded-full shadow-sm">Peligro Medio</span>;
  }
  return <span className="px-3 py-1.5 bg-blue-500 text-white text-xs font-black uppercase tracking-widest rounded-full shadow-sm">Leve</span>;
};

const TreatmentTypeIcon = ({ type }: { type: 'immediate' | 'biological' | 'chemical' }) => {
  if (type === 'immediate') return '🚨';
  if (type === 'biological') return '🌱';
  return '🧪';
};

const TreatmentTypeLabel = ({ type }: { type: 'immediate' | 'biological' | 'chemical' }) => {
  if (type === 'immediate') return 'Acción Inmediata';
  if (type === 'biological') return 'Control Biológico / Orgánico';
  return 'Control Químico';
};

const TreatmentTypeBg = ({ type }: { type: 'immediate' | 'biological' | 'chemical' }) => {
  if (type === 'immediate') return 'bg-red-50 border-red-100 text-red-800';
  if (type === 'biological') return 'bg-emerald-50 border-emerald-100 text-emerald-800';
  return 'bg-amber-50 border-amber-100 text-amber-900';
};

export const DiseasesCatalog: React.FC<{ selectedCrops: string[] }> = ({ selectedCrops }) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Mapeo de fallbacks en caso de que fallen las imágenes. 
  // Ahora apuntan a rutas locales aseguradas en el repo.
  const fallbacks: Record<string, string> = {
    cacao:    '/images/diseases/cacao-escoba.jpg',
    banano:   '/images/diseases/banano-moko.jpg',
    platano:  '/images/diseases/banano-moko.jpg',
    arroz:    '/images/diseases/arroz-piricularia.jpg',
    maiz:     '/images/diseases/maiz-pudricion.jpg',
    papa:     '/images/diseases/papa-tizon.jpg',
    camaron:  '/images/diseases/camaron-manchablanca.jpg',
    tomate:   '/images/diseases/papa-tizon.jpg',
    cebolla:  '/images/diseases/cebolla-mildiu.jpg',
  };

  return (
    <div className="px-4 py-5 view-enter">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-3xl font-black text-stone-800">Guía de Enfermedades</h2>
        <p className="text-stone-500 text-base font-medium mt-1">Toca una tarjeta para ver síntomas y tratamiento</p>
      </div>

      {cropsData.filter(c => selectedCrops.includes(c.id)).map(crop => {
        const cropDiseases = diseasesData.filter(d => d.cropId === crop.id);
        if (!cropDiseases.length) return null;

        return (
          <div key={crop.id} className="mb-8">
            <h3 className="text-xl font-black text-stone-800 mb-4 flex items-center gap-2">
              <span className="text-2xl">{crop.icon}</span> 
              <span>{crop.name}</span>
            </h3>
            
            <div className="space-y-4">
              {cropDiseases.map(disease => {
                const isOpen = expandedId === disease.id;

                return (
                  <div key={disease.id} className="glass rounded-2xl overflow-hidden shadow-sm transition-all duration-300">
                    <button
                      className="w-full text-left"
                      onClick={() => setExpandedId(isOpen ? null : disease.id)}
                    >
                      <div className="relative h-28 w-full bg-stone-200">
                        <img 
                          src={disease.imageUrl} 
                          alt={disease.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = fallbacks[crop.id] || '';
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-4">
                          <div className="flex justify-between items-end gap-2">
                            <div>
                              <h4 className="text-xl font-black text-white leading-tight">{disease.name}</h4>
                              <p className="text-white/70 text-sm italic mt-0.5">{disease.scientificName}</p>
                            </div>
                            <div className="flex-shrink-0">
                              <SeverityBadge severity={disease.severity} />
                            </div>
                          </div>
                        </div>
                        {/* Expand/collapse chevron */}
                        <div className={`absolute top-3 right-3 w-8 h-8 rounded-full bg-white/85 flex items-center justify-center transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                          <svg className="w-4 h-4 text-stone-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                    </button>

                    {/* Expanded detail */}
                    {isOpen && (
                      <div className="disease-body p-5 space-y-5 border-t border-stone-100">
                        {/* Symptoms */}
                        <div>
                          <p className="text-sm font-black text-stone-400 uppercase tracking-widest mb-3">👁️ Síntomas Visuales</p>
                          <ul className="space-y-2">
                            {disease.symptoms.map((s, i) => (
                              <li key={i} className="flex items-start gap-2.5 text-base text-stone-700">
                                <span className="text-amber-500 font-black mt-0.5 flex-shrink-0">•</span>
                                <span>{s}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Prevention */}
                        {disease.prevention && disease.prevention.length > 0 && (
                          <div>
                            <p className="text-sm font-black text-stone-400 uppercase tracking-widest mb-3">🛡️ Prevención</p>
                            <ul className="space-y-2">
                              {disease.prevention.map((p, i) => (
                                <li key={i} className="flex items-start gap-2.5 text-base text-stone-600">
                                  <span className="text-green-600 font-black mt-0.5 flex-shrink-0">✓</span>
                                  <span>{p}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Treatments */}
                        {disease.treatments && disease.treatments.length > 0 && (
                          <div className="space-y-4 pt-4 border-t border-stone-200">
                            <h4 className="text-xl font-black text-stone-800">Tratamientos Recomendados</h4>
                            {disease.treatments.map((treatment) => (
                              <div key={treatment.id} className={`rounded-xl p-5 border ${TreatmentTypeBg(treatment.type)}`}>
                                <div className="flex items-center gap-2 mb-3">
                                  <span className="text-2xl">{TreatmentTypeIcon(treatment.type)}</span>
                                  <p className="text-sm font-black uppercase tracking-widest">{TreatmentTypeLabel(treatment.type)}</p>
                                </div>
                                <h5 className="text-xl font-bold mb-2">{treatment.title}</h5>
                                <p className="text-base mb-4 opacity-90">{treatment.description}</p>
                                
                                {treatment.dosage && (
                                  <p className="text-base font-semibold mb-2">Dosis: <span className="font-normal">{treatment.dosage}</span></p>
                                )}
                                {treatment.frequency && (
                                  <p className="text-base font-semibold mb-4">Frecuencia: <span className="font-normal">{treatment.frequency}</span></p>
                                )}
                                
                                {treatment.steps && treatment.steps.length > 0 && (
                                  <div className="mt-4 bg-white/50 rounded-lg p-5">
                                    <p className="text-base font-bold uppercase mb-3">Pasos:</p>
                                    <ul className="space-y-3">
                                      {treatment.steps.map((step, i) => (
                                        <li key={i} className="text-base flex items-start gap-2">
                                          <span className="font-bold opacity-60">{i+1}.</span>
                                          <span>{step}</span>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                )}
                                
                                {treatment.precautions && treatment.precautions.length > 0 && (
                                  <div className="mt-5">
                                    <p className="text-base font-bold uppercase mb-2 opacity-70">Precauciones:</p>
                                    <ul className="list-disc pl-5 text-base opacity-90 space-y-2">
                                      {treatment.precautions.map((pre, i) => <li key={i}>{pre}</li>)}
                                    </ul>
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};
