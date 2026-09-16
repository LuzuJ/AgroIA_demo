import React, { useState } from 'react';
import { cropsData } from '../data/crops';
import { useMarketPrices } from '../hooks/useMarketPrices';

interface Props {
  selectedCrops: string[];
}

export const Calculator: React.FC<Props> = ({ selectedCrops }) => {
  const { prices, loading, error } = useMarketPrices();

  const available = prices.filter(p => {
    const selectedNames = cropsData.filter(c => selectedCrops.includes(c.id)).map(c => c.name.toLowerCase().split(' ')[0]);
    return selectedNames.some(n => p.productName.toLowerCase().includes(n));
  });

  const [selectedProductId, setSelectedProductId] = useState<string>('');
  const [quantity, setQuantity] = useState<string>('');

  // Auto-select first product when available loads
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
    return {
      total: qty * product.price,
    };
  };

  const result = calc();
  const crop = product ? cropsData.find(c => selectedCrops.includes(c.id) && product.productName.toLowerCase().includes(c.name.toLowerCase().split(' ')[0])) : null;

  return (
    <div className="px-4 py-5 view-enter">
      <div className="mb-5">
        <h2 className="text-2xl font-black text-stone-800">Calculadora</h2>
        <p className="text-stone-500 text-sm font-medium mt-0.5">Estima tus ingresos según el precio de hoy</p>
      </div>

      {loading && prices.length === 0 ? (
        <div className="glass rounded-2xl p-6 text-center animate-pulse">
           <div className="text-stone-400 font-semibold text-sm">Cargando datos para calculadora...</div>
        </div>
      ) : available.length === 0 ? (
        <div className="glass rounded-2xl p-6 text-center">
          <div className="text-4xl mb-3">📭</div>
          <p className="text-stone-600 font-semibold text-sm">Selecciona cultivos con precios disponibles.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Product selector */}
          <div className="glass rounded-2xl p-4">
            <label className="text-xs font-black text-stone-500 uppercase tracking-widest block mb-2">Producto</label>
            <div className="grid grid-cols-2 gap-2">
              {available.map(p => {
                const c = cropsData.find(c => selectedCrops.includes(c.id) && p.productName.toLowerCase().includes(c.name.toLowerCase().split(' ')[0]));
                return (
                  <button
                    key={p.id}
                    onClick={() => handleProductChange(p.id)}
                    className={`flex items-center gap-2 p-3 rounded-xl border-2 text-left transition-all text-sm font-bold ${
                      selectedProductId === p.id
                        ? 'border-green-600 bg-green-50 text-green-800'
                        : 'border-stone-200 bg-white text-stone-600 hover:border-green-300'
                    }`}
                  >
                    <span className="text-xl">{c?.icon ?? '🌱'}</span>
                    <span className="text-xs leading-tight">{p.productName.split(' ').slice(0, 3).join(' ')}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quantity */}
          {product && (
            <div className="glass rounded-2xl p-4 space-y-4">
              <div>
                <label className="text-xs font-black text-stone-500 uppercase tracking-widest block mb-2">
                  ¿Cuánto tienes? (en {product.unit})
                </label>
                <input
                  type="number"
                  min="0"
                  step="any"
                  placeholder={`Ej: 100`}
                  value={quantity}
                  onChange={e => setQuantity(e.target.value)}
                  className="w-full text-3xl font-black text-stone-800 bg-stone-100 rounded-2xl px-5 py-4 border-2 border-transparent focus:border-green-500 focus:outline-none text-center transition-colors"
                />
              </div>
            </div>
          )}

          {/* Result */}
          {result && quantity && parseFloat(quantity) > 0 && (
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <div className="bg-gradient-to-br from-green-700 to-green-900 p-6 text-white text-center">
                <p className="text-xs font-bold uppercase tracking-widest text-green-200 mb-2">Ingreso estimado</p>
                <div className="text-5xl font-black mb-1">${result.total.toFixed(2)}</div>
                <p className="text-green-200 text-sm font-semibold">
                  {parseFloat(quantity)} {product.unit} de {product.productName}
                </p>
              </div>
            </div>
          )}

          {/* Price ref */}
          {product && (
            <div className="glass rounded-xl p-3.5">
              <p className="text-[11px] text-stone-500 font-semibold leading-relaxed">
                💡 Precio de referencia: <strong className="text-green-700">${product.price.toFixed(2)}</strong> por {product.unit} · Fuente: {product.source}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
