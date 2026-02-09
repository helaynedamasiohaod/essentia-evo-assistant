import React from 'react';
import { DevolutivaData, Screen } from '@/types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { AlertTriangleIcon } from '@/components/icons';

interface AnalysisScreenProps {
  data: DevolutivaData | null;
  onNavigate: (screen: Screen) => void;
}

const COLORS = { D: '#EF4444', I: '#FBBF24', S: '#3B82F6', C: '#22C55E' };

const AnalysisScreen: React.FC<AnalysisScreenProps> = ({ data, onNavigate }) => {
  if (!data) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center">
        <h2 className="text-2xl font-bold text-text-secondary">Nenhum dado de análise disponível.</h2>
        <p className="mt-2 text-text-secondary">Por favor, inicie uma nova análise na tela de Upload.</p>
        <button
          onClick={() => onNavigate(Screen.UPLOAD)}
          className="mt-6 btn-evo"
        >
          Ir para Upload
        </button>
      </div>
    );
  }

  const pieData = [
    { name: 'Dominância (D)', value: data.discProfile.d },
    { name: 'Influência (I)', value: data.discProfile.i },
    { name: 'Estabilidade (S)', value: data.discProfile.s },
    { name: 'Conformidade (C)', value: data.discProfile.c },
  ];
  const pieColors = [COLORS.D, COLORS.I, COLORS.S, COLORS.C];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
            <h1 className="text-4xl font-display font-bold text-text-primary">Análise Automática & Validação</h1>
            <p className="mt-2 text-lg text-text-secondary">Resumo dos dados extraídos para {data.subjectName}.</p>
        </div>
        <button
            onClick={() => onNavigate(Screen.EDITOR)}
            className="btn-evo"
        >
            Confirmar e Prosseguir
        </button>
      </div>

      {/* Health Indexes */}
      <div className="card-evo">
        <h2 className="text-2xl font-display font-bold mb-4">Índices de Saúde do Perfil</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {data.healthIndexes.map((index) => (
            <div key={index.name} className={`p-4 rounded ${index.isAlert ? 'bg-accent-orange/20 border border-accent-orange' : 'bg-bg-surface border border-[#333]'}`}>
                <div className="flex items-center gap-3">
                    {index.isAlert && <AlertTriangleIcon className="text-accent-orange h-6 w-6 flex-shrink-0" />}
                    <h3 className="text-lg font-bold text-text-primary">{index.name}</h3>
                </div>
                <p className="text-sm font-mono text-accent-teal mt-2">{index.value}</p>
                <p className="mt-2 text-sm text-text-secondary">{index.impact}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Charts */}
        <div className="lg:col-span-2 card-evo">
          <h2 className="text-2xl font-display font-bold mb-6">Gráficos Comportamentais</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
             <div>
                <h3 className="text-lg font-semibold text-center mb-4">Perfil Dominante (Pizza)</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                    <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                        {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                        ))}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: '#18181b', border: '1px solid #333' }}/>
                    </PieChart>
                </ResponsiveContainer>
             </div>
             <div>
                <h3 className="text-lg font-semibold text-center mb-4">Percepção vs. Meio (Torres)</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={data.towerData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" strokeOpacity={0.2} />
                    <XAxis dataKey="profile" />
                    <YAxis />
                    <Tooltip contentStyle={{ backgroundColor: '#18181b', border: '1px solid #333' }}/>
                    <Legend />
                    <Bar dataKey="selfPerception" name="Percepção de Si (Verde)" fill="#10B981" />
                    <Bar dataKey="environmentDemand" name="Exigência do Meio (Azul)" fill="#3B82F6" />
                    </BarChart>
                </ResponsiveContainer>
              </div>
          </div>
        </div>

        {/* Skills */}
        <div className="card-evo">
          <h2 className="text-2xl font-display font-bold mb-4">Sobreposição de Mapas</h2>
          <div>
            <h3 className="font-semibold text-accent-teal mb-2">Habilidades em Expansão</h3>
            <ul className="list-disc list-inside space-y-1 text-text-secondary">
              {data.skills.filter(s => s.type === 'expansion').map(skill => <li key={skill.name}>{skill.name}</li>)}
            </ul>
          </div>
          <div className="mt-6">
            <h3 className="font-semibold text-accent-orange mb-2">Habilidades em Retração</h3>
            <ul className="list-disc list-inside space-y-1 text-text-secondary">
              {data.skills.filter(s => s.type === 'retraction').map(skill => <li key={skill.name}>{skill.name}</li>)}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalysisScreen;
