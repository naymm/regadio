import { Router, Request, Response } from 'express';
import db from '../config/database.js';
import { authMiddleware, requireAdmin, AuthRequest } from '../middleware/auth.js';

const router = Router();

// GET /api/projects - Listar projetos
router.get('/', async (req: Request, res: Response) => {
    try {
        const status = req.query.status as string;

        let query = 'SELECT * FROM projects';
        const params: any[] = [];

        if (status) {
            query += ' WHERE status = ?';
            params.push(status);
        } else {
            query += ' WHERE status = "published"';
        }

        query += ' ORDER BY created_at DESC';

        const [rows] = await db.query(query, params);
        return res.json(rows);
    } catch (error) {
        console.error('Get projects error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

// GET /api/projects/:id - Buscar projeto por ID
router.get('/:id', async (req: Request, res: Response) => {
    try {
        const [rows] = await db.query(
            'SELECT * FROM projects WHERE id = ?',
            [req.params.id]
        );

        const projects = rows as any[];
        if (projects.length === 0) {
            return res.status(404).json({ error: 'Project not found' });
        }

        // Buscar imagens do projeto
        const [images] = await db.query(
            'SELECT * FROM project_images WHERE project_id = ? ORDER BY order_index',
            [req.params.id]
        );

        return res.json({
            ...projects[0],
            images,
        });
    } catch (error) {
        console.error('Get project by ID error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

// POST /api/projects - Criar projeto (apenas admin)
router.post('/', authMiddleware, requireAdmin, async (req: AuthRequest, res: Response) => {
    try {
        const {
            slug,
            title,
            category,
            description,
            location,
            project_status,
            year,
            scope,
            image_url,
            status
        } = req.body;

        if (!slug || !title || !category) {
            return res.status(400).json({ error: 'Missing required fields: slug, title, category' });
        }

        const [result] = await db.query(
            `INSERT INTO projects (slug, title, category, description, location, project_status, year, scope, image_url, status, created_by)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [slug, title, category, description, location, project_status, year, scope, image_url, status || 'draft', req.userId]
        );

        const projectId = (result as any).insertId;

        const [rows] = await db.query('SELECT * FROM projects WHERE id = ?', [projectId]);
        return res.status(201).json((rows as any[])[0]);
    } catch (error: any) {
        console.error('Create project error:', error);
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ error: 'Project with this slug already exists' });
        }
        return res.status(500).json({ error: 'Internal server error' });
    }
});

// PUT /api/projects/:id - Atualizar projeto (apenas admin)
router.put('/:id', authMiddleware, requireAdmin, async (req: AuthRequest, res: Response) => {
    try {
        const {
            slug,
            title,
            category,
            description,
            location,
            project_status,
            year,
            scope,
            image_url,
            status
        } = req.body;

        const updates: string[] = [];
        const params: any[] = [];

        if (slug !== undefined) { updates.push('slug = ?'); params.push(slug); }
        if (title !== undefined) { updates.push('title = ?'); params.push(title); }
        if (category !== undefined) { updates.push('category = ?'); params.push(category); }
        if (description !== undefined) { updates.push('description = ?'); params.push(description); }
        if (location !== undefined) { updates.push('location = ?'); params.push(location); }
        if (project_status !== undefined) { updates.push('project_status = ?'); params.push(project_status); }
        if (year !== undefined) { updates.push('year = ?'); params.push(year); }
        if (scope !== undefined) { updates.push('scope = ?'); params.push(scope); }
        if (image_url !== undefined) { updates.push('image_url = ?'); params.push(image_url); }
        if (status !== undefined) { updates.push('status = ?'); params.push(status); }

        if (updates.length === 0) {
            return res.status(400).json({ error: 'No fields to update' });
        }

        params.push(req.params.id);

        await db.query(
            `UPDATE projects SET ${updates.join(', ')} WHERE id = ?`,
            params
        );

        const [rows] = await db.query('SELECT * FROM projects WHERE id = ?', [req.params.id]);
        return res.json((rows as any[])[0]);
    } catch (error: any) {
        console.error('Update project error:', error);
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ error: 'Project with this slug already exists' });
        }
        return res.status(500).json({ error: 'Internal server error' });
    }
});

// DELETE /api/projects/:id - Deletar projeto (apenas admin)
router.delete('/:id', authMiddleware, requireAdmin, async (req: AuthRequest, res: Response) => {
    try {
        // Imagens serão deletadas automaticamente por CASCADE
        await db.query('DELETE FROM projects WHERE id = ?', [req.params.id]);
        return res.json({ message: 'Project deleted successfully' });
    } catch (error) {
        console.error('Delete project error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;
