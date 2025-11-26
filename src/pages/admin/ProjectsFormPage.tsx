import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { projectsService, Project } from "@/services/dataService";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { ImageGalleryUpload } from "@/components/admin/ImageGalleryUpload";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Save } from "lucide-react";
import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";
import project4 from "@/assets/project-4.jpg";
import project5 from "@/assets/project-5.jpg";
import project6 from "@/assets/project-6.jpg";

const imageOptions = [project1, project2, project3, project4, project5, project6];

const ProjectsFormPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isEdit = !!id;

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    location: "",
    description: "",
    status: "",
    year: "",
    scope: "",
    image: imageOptions[0],
    images: [] as string[],
    published: false,
    archived: false,
  });

  useEffect(() => {
    if (isEdit && id) {
      const project = projectsService.getById(id);
      if (project) {
        setFormData({
          title: project.title,
          category: project.category,
          location: project.location || "",
          description: project.description,
          status: project.status || "",
          year: project.year || "",
          scope: project.scope || "",
          image: project.image,
          images: project.images || [],
          published: project.published,
          archived: project.archived,
        });
      }
    }
  }, [id, isEdit]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const projectData = {
      title: formData.title,
      category: formData.category,
      location: formData.location || undefined,
      description: formData.description,
      status: formData.status || undefined,
      year: formData.year || undefined,
      scope: formData.scope || undefined,
      image: formData.image,
      images: formData.images.length > 0 ? formData.images : undefined,
    };

    if (isEdit && id) {
      const updated = projectsService.update(id, {
        ...projectData,
        published: formData.published,
        archived: formData.archived,
      });
      if (updated) {
        toast({
          title: "Sucesso",
          description: "Projecto atualizado com sucesso",
        });
        navigate("/admin/projects");
      }
    } else {
      const created = projectsService.create(projectData);
      if (created) {
        toast({
          title: "Sucesso",
          description: "Projecto criado com sucesso",
        });
        navigate("/admin/projects");
      }
    }
  };


  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={() => navigate("/admin/projects")}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar
        </Button>
        <div>
          <h1 className="text-3xl font-display text-primary">
            {isEdit ? "Editar Projecto" : "Novo Projecto"}
          </h1>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Informações Básicas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Título *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Categoria *</Label>
                <Input
                  id="category"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  required
                  placeholder="Ex: Habitação, Infraestrutura"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Localização</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="Ex: Luanda, Angola"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Descrição *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                  required
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Detalhes Adicionais</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Input
                  id="status"
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  placeholder="Ex: Em execução, Concluído"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="year">Ano/Período</Label>
                <Input
                  id="year"
                  value={formData.year}
                  onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                  placeholder="Ex: 2023-2026"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="scope">Escopo</Label>
                <Input
                  id="scope"
                  value={formData.scope}
                  onChange={(e) => setFormData({ ...formData, scope: e.target.value })}
                  placeholder="Ex: 2.500 habitações • 15 hectares"
                />
              </div>

              {isEdit && (
                <div className="space-y-4 pt-4 border-t">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="published">Publicado</Label>
                    <Switch
                      id="published"
                      checked={formData.published}
                      onCheckedChange={(checked) =>
                        setFormData({ ...formData, published: checked, archived: false })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="archived">Arquivado</Label>
                    <Switch
                      id="archived"
                      checked={formData.archived}
                      onCheckedChange={(checked) =>
                        setFormData({ ...formData, archived: checked, published: false })
                      }
                    />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Imagens</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <ImageUpload
              value={formData.image}
              onChange={(url) => setFormData({ ...formData, image: url })}
              label="Imagem Principal"
              aspectRatio="video"
              maxSizeMB={5}
            />

            <div className="p-3 bg-muted rounded-lg">
              <p className="text-xs text-muted-foreground mb-2">
                <strong>Ou selecione uma imagem existente:</strong>
              </p>
              <div className="grid grid-cols-3 gap-2">
                {imageOptions.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setFormData({ ...formData, image: img })}
                    className={`relative aspect-video rounded-lg overflow-hidden border-2 transition-colors ${
                      formData.image === img ? "border-accent" : "border-border hover:border-accent/50"
                    }`}
                  >
                    <img src={img} alt={`Option ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            <div className="border-t pt-6">
              <ImageGalleryUpload
                value={formData.images}
                onChange={(urls) => setFormData({ ...formData, images: urls })}
                label="Galeria de Imagens"
                maxImages={10}
                maxSizeMB={5}
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={() => navigate("/admin/projects")}>
            Cancelar
          </Button>
          <Button type="submit" className="btn-primary">
            <Save className="w-4 h-4 mr-2" />
            {isEdit ? "Atualizar" : "Criar"} Projecto
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ProjectsFormPage;

