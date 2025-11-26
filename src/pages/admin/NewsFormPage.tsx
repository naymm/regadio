import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { newsService, NewsArticle } from "@/services/dataService";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Save } from "lucide-react";
import project1 from "@/assets/project-1.jpg";
import project3 from "@/assets/project-3.jpg";
import project6 from "@/assets/project-6.jpg";

const imageOptions = [project1, project3, project6];

const NewsFormPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isEdit = !!id;

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    content: "",
    author: "",
    image: imageOptions[0],
    tags: "",
    date: new Date().toLocaleDateString("pt-AO", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }),
  });

  useEffect(() => {
    if (isEdit && id) {
      const article = newsService.getById(id);
      if (article) {
        setFormData({
          title: article.title,
          description: article.description,
          category: article.category || "",
          content: article.content,
          author: article.author || "",
          image: article.image,
          tags: article.tags?.join(", ") || "",
          date: article.date,
        });
      }
    }
  }, [id, isEdit]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const articleData = {
      title: formData.title,
      description: formData.description,
      category: formData.category || undefined,
      content: formData.content,
      author: formData.author || undefined,
      image: formData.image,
      tags: formData.tags
        ? formData.tags.split(",").map((t) => t.trim()).filter(Boolean)
        : undefined,
      date: formData.date,
    };

    if (isEdit && id) {
      const updated = newsService.update(id, articleData);
      if (updated) {
        toast({
          title: "Sucesso",
          description: "Notícia atualizada com sucesso",
        });
        navigate("/admin/news");
      }
    } else {
      const created = newsService.create(articleData);
      if (created) {
        toast({
          title: "Sucesso",
          description: "Notícia criada com sucesso",
        });
        navigate("/admin/news");
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={() => navigate("/admin/news")}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar
        </Button>
        <div>
          <h1 className="text-3xl font-display text-primary">
            {isEdit ? "Editar Notícia" : "Nova Notícia"}
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
                <Label htmlFor="description">Descrição *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Categoria</Label>
                <Input
                  id="category"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  placeholder="Ex: Projectos, Parcerias"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="author">Autor</Label>
                <Input
                  id="author"
                  value={formData.author}
                  onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="date">Data</Label>
                <Input
                  id="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tags">Tags (separadas por vírgula)</Label>
                <Input
                  id="tags"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  placeholder="Ex: Habitação, Infraestrutura"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Imagem</CardTitle>
            </CardHeader>
            <CardContent>
              <ImageUpload
                value={formData.image}
                onChange={(url) => setFormData({ ...formData, image: url })}
                label="Imagem Principal"
                aspectRatio="video"
                maxSizeMB={5}
              />
              <div className="mt-4 p-3 bg-muted rounded-lg">
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
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Conteúdo</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label htmlFor="content">Conteúdo HTML *</Label>
              <Textarea
                id="content"
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                rows={15}
                className="font-mono text-sm"
                required
                placeholder="Digite o conteúdo em HTML..."
              />
              <p className="text-xs text-muted-foreground">
                Use HTML para formatar o conteúdo. Ex: &lt;p&gt;, &lt;h2&gt;, &lt;ul&gt;, etc.
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={() => navigate("/admin/news")}>
            Cancelar
          </Button>
          <Button type="submit" className="btn-primary">
            <Save className="w-4 h-4 mr-2" />
            {isEdit ? "Atualizar" : "Criar"} Notícia
          </Button>
        </div>
      </form>
    </div>
  );
};

export default NewsFormPage;

