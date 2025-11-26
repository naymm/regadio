# Painel de Administração - REGADIO

## 📋 Visão Geral

Painel de administração completo para gestão de conteúdos dinâmicos do site REGADIO, incluindo notícias, projectos e outras secções atualizáveis.

## 🔐 Acesso

### URL
```
/admin/login
```

### Credenciais de Teste

**Administrador:**
- Email: `admin@regadio.co.ao`
- Senha: `admin123`
- Permissões: Acesso total (criar, editar, eliminar, publicar, arquivar)

**Editor:**
- Email: `editor@regadio.co.ao`
- Senha: `editor123`
- Permissões: Criar, editar, publicar e arquivar (sem eliminar)

**Viewer:**
- Email: `viewer@regadio.co.ao`
- Senha: `viewer123`
- Permissões: Apenas visualização

## 🎯 Funcionalidades

### Dashboard
- Visão geral de estatísticas
- Contadores de notícias e projectos
- Acesso rápido às principais funcionalidades

### Gestão de Notícias
- **Listar**: Ver todas as notícias criadas
- **Criar**: Adicionar nova notícia com editor HTML
- **Editar**: Modificar notícias existentes
- **Eliminar**: Remover notícias permanentemente
- **Visualizar**: Ver notícia no site (link externo)

### Gestão de Projectos
- **Listar**: Ver todos os projectos
- **Criar**: Adicionar novo projecto
- **Editar**: Modificar projectos existentes
- **Publicar**: Tornar projecto visível no site
- **Arquivar**: Ocultar projecto sem eliminar
- **Eliminar**: Remover projecto permanentemente

### Configurações
- Visualizar informações da conta
- Gerir permissões (em desenvolvimento)

## 🏗️ Arquitetura

### Estrutura de Pastas

```
src/
├── contexts/
│   └── AuthContext.tsx          # Contexto de autenticação
├── components/
│   └── admin/
│       ├── ProtectedRoute.tsx   # Componente de rota protegida
│       └── AdminLayout.tsx      # Layout do painel admin
├── pages/
│   └── admin/
│       ├── LoginPage.tsx        # Página de login
│       ├── DashboardPage.tsx    # Dashboard principal
│       ├── NewsListPage.tsx     # Lista de notícias
│       ├── NewsFormPage.tsx     # Formulário de notícias
│       ├── ProjectsListPage.tsx # Lista de projectos
│       ├── ProjectsFormPage.tsx # Formulário de projectos
│       └── SettingsPage.tsx    # Configurações
└── services/
    └── dataService.ts           # Serviço de gestão de dados
```

### Sistema de Autenticação

- **Context API**: Gerencia estado de autenticação globalmente
- **LocalStorage**: Persiste sessão do utilizador
- **Roles**: Admin, Editor, Viewer com permissões diferentes
- **Protected Routes**: Rotas protegidas por autenticação e permissões

### Gestão de Dados

Atualmente utiliza **localStorage** para persistência de dados. O sistema está preparado para migração para API REST:

```typescript
// Estrutura atual (localStorage)
// Fácil migração para API substituindo métodos do dataService
```

### Níveis de Acesso

| Permissão | Admin | Editor | Viewer |
|-----------|-------|--------|--------|
| Ler | ✅ | ✅ | ✅ |
| Criar/Editar | ✅ | ✅ | ❌ |
| Eliminar | ✅ | ❌ | ❌ |
| Publicar | ✅ | ✅ | ❌ |
| Arquivar | ✅ | ✅ | ❌ |
| Gerir Utilizadores | ✅ | ❌ | ❌ |

## 🚀 Como Usar

### Criar uma Notícia

1. Aceda a `/admin/news`
2. Clique em "Nova Notícia"
3. Preencha os campos:
   - **Título**: Título da notícia
   - **Descrição**: Resumo curto
   - **Categoria**: Opcional (ex: Projectos, Parcerias)
   - **Autor**: Nome do autor
   - **Data**: Data de publicação
   - **Tags**: Separadas por vírgula
   - **Imagem**: Selecione uma imagem disponível
   - **Conteúdo**: HTML formatado
4. Clique em "Criar Notícia"

### Criar um Projecto

1. Aceda a `/admin/projects`
2. Clique em "Novo Projecto"
3. Preencha os campos:
   - **Título**: Nome do projecto
   - **Categoria**: Tipo de projecto
   - **Localização**: Cidade/País
   - **Descrição**: Descrição detalhada
   - **Status**: Estado do projecto
   - **Ano/Período**: Timeline
   - **Escopo**: Detalhes do escopo
   - **Imagens**: Selecione imagem principal e galeria
4. Clique em "Criar Projecto"
5. Para publicar, edite o projecto e ative "Publicado"

## 🔒 Segurança

### Implementações Atuais
- Autenticação baseada em sessão (localStorage)
- Rotas protegidas
- Verificação de permissões
- Validação de formulários

### Recomendações para Produção
1. **Backend API**: Implementar API REST com autenticação JWT
2. **Hash de Senhas**: Usar bcrypt ou similar
3. **HTTPS**: Sempre usar conexão segura
4. **Rate Limiting**: Limitar tentativas de login
5. **CSRF Protection**: Proteção contra CSRF
6. **Input Sanitization**: Sanitizar inputs HTML
7. **Audit Log**: Registrar ações administrativas

## 📦 Migração para API

Para migrar de localStorage para API REST:

1. Criar endpoints na API:
   - `GET /api/news`
   - `POST /api/news`
   - `PUT /api/news/:id`
   - `DELETE /api/news/:id`
   - (Similar para projects)

2. Atualizar `dataService.ts`:
```typescript
// Substituir métodos getAll, create, update, delete
// Por chamadas fetch/axios para API
```

3. Adicionar autenticação JWT:
```typescript
// Adicionar token JWT nos headers
headers: {
  'Authorization': `Bearer ${token}`
}
```

## 🎨 Personalização

### Adicionar Nova Secção

1. Criar interface de dados em `services/dataService.ts`
2. Criar serviço CRUD similar a `newsService` ou `projectsService`
3. Criar páginas de listagem e formulário
4. Adicionar rotas em `App.tsx`
5. Adicionar item no menu `AdminLayout.tsx`

### Modificar Permissões

Editar `contexts/AuthContext.tsx`:
```typescript
const permissions = {
  admin: ["read", "write", "delete", "publish", "archive", "manage_users"],
  editor: ["read", "write", "publish", "archive"],
  viewer: ["read"],
};
```

## 🐛 Troubleshooting

### Problema: Não consigo fazer login
- Verifique se está usando as credenciais corretas
- Limpe o localStorage do navegador
- Verifique o console do navegador para erros

### Problema: Dados não persistem
- Verifique se localStorage está habilitado
- Verifique se há espaço suficiente
- Limite do localStorage: ~5-10MB

### Problema: Permissões não funcionam
- Verifique o role do utilizador
- Verifique se a permissão está definida em `AuthContext.tsx`

## 📝 Notas

- Os dados são armazenados localmente (localStorage)
- Em produção, implementar backend com base de dados
- As imagens são referências a assets existentes
- Para upload de imagens, implementar sistema de upload

## 🔄 Próximas Melhorias

- [ ] Upload de imagens
- [ ] Editor WYSIWYG para conteúdo
- [ ] Preview antes de publicar
- [ ] Histórico de versões
- [ ] Exportação de dados
- [ ] Gestão de utilizadores
- [ ] Notificações
- [ ] Busca e filtros avançados
- [ ] Paginação
- [ ] Drag & drop para reordenar



