# Guia de Integração com Supabase

## 📋 Visão Geral

Este guia detalha a integração completa do site REGADIO com Supabase, incluindo banco de dados, autenticação, storage e APIs.

## 🚀 Passo 1: Configuração Inicial do Supabase

### 1.1 Criar Projeto no Supabase

1. Acesse [supabase.com](https://supabase.com)
2. Faça login ou crie uma conta
3. Clique em "New Project"
4. Preencha:
   - **Name**: `regadio-african-cities`
   - **Database Password**: (guarde esta senha!)
   - **Region**: Escolha a região mais próxima
5. Aguarde a criação do projeto (~2 minutos)

### 1.2 Obter Credenciais

1. No dashboard do Supabase, vá em **Settings** > **API**
2. Copie as seguintes informações:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon/public key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`
   - **service_role key**: (mantenha secreto, apenas backend)

## 🗄️ Passo 2: Estrutura do Banco de Dados

### 2.1 Executar Scripts SQL

No Supabase Dashboard, vá em **SQL Editor** e execute os scripts na ordem:

#### Script 1: Extensões e Tipos

```sql
-- Habilitar extensões necessárias
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Tipo ENUM para status de publicação
CREATE TYPE publication_status AS ENUM ('draft', 'published', 'archived');

-- Tipo ENUM para roles de usuário
CREATE TYPE user_role AS ENUM ('admin', 'editor', 'viewer');
```

#### Script 2: Tabela de Perfis de Usuário

```sql
-- Tabela de perfis (extende auth.users)
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  role user_role DEFAULT 'viewer' NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL
);

-- RLS (Row Level Security)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Políticas RLS
CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Admins can view all profiles"
  ON public.profiles FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- Trigger para atualizar updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc', NOW());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
```

#### Script 3: Tabela de Notícias

```sql
-- Tabela de notícias
CREATE TABLE public.news (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  content TEXT NOT NULL,
  image_url TEXT,
  category TEXT,
  author TEXT,
  date TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}',
  status publication_status DEFAULT 'draft' NOT NULL,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL
);

-- Índices para performance
CREATE INDEX idx_news_slug ON public.news(slug);
CREATE INDEX idx_news_status ON public.news(status);
CREATE INDEX idx_news_created_at ON public.news(created_at DESC);

-- RLS
ALTER TABLE public.news ENABLE ROW LEVEL SECURITY;

-- Políticas: Todos podem ver notícias publicadas
CREATE POLICY "Anyone can view published news"
  ON public.news FOR SELECT
  USING (status = 'published');

-- Políticas: Autores podem ver suas próprias notícias
CREATE POLICY "Authors can view own news"
  ON public.news FOR SELECT
  USING (created_by = auth.uid());

-- Políticas: Admins e Editors podem ver todas
CREATE POLICY "Admins and editors can view all news"
  ON public.news FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role IN ('admin', 'editor')
    )
  );

-- Políticas: Admins e Editors podem criar
CREATE POLICY "Admins and editors can create news"
  ON public.news FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role IN ('admin', 'editor')
    )
  );

-- Políticas: Admins e Editors podem atualizar
CREATE POLICY "Admins and editors can update news"
  ON public.news FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role IN ('admin', 'editor')
    )
  );

-- Políticas: Apenas Admins podem deletar
CREATE POLICY "Only admins can delete news"
  ON public.news FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Trigger para updated_at
CREATE TRIGGER update_news_updated_at
  BEFORE UPDATE ON public.news
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
```

#### Script 4: Tabela de Projetos

```sql
-- Tabela de projetos
CREATE TABLE public.projects (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT NOT NULL,
  location TEXT,
  project_status TEXT,
  year TEXT,
  scope TEXT,
  image_url TEXT,
  status publication_status DEFAULT 'draft' NOT NULL,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL
);

-- Tabela de imagens de projetos (galeria)
CREATE TABLE public.project_images (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE NOT NULL,
  image_url TEXT NOT NULL,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL
);

-- Índices
CREATE INDEX idx_projects_slug ON public.projects(slug);
CREATE INDEX idx_projects_status ON public.projects(status);
CREATE INDEX idx_project_images_project ON public.project_images(project_id);

-- RLS para projetos
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- Políticas: Todos podem ver projetos publicados
CREATE POLICY "Anyone can view published projects"
  ON public.projects FOR SELECT
  USING (status = 'published');

-- Políticas: Autores podem ver seus projetos
CREATE POLICY "Authors can view own projects"
  ON public.projects FOR SELECT
  USING (created_by = auth.uid());

-- Políticas: Admins e Editors podem ver todos
CREATE POLICY "Admins and editors can view all projects"
  ON public.projects FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role IN ('admin', 'editor')
    )
  );

-- Políticas: Admins e Editors podem criar
CREATE POLICY "Admins and editors can create projects"
  ON public.projects FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role IN ('admin', 'editor')
    )
  );

