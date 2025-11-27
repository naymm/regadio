-- FIX TRIGGER handle_new_user
-- Este script recria a função e o trigger para garantir que novos usuários tenham perfil criado automaticamente.

-- 1. Remover trigger e função antigos para evitar conflitos
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();

-- 2. Criar a função com tratamento de erros e SECURITY DEFINER (roda com permissão total)
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'name', NEW.email),
    'viewer'::user_role -- Todo novo usuário começa como viewer por segurança
  )
  ON CONFLICT (id) DO NOTHING; -- Se já existir, não faz nada (evita erro)
  
  RETURN NEW;
EXCEPTION
  WHEN OTHERS THEN
    -- Logar erro se falhar (opcional, mas útil)
    RAISE WARNING 'Erro ao criar perfil para usuário %: %', NEW.id, SQLERRM;
    RETURN NEW; -- Não impede o cadastro do usuário mesmo se o perfil falhar
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 3. Recriar o trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- 4. Garantir permissões
GRANT EXECUTE ON FUNCTION public.handle_new_user() TO postgres, anon, authenticated, service_role;
