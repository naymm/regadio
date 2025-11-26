import { supabase } from "@/lib/supabase";
import { uploadImage, uploadMultipleImages, deleteImage, base64ToFile } from "@/lib/storage";

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

// Helper para gerar slug
const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
};

// Helper para processar imagens
const processImage = async (image: string): Promise<string> => {
  if (image.startsWith("http://") || image.startsWith("https://")) {
    return image;
  }

  if (image.startsWith("data:image")) {
    try {
      const file = base64ToFile(image, `project-${Date.now()}.png`);
      return await uploadImage(file, "project-images", "projects");
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error;
    }
  }

  return image;
};

const processImages = async (images: string[]): Promise<string[]> => {
  return Promise.all(images.map(processImage));
};

export const projectsService = {
  // Buscar todos os projetos
  getAll: async (includeDrafts = false): Promise<Project[]> => {
    let query = supabase.from("projects").select(`
      *,
      project_images (*)
    `);

    if (!includeDrafts) {
      query = query.eq("status", "published");
    }

    const { data, error } = await query.order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching projects:", error);
      return [];
    }

    return (data || []).map((item: any) => ({
      id: item.id,
      slug: item.slug,
      image: item.image_url || "",
      images: item.project_images?.map((img: any) => img.image_url) || [],
      title: item.title,
      category: item.category,
      location: item.location || undefined,
      description: item.description,
      status: item.project_status || undefined,
      year: item.year || undefined,
      scope: item.scope || undefined,
      published: item.status === "published",
      archived: item.status === "archived",
      createdAt: item.created_at,
      updatedAt: item.updated_at,
    }));
  },

  // Buscar por ID
  getById: async (id: string): Promise<Project | null> => {
    const { data, error } = await supabase
      .from("projects")
      .select(`
        *,
        project_images (*)
      `)
      .eq("id", id)
      .single();

    if (error || !data) {
      return null;
    }

    return {
      id: data.id,
      slug: data.slug,
      image: data.image_url || "",
      images: (data.project_images || []).map((img: any) => img.image_url),
      title: data.title,
      category: data.category,
      location: data.location || undefined,
      description: data.description,
      status: data.project_status || undefined,
      year: data.year || undefined,
      scope: data.scope || undefined,
      published: data.status === "published",
      archived: data.status === "archived",
      createdAt: data.created_at,
      updatedAt: data.updated_at,
    };
  },

  // Criar projeto
  create: async (
    project: Omit<Project, "id" | "slug" | "createdAt" | "updatedAt" | "published" | "archived">
  ): Promise<Project> => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      throw new Error("Usuário não autenticado");
    }

    const slug = generateSlug(project.title);
    const imageUrl = await processImage(project.image);
    const galleryImages = project.images ? await processImages(project.images) : [];

    const { data: projectData, error: projectError } = await supabase
      .from("projects")
      .insert({
        slug,
        title: project.title,
        category: project.category,
        description: project.description,
        location: project.location || null,
        project_status: project.status || null,
        year: project.year || null,
        scope: project.scope || null,
        image_url: imageUrl,
        status: "draft",
        created_by: user.id,
      })
      .select()
      .single();

    if (projectError) {
      throw new Error(`Erro ao criar projeto: ${projectError.message}`);
    }

    // Inserir imagens da galeria
    if (galleryImages.length > 0) {
      const imagesToInsert = galleryImages.map((url, index) => ({
        project_id: projectData.id,
        image_url: url,
        order_index: index,
      }));

      const { error: imagesError } = await supabase
        .from("project_images")
        .insert(imagesToInsert);

      if (imagesError) {
        console.error("Error inserting gallery images:", imagesError);
      }
    }

    return {
      id: projectData.id,
      slug: projectData.slug,
      image: projectData.image_url || "",
      images: galleryImages,
      title: projectData.title,
      category: projectData.category,
      location: projectData.location || undefined,
      description: projectData.description,
      status: projectData.status || undefined,
      year: projectData.year || undefined,
      scope: projectData.scope || undefined,
      published: projectData.status === "published",
      archived: projectData.status === "archived",
      createdAt: projectData.created_at,
      updatedAt: projectData.updated_at,
    };
  },

  // Atualizar projeto
  update: async (id: string, updates: Partial<Project>): Promise<Project | null> => {
    const updateData: any = {};

    if (updates.title) {
      updateData.title = updates.title;
      updateData.slug = generateSlug(updates.title);
    }
    if (updates.category !== undefined) updateData.category = updates.category;
    if (updates.description !== undefined) updateData.description = updates.description;
    if (updates.location !== undefined) updateData.location = updates.location || null;
    if (updates.status !== undefined) updateData.project_status = updates.status || null;
    if (updates.year !== undefined) updateData.year = updates.year || null;
    if (updates.scope !== undefined) updateData.scope = updates.scope || null;

    // Processar status
    if (updates.published !== undefined) {
      updateData.status = updates.published ? "published" : "draft";
    }
    if (updates.archived !== undefined) {
      updateData.status = updates.archived ? "archived" : "draft";
    }

    // Processar imagem principal
    if (updates.image) {
      updateData.image_url = await processImage(updates.image);
    }

    const { data: projectData, error: projectError } = await supabase
      .from("projects")
      .update(updateData)
      .eq("id", id)
      .select()
      .single();

    if (projectError || !projectData) {
      throw new Error(`Erro ao atualizar projeto: ${projectError?.message}`);
    }

    // Atualizar galeria de imagens se fornecida
    if (updates.images !== undefined) {
      // Deletar imagens antigas
      await supabase.from("project_images").delete().eq("project_id", id);

      // Inserir novas imagens
      if (updates.images.length > 0) {
        const processedImages = await processImages(updates.images);
        const imagesToInsert = processedImages.map((url, index) => ({
          project_id: id,
          image_url: url,
          order_index: index,
        }));

        await supabase.from("project_images").insert(imagesToInsert);
      }
    }

    // Buscar projeto atualizado com imagens
    return await projectsService.getById(id);
  },

  // Deletar projeto
  delete: async (id: string): Promise<boolean> => {
    const project = await projectsService.getById(id);

    // Deletar imagens do storage
    if (project) {
      if (project.image && project.image.startsWith("http")) {
        try {
          await deleteImage(project.image, "project-images");
        } catch (error) {
          console.error("Error deleting main image:", error);
        }
      }

      if (project.images) {
        for (const img of project.images) {
          if (img.startsWith("http")) {
            try {
              await deleteImage(img, "project-images");
            } catch (error) {
              console.error("Error deleting gallery image:", error);
            }
          }
        }
      }
    }

    const { error } = await supabase.from("projects").delete().eq("id", id);

    if (error) {
      throw new Error(`Erro ao deletar projeto: ${error.message}`);
    }

    return true;
  },

  // Publicar projeto
  publish: async (id: string): Promise<boolean> => {
    const { error } = await supabase
      .from("projects")
      .update({ status: "published" })
      .eq("id", id);

    return !error;
  },

  // Arquivar projeto
  archive: async (id: string): Promise<boolean> => {
    const { error } = await supabase
      .from("projects")
      .update({ status: "archived" })
      .eq("id", id);

    return !error;
  },
};

