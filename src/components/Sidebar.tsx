import React from 'react';
import { Screen } from '@/types';
import { UploadIcon, ChartIcon, EditIcon, SlidesIcon, ScriptIcon, HistoryIcon, LogoIcon } from '@/components/icons';

interface SidebarProps {
  activeScreen: Screen;
  setActiveScreen: (screen: Screen) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeScreen, setActiveScreen }) => {
  const navItems = [
    { screen: Screen.UPLOAD, icon: <UploadIcon />, label: 'Upload de Relatórios' },
    { screen: Screen.ANALYSIS, icon: <ChartIcon />, label: 'Análise & Validação' },
    { screen: Screen.EDITOR, icon: <EditIcon />, label: 'Editor de Devolutiva' },
    { screen: Screen.SLIDES, icon: <SlidesIcon />, label: 'Gerador de Slides' },
    { screen: Screen.SCRIPT, icon: <ScriptIcon />, label: 'Roteiro Interativo' },
    { screen: Screen.HISTORY, icon: <HistoryIcon />, label: 'Histórico' },
  ];

  return (
    <nav className="w-16 md:w-64 bg-bg-elevated border-r border-[#333] p-2 md:p-4 flex flex-col justify-between transition-all duration-300">
      <div>
        <div className="flex items-center justify-center md:justify-start gap-3 mb-10 p-2">
          <div className="text-gradient-evo text-2xl font-display font-bold">EVO</div>
          <h1 className="font-display text-xl font-bold hidden md:block text-text-primary">Assistant</h1>
        </div>
        <ul role="navigation">
          {navItems.map((item) => (
            <li key={item.screen}>
              <button
                onClick={() => setActiveScreen(item.screen)}
                aria-label={item.label}
                aria-current={activeScreen === item.screen ? 'page' : undefined}
                title={item.label}
                className={`w-full flex items-center gap-3 p-3 my-1 rounded transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-accent-purple ${
                  activeScreen === item.screen
                    ? 'bg-evo-gradient text-white'
                    : 'text-text-secondary hover:text-text-primary hover:bg-bg-surface'
                }`}
              >
                {item.icon}
                <span className="hidden md:block font-medium text-sm">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
       <div className="p-2 border-t border-[#333] hidden md:block">
          <p className="text-xs text-text-secondary text-center">EVO Assistant v2.0</p>
       </div>
    </nav>
  );
};

export default Sidebar;
