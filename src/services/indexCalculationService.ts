import { DISCProfile, HealthIndex, IndexType } from '@/types/devolutiva';

/**
 * IndexCalculationService
 * Calculates 9 behavioral health indices using weighted DISC score formulas
 *
 * The 9 indices are:
 * 1. Assertividade (Assertiveness) - D*0.7 + I*0.3
 * 2. Paciência (Patience) - S*0.7 + C*0.3
 * 3. Conformidade (Conformity) - C*0.8 + S*0.2
 * 4. Empatia (Empathy) - I*0.5 + S*0.5
 * 5. Flexibilidade (Flexibility) - I*0.4 + S*0.4 + (100-C)*0.2
 * 6. Criatividade (Creativity) - D*0.5 + I*0.5
 * 7. Liderança (Leadership) - D*0.6 + I*0.3 + (100-C)*0.1
 * 8. Análise (Analysis) - C*0.7 + (100-D)*0.3
 * 9. Colaboração (Collaboration) - I*0.4 + S*0.4 + (100-D)*0.2
 */
export class IndexCalculationService {
  /**
   * Calculate all 9 indices at once
   */
  static calculateAllIndices(discProfile: DISCProfile): HealthIndex[] {
    const indices: HealthIndex[] = [];

    indices.push(this.calculateAssertiveness(discProfile));
    indices.push(this.calculatePatience(discProfile));
    indices.push(this.calculateConformity(discProfile));
    indices.push(this.calculateEmpathy(discProfile));
    indices.push(this.calculateFlexibility(discProfile));
    indices.push(this.calculateCreativity(discProfile));
    indices.push(this.calculateLeadership(discProfile));
    indices.push(this.calculateAnalysis(discProfile));
    indices.push(this.calculateCollaboration(discProfile));

    return indices;
  }

  /**
   * 1. Assertividade (Assertiveness)
   * Formula: D*0.7 + I*0.3
   * Reflects drive and confidence in asserting needs and ideas
   */
  static calculateAssertiveness(profile: DISCProfile): HealthIndex {
    const value = Math.round(profile.d * 0.7 + profile.i * 0.3);
    const diagnosis = this.diagnoseValue(value, 'Assertiveness');
    const isAlert = value < 30;

    return {
      name: 'Assertividade',
      value: `${value}%`,
      diagnosis,
      impact:
        'Ability to express needs, stand firm on positions, and take action decisively.',
      isAlert,
    };
  }

  /**
   * 2. Paciência (Patience)
   * Formula: S*0.7 + C*0.3
   * Reflects ability to stay calm and work methodically through challenges
   */
  static calculatePatience(profile: DISCProfile): HealthIndex {
    const value = Math.round(profile.s * 0.7 + profile.c * 0.3);
    const diagnosis = this.diagnoseValue(value, 'Patience');
    const isAlert = value < 30;

    return {
      name: 'Paciência',
      value: `${value}%`,
      diagnosis,
      impact: 'Ability to work methodically, listen fully, and persist through challenges.',
      isAlert,
    };
  }

  /**
   * 3. Conformidade (Conformity)
   * Formula: C*0.8 + S*0.2
   * Reflects respect for rules, guidelines, and established processes
   */
  static calculateConformity(profile: DISCProfile): HealthIndex {
    const value = Math.round(profile.c * 0.8 + profile.s * 0.2);
    const diagnosis = this.diagnoseValue(value, 'Conformity');
    const isAlert = value < 20;

    return {
      name: 'Conformidade',
      value: `${value}%`,
      diagnosis,
      impact:
        'Respect for guidelines, quality standards, and established procedures. High values suggest strong compliance; low values suggest flexibility and creativity.',
      isAlert,
    };
  }

  /**
   * 4. Empatia (Empathy)
   * Formula: I*0.5 + S*0.5
   * Reflects ability to understand and connect with others' feelings
   */
  static calculateEmpathy(profile: DISCProfile): HealthIndex {
    const value = Math.round(profile.i * 0.5 + profile.s * 0.5);
    const diagnosis = this.diagnoseValue(value, 'Empathy');
    const isAlert = value < 25;

    return {
      name: 'Empatia',
      value: `${value}%`,
      diagnosis,
      impact:
        'Ability to understand others\' perspectives, show care, and build supportive relationships.',
      isAlert,
    };
  }

