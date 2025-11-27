import api from "@/lib/api";

export interface NewsArticle {
    id: string;
    slug: string;
    image: string;
    date: string;
    title: string;
    description: string;
    category?: string;
    content: string;
    author?: string;
    tags?: string[];
    status?: "draft" | "published" | "archived";
}

export const newsService = {
    // Buscar todas as notícias
    getAll: async (includeDrafts = false): Promise<NewsArticle[]> => {
        try {
            const params = includeDrafts ? {} : { status: 'published' };
            const response = await api.get('/news', { params });

            return response.data.map((item: any) => ({
                id: item.id,
                slug: item.slug,
                image: item.image_url || "",
                date: item.date,
                title: item.title,
                description: item.description,
                category: item.category || undefined,
                content: item.content,
                author: item.author || undefined,
                tags: item.tags || [],
                status: item.status,
            }));
        } catch (error) {
            console.error("Error fetching news:", error);
            return [];
        }
    },

    // Buscar por ID
    getById: async (id: string): Promise<NewsArticle | null> => {
        try {
            const response = await api.get(`/news/${id}`);
            const data = response.data;

            return {
                id: data.id,
                slug: data.slug,
                image: data.image_url || "",
                date: data.date,
                title: data.title,
                description: data.description,
                category: data.category || undefined,
                content: data.content,
                author: data.author || undefined,
                tags: data.tags || [],
                status: data.status,
            };
        } catch (error) {
            console.error("Error fetching news by ID:", error);
            return null;
        }
    },

    // Buscar por slug
    getBySlug: async (slug: string): Promise<NewsArticle | null> => {
        try {
            const response = await api.get(`/news/slug/${slug}`);
            const data = response.data;

            return {
                id: data.id,
                slug: data.slug,
                image: data.image_url || "",
                date: data.date,
                title: data.title,
                description: data.description,
                category: data.category || undefined,
                content: data.content,
                author: data.author || undefined,
                tags: data.tags || [],
                status: data.status,
            };
        } catch (error) {
            console.error("Error fetching news by slug:", error);
            return null;
        }
    },

    // Criar notícia
    create: async (article: Omit<NewsArticle, "id" | "status">): Promise<NewsArticle> => {
        const response = await api.post('/news', {
            slug: article.slug,
            title: article.title,
            description: article.description,
            content: article.content,
            image_url: article.image,
            category: article.category || null,
            author: article.author || null,
            date: article.date,
            tags: article.tags || [],
            status: "draft",
        });

        const data = response.data;
        return {
            id: data.id,
            slug: data.slug,
            image: data.image_url || "",
            date: data.date,
            title: data.title,
            description: data.description,
            category: data.category || undefined,
            content: data.content,
            author: data.author || undefined,
            tags: data.tags || [],
            status: data.status,
        };
    },

    // Atualizar notícia
    update: async (id: string, updates: Partial<NewsArticle>): Promise<NewsArticle | null> => {
        const updateData: any = {};

        if (updates.title) updateData.title = updates.title;
        if (updates.slug) updateData.slug = updates.slug;
        if (updates.description !== undefined) updateData.description = updates.description;
        if (updates.content !== undefined) updateData.content = updates.content;
        if (updates.category !== undefined) updateData.category = updates.category || null;
        if (updates.author !== undefined) updateData.author = updates.author || null;
        if (updates.date !== undefined) updateData.date = updates.date;
        if (updates.tags !== undefined) updateData.tags = updates.tags || [];
        if (updates.status !== undefined) updateData.status = updates.status;
        if (updates.image !== undefined) updateData.image_url = updates.image;

        const response = await api.put(`/news/${id}`, updateData);
        const data = response.data;

        return {
            id: data.id,
            slug: data.slug,
            image: data.image_url || "",
            date: data.date,
            title: data.title,
            description: data.description,
            category: data.category || undefined,
            content: data.content,
            author: data.author || undefined,
            tags: data.tags || [],
            status: data.status,
        };
    },

    // Deletar notícia
    delete: async (id: string): Promise<boolean> => {
        await api.delete(`/news/${id}`);
        return true;
    },

    // Publicar notícia
    publish: async (id: string): Promise<boolean> => {
        try {
            await api.put(`/news/${id}`, { status: "published" });
            return true;
        } catch (error) {
            return false;
        }
    },

    // Arquivar notícia
    archive: async (id: string): Promise<boolean> => {
        try {
            await api.put(`/news/${id}`, { status: "archived" });
            return true;
        } catch (error) {
            return false;
        }
    },
};
