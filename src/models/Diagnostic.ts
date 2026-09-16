export interface Diagnostic {
  id: string;
  imageUrl: string;
  diseaseName: string;
  severity: 'Baja' | 'Media' | 'Alta';
  homeRemedy: string;
  chemicalTreatment: string;
  date: string; // ISO date string
}
