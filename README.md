# EssentIA EVO Assistant

Aplicação React/TypeScript para análise de perfil DISC com design system Evocare Global integrado.

## 📋 Estrutura do Projeto

```
EssentIA EVO Assistent/
├── src/
│   ├── components/           # Componentes reutilizáveis
│   │   ├── icons.tsx
│   │   ├── Sidebar.tsx
│   │   └── FileUpload.tsx
│   ├── screens/             # Telas da aplicação
│   │   ├── UploadScreen.tsx
│   │   ├── AnalysisScreen.tsx
│   │   ├── EditorScreen.tsx
│   │   ├── SlidesScreen.tsx
│   │   ├── ScriptScreen.tsx
│   │   └── HistoryScreen.tsx
│   ├── services/            # Serviços (API, etc)
│   │   └── geminiService.ts
│   ├── App.tsx              # Componente raiz
│   ├── main.tsx             # Entry point
│   ├── index.css            # Design tokens Evocare
│   └── types.ts             # TypeScript definitions
├── public/                  # Assets estáticos
├── index.html              # HTML base
├── package.json            # Dependências
├── vite.config.ts          # Configuração Vite
├── tsconfig.json           # Configuração TypeScript
├── tailwind.config.ts      # Configuração Tailwind
├── postcss.config.js       # Configuração PostCSS
└── .gitignore              # Git ignore rules
```

## 🎨 Design System Evocare Global

### Paleta de Cores

```css
--bg-primary: #050505;       /* Preto profundo */
--bg-surface: #18181b;       /* Superfície elevada */
--bg-elevated: #0f0f0f;      /* Cinza muito escuro */
--text-primary: #ffffff;     /* Branco puro */
--accent-purple: #9b51e0;    /* Roxo vibrante */
--accent-teal: #00d084;      /* Teal elétrico */
--accent-orange: #ff6900;    /* Laranja energético */
--evo-gradient: linear-gradient(135deg, #00d084 0%, #9b51e0 50%, #ff6900 100%);
```

### Tipografia

- **Display**: Outfit (títulos, destaques)
- **Body**: Sora (corpo de texto)

### Componentes CSS

- `.card-evo` - Card com estilo Evocare
- `.btn-evo` - Button com gradiente
- `.input-evo` - Input com tema escuro
- `.text-gradient-evo` - Texto com gradiente

## 🚀 Como Executar

### Instalação

```bash
npm install
```

### Desenvolvimento

```bash
npm run dev
```

Abre em `http://localhost:3000`

### Build para Produção

```bash
npm run build
```

### Preview

```bash
npm run preview
```

## 📦 Dependências Principais

- **React 19.2.3** - UI library
- **React DOM 19.2.3** - React renderer
- **Recharts 3.7.0** - Gráficos
- **Tailwind CSS 3.4.1** - Utility-first CSS
- **Vite 5.1.0** - Build tool

## 🔧 Configuração

### TypeScript

- Target: ES2022
- JSX: react-jsx
- Strict mode ativado

### Vite

- Port padrão: 3000
- Path alias: `@` → `./src`

### Tailwind

- Modo JIT com content scan
- Design tokens customizados
- Scrollbar customizado

## 🎯 Features

- ✅ Upload de relatórios DISC
- ✅ Análise automática com gráficos
- ✅ Editor de devolutivas
- ✅ Gerador de apresentações
- ✅ Roteiro interativo
- ✅ Histórico de análises (localStorage)

## 🎨 Integração Evocare

Todos os componentes utilizam:
- Cores do design system Evocare
- Tipografia Outfit + Sora
- Componentes com estilo `.card-evo`, `.btn-evo`, etc
- Gradiente Evocare em CTAs e destaques

## 📝 Desenvolvimento

### Adicionar Novo Componente

1. Criar arquivo em `src/components/NomeComponente.tsx`
2. Usar classes Tailwind com tokens Evocare
3. Importar em `App.tsx` ou screens

### Adicionar Nova Tela

1. Criar arquivo em `src/screens/NovaScreen.tsx`
2. Implementar interface com `onNavigate`
3. Adicionar case no switch de `App.tsx`

## 🔌 Extensibilidade

O projeto está pronto para:
- Autenticação (adicionar provider)
- API real (substituir geminiService mock)
- Temas adicionais (extend tailwind.config)
- Novos gráficos (recharts)

## 📄 Licença

Desenvolvido com Synkra AIOS

---

**Última atualização**: Fevereiro 2026
