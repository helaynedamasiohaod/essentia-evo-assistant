import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SlidesScreen from '@/screens/SlidesScreen';
import { Screen, DevolutivaData } from '@/types';

// Mock Recharts
jest.mock('recharts', () => ({
  ResponsiveContainer: ({ children }: any) => <div data-testid="responsive-container-slide">{children}</div>,
  PieChart: ({ children }: any) => <div data-testid="pie-chart-slide">{children}</div>,
  BarChart: ({ children }: any) => <div data-testid="bar-chart-slide">{children}</div>,
  Pie: () => <div data-testid="pie-slide" />,
  Bar: () => <div data-testid="bar-slide" />,
  XAxis: () => <div data-testid="x-axis-slide" />,
  YAxis: () => <div data-testid="y-axis-slide" />,
  CartesianGrid: () => <div data-testid="cartesian-grid-slide" />,
  Tooltip: () => <div data-testid="tooltip-slide" />,
  Legend: () => <div data-testid="legend-slide" />,
  Cell: () => <div data-testid="cell-slide" />,
}));

const mockDevolutivaData: DevolutivaData = {
  id: 'test-1',
  subjectName: 'Carlos Costa',
  date: '2024-01-13',
  dominantProfile: 'S',
  discProfile: {
    d: 50,
    i: 55,
    s: 75,
    c: 55,
  },
  healthIndexes: [
    { name: 'Estabilidade', value: '8/10', diagnosis: 'Excelente', impact: 'Muito estável', isAlert: false },
  ],
  towerData: [
    { profile: 'D', selfPerception: 50, environmentDemand: 45 },
    { profile: 'I', selfPerception: 55, environmentDemand: 60 },
    { profile: 'S', selfPerception: 75, environmentDemand: 70 },
    { profile: 'C', selfPerception: 55, environmentDemand: 50 },
  ],
  skills: [
    { name: 'Paciência', type: 'expansion' },
    { name: 'Cooperação', type: 'expansion' },
  ],
  pyramid: {
    base: ['Integridade'],
    middle: ['Lealdade'],
    top: 'Confiabilidade',
  },
  burnoutRisk: false,
  generatedContent: {
    rapport: 'Carlos é conhecido por sua lealdade e estabilidade.',
    pizzaChartAnalysis: 'Perfil S forte indica pessoa confiável e paciente.',
    towerChartAnalysis: 'Sua percepção combina bem com o que é exigido.',
    skillsAnalysis: 'Habilidades focadas em trabalho em equipe.',
    healthIndexAnalysis: 'Índices de saúde estáveis',
    pyramidAnalysis: 'Análise de pirâmide',
    internalWarDiagnosis: 'Sem conflitos internos',
    smartTaskSuggestion: 'Tarefa: Desenvolver um projeto colaborativo.',
    finalImpactQuestion: 'Qual seria o impacto?',
    questions: {
      decrease: [],
      increase: [],
      expandSkill: [],
      retractSkill: [],
    },
  },
};

describe('SlidesScreen', () => {
  it('should render "no data" message when data is null', () => {
    const mockNavigate = jest.fn();
    render(<SlidesScreen data={null} onNavigate={mockNavigate} />);

    expect(screen.getByText('Nenhum dado para gerar slides.')).toBeInTheDocument();
  });

  it('should navigate to upload when data is null', () => {
    const mockNavigate = jest.fn();
    render(<SlidesScreen data={null} onNavigate={mockNavigate} />);

    const uploadButton = screen.getByRole('button', { name: /Iniciar Nova Análise/i });
    fireEvent.click(uploadButton);

    expect(mockNavigate).toHaveBeenCalledWith(Screen.UPLOAD);
  });

  it('should render slides content when data is provided', () => {
    const mockNavigate = jest.fn();
    render(<SlidesScreen data={mockDevolutivaData} onNavigate={mockNavigate} />);

    expect(screen.getByText('Gerador de Apresentação')).toBeInTheDocument();
    expect(screen.getByText(`Preview dos slides gerados para ${mockDevolutivaData.subjectName}.`)).toBeInTheDocument();
  });

  it('should display download button', () => {
    const mockNavigate = jest.fn();
    render(<SlidesScreen data={mockDevolutivaData} onNavigate={mockNavigate} />);

    expect(screen.getByRole('button', { name: /Download/i })).toBeInTheDocument();
  });

  it('should render multiple slide previews', () => {
    const mockNavigate = jest.fn();
    render(<SlidesScreen data={mockDevolutivaData} onNavigate={mockNavigate} />);

    const slidePreviews = screen.getAllByText(/Slide \d+/i);
    expect(slidePreviews.length).toBeGreaterThan(5); // Should have at least 5 slides
  });

  it('should display slide preview elements', () => {
    const mockNavigate = jest.fn();
    const { container } = render(<SlidesScreen data={mockDevolutivaData} onNavigate={mockNavigate} />);

    const slidePreviews = container.querySelectorAll('[class*="aspect-[16/9]"]');
    expect(slidePreviews.length).toBeGreaterThan(0);
  });

  it('should render pie chart for DISC profile', () => {
    const mockNavigate = jest.fn();
    render(<SlidesScreen data={mockDevolutivaData} onNavigate={mockNavigate} />);

    expect(screen.getByTestId('pie-chart-slide')).toBeInTheDocument();
  });

  it('should render bar chart for tower analysis', () => {
    const mockNavigate = jest.fn();
    render(<SlidesScreen data={mockDevolutivaData} onNavigate={mockNavigate} />);

    expect(screen.getByTestId('bar-chart-slide')).toBeInTheDocument();
  });

  it('should display pyramid information in slides', () => {
    const mockNavigate = jest.fn();
    render(<SlidesScreen data={mockDevolutivaData} onNavigate={mockNavigate} />);

    expect(screen.getByText(/Pirâmide de Identidade EVO/i)).toBeInTheDocument();
  });

  it('should display SMART task suggestion', () => {
    const mockNavigate = jest.fn();
    render(<SlidesScreen data={mockDevolutivaData} onNavigate={mockNavigate} />);

    expect(screen.getByText(/Próximos Passos: Tarefa SMART/i)).toBeInTheDocument();
  });

  it('should display header with preview text', () => {
    const mockNavigate = jest.fn();
    render(<SlidesScreen data={mockDevolutivaData} onNavigate={mockNavigate} />);

    expect(screen.getByText(/Preview dos slides gerados/i)).toBeInTheDocument();
  });
});
