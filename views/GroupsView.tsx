import React from 'react';
import { Card, Button, Icons } from '../components/UI';
import { Group } from '../types';

const MOCK_GROUPS: Group[] = [
  {
    id: '1',
    name: 'Maiceros del Norte',
    members: 1240,
    description: 'Comunidad para compartir técnicas de cultivo de maíz en la zona norte.',
    image: 'https://picsum.photos/seed/cornfield/100/100',
    isJoined: true
  },
  {
    id: '2',
    name: 'Agricultura Orgánica',
    members: 5890,
    description: 'Consejos y certificación para productores 100% orgánicos.',
    image: 'https://picsum.photos/seed/organic/100/100',
    isJoined: false
  },
  {
    id: '3',
    name: 'Tecnología Agrícola',
    members: 890,
    description: 'Drones, sensores y software para el campo.',
    image: 'https://picsum.photos/seed/drone/100/100',
    isJoined: false
  }
];

export const GroupsView: React.FC = () => {
  return (
    <div className="space-y-4 pb-20">
      <div className="flex justify-between items-center px-1">
        <h2 className="text-2xl font-bold text-gray-800">Grupos</h2>
        <Button variant="outline" className="text-sm py-1.5 px-3">
          <Icons.Plus className="w-4 h-4 mr-1" /> Crear
        </Button>
      </div>

      <div className="grid gap-4">
        {MOCK_GROUPS.map(group => (
          <Card key={group.id} className="p-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img src={group.image} alt={group.name} className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-sm" />
              <div>
                <h3 className="font-bold text-gray-900">{group.name}</h3>
                <div className="flex items-center text-xs text-gray-500 mt-1">
                  <Icons.Users className="w-3 h-3 mr-1" />
                  {group.members.toLocaleString()} miembros
                </div>
              </div>
            </div>
            <Button 
              variant={group.isJoined ? "outline" : "primary"} 
              className={`text-xs px-3 py-1.5 ${group.isJoined ? 'border-gray-300' : ''}`}
            >
              {group.isJoined ? 'Unido' : 'Unirme'}
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
};