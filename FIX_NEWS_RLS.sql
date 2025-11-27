-- FIX RLS POLICIES FOR NEWS AND PROJECTS TABLES
-- Execute este script COMPLETO no SQL Editor do Supabase
-- Este script configura políticas para permitir que admins gerenciem notícias e projetos

-- ========================================
-- 1. NEWS TABLE - REMOVER POLÍTICAS ANTIGAS
-- ========================================
DROP POLICY IF EXISTS "Anyone can view published news" ON public.news;
DROP POLICY IF EXISTS "Authenticated users can view published news" ON public.news;
DROP POLICY IF EXISTS "Admins can view all news" ON public.news;
DROP POLICY IF EXISTS "Admins can insert news" ON public.news;
DROP POLICY IF EXISTS "Admins can update news" ON public.news;
DROP POLICY IF EXISTS "Admins can delete news" ON public.news;

-- ========================================
-- 2. NEWS TABLE - POLÍTICAS DE SELECT
-- ========================================

-- Permite que qualquer pessoa (incluindo usuários não autenticados) veja notícias publicadas
CREATE POLICY "Anyone can view published news" ON public.news
  FOR SELECT
  USING (status = 'published');

-- Admins podem ver TODAS as notícias (incluindo drafts e archived)
CREATE POLICY "Admins can view all news" ON public.news
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- ========================================
-- 3. NEWS TABLE - POLÍTICAS DE INSERT
-- ========================================

-- Apenas admins podem criar notícias
CREATE POLICY "Admins can insert news" ON public.news
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- ========================================
-- 4. NEWS TABLE - POLÍTICAS DE UPDATE
-- ========================================

-- Apenas admins podem atualizar notícias
CREATE POLICY "Admins can update news" ON public.news
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- ========================================
-- 5. NEWS TABLE - POLÍTICAS DE DELETE
-- ========================================

-- Apenas admins podem deletar notícias
CREATE POLICY "Admins can delete news" ON public.news
  FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
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

-- ========================================
-- 7. PROJECTS TABLE - POLÍTICAS (se existir)
-- ========================================

-- Permite que qualquer pessoa veja projetos publicados
CREATE POLICY "Anyone can view published projects" ON public.projects
  FOR SELECT
  USING (status = 'published');

-- Admins podem ver TODOS os projetos
CREATE POLICY "Admins can view all projects" ON public.projects
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Apenas admins podem criar projetos
CREATE POLICY "Admins can insert projects" ON public.projects
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Apenas admins podem atualizar projetos
CREATE POLICY "Admins can update projects" ON public.projects
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Apenas admins podem deletar projetos
CREATE POLICY "Admins can delete projects" ON public.projects
  FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- ========================================
-- 8. VERIFICAR SE RLS ESTÁ HABILITADO
-- ========================================
-- Se retornar FALSE, você precisa habilitar RLS nas tabelas:
-- ALTER TABLE public.news ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename IN ('news', 'projects');

-- ========================================
-- 9. VERIFICAR POLÍTICAS CRIADAS
-- ========================================
SELECT tablename, policyname, cmd, qual, with_check
FROM pg_policies 
WHERE tablename IN ('news', 'projects')
ORDER BY tablename, cmd, policyname;

-- ========================================
-- 10. TESTAR AS POLÍTICAS (execute como admin)
-- ========================================
-- Teste 1: Ver se consegue selecionar notícias
SELECT COUNT(*) as total_news FROM public.news;

-- Teste 2: Ver seu perfil de admin
SELECT id, email, role FROM public.profiles WHERE id = auth.uid();

-- Teste 3: Tentar inserir uma notícia de teste (descomente para testar)
-- INSERT INTO public.news (slug, title, description, content, date, status, created_by)
-- VALUES ('test-article', 'Test Article', 'Test description', 'Test content', NOW(), 'draft', auth.uid());
