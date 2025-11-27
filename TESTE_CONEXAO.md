# 🧪 Teste Rápido de Conexão

## Teste no Console do Navegador

Abra o console (F12) e execute estes comandos para diagnosticar:

### 1. Verificar Variáveis de Ambiente
```javascript
console.log("URL:", import.meta.env.VITE_SUPABASE_URL);
console.log("Key exists:", !!import.meta.env.VITE_SUPABASE_ANON_KEY);
```

### 2. Testar Conexão com Supabase
```javascript
// Importar supabase (se possível) ou usar window.supabase
// Ou execute no console após fazer login na página
```

### 3. Verificar Sessão Atual
```javascript
const { data: { session }, error } = await supabase.auth.getSession();
console.log("Session:", session);
console.log("Error:", error);
```

### 4. Verificar Perfil
```javascript
if (session?.user) {
  const { data: profile, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', session.user.id)
    .single();
  console.log("Profile:", profile);
  console.log("Error:", error);
}
```

## O que Verificar

1. **Se URL e Key aparecem**: Variáveis de ambiente estão configuradas
2. **Se Session existe após login**: Autenticação funcionou
3. **Se Profile existe**: Perfil foi criado corretamente
4. **Se há erros**: Veja a mensagem de erro específica


