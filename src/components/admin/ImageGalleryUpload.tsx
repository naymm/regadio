import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Upload, X, Image as ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ImageGalleryUploadProps {
  value: string[];
  onChange: (urls: string[]) => void;
  label?: string;
  maxImages?: number;
  maxSizeMB?: number;
}

export const ImageGalleryUpload = ({
  value = [],
  onChange,
  label = "Galeria de Imagens",
  maxImages = 10,
  maxSizeMB = 5,
}: ImageGalleryUploadProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    if (value.length >= maxImages) {
      setError(`Máximo de ${maxImages} imagens permitidas`);
      return;
    }

    if (!file.type.startsWith("image/")) {
      setError("Por favor, selecione um ficheiro de imagem");
      return;
    }

    const sizeMB = file.size / (1024 * 1024);
    if (sizeMB > maxSizeMB) {
      setError(`A imagem deve ter no máximo ${maxSizeMB}MB`);
      return;
    }

    setError(null);

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      onChange([...value, base64String]);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files).filter((f) =>
      f.type.startsWith("image/")
    );

    files.slice(0, maxImages - value.length).forEach((file) => {
      handleFile(file);
    });
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    files.slice(0, maxImages - value.length).forEach((file) => {
      handleFile(file);
    });
  };

  const removeImage = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-2">
      <Label>{label}</Label>

      {value.length > 0 && (
        <div className="grid grid-cols-3 gap-2 mb-4">
          {value.map((url, index) => (
            <div key={index} className="relative group">
              <div className="aspect-video rounded-lg overflow-hidden border-2 border-border">
                <img
                  src={url}
                  alt={`Gallery ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
              <Button
                type="button"
                variant="destructive"
                size="sm"
                className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6 p-0"
                onClick={() => removeImage(index)}
              >
                <X className="w-3 h-3" />
              </Button>
            </div>
          ))}
        </div>
      )}

      {value.length < maxImages && (
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
            "flex flex-col items-center justify-center p-6 text-center"
          )}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileInput}
            className="hidden"
          />
          <Upload className="w-8 h-8 text-muted-foreground mb-2" />
          <p className="text-sm font-medium text-primary mb-1">
            Adicionar Imagens ({value.length}/{maxImages})
          </p>
          <p className="text-xs text-muted-foreground">
            Clique ou arraste imagens aqui
          </p>
        </div>
      )}

      {error && <p className="text-sm text-destructive">{error}</p>}

      {value.length >= maxImages && (
        <p className="text-sm text-muted-foreground">
          Limite de {maxImages} imagens atingido
        </p>
      )}
    </div>
  );
};




