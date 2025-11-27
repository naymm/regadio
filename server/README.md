# Regadio Backend API

Backend API server for Regadio African Cities using Express.js + MySQL.

## Setup

### 1. Install Dependencies

```bash
cd server
npm install
```

### 2. Configure Environment

Copy `.env.example` to `.env` and configure:

```bash
cp .env.example .env
```

Edit `.env`:
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=regadio_db
JWT_SECRET=your-secret-key
```

### 3. Setup MySQL Database

Install MySQL:
```bash
# macOS
brew install mysql
brew services start mysql

# Linux
sudo apt-get install mysql-server
```

Create database and tables:
```bash
mysql -u root -p < ../mysql_schema.sql
```

### 4. Create Admin User

After running the schema, update the admin user password:

```sql
-- Generate password hash
-- In Node.js REPL or create a script:
import bcrypt from 'bcryptjs';
const hash = await bcrypt.hash('your_password', 10);
console.log(hash);
```

Then update in MySQL:
```sql
UPDATE users SET password_hash = 'generated_hash' WHERE email = 'naymupoia@gmail.com';
```

### 5. Start Server

Development mode (with hot reload):
```bash
npm run dev
```

Production:
```bash
npm run build
npm start
```

## API Endpoints

### Authentication
- `POST /api/auth/login` - Login
- `POST /api/auth/register` - Register new user
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - Logout

### News
- `GET /api/news` - List news (public: published only)
- `GET /api/news/:id` - Get news by ID
- `GET /api/news/slug/:slug` - Get news by slug
- `POST /api/news` - Create news (admin only)
- `PUT /api/news/:id` - Update news (admin only)
- `DELETE /api/news/:id` - Delete news (admin only)

### Projects
- `GET /api/projects` - List projects
- `GET /api/projects/:id` - Get project by ID
- `POST /api/projects` - Create project (admin only)
- `PUT /api/projects/:id` - Update project (admin only)
- `DELETE /api/projects/:id` - Delete project (admin only)

## Testing

Health check:
```bash
curl http://localhost:3000/health
```

Login:
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"naymupoia@gmail.com","password":"your_password"}'
```

## Deployment

1. Build:
```bash
npm run build
```

2. Set environment variables on your hosting platform

3. Run:
```bash
npm start
```
