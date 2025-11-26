-- SOLUÇÃO RÁPIDA PARA PROBLEMA DE LOGIN
-- Execute este script no SQL Editor do Supabase

-- 1. Verificar se o perfil existe para o usuário admin
SELECT 
  u.id as user_id,
  u.email,
  u.confirmed_at,
  p.id as profile_id,
  p.role
FROM auth.users u
LEFT JOIN public.profiles p ON u.id = p.id
WHERE u.email = 'admin@regadio.co.ao';

-- 2. Se o perfil não existir (profile_id é NULL), criar:
INSERT INTO public.profiles (id, email, name, role)
SELECT 
  u.id,
  u.email,
  COALESCE(u.raw_user_meta_data->>'name', u.email) as name,
  'admin'::user_role as role
FROM auth.users u
WHERE u.email = 'admin@regadio.co.ao'
  AND u.id NOT IN (SELECT id FROM public.profiles)
ON CONFLICT (id) DO UPDATE SET role = 'admin';

-- 3. Corrigir políticas RLS para permitir que usuários criem seus próprios perfis
-- Remover políticas antigas
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;

-- Criar políticas corretas
CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Admins can view all profiles"
  ON public.profiles FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- 4. Verificar se tudo está correto
SELECT 
  'Perfis criados' as status,
  COUNT(*) as total
FROM public.profiles;

SELECT 
  'Políticas RLS' as status,
  COUNT(*) as total
FROM pg_policies 
WHERE tablename = 'profiles';

-- 5. Listar todos os perfis
SELECT id, email, name, role, created_at 
FROM public.profiles 
ORDER BY created_at DESC;

