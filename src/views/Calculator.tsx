import React, { useState } from 'react';
import { cropsData } from '../data/crops';
import { useMarketPrices, MarketPrice } from '../hooks/useMarketPrices';

interface Props {
  selectedCrops: string[];
}

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
  'original': 1,
  'libra': 0.453592,
  'kilo': 1,
  'qq': 45.3592,
  'tonelada': 1000
};

const targetUnitLabels: Record<DisplayUnit, string> = {
  'original': 'Original',
  'libra': 'Libras',
  'kilo': 'Kilos',
  'qq': 'Quintales',
  'tonelada': 'Toneladas'
};

const convertPrice = (item: MarketPrice, targetUnit: DisplayUnit) => {
  if (targetUnit === 'original') return { price: item.price, label: item.unit };
  const originalUnitKey = item.unit.toLowerCase().trim();
  const kgFactor = unitWeightsInKg[originalUnitKey] || 1;
  const pricePerKg = item.price / kgFactor;
  const finalPrice = pricePerKg * targetUnitWeights[targetUnit];
  return { price: finalPrice, label: targetUnitLabels[targetUnit] };
};

export const Calculator: React.FC<Props> = ({ selectedCrops }) => {
  const { prices, loading, error } = useMarketPrices();
  const [displayUnit, setDisplayUnit] = useState<DisplayUnit>('libra'); // Default a libras como pidió el usuario
  const [selectedProductId, setSelectedProductId] = useState<string>('');
  const [quantity, setQuantity] = useState<string>('');

  const available = prices.filter(p => {
    const selectedNames = cropsData.filter(c => selectedCrops.includes(c.id)).map(c => c.name.toLowerCase().split(' ')[0]);
    return selectedNames.some(n => p.productName.toLowerCase().includes(n));
  });

  if (!selectedProductId && available.length > 0) {
    setSelectedProductId(available[0].id);
  }

  const product = available.find(p => p.id === selectedProductId);

  const handleProductChange = (id: string) => {
    setSelectedProductId(id);
    setQuantity('');
  };

  const calc = () => {
    if (!product || !quantity || isNaN(Number(quantity))) return null;
    const qty = parseFloat(quantity);
    const converted = convertPrice(product, displayUnit);
    return {
      total: qty * converted.price,
      unitLabel: converted.label,
      pricePerUnit: converted.price
    };
  };

  const result = calc();

  return (
    <div className="px-4 py-5 view-enter">
      <div className="mb-6">
        <h2 className="text-3xl font-black text-stone-800">Calculadora</h2>
        <p className="text-stone-500 text-base font-medium mt-1">Estima tus ingresos según el precio de hoy</p>
      </div>

      {loading && prices.length === 0 ? (
        <div className="glass rounded-2xl p-6 text-center animate-pulse">
           <div className="text-stone-400 font-semibold text-base">Cargando datos para calculadora...</div>
        </div>
      ) : available.length === 0 ? (
        <div className="glass rounded-2xl p-6 text-center">
          <div className="text-4xl mb-3">📭</div>
          <p className="text-stone-600 font-semibold text-base">Selecciona cultivos con precios disponibles.</p>
        </div>
      ) : (
        <div className="space-y-4">
          
          {/* Selector de Producto */}
          <div className="glass rounded-2xl p-5">
            <label className="text-sm font-black text-stone-500 uppercase tracking-widest block mb-3">1. Selecciona un Producto</label>
            <div className="grid grid-cols-2 gap-3">
              {available.map(p => {
                const c = cropsData.find(c => selectedCrops.includes(c.id) && p.productName.toLowerCase().includes(c.name.toLowerCase().split(' ')[0]));
                return (
                  <button
                    key={p.id}
                    onClick={() => handleProductChange(p.id)}
                    className={`flex items-center gap-2 p-3 rounded-xl border-2 text-left transition-all text-sm font-bold ${
                      selectedProductId === p.id
                        ? 'border-green-600 bg-green-50 text-green-800 shadow-sm'
                        : 'border-stone-200 bg-white text-stone-600 hover:border-green-300'
                    }`}
                  >
                    <span className="text-2xl">{c?.icon ?? '🌱'}</span>
                    <span className="text-sm leading-tight">{p.productName.split(' ').slice(0, 3).join(' ')}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Selector de Unidad */}
          {product && (
            <div className="glass rounded-2xl p-5">
              <label className="text-sm font-black text-stone-500 uppercase tracking-widest block mb-3">2. Unidad de Venta</label>
              <div className="flex flex-wrap gap-2">
                {(['libra', 'kilo', 'qq', 'tonelada'] as DisplayUnit[]).map(unit => (
                  <button
                    key={unit}
                    onClick={() => setDisplayUnit(unit)}
                    className={`px-4 py-2.5 rounded-xl text-base font-bold transition-all flex-grow text-center ${
                      displayUnit === unit 
                        ? 'bg-green-700 text-white shadow-md border-transparent' 
                        : 'bg-white text-stone-600 border border-stone-200 hover:border-green-300'
                    }`}
                  >
                    {targetUnitLabels[unit]}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Ingreso de Cantidad */}
          {product && (
            <div className="glass rounded-2xl p-5 space-y-4">
              <div>
                <label className="text-sm font-black text-stone-500 uppercase tracking-widest block mb-3">
                  3. ¿Cuántas {targetUnitLabels[displayUnit]} tienes?
                </label>
                <input
                  type="number"
                  min="0"
                  step="any"
                  placeholder={`Ej: 100`}
                  value={quantity}
                  onChange={e => setQuantity(e.target.value)}
                  className="w-full text-4xl font-black text-stone-800 bg-stone-100 rounded-2xl px-6 py-5 border-2 border-transparent focus:border-green-500 focus:outline-none text-center transition-colors shadow-inner"
                />
              </div>

              {/* Resultado */}
              <div className={`p-6 rounded-2xl text-center transition-all ${result ? 'bg-green-800 text-white shadow-lg scale-100' : 'bg-stone-100 scale-95 opacity-50'}`}>
                <p className="text-xs font-black uppercase tracking-widest mb-1 opacity-80 text-white">Ingreso Estimado</p>
                <div className="text-5xl font-black my-2">
                  ${result ? result.total.toFixed(2) : '0.00'}
                </div>
                {result && (
                  <p className="text-base font-medium opacity-90 text-green-100 mt-2">
                    {quantity} {result.unitLabel.toLowerCase()} de {product.productName} 
                    <br/><span className="text-sm opacity-70">(a ${result.pricePerUnit.toFixed(2)} por {targetUnitLabels[displayUnit].replace('s','')})</span>
                  </p>
                )}
              </div>

              {product.isInternational && (
                <div className="bg-yellow-50 border border-yellow-100 rounded-xl p-3 flex items-start gap-2">
                  <span>💡</span>
                  <p className="text-xs text-yellow-800 leading-relaxed font-medium">
                    Precio de referencia: <strong className="text-green-700">${convertPrice(product, displayUnit).price.toFixed(2)}</strong> por {targetUnitLabels[displayUnit].replace('s','')}. 
                    Fuente: Cálculo en tiempo real desde Bolsa Global (ICE).
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
