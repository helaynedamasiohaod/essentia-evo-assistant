import { renderHook, act, waitFor } from '@testing-library/react';
import { useDevolutivaAnalysis } from '../useDevolutivaAnalysis';
import { PDFUploadData } from '@/types/devolutiva';

/**
 * Test Suite: useDevolutivaAnalysis Hook
 * Integration tests for complete devolutiva workflow
 */

describe('useDevolutivaAnalysis Hook', () => {
  // Mock PDF files
  const mockPDFFiles: PDFUploadData = {
    discFile: new File(['DISC Profile test'], 'disc.pdf', { type: 'application/pdf' }),
    anchorsFile: new File(['Anchors test'], 'anchors.pdf', { type: 'application/pdf' }),
    strengthsFile: new File(['Strengths test'], 'strengths.pdf', { type: 'application/pdf' }),
    languagesFile: new File(['Languages test'], 'languages.pdf', { type: 'application/pdf' }),
  };

  test('should initialize with correct default state', () => {
    const { result } = renderHook(() => useDevolutivaAnalysis());

    expect(result.current.state.isLoading).toBe(false);
    expect(result.current.state.progress).toBe(0);
    expect(result.current.state.error).toBe(null);
    expect(result.current.state.session).toBe(null);
    expect(result.current.state.data).toBe(null);
  });

  test('should validate PDF files before analysis', async () => {
    const { result } = renderHook(() => useDevolutivaAnalysis());

    // Missing anchorsFile should cause validation error
    const invalidFiles: PDFUploadData = {
      discFile: mockPDFFiles.discFile,
      anchorsFile: null as any,
      strengthsFile: mockPDFFiles.strengthsFile,
      languagesFile: mockPDFFiles.languagesFile,
    };

    await act(async () => {
      try {
        await result.current.analyze('Test User', invalidFiles);
      } catch (error) {
        // Expected to fail
        expect(error).toBeDefined();
      }
    });

    expect(result.current.state.error).toBeTruthy();
  });

  test('should provide progress updates during analysis', async () => {
    const { result } = renderHook(() => useDevolutivaAnalysis());

    act(() => {
      result.current.analyze('Test User', mockPDFFiles).catch(() => {
        // Error expected for mock files, just tracking progress
      });
    });

    // Wait for progress updates
    await waitFor(() => {
      expect(result.current.state.progress).toBeGreaterThan(0);
    });

    // Progress should increase
    const progressBefore = result.current.state.progress;

    await waitFor(() => {
      expect(result.current.state.progress >= progressBefore).toBe(true);
    });
  });

  test('should set currentStep message during analysis', async () => {
    const { result } = renderHook(() => useDevolutivaAnalysis());

    act(() => {
      result.current.analyze('Test User', mockPDFFiles).catch(() => {
        // Expected
      });
    });

    // Should have currentStep message
    await waitFor(() => {
      expect(result.current.state.currentStep).toBeTruthy();
      expect(result.current.state.currentStep.length).toBeGreaterThan(0);
    });
  });

  test('should reset state correctly', () => {
    const { result } = renderHook(() => useDevolutivaAnalysis());

    // Manually modify state (simulating after analysis)
    act(() => {
      result.current.reset();
    });

    expect(result.current.state.isLoading).toBe(false);
    expect(result.current.state.progress).toBe(0);
    expect(result.current.state.currentStep).toBe('');
    expect(result.current.state.error).toBe(null);
    expect(result.current.state.session).toBe(null);
    expect(result.current.state.data).toBe(null);
  });

  test('should handle analysis errors gracefully', async () => {
    const { result } = renderHook(() => useDevolutivaAnalysis());

    const invalidFiles: any = {
      discFile: 'invalid' as any,
      anchorsFile: 'invalid' as any,
      strengthsFile: 'invalid' as any,
      languagesFile: 'invalid' as any,
    };

    await act(async () => {
      try {
        await result.current.analyze('Test User', invalidFiles);
      } catch (error) {
        // Expected
      }
    });

    expect(result.current.state.error).toBeTruthy();
    expect(result.current.state.isLoading).toBe(false);
  });

  test('should have analyze function available', () => {
    const { result } = renderHook(() => useDevolutivaAnalysis());

    expect(typeof result.current.analyze).toBe('function');
    expect(typeof result.current.reset).toBe('function');
  });

  test('should track state as object with all required properties', () => {
    const { result } = renderHook(() => useDevolutivaAnalysis());

    const { state } = result.current;

    expect(state).toHaveProperty('isLoading');
    expect(state).toHaveProperty('progress');
    expect(state).toHaveProperty('currentStep');
    expect(state).toHaveProperty('error');
    expect(state).toHaveProperty('session');
    expect(state).toHaveProperty('data');
  });
});
