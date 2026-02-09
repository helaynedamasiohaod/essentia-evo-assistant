import React from 'react';
import { DevolutivaData, Screen, SlideContent } from '@/types';
import { DownloadIcon } from '@/components/icons';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface SlidesScreenProps {
  data: DevolutivaData | null;
  onNavigate: (screen: Screen) => void;
}

const SlidePreview: React.FC<{ slide: SlideContent, number: number }> = ({ slide, number }) => (
    <div className="aspect-[16/9] bg-bg-surface rounded border-2 border-[#333] p-6 flex flex-col justify-center items-center text-center shadow-lg transform hover:scale-105 transition-transform duration-300">
        <div className="flex-grow flex flex-col justify-center items-center">
            <h3 className="font-display text-xl md:text-2xl font-bold text-accent-teal">{slide.title}</h3>
            {typeof slide.content === 'string' ? (
                <p className="mt-4 text-sm text-text-secondary">{slide.content.substring(0, 100)}...</p>
            ) : (
                <div className="mt-4 w-full h-48">{slide.content}</div>
            )}
        </div>
        <div className="w-full text-right text-xs text-text-secondary mt-2">
            Slide {number}
        </div>
    </div>
);

const SlidesScreen: React.FC<SlidesScreenProps> = ({ data, onNavigate }) => {
  if (!data) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <h2 className="text-2xl font-bold text-text-secondary">Nenhum dado para gerar slides.</h2>
        <button onClick={() => onNavigate(Screen.UPLOAD)} className="mt-6 btn-evo">
          Iniciar Nova Análise
        </button>
      </div>
    );
  }

  const COLORS = { D: '#EF4444', I: '#FBBF24', S: '#3B82F6', C: '#22C55E' };
  const pieData = Object.entries(data.discProfile).map(([key, value]) => ({ name: key.toUpperCase(), value }));
  const pieColors = [COLORS.D, COLORS.I, COLORS.S, COLORS.C];

  const slides: SlideContent[] = [
      { title: `Devolutiva de Identidade: ${data.subjectName}`, content: `Análise Comportamental - Metodologia EVO` },
      { title: "Introdução ao DISC", content: data.generatedContent.rapport },
      { title: "Seu Perfil Comportamental", content: <ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={40} outerRadius={70} label><Cell fill={COLORS.D}/><Cell fill={COLORS.I}/><Cell fill={COLORS.S}/><Cell fill={COLORS.C}/></Pie><Tooltip contentStyle={{ backgroundColor: '#18181b', border: '1px solid #333' }}/></PieChart></ResponsiveContainer> },
      { title: "Análise do Perfil", content: data.generatedContent.pizzaChartAnalysis },
      { title: "A 'Guerra Interna'", content: <ResponsiveContainer width="100%" height="100%"><BarChart data={data.towerData}><CartesianGrid strokeDasharray="3 3" stroke="#333" opacity={0.1}/><XAxis dataKey="profile"/><YAxis/><Tooltip contentStyle={{ backgroundColor: '#18181b', border: '1px solid #333' }}/><Legend/><Bar dataKey="selfPerception" name="Si" fill="#10B981" /><Bar dataKey="environmentDemand" name="Meio" fill="#3B82F6" /></BarChart></ResponsiveContainer> },
      { title: "Interpretando as Torres", content: data.generatedContent.towerChartAnalysis },
      { title: "Índices de Saúde", content: "Diagnóstico objetivo do seu estado atual de energia e autoestima." },
      { title: "Pirâmide de Identidade EVO", content: `Base: ${data.pyramid.base[0]}. Meio: ${data.pyramid.middle[0]}. Topo: ${data.pyramid.top}.`},
      { title: "Habilidades Chave", content: data.generatedContent.skillsAnalysis },
      { title: "Próximos Passos: Tarefa SMART", content: data.generatedContent.smartTaskSuggestion },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-display font-bold text-text-primary">Gerador de Apresentação</h1>
          <p className="mt-2 text-lg text-text-secondary">Preview dos slides gerados para {data.subjectName}.</p>
        </div>
        <button className="btn-evo flex items-center gap-2">
          <DownloadIcon />
          Download (PPT/PDF)
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {slides.map((slide, index) => (
              <SlidePreview key={index} slide={slide} number={index + 1} />
          ))}
      </div>
    </div>
  );
};

export default SlidesScreen;
