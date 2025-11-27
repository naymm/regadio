# 🚀 Integração Completa com Supabase - REGADIO

## 📋 Visão Geral

Este documento fornece todas as instruções necessárias para integrar completamente o site REGADIO com Supabase, transformando-o em uma aplicação totalmente dinâmica e escalável.

## 🎯 O que foi Preparado

### ✅ Documentação Completa
1. **SUPABASE_SETUP.md** - Guia detalhado de configuração
2. **SUPABASE_MIGRATION.md** - Guia de migração do código
3. **SUPABASE_QUICK_START.md** - Início rápido
4. **INTEGRACAO_SUPABASE_RESUMO.md** - Resumo técnico

### ✅ Código Implementado
1. **Cliente Supabase** (`src/lib/supabase.ts`)
2. **Storage Helper** (`src/lib/storage.ts`)
3. **AuthContext atualizado** (`src/contexts/AuthContext.tsx`)
4. **Serviços de dados**:
   - `src/services/supabaseNewsService.ts`
   - `src/services/supabaseProjectsService.ts`

### ✅ Estrutura de Banco de Dados
- Tabelas: profiles, news, projects, project_images
- RLS (Row Level Security) configurado
- Storage buckets preparados
- Políticas de segurança definidas

## 🚀 Passo a Passo para Implementação

### Fase 1: Setup do Supabase (30 minutos)

#### 1.1 Instalar Dependência
```bash
npm install @supabase/supabase-js
```

#### 1.2 Criar Projeto no Supabase
1. Acesse https://supabase.com
2. Crie conta/login
3. Clique em "New Project"
4. Preencha:
   - Name: `regadio-african-cities`
   - Database Password: (anote esta senha!)
   - Region: escolha a mais próxima
5. Aguarde criação (~2 minutos)

#### 1.3 Executar Scripts SQL
1. No Dashboard, vá em **SQL Editor**
2. Execute os scripts do `SUPABASE_SETUP.md` na ordem:
   - Script 1: Extensões
   - Script 2: Tabela profiles
   - Script 3: Tabela news
   - Script 4: Tabela projects
   - Script 5: Função handle_new_user
   - Script 6: Função generate_slug

#### 1.4 Configurar Storage
1. Vá em **Storage**
2. Crie bucket `news-images`:
   - Public: ✅
   - File size: 5MB
   - MIME: `image/jpeg,image/png,image/gif,image/webp`
3. Crie bucket `project-images` (mesmas configurações)
4. Execute as políticas SQL do `SUPABASE_SETUP.md`

#### 1.5 Obter Credenciais
1. Vá em **Settings** > **API**
2. Copie:
   - Project URL
   - anon/public key

#### 1.6 Criar Arquivo .env.local
```bash
# Na raiz do projeto
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_ANON_KEY=sua-chave-aqui
```

#### 1.7 Criar Usuário Admin
1. Vá em **Authentication** > **Users**
2. "Add User" > "Create new user"
3. Email: `admin@regadio.co.ao`
4. Password: (defina senha forte)
5. Auto Confirm: ✅
6. Execute SQL:
```sql
UPDATE public.profiles
SET role = 'admin'
WHERE email = 'admin@regadio.co.ao';
```

### Fase 2: Atualizar Código (1-2 horas)

#### 2.1 Atualizar Imports

**Arquivos a atualizar:**

1. **src/pages/admin/NewsListPage.tsx**
```typescript
// ANTES
import { newsService } from "@/services/dataService";
const articles = newsService.getAll();

// DEPOIS
import { newsService } from "@/services/supabaseNewsService";
const [articles, setArticles] = useState([]);
useEffect(() => {
  const load = async () => {
    const data = await newsService.getAll(true); // true = incluir drafts
    setArticles(data);
  };
  load();
}, []);
```

2. **src/pages/admin/NewsFormPage.tsx**
```typescript
// ANTES
import { newsService } from "@/services/dataService";
newsService.create(articleData);

// DEPOIS
import { newsService } from "@/services/supabaseNewsService";
await newsService.create(articleData);
```

3. **src/pages/admin/ProjectsListPage.tsx**
```typescript
// ANTES
import { projectsService } from "@/services/dataService";

// DEPOIS
import { projectsService } from "@/services/supabaseProjectsService";
```

4. **src/pages/admin/ProjectsFormPage.tsx**
```typescript
// ANTES
import { projectsService } from "@/services/dataService";

// DEPOIS
import { projectsService } from "@/services/supabaseProjectsService";
```

