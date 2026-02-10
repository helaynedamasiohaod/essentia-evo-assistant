# Phase 1: Avaliação Inicial - EssentIA Review Squad

## 📋 Objetivo

Estabelecer o escopo, confirmar prioridades e criar um plano detalhado de revisão para o projeto EssentIA EVO Assistant.

**Duração**: 30 minutos
**Agentes**: @architect, @analyst

---

## 🎯 Tarefas

### Task 1.1: Confirmação de Escopo (@architect)

**Objetivo**: Confirmar o escopo completo da revisão

**Checklist**:
- [ ] Listar todos os arquivos do projeto
- [ ] Identificar estrutura de diretórios
- [ ] Confirmar stack tecnológico
- [ ] Mapear dependências
- [ ] Entender fluxo da aplicação

**Comando**:
```bash
*analyze-framework --project essentia-evo-assistant --scope full
```

**Output Esperado**:
- Relatório de estrutura do projeto
- Lista de dependências críticas
- Mapa de módulos
- Diagrama de fluxo (se possível)

---

### Task 1.2: Entender o Negócio (@analyst)

**Objetivo**: Contextualizar o projeto no mercado

**Pesquisa**:
- [ ] O que é DISC? (mercado, adoção, tendências)
- [ ] Quem são os concorrentes?
- [ ] Qual é o tamanho do mercado?
- [ ] Quem seria o usuário ideal?
- [ ] Qual é a proposta de valor?

**Comando**:
```bash
@analyst *research --topic "DISC assessment software market 2026"
```

**Output Esperado**:
- Context de mercado
- Análise de concorrentes
- Tamanho de oportunidade
- Definição de público-alvo

---

### Task 1.3: Definir Plano de Revisão (@architect)

**Objetivo**: Criar um plano detalhado para as 5 fases seguintes

**Plano Incluirá**:
- [ ] Prioridades de revisão
- [ ] Critérios de avaliação
- [ ] Métricas a capturar
- [ ] Tempo alocado por área
- [ ] Riscos identificados

**Output**:
```markdown
# Plano de Revisão Detalhado

## Prioridades
1. **P0 - Critical**: Viabilidade técnica
2. **P1 - High**: Qualidade de código
3. **P2 - Medium**: Design & UX
4. **P3 - Low**: Otimizações futuras

## Métricas
- Code Quality Score
- Architecture Score
- Test Coverage
- Design Consistency
- Market Viability

## Riscos Iniciais
- ...
```

---

## 📊 Critério de Conclusão

Esta fase está concluída quando você tiver:

✅ Confirmação clara do escopo
✅ Entendimento do contexto de negócio
✅ Plano detalhado para próximas fases
✅ Lista de prioridades acordadas
✅ Métricas definidas

---

## 🔗 Próxima Fase

→ **Fase 2: Review de Código & Arquitetura** (60 min)

Condição: Plano de revisão aprovado e prioridades confirmadas

---

## 📝 Notas

- Documentar todas as descobertas para referência
- Confirmar escopo com stakeholders se necessário
- Identificar bloqueadores que possam afetar review

