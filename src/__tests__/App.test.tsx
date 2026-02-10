import React from 'react';
import { render } from '@testing-library/react';
import App from '@/App';

describe('App', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should render without crashing', () => {
    const { container } = render(<App />);
    expect(container).toBeInTheDocument();
  });

  it('should recover from localStorage corruption gracefully', () => {
    localStorage.setItem('devolutivaHistory', 'invalid json {]');
    expect(() => {
      render(<App />);
    }).not.toThrow();
  });

  it('should initialize with flex layout', () => {
    const { container } = render(<App />);
    const flexContainer = container.querySelector('div.flex');
    expect(flexContainer).toBeInTheDocument();
  });

  it('should have main content area', () => {
    const { container } = render(<App />);
    const mainElement = container.querySelector('main');
    expect(mainElement).toBeInTheDocument();
  });

  it('should have h-screen height class', () => {
    const { container } = render(<App />);
    const flexDiv = container.querySelector('div.h-screen');
    expect(flexDiv).toBeInTheDocument();
  });
});
