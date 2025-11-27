import { supabase } from "@/lib/supabase";
import { uploadImage, deleteImage, base64ToFile } from "@/lib/storage";

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

// Helper para gerar slug
const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
};

// Helper para converter base64 para URL (se necessário)
const processImage = async (image: string): Promise<string> => {
  // Se já é uma URL (http/https), retornar como está
  if (image.startsWith("http://") || image.startsWith("https://")) {
    return image;
  }

  // Se é base64, converter e fazer upload
  if (image.startsWith("data:image")) {
    try {
      const file = base64ToFile(image, `news-${Date.now()}.png`);
      return await uploadImage(file, "news-images", "news");
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error;
    }
  }

  return image;
};

export const newsService = {
  // Buscar todas as notícias (públicas para site, todas para admin)
  getAll: async (includeDrafts = false): Promise<NewsArticle[]> => {
    let query = supabase.from("news").select("*");

    if (!includeDrafts) {
      query = query.eq("status", "published");
    }

    const { data, error } = await query.order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching news:", error);
      return [];
    }

    return (data || []).map((item) => ({
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
  },

  // Buscar por ID
  getById: async (id: string): Promise<NewsArticle | null> => {
    const { data, error } = await supabase
      .from("news")
      .select("*")
      .eq("id", id)
      .single();

    if (error || !data) {
      return null;
    }

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

  // Buscar por slug
  getBySlug: async (slug: string): Promise<NewsArticle | null> => {
    const { data, error } = await supabase
      .from("news")
      .select("*")
      .eq("slug", slug)
      .eq("status", "published")
      .single();

    if (error || !data) {
      return null;
    }

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

  // Criar notícia
  create: async (article: Omit<NewsArticle, "id" | "slug" | "status">): Promise<NewsArticle> => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      throw new Error("Usuário não autenticado");
    }

    const slug = generateSlug(article.title);
    const imageUrl = await processImage(article.image);

    const { data, error } = await supabase
      .from("news")
      .insert({
        slug,
        title: article.title,
        description: article.description,
        content: article.content,
        image_url: imageUrl,
        category: article.category || null,
        author: article.author || null,
        date: article.date,
        tags: article.tags || [],
        status: "draft",
        created_by: user.id,
      })
      .select()
      .single();

    if (error) {
      throw new Error(`Erro ao criar notícia: ${error.message}`);
    }

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

    if (updates.title) {
      updateData.title = updates.title;
      updateData.slug = generateSlug(updates.title);
    }
    if (updates.description !== undefined) updateData.description = updates.description;
    if (updates.content !== undefined) updateData.content = updates.content;
    if (updates.category !== undefined) updateData.category = updates.category || null;
    if (updates.author !== undefined) updateData.author = updates.author || null;
    if (updates.date !== undefined) updateData.date = updates.date;
    if (updates.tags !== undefined) updateData.tags = updates.tags || [];
    if (updates.status !== undefined) updateData.status = updates.status;

    // Processar imagem se fornecida
    if (updates.image) {
      updateData.image_url = await processImage(updates.image);
    }

    const { data, error } = await supabase
      .from("news")
      .update(updateData)
      .eq("id", id)
      .select()
      .single();

    if (error || !data) {
      throw new Error(`Erro ao atualizar notícia: ${error?.message}`);
    }

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
    // Buscar notícia para deletar imagem se necessário
    const article = await newsService.getById(id);
    if (article?.image && article.image.startsWith("http")) {
      try {
        await deleteImage(article.image, "news-images");
      } catch (error) {
        console.error("Error deleting image:", error);
      }
    }

    const { error } = await supabase.from("news").delete().eq("id", id);

    if (error) {
      throw new Error(`Erro ao deletar notícia: ${error.message}`);
    }

    return true;
  },

  // Publicar notícia
  publish: async (id: string): Promise<boolean> => {
    const { error } = await supabase
      .from("news")
      .update({ status: "published" })
      .eq("id", id);

    return !error;
  },

  // Arquivar notícia
  archive: async (id: string): Promise<boolean> => {
    const { error } = await supabase
      .from("news")
      .update({ status: "archived" })
      .eq("id", id);

    return !error;
  },
};




