# 🐊 Setup MySQL na HostGator

Para usar o banco de dados da HostGator, você precisa de 3 passos principais no cPanel:

## 1. Liberar Acesso Remoto (Remote MySQL) ⚠️ **CRÍTICO**

Por padrão, a HostGator bloqueia conexões externas. Você precisa liberar:

1. Acesse o **cPanel** da HostGator.
2. Procure por **"MySQL Remoto"** (ou "Remote MySQL").
3. Em **"Adicionar Host de Acesso"** (Add Access Host):
   - Se você sabe seu IP fixo, coloque ele.
   - Para testar/desenvolvimento (ou se seu IP muda), coloque: `%` (isso libera para qualquer IP - use com cuidado).
4. Clique em **"Adicionar Host"**.

## 2. Criar Banco de Dados e Usuário

1. No cPanel, vá em **"Bancos de Dados MySQL"**.
2. **Criar Novo Banco de Dados**:
   - Nome: `regadio` (o nome final será algo como `seuusuario_regadio`).
   - Clique em "Criar Banco de Dados".
3. **Criar Novo Usuário**:
   - Usuário: `admin` (o nome final será `seuusuario_admin`).
   - Senha: Crie uma senha forte e **ANOTE**.
   - Clique em "Criar Usuário".
4. **Adicionar Usuário ao Banco de Dados**:
   - Selecione o usuário e o banco que acabou de criar.
   - Clique em "Adicionar".
   - Marque a opção **"TODOS OS PRIVILÉGIOS"** (All Privileges).
   - Clique em "Fazer Alterações".

## 3. Configurar o Backend

Edite o arquivo `server/.env` com os dados da HostGator:

```env
# HostGator Config
DB_HOST=seudominio.com.br  # Ou o IP do servidor da HostGator
DB_PORT=3306
DB_NAME=usuario_regadio    # Ex: naymm_regadio (tem o prefixo do cPanel!)
DB_USER=usuario_admin      # Ex: naymm_admin (tem o prefixo do cPanel!)
DB_PASSWORD=sua_senha_forte
DB_SSL=false               # HostGator geralmente não exige SSL para conexão direta
```

## 4. Importar as Tabelas

Como você não tem acesso direto ao terminal do servidor para rodar o script, use o **phpMyAdmin**:

1. No cPanel, abra o **phpMyAdmin**.
2. Clique no banco de dados que você criou (`usuario_regadio`).
3. Vá na aba **"Importar"** ou **"SQL"**.
4. Se for em "SQL", copie e cole o conteúdo do arquivo `mysql_schema.sql` e execute.
   - **Nota:** Se der erro no `DEFAULT (UUID())`, substitua o schema pelo compatível abaixo.

### Schema Compatível (MySQL 5.7 / MariaDB antigo)

Se a HostGator usar uma versão mais antiga do MySQL/MariaDB que não suporta `DEFAULT (UUID())`, use este SQL para criar as tabelas:

```sql
-- Execute no phpMyAdmin

CREATE TABLE users (
  id CHAR(36) PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  role ENUM('admin', 'editor', 'viewer') DEFAULT 'viewer',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

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
  FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL
);

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
  FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL
);

CREATE TABLE project_images (
  id CHAR(36) PRIMARY KEY,
  project_id CHAR(36) NOT NULL,
  image_url VARCHAR(1000) NOT NULL,
  order_index INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
);

-- Inserir Admin (UUID gerado manualmente)
INSERT INTO users (id, email, password_hash, name, role) VALUES
  ('d6eb20d7-8080-4f71-ba6d-6564607beca9', 'naymupoia@gmail.com', '$2a$10$YQiQvDCixxiXGLzLh3ufb.yvE.ztpJC7wNH7YNZqh.6XUXO5sNrGS', 'Naymmupoia', 'admin');
```
