# 🚀 Setup Rápido - Backend MySQL

## 1. Verificar MySQL

```bash
# macOS - Instalar MySQL
brew install mysql
brew services start mysql

# Linux
sudo apt-get install mysql-server
sudo systemctl start mysql
```

## 2. Criar Database

```bash
# Entrar no MySQL
mysql -u root -p
# (Se não tiver senha, apenas pressione Enter)

# OU, executar o schema diretamente:
mysql -u root -p < mysql_schema.sql
```

Se preferir criar manualmente:
```sql
CREATE DATABASE regadio_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE regadio_db;
-- Depois execute o conteúdo de mysql_schema.sql
```

## 3. Configurar Backend

O .env já foi criado com configurações padrão. Se precisar ajustar:

```bash
# server/.env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=        # Sua senha MySQL (deixe vazio se não tiver)
DB_NAME=regadio_db
```

## 4. Iniciar Backend

```bash
cd server
npm run dev
```

Deve ver:
```
✅ MySQL connected successfully
🚀 Server running on port 3000
📍 API available at http://localhost:3000
```

## 5. Testar Login

Credenciais padrão:
- **Email:** `naymupoia@gmail.com`
- **Senha:** `admin123`

Teste:
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"naymupoia@gmail.com","password":"admin123"}'
```

✅ Se retornar um `token`, está funcionando!

## 6. Mudar Senha (Recomendado)

```bash
# Gerar novo hash
cd server
node -e "import('bcryptjs').then(b => b.default.hash('sua_nova_senha', 10).then(console.log))"
```

Copie o hash e execute no MySQL:
```sql
UPDATE users SET password_hash = 'COLE_O_HASH_AQUI' WHERE email = 'naymupoia@gmail.com';
```

## Próximos Passos

Agora que o backend está rodando, vamos atualizar o frontend para usar a nova API!
