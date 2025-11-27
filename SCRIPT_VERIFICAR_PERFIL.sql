-- Script para verificar e corrigir problemas de perfil
-- Execute no SQL Editor do Supabase

-- 1. Verificar se a tabela profiles existe
SELECT 
  'Tabela profiles existe' as status,
  COUNT(*) as count
FROM information_schema.tables 
WHERE table_schema = 'public' AND table_name = 'profiles';

-- 2. Verificar usuários sem perfil
SELECT 
  u.id,
  u.email,
  u.created_at,
  CASE WHEN p.id IS NULL THEN 'SEM PERFIL' ELSE 'COM PERFIL' END as status
FROM auth.users u
LEFT JOIN public.profiles p ON u.id = p.id
ORDER BY u.created_at DESC;

-- 3. Criar perfis para usuários que não têm
-- ATENÇÃO: Execute apenas se necessário!
INSERT INTO public.profiles (id, email, name, role)
SELECT 
  u.id,
  u.email,
  COALESCE(u.raw_user_meta_data->>'name', u.email) as name,
  'viewer'::user_role as role
FROM auth.users u
WHERE u.id NOT IN (SELECT id FROM public.profiles)
ON CONFLICT (id) DO NOTHING;

-- 4. Verificar políticas RLS
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual
FROM pg_policies 
WHERE tablename = 'profiles';

-- 5. Verificar trigger
SELECT 
  tgname as trigger_name,
  tgtype,
  tgenabled,
  tgisinternal
FROM pg_trigger 
WHERE tgname = 'on_auth_user_created';

-- 6. Listar todos os perfis
SELECT id, email, name, role, created_at 
FROM public.profiles 
ORDER BY created_at DESC;

-- 7. Verificar se um usuário específico tem perfil
-- Substitua 'EMAIL_AQUI' pelo email do usuário
SELECT 
  u.id as user_id,
  u.email,
  p.id as profile_id,
  p.name,
  p.role
FROM auth.users u
LEFT JOIN public.profiles p ON u.id = p.id
WHERE u.email = 'EMAIL_AQUI';


