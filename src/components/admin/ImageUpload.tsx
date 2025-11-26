import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Upload, X, Image as ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
  label?: string;
  className?: string;
  aspectRatio?: "square" | "video" | "auto";
  maxSizeMB?: number;
}

export const ImageUpload = ({
  value,
  onChange,
  label = "Imagem",
  className,
  aspectRatio = "auto",
  maxSizeMB = 5,
}: ImageUploadProps) => {
  const [preview, setPreview] = useState<string | null>(value || null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    // Validar tipo
    if (!file.type.startsWith("image/")) {
      setError("Por favor, selecione um ficheiro de imagem");
      return;
    }

    // Validar tamanho
    const sizeMB = file.size / (1024 * 1024);
    if (sizeMB > maxSizeMB) {
      setError(`A imagem deve ter no máximo ${maxSizeMB}MB`);
      return;
    }

    setError(null);

    // Converter para base64 (em produção, enviar para servidor)
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      setPreview(base64String);
      onChange(base64String);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleRemove = () => {
    setPreview(null);
    onChange("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const aspectRatioClass = {
    square: "aspect-square",
    video: "aspect-video",
    auto: "",
  }[aspectRatio];

  return (
    <div className={cn("space-y-2", className)}>
      <Label>{label}</Label>
      
      {preview ? (
        <div className="relative group">
          <div className={cn("rounded-lg overflow-hidden border-2 border-border", aspectRatioClass)}>
            <img
              src={preview}
              alt="Preview"
              className="w-full h-full object-cover"
            />
          </div>
          <Button
            type="button"
            variant="destructive"
            size="sm"
            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={handleRemove}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      ) : (
        <div
          onDrop={handleDrop}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onClick={() => fileInputRef.current?.click()}
          className={cn(
            "border-2 border-dashed rounded-lg cursor-pointer transition-colors",
            isDragging
              ? "border-accent bg-accent/10"
              : "border-border hover:border-accent/50 hover:bg-accent/5",
            aspectRatioClass,
            "flex flex-col items-center justify-center p-8 text-center"
          )}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileInput}
            className="hidden"
          />
          <ImageIcon className="w-12 h-12 text-muted-foreground mb-4" />
          <p className="text-sm font-medium text-primary mb-1">
            Clique para carregar ou arraste uma imagem
          </p>
          <p className="text-xs text-muted-foreground">
            PNG, JPG, GIF até {maxSizeMB}MB
          </p>
        </div>
      )}

      {error && (
        <p className="text-sm text-destructive">{error}</p>
      )}

      {preview && (
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => fileInputRef.current?.click()}
          className="w-full"
        >
          <Upload className="w-4 h-4 mr-2" />
          Alterar Imagem
        </Button>
      )}
    </div>
  );
};



