import { Disease } from '../models/Disease';

export const diseasesData: Disease[] = [
  // CACAO
  {
    id: 'cacao-monilia',
    cropId: 'cacao',
    name: 'Monilia',
    scientificName: 'Moniliophthora roreri',
    description: 'Enfermedad fúngica que pudre la mazorca internamente.',
    symptoms: ['Manchas café/chocolate', 'Polvillo blanco', 'Pudrición interna'],
    severity: 'high',
    imageUrl: '/images/diseases/cacao-moniliasis.jpg',
    causes: ['Alta humedad', 'Falta de poda'],
    prevention: ['Poda regular', 'Remover mazorcas enfermas semanalmente'],
    treatments: [
      {
        id: 't1', type: 'immediate', title: 'Poda Sanitaria', description: 'Remover mazorcas infectadas',
        steps: ['Identificar mazorcas', 'Cortar con tijeras desinfectadas', 'Enterrar a 50cm'], effectiveness: 'high', cost: 'low'
      },
      {
        id: 't2', type: 'biological', title: 'Trichoderma', description: 'Hongo antagonista',
        dosage: '3-5g / litro', frequency: 'Cada 15 días', steps: ['Preparar mezcla', 'Fumigar temprano'], effectiveness: 'medium', cost: 'medium'
      },
      {
        id: 't3', type: 'chemical', title: 'Fungicida Cúprico', description: 'Cobre preventivo',
        dosage: '3g / litro', precautions: ['Usar mascarilla'], effectiveness: 'high', cost: 'low'
      }
    ]
  },
  {
    id: 'cacao-escoba',
    cropId: 'cacao',
    name: 'Escoba de Bruja',
    scientificName: 'Moniliophthora perniciosa',
    description: 'Deformación de brotes vegetativos pareciendo escobas.',
    symptoms: ['Brotes engrosados', 'Cojines florales deformes'],
    severity: 'high',
    imageUrl: '/images/diseases/cacao-escoba.jpg',
    treatments: [
      { id: 't1', type: 'immediate', title: 'Corte de escobas', description: 'Cortar 15cm debajo de la escoba', steps: ['Cortar', 'Quemar residuos'], effectiveness: 'high', cost: 'low' },
      { id: 't2', type: 'chemical', title: 'Fungicidas Sistémicos', description: 'Tebuconazol', dosage: '1ml / litro', precautions: ['Carencia 30 días'], effectiveness: 'high', cost: 'high' }
    ]
  },
  {
    id: 'cacao-mazorca-negra',
    cropId: 'cacao',
    name: 'Mazorca Negra',
    scientificName: 'Phytophthora palmivora',
    description: 'Pudrición negra y rápida de las mazorcas.',
    symptoms: ['Manchas negras', 'Pudrición total en días'],
    severity: 'high',
    imageUrl: '/images/diseases/cacao-phytophthora.jpg',
    treatments: [
      { id: 't1', type: 'immediate', title: 'Drenaje', description: 'Mejorar drenajes del suelo', steps: ['Hacer zanjas', 'Eliminar charcos'], effectiveness: 'medium', cost: 'low' },
      { id: 't2', type: 'chemical', title: 'Metalaxyl', description: 'Fungicida curativo', dosage: '2g / litro', precautions: ['Tóxico para peces'], effectiveness: 'high', cost: 'medium' }
    ]
  },

  // BANANO
  {
    id: 'banano-sigatoka',
    cropId: 'banano',
    name: 'Sigatoka Negra',
    scientificName: 'Mycosphaerella fijiensis',
    description: 'Destruye el área foliar de la planta.',
    symptoms: ['Pizcas marrones en hojas', 'Necrosis foliar'],
    severity: 'high',
    imageUrl: '/images/diseases/banano-sigatoka.jpg',
    treatments: [
      { id: 't1', type: 'immediate', title: 'Deshoje', description: 'Cortar hojas enfermas', steps: ['Cortar al ras', 'Apilar en el suelo'], effectiveness: 'high', cost: 'low' },
      { id: 't2', type: 'chemical', title: 'Mancozeb', description: 'Fungicida protector', dosage: '2.5kg / ha', precautions: ['Usar equipo de protección'], effectiveness: 'high', cost: 'high' }
    ]
  },
  {
    id: 'banano-moko',
    cropId: 'banano',
    name: 'Moko Bacteriano',
    scientificName: 'Ralstonia solanacearum',
    description: 'Marchitamiento bacteriano letal.',
    symptoms: ['Amarillamiento de hojas centrales', 'Racimo deforme'],
    severity: 'high',
    imageUrl: '/images/diseases/banano-moko.jpg',
    treatments: [
      { id: 't1', type: 'immediate', title: 'Erradicación', description: 'Destruir planta infectada', steps: ['Aplicar herbicida a la planta', 'No mover tierra'], effectiveness: 'high', cost: 'medium' },
      { id: 't2', type: 'biological', title: 'Desinfección', description: 'Desinfectar herramientas', steps: ['Usar amonio cuaternario', 'Lavar botas'], effectiveness: 'high', cost: 'low' }
    ]
  },
  {
    id: 'banano-fusarium',
    cropId: 'banano',
    name: 'Mal de Panamá (Foc R4T)',
    scientificName: 'Fusarium oxysporum f. sp. cubense',
    description: 'Hongo de suelo devastador.',
    symptoms: ['Hojas viejas amarillas', 'Faldón de hojas muertas'],
    severity: 'high',
    imageUrl: '/images/diseases/banano-fusarium.jpg',
    treatments: [
      { id: 't1', type: 'immediate', title: 'Cuarentena', description: 'Aislar la zona', steps: ['Cercar 10m alrededor', 'Avisar a Agrocalidad'], effectiveness: 'high', cost: 'low' },
      { id: 't2', type: 'chemical', title: 'Amonio Cuaternario', description: 'Desinfección de calzado', dosage: 'Puro en pediluvios', precautions: ['Uso obligatorio'], effectiveness: 'medium', cost: 'low' }
    ]
  },

  // ARROZ
  {
    id: 'arroz-piricularia',
    cropId: 'arroz',
    name: 'Piricularia',
    scientificName: 'Magnaporthe oryzae',
    description: 'Principal enfermedad fúngica del arroz.',
    symptoms: ['Manchas en forma de diamante en hojas', 'Cuello de la panícula quebrado'],
    severity: 'high',
    imageUrl: '/images/diseases/arroz-piricularia.jpg',
    treatments: [
      { id: 't1', type: 'immediate', title: 'Manejo de Agua', description: 'Mantener lámina de agua estable', steps: ['Inundar el lote a 5cm'], effectiveness: 'medium', cost: 'low' },
      { id: 't2', type: 'chemical', title: 'Triciclazol', description: 'Fungicida sistémico', dosage: '300g / ha', precautions: ['Aplicar al observar primeras manchas'], effectiveness: 'high', cost: 'medium' }
    ]
  },
  {
    id: 'arroz-vaneamiento',
    cropId: 'arroz',
    name: 'Virus Hoja Blanca',
    scientificName: 'Rice Hoja Blanca Virus',
    description: 'Transmitido por el insecto Sogata.',
    symptoms: ['Rayas blancas en hojas', 'Granos vanos'],
    severity: 'medium',
    imageUrl: '/images/diseases/arroz-hojablanca.jpg',
    treatments: [
      { id: 't1', type: 'chemical', title: 'Control de Sogata', description: 'Insecticida', dosage: 'Según etiqueta', precautions: ['Rotar ingredientes activos'], effectiveness: 'high', cost: 'medium' }
    ]
  },

  // MAÍZ
  {
    id: 'maiz-pudricion',
    cropId: 'maiz',
    name: 'Pudrición de Mazorca',
    scientificName: 'Fusarium verticillioides',
    description: 'Pudrición algodonosa en los granos.',
    symptoms: ['Granos blanquecinos o rosados', 'Olor a fermento'],
    severity: 'medium',
    imageUrl: '/images/diseases/maiz-pudricion.jpg',
    treatments: [
      { id: 't1', type: 'immediate', title: 'Cosecha Oportuna', description: 'Cosechar apenas alcance madurez', steps: ['Doblar la caña', 'Cosechar pronto'], effectiveness: 'high', cost: 'low' }
    ]
  },
  {
    id: 'maiz-roya',
    cropId: 'maiz',
    name: 'Roya del Maíz',
    scientificName: 'Puccinia sorghi',
    description: 'Pústulas en las hojas.',
    symptoms: ['Pústulas color óxido en ambas caras de la hoja'],
    severity: 'medium',
    imageUrl: '/images/diseases/maiz-roya.jpg',
    treatments: [
      { id: 't1', type: 'chemical', title: 'Triazoles', description: 'Fungicida curativo', dosage: '0.5L / ha', precautions: ['Carencia 21 días'], effectiveness: 'high', cost: 'medium' }
    ]
  },

  // PAPA
  {
    id: 'papa-tizon',
    cropId: 'papa',
    name: 'Tizón Tardío (Lancha)',
    scientificName: 'Phytophthora infestans',
    description: 'La enfermedad más destructiva de la papa.',
    symptoms: ['Manchas verde oscuro acuosas', 'Pelusa blanca en el envés'],
    severity: 'high',
    imageUrl: '/images/diseases/papa-tizon.jpg',
    treatments: [
      { id: 't1', type: 'immediate', title: 'Aporque alto', description: 'Cubrir bien el tubérculo', steps: ['Subir la tierra al tallo'], effectiveness: 'medium', cost: 'low' },
      { id: 't2', type: 'chemical', title: 'Cymoxanil + Mancozeb', description: 'Fungicida', dosage: '2.5kg / ha', precautions: ['Usar equipo de protección'], effectiveness: 'high', cost: 'high' }
    ]
  },
  {
    id: 'papa-rizoctonia',
    cropId: 'papa',
    name: 'Rizoctoniasis',
    scientificName: 'Rhizoctonia solani',
    description: 'Costras negras en el tubérculo.',
    symptoms: ['Costras negras en papa', 'Brotes quemados al nacer'],
    severity: 'medium',
    imageUrl: '/images/diseases/papa-rizoctonia.jpg',
    treatments: [
      { id: 't1', type: 'biological', title: 'Rotación de cultivos', description: 'No sembrar papa 3 años', steps: ['Rotar con pastos'], effectiveness: 'high', cost: 'low' }
    ]
  },

  // CAMARÓN
  {
    id: 'camaron-mancha-blanca',
    cropId: 'camaron',
    name: 'Virus de la Mancha Blanca',
    scientificName: 'WSSV',
    description: 'Virus letal para el camarón.',
    symptoms: ['Puntos blancos en el caparazón', 'Letargo', 'Mortalidad masiva'],
    severity: 'high',
    imageUrl: '/images/diseases/camaron-manchablanca.jpg',
    treatments: [
      { id: 't1', type: 'immediate', title: 'Aislamiento', description: 'No recambiar agua', steps: ['Cerrar compuertas', 'Pesca de emergencia'], effectiveness: 'low', cost: 'high' },
      { id: 't2', type: 'biological', title: 'Vitamina C y Beta-glucanos', description: 'Mejora del sistema inmune', dosage: 'En el balanceado', frequency: 'Diario', effectiveness: 'medium', cost: 'medium' }
    ]
  },
  {
    id: 'camaron-vibriosis',
    cropId: 'camaron',
    name: 'Vibriosis',
    scientificName: 'Vibrio spp.',
    description: 'Infección bacteriana oportunista.',
    symptoms: ['Hepatopáncreas rojo o atrofiado', 'Antenas rojas'],
    severity: 'medium',
    imageUrl: '/images/diseases/camaron-vibriosis.jpg',
    treatments: [
      { id: 't1', type: 'biological', title: 'Probióticos en agua', description: 'Bacterias benéficas (Bacillus)', dosage: '500g / ha', frequency: 'Semanal', effectiveness: 'high', cost: 'medium' }
    ]
  },

  // TOMATE Y CEBOLLA
  {
    id: 'tomate-lancha',
    cropId: 'tomate',
    name: 'Lancha del Tomate',
    description: 'Igual al tizón de la papa.',
    symptoms: ['Manchas necróticas en tallo y fruto'],
    severity: 'high',
    imageUrl: '/images/diseases/papa-tizon.jpg',
    treatments: [
      { id: 't1', type: 'chemical', title: 'Fungicidas', description: 'Clorotalonil preventivo', dosage: '2g / litro', effectiveness: 'high', cost: 'medium' }
    ]
  },
  {
    id: 'tomate-mosaico',
    cropId: 'tomate',
    name: 'Virus del Mosaico',
    description: 'Hojas arrugadas y mosaico.',
    symptoms: ['Hojas con parches amarillos'],
    severity: 'medium',
    imageUrl: '/images/diseases/tomate-mosaico.jpg',
    treatments: [
      { id: 't1', type: 'immediate', title: 'Arranque', description: 'Eliminar plantas enfermas', steps: ['Arrancar de raíz', 'Quemar lejos'], effectiveness: 'high', cost: 'low' }
    ]
  },
  {
    id: 'cebolla-mildiu',
    cropId: 'cebolla',
    name: 'Mildiu Velloso',
    description: 'Hongo de climas húmedos.',
    symptoms: ['Manchas pálidas', 'Vellosidad gris/violácea'],
    severity: 'high',
    imageUrl: '/images/diseases/cebolla-mildiu.jpg',
    treatments: [
      { id: 't1', type: 'chemical', title: 'Mancozeb', description: 'Aplicación preventiva', dosage: '2kg / ha', effectiveness: 'high', cost: 'medium' }
    ]
  }
];
