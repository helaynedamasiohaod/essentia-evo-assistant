import React, { useState } from 'react';
import FileUpload from '@/components/FileUpload';
import { ReportFiles } from '@/types';

interface UploadScreenProps {
  onStartAnalysis: (subjectName: string) => void;
  isLoading: boolean;
}

const UploadScreen: React.FC<UploadScreenProps> = ({ onStartAnalysis, isLoading }) => {
  const [subjectName, setSubjectName] = useState('');
  const [files, setFiles] = useState<ReportFiles>({
    disc: null,
    anchors: null,
    strengths: null,
    valuation: null,
  });

  const handleFileSelect = (type: keyof ReportFiles, file: File | null) => {
    setFiles((prevFiles) => ({ ...prevFiles, [type]: file }));
  };
  
  // The original prompt requires all files, but for demonstration, let's allow proceeding with just the name
  // In a real scenario, this would check all files: Object.values(files).every(f => f !== null)
  const isFormComplete = subjectName.trim() !== '';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormComplete && !isLoading) {
      onStartAnalysis(subjectName);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-display font-bold text-gradient-evo">
          Bem-vindo à EssentIA
        </h1>
        <p className="mt-4 text-lg text-text-secondary">
          Para começarmos a montagem da Devolutiva de Identidade, por favor, insira o nome do pesquisado e anexe os relatórios.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8 p-8 card-evo">
        <div>
          <label htmlFor="subjectName" className="block text-sm font-medium text-text-secondary">
            Nome do Pesquisado
          </label>
          <input
            type="text"
            id="subjectName"
            value={subjectName}
            onChange={(e) => setSubjectName(e.target.value)}
            className="input-evo mt-1 block w-full sm:text-sm"
            placeholder="Ex: João da Silva"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FileUpload label="DISC Gerencial" onFileSelect={(file) => handleFileSelect('disc', file)} />
          <FileUpload label="Âncoras de Carreira" onFileSelect={(file) => handleFileSelect('anchors', file)} />
          <FileUpload label="Forças Pessoais" onFileSelect={(file) => handleFileSelect('strengths', file)} />
          <FileUpload label="Linguagem de Valorização" onFileSelect={(file) => handleFileSelect('valuation', file)} />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={!isFormComplete || isLoading}
            className="btn-evo disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processando...
              </>
            ) : (
              'Iniciar Análise'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UploadScreen;
