# 🚀 Quick Start - Integração Supabase

## Passos Rápidos para Começar

### 1. Instalar Dependência (2 minutos)

```bash
npm install @supabase/supabase-js
```

### 2. Criar Projeto no Supabase (5 minutos)

1. Acesse [supabase.com](https://supabase.com) e crie uma conta
2. Clique em "New Project"
3. Preencha:
   - Name: `regadio-african-cities`
   - Database Password: (anote esta senha!)
   - Region: escolha a mais próxima
4. Aguarde a criação (~2 minutos)

### 3. Executar Scripts SQL (10 minutos)

1. No Supabase Dashboard, vá em **SQL Editor**
2. Execute os scripts do arquivo `SUPABASE_SETUP.md` na ordem:
   - Script 1: Extensões e Tipos
   - Script 2: Tabela de Perfis
   - Script 3: Tabela de Notícias
   - Script 4: Tabela de Projetos
   - Script 5: Função para Criar Perfil
   - Script 6: Função para Gerar Slug

### 4. Configurar Storage (5 minutos)

1. No Dashboard, vá em **Storage**
2. Crie bucket `news-images` (público, 5MB, imagens)
3. Crie bucket `project-images` (público, 5MB, imagens)
4. Execute as políticas SQL do `SUPABASE_SETUP.md`

### 5. Obter Credenciais (2 minutos)

1. No Dashboard, vá em **Settings** > **API**
2. Copie:
   - **Project URL**
   - **anon/public key**

### 6. Configurar Variáveis de Ambiente (1 minuto)

1. Crie arquivo `.env.local` na raiz do projeto:
```env
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_ANON_KEY=sua-chave-aqui
```

2. Use `.env.example` como referência

### 7. Criar Usuário Admin (2 minutos)

1. No Dashboard, vá em **Authentication** > **Users**
2. Clique em "Add User" > "Create new user"
3. Email: `admin@regadio.co.ao`
4. Password: (defina uma senha)
5. Auto Confirm: ✅ Sim
6. Execute este SQL:
```sql
UPDATE public.profiles
SET role = 'admin'
WHERE email = 'admin@regadio.co.ao';
```

### 8. Testar (5 minutos)

1. Inicie o servidor: `npm run dev`
2. Acesse `/admin/login`
3. Faça login com o usuário admin criado
4. Teste criar uma notícia ou projeto

## ✅ Checklist Final

- [ ] Dependência instalada
- [ ] Projeto Supabase criado
- [ ] Scripts SQL executados
- [ ] Storage configurado
- [ ] Credenciais copiadas
- [ ] `.env.local` criado
- [ ] Usuário admin criado
- [ ] Login funcionando

## 🎉 Pronto!

Se todos os itens estão marcados, sua integração está completa!

## 📚 Próximos Passos

Consulte `SUPABASE_MIGRATION.md` para migrar o código existente.

## 🆘 Problemas?

Consulte a seção de Troubleshooting em `SUPABASE_SETUP.md`



