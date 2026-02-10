import React, { useState } from 'react';
import { PDFUploadData, DevolutivaSession } from '@/types/devolutiva';
import { useDevolutivaAnalysis } from '@/hooks/useDevolutivaAnalysis';

/**
 * Component: DevolutivaAnalysisFlow
 * Demonstrates complete integration of:
 * - PDF extraction (PDFProcessingService)
 * - 15-step generation (DevolutivaAnalysisService)
 * - Index calculation (IndexCalculationService)
 * - Correlation analysis (CorrelationService)
 */

interface DevolutivaAnalysisFlowProps {
  onAnalysisComplete?: (session: DevolutivaSession) => void;
}

const DevolutivaAnalysisFlow: React.FC<DevolutivaAnalysisFlowProps> = ({
  onAnalysisComplete,
}) => {
  const [subjectName, setSubjectName] = useState('');
  const [selectedFiles, setSelectedFiles] = useState<Partial<PDFUploadData>>({});
  const { state, analyze, reset } = useDevolutivaAnalysis();

  /**
   * Handle file selection
   */
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: keyof PDFUploadData) => {
    if (e.target.files?.[0]) {
      setSelectedFiles((prev) => ({
        ...prev,
        [type]: e.target.files![0],
      }));
    }
  };

  /**
   * Handle analysis start
   */
  const handleStartAnalysis = async () => {
    if (!subjectName.trim()) {
      alert('Por favor, digite o nome da pessoa');
      return;
    }

    // Check all files are selected
    const requiredFiles: (keyof PDFUploadData)[] = [
      'discFile',
      'anchorsFile',
      'strengthsFile',
      'languagesFile',
    ];

    const missingFiles = requiredFiles.filter((f) => !selectedFiles[f]);
    if (missingFiles.length > 0) {
      alert(`Por favor, selecione todos os arquivos PDF: ${missingFiles.join(', ')}`);
      return;
    }

    try {
      const session = await analyze(subjectName, selectedFiles as PDFUploadData);
      onAnalysisComplete?.(session);
    } catch (error) {
      console.error('Erro ao gerar devolutiva:', error);
    }
  };

  /**
   * Get progress percentage for visual feedback
   */
  const progressSteps = [
    { label: 'Validando', percent: 5 },
    { label: 'Extraindo PDFs', percent: 30 },
    { label: 'Calculando Índices', percent: 50 },
    { label: 'Gerando Devolutiva', percent: 80 },
    { label: 'Analisando Correlações', percent: 95 },
    { label: 'Completo!', percent: 100 },
  ];

  const currentProgressStep = progressSteps.find((s) => s.percent >= state.progress);

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-50 rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">EssentIA Devolutiva Completa</h1>

      {/* Error Display */}
      {state.error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-700 font-semibold">Erro ao processar:</p>
          <p className="text-red-600">{state.error}</p>
        </div>
      )}

      {/* Input Section */}
      {!state.isLoading && state.progress === 0 && (
        <div className="space-y-6">
          {/* Subject Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nome da Pessoa
            </label>
            <input
              type="text"
              value={subjectName}
              onChange={(e) => setSubjectName(e.target.value)}
              placeholder="Ex: João Silva"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={state.isLoading}
            />
          </div>

          {/* File Uploads */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* DISC PDF */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                📊 PDF DISC
              </label>
              <input
                type="file"
                accept=".pdf"
                onChange={(e) => handleFileChange(e, 'discFile')}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg cursor-pointer"
                disabled={state.isLoading}
              />
              {selectedFiles.discFile && (
                <p className="text-sm text-green-600 mt-1">✓ {selectedFiles.discFile.name}</p>
              )}
            </div>

            {/* Anchors PDF */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                🎯 PDF Âncoras
              </label>
              <input
                type="file"
                accept=".pdf"
                onChange={(e) => handleFileChange(e, 'anchorsFile')}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg cursor-pointer"
                disabled={state.isLoading}
              />
              {selectedFiles.anchorsFile && (
                <p className="text-sm text-green-600 mt-1">✓ {selectedFiles.anchorsFile.name}</p>
              )}
            </div>

            {/* Strengths PDF */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                💪 PDF Forças
              </label>
              <input
                type="file"
                accept=".pdf"
                onChange={(e) => handleFileChange(e, 'strengthsFile')}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg cursor-pointer"
                disabled={state.isLoading}
              />
              {selectedFiles.strengthsFile && (
                <p className="text-sm text-green-600 mt-1">✓ {selectedFiles.strengthsFile.name}</p>
              )}
            </div>

            {/* Languages PDF */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                💬 PDF Linguagens
              </label>
              <input
                type="file"
                accept=".pdf"
                onChange={(e) => handleFileChange(e, 'languagesFile')}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg cursor-pointer"
                disabled={state.isLoading}
              />
              {selectedFiles.languagesFile && (
                <p className="text-sm text-green-600 mt-1">
                  ✓ {selectedFiles.languagesFile.name}
                </p>
              )}
            </div>
          </div>

          {/* Start Button */}
          <button
            onClick={handleStartAnalysis}
            disabled={state.isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 rounded-lg transition"
          >
            {state.isLoading ? 'Processando...' : 'Gerar Devolutiva Completa'}
          </button>
        </div>
      )}

      {/* Progress Section */}
      {state.isLoading && (
        <div className="space-y-6">
          {/* Progress Bar */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <p className="text-sm font-medium text-gray-700">Progresso</p>
              <p className="text-sm font-semibold text-blue-600">{state.progress}%</p>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                style={{ width: `${state.progress}%` }}
              ></div>
            </div>
          </div>

          {/* Current Step */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-gray-600">Etapa atual:</p>
            <p className="text-lg font-semibold text-blue-700">{state.currentStep}</p>
          </div>

          {/* Steps Overview */}
          <div className="space-y-2">
            {progressSteps.map((step, idx) => (
              <div
                key={idx}
                className={`flex items-center space-x-3 p-2 rounded ${
                  state.progress >= step.percent ? 'bg-green-50' : 'bg-gray-100'
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                    state.progress >= step.percent
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-300 text-gray-600'
                  }`}
                >
                  {state.progress >= step.percent ? '✓' : `${idx + 1}`}
                </div>
                <span className="text-sm font-medium text-gray-700">{step.label}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Results Section */}
      {state.session && state.data && (
        <div className="space-y-6 mt-6">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-green-700 font-semibold">✓ Devolutiva gerada com sucesso!</p>
          </div>

          {/* Results Summary */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Subject Info */}
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <p className="text-sm text-gray-600">Nome</p>
              <p className="text-lg font-semibold text-gray-900">{state.data.subjectName}</p>
            </div>

            {/* DISC Profile */}
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <p className="text-sm text-gray-600">Perfil Dominante</p>
              <p className="text-lg font-semibold text-gray-900">{state.data.dominantProfile}</p>
            </div>

            {/* Number of Steps */}
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <p className="text-sm text-gray-600">Passos Gerados</p>
              <p className="text-lg font-semibold text-gray-900">{state.session.steps.length}</p>
            </div>

            {/* Burnout Risk */}
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <p className="text-sm text-gray-600">Risco de Burnout</p>
              <p className="text-lg font-semibold text-gray-900">
                {state.data.burnoutRisk ? '⚠️ Alto' : '✓ Baixo'}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              onClick={reset}
              className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 rounded-lg transition"
            >
              Gerar Outra Devolutiva
            </button>
            <button
              onClick={() => {
                console.log('Session:', state.session);
                console.log('Data:', state.data);
              }}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition"
            >
              Ver Dados Completos
            </button>
          </div>

          {/* Steps Preview */}
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-4">15 Passos Gerados:</h3>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {state.session.steps.map((step) => (
                <div key={step.stepNumber} className="flex items-start space-x-3 p-2 hover:bg-gray-50">
                  <div className="text-sm font-semibold text-blue-600 min-w-8">
                    {step.stepNumber}.
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{step.title}</p>
                    <p className="text-xs text-gray-600">{step.phase}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DevolutivaAnalysisFlow;
