import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '../config/database.js';
import { authMiddleware, AuthRequest } from '../middleware/auth.js';

const router = Router();

// Login
router.post('/login', async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password required' });
        }

        // Buscar usuário
        const [rows] = await db.query(
            'SELECT * FROM users WHERE email = ?',
            [email]
        );

        const users = rows as any[];
        if (users.length === 0) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const user = users[0];

        // Verificar senha
        const isValidPassword = await bcrypt.compare(password, user.password_hash);
        if (!isValidPassword) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Gerar JWT token
        const token = jwt.sign(
            {
                userId: user.id,
                email: user.email,
                role: user.role,
            },
            process.env.JWT_SECRET!,
            { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
        );

        return res.json({
            token,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role,
            },
        });
    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

// Register (opcional - pode ser desabilitado em produção)
router.post('/register', async (req: Request, res: Response) => {
    try {
        const { email, password, name } = req.body;

        if (!email || !password || !name) {
            return res.status(400).json({ error: 'Email, password and name required' });
        }

        // Verificar se usuário já existe
        const [existing] = await db.query(
            'SELECT id FROM users WHERE email = ?',
            [email]
        );

        if ((existing as any[]).length > 0) {
            return res.status(409).json({ error: 'User already exists' });
        }

        // Hash da senha
        const passwordHash = await bcrypt.hash(password, 10);

        // Inserir usuário
        const [result] = await db.query(
            'INSERT INTO users (email, password_hash, name, role) VALUES (?, ?, ?, ?)',
            [email, passwordHash, name, 'viewer']
        );

        const userId = (result as any).insertId;

        return res.status(201).json({
            message: 'User created successfully',
            userId,
        });
    } catch (error) {
        console.error('Register error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

// Get current user
router.get('/me', authMiddleware, async (req: AuthRequest, res: Response) => {
    try {
        const [rows] = await db.query(
            'SELECT id, email, name, role, created_at FROM users WHERE id = ?',
            [req.userId]
        );

        const users = rows as any[];
        if (users.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        return res.json({ user: users[0] });
    } catch (error) {
        console.error('Get user error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

// Logout (client-side only - remove token from localStorage)
router.post('/logout', (req: Request, res: Response) => {
    return res.json({ message: 'Logged out successfully' });
});

export default router;
