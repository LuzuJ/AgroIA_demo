import React from 'react';
import { Card, Button, Icons } from '../components/UI';
import { Product } from '../types';

const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Fertilizante Orgánico NPK',
    price: 25.00,
    currency: 'USD',
    description: 'Saco de 50kg. Alta concentración.',
    category: 'Insumos',
    image: 'https://picsum.photos/seed/fert/300/300',
    seller: 'AgroStore'
  },
  {
    id: '2',
    name: 'Pala de Acero',
    price: 15.50,
    currency: 'USD',
    description: 'Mango reforzado, ideal para trabajo pesado.',
    category: 'Herramientas',
    image: 'https://picsum.photos/seed/shovel/300/300',
    seller: 'Ferretería Central'
  },
  {
    id: '3',
    name: 'Semillas de Maíz Híbrido',
    price: 80.00,
    currency: 'USD',
    description: 'Resistente a sequía. Saco de 60 mil semillas.',
    category: 'Semillas',
    image: 'https://picsum.photos/seed/seeds/300/300',
    seller: 'Semillas del Valle'
  },
  {
    id: '4',
    name: 'Kit de Poda',
    price: 45.00,
    currency: 'USD',
    description: 'Tijeras, serrucho y guantes.',
    category: 'Herramientas',
    image: 'https://picsum.photos/seed/tools/300/300',
    seller: 'AgroStore'
  }
];

export const MarketView: React.FC = () => {
  return (
    <div className="space-y-6 pb-20">
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 sticky top-0 z-10">
        <div className="relative">
          <input 
            type="text" 
            placeholder="Buscar productos..." 
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
          />
          <div className="absolute left-3 top-2.5 text-gray-400">
            <Icons.Search className="w-5 h-5" />
          </div>
        </div>
        <div className="flex gap-2 mt-3 overflow-x-auto pb-1 no-scrollbar">
          {['Todos', 'Insumos', 'Herramientas', 'Semillas', 'Maquinaria'].map(cat => (
            <button key={cat} className="px-4 py-1.5 rounded-full text-sm font-medium bg-gray-100 text-gray-600 whitespace-nowrap hover:bg-emerald-100 hover:text-emerald-700 transition">
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {MOCK_PRODUCTS.map(product => (
          <Card key={product.id} className="flex flex-col h-full">
            <div className="relative h-32">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
              <div className="absolute top-2 right-2 bg-white/90 backdrop-blur px-2 py-1 rounded text-xs font-bold text-gray-800 shadow-sm">
                ${product.price}
              </div>
            </div>
            <div className="p-3 flex flex-col flex-grow">
              <span className="text-xs text-emerald-600 font-medium mb-1">{product.category}</span>
              <h3 className="font-semibold text-gray-800 text-sm mb-1 leading-tight line-clamp-2">{product.name}</h3>
              <p className="text-xs text-gray-500 mb-3 line-clamp-2 flex-grow">{product.description}</p>
              <Button className="w-full text-sm py-1.5" variant="secondary">Ver Detalle</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};