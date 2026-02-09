# 🚀 Guia Rápido - EssentIA EVO Assistant

## Início Rápido

### 1️⃣ Instalar Dependências

```bash
npm install
```

### 2️⃣ Iniciar Servidor de Desenvolvimento

```bash
npm run dev
```

Abre automaticamente em `http://localhost:3000`

### 3️⃣ Fazer Build para Produção

```bash
npm run build
```

Output em `./dist/`

### 4️⃣ Preview de Produção

```bash
npm run preview
```

---

## Estrutura de Pastas

```
EssentIA EVO Assistent/
│
├── 📁 src/
│   ├── 📁 components/          # Componentes reutilizáveis
│   │   ├── Sidebar.tsx         # Navegação lateral
│   │   ├── FileUpload.tsx      # Upload de arquivos
│   │   └── icons.tsx           # Ícones SVG
│   │
│   ├── 📁 screens/             # Telas principais
│   │   ├── UploadScreen.tsx    # Upload inicial
│   │   ├── AnalysisScreen.tsx  # Análise com gráficos
│   │   ├── EditorScreen.tsx    # Editor de texto
│   │   ├── SlidesScreen.tsx    # Preview de slides
│   │   ├── ScriptScreen.tsx    # Roteiro interativo
│   │   └── HistoryScreen.tsx   # Histórico
│   │
│   ├── 📁 services/
│   │   └── geminiService.ts    # API do Google Gemini
│   │
│   ├── App.tsx                 # Componente raiz
│   ├── main.tsx                # Entry point
│   ├── index.css               # Design tokens Evocare
│   └── types.ts                # TypeScript types
│
├── 📁 dist/                    # Build de produção (gerado)
├── 📁 node_modules/            # Dependências (gerado)
│
├── 📄 package.json             # Dependências npm
├── 📄 vite.config.ts           # Config Vite
├── 📄 tsconfig.json            # Config TypeScript
├── 📄 tailwind.config.ts       # Config Tailwind (tema Evocare)
├── 📄 postcss.config.js        # Config PostCSS
├── 📄 index.html               # HTML base
├── 📄 .gitignore               # Git ignore
│
├── 📚 README.md                # Documentação completa
├── 📋 IMPLEMENTATION_SUMMARY.md # Resumo de implementação
└── 🚀 GETTING_STARTED.md       # Este arquivo
```

---

## Desenvolvimento

### Adicionar um Novo Componente

1. Criar arquivo em `src/components/MeuComponente.tsx`:

```tsx
import React from 'react';

const MeuComponente: React.FC = () => {
  return (
    <div className="card-evo">
      <h2 className="text-xl font-display font-bold text-text-primary">
        Título
      </h2>
      <p className="text-text-secondary mt-2">
        Conteúdo
      </p>
    </div>
  );
};

export default MeuComponente;
```

2. Importar em `src/App.tsx`:

```tsx
import MeuComponente from '@/components/MeuComponente';
```

### Adicionar uma Nova Tela

1. Criar arquivo em `src/screens/NovaScreen.tsx`:

```tsx
import React from 'react';
import { Screen } from '@/types';

interface NovaScreenProps {
  data: any;
  onNavigate: (screen: Screen) => void;
}

const NovaScreen: React.FC<NovaScreenProps> = ({ data, onNavigate }) => {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-display font-bold text-text-primary">
        Novo Conteúdo
      </h1>
    </div>
  );
};

export default NovaScreen;
```

2. Adicionar em `src/types.ts`:

```ts
export enum Screen {
  UPLOAD = 'upload',
  NOVA = 'nova',
  // ...
}
```

3. Adicionar em `src/App.tsx`:

```tsx
case Screen.NOVA:
  return <NovaScreen data={devolutivaData} onNavigate={setActiveScreen} />;
```

---

## Design System Evocare

### Classes CSS Disponíveis

#### Componentes

