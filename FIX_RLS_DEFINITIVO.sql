-- FIX DEFINITIVO DAS POLÍTICAS RLS
-- Execute este script COMPLETO no SQL Editor

-- 1. REMOVER TODAS AS POLÍTICAS ANTIGAS
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;

-- 2. CRIAR POLÍTICAS CORRETAS - SELECT
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT
  USING (auth.uid() = id);

-- 3. CRIAR POLÍTICAS CORRETAS - INSERT
CREATE POLICY "Users can insert own profile" ON public.profiles
  FOR INSERT
  WITH CHECK (auth.uid() = id);

-- 4. CRIAR POLÍTICAS CORRETAS - UPDATE
CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- 5. POLÍTICA ADMIN - SELECT
CREATE POLICY "Admins can view all profiles" ON public.profiles
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- 6. TESTAR SE FUNCIONA - Execute como o usuário logado
-- Esse SELECT deve retornar seu perfil
SELECT * FROM public.profiles WHERE id = auth.uid();

-- 7. VERIFICAR POLÍTICAS CRIADAS
SELECT policyname, cmd 
FROM pg_policies 
WHERE tablename = 'profiles'
ORDER BY policyname;
