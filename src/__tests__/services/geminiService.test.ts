import { generateDevolutiva } from '@/services/geminiService';
import { DevolutivaData } from '@/types';

describe('geminiService', () => {
  describe('generateDevolutiva', () => {
    it('should generate devolutiva data with valid subject name', async () => {
      const subjectName = 'Test User';
      const result = await generateDevolutiva(subjectName);

      expect(result).toBeDefined();
      expect(result.subjectName).toBe(subjectName);
      expect(result.id).toBeDefined();
      expect(result.discProfile).toBeDefined();
      expect(result.dominantProfile).toMatch(/^[DISC]$/);
    });

    it('should reject with invalid subject name (empty)', async () => {
      await expect(generateDevolutiva('')).rejects.toThrow('Invalid subject name');
    });

    it('should reject with invalid subject name (not string)', async () => {
      await expect(generateDevolutiva(null as any)).rejects.toThrow('Invalid subject name');
    });

    it('should include generated content sections', async () => {
      const result = await generateDevolutiva('Test User');

      expect(result.generatedContent).toBeDefined();
      expect(result.generatedContent.rapport).toBeDefined();
      expect(result.generatedContent.pizzaChartAnalysis).toBeDefined();
      expect(result.generatedContent.questions).toBeDefined();
      expect(result.generatedContent.questions.decrease).toBeDefined();
      expect(result.generatedContent.questions.increase).toBeDefined();
    });

    it('should have valid DISC profile values (0-100)', async () => {
      const result = await generateDevolutiva('Test User');

      expect(result.discProfile.d).toBeGreaterThanOrEqual(0);
      expect(result.discProfile.d).toBeLessThanOrEqual(100);
      expect(result.discProfile.i).toBeGreaterThanOrEqual(0);
      expect(result.discProfile.i).toBeLessThanOrEqual(100);
      expect(result.discProfile.s).toBeGreaterThanOrEqual(0);
      expect(result.discProfile.s).toBeLessThanOrEqual(100);
      expect(result.discProfile.c).toBeGreaterThanOrEqual(0);
      expect(result.discProfile.c).toBeLessThanOrEqual(100);
    });
  });
});
