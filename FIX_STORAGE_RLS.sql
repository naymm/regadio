-- FIX STORAGE RLS PARA UPLOAD DE IMAGENS
-- Execute este script no SQL Editor do Supabase
-- Este script configura o Storage Bucket e políticas para permitir upload de imagens

-- ========================================
-- 1. CRIAR BUCKET (se não existir)
-- ========================================
-- IMPORTANTE: Execute este comando MANUALMENTE na interface do Supabase Storage
-- Vá para: Storage > New Bucket
-- Nome: news-images
-- Public: ✅ SIM (marcar como público)
-- 
-- E também crie:
-- Nome: project-images
-- Public: ✅ SIM (marcar como público)

-- ========================================
-- 2. REMOVER POLÍTICAS ANTIGAS DO STORAGE
-- ========================================
DROP POLICY IF EXISTS "Anyone can view news images" ON storage.objects;
DROP POLICY IF EXISTS "Admins can upload news images" ON storage.objects;
DROP POLICY IF EXISTS "Admins can update news images" ON storage.objects;
DROP POLICY IF EXISTS "Admins can delete news images" ON storage.objects;

DROP POLICY IF EXISTS "Anyone can view project images" ON storage.objects;
DROP POLICY IF EXISTS "Admins can upload project images" ON storage.objects;
DROP POLICY IF EXISTS "Admins can update project images" ON storage.objects;
DROP POLICY IF EXISTS "Admins can delete project images" ON storage.objects;

DROP POLICY IF EXISTS "Public can view images" ON storage.objects;
DROP POLICY IF EXISTS "Admins can manage images" ON storage.objects;

-- ========================================
-- 3. POLÍTICAS DE SELECT (visualização pública)
-- ========================================

-- Qualquer pessoa pode ver imagens de notícias
CREATE POLICY "Public can view news images"
ON storage.objects FOR SELECT
USING (bucket_id = 'news-images');

-- Qualquer pessoa pode ver imagens de projetos
CREATE POLICY "Public can view project images"
ON storage.objects FOR SELECT
USING (bucket_id = 'project-images');

-- ========================================
-- 4. POLÍTICAS DE INSERT (upload apenas para admins)
-- ========================================

-- Apenas admins podem fazer upload de imagens de notícias
CREATE POLICY "Admins can upload news images"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'news-images' AND
  EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  )
);

-- Apenas admins podem fazer upload de imagens de projetos
CREATE POLICY "Admins can upload project images"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'project-images' AND
  EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  )
);

-- ========================================
-- 5. POLÍTICAS DE UPDATE (atualizar apenas para admins)
-- ========================================

CREATE POLICY "Admins can update news images"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'news-images' AND
  EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  )
)
WITH CHECK (
  bucket_id = 'news-images' AND
  EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  )
);

CREATE POLICY "Admins can update project images"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'project-images' AND
  EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  )
)
WITH CHECK (
  bucket_id = 'project-images' AND
  EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  )
);

-- ========================================
-- 6. POLÍTICAS DE DELETE (deletar apenas para admins)
-- ========================================

CREATE POLICY "Admins can delete news images"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'news-images' AND
  EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  )
);

CREATE POLICY "Admins can delete project images"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'project-images' AND
  EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  )
);

-- ========================================
-- 7. VERIFICAR POLÍTICAS CRIADAS
-- ========================================
SELECT 
  policyname, 
  cmd,
  CASE 
    WHEN qual IS NOT NULL THEN 'USING: ' || qual::text
    ELSE ''
  END as using_clause,
  CASE 
    WHEN with_check IS NOT NULL THEN 'WITH CHECK: ' || with_check::text
    ELSE ''
  END as check_clause
FROM pg_policies 
WHERE schemaname = 'storage' AND tablename = 'objects'
ORDER BY policyname;

-- ========================================
-- 8. TESTAR (execute como admin)
-- ========================================
-- Verificar se você é admin
SELECT id, email, role FROM public.profiles WHERE id = auth.uid();
