import { DevolutivaData } from '@/types';

// Generate realistic DISC profile based on name hash for consistency
const generateDISCProfile = (name: string) => {
  const hash = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const seed = hash % 100;

  return {
    d: 35 + ((seed * 7) % 40),
    i: 45 + ((seed * 11) % 35),
    s: 40 + ((seed * 13) % 40),
    c: 50 + ((seed * 5) % 30),
  };
};

// Generate dominant profile from DISC scores
const getDominantProfile = (profile: { d: number; i: number; s: number; c: number }) => {
  const max = Math.max(profile.d, profile.i, profile.s, profile.c);
  if (profile.d === max) return 'D';
  if (profile.i === max) return 'I';
  if (profile.s === max) return 'S';
  return 'C';
};

export const generateDevolutiva = async (subjectName: string): Promise<DevolutivaData> => {
  // Validate input
  if (!subjectName || typeof subjectName !== 'string') {
    return Promise.reject(new Error('Invalid subject name'));
  }

  try {
    console.log('Generating DISC analysis for:', subjectName);

    // Simulate API delay for realistic UX
    await new Promise(resolve => setTimeout(resolve, 1500));

    const discProfile = generateDISCProfile(subjectName);
    const dominantProfile = getDominantProfile(discProfile);

    // Generate realistic content based on profile
    const rapport = `${subjectName} apresenta um perfil comportamental único. Com predominância em ${dominantProfile === 'D' ? 'Dominância' : dominantProfile === 'I' ? 'Influência' : dominantProfile === 'S' ? 'Estabilidade' : 'Conformidade'}, essa pessoa tende a se destacar por suas características marcantes. O perfil DISC revela padrões importantes que influenciam sua comunicação, tomada de decisão e relacionamento interpessoal.`;

    const pizzaChartAnalysis = `A análise do gráfico pizza mostra uma distribuição de ${Math.round(discProfile.d)}% Dominância, ${Math.round(discProfile.i)}% Influência, ${Math.round(discProfile.s)}% Estabilidade e ${Math.round(discProfile.c)}% Conformidade. Este equilíbrio reflete a complexidade comportamental, com uma tendência mais acentuada para o perfil ${dominantProfile}.`;

    const healthIndexes = [
      {
        name: 'Assertividade',
        value: 'Alto',
        diagnosis: `Nível ${discProfile.d > 60 ? 'elevado' : 'moderado'} de assertividade`,
        impact: 'Permite tomada de decisão rápida e comunicação direta',
        isAlert: false,
      },
      {
        name: 'Paciência',
        value: discProfile.s > 50 ? 'Alto' : 'Moderado',
        diagnosis: `Índice de paciência ${discProfile.s > 50 ? 'bem desenvolvido' : 'em desenvolvimento'}`,
        impact: 'Facilita o relacionamento e a colaboração em equipe',
        isAlert: false,
      },
      {
        name: 'Conformidade',
        value: discProfile.c > 60 ? 'Alto' : 'Moderado',
        diagnosis: `Nível de conformidade ${discProfile.c > 60 ? 'acentuado' : 'equilibrado'}`,
        impact: 'Reflete atenção a detalhes e procedimentos',
        isAlert: discProfile.c > 70,
      },
    ];

    const skillsAnalysis = `As competências de ${subjectName} incluem uma forte capacidade de ${dominantProfile === 'D' ? 'liderança e resolução de problemas' : dominantProfile === 'I' ? 'comunicação e persuasão' : dominantProfile === 'S' ? 'cooperação e empatia' : 'análise e planejamento'}. Há também oportunidades para desenvolvimento em áreas complementares.`;

    const devolutiva: DevolutivaData = {
      id: `devolutiva-${Date.now()}`,
      subjectName,
      date: new Date().toLocaleDateString('pt-BR'),
      discProfile,
      dominantProfile,
      healthIndexes,
      towerData: [
        {
          profile: 'D',
          selfPerception: Math.max(30, discProfile.d - 10),
          environmentDemand: Math.min(100, discProfile.d + 15),
        },
        {
          profile: 'I',
          selfPerception: Math.max(30, discProfile.i - 10),
          environmentDemand: Math.min(100, discProfile.i + 15),
        },
        {
          profile: 'S',
          selfPerception: Math.max(30, discProfile.s - 10),
          environmentDemand: Math.min(100, discProfile.s + 15),
        },
        {
          profile: 'C',
          selfPerception: Math.max(30, discProfile.c - 10),
          environmentDemand: Math.min(100, discProfile.c + 15),
        },
      ],
      skills: [
        {
          name: dominantProfile === 'D' ? 'Liderança' : dominantProfile === 'I' ? 'Comunicação' : dominantProfile === 'S' ? 'Empatia' : 'Análise',
          type: 'expansion',
        },
        {
          name: dominantProfile === 'C' ? 'Criatividade' : 'Flexibilidade',
          type: 'expansion',
        },
      ],
      pyramid: {
        base: ['Autossuperação', 'Respeito'],
        middle: ['Confiança', 'Integridade'],
        top: 'Excelência',
      },
      burnoutRisk: discProfile.d > 75 && discProfile.s < 40,
      generatedContent: {
        rapport,
        pizzaChartAnalysis,
        towerChartAnalysis: `A Torre DISC de ${subjectName} evidencia a relação entre a autopercepção e as demandas do ambiente. Os desafios surgem quando há grande diferença entre estes níveis.`,
        skillsAnalysis,
        healthIndexAnalysis: `${subjectName} apresenta um índice geral de saúde comportamental ${discProfile.d + discProfile.i + discProfile.s + discProfile.c > 200 ? 'equilibrado' : 'com pontos de atenção'}. Recomenda-se desenvolvimento contínuo.`,
        pyramidAnalysis: `A pirâmide de valores de ${subjectName} mostra uma base sólida em autossuperação e respeito, com um ápice em excelência, refletindo aspirações pessoais significativas.`,
        internalWarDiagnosis: `Possíveis conflitos internos entre a necessidade de ${dominantProfile === 'D' ? 'controle' : dominantProfile === 'I' ? 'destaque' : dominantProfile === 'S' ? 'estabilidade' : 'precisão'} e a realidade do ambiente devem ser gerenciados.`,
        smartTaskSuggestion: `Para ${subjectName}, tarefas que envolvem ${dominantProfile === 'D' ? 'responsabilidade e desafios' : dominantProfile === 'I' ? 'interação e visibilidade' : dominantProfile === 'S' ? 'trabalho em equipe' : 'atenção a detalhes'} seriam mais motivadoras.`,
        finalImpactQuestion: `Como ${subjectName} pode alinhar seus pontos fortes naturais com as demandas do seu contexto atual para maximizar seu impacto?`,
        questions: {
          decrease: [
            {
              profile: dominantProfile,
              question: `De que forma você poderia moderar seu comportamento ${dominantProfile === 'D' ? 'dominante' : dominantProfile === 'I' ? 'influenciador' : dominantProfile === 'S' ? 'submisso' : 'crítico'} em situações de alta pressão?`,
            },
          ],
          increase: [
            {
              profile: dominantProfile === 'D' ? 'I' : dominantProfile === 'I' ? 'S' : dominantProfile === 'S' ? 'D' : 'I',
              question: `Como desenvolver mais ${dominantProfile === 'D' ? 'empatia e paciência' : dominantProfile === 'I' ? 'estrutura e foco' : dominantProfile === 'S' ? 'assertividade' : 'entusiasmo'} em suas interações?`,
            },
          ],
          expandSkill: [
            {
              skill: dominantProfile === 'D' ? 'Liderança' : dominantProfile === 'I' ? 'Comunicação' : dominantProfile === 'S' ? 'Empatia' : 'Análise',
              question: `Quais são os próximos passos para aprofundar essa competência?`,
            },
          ],
          retractSkill: [
            {
              skill: dominantProfile === 'D' ? 'Impaciência' : dominantProfile === 'I' ? 'Dispersão' : dominantProfile === 'S' ? 'Passividade' : 'Rigidez',
              question: `Como reconhecer quando este padrão está ativado?`,
            },
          ],
        },
      },
    };

    console.log('DISC analysis generated successfully for:', subjectName);
    return devolutiva;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to generate analysis';
    console.error('generateDevolutiva error:', error);
    throw new Error(message);
  }
};
