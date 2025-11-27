-- FIX ESPECÍFICO PARA O USUÁRIO naymupoia@gmail.com
-- O debug mostrou que você está tentando logar com este email, mas ele não tem perfil.

INSERT INTO public.profiles (id, email, name, role)
VALUES (
  'd6eb20d7-8080-4f71-ba6d-6564607beca9', -- ID pego do seu print de debug
  'naymupoia@gmail.com',
  'Naymmupoia',
  'admin'
)
ON CONFLICT (id) DO UPDATE 
SET role = 'admin', email = 'naymupoia@gmail.com';

-- Verificar se foi criado
SELECT * FROM public.profiles WHERE email = 'naymupoia@gmail.com';
