import api from "@/lib/api";

export interface Project {
    id: string;
    slug: string;
    title: string;
    category: string;
    description: string;
    location?: string;
    projectStatus?: string;
    year?: string;
    scope?: string;
    image: string;
    status?: "draft" | "published" | "archived";
}

export const projectsService = {
    // Buscar todos os projetos
    getAll: async (includeDrafts = false): Promise<Project[]> => {
        try {
            const params = includeDrafts ? {} : { status: 'published' };
            const response = await api.get('/projects', { params });

            return response.data.map((item: any) => ({
                id: item.id,
                slug: item.slug,
                title: item.title,
                category: item.category,
                description: item.description,
                location: item.location || undefined,
                projectStatus: item.project_status || undefined,
                year: item.year || undefined,
                scope: item.scope || undefined,
                image: item.image_url || "",
                status: item.status,
            }));
        } catch (error) {
            console.error("Error fetching projects:", error);
            return [];
        }
    },

    // Buscar por ID
    getById: async (id: string): Promise<Project | null> => {
        try {
            const response = await api.get(`/projects/${id}`);
            const data = response.data;

            return {
                id: data.id,
                slug: data.slug,
                title: data.title,
                category: data.category,
                description: data.description,
                location: data.location || undefined,
                projectStatus: data.project_status || undefined,
                year: data.year || undefined,
                scope: data.scope || undefined,
                image: data.image_url || "",
                status: data.status,
            };
        } catch (error) {
            console.error("Error fetching project by ID:", error);
            return null;
        }
    },

    // Criar projeto
    create: async (project: Omit<Project, "id" | "status">): Promise<Project> => {
        const response = await api.post('/projects', {
            slug: project.slug,
            title: project.title,
            category: project.category,
            description: project.description,
            location: project.location || null,
            project_status: project.projectStatus || null,
            year: project.year || null,
            scope: project.scope || null,
            image_url: project.image,
            status: "draft",
        });

        const data = response.data;
        return {
            id: data.id,
            slug: data.slug,
            title: data.title,
            category: data.category,
            description: data.description,
            location: data.location || undefined,
            projectStatus: data.project_status || undefined,
            year: data.year || undefined,
            scope: data.scope || undefined,
            image: data.image_url || "",
            status: data.status,
        };
    },

    // Atualizar projeto
    update: async (id: string, updates: Partial<Project>): Promise<Project | null> => {
        const updateData: any = {};

        if (updates.slug) updateData.slug = updates.slug;
        if (updates.title) updateData.title = updates.title;
        if (updates.category) updateData.category = updates.category;
        if (updates.description !== undefined) updateData.description = updates.description;
        if (updates.location !== undefined) updateData.location = updates.location || null;
        if (updates.projectStatus !== undefined) updateData.project_status = updates.projectStatus || null;
        if (updates.year !== undefined) updateData.year = updates.year || null;
        if (updates.scope !== undefined) updateData.scope = updates.scope || null;
        if (updates.image !== undefined) updateData.image_url = updates.image;
        if (updates.status !== undefined) updateData.status = updates.status;

        const response = await api.put(`/projects/${id}`, updateData);
        const data = response.data;

        return {
            id: data.id,
            slug: data.slug,
            title: data.title,
            category: data.category,
            description: data.description,
            location: data.location || undefined,
            projectStatus: data.project_status || undefined,
            year: data.year || undefined,
            scope: data.scope || undefined,
            image: data.image_url || "",
            status: data.status,
        };
    },

    // Deletar projeto
    delete: async (id: string): Promise<boolean> => {
        await api.delete(`/projects/${id}`);
        return true;
    },

    // Publicar projeto
    publish: async (id: string): Promise<boolean> => {
        try {
            await api.put(`/projects/${id}`, { status: "published" });
            return true;
        } catch (error) {
            return false;
        }
    },

    // Arquivar projeto
    archive: async (id: string): Promise<boolean> => {
        try {
            await api.put(`/projects/${id}`, { status: "archived" });
            return true;
        } catch (error) {
            return false;
        }
    },
};
