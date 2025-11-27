# 🌐 Setup MySQL Remoto - PlanetScale ou Railway

## Opção 1: PlanetScale (Recomendado) ⭐

### Vantagens
- ✅ Free tier generoso (5GB)
- ✅ Muito rápido (edge network)
- ✅ Backups automáticos
- ✅ Interface web para executar SQL
- ✅ Sem manutenção de servidor

### Passo a Passo

#### 1. Criar Conta e Database

1. Acesse: https://planetscale.com
2. Crie uma conta (pode usar GitHub)
3. Clique em **"Create a new database"**
4. Nome: `regadio-db`
5. Região: Escolha a mais próxima (ex: `AWS eu-west-1` para Europa)
6. Clique em **"Create database"**

#### 2. Executar Schema SQL

1. No dashboard do PlanetScale, clique na sua database
2. Vá para **"Console"**
3. Copie e cole o conteúdo de `mysql_schema.sql`
4. Clique em **"Execute"**

> **Nota:** PlanetScale usa **MySQL 8.0** e não suporta `DEFAULT (UUID())`. Você vai ver esse erro. Veja a solução abaixo.

#### 3. Schema Compatível com PlanetScale

Use este schema atualizado (já preparado para PlanetScale):

```sql
-- Criar database
CREATE DATABASE IF NOT EXISTS regadio_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE regadio_db;

-- Tabela de usuários
CREATE TABLE users (
  id CHAR(36) PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  role ENUM('admin', 'editor', 'viewer') DEFAULT 'viewer',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  INDEX idx_email (email),
  INDEX idx_role (role)
) ENGINE=InnoDB;

-- Tabela de notícias
CREATE TABLE news (
  id CHAR(36) PRIMARY KEY,
  slug VARCHAR(255) NOT NULL UNIQUE,
  title VARCHAR(500) NOT NULL,
  description TEXT,
  content LONGTEXT NOT NULL,
  image_url VARCHAR(1000),
  category VARCHAR(100),
  author VARCHAR(255),
  date VARCHAR(50),
  tags JSON,
  status ENUM('draft', 'published', 'archived') DEFAULT 'draft',
  created_by CHAR(36),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  INDEX idx_status (status),
  INDEX idx_date (date),
  INDEX idx_category (category),
  INDEX idx_created_at (created_at),
  FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL
) ENGINE=InnoDB;

-- Tabela de projetos
CREATE TABLE projects (
  id CHAR(36) PRIMARY KEY,
  slug VARCHAR(255) NOT NULL UNIQUE,
  title VARCHAR(500) NOT NULL,
  category VARCHAR(100) NOT NULL,
  description TEXT,
  location VARCHAR(255),
  project_status VARCHAR(100),
  year VARCHAR(10),
  scope TEXT,
  image_url VARCHAR(1000),
  status ENUM('draft', 'published', 'archived') DEFAULT 'draft',
  created_by CHAR(36),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  INDEX idx_status (status),
  INDEX idx_category (category),
  INDEX idx_year (year),
  INDEX idx_created_at (created_at),
  FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL
) ENGINE=InnoDB;

-- Tabela de imagens dos projetos
CREATE TABLE project_images (
  id CHAR(36) PRIMARY KEY,
  project_id CHAR(36) NOT NULL,
  image_url VARCHAR(1000) NOT NULL,
  order_index INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  INDEX idx_project_id (project_id),
  INDEX idx_order (order_index),
  FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- Inserir usuário admin
-- IMPORTANTE: Gere um UUID manualmente
INSERT INTO users (id, email, password_hash, name, role) VALUES
  (UUID(), 'naymupoia@gmail.com', '$2a$10$YQiQvDCixxiXGLzLh3ufb.yvE.ztpJC7wNH7YNZqh.6XUXO5sNrGS', 'Naymmupoia', 'admin');
```

#### 4. Obter Credenciais de Conexão

1. No PlanetScale, vá para **"Settings" → "Passwords"**
2. Clique em **"New password"**
3. Nome: `backend-api`
4. Selecione branch: `main`
5. Clique em **"Create password"**
6. **⚠️ COPIE AS CREDENCIAIS AGORA** (não vai mostrar de novo!):
   - Host
   - Username
   - Password

#### 5. Configurar Backend

Edite `server/.env`:

```env
DB_HOST=seu-host.aws.connect.psdb.cloud
DB_PORT=3306
DB_NAME=regadio_db
DB_USER=seu-username
DB_PASSWORD=sua-senha
DB_SSL=true
```

---

## Opção 2: Railway

### Vantagens
- ✅ $5/mês gratuito (CREDIT)
- ✅ Pode hospedar backend + MySQL juntos
- ✅ Deploy automático

### Passo a Passo

#### 1. Criar Conta

1. Acesse: https://railway.app
2. Login com GitHub

#### 2. Criar Projeto

1. Clique em **"New Project"**
2. Escolha **"Provision MySQL"**
3. Aguarde a criação

#### 3. Obter Credenciais

1. Clique no serviço MySQL criado
2. Vá para **"Variables"**
3. Copie as variáveis:
   - `MYSQL_HOST`
   - `MYSQL_PORT`
   - `MYSQL_USER`
   - `MYSQL_PASSWORD`
   - `MYSQL_DATABASE`

#### 4. Executar Schema

1. Clique em **"Data"** no MySQL service
2. Cole o schema SQL (use a versão do PlanetScale acima)
3. Execute

#### 5. Configurar Backend

```env
DB_HOST=containers-us-west-xxx.railway.app
DB_PORT=3306
DB_NAME=railway
DB_USER=root
DB_PASSWORD=sua-senha
DB_SSL=true
```

---

## Testar Conexão

1. Inicie o backend:
```bash
cd server
npm run dev
```

2. Deve ver:
```
✅ MySQL connected successfully
📍 Host: seu-host-remoto
🚀 Server running on port 3000
```

---

## Próximos Passos

Depois de configurar o MySQL remoto:

1. ✅ O schema está criado
2. ✅ Usuário admin existe
3. 🚀 Backend conecta ao MySQL remoto
4. ⏭️ Pronto para migrar as pages do frontend!

Deseja que eu continue atualizando os 11 arquivos restantes?
