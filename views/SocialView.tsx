import React from 'react';
import { Card, Icons, Badge } from '../components/UI';
import { Post } from '../types';

// Mock Data
const MOCK_POSTS: Post[] = [
  {
    id: '1',
    userId: 'u1',
    author: 'Juan Pérez',
    authorAvatar: 'https://picsum.photos/seed/juan/50/50',
    content: '¿Alguien ha probado el nuevo sistema de riego por goteo en cultivos de maíz? Estoy pensando en implementarlo esta temporada.',
    image: 'https://picsum.photos/seed/corn/600/300',
    likes: 24,
    comments: 5,
    timestamp: 'Hace 2 horas',
    tags: ['Maíz', 'Riego', 'Tecnología']
  },
  {
    id: '2',
    userId: 'u2',
    author: 'Maria Garcia',
    authorAvatar: 'https://picsum.photos/seed/maria/50/50',
    content: '¡Cosecha de tomates cherry lista! Este año la producción aumentó un 20% gracias a los biofertilizantes.',
    likes: 156,
    comments: 12,
    timestamp: 'Hace 5 horas',
    tags: ['Tomate', 'Orgánico', 'Cosecha']
  },
  {
    id: '3',
    userId: 'u3',
    author: 'Carlos Ruiz',
    authorAvatar: 'https://picsum.photos/seed/carlos/50/50',
    content: 'Detecté roya en mis cafetos. ¿Alguna recomendación orgánica efectiva?',
    likes: 8,
    comments: 23,
    timestamp: 'Hace 1 día',
    tags: ['Café', 'Plagas', 'Ayuda']
  }
];

export const SocialView: React.FC = () => {
  return (
    <div className="space-y-4 pb-20">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Comunidad</h2>
        <button className="bg-emerald-600 text-white p-2 rounded-full shadow-lg hover:bg-emerald-700 transition">
          <Icons.Plus className="w-6 h-6" />
        </button>
      </div>

      {MOCK_POSTS.map(post => (
        <Card key={post.id} className="p-0">
          <div className="p-4 flex items-center space-x-3">
            <img src={post.authorAvatar} alt={post.author} className="w-10 h-10 rounded-full object-cover" />
            <div>
              <p className="font-semibold text-gray-900">{post.author}</p>
              <p className="text-xs text-gray-500">{post.timestamp}</p>
            </div>
          </div>
          
          <div className="px-4 pb-2">
            <p className="text-gray-800 mb-3">{post.content}</p>
            <div className="flex flex-wrap gap-2 mb-2">
              {post.tags.map(tag => (
                <Badge key={tag} color="bg-emerald-50 text-emerald-700">#{tag}</Badge>
              ))}
            </div>
          </div>

          {post.image && (
            <img src={post.image} alt="Post content" className="w-full h-48 object-cover" />
          )}

          <div className="p-4 border-t border-gray-100 flex items-center justify-between text-gray-500">
            <button className="flex items-center space-x-1 hover:text-red-500 transition">
              <Icons.Heart className="w-5 h-5 text-gray-400 hover:text-red-500" />
              <span>{post.likes}</span>
            </button>
            <button className="flex items-center space-x-1 hover:text-emerald-600 transition">
              <Icons.Message className="w-5 h-5" />
              <span>{post.comments} Comentarios</span>
            </button>
            <button className="hover:text-emerald-600">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
            </button>
          </div>
        </Card>
      ))}
    </div>
  );
};