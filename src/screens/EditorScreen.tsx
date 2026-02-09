import React from 'react';
import { DevolutivaData, Screen } from '@/types';

interface EditorScreenProps {
  data: DevolutivaData | null;
  onNavigate: (screen: Screen) => void;
}

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="card-evo mb-6">
        <h2 className="text-2xl font-display font-bold mb-4 border-b border-[#333] pb-2">{title}</h2>
        <div className="prose prose-invert max-w-none text-text-secondary">
            {children}
        </div>
    </div>
);

const EditorScreen: React.FC<EditorScreenProps> = ({ data, onNavigate }) => {
  if (!data) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <h2 className="text-2xl font-bold text-text-secondary">Nenhum dado disponível para edição.</h2>
        <button onClick={() => onNavigate(Screen.UPLOAD)} className="mt-6 btn-evo">
          Iniciar Nova Análise
        </button>
      </div>
    );
  }

  const { generatedContent } = data;

  return (
    <div>
        <div className="flex justify-between items-center mb-8">
            <div>
                <h1 className="text-4xl font-display font-bold text-text-primary">Editor de Devolutiva Estruturada</h1>
                <p className="mt-2 text-lg text-text-secondary">Revise e personalize o documento para {data.subjectName}.</p>
            </div>
            <div className="flex gap-4">
                 <button onClick={() => {}} className="btn-evo opacity-75">
                    Salvar Rascunho
                </button>
                <button
                    onClick={() => onNavigate(Screen.SLIDES)}
                    className="btn-evo"
                >
                    Gerar Slides
                </button>
            </div>
        </div>

        <Section title="Rapport e Fundamentação">
            <p>{generatedContent.rapport}</p>
        </Section>

        <Section title="Análise do Gráfico em Pizza">
            <p>{generatedContent.pizzaChartAnalysis}</p>
        </Section>

        <Section title="Diagnóstico – 'Guerra Interna'">
            <p>{generatedContent.internalWarDiagnosis}</p>
        </Section>

        <Section title="Análise dos Gráficos em Torres">
            <p>{generatedContent.towerChartAnalysis}</p>
            <div className="mt-4 space-y-4">
                {generatedContent.questions.decrease.map(q => (
                    <div key={q.profile} className="p-4 bg-bg-surface rounded border border-[#333]">
                        <h4 className="font-semibold text-accent-orange">Perfil a Diminuir: {q.profile}</h4>
                        <p className="italic mt-1 text-text-secondary">"{q.question}"</p>
                    </div>
                ))}
                 {generatedContent.questions.increase.map(q => (
                    <div key={q.profile} className="p-4 bg-bg-surface rounded border border-[#333]">
                        <h4 className="font-semibold text-accent-teal">Perfil a Aumentar: {q.profile}</h4>
                        <p className="italic mt-1 text-text-secondary">"{q.question}"</p>
                    </div>
                ))}
            </div>
        </Section>

        <Section title="Sobreposição de Mapas (Habilidades)">
            <p>{generatedContent.skillsAnalysis}</p>
        </Section>

        <Section title="Índices de Saúde do Perfil">
            <p>{generatedContent.healthIndexAnalysis}</p>
        </Section>

        <Section title="Pirâmide EVO – Cruzamento Final de Identidade">
            <p>{generatedContent.pyramidAnalysis}</p>
        </Section>

        <Section title="Tarefa SMART e Fechamento Metanoico">
            <p>{generatedContent.smartTaskSuggestion}</p>
            <div className="mt-4 p-4 bg-bg-surface rounded border border-[#333]">
                <h4 className="font-semibold text-accent-purple">Pergunta Final de Impacto</h4>
                <p className="italic mt-1 text-text-secondary">"{generatedContent.finalImpactQuestion}"</p>
            </div>
        </Section>
    </div>
  );
};

export default EditorScreen;