-- Políticas: Admins e Editors podem atualizar
CREATE POLICY "Admins and editors can update projects"
  ON public.projects FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role IN ('admin', 'editor')
    )
  );

-- Políticas: Apenas Admins podem deletar
CREATE POLICY "Only admins can delete projects"
  ON public.projects FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- RLS para imagens de projetos
ALTER TABLE public.project_images ENABLE ROW LEVEL SECURITY;

-- Políticas: Mesmas regras dos projetos
CREATE POLICY "Same access as projects for images"
  ON public.project_images FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.projects
      WHERE id = project_id
    )
  );

-- Trigger para updated_at
CREATE TRIGGER update_projects_updated_at
  BEFORE UPDATE ON public.projects
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
```

#### Script 5: Função para Criar Perfil Automaticamente

```sql
-- Função para criar perfil quando usuário se registra
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'name', NEW.email),
    'viewer'::user_role
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger para executar função quando novo usuário é criado
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();
```

#### Script 6: Função para Gerar Slug

```sql
-- Função para gerar slug a partir do título
CREATE OR REPLACE FUNCTION generate_slug(title TEXT)
RETURNS TEXT AS $$
BEGIN
  RETURN lower(
    regexp_replace(
      regexp_replace(
        unaccent(title),
        '[^a-z0-9]+', '-', 'g'
      ),
      '^-|-$', '', 'g'
    )
  );
END;
$$ LANGUAGE plpgsql IMMUTABLE;
```

### 2.2 Configurar Storage para Imagens

1. No Supabase Dashboard, vá em **Storage**
2. Crie os seguintes buckets:

**Bucket: `news-images`**
- Public: ✅ Sim
- File size limit: 5MB
- Allowed MIME types: `image/jpeg,image/png,image/gif,image/webp`

**Bucket: `project-images`**
- Public: ✅ Sim
- File size limit: 5MB
- Allowed MIME types: `image/jpeg,image/png,image/gif,image/webp`

3. Configure políticas RLS para os buckets:

```sql
-- Política para news-images: Todos podem ler, apenas autenticados podem escrever
CREATE POLICY "Public read access for news images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'news-images');

CREATE POLICY "Authenticated users can upload news images"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'news-images' AND
    auth.role() = 'authenticated'
  );

CREATE POLICY "Users can update own news images"
  ON storage.objects FOR UPDATE
  USING (
    bucket_id = 'news-images' AND
    auth.role() = 'authenticated'
  );

CREATE POLICY "Users can delete own news images"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'news-images' AND
    auth.role() = 'authenticated'
  );

-- Política para project-images: Todos podem ler, apenas autenticados podem escrever
CREATE POLICY "Public read access for project images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'project-images');

CREATE POLICY "Authenticated users can upload project images"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'project-images' AND
    auth.role() = 'authenticated'
  );

CREATE POLICY "Users can update own project images"
  ON storage.objects FOR UPDATE
  USING (
    bucket_id = 'project-images' AND
    auth.role() = 'authenticated'
  );

CREATE POLICY "Users can delete own project images"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'project-images' AND
    auth.role() = 'authenticated'
  );
```

## 📦 Passo 3: Instalação de Dependências

No terminal do projeto:

```bash
npm install @supabase/supabase-js
```

## ⚙️ Passo 4: Configuração do Cliente Supabase

### 4.1 Criar Arquivo de Configuração

Criar arquivo `.env.local` na raiz do projeto:

```env
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**⚠️ IMPORTANTE**: Adicione `.env.local` ao `.gitignore`!

### 4.2 Criar Cliente Supabase

O arquivo será criado automaticamente no próximo passo.

## 🔐 Passo 5: Criar Usuário Admin Inicial

Após executar os scripts SQL, crie o primeiro usuário admin:

1. No Supabase Dashboard, vá em **Authentication** > **Users**
2. Clique em "Add User" > "Create new user"
3. Preencha:
   - Email: `admin@regadio.co.ao`
   - Password: (defina uma senha forte)
   - Auto Confirm User: ✅ Sim
4. Após criar, execute este SQL para definir como admin:

```sql
UPDATE public.profiles
SET role = 'admin'
WHERE email = 'admin@regadio.co.ao';
```

## 📝 Próximos Passos

Após completar os passos acima, execute os scripts de migração do código que serão fornecidos nos próximos arquivos.

## 🔍 Verificação

Para verificar se tudo está configurado corretamente:

1. ✅ Tabelas criadas (profiles, news, projects, project_images)
2. ✅ RLS habilitado em todas as tabelas
3. ✅ Storage buckets criados
4. ✅ Políticas de storage configuradas
5. ✅ Usuário admin criado
6. ✅ Variáveis de ambiente configuradas

## 📚 Recursos Adicionais

- [Documentação Supabase](https://supabase.com/docs)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)
- [Storage](https://supabase.com/docs/guides/storage)

