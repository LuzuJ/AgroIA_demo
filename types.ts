export enum AppView {
  SOCIAL = 'SOCIAL',
  MARKET = 'MARKET',
  DIAGNOSIS = 'DIAGNOSIS',
  WIKI = 'WIKI',
  GROUPS = 'GROUPS'
}

export interface User {
  id: string;
  name: string;
  avatar: string;
  location: string;
  role: 'Agricultor' | 'Ingeniero' | 'Proveedor';
}

export interface Post {
  id: string;
  userId: string;
  author: string;
  authorAvatar: string;
  content: string;
  image?: string;
  likes: number;
  comments: number;
  timestamp: string;
  tags: string[];
}

export interface Product {
  id: string;
  name: string;
  price: number;
  currency: string;
  description: string;
  category: string;
  image: string;
  seller: string;
}

export interface Disease {
  id: string;
  name: string;
  scientificName: string;
  symptoms: string[];
  treatment: string;
  plants: string[];
  image: string;
}

export interface Group {
  id: string;
  name: string;
  members: number;
  description: string;
  image: string;
  isJoined: boolean;
}

export interface DiagnosisResult {
  diseaseName: string;
  confidence: string;
  description: string;
  treatment: string;
  preventativeMeasures: string[];
}
