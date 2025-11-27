# 🔧 Guia Completo de Correção - Upload de Imagens e Listagem de Notícias

## 📋 Resumo dos Problemas

1. ✅ **Notícias são salvas no banco** - Funcionando!
2. ❌ **Imagens não fazem upload** - Storage não configurado
3. ❌ **Notícias não aparecem na lista do admin** - Provavelmente RLS bloqueando

---

## 🛠️ Solução Passo a Passo

### PASSO 1: Criar Storage Buckets no Supabase

> **IMPORTANTE:** Você precisa criar os buckets MANUALMENTE na interface do Supabase primeiro!

1. Abra o Supabase Dashboard:  
   👉 https://app.supabase.com/project/adcehcsyruyxjhnigtkh/storage/buckets

2. Clique no botão **"New bucket"**

3. Crie o primeiro bucket:
   - **Name:** `news-images`
   - **Public bucket:** ✅ **Marcar como PÚBLICO**
   - Clique em **"Create bucket"**

4. Crie o segundo bucket:
   - **Name:** `project-images`
   - **Public bucket:** ✅ **Marcar como PÚBLICO**
   - Clique em **"Create bucket"**

✅ **Checkpoint:** Você deve ver 2 buckets na lista: `news-images` e `project-images`

---

### PASSO 2: Executar Script de RLS para Storage

1. Abra o SQL Editor do Supabase:  
   👉 https://app.supabase.com/project/adcehcsyruyxjhnigtkh/sql/new

2. Abra o arquivo [`FIX_STORAGE_RLS.sql`](file:///Users/naymmupoia/Documents/regadio-african-cities-main/FIX_STORAGE_RLS.sql)

3. **Copie TODO o conteúdo** do arquivo

4. **Cole** no SQL Editor do Supabase

5. Clique no botão **"RUN"** (ou pressione Ctrl+Enter)

6. Verifique se aparece:
   ```
   Success. No rows returned
   ```

✅ **Checkpoint:** As políticas RLS do Storage foram criadas!

---

### PASSO 3: Confirmar RLS da Tabela `news`

> Se você já executou o `FIX_NEWS_RLS.sql`, pule para o Passo 4. Caso contrário:

1. Abra o SQL Editor:  
   👉 https://app.supabase.com/project/adcehcsyruyxjhnigtkh/sql/new

2. Abra o arquivo [`FIX_NEWS_RLS.sql`](file:///Users/naymmupoia/Documents/regadio-african-cities-main/FIX_NEWS_RLS.sql)

3. **Copie TODO o conteúdo** do arquivo

4. **Cole** no SQL Editor

5. Clique em **"RUN"**

6. Role até o final dos resultados e verifique se as políticas foram criadas:
   - `Anyone can view published news`
   - `Admins can view all news`
   - `Admins can insert news`
   - `Admins can update news`
   - `Admins can delete news`

✅ **Checkpoint:** As 5 políticas RLS da tabela `news` foram criadas!

---

### PASSO 4: Verificar seu Perfil de Admin

Execute esta query no SQL Editor:

```sql
SELECT id, email, role FROM public.profiles WHERE email = 'naymupoia@gmail.com';
```

**Resultado esperado:**
```
id: d6eb20d7-8080-4f71-ba6d-6564607beca9
email: naymupoia@gmail.com
role: admin
```

✅ **Checkpoint:** Seu perfil tem role = 'admin'

---

### PASSO 5: Testar Upload de Imagem

1. Abra o painel administrativo do seu app

2. Vá para **Admin > Notícias**

3. Clique em **"Nova Notícia"**

4. Preencha os campos e **selecione uma imagem**

5. Clique em **"Salvar"** ou **"Criar"**

6. Abra o Console do navegador (F12 → Console)

**Se funcionar:**
- Você verá a notícia criada
- A imagem aparecerá corretamente

**Se NÃO funcionar:**
- Copie o erro do console
- Me envie o erro completo

✅ **Checkpoint:** Imagem foi enviada com sucesso para o Storage!

---

### PASSO 6: Verificar Listagem de Notícias no Admin

1. No painel admin, vá para **Admin > Notícias**

2. Você deve ver a lista de notícias criadas

**Se a lista estiver vazia:**

1. Abra o Console do navegador (F12 → Console)
2. Procure por erros vermelhos
3. Execute esta query no SQL Editor para verificar:

```sql
-- Testar se você consegue ver as notícias
SELECT id, title, status, created_at FROM public.news;

-- Verificar se as políticas estão ativas
SELECT policyname, cmd FROM pg_policies WHERE tablename = 'news';
```

4. Me envie os resultados

✅ **Checkpoint:** Notícias aparecem na lista do admin!

---

## 🎯 Resumo: O que Você Precisa Fazer AGORA

1. ✅ **Criar 2 buckets no Storage** (`news-images` e `project-images`)
2. ✅ **Executar `FIX_STORAGE_RLS.sql`** no SQL Editor
3. ✅ **Executar `FIX_NEWS_RLS.sql`** no SQL Editor (se ainda não executou)
4. ✅ **Testar** criar uma notícia com imagem
5. ✅ **Verificar** se a lista do admin aparece

---

## 🆘 Se Algo Der Errado

**Problema: Erro ao criar bucket**
- Verifique se você não criou já
- Verifique se o nome está correto (exatamente `news-images`)

**Problema: Erro ao executar SQL**  
- Copie o erro exato
- Me envie para eu ajudar

**Problema: Imagem não faz upload**  
- Abra o Console (F12)
- Copie o erro
- Verifique se o bucket foi criado como **público**

**Problema: Lista do admin vazia**  
- Execute: `SELECT COUNT(*) FROM public.news;` no SQL Editor
- Se retornar 0, não há notícias no banco
- Se retornar > 0, é problema de RLS

---

## 📞 Próximos Passos

1. Execute os passos acima
2. Me avise se funcionou ou se teve algum erro
3. Se teve erro, me envie:
   - Print do erro do console
   - Resultado das queries de teste
   - Qual passo específico deu erro

Boa sorte! 🚀