5. **src/components/News.tsx**
```typescript
// ANTES
import { newsArticles } from "@/data/news";

// DEPOIS
import { newsService } from "@/services/supabaseNewsService";
const [articles, setArticles] = useState([]);
useEffect(() => {
  const load = async () => {
    const data = await newsService.getAll(); // apenas publicadas
    setArticles(data);
  };
  load();
}, []);
```

6. **src/components/Projects.tsx**
```typescript
// ANTES
const projects: Project[] = [...];

// DEPOIS
import { projectsService } from "@/services/supabaseProjectsService";
const [projects, setProjects] = useState<Project[]>([]);
useEffect(() => {
  const load = async () => {
    const data = await projectsService.getAll(); // apenas publicados
    setProjects(data);
  };
  load();
}, []);
```

7. **src/pages/NewsPage.tsx**
```typescript
// Similar ao News.tsx - usar serviço ao invés de array estático
```

8. **src/pages/NewsDetailPage.tsx**
```typescript
// ANTES
import { getNewsBySlug } from "@/data/news";
const article = getNewsBySlug(slug);

// DEPOIS
import { newsService } from "@/services/supabaseNewsService";
const [article, setArticle] = useState(null);
useEffect(() => {
  const load = async () => {
    if (slug) {
      const data = await newsService.getBySlug(slug);
      setArticle(data);
    }
  };
  load();
}, [slug]);
```

#### 2.2 Adicionar Estados de Loading

Em todos os componentes que buscam dados, adicione:

```typescript
const [loading, setLoading] = useState(true);
const [data, setData] = useState([]);

useEffect(() => {
  const loadData = async () => {
    setLoading(true);
    try {
      const result = await service.getAll();
      setData(result);
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setLoading(false);
    }
  };
  loadData();
}, []);

if (loading) return <div>Carregando...</div>;
```

#### 2.3 Tratamento de Erros

Adicione try/catch em todas as operações:

```typescript
try {
  await newsService.create(articleData);
  toast({ title: "Sucesso", description: "Notícia criada!" });
} catch (error: any) {
  toast({ 
    title: "Erro", 
    description: error.message || "Erro ao criar notícia",
    variant: "destructive"
  });
}
```

### Fase 3: Testes (30 minutos)

- [ ] Login funciona
- [ ] Criar notícia funciona
- [ ] Editar notícia funciona
- [ ] Deletar notícia funciona
- [ ] Criar projeto funciona
- [ ] Upload de imagens funciona
- [ ] Publicar/arquivar funciona
- [ ] Site público mostra apenas conteúdo publicado
- [ ] Permissões funcionam (admin vs editor)

## 🔍 Verificação Final

Execute este checklist:

- [ ] `npm install @supabase/supabase-js` executado
- [ ] Projeto Supabase criado
- [ ] Todos os scripts SQL executados
- [ ] Storage buckets criados
- [ ] `.env.local` configurado
- [ ] Usuário admin criado
- [ ] Todos os imports atualizados
- [ ] Estados de loading adicionados
- [ ] Tratamento de erros implementado
- [ ] Testes passando

## 📊 Estrutura Final

```
src/
├── lib/
│   ├── supabase.ts          ✅ Cliente Supabase
│   └── storage.ts           ✅ Helpers de storage
├── contexts/
│   └── AuthContext.tsx      ✅ Atualizado para Supabase
├── services/
│   ├── supabaseNewsService.ts      ✅ CRUD notícias
│   └── supabaseProjectsService.ts  ✅ CRUD projetos
└── pages/
    └── admin/
        └── LoginPage.tsx    ✅ Atualizado
```

## 🎉 Pronto!

Após completar todos os passos, seu site estará totalmente integrado com Supabase!

## 📚 Documentação de Referência

- **SUPABASE_SETUP.md**: Configuração detalhada
- **SUPABASE_MIGRATION.md**: Guia de migração
- **SUPABASE_QUICK_START.md**: Início rápido
- **INTEGRACAO_SUPABASE_RESUMO.md**: Resumo técnico

## 🆘 Suporte

Em caso de problemas, consulte:
1. Seção Troubleshooting em `SUPABASE_SETUP.md`
2. Documentação oficial: https://supabase.com/docs
3. Verifique console do navegador para erros
4. Verifique logs do Supabase Dashboard




