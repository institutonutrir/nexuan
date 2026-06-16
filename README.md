# 🍽️ NexUAN - Sistema de Gestão de Unidades de Alimentação e Nutrição

Plataforma SaaS completa para nutricionistas e consultores de UANs com conformidade total com as normas Anvisa.

## 📋 Módulos Principais

1. **Engenharia de Cardápios** - Ficha Técnica e Análise Smith-Kasavanas
2. **Auditoria RDC 216** - Checklist digital de conformidade
3. **Documentos Regulatórios** - MBP, POPs e APPCC
4. **Gestão de RH** - Dimensionamento e Produtividade
5. **Rotulagem Nutricional** - Conformidade com Anvisa RDC 429/2020
6. **Estoque e Finanças** - Controle e Tabulação Financeira

## 🚀 Quick Start

### 1. Instalar Dependências

```bash
npm install
```

### 2. Configurar Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```bash
cp .env.example .env.local
```

Preencha com seus dados do Supabase:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### 3. Rodar Localmente

```bash
npm run dev
```

Acesse em: http://localhost:3000

## 🗄️ Banco de Dados

### Criar Tabelas no Supabase

1. Acesse: https://supabase.com
2. Crie um novo projeto
3. Vá para o SQL Editor
4. Execute o arquivo `scripts/schema.sql`

## 📦 Deploy no Railway

1. Faça push para GitHub
2. Conecte o repositório ao Railway
3. Configure as variáveis de ambiente
4. Deploy automático! 🎉

## 👨‍💻 Tech Stack

- **Frontend**: Next.js + React + Tailwind CSS
- **Backend**: Supabase (PostgreSQL)
- **Hospedagem**: Railway
- **UI Components**: shadcn/ui

## 📧 Contato

Email: nutrir@institutonutrir.com

---

**Desenvolvido com ❤️ para nutricionistas e consultores de UAN**
