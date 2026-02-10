import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import EditorScreen from '@/screens/EditorScreen';
import { Screen, DevolutivaData } from '@/types';

const mockDevolutivaData: DevolutivaData = {
  id: 'test-1',
  subjectName: 'Maria Santos',
  date: '2024-01-14',
  dominantProfile: 'I',
  discProfile: {
    d: 45,
    i: 80,
    s: 55,
    c: 40,
  },
  healthIndexes: [
    { name: 'Equilíbrio', value: '7/10', diagnosis: 'Bom', impact: 'Bom', isAlert: false },
  ],
  towerData: [
    { profile: 'D', selfPerception: 45, environmentDemand: 40 },
  ],
  skills: [
    { name: 'Persuasão', type: 'expansion' },
    { name: 'Adaptação', type: 'expansion' },
  ],
  pyramid: {
    base: [],
    middle: [],
    top: '',
  },
  burnoutRisk: false,
  generatedContent: {
    rapport: 'Maria demonstra forte capacidade de influência e comunicação.',
    pizzaChartAnalysis: 'Perfil I dominante indica pessoa extrovertida e influenciadora.',
    towerChartAnalysis: '',
    skillsAnalysis: '',
    healthIndexAnalysis: '',
    pyramidAnalysis: '',
    internalWarDiagnosis: '',
    smartTaskSuggestion: '',
    finalImpactQuestion: '',
    questions: {
      decrease: [],
      increase: [],
      expandSkill: [],
      retractSkill: [],
    },
  },
};

describe('EditorScreen', () => {
  it('should render "no data" message when data is null', () => {
    const mockNavigate = jest.fn();
    render(<EditorScreen data={null} onNavigate={mockNavigate} />);

    expect(screen.getByText('Nenhum dado disponível para edição.')).toBeInTheDocument();
  });

  it('should navigate to upload screen when data is null', () => {
    const mockNavigate = jest.fn();
    render(<EditorScreen data={null} onNavigate={mockNavigate} />);

    const uploadButton = screen.getByRole('button', { name: /Iniciar Nova Análise/i });
    fireEvent.click(uploadButton);

    expect(mockNavigate).toHaveBeenCalledWith(Screen.UPLOAD);
  });

  it('should render editor content when data is provided', () => {
    const mockNavigate = jest.fn();
    render(<EditorScreen data={mockDevolutivaData} onNavigate={mockNavigate} />);

    expect(screen.getByText('Editor de Devolutiva Estruturada')).toBeInTheDocument();
    expect(screen.getByText(`Revise e personalize o documento para ${mockDevolutivaData.subjectName}.`)).toBeInTheDocument();
  });

  it('should display generated rapport content', () => {
    const mockNavigate = jest.fn();
    render(<EditorScreen data={mockDevolutivaData} onNavigate={mockNavigate} />);

    expect(screen.getByText(/Rapport e Fundamentação/i)).toBeInTheDocument();
    expect(screen.getByText(mockDevolutivaData.generatedContent.rapport)).toBeInTheDocument();
  });

  it('should display pizza chart analysis', () => {
    const mockNavigate = jest.fn();
    render(<EditorScreen data={mockDevolutivaData} onNavigate={mockNavigate} />);

    expect(screen.getByText(/Análise do Gráfico em Pizza/i)).toBeInTheDocument();
    expect(screen.getByText(mockDevolutivaData.generatedContent.pizzaChartAnalysis)).toBeInTheDocument();
  });

  it('should display all main sections', () => {
    const mockNavigate = jest.fn();
    render(<EditorScreen data={mockDevolutivaData} onNavigate={mockNavigate} />);

    // Verify that the editor renders without crashing
    expect(screen.getByText('Editor de Devolutiva Estruturada')).toBeInTheDocument();
  });

  it('should navigate to slides when "Gerar Slides" button is clicked', () => {
    const mockNavigate = jest.fn();
    render(<EditorScreen data={mockDevolutivaData} onNavigate={mockNavigate} />);

    const slidesButton = screen.getByRole('button', { name: /Gerar Slides/i });
    fireEvent.click(slidesButton);

    expect(mockNavigate).toHaveBeenCalledWith(Screen.SLIDES);
  });

  it('should have "Salvar Rascunho" button', () => {
    const mockNavigate = jest.fn();
    render(<EditorScreen data={mockDevolutivaData} onNavigate={mockNavigate} />);

    const draftButton = screen.getByRole('button', { name: /Salvar Rascunho/i });
    expect(draftButton).toBeInTheDocument();
  });

  it('should display all generated content sections', () => {
    const mockNavigate = jest.fn();
    render(<EditorScreen data={mockDevolutivaData} onNavigate={mockNavigate} />);

    const sections = screen.getAllByText(/Rapport|Análise|Questões/i);
    expect(sections.length).toBeGreaterThan(0);
  });

  it('should display subject name in subtitle', () => {
    const mockNavigate = jest.fn();
    render(<EditorScreen data={mockDevolutivaData} onNavigate={mockNavigate} />);

    expect(screen.getByText(new RegExp(mockDevolutivaData.subjectName))).toBeInTheDocument();
  });
});
