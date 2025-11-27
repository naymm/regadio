import { supabase } from "./supabase";

/**
 * Upload de imagem para o Supabase Storage
 */
export const uploadImage = async (
  file: File,
  bucket: "news-images" | "project-images",
  folder?: string
): Promise<string> => {
  const fileExt = file.name.split(".").pop();
  const fileName = `${folder || "uploads"}/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(fileName, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) {
    throw new Error(`Erro ao fazer upload: ${error.message}`);
  }

  // Obter URL pública
  const {
    data: { publicUrl },
  } = supabase.storage.from(bucket).getPublicUrl(data.path);

  return publicUrl;
};

/**
 * Deletar imagem do Supabase Storage
 */
export const deleteImage = async (
  url: string,
  bucket: "news-images" | "project-images"
): Promise<void> => {
  // Extrair o path do URL
  const urlParts = url.split("/");
  const pathIndex = urlParts.findIndex((part) => part === bucket);
  if (pathIndex === -1) {
    throw new Error("URL inválida");
  }
  const filePath = urlParts.slice(pathIndex + 1).join("/");

  const { error } = await supabase.storage.from(bucket).remove([filePath]);

  if (error) {
    throw new Error(`Erro ao deletar imagem: ${error.message}`);
  }
};

/**
 * Converter base64 para File (para compatibilidade com uploads existentes)
 */
export const base64ToFile = (base64: string, filename: string): File => {
  const arr = base64.split(",");
  const mime = arr[0].match(/:(.*?);/)?.[1] || "image/png";
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
};

/**
 * Upload de múltiplas imagens
 */
export const uploadMultipleImages = async (
  files: File[],
  bucket: "news-images" | "project-images",
  folder?: string
): Promise<string[]> => {
  const uploadPromises = files.map((file) => uploadImage(file, bucket, folder));
  return Promise.all(uploadPromises);
};




