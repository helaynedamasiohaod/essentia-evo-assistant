import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AnalysisScreen from '@/screens/AnalysisScreen';
import { Screen, DevolutivaData } from '@/types';

// Mock Recharts components to avoid rendering issues in tests
jest.mock('recharts', () => ({
  ResponsiveContainer: ({ children }: any) => <div data-testid="responsive-container">{children}</div>,
  PieChart: ({ children }: any) => <div data-testid="pie-chart">{children}</div>,
  BarChart: ({ children }: any) => <div data-testid="bar-chart">{children}</div>,
  Pie: () => <div data-testid="pie" />,
  Bar: () => <div data-testid="bar" />,
  XAxis: () => <div data-testid="x-axis" />,
  YAxis: () => <div data-testid="y-axis" />,
  CartesianGrid: () => <div data-testid="cartesian-grid" />,
  Tooltip: () => <div data-testid="tooltip" />,
  Legend: () => <div data-testid="legend" />,
  Cell: () => <div data-testid="cell" />,
}));

const mockDevolutivaData: DevolutivaData = {
  id: 'test-1',
  subjectName: 'João Silva',
  date: '2024-01-15',
  dominantProfile: 'D',
  discProfile: {
    d: 75,
    i: 45,
    s: 60,
    c: 50,
  },
  healthIndexes: [
    { name: 'Equilíbrio', value: '8/10', diagnosis: 'Bom', impact: 'Perfil bem balanceado', isAlert: false },
    { name: 'Consistência', value: '9/10', diagnosis: 'Excelente', impact: 'Muito consistente', isAlert: false },
    { name: 'Flexibilidade', value: '6/10', diagnosis: 'Regular', impact: 'Pode melhorar', isAlert: true },
  ],
  towerData: [
    { profile: 'D', selfPerception: 75, environmentDemand: 70 },
    { profile: 'I', selfPerception: 45, environmentDemand: 50 },
    { profile: 'S', selfPerception: 60, environmentDemand: 65 },
    { profile: 'C', selfPerception: 50, environmentDemand: 55 },
  ],
  skills: [
    { name: 'Liderança', type: 'expansion' },
    { name: 'Comunicação', type: 'expansion' },
    { name: 'Delegação', type: 'retraction' },
  ],
  pyramid: {
    base: ['Integridade'],
    middle: ['Foco'],
    top: 'Liderança',
  },
  burnoutRisk: false,
  generatedContent: {
    rapport: 'Teste de rapport',
    pizzaChartAnalysis: 'Análise do gráfico de pizza',
    towerChartAnalysis: 'Análise das torres',
    skillsAnalysis: 'Análise de habilidades',
    healthIndexAnalysis: 'Análise de índices',
    pyramidAnalysis: 'Análise da pirâmide',
    internalWarDiagnosis: 'Diagnóstico de conflito',
    smartTaskSuggestion: 'Sugestão de tarefa',
    finalImpactQuestion: 'Qual o impacto?',
    questions: {
      decrease: [],
      increase: [],
      expandSkill: [],
      retractSkill: [],
    },
  },
};

describe('AnalysisScreen', () => {
  it('should render "no data" message when data is null', () => {
    const mockNavigate = jest.fn();
    render(<AnalysisScreen data={null} onNavigate={mockNavigate} />);

    expect(screen.getByText('Nenhum dado de análise disponível.')).toBeInTheDocument();
    expect(screen.getByText('Por favor, inicie uma nova análise na tela de Upload.')).toBeInTheDocument();
  });

  it('should render upload navigation button when data is null', () => {
    const mockNavigate = jest.fn();
    render(<AnalysisScreen data={null} onNavigate={mockNavigate} />);

    const uploadButton = screen.getByRole('button', { name: /Ir para Upload/i });
    expect(uploadButton).toBeInTheDocument();
  });

  it('should navigate to upload screen when "Ir para Upload" button is clicked', () => {
    const mockNavigate = jest.fn();
    render(<AnalysisScreen data={null} onNavigate={mockNavigate} />);

    const uploadButton = screen.getByRole('button', { name: /Ir para Upload/i });
    fireEvent.click(uploadButton);

    expect(mockNavigate).toHaveBeenCalledWith(Screen.UPLOAD);
  });

  it('should render analysis content when data is provided', () => {
    const mockNavigate = jest.fn();
    render(<AnalysisScreen data={mockDevolutivaData} onNavigate={mockNavigate} />);

    expect(screen.getByText('Análise Automática & Validação')).toBeInTheDocument();
    expect(screen.getByText(`Resumo dos dados extraídos para ${mockDevolutivaData.subjectName}.`)).toBeInTheDocument();
  });

  it('should render health indexes with correct data', () => {
    const mockNavigate = jest.fn();
    render(<AnalysisScreen data={mockDevolutivaData} onNavigate={mockNavigate} />);

    mockDevolutivaData.healthIndexes.forEach((index) => {
      expect(screen.getByText(index.name)).toBeInTheDocument();
      expect(screen.getByText(index.value)).toBeInTheDocument();
      expect(screen.getByText(index.impact)).toBeInTheDocument();
    });
  });

  it('should display expansion and retraction skills', () => {
    const mockNavigate = jest.fn();
    render(<AnalysisScreen data={mockDevolutivaData} onNavigate={mockNavigate} />);

    expect(screen.getByText('Habilidades em Expansão')).toBeInTheDocument();
    expect(screen.getByText('Habilidades em Retração')).toBeInTheDocument();
    expect(screen.getByText('Liderança')).toBeInTheDocument();
    expect(screen.getByText('Delegação')).toBeInTheDocument();
  });

  it('should navigate to editor when "Confirmar e Prosseguir" button is clicked', () => {
    const mockNavigate = jest.fn();
    render(<AnalysisScreen data={mockDevolutivaData} onNavigate={mockNavigate} />);

    const editorButton = screen.getByRole('button', { name: /Confirmar e Prosseguir/i });
    fireEvent.click(editorButton);

    expect(mockNavigate).toHaveBeenCalledWith(Screen.EDITOR);
  });

  it('should render chart containers', () => {
    const mockNavigate = jest.fn();
    render(<AnalysisScreen data={mockDevolutivaData} onNavigate={mockNavigate} />);

    expect(screen.getByTestId('pie-chart')).toBeInTheDocument();
    expect(screen.getByTestId('bar-chart')).toBeInTheDocument();
  });

  it('should display "Sobreposição de Mapas" section', () => {
    const mockNavigate = jest.fn();
    render(<AnalysisScreen data={mockDevolutivaData} onNavigate={mockNavigate} />);

    expect(screen.getByText('Sobreposição de Mapas')).toBeInTheDocument();
  });

  it('should have alert styling for alert health indexes', () => {
    const mockNavigate = jest.fn();
    const { container } = render(<AnalysisScreen data={mockDevolutivaData} onNavigate={mockNavigate} />);

    // Find alert elements by checking for orange accent styling
    const alertElements = container.querySelectorAll('[class*="accent-orange"]');
    expect(alertElements.length).toBeGreaterThan(0);
  });
});
