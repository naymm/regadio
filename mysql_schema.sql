-- MySQL Schema Migration from Supabase
-- Execute este schema no seu MySQL

-- 1. Criar database (se necessário)
CREATE DATABASE IF NOT EXISTS regadio_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE regadio_db;

-- 2. Tabela de usuários (substitui auth.users e profiles)
CREATE TABLE users (
  id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  role ENUM('admin', 'editor', 'viewer') DEFAULT 'viewer',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  INDEX idx_email (email),
  INDEX idx_role (role)
) ENGINE=InnoDB;

-- 3. Tabela de notícias
CREATE TABLE news (
  id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
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
  created_by VARCHAR(36),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  INDEX idx_status (status),
  INDEX idx_date (date),
  INDEX idx_category (category),
  INDEX idx_created_at (created_at),
  FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL
) ENGINE=InnoDB;

-- 4. Tabela de projetos
CREATE TABLE projects (
  id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
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
  created_by VARCHAR(36),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  INDEX idx_status (status),
  INDEX idx_category (category),
  INDEX idx_year (year),
  INDEX idx_created_at (created_at),
  FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL
) ENGINE=InnoDB;

-- 5. Tabela de imagens dos projetos
CREATE TABLE project_images (
  id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
  project_id VARCHAR(36) NOT NULL,
  image_url VARCHAR(1000) NOT NULL,
  order_index INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  INDEX idx_project_id (project_id),
  INDEX idx_order (order_index),
  FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- 6. Inserir usuário admin inicial
-- Senha padrão: "admin123" (MUDE IMEDIATAMENTE após primeiro login!)
-- Hash gerado com bcrypt rounds=10
INSERT INTO users (email, password_hash, name, role) VALUES
  ('naymupoia@gmail.com', '$2a$10$YQiQvDCixxiXGLzLh3ufb.yvE.ztpJC7wNH7YNZqh.6XUXO5sNrGS', 'Naymmupoia', 'admin');

-- Para gerar novo hash de senha, use:
-- cd server && npm run dev
-- Em outro terminal: node -e "import bcrypt from 'bcryptjs'; bcrypt.hash('sua_senha', 10).then(console.log)"

