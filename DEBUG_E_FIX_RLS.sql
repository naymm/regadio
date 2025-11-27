-- ========================================
-- DEBUG E FIX COMPLETO - RLS SEM PROFILES
-- ========================================
-- Execute este script COMPLETO para diagnosticar e corrigir

-- ========================================
-- PARTE 1: DIAGNÓSTICO
-- ========================================

-- Ver políticas atuais da tabela news
SELECT 
  policyname, 
  cmd,
  SUBSTRING(qual::text, 1, 80) as usando_condicao
FROM pg_policies 
WHERE tablename = 'news'
ORDER BY cmd, policyname;

-- Ver se RLS está ativo
SELECT tablename, rowsecurity as rls_ativo
FROM pg_tables 
WHERE schemaname = 'public' AND tablename = 'news';

-- Ver quantas notícias existem (como superusuário)
SELECT COUNT(*) as total_noticias FROM public.news;

-- ========================================
-- PARTE 2: LIMPAR E RECRIAR POLÍTICAS
-- ========================================

-- Remover TODAS as políticas antigas
DROP POLICY IF EXISTS "Anyone can view published news" ON public.news;
DROP POLICY IF EXISTS "Authenticated users can view published news" ON public.news;
DROP POLICY IF EXISTS "Admins can view all news" ON public.news;
DROP POLICY IF EXISTS "Admins can insert news" ON public.news;
DROP POLICY IF EXISTS "Admins can update news" ON public.news;
DROP POLICY IF EXISTS "Admins can delete news" ON public.news;
DROP POLICY IF EXISTS "Public can view published news" ON public.news;

-- ========================================
-- PARTE 3: CRIAR POLÍTICAS CORRETAS
-- ========================================

-- 1. Permitir que TODOS vejam notícias publicadas (sem autenticação)
CREATE POLICY "Public can view published news"
ON public.news 
FOR SELECT
USING (status = 'published');

-- 2. Permitir que o email específico veja TODAS as notícias
CREATE POLICY "Admin can view all news"
ON public.news 
FOR SELECT
USING (
  (auth.jwt() ->> 'email')::text = 'naymupoia@gmail.com'
);

-- 3. Permitir que o email específico crie notícias
CREATE POLICY "Admin can insert news"
ON public.news 
FOR INSERT
WITH CHECK (
  (auth.jwt() ->> 'email')::text = 'naymupoia@gmail.com'
);

-- 4. Permitir que o email específico atualize notícias
CREATE POLICY "Admin can update news"
ON public.news 
FOR UPDATE
USING (
  (auth.jwt() ->> 'email')::text = 'naymupoia@gmail.com'
)
WITH CHECK (
  (auth.jwt() ->> 'email')::text = 'naymupoia@gmail.com'
);

-- 5. Permitir que o email específico delete notícias
CREATE POLICY "Admin can delete news"
ON public.news 
FOR DELETE
USING (
  (auth.jwt() ->> 'email')::text = 'naymupoia@gmail.com'
);

-- ========================================
-- PARTE 4: GARANTIR QUE RLS ESTÁ ATIVO
-- ========================================
ALTER TABLE public.news ENABLE ROW LEVEL SECURITY;

-- ========================================
-- PARTE 5: VERIFICAÇÃO FINAL
-- ========================================

-- Ver políticas criadas
SELECT 
  policyname, 
  cmd
FROM pg_policies 
WHERE tablename = 'news'
ORDER BY cmd, policyname;

-- Deve mostrar 5 políticas:
-- Admin can delete news (DELETE)
-- Admin can insert news (INSERT)
-- Admin can view all news (SELECT)
-- Public can view published news (SELECT)
-- Admin can update news (UPDATE)

-- Ver se RLS está ativo (deve retornar TRUE)
SELECT tablename, rowsecurity as rls_ativo
FROM pg_tables 
WHERE schemaname = 'public' AND tablename = 'news';