  /**
   * 5. Flexibilidade (Flexibility)
   * Formula: I*0.4 + S*0.4 + (100-C)*0.2
   * Reflects ability to adapt, adjust course, and embrace change
   */
  static calculateFlexibility(profile: DISCProfile): HealthIndex {
    const value = Math.round(profile.i * 0.4 + profile.s * 0.4 + (100 - profile.c) * 0.2);
    const diagnosis = this.diagnoseValue(value, 'Flexibility');
    const isAlert = value > 80;

    return {
      name: 'Flexibilidade',
      value: `${value}%`,
      diagnosis,
      impact:
        'Ability to adapt to change, adjust plans, and embrace new approaches. Balance is key - too high suggests lack of consistency.',
      isAlert,
    };
  }

  /**
   * 6. Criatividade (Creativity)
   * Formula: D*0.5 + I*0.5
   * Reflects drive for new ideas and innovation
   */
  static calculateCreativity(profile: DISCProfile): HealthIndex {
    const value = Math.round(profile.d * 0.5 + profile.i * 0.5);
    const diagnosis = this.diagnoseValue(value, 'Creativity');
    const isAlert = value < 25;

    return {
      name: 'Criatividade',
      value: `${value}%`,
      diagnosis,
      impact:
        'Drive for new ideas, innovative solutions, and challenging the status quo.',
      isAlert,
    };
  }

  /**
   * 7. Liderança (Leadership)
   * Formula: D*0.6 + I*0.3 + (100-C)*0.1
   * Reflects ability to guide, inspire, and make decisions
   */
  static calculateLeadership(profile: DISCProfile): HealthIndex {
    const value = Math.round(profile.d * 0.6 + profile.i * 0.3 + (100 - profile.c) * 0.1);
    const diagnosis = this.diagnoseValue(value, 'Leadership');
    const isAlert = value < 30;

    return {
      name: 'Liderança',
      value: `${value}%`,
      diagnosis,
      impact:
        'Ability to guide others, make decisions, inspire teams, and take charge of situations.',
      isAlert,
    };
  }

  /**
   * 8. Análise (Analysis)
   * Formula: C*0.7 + (100-D)*0.3
   * Reflects ability to think critically and evaluate thoroughly
   */
  static calculateAnalysis(profile: DISCProfile): HealthIndex {
    const value = Math.round(profile.c * 0.7 + (100 - profile.d) * 0.3);
    const diagnosis = this.diagnoseValue(value, 'Analysis');
    const isAlert = value < 25;

    return {
      name: 'Análise',
      value: `${value}%`,
      diagnosis,
      impact:
        'Ability to think critically, evaluate options thoroughly, and avoid impulsive decisions.',
      isAlert,
    };
  }

  /**
   * 9. Colaboração (Collaboration)
   * Formula: I*0.4 + S*0.4 + (100-D)*0.2
   * Reflects ability to work well with others and value teamwork
   */
  static calculateCollaboration(profile: DISCProfile): HealthIndex {
    const value = Math.round(profile.i * 0.4 + profile.s * 0.4 + (100 - profile.d) * 0.2);
    const diagnosis = this.diagnoseValue(value, 'Collaboration');
    const isAlert = value < 25;

    return {
      name: 'Colaboração',
      value: `${value}%`,
      diagnosis,
      impact:
        'Ability to work well with others, value team input, and contribute to group goals.',
      isAlert,
    };
  }

  /**
   * Calculate single index by type
   */
  static calculateIndexByType(type: IndexType, profile: DISCProfile): number {
    switch (type) {
      case 'Assertividade':
        return Math.round(profile.d * 0.7 + profile.i * 0.3);
      case 'Paciência':
        return Math.round(profile.s * 0.7 + profile.c * 0.3);
      case 'Conformidade':
        return Math.round(profile.c * 0.8 + profile.s * 0.2);
      case 'Empatia':
        return Math.round(profile.i * 0.5 + profile.s * 0.5);
      case 'Flexibilidade':
        return Math.round(profile.i * 0.4 + profile.s * 0.4 + (100 - profile.c) * 0.2);
      case 'Criatividade':
        return Math.round(profile.d * 0.5 + profile.i * 0.5);
      case 'Liderança':
        return Math.round(profile.d * 0.6 + profile.i * 0.3 + (100 - profile.c) * 0.1);
      case 'Análise':
        return Math.round(profile.c * 0.7 + (100 - profile.d) * 0.3);
      case 'Colaboração':
        return Math.round(profile.i * 0.4 + profile.s * 0.4 + (100 - profile.d) * 0.2);
      default:
        return 0;
    }
  }

