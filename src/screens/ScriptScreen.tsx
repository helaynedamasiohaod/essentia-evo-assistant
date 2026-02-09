import React from 'react';
import { DevolutivaData, Screen } from '@/types';

interface ScriptScreenProps {
  data: DevolutivaData | null;
  onNavigate: (screen: Screen) => void;
}

const ScriptSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="card-evo transition-shadow hover:shadow-lg hover:shadow-accent-purple/20">
        <h2 className="text-2xl font-display font-bold text-accent-teal mb-4">{title}</h2>
        {children}
    </div>
);

const QuestionBlock: React.FC<{ category: string; question: string; color: string; }> = ({ category, question, color }) => (
    <div className={`p-4 border-l-4 ${color} bg-bg-elevated rounded-r border-r border-[#333] border-t border-b mb-4`}>
        <h3 className="font-semibold text-text-primary">{category}</h3>
        <p className="italic text-text-secondary mt-2">"{question}"</p>
        <textarea
            className="input-evo mt-4 w-full"
            rows={3}
            placeholder="Anote os insights do pesquisado aqui..."
        ></textarea>
    </div>
);

const ScriptScreen: React.FC<ScriptScreenProps> = ({ data, onNavigate }) => {
  if (!data) {
     return (
      <div className="flex flex-col items-center justify-center h-full">
        <h2 className="text-2xl font-bold text-text-secondary">Nenhum roteiro disponível.</h2>
        <button onClick={() => onNavigate(Screen.UPLOAD)} className="mt-6 btn-evo">
          Iniciar Nova Análise
        </button>
      </div>
    );
  }

  const { questions } = data.generatedContent;

  return (
    <div className="max-w-5xl mx-auto">
       <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-display font-bold text-text-primary">Roteiro de Devolutiva Interativa</h1>
          <p className="mt-2 text-lg text-text-secondary">Guia para a sessão com {data.subjectName}.</p>
        </div>
        <button className="btn-evo">
          Finalizar Sessão
        </button>
      </div>

      <ScriptSection title="Perguntas Obrigatórias – Gráficos em Torres">
        {questions.decrease.map(q =>
            <QuestionBlock key={q.profile} category={`Perfil a Diminuir: ${q.profile}`} question={q.question} color="border-accent-orange" />
        )}
        {questions.increase.map(q =>
            <QuestionBlock key={q.profile} category={`Perfil a Aumentar: ${q.profile}`} question={q.question} color="border-accent-teal" />
        )}
      </ScriptSection>

      <ScriptSection title="Perguntas – Habilidades">
         {questions.expandSkill.map(q =>
            <QuestionBlock key={q.skill} category={`Habilidade a Expandir: ${q.skill}`} question={q.question} color="border-accent-purple" />
        )}
        {questions.retractSkill.map(q =>
            <QuestionBlock key={q.skill} category={`Habilidade a Retrair: ${q.skill}`} question={q.question} color="border-accent-orange" />
        )}
      </ScriptSection>

      <ScriptSection title="Foco e Fechamento">
          <QuestionBlock category="Escolha do Foco (SMART)" question="Se você pudesse escolher apenas 1 ponto de melhoria para trabalhar esta semana, qual escolheria?" color="border-accent-teal" />
          <QuestionBlock category="Pergunta Final de Impacto" question={data.generatedContent.finalImpactQuestion} color="border-accent-purple" />
      </ScriptSection>

      <div className="mt-8">
        <h2 className="text-xl font-display font-bold mb-2 text-text-primary">Anotações Gerais / Insights do Analista</h2>
        <textarea
            className="input-evo w-full h-48"
            placeholder="Espaço para suas anotações livres durante a sessão..."
        ></textarea>
      </div>
    </div>
  );
};

export default ScriptScreen;
