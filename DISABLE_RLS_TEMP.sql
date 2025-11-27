-- SOLUÇÃO FINAL: Desabilitar RLS temporariamente
-- Se nada funcionar, use isto como solução temporária até resolvermos o RLS

-- 1. Desabilitar RLS (TEMPORÁRIO!)
ALTER TABLE public.profiles DISABLE ROW LEVEL SECURITY;

-- 2. Verificar se existe o perfil
SELECT * FROM public.profiles WHERE email = 'admin@regadio.co.ao';

-- OBS: Com RLS desabilitado, o login DEVE funcionar!
-- Depois que funcionar, podemos diagnosticar e consertar as políticas RLS corretamente.

-- Para REABILITAR RLS depois (quando consertar as políticas):
-- ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