  /**
   * Generate human-readable interpretations for index values
   */
  static generateIndexReport(indices: HealthIndex[]): string {
    let report = '# Behavioral Health Indices Report\n\n';

    // Overall Health Score
    const avgScore = Math.round(
      indices.reduce((sum, idx) => sum + parseInt(idx.value.replace('%', ''), 10), 0) / indices.length,
    );
    const healthLevel = this.getHealthLevel(avgScore);

    report += `## Overall Health Score: ${avgScore}%\n`;
    report += `**Assessment**: ${healthLevel}\n\n`;

    // Alert indices
    const alerts = indices.filter((idx) => idx.isAlert);
    if (alerts.length > 0) {
      report += `## ⚠️ Alert Areas (${alerts.length})\n`;
      alerts.forEach((idx) => {
        report += `- **${idx.name}** (${idx.value}): ${idx.diagnosis}\n`;
      });
      report += '\n';
    }

    // Strong areas
    const strong = indices.filter((idx) => parseInt(idx.value.replace('%', ''), 10) >= 70);
    if (strong.length > 0) {
      report += `## ✅ Strong Areas (${strong.length})\n`;
      strong.forEach((idx) => {
        report += `- **${idx.name}** (${idx.value}): Core strength\n`;
      });
      report += '\n';
    }

    // Development areas
    const developing = indices.filter(
      (idx) => parseInt(idx.value.replace('%', ''), 10) >= 40 && parseInt(idx.value.replace('%', ''), 10) < 70 && !idx.isAlert,
    );
    if (developing.length > 0) {
      report += `## 📈 Development Opportunities (${developing.length})\n`;
      developing.forEach((idx) => {
        report += `- **${idx.name}** (${idx.value}): Growing edge\n`;
      });
      report += '\n';
    }

    // Index summaries
    report += '## Detailed Index Analysis\n\n';
    indices.forEach((idx) => {
      report += `### ${idx.name}\n`;
      report += `- **Score**: ${idx.value}\n`;
      report += `- **Diagnosis**: ${idx.diagnosis}\n`;
      report += `- **Impact**: ${idx.impact}\n\n`;
    });

    return report;
  }

  /**
   * Identify problematic combinations or patterns
   */
  static analyzePatterns(indices: HealthIndex[]): string {
    const values = new Map<string, number>();
    indices.forEach((idx) => {
      values.set(idx.name, parseInt(idx.value.replace('%', ''), 10));
    });

    let analysis = '## Behavioral Patterns & Insights\n\n';

    // High Leadership + Low Collaboration = Dominant leadership style
    const leadership = values.get('Liderança') || 0;
    const collaboration = values.get('Colaboração') || 0;
    if (leadership > 65 && collaboration < 40) {
      analysis += `**Leadership Pattern**: Your high leadership combined with lower collaboration suggests a directive leadership style. Consider balancing with more team input.\n\n`;
    }

    // High Creativity + Low Analysis = Risk-taker
    const creativity = values.get('Criatividade') || 0;
    const analysis_idx = values.get('Análise') || 0;
    if (creativity > 65 && analysis_idx < 40) {
      analysis += `**Decision Pattern**: High creativity with lower analysis suggests you tend to act quickly with innovative ideas. Balance with thorough evaluation before implementation.\n\n`;
    }

    // High Patience + Low Assertiveness = Passive style
    const patience = values.get('Paciência') || 0;
    const assertiveness = values.get('Assertividade') || 0;
    if (patience > 65 && assertiveness < 40) {
      analysis += `**Expression Pattern**: Your patience may limit your ability to advocate for your needs. Practice assertiveness to ensure your voice is heard.\n\n`;
    }

    // High Flexibility + Low Conformity = Non-traditional approach
    const flexibility = values.get('Flexibilidade') || 0;
    const conformity = values.get('Conformidade') || 0;
    if (flexibility > 65 && conformity < 40) {
      analysis += `**Compliance Pattern**: Your flexibility and lower conformity suggest you challenge conventional approaches. Ensure this creativity is channeled productively.\n\n`;
    }

    // High Empathy + High Assertiveness = Assertive helper
    const empathy = values.get('Empatia') || 0;
    if (empathy > 60 && assertiveness > 60) {
      analysis += `**Social Pattern**: You combine empathy with assertiveness - an excellent combination for healthy relationships and team dynamics.\n\n`;
    }

    return analysis.length > 25 ? analysis : '## Behavioral Patterns\nYour indices suggest a balanced behavioral profile.';
  }

