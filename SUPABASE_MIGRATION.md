# Guia de Migração para Supabase

## 📋 Checklist de Migração

Siga estes passos na ordem para migrar completamente para Supabase:

### ✅ Passo 1: Configuração do Supabase
- [ ] Criar projeto no Supabase
- [ ] Executar todos os scripts SQL do `SUPABASE_SETUP.md`
- [ ] Configurar buckets de storage
- [ ] Criar usuário admin inicial

### ✅ Passo 2: Configuração do Projeto
- [ ] Instalar dependência: `npm install @supabase/supabase-js`
- [ ] Criar arquivo `.env.local` com credenciais
- [ ] Verificar que `.env.local` está no `.gitignore`

### ✅ Passo 3: Atualizar Código

#### 3.1 Atualizar AuthContext
- [x] Arquivo já atualizado: `src/contexts/AuthContext.tsx`
- [ ] Testar login/logout

#### 3.2 Atualizar Serviços de Dados

**Para Notícias:**
- [ ] Substituir `src/services/dataService.ts` (newsService) por `src/services/supabaseNewsService.ts`
- [ ] Atualizar imports em:
  - `src/pages/admin/NewsListPage.tsx`
  - `src/pages/admin/NewsFormPage.tsx`
  - `src/components/News.tsx`
  - `src/pages/NewsPage.tsx`
  - `src/pages/NewsDetailPage.tsx`
  - `src/data/news.ts` (usar serviço ao invés de array estático)

**Para Projetos:**
- [ ] Substituir `src/services/dataService.ts` (projectsService) por `src/services/supabaseProjectsService.ts`
- [ ] Atualizar imports em:
  - `src/pages/admin/ProjectsListPage.tsx`
  - `src/pages/admin/ProjectsFormPage.tsx`
  - `src/components/Projects.tsx`

#### 3.3 Atualizar Componentes de Upload
- [ ] Verificar que `ImageUpload` e `ImageGalleryUpload` funcionam com Supabase Storage
- [ ] Testar upload de imagens

### ✅ Passo 4: Testes
- [ ] Testar login/logout
- [ ] Testar CRUD de notícias
- [ ] Testar CRUD de projetos
- [ ] Testar upload de imagens
- [ ] Testar permissões (admin, editor, viewer)
- [ ] Testar RLS (tentar acessar dados sem autenticação)

### ✅ Passo 5: Limpeza
- [ ] Remover código antigo de localStorage
- [ ] Remover `src/services/dataService.ts` (se não for mais usado)
- [ ] Atualizar documentação

## 🔄 Exemplo de Substituição

### Antes (localStorage):
```typescript
import { newsService } from "@/services/dataService";

const articles = newsService.getAll();
```

### Depois (Supabase):
```typescript
import { newsService } from "@/services/supabaseNewsService";

const articles = await newsService.getAll();
```

**⚠️ IMPORTANTE**: Todos os métodos agora são `async` e retornam `Promise`!

## 📝 Notas Importantes

1. **Async/Await**: Todos os métodos dos serviços agora são assíncronos
2. **Error Handling**: Adicione try/catch onde necessário
3. **Loading States**: Adicione estados de loading nos componentes
4. **RLS**: As políticas RLS garantem segurança automática
5. **Storage**: Imagens são armazenadas no Supabase Storage, não mais em base64

## 🐛 Troubleshooting

### Erro: "Missing Supabase environment variables"
- Verifique se `.env.local` existe e tem as variáveis corretas
- Reinicie o servidor de desenvolvimento após criar `.env.local`

### Erro: "Row Level Security policy violation"
- Verifique se o usuário está autenticado
- Verifique se o usuário tem a role correta no perfil
- Verifique as políticas RLS no Supabase

### Imagens não aparecem
- Verifique se os buckets de storage foram criados
- Verifique as políticas de storage
- Verifique se as URLs das imagens estão corretas

### Erro ao fazer upload
- Verifique o tamanho do arquivo (máx 5MB)
- Verifique o tipo do arquivo (apenas imagens)
- Verifique as permissões do bucket




