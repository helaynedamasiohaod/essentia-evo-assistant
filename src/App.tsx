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
    try {
      const saved = localStorage.getItem('devolutivaHistory');
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error('Failed to load history from localStorage:', error);
      return [];
    }
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalysisComplete = useCallback((data: DevolutivaData) => {
    setDevolutivaData(data);
    const newHistory = [data, ...history.filter(h => h.id !== data.id)];
    setHistory(newHistory);
    localStorage.setItem('devolutivaHistory', JSON.stringify(newHistory));
    setIsLoading(false);
    setActiveScreen(Screen.ANALYSIS);
  }, [history]);

  const handleStartAnalysis = async (subjectName: string) => {
    // Input validation
    if (!subjectName?.trim()) {
      setError('Please enter a name');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // In a real app, you'd pass the files here
      const data = await generateDevolutiva(subjectName);
      handleAnalysisComplete(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to generate analysis';
      console.error('Analysis error:', err);
      setError(errorMessage);
      setIsLoading(false);
    }
  };
  
  const handleSelectHistory = (data: DevolutivaData) => {
    setDevolutivaData(data);
    setActiveScreen(Screen.ANALYSIS);
  };

  const renderScreen = () => {
    // Show error message if present
    if (error && activeScreen === Screen.UPLOAD) {
      return (
        <>
          <div
            role="alert"
            aria-live="polite"
            aria-atomic="true"
            className="mb-4 p-4 bg-red-900/20 border border-red-700 rounded-lg text-red-400 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <p className="font-semibold">Erro ao processar</p>
            <p>{error}</p>
          </div>
          <UploadScreen onStartAnalysis={handleStartAnalysis} isLoading={isLoading} />
        </>
      );
    }

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