  /**
   * Helper: Diagnose a value based on context
   */
  private static diagnoseValue(value: number, type: string): string {
    if (value >= 70) {
      return `High ${type}: You naturally display this quality strongly in most situations.`;
    } else if (value >= 50) {
      return `Moderate ${type}: You display this quality consistently but with room for growth.`;
    } else if (value >= 30) {
      return `Low ${type}: This is a development area that benefits from conscious effort.`;
    } else {
      return `Very Low ${type}: This requires deliberate focus and practice to develop.`;
    }
  }

  /**
   * Helper: Get overall health level description
   */
  private static getHealthLevel(avgScore: number): string {
    if (avgScore >= 80) {
      return 'Excellent - You demonstrate strong behavioral health across all dimensions.';
    } else if (avgScore >= 65) {
      return 'Good - You have solid behavioral health with some areas for growth.';
    } else if (avgScore >= 50) {
      return 'Moderate - You show some strengths and some clear development areas.';
    } else {
      return 'Needs Support - Multiple areas require focused attention and development.';
    }
  }

  /**
   * Calculate burnout risk based on indices
   */
  static calculateBurnoutRisk(indices: HealthIndex[]): boolean {
    const values = new Map<string, number>();
    indices.forEach((idx) => {
      values.set(idx.name, parseInt(idx.value.replace('%', ''), 10));
    });

    const patience = values.get('Paciência') || 50;
    const assertiveness = values.get('Assertividade') || 50;
    const flexibility = values.get('Flexibilidade') || 50;
    const collaboration = values.get('Colaboração') || 50;

    // Burnout risk factors:
    // Low patience + High assertiveness + Low flexibility + Low collaboration = High burnout risk
    const riskScore =
      (100 - patience) * 0.3 +
      assertiveness * 0.2 +
      (100 - flexibility) * 0.3 +
      (100 - collaboration) * 0.2;

    return riskScore > 55;
  }

  /**
   * Get recommendations based on index patterns
   */
  static getGrowthRecommendations(indices: HealthIndex[]): string[] {
    const recommendations: string[] = [];
    const values = new Map<string, number>();
    indices.forEach((idx) => {
      values.set(idx.name, parseInt(idx.value));
    });

    // Find lowest 3 indices
    const sorted = Array.from(values.entries())
      .sort((a, b) => a[1] - b[1])
      .slice(0, 3);

    sorted.forEach(([name, value]) => {
      if (value < 50) {
        switch (name) {
          case 'Assertividade':
            recommendations.push('Practice expressing your needs directly and standing firm on decisions.');
            break;
          case 'Paciência':
            recommendations.push('Develop mindfulness practices to increase calm and reduce reactivity.');
            break;
          case 'Conformidade':
            recommendations.push('Balance flexibility with consistency - choose which rules matter most.');
            break;
          case 'Empatia':
            recommendations.push('Practice active listening and perspective-taking in conversations.');
            break;
          case 'Flexibilidade':
            recommendations.push('Create structured change practices to build comfort with adaptation.');
            break;
          case 'Criatividade':
            recommendations.push('Set aside time for brainstorming and exploring new ideas.');
            break;
          case 'Liderança':
            recommendations.push('Take on small leadership opportunities to build confidence.');
            break;
          case 'Análise':
            recommendations.push('Slow down decisions to gather more information before acting.');
            break;
          case 'Colaboração':
            recommendations.push('Increase team input in decisions and seek others\' perspectives.');
            break;
        }
      }
    });

    return recommendations.length > 0
      ? recommendations
      : ['Continue leveraging your natural strengths while exploring new capabilities.'];
  }
}
