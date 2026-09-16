import { useState, useEffect } from 'react';

export interface MarketPrice {
  id: string;
  productName: string;
  region: string;
  price: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  source: string;
  isInternational?: boolean;
  originalPriceStr?: string;
}

export const useMarketPrices = () => {
  const [prices, setPrices] = useState<MarketPrice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPrices = async () => {
      setLoading(true);
      setError(null);
      
      const localApiUrl = import.meta.env.VITE_PRICES_API_URL || '/api/prices.json';
      const apiNinjasKey = import.meta.env.VITE_API_NINJAS_KEY;
      
      try {
        // 1. Obtener precios base locales
        const localResponse = await fetch(localApiUrl);
        let finalPrices: MarketPrice[] = [];
        if (localResponse.ok) {
          finalPrices = await localResponse.json();
        }

        // 2. Si tenemos la API Key, obtener el precio internacional del Cacao en tiempo real
        if (apiNinjasKey) {
          try {
            const intResponse = await fetch('https://api.api-ninjas.com/v1/commodityprice?name=cocoa', {
              headers: { 'X-Api-Key': apiNinjasKey }
            });
            
            if (intResponse.ok) {
              const intData = await intResponse.json();
              // El precio devuelto suele estar en USD por Tonelada Métrica (MT)
              const pricePerMT = intData.price;
              
              // Conversión: 1 MT = 22.0462 qq (quintales)
              const pricePerQQ = pricePerMT / 22.0462;
              
              // Descuento logístico y de exportación estimado para Finca (aprox $20)
              const discount = 20.00;
              const estimatedLocalPrice = pricePerQQ - discount;

              // Actualizamos el cacao Fino de Aroma (asumiendo id "1") en la lista
              finalPrices = finalPrices.map(p => {
                if (p.productName.toLowerCase().includes('cacao fino')) {
                  return {
                    ...p,
                    price: estimatedLocalPrice > 0 ? estimatedLocalPrice : p.price,
                    trend: 'up', // Simulado o calculado si guardamos un histórico
                    source: 'Cálculo desde Bolsa (ICE)',
                    isInternational: true,
                    originalPriceStr: `$${pricePerMT.toFixed(2)} / Tonelada (Global)`
                  };
                }
                if (p.productName.toLowerCase().includes('ccn-51')) {
                  // Descuento extra por variedad CCN-51 (aprox $8 menos)
                  const ccn51Price = estimatedLocalPrice - 8.00;
                  return {
                    ...p,
                    price: ccn51Price > 0 ? ccn51Price : p.price,
                    source: 'Cálculo desde Bolsa (ICE)',
                    isInternational: true,
                    originalPriceStr: `$${pricePerMT.toFixed(2)} / Tonelada (Global)`
                  };
                }
                return p;
              });
            }
          } catch (e) {
            console.error('Error obteniendo precio internacional:', e);
            // Fallback a precios locales si falla la internacional
          }
        }

        setPrices(finalPrices);
        localStorage.setItem('agriecuador_prices_cache', JSON.stringify(finalPrices));
      } catch (err) {
        const cached = localStorage.getItem('agriecuador_prices_cache');
        if (cached) {
          setPrices(JSON.parse(cached));
          setError('Modo sin conexión. Mostrando últimos precios guardados.');
        } else {
          setError('No se pudieron cargar los precios.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPrices();
  }, []);

  return { prices, loading, error };
};
