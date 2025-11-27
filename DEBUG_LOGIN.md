# 🔍 Debug do Problema de Login

## Problema Identificado

O login está funcionando (credenciais corretas), mas a sessão não está sendo criada/persistida e o acesso ao painel não está sendo liberado.

## Correções Aplicadas

### 1. ProtectedRoute atualizado
- Agora verifica o estado `loading` antes de redirecionar
- Mostra um spinner enquanto verifica autenticação
- Evita redirecionamento prematuro

### 2. AuthContext melhorado
- Logs de debug adicionados em cada etapa
- Sincronização melhorada entre login e estado
- Verificação de sessão após login
- Delay para garantir atualização do React

### 3. LoginPage atualizado
- Verificação de variáveis de ambiente
- Tratamento de erros melhorado
- Delay antes de navegar para garantir estado atualizado

## Como Verificar se Está Funcionando

### Passo 1: Abrir Console do Navegador
1. Pressione F12
2. Vá na aba Console
3. Limpe o console (Ctrl+L ou Cmd+K)

### Passo 2: Tentar Login
1. Digite email e senha
2. Clique em "Entrar"
3. Observe as mensagens no console

### Passo 3: Mensagens Esperadas

**Se tudo estiver funcionando, você verá:**
```
Attempting login for: seu@email.com
User authenticated, loading profile... [user-id]
Loading profile for user ID: [user-id]
Profile found: {id: "...", email: "...", name: "...", role: "..."}
Profile loaded successfully: {id: "...", email: "...", name: "...", role: "..."}
Session after login: [user-id]
Auth state changed: SIGNED_IN [user-id]
```

**Se houver problema, você verá:**
- "Error loading profile" → Problema com perfil no banco
- "Profile not found" → Perfil não existe
- "Login error" → Problema com credenciais ou Supabase

## Verificações no Supabase

### 1. Verificar se o usuário existe
```sql
SELECT id, email, confirmed_at 
FROM auth.users 
WHERE email = 'seu@email.com';
```

### 2. Verificar se o perfil existe
```sql
SELECT id, email, name, role 
FROM public.profiles 
WHERE email = 'seu@email.com';
```

### 3. Se o perfil não existir, criar:
```sql
INSERT INTO public.profiles (id, email, name, role)
SELECT 
  u.id,
  u.email,
  COALESCE(u.raw_user_meta_data->>'name', u.email) as name,
  'admin'::user_role as role
FROM auth.users u
WHERE u.email = 'seu@email.com'
  AND u.id NOT IN (SELECT id FROM public.profiles);
```

### 4. Verificar políticas RLS
```sql
SELECT * FROM pg_policies WHERE tablename = 'profiles';
```

Se não houver políticas, execute novamente o Script 2 do SUPABASE_SETUP.md

## Teste Rápido

Execute este código no console do navegador após fazer login:

```javascript
// Verificar sessão
const { data: { session } } = await supabase.auth.getSession();
console.log("Session:", session);

// Verificar perfil
const { data: profile } = await supabase
  .from('profiles')
  .select('*')
  .eq('id', session?.user?.id)
  .single();
console.log("Profile:", profile);
```

## Solução de Problemas Comuns

### Problema: "Perfil não encontrado"
**Solução**: Execute o SQL acima para criar o perfil manualmente

### Problema: Redireciona para login mesmo após login bem-sucedido
**Solução**: 
1. Verifique se o `onAuthStateChange` está disparando (veja console)
2. Verifique se o perfil está sendo carregado
3. Limpe o localStorage: `localStorage.clear()` e tente novamente

### Problema: Loading infinito
**Solução**: 
1. Verifique se há erros no console
2. Verifique se as variáveis de ambiente estão corretas
3. Verifique conexão com Supabase

## Checklist Final

- [ ] Console mostra "Profile loaded successfully"
- [ ] Console mostra "Session after login"
- [ ] Console mostra "Auth state changed: SIGNED_IN"
- [ ] Usuário existe em `auth.users`
- [ ] Perfil existe em `public.profiles`
- [ ] Políticas RLS estão configuradas
- [ ] Variáveis de ambiente estão corretas
- [ ] Servidor foi reiniciado após configurar `.env.local`


