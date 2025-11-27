# 🔧 Troubleshooting - Problemas de Login

## Problemas Comuns e Soluções

### 1. "Perfil não encontrado"

**Causa**: O perfil não foi criado automaticamente ou o trigger não está funcionando.

**Solução**:
1. Verifique se o trigger `handle_new_user` foi criado:
```sql
-- Verificar se a função existe
SELECT * FROM pg_proc WHERE proname = 'handle_new_user';

-- Verificar se o trigger existe
SELECT * FROM pg_trigger WHERE tgname = 'on_auth_user_created';
```

2. Se não existir, execute novamente o Script 5 do SUPABASE_SETUP.md

3. **Criar perfil manualmente**:
```sql
-- Para um usuário existente
INSERT INTO public.profiles (id, email, name, role)
SELECT 
  id,
  email,
  COALESCE(raw_user_meta_data->>'name', email) as name,
  'viewer'::user_role as role
FROM auth.users
WHERE id NOT IN (SELECT id FROM public.profiles);
```

### 2. "Row Level Security policy violation"

**Causa**: As políticas RLS estão bloqueando o acesso ao perfil.

**Solução**:
1. Verifique se as políticas existem:
```sql
SELECT * FROM pg_policies WHERE tablename = 'profiles';
```

2. Se não existirem, execute novamente o Script 2 do SUPABASE_SETUP.md

3. **Temporariamente desabilitar RLS para teste** (apenas em desenvolvimento):
```sql
ALTER TABLE public.profiles DISABLE ROW LEVEL SECURITY;
-- Teste o login
-- Depois reabilite:
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
```

### 3. "Invalid login credentials"

**Causa**: Email ou senha incorretos, ou usuário não confirmado.

**Solução**:
1. Verifique se o usuário existe no Supabase:
   - Dashboard > Authentication > Users
   
2. Verifique se o usuário está confirmado:
   - Se não estiver, clique em "Confirm User"

3. **Redefinir senha** (se necessário):
   - No Dashboard, edite o usuário e defina nova senha

### 4. Variáveis de ambiente não configuradas

**Causa**: `.env.local` não existe ou está incorreto.

**Solução**:
1. Verifique se o arquivo `.env.local` existe na raiz do projeto
2. Verifique se contém:
```env
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_ANON_KEY=sua-chave-aqui
```
3. **Reinicie o servidor de desenvolvimento** após criar/editar `.env.local`

### 5. Erro no console do navegador

**Como verificar**:
1. Abra o DevTools (F12)
2. Vá na aba Console
3. Tente fazer login
4. Veja as mensagens de erro/log

**Logs esperados**:
- "Attempting login for: email@exemplo.com"
- "User authenticated, loading profile..."
- "Profile loaded successfully"

### 6. Verificar se tudo está configurado

Execute este SQL no Supabase para verificar:

```sql
-- Verificar se a tabela profiles existe
SELECT * FROM information_schema.tables 
WHERE table_schema = 'public' AND table_name = 'profiles';

-- Verificar se há usuários
SELECT id, email FROM auth.users;

-- Verificar se há perfis
SELECT id, email, name, role FROM public.profiles;

-- Verificar políticas RLS
SELECT * FROM pg_policies WHERE tablename = 'profiles';

-- Verificar trigger
SELECT * FROM pg_trigger WHERE tgname = 'on_auth_user_created';
```

### 7. Criar usuário e perfil manualmente

Se nada funcionar, crie tudo manualmente:

```sql
-- 1. Criar usuário (use o Dashboard do Supabase para isso)
-- 2. Depois criar perfil manualmente:

-- Substitua 'USER_ID_AQUI' pelo ID do usuário criado
-- Substitua 'email@exemplo.com' pelo email do usuário
INSERT INTO public.profiles (id, email, name, role)
VALUES (
  'USER_ID_AQUI',
  'email@exemplo.com',
  'Nome do Usuário',
  'admin'::user_role
);
```

### 8. Testar conexão com Supabase

Adicione este código temporariamente no LoginPage para testar:

```typescript
// No início do handleSubmit, antes do login:
console.log("Supabase URL:", import.meta.env.VITE_SUPABASE_URL);
console.log("Supabase Key exists:", !!import.meta.env.VITE_SUPABASE_ANON_KEY);

// Testar conexão
const { data, error } = await supabase.from('profiles').select('count');
console.log("Connection test:", { data, error });
```

## Checklist de Verificação

- [ ] `.env.local` existe e tem as variáveis corretas
- [ ] Servidor foi reiniciado após criar `.env.local`
- [ ] Tabela `profiles` existe no Supabase
- [ ] Trigger `on_auth_user_created` existe
- [ ] Políticas RLS estão configuradas
- [ ] Usuário existe em `auth.users`
- [ ] Perfil existe em `public.profiles`
- [ ] Usuário está confirmado no Supabase
- [ ] Console do navegador não mostra erros de CORS
- [ ] Credenciais estão corretas

## Debug Avançado

Se ainda não funcionar, adicione este código temporário no `AuthContext.tsx`:

```typescript
// No início do componente AuthProvider
useEffect(() => {
  console.log("AuthProvider mounted");
  console.log("Supabase URL:", import.meta.env.VITE_SUPABASE_URL);
  console.log("Supabase Key:", import.meta.env.VITE_SUPABASE_ANON_KEY?.substring(0, 20) + "...");
}, []);
```

Isso ajudará a identificar se o problema é de configuração ou de código.


