export interface Crop {
  id: string;
  name: string;
  category: 'Exportación' | 'Consumo Local' | 'Acuacultura';
  icon: string; // Emoji or URL
}
