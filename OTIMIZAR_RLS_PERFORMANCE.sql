-- ========================================
-- OTIMIZAÇÃO DE PERFORMANCE - RLS POLICIES
-- ========================================
-- Este script otimiza as políticas RLS para melhor performance

-- ========================================
-- PARTE 1: REMOVER POLÍTICAS LENTAS
-- ========================================
DROP POLICY IF EXISTS "Admin can view all news" ON public.news;
DROP POLICY IF EXISTS "Admin can insert news" ON public.news;
DROP POLICY IF EXISTS "Admin can update news" ON public.news;
DROP POLICY IF EXISTS "Admin can delete news" ON public.news;
DROP POLICY IF EXISTS "Public can view published news" ON public.news;

-- ========================================
-- PARTE 2: CRIAR POLÍTICAS OTIMIZADAS
-- ========================================

-- Estratégia: Usar auth.uid() + lista de UUIDs conhecidos
-- É MUITO mais rápido que comparar emails!

-- 1. Público pode ver notícias publicadas (sem auth, super rápido)
CREATE POLICY "Public can view published news"
ON public.news 
FOR SELECT
USING (status = 'published');

-- 2. Admin pode ver TODAS as notícias
-- IMPORTANTE: Substitua o UUID abaixo pelo seu!
-- Para pegar seu UUID, execute: SELECT auth.uid();
CREATE POLICY "Admin can view all news"
ON public.news 
FOR SELECT
USING (
  auth.uid() = 'd6eb20d7-8080-4f71-ba6d-6564607beca9'::uuid
  -- Para adicionar mais admins, use OR:
  -- OR auth.uid() = 'outro-uuid-aqui'::uuid
);

-- 3. Admin pode criar notícias
CREATE POLICY "Admin can insert news"
ON public.news 
FOR INSERT
WITH CHECK (
  auth.uid() = 'd6eb20d7-8080-4f71-ba6d-6564607beca9'::uuid
);

-- 4. Admin pode atualizar notícias
CREATE POLICY "Admin can update news"
ON public.news 
FOR UPDATE
USING (
  auth.uid() = 'd6eb20d7-8080-4f71-ba6d-6564607beca9'::uuid
)
WITH CHECK (
  auth.uid() = 'd6eb20d7-8080-4f71-ba6d-6564607beca9'::uuid
);

-- 5. Admin pode deletar notícias
CREATE POLICY "Admin can delete news"
ON public.news 
FOR DELETE
USING (
  auth.uid() = 'd6eb20d7-8080-4f71-ba6d-6564607beca9'::uuid
);

-- ========================================
-- PARTE 3: ADICIONAR ÍNDICES PARA PERFORMANCE
-- ========================================

-- Índice para filtrar por status (usado frequentemente)
CREATE INDEX IF NOT EXISTS idx_news_status ON public.news(status);

-- Índice para ordenar por data
CREATE INDEX IF NOT EXISTS idx_news_date ON public.news(date DESC);

-- Índice para created_at (usado em ORDER BY)
CREATE INDEX IF NOT EXISTS idx_news_created_at ON public.news(created_at DESC);

-- ========================================
-- PARTE 4: APLICAR MESMO PARA PROJECTS
-- ========================================

-- Remover políticas antigas de projects
DROP POLICY IF EXISTS "Admin can view all projects" ON public.projects;
DROP POLICY IF EXISTS "Admin can insert projects" ON public.projects;
DROP POLICY IF EXISTS "Admin can update projects" ON public.projects;
DROP POLICY IF EXISTS "Admin can delete projects" ON public.projects;
DROP POLICY IF EXISTS "Public can view published projects" ON public.projects;

-- Criar políticas otimizadas para projects
CREATE POLICY "Public can view published projects"
ON public.projects 
FOR SELECT
USING (status = 'published');

CREATE POLICY "Admin can view all projects"
ON public.projects 
FOR SELECT
USING (auth.uid() = 'd6eb20d7-8080-4f71-ba6d-6564607beca9'::uuid);

CREATE POLICY "Admin can insert projects"
ON public.projects 
FOR INSERT
WITH CHECK (auth.uid() = 'd6eb20d7-8080-4f71-ba6d-6564607beca9'::uuid);

CREATE POLICY "Admin can update projects"
ON public.projects 
FOR UPDATE
USING (auth.uid() = 'd6eb20d7-8080-4f71-ba6d-6564607beca9'::uuid)
WITH CHECK (auth.uid() = 'd6eb20d7-8080-4f71-ba6d-6564607beca9'::uuid);

CREATE POLICY "Admin can delete projects"
ON public.projects 
FOR DELETE
USING (auth.uid() = 'd6eb20d7-8080-4f71-ba6d-6564607beca9'::uuid);

-- Índices para projects
CREATE INDEX IF NOT EXISTS idx_projects_status ON public.projects(status);
CREATE INDEX IF NOT EXISTS idx_projects_created_at ON public.projects(created_at DESC);

-- ========================================
-- PARTE 5: VERIFICAÇÃO
-- ========================================

-- Ver políticas criadas
SELECT tablename, policyname, cmd
FROM pg_policies 
WHERE tablename IN ('news', 'projects')
ORDER BY tablename, cmd, policyname;

-- Ver índices criados
SELECT 
  tablename, 
  indexname
FROM pg_indexes 
WHERE schemaname = 'public' 
  AND tablename IN ('news', 'projects')
ORDER BY tablename, indexname;
