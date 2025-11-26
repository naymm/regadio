import { NewsArticle, newsArticles as defaultNews } from "@/data/news";

export interface Project {
  id: string;
  slug: string;
  image: string;
  images?: string[];
  title: string;
  category: string;
  location?: string;
  description: string;
  status?: string;
  year?: string;
  scope?: string;
  published: boolean;
  archived: boolean;
  createdAt: string;
  updatedAt: string;
}

// Serviço para gerenciar dados (localStorage por enquanto, preparado para API)
const STORAGE_KEYS = {
  NEWS: "admin_news",
  PROJECTS: "admin_projects",
};

// ========== NEWS SERVICE ==========
export const newsService = {
  getAll: (): NewsArticle[] => {
    const stored = localStorage.getItem(STORAGE_KEYS.NEWS);
    if (stored) {
      return JSON.parse(stored);
    }
    // Inicializar com dados padrão se não houver dados salvos
    localStorage.setItem(STORAGE_KEYS.NEWS, JSON.stringify(defaultNews));
    return defaultNews;
  },

  getById: (id: string): NewsArticle | undefined => {
    const articles = newsService.getAll();
    return articles.find((a) => a.id === id);
  },

  getBySlug: (slug: string): NewsArticle | undefined => {
    const articles = newsService.getAll();
    return articles.find((a) => a.slug === slug);
  },

  create: (article: Omit<NewsArticle, "id" | "slug">): NewsArticle => {
    const articles = newsService.getAll();
    const newArticle: NewsArticle = {
      ...article,
      id: Date.now().toString(),
      slug: article.title
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, ""),
    };
    articles.push(newArticle);
    localStorage.setItem(STORAGE_KEYS.NEWS, JSON.stringify(articles));
    return newArticle;
  },

  update: (id: string, updates: Partial<NewsArticle>): NewsArticle | null => {
    const articles = newsService.getAll();
    const index = articles.findIndex((a) => a.id === id);
    if (index === -1) return null;

    const updated = {
      ...articles[index],
      ...updates,
      slug: updates.title
        ? updates.title
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)/g, "")
        : articles[index].slug,
    };

    articles[index] = updated;
    localStorage.setItem(STORAGE_KEYS.NEWS, JSON.stringify(articles));
    return updated;
  },

  delete: (id: string): boolean => {
    const articles = newsService.getAll();
    const filtered = articles.filter((a) => a.id !== id);
    localStorage.setItem(STORAGE_KEYS.NEWS, JSON.stringify(filtered));
    return filtered.length < articles.length;
  },
};

// ========== PROJECTS SERVICE ==========
export const projectsService = {
  getAll: (): Project[] => {
    const stored = localStorage.getItem(STORAGE_KEYS.PROJECTS);
    if (stored) {
      return JSON.parse(stored);
    }
    return [];
  },

  getById: (id: string): Project | undefined => {
    const projects = projectsService.getAll();
    return projects.find((p) => p.id === id);
  },

  create: (project: Omit<Project, "id" | "slug" | "createdAt" | "updatedAt" | "published" | "archived">): Project => {
    const projects = projectsService.getAll();
    const newProject: Project = {
      ...project,
      id: Date.now().toString(),
      slug: project.title
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, ""),
      published: false,
      archived: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    projects.push(newProject);
    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects));
    return newProject;
  },

  update: (id: string, updates: Partial<Project>): Project | null => {
    const projects = projectsService.getAll();
    const index = projects.findIndex((p) => p.id === id);
    if (index === -1) return null;

    const updated: Project = {
      ...projects[index],
      ...updates,
      updatedAt: new Date().toISOString(),
      slug: updates.title
        ? updates.title
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)/g, "")
        : projects[index].slug,
    };

    projects[index] = updated;
    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects));
    return updated;
  },

  delete: (id: string): boolean => {
    const projects = projectsService.getAll();
    const filtered = projects.filter((p) => p.id !== id);
    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(filtered));
    return filtered.length < projects.length;
  },

  publish: (id: string): boolean => {
    return !!projectsService.update(id, { published: true, archived: false });
  },

  archive: (id: string): boolean => {
    return !!projectsService.update(id, { archived: true, published: false });
  },
};

