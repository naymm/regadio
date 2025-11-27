-- TESTE DIRETO: Verificar se consegue ler o perfil
-- Execute cada query SEPARADAMENTE e me envie o resultado

-- Query 1: Ver o perfil SEM autenticação (como admin do banco)
SELECT * FROM public.profiles WHERE email = 'admin@regadio.co.ao';

-- Query 2: Ver todas as políticas ativas
SELECT schemaname, tablename, policyname, cmd, qual, with_check
FROM pg_policies 
WHERE tablename = 'profiles';

-- Query 3: Desabilitar RLS TEMPORARIAMENTE para teste
ALTER TABLE public.profiles DISABLE ROW LEVEL SECURITY;

-- Query 4: Agora tente fazer login novamente e depois volte aqui

-- Query 5: REABILITAR RLS (IMPORTANTE - execute depois do teste)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
