import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import HistoryScreen from '@/screens/HistoryScreen';
import { DevolutivaData } from '@/types';

const mockHistoryItems: DevolutivaData[] = [
  {
    id: 'hist-1',
    subjectName: 'Pedro Oliveira',
    date: '2024-01-15',
    dominantProfile: 'D',
    discProfile: { d: 85, i: 40, s: 35, c: 45 },
    healthIndexes: [
      { name: 'Força', value: '9/10', diagnosis: 'Excelente', impact: 'Forte', isAlert: false },
      { name: 'Flexibilidade', value: '4/10', diagnosis: 'Baixa', impact: 'Baixa', isAlert: true },
    ],
    towerData: [],
    skills: [],
    pyramid: { base: [], middle: [], top: '' },
    burnoutRisk: false,
    generatedContent: {
      rapport: '',
      pizzaChartAnalysis: '',
      towerChartAnalysis: '',
      skillsAnalysis: '',
      healthIndexAnalysis: '',
      pyramidAnalysis: '',
      internalWarDiagnosis: '',
      smartTaskSuggestion: '',
      finalImpactQuestion: '',
      questions: { decrease: [], increase: [], expandSkill: [], retractSkill: [] },
    },
  },
  {
    id: 'hist-2',
    subjectName: 'Lucia Ferreira',
    date: '2024-01-14',
    dominantProfile: 'I',
    discProfile: { d: 50, i: 80, s: 55, c: 45 },
    healthIndexes: [
      { name: 'Comunicação', value: '8/10', diagnosis: 'Excelente', impact: 'Excelente', isAlert: false },
    ],
    towerData: [],
    skills: [],
    pyramid: { base: [], middle: [], top: '' },
    burnoutRisk: false,
    generatedContent: {
      rapport: '',
      pizzaChartAnalysis: '',
      towerChartAnalysis: '',
      skillsAnalysis: '',
      healthIndexAnalysis: '',
      pyramidAnalysis: '',
      internalWarDiagnosis: '',
      smartTaskSuggestion: '',
      finalImpactQuestion: '',
      questions: { decrease: [], increase: [], expandSkill: [], retractSkill: [] },
    },
  },
];

describe('HistoryScreen', () => {
  it('should render empty state when history is empty', () => {
    const mockOnSelect = jest.fn();
    render(<HistoryScreen history={[]} onSelect={mockOnSelect} />);

    expect(screen.getByText('Nenhuma devolutiva encontrada.')).toBeInTheDocument();
  });

  it('should render header with title and description', () => {
    const mockOnSelect = jest.fn();
    render(<HistoryScreen history={mockHistoryItems} onSelect={mockOnSelect} />);

    expect(screen.getByText('Biblioteca & Histórico')).toBeInTheDocument();
    expect(screen.getByText('Acesse e gerencie todas as devolutivas já geradas.')).toBeInTheDocument();
  });

  it('should render search input', () => {
    const mockOnSelect = jest.fn();
    render(<HistoryScreen history={mockHistoryItems} onSelect={mockOnSelect} />);

    const searchInput = screen.getByPlaceholderText('Buscar por nome do pesquisado...');
    expect(searchInput).toBeInTheDocument();
  });

  it('should render table with correct column headers', () => {
    const mockOnSelect = jest.fn();
    render(<HistoryScreen history={mockHistoryItems} onSelect={mockOnSelect} />);

    expect(screen.getByText('Nome do Pesquisado')).toBeInTheDocument();
    expect(screen.getByText('Data')).toBeInTheDocument();
    expect(screen.getByText('Perfil Dominante')).toBeInTheDocument();
    expect(screen.getByText('Alertas de Saúde')).toBeInTheDocument();
    expect(screen.getByText('Ações')).toBeInTheDocument();
  });

  it('should display all history items in table', () => {
    const mockOnSelect = jest.fn();
    render(<HistoryScreen history={mockHistoryItems} onSelect={mockOnSelect} />);

    expect(screen.getByText('Pedro Oliveira')).toBeInTheDocument();
    expect(screen.getByText('Lucia Ferreira')).toBeInTheDocument();
  });

  it('should display dominant profile with type label', () => {
    const mockOnSelect = jest.fn();
    render(<HistoryScreen history={mockHistoryItems} onSelect={mockOnSelect} />);

    expect(screen.getByText(/D - Dominância/i)).toBeInTheDocument();
    expect(screen.getByText(/I - Influência/i)).toBeInTheDocument();
  });

  it('should display health alert count for items with alerts', () => {
    const mockOnSelect = jest.fn();
    render(<HistoryScreen history={mockHistoryItems} onSelect={mockOnSelect} />);

    expect(screen.getByText('1 Alerta(s)')).toBeInTheDocument();
  });

  it('should display "Nenhum" for items without alerts', () => {
    const mockOnSelect = jest.fn();
    render(<HistoryScreen history={mockHistoryItems} onSelect={mockOnSelect} />);

    const noneTexts = screen.getAllByText('Nenhum');
    expect(noneTexts.length).toBeGreaterThan(0);
  });

  it('should have "Visualizar" buttons for each item', () => {
    const mockOnSelect = jest.fn();
    render(<HistoryScreen history={mockHistoryItems} onSelect={mockOnSelect} />);

    const buttons = screen.getAllByRole('button', { name: /Visualizar/i });
    expect(buttons.length).toBe(mockHistoryItems.length);
  });

  it('should call onSelect when Visualizar button is clicked', () => {
    const mockOnSelect = jest.fn();
    render(<HistoryScreen history={mockHistoryItems} onSelect={mockOnSelect} />);

    const buttons = screen.getAllByRole('button', { name: /Visualizar/i });
    fireEvent.click(buttons[0]);

    expect(mockOnSelect).toHaveBeenCalledWith(mockHistoryItems[0]);
  });

  it('should display correct dates', () => {
    const mockOnSelect = jest.fn();
    render(<HistoryScreen history={mockHistoryItems} onSelect={mockOnSelect} />);

    expect(screen.getByText('2024-01-15')).toBeInTheDocument();
    expect(screen.getByText('2024-01-14')).toBeInTheDocument();
  });

  it('should render table as accessible with proper scopes', () => {
    const mockOnSelect = jest.fn();
    const { container } = render(<HistoryScreen history={mockHistoryItems} onSelect={mockOnSelect} />);

    const tableHeaders = container.querySelectorAll('th[scope="col"]');
    expect(tableHeaders.length).toBeGreaterThan(0);
  });
});
