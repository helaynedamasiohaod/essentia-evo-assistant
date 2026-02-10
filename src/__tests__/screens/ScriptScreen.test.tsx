import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ScriptScreen from '@/screens/ScriptScreen';
import { Screen, DevolutivaData } from '@/types';

const mockDevolutivaData: DevolutivaData = {
  id: 'test-1',
  subjectName: 'Ana Silva',
  date: '2024-01-12',
  dominantProfile: 'D',
  discProfile: {
    d: 80,
    i: 50,
    s: 45,
    c: 60,
  },
  healthIndexes: [
    { name: 'Força', value: '9/10', diagnosis: 'Excelente', impact: 'Muito determinada', isAlert: false },
  ],
  towerData: [
    { profile: 'D', selfPerception: 80, environmentDemand: 85 },
  ],
  skills: [
    { name: 'Liderança', type: 'expansion' },
    { name: 'Empatia', type: 'retraction' },
  ],
  pyramid: {
    base: [],
    middle: [],
    top: '',
  },
  burnoutRisk: false,
  generatedContent: {
    rapport: 'Ana é uma líder natural.',
    pizzaChartAnalysis: 'Perfil D dominante.',
    towerChartAnalysis: '',
    skillsAnalysis: '',
    healthIndexAnalysis: '',
    pyramidAnalysis: '',
    internalWarDiagnosis: '',
    smartTaskSuggestion: 'Tarefa: Melhorar empatia',
    finalImpactQuestion: 'Qual seria o impacto da mudança?',
    questions: {
      decrease: [
        { profile: 'D', question: 'Como você poderia ser menos agressivo?' },
      ],
      increase: [
        { profile: 'I', question: 'Como você poderia melhorar sua comunicação?' },
      ],
      expandSkill: [
        { skill: 'Delegação', question: 'Como melhorar sua capacidade de delegar?' },
      ],
      retractSkill: [
        { skill: 'Perfeccionismo', question: 'Como ser mais flexível?' },
      ],
    },
  },
};

describe('ScriptScreen', () => {
  it('should render "no data" message when data is null', () => {
    const mockNavigate = jest.fn();
    render(<ScriptScreen data={null} onNavigate={mockNavigate} />);

    expect(screen.getByText('Nenhum roteiro disponível.')).toBeInTheDocument();
  });

  it('should navigate to upload when data is null', () => {
    const mockNavigate = jest.fn();
    render(<ScriptScreen data={null} onNavigate={mockNavigate} />);

    const uploadButton = screen.getByRole('button', { name: /Iniciar Nova Análise/i });
    fireEvent.click(uploadButton);

    expect(mockNavigate).toHaveBeenCalledWith(Screen.UPLOAD);
  });

  it('should render script content when data is provided', () => {
    const mockNavigate = jest.fn();
    render(<ScriptScreen data={mockDevolutivaData} onNavigate={mockNavigate} />);

    expect(screen.getByText('Roteiro de Devolutiva Interativa')).toBeInTheDocument();
    expect(screen.getByText(`Guia para a sessão com ${mockDevolutivaData.subjectName}.`)).toBeInTheDocument();
  });

  it('should display "Finalizar Sessão" button', () => {
    const mockNavigate = jest.fn();
    render(<ScriptScreen data={mockDevolutivaData} onNavigate={mockNavigate} />);

    expect(screen.getByRole('button', { name: /Finalizar Sessão/i })).toBeInTheDocument();
  });

  it('should display question sections', () => {
    const mockNavigate = jest.fn();
    render(<ScriptScreen data={mockDevolutivaData} onNavigate={mockNavigate} />);

    expect(screen.getByText(/Perguntas Obrigatórias/i)).toBeInTheDocument();
    expect(screen.getByText(/Perguntas – Habilidades/i)).toBeInTheDocument();
    expect(screen.getByText(/Foco e Fechamento/i)).toBeInTheDocument();
  });

  it('should display question section headers', () => {
    const mockNavigate = jest.fn();
    render(<ScriptScreen data={mockDevolutivaData} onNavigate={mockNavigate} />);

    // Check that the component renders the question sections
    const sections = screen.getAllByText(/Perguntas/i);
    expect(sections.length).toBeGreaterThan(0);
  });

  it('should display textareas for notes', () => {
    const mockNavigate = jest.fn();
    const { container } = render(<ScriptScreen data={mockDevolutivaData} onNavigate={mockNavigate} />);

    const textareas = container.querySelectorAll('textarea');
    expect(textareas.length).toBeGreaterThan(0);
  });

  it('should display foco e fechamento section', () => {
    const mockNavigate = jest.fn();
    render(<ScriptScreen data={mockDevolutivaData} onNavigate={mockNavigate} />);

    expect(screen.getByText(/Foco e Fechamento/i)).toBeInTheDocument();
  });

  it('should display subject name in subtitle', () => {
    const mockNavigate = jest.fn();
    render(<ScriptScreen data={mockDevolutivaData} onNavigate={mockNavigate} />);

    expect(screen.getByText(new RegExp(mockDevolutivaData.subjectName))).toBeInTheDocument();
  });

  it('should display general notes section', () => {
    const mockNavigate = jest.fn();
    render(<ScriptScreen data={mockDevolutivaData} onNavigate={mockNavigate} />);

    expect(screen.getByText(/Anotações Gerais/i)).toBeInTheDocument();
  });
});
