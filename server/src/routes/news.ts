import { Router, Request, Response } from 'express';
import db from '../config/database.js';
import { authMiddleware, requireAdmin, AuthRequest } from '../middleware/auth.js';

const router = Router();

// GET /api/news - Listar notícias (público para published, admin para todas)
router.get('/', async (req: Request, res: Response) => {
    try {
        const status = req.query.status as string;

        let query = 'SELECT * FROM news';
        const params: any[] = [];

        if (status) {
            query += ' WHERE status = ?';
            params.push(status);
        } else {
            // Público vê apenas published
            query += ' WHERE status = "published"';
        }

        query += ' ORDER BY created_at DESC';

        const [rows] = await db.query(query, params);
        return res.json(rows);
    } catch (error) {
        console.error('Get news error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

// GET /api/news/:id - Buscar notícia por ID
router.get('/:id', async (req: Request, res: Response) => {
    try {
        const [rows] = await db.query(
            'SELECT * FROM news WHERE id = ?',
            [req.params.id]
        );

        const news = rows as any[];
        if (news.length === 0) {
            return res.status(404).json({ error: 'News not found' });
        }

        return res.json(news[0]);
    } catch (error) {
        console.error('Get news by ID error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

// GET /api/news/slug/:slug - Buscar notícia por slug
router.get('/slug/:slug', async (req: Request, res: Response) => {
    try {
        const [rows] = await db.query(
            'SELECT * FROM news WHERE slug = ? AND status = "published"',
            [req.params.slug]
        );

        const news = rows as any[];
        if (news.length === 0) {
            return res.status(404).json({ error: 'News not found' });
        }

        return res.json(news[0]);
    } catch (error) {
        console.error('Get news by slug error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

// POST /api/news - Criar notícia (apenas admin)
router.post('/', authMiddleware, requireAdmin, async (req: AuthRequest, res: Response) => {
    try {
        const { slug, title, description, content, image_url, category, author, date, tags, status } = req.body;

        if (!slug || !title || !content || !date) {
            return res.status(400).json({ error: 'Missing required fields: slug, title, content, date' });
        }

        const [result] = await db.query(
            `INSERT INTO news (slug, title, description, content, image_url, category, author, date, tags, status, created_by)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [slug, title, description, content, image_url, category, author, date, JSON.stringify(tags || []), status || 'draft', req.userId]
        );

        const newsId = (result as any).insertId;

        const [rows] = await db.query('SELECT * FROM news WHERE id = ?', [newsId]);
        return res.status(201).json((rows as any[])[0]);
    } catch (error: any) {
        console.error('Create news error:', error);
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ error: 'News with this slug already exists' });
        }
        return res.status(500).json({ error: 'Internal server error' });
    }
});

// PUT /api/news/:id - Atualizar notícia (apenas admin)
router.put('/:id', authMiddleware, requireAdmin, async (req: AuthRequest, res: Response) => {
    try {
        const { slug, title, description, content, image_url, category, author, date, tags, status } = req.body;

        const updates: string[] = [];
        const params: any[] = [];

        if (slug !== undefined) { updates.push('slug = ?'); params.push(slug); }
        if (title !== undefined) { updates.push('title = ?'); params.push(title); }
        if (description !== undefined) { updates.push('description = ?'); params.push(description); }
        if (content !== undefined) { updates.push('content = ?'); params.push(content); }
        if (image_url !== undefined) { updates.push('image_url = ?'); params.push(image_url); }
        if (category !== undefined) { updates.push('category = ?'); params.push(category); }
        if (author !== undefined) { updates.push('author = ?'); params.push(author); }
        if (date !== undefined) { updates.push('date = ?'); params.push(date); }
        if (tags !== undefined) { updates.push('tags = ?'); params.push(JSON.stringify(tags)); }
        if (status !== undefined) { updates.push('status = ?'); params.push(status); }

        if (updates.length === 0) {
            return res.status(400).json({ error: 'No fields to update' });
        }

        params.push(req.params.id);

        await db.query(
            `UPDATE news SET ${updates.join(', ')} WHERE id = ?`,
            params
        );

        const [rows] = await db.query('SELECT * FROM news WHERE id = ?', [req.params.id]);
        return res.json((rows as any[])[0]);
    } catch (error: any) {
        console.error('Update news error:', error);
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ error: 'News with this slug already exists' });
        }
        return res.status(500).json({ error: 'Internal server error' });
    }
});

// DELETE /api/news/:id - Deletar notícia (apenas admin)
router.delete('/:id', authMiddleware, requireAdmin, async (req: AuthRequest, res: Response) => {
    try {
        await db.query('DELETE FROM news WHERE id = ?', [req.params.id]);
        return res.json({ message: 'News deleted successfully' });
    } catch (error) {
        console.error('Delete news error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;
