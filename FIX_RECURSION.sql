-- FIX TIMEOUT / RECURSÃO INFINITA
-- O erro "Timeout loading profile" sugere que a política RLS está entrando em loop infinito.
-- Isso acontece quando a política de "Admin" tenta ler a própria tabela de perfis para saber se é admin.

-- 1. Remover a política recursiva problemática
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;

-- 2. Manter APENAS a política simples de "ver o próprio perfil"
-- Isso é suficiente para o login funcionar.
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

-- 3. Se precisar que admins vejam outros perfis, faremos de forma segura depois
-- Por enquanto, vamos destravar o login.
