# Guia de Verificação - Cadastro de Notícias

## 🔍 Checklist de Diagnóstico

Execute estas verificações para identificar o problema:

### 1. Verificar se a notícia foi salva no banco

1. Abra o Supabase Dashboard: https://app.supabase.com/project/adcehcsyruyxjhnigtkh/editor
2. Clique na tabela `news`
3. Veja se há algum registro novo

**Resultado esperado:** Deve aparecer pelo menos 1 registro com status "draft"

---

### 2. Verificar o Console do Navegador

1. Abra o DevTools (pressione **F12**)
2. Vá para a aba **Console**
3. Clique em **Network** também
4. Tente criar uma notícia novamente
5. Procure por:
   - ✅ Requisição POST para `/rest/v1/news`
   - ✅ Status 201 (sucesso)
   - ❌ Erros vermelhos no console

**Tire um print se ver algum erro!**

---

### 3. Verificar Upload de Imagens

Se o problema for com imagens:

#### 3.1. Verificar se o Storage Bucket existe

1. Vá para: https://app.supabase.com/project/adcehcsyruyxjhnigtkh/storage/buckets
2. Verifique se existe um bucket chamado **`news-images`**
3. Se NÃO existir, clique em **"New bucket"** e crie:
   - Nome: `news-images`
   - Public: ✅ **Ativar** (para URLs públicas)

#### 3.2. Verificar Políticas do Storage

1. Clique no bucket `news-images`
2. Vá para **Policies**
3. Deve ter políticas permitindo:
   - **SELECT (read)**: Para todos
   - **INSERT (upload)**: Para admins autenticados
   - **DELETE**: Para admins autenticados

---

### 4. Verificar Dados Enviados

No console do navegador (DevTools):

1. Aba **Network**
2. Encontre a requisição POST para `/news`
3. Clique nela
4. Vá para **Payload** ou **Request**
5. Verifique se os dados estão sendo enviados corretamente:
   ```json
   {
     "slug": "...",
     "title": "...",
     "description": "...",
     "content": "...",
     "image_url": "...",
     "date": "...",
     "status": "draft",
     "created_by": "..."
   }
   ```

---

## 🚨 Problemas Comuns

### Problema: Notícia não aparece no banco

**Possível causa:** JavaScript está em cache ou erro silencioso

**Solução:**
1. Limpe o cache (Ctrl+Shift+R ou Cmd+Shift+R)
2. Verifique o console para erros

### Problema: Imagem não faz upload

**Possível causa 1:** Bucket não existe

**Solução:** Criar bucket `news-images` como descrito acima

**Possível causa 2:** RLS bloqueando upload no Storage

**Solução:** Execute o SQL abaixo:

```sql
-- Políticas para Storage - news-images
CREATE POLICY "Anyone can view news images"
ON storage.objects FOR SELECT
USING (bucket_id = 'news-images');

CREATE POLICY "Admins can upload news images"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'news-images' AND
  EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  )
);

CREATE POLICY "Admins can delete news images"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'news-images' AND
  EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  )
);
```

---

## 📝 Para Me Ajudar a Diagnosticar

Por favor, me envie:

1. ✅ Print do console do navegador (quando tentar criar notícia)
2. ✅ Print da tabela `news` no Supabase (se há registros)
3. ✅ Print dos buckets no Storage
4. ✅ Descrição exata: "A notícia aparece no admin mas não no banco?" OU "A imagem não faz upload?"
