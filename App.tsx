import React, { useState } from 'react';
import { AppView } from './types';
import { Icons } from './components/UI';
import { SocialView } from './views/SocialView';
import { MarketView } from './views/MarketView';
import { DiagnosisView } from './views/DiagnosisView';
import { WikiView } from './views/WikiView';
import { GroupsView } from './views/GroupsView';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<AppView>(AppView.SOCIAL);

  const renderView = () => {
    switch (activeView) {
      case AppView.SOCIAL: return <SocialView />;
      case AppView.MARKET: return <MarketView />;
      case AppView.DIAGNOSIS: return <DiagnosisView />;
      case AppView.WIKI: return <WikiView />;
      case AppView.GROUPS: return <GroupsView />;
      default: return <SocialView />;
    }
  };

  const NavItem = ({ view, icon, label }: { view: AppView; icon: React.ReactNode; label: string }) => {
    const isActive = activeView === view;
    return (
      <button 
        onClick={() => setActiveView(view)}
        className={`flex flex-col items-center justify-center w-full py-2 transition-colors ${
          isActive ? 'text-emerald-600' : 'text-gray-400 hover:text-gray-600'
        }`}
      >
        <div className={`p-1 rounded-xl transition-all ${isActive ? 'bg-emerald-50 -translate-y-1' : ''}`}>
          {React.cloneElement(icon as React.ReactElement, { 
            className: `w-6 h-6 ${isActive ? 'stroke-2' : 'stroke-2'}` 
          })}
        </div>
        <span className={`text-[10px] mt-1 font-medium ${isActive ? 'opacity-100' : 'opacity-80'}`}>
          {label}
        </span>
      </button>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col mx-auto max-w-md md:max-w-2xl shadow-2xl relative">
      
      {/* Top Bar */}
      <header className="bg-white px-6 py-4 flex items-center justify-between sticky top-0 z-50 border-b border-gray-100">
        <div className="flex items-center space-x-2">
          <div className="bg-emerald-600 rounded-lg p-1.5">
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-xl font-bold tracking-tight text-gray-800">Agri<span className="text-emerald-600">Connect</span></h1>
        </div>
        <img src="https://picsum.photos/seed/user/40/40" alt="Profile" className="w-9 h-9 rounded-full border border-gray-200" />
      </header>

      {/* Main Content Area */}
      <main className="flex-1 p-4 overflow-y-auto">
        {renderView()}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 w-full max-w-md md:max-w-2xl bg-white border-t border-gray-100 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] pb-safe-area">
        <div className="flex justify-around items-end h-16 pb-1">
          <NavItem view={AppView.SOCIAL} icon={<Icons.Home />} label="Inicio" />
          <NavItem view={AppView.GROUPS} icon={<Icons.Users />} label="Grupos" />
          
          {/* Central Action Button (Diagnosis) */}
          <div className="relative -top-5">
            <button 
              onClick={() => setActiveView(AppView.DIAGNOSIS)}
              className={`flex items-center justify-center w-14 h-14 rounded-full shadow-emerald-200 shadow-xl transition-transform active:scale-95 ${
                activeView === AppView.DIAGNOSIS ? 'bg-emerald-700 ring-4 ring-emerald-100' : 'bg-emerald-600 hover:bg-emerald-700'
              }`}
            >
              <Icons.Camera className="w-7 h-7 text-white" />
            </button>
          </div>

          <NavItem view={AppView.MARKET} icon={<Icons.ShoppingBag />} label="Tienda" />
          <NavItem view={AppView.WIKI} icon={<Icons.Book />} label="Wiki" />
        </div>
      </nav>
      
      {/* Safe area spacer for mobile */}
      <div className="h-safe-area bg-white"></div>
    </div>
  );
};

export default App;