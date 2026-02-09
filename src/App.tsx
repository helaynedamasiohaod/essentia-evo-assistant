import React, { useState, useCallback } from 'react';
import { Screen, DevolutivaData } from '@/types';
import Sidebar from '@/components/Sidebar';
import UploadScreen from '@/screens/UploadScreen';
import AnalysisScreen from '@/screens/AnalysisScreen';
import EditorScreen from '@/screens/EditorScreen';
import SlidesScreen from '@/screens/SlidesScreen';
import ScriptScreen from '@/screens/ScriptScreen';
import HistoryScreen from '@/screens/HistoryScreen';
import { generateDevolutiva } from '@/services/geminiService';

const App: React.FC = () => {
  const [activeScreen, setActiveScreen] = useState<Screen>(Screen.UPLOAD);
  const [devolutivaData, setDevolutivaData] = useState<DevolutivaData | null>(null);
  const [history, setHistory] = useState<DevolutivaData[]>(() => {
    const saved = localStorage.getItem('devolutivaHistory');
    return saved ? JSON.parse(saved) : [];
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleAnalysisComplete = useCallback((data: DevolutivaData) => {
    setDevolutivaData(data);
    const newHistory = [data, ...history.filter(h => h.id !== data.id)];
    setHistory(newHistory);
    localStorage.setItem('devolutivaHistory', JSON.stringify(newHistory));
    setIsLoading(false);
    setActiveScreen(Screen.ANALYSIS);
  }, [history]);

  const handleStartAnalysis = async (subjectName: string) => {
    setIsLoading(true);
    // In a real app, you'd pass the files here
    const data = await generateDevolutiva(subjectName);
    handleAnalysisComplete(data);
  };
  
  const handleSelectHistory = (data: DevolutivaData) => {
    setDevolutivaData(data);
    setActiveScreen(Screen.ANALYSIS);
  };

  const renderScreen = () => {
    switch (activeScreen) {
      case Screen.UPLOAD:
        return <UploadScreen onStartAnalysis={handleStartAnalysis} isLoading={isLoading} />;
      case Screen.ANALYSIS:
        return <AnalysisScreen data={devolutivaData} onNavigate={setActiveScreen} />;
      case Screen.EDITOR:
        return <EditorScreen data={devolutivaData} onNavigate={setActiveScreen} />;
      case Screen.SLIDES:
        return <SlidesScreen data={devolutivaData} onNavigate={setActiveScreen} />;
      case Screen.SCRIPT:
        return <ScriptScreen data={devolutivaData} onNavigate={setActiveScreen} />;
      case Screen.HISTORY:
        return <HistoryScreen history={history} onSelect={handleSelectHistory} />;
      default:
        return <UploadScreen onStartAnalysis={handleStartAnalysis} isLoading={isLoading} />;
    }
  };

  return (
    <div className="flex h-screen bg-bg-primary text-text-primary font-body">
      <Sidebar activeScreen={activeScreen} setActiveScreen={setActiveScreen} />
      <main className="flex-1 p-4 sm:p-6 lg:p-10 overflow-y-auto">
        {renderScreen()}
      </main>
    </div>
  );
};

export default App;
