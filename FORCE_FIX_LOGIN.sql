-- FORCE FIX LOGIN
-- Execute este script COMPLETO no SQL Editor do Supabase

-- 1. Desabilitar RLS temporariamente para garantir que a inserção funcione
ALTER TABLE public.profiles DISABLE ROW LEVEL SECURITY;

-- 2. Garantir que o perfil do admin existe
INSERT INTO public.profiles (id, email, name, role)
SELECT 
  id, 
  email, 
  COALESCE(raw_user_meta_data->>'name', email), 
  'admin'
FROM auth.users 
WHERE email = 'admin@regadio.co.ao'
ON CONFLICT (id) DO UPDATE 
SET role = 'admin';

-- 3. Reabilitar RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- 4. Recriar políticas de segurança (RLS) corretas
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;

-- Política de Leitura: Cada um vê o seu, Admin vê todos
CREATE POLICY "Users can view own profile" ON public.profiles 
FOR SELECT USING (
  auth.uid() = id OR 
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Política de Inserção: Usuário autenticado pode criar seu próprio perfil
CREATE POLICY "Users can insert own profile" ON public.profiles 
FOR INSERT WITH CHECK (auth.uid() = id);

-- Política de Atualização: Cada um edita o seu, Admin edita todos
CREATE POLICY "Users can update own profile" ON public.profiles 
FOR UPDATE USING (
  auth.uid() = id OR 
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);

-- 5. Verificar resultado
SELECT * FROM public.profiles WHERE email = 'admin@regadio.co.ao';
