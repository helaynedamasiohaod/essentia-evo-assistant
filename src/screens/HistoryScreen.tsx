import React from 'react';
import { DevolutivaData } from '@/types';
import { ExternalLinkIcon } from '@/components/icons';

interface HistoryScreenProps {
  history: DevolutivaData[];
  onSelect: (data: DevolutivaData) => void;
}

const HistoryScreen: React.FC<HistoryScreenProps> = ({ history, onSelect }) => {
  return (
    <div>
      <h1 className="text-4xl font-display font-bold text-text-primary mb-2">Biblioteca & Histórico</h1>
      <p className="text-lg text-text-secondary mb-8">Acesse e gerencie todas as devolutivas já geradas.</p>

      <div className="card-evo">
        <div className="p-4 flex justify-between items-center border-b border-[#333]">
            <input
                type="text"
                placeholder="Buscar por nome do pesquisado..."
                className="input-evo w-1/3"
            />
        </div>
        <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-text-secondary">
                <thead className="text-xs text-text-secondary uppercase bg-bg-elevated">
                    <tr>
                        <th scope="col" className="px-6 py-3">Nome do Pesquisado</th>
                        <th scope="col" className="px-6 py-3">Data</th>
                        <th scope="col" className="px-6 py-3">Perfil Dominante</th>
                        <th scope="col" className="px-6 py-3">Alertas de Saúde</th>
                        <th scope="col" className="px-6 py-3">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {history.length === 0 ? (
                        <tr>
                            <td colSpan={5} className="text-center py-10 text-text-secondary">Nenhuma devolutiva encontrada.</td>
                        </tr>
                    ) : (
                        history.map(item => (
                            <tr key={item.id} className="border-b border-[#333] hover:bg-bg-surface">
                                <th scope="row" className="px-6 py-4 font-medium text-text-primary whitespace-nowrap">
                                    {item.subjectName}
                                </th>
                                <td className="px-6 py-4">{item.date}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded text-xs font-bold ${
                                        item.dominantProfile === 'D' ? 'bg-disc-d/20 text-disc-d' :
                                        item.dominantProfile === 'I' ? 'bg-disc-i/20 text-disc-i' :
                                        item.dominantProfile === 'S' ? 'bg-disc-s/20 text-disc-s' :
                                        'bg-disc-c/20 text-disc-c'
                                    }`}>
                                        {item.dominantProfile} - {
                                          {D: 'Dominância', I: 'Influência', S: 'Estabilidade', C: 'Conformidade'}[item.dominantProfile]
                                        }
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    {item.healthIndexes.filter(i => i.isAlert).length > 0 ?
                                        <span className="text-accent-orange font-semibold">{item.healthIndexes.filter(i => i.isAlert).length} Alerta(s)</span> :
                                        <span className="text-accent-teal">Nenhum</span>
                                    }
                                </td>
                                <td className="px-6 py-4">
                                    <button
                                        onClick={() => onSelect(item)}
                                        className="font-medium text-accent-purple hover:text-accent-teal transition-colors flex items-center gap-1"
                                    >
                                        Visualizar <ExternalLinkIcon className="w-4 h-4" />
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
      </div>
    </div>
  );
};

export default HistoryScreen;
