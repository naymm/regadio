-- ========================================
-- RLS SEM TABELA PROFILES - APENAS AUTH PADRÃO
-- ========================================
-- Este script configura RLS usando APENAS autenticação padrão do Supabase
-- sem depender da tabela profiles

-- ========================================
-- CONFIGURAÇÃO: DEFINA SEUS EMAILS DE ADMIN AQUI
-- ========================================
-- Adicione os emails dos administradores nesta lista
-- Substitua 'naymupoia@gmail.com' pelo seu email ou adicione mais emails

-- ========================================
-- 1. NEWS TABLE - REMOVER TODAS AS POLÍTICAS ANTIGAS
-- ========================================
DROP POLICY IF EXISTS "Anyone can view published news" ON public.news;
DROP POLICY IF EXISTS "Authenticated users can view published news" ON public.news;
DROP POLICY IF EXISTS "Admins can view all news" ON public.news;
DROP POLICY IF EXISTS "Admins can insert news" ON public.news;
DROP POLICY IF EXISTS "Admins can update news" ON public.news;
DROP POLICY IF EXISTS "Admins can delete news" ON public.news;
DROP POLICY IF EXISTS "Public can view published news" ON public.news;

-- ========================================
-- 2. NEWS TABLE - POLÍTICAS DE SELECT (visualização)
-- ========================================

-- Permitir que qualquer pessoa veja notícias publicadas
CREATE POLICY "Public can view published news"
ON public.news FOR SELECT
USING (status = 'published');

-- Usuários autenticados específicos podem ver TODAS as notícias
-- IMPORTANTE: Adicione seu email aqui!
CREATE POLICY "Admins can view all news"
ON public.news FOR SELECT
USING (
  auth.email() IN (
    'naymupoia@gmail.com'
    -- Adicione mais emails de admin aqui, separados por vírgula:
    -- ,'outro-admin@gmail.com',
    -- ,'terceiro-admin@gmail.com'
  )
);

-- ========================================
-- 3. NEWS TABLE - POLÍTICAS DE INSERT (criar)
-- ========================================

-- Apenas emails específicos podem criar notícias
CREATE POLICY "Admins can insert news"
ON public.news FOR INSERT
WITH CHECK (
  auth.email() IN (
    'naymupoia@gmail.com'
    -- Adicione mais emails de admin aqui, separados por vírgula:
    -- ,'outro-admin@gmail.com'
  )
);

-- ========================================
-- 4. NEWS TABLE - POLÍTICAS DE UPDATE (atualizar)
-- ========================================

-- Apenas emails específicos podem atualizar notícias
CREATE POLICY "Admins can update news"
ON public.news FOR UPDATE
USING (
  auth.email() IN (
    'naymupoia@gmail.com'
    -- Adicione mais emails de admin aqui
  )
)
WITH CHECK (
  auth.email() IN (
    'naymupoia@gmail.com'
    -- Adicione mais emails de admin aqui
  )
);

-- ========================================
-- 5. NEWS TABLE - POLÍTICAS DE DELETE (deletar)
-- ========================================

-- Apenas emails específicos podem deletar notícias
CREATE POLICY "Admins can delete news"
ON public.news FOR DELETE
USING (
  auth.email() IN (
    'naymupoia@gmail.com'
    -- Adicione mais emails de admin aqui
  )
);

-- ========================================
-- 6. PROJECTS TABLE - REMOVER POLÍTICAS ANTIGAS (se existir)
-- ========================================
DROP POLICY IF EXISTS "Anyone can view published projects" ON public.projects;
DROP POLICY IF EXISTS "Authenticated users can view published projects" ON public.projects;
DROP POLICY IF EXISTS "Admins can view all projects" ON public.projects;
DROP POLICY IF EXISTS "Admins can insert projects" ON public.projects;
DROP POLICY IF EXISTS "Admins can update projects" ON public.projects;
DROP POLICY IF EXISTS "Admins can delete projects" ON public.projects;
DROP POLICY IF EXISTS "Public can view published projects" ON public.projects;

-- ========================================
-- 7. PROJECTS TABLE - POLÍTICAS (se existir)
-- ========================================