```tsx
// Card
<div className="card-evo">Conteúdo</div>

// Button
<button className="btn-evo">Clique aqui</button>

// Input
<input className="input-evo" placeholder="Digite..." />

// Text gradient
<h1 className="text-gradient-evo">Título destacado</h1>
```

#### Cores

```tsx
// Backgrounds
<div className="bg-bg-primary">Preto profundo</div>
<div className="bg-bg-surface">Superfície</div>
<div className="bg-bg-elevated">Cinza elevado</div>

// Texto
<p className="text-text-primary">Branco</p>
<p className="text-text-secondary">Cinza</p>

// Acentos
<span className="text-accent-purple">Roxo</span>
<span className="text-accent-teal">Teal</span>
<span className="text-accent-orange">Laranja</span>

// DISC (preservadas)
<span className="text-disc-d">Dominância - Vermelho</span>
<span className="text-disc-i">Influência - Amarelo</span>
<span className="text-disc-s">Estabilidade - Azul</span>
<span className="text-disc-c">Conformidade - Verde</span>
```

#### Tipografia

```tsx
// Display (Outfit)
<h1 className="font-display font-bold">Título</h1>

// Body (Sora)
<p className="font-body">Parágrafo</p>
```

---

## Environment Variables

Criar arquivo `.env.local`:

```env
VITE_GEMINI_API_KEY=sua_chave_aqui
VITE_APP_NAME=EssentIA EVO Assistant
```

Usar em código:

```ts
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
```

---

## Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev          # Inicia servidor em localhost:3000

# Produção
npm run build        # Build otimizado para produção
npm run preview      # Preview do build

# Qualidade
npm run lint         # Verifica tipos TypeScript
```

---

## Debugging

### Erros Comuns

**Erro: Path alias `@` não funciona**
- Verificar `tsconfig.json`: deve ter `"paths": { "@/*": ["./src/*"] }`
- Verificar `vite.config.ts`: deve ter alias configurado

**Erro: CSS não carrega**
- Verificar `src/main.tsx`: deve ter `import './index.css'`
- Verificar `tailwind.config.ts`: deve ter `content` com `./src/**/*.{js,ts,jsx,tsx}`

**Erro: TypeScript strict**
- Adicionar tipos em functions: `const handleClick = (e: React.MouseEvent) => {}`
- Importar tipos: `import { DevolutivaData } from '@/types'`

---

## Performance

### Otimizações Aplicadas

- ✅ Vite para bundling rápido
- ✅ TypeScript strict mode
- ✅ Tailwind CSS com tree-shaking
- ✅ Path aliases para imports limpos
- ✅ React 19 com suspense ready

### Melhorias Futuras

- [ ] Code splitting por rota
- [ ] Lazy loading de componentes
- [ ] Image optimization
- [ ] Service worker para offline

---

## Deployment

### Vercel (Recomendado)

1. Push para GitHub
2. Conectar repositório em vercel.com
3. Vercel detecta Vite automaticamente
4. Deploy com `npm run build`

### Netlify

```bash
npm run build
# Fazer deploy da pasta `dist/`
```

### Docker

```dockerfile
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:18-alpine
WORKDIR /app
RUN npm install -g serve
COPY --from=build /app/dist ./dist
EXPOSE 3000
CMD ["serve", "-s", "dist", "-l", "3000"]
```

---

## Recursos Úteis

- 📚 [Vite Docs](https://vitejs.dev)
- 🎨 [Tailwind CSS](https://tailwindcss.com)
- ⚛️ [React 19](https://react.dev)
- 🔤 [TypeScript](https://www.typescriptlang.org)
- 📊 [Recharts](https://recharts.org)

---

## Suporte

Para dúvidas ou problemas:

1. Verificar `README.md` para documentação completa
2. Verificar `IMPLEMENTATION_SUMMARY.md` para detalhes técnicos
3. Consultar comentários no código
4. Verificar console do navegador para erros

---

**Versão**: 1.0.0
**Última atualização**: Fevereiro 2026
**Status**: ✅ Pronto para desenvolvimento
