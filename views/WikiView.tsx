import React from 'react';
import { Card, Icons } from '../components/UI';

const MOCK_DISEASES = [
  {
    id: '1',
    name: 'Tizón Tardío',
    plant: 'Tomate, Papa',
    image: 'https://picsum.photos/seed/blight/100/100',
    desc: 'Hongo que causa manchas negras en hojas y frutos.'
  },
  {
    id: '2',
    name: 'Oidio',
    plant: 'Cucurbitáceas',
    image: 'https://picsum.photos/seed/mildew/100/100',
    desc: 'Polvo blanco sobre las hojas que reduce la fotosíntesis.'
  },
  {
    id: '3',
    name: 'Mosca Blanca',
    plant: 'Varias',
    image: 'https://picsum.photos/seed/fly/100/100',
    desc: 'Insecto pequeño que se alimenta de la savia.'
  }
];

export const WikiView: React.FC = () => {
  return (
    <div className="space-y-4 pb-20">
      <div className="bg-emerald-800 text-white p-6 rounded-2xl mb-6">
        <h2 className="text-2xl font-bold mb-2">Enciclopedia Agrícola</h2>
        <p className="text-emerald-100 text-sm mb-4">Base de conocimiento sobre enfermedades y tratamientos.</p>
        <div className="relative">
          <input 
            type="text" 
            placeholder="Buscar enfermedad o planta..." 
            className="w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur border border-white/20 rounded-lg text-white placeholder-emerald-200 focus:outline-none focus:bg-white/20"
          />
          <Icons.Search className="w-5 h-5 absolute left-3 top-3.5 text-emerald-200" />
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="font-bold text-gray-800 px-1">Más consultados</h3>
        {MOCK_DISEASES.map(d => (
          <Card key={d.id} className="p-3 flex items-start space-x-4 cursor-pointer hover:shadow-md transition">
            <img src={d.image} alt={d.name} className="w-16 h-16 rounded-lg object-cover bg-gray-200" />
            <div>
              <h4 className="font-bold text-gray-900">{d.name}</h4>
              <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">{d.plant}</span>
              <p className="text-sm text-gray-500 mt-1 line-clamp-2">{d.desc}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};