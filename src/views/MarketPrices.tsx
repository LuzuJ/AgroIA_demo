import React, { useState, useMemo } from 'react';
import { cropsData } from '../data/crops';
import { useMarketPrices, MarketPrice } from '../hooks/useMarketPrices';

const TrendArrow = ({ trend }: { trend: 'up' | 'down' | 'stable' }) => {
  if (trend === 'up')     return <span className="text-emerald-600 font-black text-base">↑</span>;
  if (trend === 'down')   return <span className="text-red-500 font-black text-base">↓</span>;
  return <span className="text-stone-400 font-black text-base">→</span>;
};

const trendLabel = (t: 'up' | 'down' | 'stable') =>
  t === 'up' ? 'Subiendo' : t === 'down' ? 'Bajando' : 'Estable';

const trendBg = (t: 'up' | 'down' | 'stable') =>
  t === 'up' ? 'bg-emerald-50 text-emerald-700' : t === 'down' ? 'bg-red-50 text-red-600' : 'bg-stone-100 text-stone-500';

type DisplayUnit = 'original' | 'libra' | 'kilo' | 'qq' | 'tonelada';

const unitWeightsInKg: Record<string, number> = {
  'qq (100 lbs)': 45.3592,
  'qq': 45.3592,
  'libra': 0.453592,
  'kilo': 1,
  'caja 43 lbs': 19.5045,
  'caja': 19.5045,
  'saca (200 lbs)': 90.7185,
  'tonelada': 1000
};

const targetUnitWeights: Record<DisplayUnit, number> = {
  'original': 1, // Not used directly
  'libra': 0.453592,
  'kilo': 1,
  'qq': 45.3592,
  'tonelada': 1000
};

const targetUnitLabels: Record<DisplayUnit, string> = {
  'original': 'Original',
  'libra': 'Libra',
  'kilo': 'Kilo',
  'qq': 'Quintal (100 lbs)',
  'tonelada': 'Tonelada'
};

const convertPrice = (item: MarketPrice, targetUnit: DisplayUnit) => {
  if (targetUnit === 'original') {
    return { price: item.price, label: item.unit };
  }
  
  const originalUnitKey = item.unit.toLowerCase().trim();
  const kgFactor = unitWeightsInKg[originalUnitKey] || 1; // Default to 1 if unknown
  
  // Price per 1 KG
  const pricePerKg = item.price / kgFactor;
  
  // Price for the target unit
  const finalPrice = pricePerKg * targetUnitWeights[targetUnit];
  
  return { price: finalPrice, label: targetUnitLabels[targetUnit] };
};

export const MarketPrices: React.FC<{ selectedCrops: string[] }> = ({ selectedCrops }) => {
  const { prices, loading, error } = useMarketPrices();
  const [displayUnit, setDisplayUnit] = useState<DisplayUnit>('libra');
  
  const selectedNames = cropsData.filter(c => selectedCrops.includes(c.id)).map(c => c.name.toLowerCase().split(' ')[0]);

  const filtered = useMemo(() => {
    return prices.filter(p => selectedNames.some(n => p.productName.toLowerCase().includes(n)));
  }, [prices, selectedNames]);

  return (
    <div className="px-4 py-5 view-enter">
      <div className="mb-4">
        <h2 className="text-3xl font-black text-stone-800">Precios de Hoy</h2>
        <p className="text-stone-500 text-base font-medium mt-1">
          {loading ? 'Actualizando datos...' : `Actualizado: ${new Date().toLocaleDateString('es-EC', { day: 'numeric', month: 'long' })}`}
        </p>
      </div>

      {/* Unit Selector */}
      {filtered.length > 0 && !loading && (
        <div className="mb-6 overflow-x-auto hide-scrollbar pb-2">
          <div className="flex gap-2 min-w-max">
            {(['original', 'libra', 'kilo', 'qq', 'tonelada'] as DisplayUnit[]).map(unit => (
              <button
                key={unit}
                onClick={() => setDisplayUnit(unit)}
                className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                  displayUnit === unit 
                    ? 'bg-green-700 text-white shadow-md border-transparent' 
                    : 'bg-white text-stone-600 border border-stone-200 hover:border-green-300'
                }`}
              >
                {unit === 'original' ? 'Por defecto' : `Por ${targetUnitLabels[unit].split(' ')[0]}`}
              </button>
            ))}
          </div>
        </div>
      )}

      {loading && prices.length === 0 ? (
        <div className="glass rounded-2xl p-6 text-center animate-pulse">
           <div className="text-stone-400 font-semibold text-sm">Cargando precios de mercado...</div>
        </div>
      ) : error && prices.length === 0 ? (
        <div className="glass rounded-2xl p-6 text-center border-red-200 border bg-red-50">
          <div className="text-4xl mb-3">📡</div>
          <p className="text-stone-600 font-semibold text-sm">{error}</p>
          <p className="text-stone-400 text-xs mt-2">Falta configurar VITE_PRICES_API_URL en el archivo .env, o usar un JSON remoto.</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="glass rounded-2xl p-6 text-center">
          <div className="text-4xl mb-3">📭</div>
          <p className="text-stone-600 font-semibold text-sm">Sin precios disponibles para tus cultivos en este momento.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {error && <div className="text-xs text-amber-600 font-bold bg-amber-100 p-2 rounded-lg text-center mb-4">{error}</div>}
          {filtered.map(item => {
            const crop = cropsData.find(c => selectedCrops.includes(c.id) && item.productName.toLowerCase().includes(c.name.toLowerCase().split(' ')[0]));
            const { price: displayPrice, label: unitLabel } = convertPrice(item, displayUnit);
            
            return (
              <div key={item.id} className="glass rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className="text-3xl">{crop?.icon ?? '🌱'}</div>
                    <div>
                      <h3 className="font-black text-stone-800 text-lg leading-tight">{item.productName}</h3>
                      <p className="text-base text-stone-500 mt-0.5">{item.region}</p>
                      <p className="text-xs text-stone-400 font-bold uppercase mt-1.5">Fuente: {item.source}</p>
                      {item.isInternational && (
                        <p className="text-sm text-blue-600 font-bold mt-1">🌎 Global: {item.originalPriceStr}</p>
                      )}
                    </div>
                  </div>

                  <div className="text-right flex-shrink-0">
                    <div className="text-3xl font-black text-green-700">${displayPrice.toFixed(2)}</div>
                    <div className="text-base text-stone-500 font-semibold">por {unitLabel}</div>
                    <div className={`inline-flex items-center gap-1 text-sm font-bold px-3 py-1.5 rounded-full mt-2 ${trendBg(item.trend)}`}>
                      <TrendArrow trend={item.trend} />
                      {trendLabel(item.trend)}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
