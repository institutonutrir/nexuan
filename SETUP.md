# 🚀 GUIA DE SETUP NEXUAN - PASSO A PASSO

## ✅ PRÉ-REQUISITOS (JÁ VERIFICADOS)

- ✅ Node.js v24.16.0 instalado
- ✅ npm v11.13.0 instalado
- ✅ VS Code instalado
- ✅ Conta GitHub criada
- ✅ Conta Supabase criada
- ✅ Conta Railway criada

---

## 📝 PASSO 1: Abrir o Projeto no VS Code

1. **Abra o VS Code**
2. **Clique em**: File → Open Folder
3. **Navegue até**: `C:\Users\tavar\Documents\NexUAN`
4. **Clique em**: Select Folder

Pronto! O projeto está aberto no VS Code ✅

---

## 📥 PASSO 2: Instalar as Dependências

1. **No VS Code**, abra o Terminal:
   - Pressione: `Ctrl + '` (Control + Aspas)
   
2. **Cole este comando**:
```bash
npm install
```

3. **Espere terminar** (pode levar 2-3 minutos)

Quando terminar, você verá: `added XXX packages` ✅

---

## 🔑 PASSO 3: Configurar Supabase

### 3.1 Criar um Projeto no Supabase

1. **Acesse**: https://supabase.com/dashboard
2. **Clique em**: "New Project"
3. **Preencha**:
   - Project Name: `NexUAN`
   - Database Password: Crie uma senha forte (guarde!)
   - Region: `São Paulo (sa-east-1)`
4. **Clique em**: "Create new project"
5. **Espere** alguns minutos para criar

### 3.2 Pegar as Credenciais

1. Depois que criar, vá para **Settings** (engrenagem no canto)
2. Clique em **API**
3. Copie:
   - `Project URL` → Salve como `SUPABASE_URL`
   - `anon public` key → Salve como `SUPABASE_ANON_KEY`

---

## 🗄️ PASSO 4: Criar as Tabelas no Banco de Dados

1. **No Supabase**, vá para**: SQL Editor (lado esquerdo)
2. **Clique em**: "New Query"
3. **Copie TUDO** do arquivo `scripts/schema.sql`
4. **Cole na janela** do SQL Editor
5. **Clique em**: "Run" (botão verde no canto)

Pronto! Tabelas criadas ✅

---

## 📄 PASSO 5: Criar Arquivo .env.local

1. **No VS Code**, clique com botão direito na raiz do projeto
2. **Clique em**: "New File"
3. **Digite**: `.env.local`
4. **Cole isso** (substituindo com seus dados):

```
NEXT_PUBLIC_SUPABASE_URL=https://seu-url.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=seu-anon-key-aqui
NEXT_PUBLIC_SITE_NAME=NexUAN - Sistema de Gestão de Unidades de Alimentação e Nutrição
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

5. **Salve**: `Ctrl + S`

---

## 🌐 PASSO 6: Rodar Localmente

1. **No terminal do VS Code**, cole:
```bash
npm run dev
```

2. **Você verá uma mensagem**:
```
> Local: http://localhost:3000
```

3. **Abra seu navegador** e acesse: http://localhost:3000

4. **Você verá** a página inicial do NexUAN com os 6 módulos! 🎉

---

## 📤 PASSO 7: Enviar para GitHub

### 7.1 Criar Repositório no GitHub

1. **Acesse**: https://github.com/new
2. **Digite o nome**: `nexuan`
3. **Deixe como**: Public
4. **Clique em**: "Create repository"
5. **Copie** os comandos que aparecerem

### 7.2 Fazer o Push

1. **No VS Code**, abra o Terminal
2. **Cole os comandos** que copiou do GitHub
3. **Pronto!** Seu código está no GitHub ✅

---

## 🚀 PASSO 8: Deploy no Railway

### 8.1 Conectar GitHub ao Railway

1. **Acesse**: https://railway.app/dashboard
2. **Clique em**: "New Project"
3. **Clique em**: "Deploy from GitHub repo"
4. **Autorize o GitHub**
5. **Selecione**: o repositório `nexuan`

### 8.2 Configurar Variáveis de Ambiente

1. **No Railway**, vá para**: "Variables"
2. **Cole** as mesmas do `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```

3. **Clique em**: "Deploy"
4. **Espere** (uns 5 minutos)
5. **Quando terminar, clique em** "Generate Domain"

**Pronto!** Seu site está no ar! 🌍

---

## ✅ Checklist Final

- [ ] Dependências instaladas (`npm install`)
- [ ] Projeto Supabase criado
- [ ] Credenciais no `.env.local`
- [ ] Tabelas criadas no Supabase
- [ ] Rodando localmente em http://localhost:3000
- [ ] Código enviado para GitHub
- [ ] Deployado no Railway
- [ ] URL do Railway funcionando

---

## 🆘 Se Algo Não Funcionar

### Erro: "Cannot find module"
```bash
npm install
```

### Erro: "SUPABASE_URL is not defined"
- Verifique se `.env.local` está preenchido corretamente

### Erro: "Connection refused"
- Verifique se o `npm run dev` está rodando
- Acesse novamente: http://localhost:3000

---

## 🎓 Próximos Passos

Após confirmar que está funcionando:

1. **Desenvolver o Módulo 1** (Engenharia de Cardápios)
2. **Criar componentes de formulário**
3. **Integrar com Supabase**
4. **Gerar cálculos automáticos**

**Avisa quando chegar aqui!** 📞

---

**Sucesso! 🎉**