-- Qualquer pessoa pode ver projetos publicados
CREATE POLICY "Public can view published projects"
ON public.projects FOR SELECT
USING (status = 'published');

-- Admins podem ver TODOS os projetos
CREATE POLICY "Admins can view all projects"
ON public.projects FOR SELECT
USING (
  auth.email() IN ('naymupoia@gmail.com')
);

-- Apenas admins podem criar projetos
CREATE POLICY "Admins can insert projects"
ON public.projects FOR INSERT
WITH CHECK (
  auth.email() IN ('naymupoia@gmail.com')
);

-- Apenas admins podem atualizar projetos
CREATE POLICY "Admins can update projects"
ON public.projects FOR UPDATE
USING (
  auth.email() IN ('naymupoia@gmail.com')
)
WITH CHECK (
  auth.email() IN ('naymupoia@gmail.com')
);

-- Apenas admins podem deletar projetos
CREATE POLICY "Admins can delete projects"
ON public.projects FOR DELETE
USING (
  auth.email() IN ('naymupoia@gmail.com')
);

-- ========================================
-- 8. STORAGE - POLÍTICAS PARA IMAGENS
-- ========================================

-- Remover políticas antigas do Storage
DROP POLICY IF EXISTS "Public can view news images" ON storage.objects;
DROP POLICY IF EXISTS "Admins can upload news images" ON storage.objects;
DROP POLICY IF EXISTS "Admins can update news images" ON storage.objects;
DROP POLICY IF EXISTS "Admins can delete news images" ON storage.objects;
DROP POLICY IF EXISTS "Public can view project images" ON storage.objects;
DROP POLICY IF EXISTS "Admins can upload project images" ON storage.objects;
DROP POLICY IF EXISTS "Admins can update project images" ON storage.objects;
DROP POLICY IF EXISTS "Admins can delete project images" ON storage.objects;

-- Qualquer pessoa pode visualizar imagens
CREATE POLICY "Public can view images"
ON storage.objects FOR SELECT
USING (
  bucket_id IN ('news-images', 'project-images')
);

-- Apenas admins podem fazer upload de imagens
CREATE POLICY "Admins can upload images"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id IN ('news-images', 'project-images') AND
  auth.email() IN ('naymupoia@gmail.com')
);

-- Apenas admins podem atualizar imagens
CREATE POLICY "Admins can update images"
ON storage.objects FOR UPDATE
USING (
  bucket_id IN ('news-images', 'project-images') AND
  auth.email() IN ('naymupoia@gmail.com')
)
WITH CHECK (
  bucket_id IN ('news-images', 'project-images') AND
  auth.email() IN ('naymupoia@gmail.com')
);

-- Apenas admins podem deletar imagens
CREATE POLICY "Admins can delete images"
ON storage.objects FOR DELETE
USING (
  bucket_id IN ('news-images', 'project-images') AND
  auth.email() IN ('naymupoia@gmail.com')
);

-- ========================================
-- 9. GARANTIR QUE RLS ESTÁ ATIVADO
-- ========================================
ALTER TABLE public.news ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- ========================================
-- 10. VERIFICAÇÕES
-- ========================================

-- Ver se RLS está ativo
SELECT 
  tablename, 
  rowsecurity as rls_enabled
FROM pg_tables 
WHERE schemaname = 'public' 
  AND tablename IN ('news', 'projects');

-- Ver políticas criadas para news
SELECT 
  policyname, 
  cmd,
  SUBSTRING(qual::text, 1, 50) as condition
FROM pg_policies 
WHERE tablename = 'news'
ORDER BY cmd, policyname;

-- Ver políticas do Storage
SELECT 
  policyname, 
  cmd
FROM pg_policies 
WHERE schemaname = 'storage' 
  AND tablename = 'objects'
ORDER BY policyname;

-- ========================================
-- 11. TESTAR (execute como usuário autenticado)
-- ========================================

-- Ver seu email atual
SELECT auth.email() as seu_email;

-- Ver se consegue ler notícias
SELECT id, title, status FROM public.news LIMIT 5;

-- Ver quantas notícias existem
SELECT COUNT(*) as total_news FROM public.news;
