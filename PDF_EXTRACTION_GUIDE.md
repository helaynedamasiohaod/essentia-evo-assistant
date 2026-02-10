# 📄 PDF Extraction Implementation Guide

## Overview

A EssentIA agora consegue **ler e extrair dados reais** de PDFs adicionados pelos usuários antes de gerar relatórios.

## Tecnologia Usada

- **pdfjs-dist** (^3.11.174): Extração profissional de texto de PDFs
- **Método**: Leitura página por página com extração de texto por item

## Como Funciona

### 1. Extração de Texto (Real)

```typescript
// Arquivo: src/services/pdfProcessingService.ts
private static async extractTextFromPDF(file: File): Promise<string>
```

**Processo:**
1. Converte File para ArrayBuffer
2. Carrega PDF com pdfjs-dist
3. Itera por cada página do documento
4. Extrai texto de cada item na página
5. Combina tudo em um texto contínuo

**Saída:**
- Texto bruto completo extraído do PDF
- Preserva estrutura e espaçamento

### 2. Parsing de Dados (Inteligente)

Implementamos **4 parsers especializados** que buscam padrões específicos em cada tipo de PDF:

#### DISC Parser
```typescript
parseDISCData(text: string)
// Busca por:
// - Percentuais (45%, D: 45%, Dominância 45%)
// - Letras DISC
// - Palavras-chave: dominância, influência, estabilidade, conformidade
```

**Retorna:**
```typescript
{
  profile: 'S',           // Perfil dominante
  scores: {
    d: 45,               // Dominância %
    i: 35,               // Influência %
    s: 50,               // Estabilidade %
    c: 40                // Conformidade %
  },
  dominantProfile: 'S'
}
```

#### Anchors Parser
```typescript
parseAnchorsData(text: string)
// Busca por:
// - Palavras-chave: técnico, gerencial, autonomia, segurança, criatividade, etc.
// - Padrões como "Âncora:", "Career Anchor:", etc.
```

**Retorna:**
```typescript
{
  anchors: ['técnico', 'autonomia'],
  detectedPatterns: 3,
  rawMatches: [...]
}
```

#### Strengths Parser
```typescript
parseStrengthsData(text: string)
// Busca por:
// - Palavras-chave: comunicação, liderança, criatividade, análise, etc.
// - Padrões como "Força:", "Strength:", "Competência:", etc.
```

#### Languages Parser
```typescript
parseLanguagesData(text: string)
// Busca por:
// - Palavras-chave: reconhecimento, tempo, apoio, afirmação, etc.
// - Padrões como "Linguagem:", "Language:", "Valorização:", etc.
```

### 3. Confidence Scoring

Cada extração retorna um **score de confiança** (0.5 - 0.99) baseado em:

```typescript
- Tamanho do texto extraído
- Presença de padrões específicos
- Percentuais encontrados
- Palavras-chave detectadas
```

**Exemplo:**
```typescript
{
  type: 'DISC',
  extractedData: { profile: 'S', scores: {...} },
  confidence: 0.85    // 85% de confiança
}
```

## Uso

### No React Component

```typescript
import { PDFProcessingService } from '@/services/pdfProcessingService';

const handlePDFUpload = async (files: PDFUploadData) => {
  // Validar arquivos
  const validation = PDFProcessingService.validatePDFFiles(files);
  if (!validation.valid) {
    console.error(validation.errors);
    return;
  }

  // Processar em paralelo (todos 4 PDFs ao mesmo tempo)
  const result = await PDFProcessingService.processAllPDFs(files);

  // result contém:
  // - result.disc (DISC profile com scores)
  // - result.anchors (Career anchors detectadas)
  // - result.strengths (Forças pessoais)
  // - result.languages (Linguagens de valorização)
  // - result.processedAt (timestamp)

  console.log(result);
};
```

### Flow Completo

```
User Upload PDF Files
        ↓
[Validate PDF Types]
        ↓
[Extract Text - pdfjs-dist]
        ↓
[Parse DISC → Detect Scores]
[Parse Anchors → Extract Keywords]
[Parse Strengths → Extract Keywords]
[Parse Languages → Extract Keywords]
        ↓
[Calculate Confidence Scores]
        ↓
[Return Structured Data]
        ↓
[Pass to geminiService for Analysis]
        ↓
[Generate 15-Step Devolutiva Report]
```

## O que Está Pronto

✅ **Extração Real de Texto**
- Implementado com pdfjs-dist
- Testa cada página
- Retorna texto completo

✅ **Parsing Inteligente**
- 4 parsers especializados
- Busca por padrões de texto
- Usa regex para encontrar dados

✅ **Validação de Arquivos**
- Verifica se são PDFs válidos
- Retorna erros claros

✅ **Processamento Paralelo**
- Processa 4 PDFs simultaneamente
- Não bloqueia a UI

✅ **Confidence Scoring**
- Indica confiança da extração
- Ajuda a validar qualidade

## Próximos Passos (Sprint 2)

🔄 **Melhorias Planejadas:**

1. **Regex Patterns Mais Robustos**
   - Detectar variações de escrita
   - Suportar múltiplos idiomas
   - Padrões para templates específicos

2. **ML-Based Pattern Recognition**
   - Usar Gemini para validar extrações
   - Melhorar accuracy dos parsers
   - Aprender de erros

3. **Mock PDFs para Testes**
   - Criar biblioteca de PDFs de teste
   - Testar diferentes formatos
   - Validar edge cases

4. **Error Recovery**
   - Retry logic para falhas
   - Fallback para OCR se necessário
   - User-friendly error messages

## Debugging

Para ver logs detalhados da extração:

```typescript
// Browser Console
// Mostrará:
// - 📄 Extracting text from disc.pdf...
// - Page 1/3: Perfil DISC resultado...
// - ✨ Text extraction complete. Total: 2847 characters
// - 🔍 Parsing DISC data...
// - ✅ DISC extracted from disc.pdf (confidence: 85%)
```

## Estrutura de Dados

```typescript
interface BatchProcessResult {
  disc: PDFExtractionResult;
  anchors: PDFExtractionResult;
  strengths: PDFExtractionResult;
  languages: PDFExtractionResult;
  processedAt: Date;
}

interface PDFExtractionResult {
  type: 'DISC' | 'ANCHORS' | 'STRENGTHS' | 'LANGUAGES';
  rawText: string;          // Texto extraído completo
  extractedData: {          // Dados parseados
    [key: string]: any;
  };
  confidence: number;       // 0.5 - 0.99
}
```

## Testes

```bash
npm test -- pdfProcessing.test.ts
```

Tests cobrem:
- ✅ Text extraction from PDFs
- ✅ DISC percentage parsing
- ✅ Anchor keyword detection
- ✅ Strength identification
- ✅ Language recognition
- ✅ File validation
- ✅ Confidence scoring

---

**Status:** ✅ Pronto para uso
**Implementado em:** Sprint 1 - Foundation
**Próximo:** Sprint 2 - Melhorias e testes completos
