import { DevolutivaData } from '@/types';

// This is a mock service that simulates calling the Gemini API.
// It returns a detailed, structured data object based on the user's name.
// TODO: Replace with actual Gemini API call with proper error handling

export const generateDevolutiva = (subjectName: string): Promise<DevolutivaData> => {
  // Validate input
  if (!subjectName || typeof subjectName !== 'string') {
    return Promise.reject(new Error('Invalid subject name'));
  }

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        const data: DevolutivaData = {
        id: `devolutiva-${Date.now()}`,
        subjectName,
        date: new Date().toLocaleDateString('pt-BR'),
        discProfile: { d: 75, i: 40, s: 85, c: 60 },
        dominantProfile: 'S',
        towerData: [
          { profile: 'D', selfPerception: 50, environmentDemand: 70 }, // Increase
          { profile: 'I', selfPerception: 60, environmentDemand: 50 }, // Decrease
          { profile: 'S', selfPerception: 85, environmentDemand: 80 },
          { profile: 'C', selfPerception: 55, environmentDemand: 75 }, // Increase
        ],
        healthIndexes: [
          { name: 'Baixa Autoestima', value: 'IPS: 48% | IPM: 65%', diagnosis: 'Detectado', impact: 'Pode gerar insegurança na tomada de decisões e dificuldade em reconhecer as próprias conquistas.', isAlert: true },
          { name: 'Filtro Social Elevado', value: 'IDA: 6%', diagnosis: 'Elevado', impact: 'Indica uma preocupação maior com a percepção externa do que com a autoexpressão autêntica.', isAlert: true },
          { name: 'Interferência Externa', value: 'IIA: 18%', diagnosis: 'Dreno Energético', impact: 'O ambiente está exigindo adaptações que consomem uma quantidade significativa de energia.', isAlert: true },
        ],
        skills: [
          { name: 'Comunicação Assertiva', type: 'expansion' },
          { name: 'Delegação de Tarefas', type: 'expansion' },
          { name: 'Gestão de Conflitos', type: 'expansion' },
          { name: 'Perfeccionismo', type: 'retraction' },
          { name: 'Centralização', type: 'retraction' },
        ],
        pyramid: {
          base: ['Segurança e Estabilidade', 'Qualidade de Vida', 'Servir/Dedicar-se a uma causa'], // Anchors
          middle: ['Prudência', 'Apreciação da Beleza', 'Gratidão', 'Humildade', 'Justiça'], // Strengths
          top: 'Estabilidade (S)', // DISC
        },
        burnoutRisk: false,
        generatedContent: {
            rapport: "O DISC, criado por William Moulton Marston, não é um rótulo, mas uma ferramenta para entender como você tende a se comportar em diferentes ambientes. As quatro dimensões são Dominância (D), Influência (I), Estabilidade (S) e Conformidade (C). Vamos explorar como essas energias se manifestam em você.",
            pizzaChartAnalysis: `Seu perfil comportamental predominante é o de Estabilidade (S). Isso sugere uma tendência natural para ser uma pessoa planejadora, paciente e de bom suporte. Pessoas com alta Estabilidade valorizam a segurança, a lealdade e ambientes harmoniosos, sendo excelentes em rotinas e processos consistentes.`,
            towerChartAnalysis: "O gráfico de torres revela uma dinâmica fascinante entre quem você percebe que é (verde) e o que o ambiente exige de você (azul). Vemos pontos de congruência, mas também áreas de adaptação que podem gerar tanto crescimento quanto desgaste. Vamos analisar os principais pontos de tensão e sinergia.",
            skillsAnalysis: "No mapa de habilidades, você expressou o desejo de expandir sua Comunicação Assertiva e Delegação, enquanto busca retrair o Perfeccionismo. Isso indica um movimento consciente para otimizar sua forma de trabalho, buscando mais eficiência e menos sobrecarga.",
            healthIndexAnalysis: "Os índices de saúde do perfil apontam para alguns pontos de atenção importantes. O 'Filtro Social Elevado' e a 'Interferência Externa' sugerem que o esforço para se adaptar ao meio está consumindo sua energia e talvez te distanciando de sua essência. A 'Baixa Autoestima' pode ser uma consequência desse processo.",
            pyramidAnalysis: "Sua Pirâmide de Identidade é muito coerente. A base com a âncora de 'Segurança' sustenta suas forças de 'Prudência' e 'Justiça', que por sua vez se manifestam através do seu perfil de 'Estabilidade'. Seu 'porquê' (âncoras), 'como' (forças) e 'o quê' (DISC) estão alinhados.",
            internalWarDiagnosis: `A sua 'guerra interna' parece ser travada entre a sua necessidade de segurança e planejamento (S) e a exigência do meio por mais Dominância (D) e Conformidade (C). Você está sendo chamado a ser mais diretivo e detalhista do que é naturalmente confortável para você. Esse esforço adaptativo, se não for bem gerenciado, pode levar a um dreno energético considerável, como aponta o seu índice de IIA.`,
            smartTaskSuggestion: "Com base na nossa análise, um ponto de melhoria poderoso seria trabalhar a 'Comunicação Assertiva'. Que tal definirmos um pequeno passo para esta semana?",
            finalImpactQuestion: "Por que valeu a pena receber esta Devolutiva de Identidade hoje?",
            questions: {
                decrease: [
                    { profile: 'I', question: `De acordo com suas respostas, ${subjectName}, você demonstrou uma intenção de reduzir o perfil Influência (I). Em qual situação específica você sente que ser mais sociável e comunicativo pode ser prejudicial para você? Pode me dar um exemplo real do seu dia a dia?` }
                ],
                increase: [
                    { profile: 'D', question: `Na sua percepção o ambiente ao seu redor está exigindo que você atue com mais Dominância (D). Em qual situação específica você percebe que agir de forma mais diretiva e focada em resultados pode ser benéfico? E em qual situação isso começa a te gerar desgaste?` },
                    { profile: 'C', question: `O meio também parece exigir mais Conformidade (C). Em que momento ser mais detalhista, analítico e cuidadoso com as regras é vantajoso para você? E onde essa exigência se torna um peso?` }
                ],
                expandSkill: [
                    { skill: 'Comunicação Assertiva', question: `Como aumentar a 'Comunicação Assertiva' te ajudaria neste momento atual da sua vida? Em qual área específica (trabalho, família, etc.) você sente que isso faria mais diferença hoje?` }
                ],
                retractSkill: [
                    { skill: 'Perfeccionismo', question: `O que te levou a querer reduzir o 'Perfeccionismo'? Em que contexto essa força começa a deixar de ser funcional e se torna uma fonte de estresse ou lentidão para você?` }
                ]
            }
        }
      };
        resolve(data);
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Failed to generate devolutiva';
        console.error('generateDevolutiva error:', error);
        reject(new Error(message));
      }
    }, 1500);
  });
};
