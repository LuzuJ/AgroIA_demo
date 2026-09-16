import React, { useState, useEffect } from 'react';
import { AppView } from './types';
import { Onboarding } from './src/views/Onboarding';
import { MarketPrices } from './src/views/MarketPrices';
import { DiseasesCatalog } from './src/views/DiseasesCatalog';
import { Calculator } from './src/views/Calculator';

// ── Icons ────────────────────────────────────────────────────────────────────
const IconPrices = ({ active }: { active: boolean }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.5l7.5-7.5 4 4L21 4M21 4h-5m5 0v5" />
  </svg>
);
const IconBug = ({ active }: { active: boolean }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18c-4 0-7-3-7-7 0-3 2-5.5 5-6.5M12 18c4 0 7-3 7-7 0-3-2-5.5-5-6.5M12 18v3m0-21v3m-7 3H3m18 0h-2m-14 4H3m18 0h-2M5.5 8.5l-2-2m17 2l-2-2" />
  </svg>
);
const IconCalc = ({ active }: { active: boolean }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-6 h-6">
    <rect x="4" y="3" width="16" height="18" rx="2" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h8M8 12h2m4 0h2M8 17h2m4 0h2" />
  </svg>
);
const IconLeaf = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 19c-4-1-7-5-6-10C9 5 14 3 19 5c1 5-2 12-7 14z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 19c0-4-1-8-4-11" />
  </svg>
);

// ── Offline Banner ────────────────────────────────────────────────────────────
const OfflineBanner = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  useEffect(() => {
    const on = () => setIsOnline(true);
    const off = () => setIsOnline(false);
    window.addEventListener('online', on);
    window.addEventListener('offline', off);
    return () => { window.removeEventListener('online', on); window.removeEventListener('offline', off); };
  }, []);
  if (isOnline) return null;
  return (
    <div className="offline-bar text-center py-1.5 px-4 text-xs font-bold tracking-wide">
      📵 Sin conexión — mostrando datos guardados en tu dispositivo
    </div>
  );
};

// ── App ───────────────────────────────────────────────────────────────────────
const App: React.FC = () => {
  const [selectedCrops, setSelectedCrops] = useState<string[]>([]);
  const [activeView, setActiveView] = useState<AppView>(AppView.ONBOARDING);

  useEffect(() => {
    const saved = localStorage.getItem('agriecuador_crops');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.length > 0) {
        setSelectedCrops(parsed);
        setActiveView(AppView.PRICES);
      }
    }
  }, []);

  const toggleCrop = (id: string) =>
    setSelectedCrops(prev => prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]);

  const handleOnboardingComplete = () => {
    localStorage.setItem('agriecuador_crops', JSON.stringify(selectedCrops));
    setActiveView(AppView.PRICES);
  };

  const navItems = [
    { view: AppView.PRICES,   label: 'Precios',       Icon: IconPrices },
    { view: AppView.DISEASES, label: 'Enfermedades',  Icon: IconBug    },
    { view: AppView.CALC,     label: 'Calculadora',   Icon: IconCalc   },
  ];

  const renderView = () => {
    switch (activeView) {
      case AppView.ONBOARDING: return <Onboarding selectedCrops={selectedCrops} toggleCrop={toggleCrop} onComplete={handleOnboardingComplete} />;
      case AppView.PRICES:     return <MarketPrices selectedCrops={selectedCrops} />;
      case AppView.DISEASES:   return <DiseasesCatalog selectedCrops={selectedCrops} />;
      case AppView.CALC:       return <Calculator selectedCrops={selectedCrops} />;
      default:                 return <MarketPrices selectedCrops={selectedCrops} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col mx-auto max-w-md md:max-w-lg shadow-2xl relative" style={{ background: '#f7f3ee' }}>

      <OfflineBanner />

      {/* Header */}
      <header className="glass px-5 py-3 flex items-center justify-between sticky top-0 z-50 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="bg-green-700 rounded-xl p-2 text-white shadow-md">
            <IconLeaf />
          </div>
          <div>
            <h1 className="text-xl font-black text-green-900 leading-none">AgroL</h1>
            <p className="text-xs text-green-700 font-semibold leading-none mt-1">Precios · Cultivos · Campo</p>
          </div>
        </div>

        {activeView !== AppView.ONBOARDING && (
          <button
            onClick={() => setActiveView(AppView.ONBOARDING)}
            className="flex items-center gap-1.5 text-xs font-bold text-green-800 bg-green-100 hover:bg-green-200 px-3 py-2 rounded-full transition-colors border border-green-200"
          >
            🌾 Mis Cultivos
          </button>
        )}
      </header>

      {/* Main */}
      <main className="flex-1 overflow-y-auto pb-24 view-enter">
        {renderView()}
      </main>

      {/* Bottom Nav */}
      {activeView !== AppView.ONBOARDING && (
        <nav className="glass fixed bottom-0 w-full max-w-md md:max-w-lg border-t border-white/60 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] z-50">
          <div className="flex justify-around items-center h-16 px-2">
            {navItems.map(({ view, label, Icon }) => {
              const isActive = activeView === view;
              return (
                <button
                  key={view}
                  onClick={() => setActiveView(view)}
                  className={`flex flex-col items-center justify-center gap-1 w-full py-1 rounded-xl transition-all ${
                    isActive ? 'text-green-700' : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  <div className={`p-1.5 rounded-xl transition-all ${isActive ? 'bg-green-100 scale-110 shadow-sm' : ''}`}>
                    <Icon active={isActive} />
                  </div>
                  <span className={`text-[9px] font-bold tracking-wide uppercase ${isActive ? 'text-green-700' : 'text-gray-400'}`}>
                    {label}
                  </span>
                </button>
              );
            })}
          </div>
        </nav>
      )}
    </div>
  );
};

export default App;