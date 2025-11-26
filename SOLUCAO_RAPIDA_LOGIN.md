# ⚡ Solução Rápida - Problema de Login

## 🔍 Diagnóstico

Baseado na imagem que você compartilhou:
- ✅ Autenticação funcionando (200 OK)
- ✅ Token recebido com sucesso
- ❌ Perfil não está sendo carregado
- ❌ Sessão não está sendo criada no frontend

## 🚀 Solução em 3 Passos

### Passo 1: Executar Script SQL (2 minutos)

No Supabase Dashboard, vá em **SQL Editor** e execute o arquivo `SOLUCAO_LOGIN.sql`.

Este script vai:
1. Verificar se o perfil existe
2. Criar o perfil se não existir
3. Corrigir políticas RLS
4. Verificar se tudo está correto

### Passo 2: Verificar Console do Navegador

1. Abra o DevTools (F12)
2. Vá na aba **Console**
3. Limpe o console
4. Tente fazer login novamente
5. Procure por estas mensagens:

**Se funcionar, você verá:**
```
Attempting login for: admin@regadio.co.ao
User authenticated, loading profile... [id]
Loading profile for user ID: [id]
Profile found: {id: "...", email: "...", name: "...", role: "admin"}
Profile loaded successfully: {...}
User state updated, isAuthenticated should be true now
Login successful, redirecting...
```

**Se houver erro, você verá:**
```
Error loading profile: {...}
Error details: {...}
```

### Passo 3: Se Ainda Não Funcionar

Execute este SQL para criar o perfil manualmente:

```sql
-- Substitua 'SEU_USER_ID' pelo ID do usuário (veja na tabela auth.users)
INSERT INTO public.profiles (id, email, name, role)
VALUES (
  'SEU_USER_ID',
  'admin@regadio.co.ao',
  'Administrador',
  'admin'::user_role
)
ON CONFLICT (id) DO UPDATE SET role = 'admin';
```

Para obter o USER_ID:
```sql
SELECT id, email FROM auth.users WHERE email = 'admin@regadio.co.ao';
```

## 🔧 O que foi Corrigido no Código

1. **Criação automática de perfil**: Se o perfil não existir, será criado automaticamente
2. **Políticas RLS corrigidas**: Script SQL para permitir criação de perfis
3. **Melhor tratamento de erros**: Logs detalhados no console
4. **Redirecionamento melhorado**: Múltiplas tentativas de redirecionamento

## 📋 Checklist

Após executar o script SQL:

- [ ] Perfil criado na tabela `profiles`
- [ ] Políticas RLS configuradas
- [ ] Console mostra "Profile found"
- [ ] Console mostra "Login successful"
- [ ] Redirecionamento para `/admin` funciona

## 🆘 Se Ainda Não Funcionar

1. **Verifique o console** e compartilhe as mensagens de erro
2. **Execute o script SQL** `SOLUCAO_LOGIN.sql`
3. **Verifique se o perfil existe**:
```sql
SELECT * FROM public.profiles WHERE email = 'admin@regadio.co.ao';
```

4. **Teste a conexão diretamente**:
```javascript
// No console do navegador
const { data, error } = await supabase
  .from('profiles')
  .select('*')
  .eq('email', 'admin@regadio.co.ao')
  .single();
console.log("Profile:", data, "Error:", error);
```

