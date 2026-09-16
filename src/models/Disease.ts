export type CropId = 'cacao' | 'banano' | 'arroz' | 'maiz' | 'papa' | 'camaron' | 'tomate' | 'cebolla';

export interface Treatment {
  id: string;
  type: 'immediate' | 'biological' | 'chemical';
  title: string;
  description: string;
  ingredients?: string[];
  dosage?: string;
  frequency?: string;
  duration?: string;
  application?: string;
  precautions?: string[];
  effectiveness?: 'high' | 'medium' | 'low';
  cost?: 'low' | 'medium' | 'high';
  steps?: string[]; // Pasos para el checklist interactivo
}

export interface Disease {
  id: string;
  cropId: CropId;
  name: string;
  scientificName?: string;
  description: string;
  symptoms: string[];
  causes?: string[];
  prevention?: string[];
  severity: 'high' | 'medium' | 'low';
  imageUrl: string;
  treatments: Treatment[];
}
