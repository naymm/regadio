import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { newsService, NewsArticle } from "@/services/dataService";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Plus, Pencil, Trash2, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const NewsListPage = () => {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    loadArticles();
  }, []);

  const loadArticles = () => {
    const allArticles = newsService.getAll();
    setArticles(allArticles);
  };

  const handleDelete = () => {
    if (deleteId) {
      const success = newsService.delete(deleteId);
      if (success) {
        toast({
          title: "Sucesso",
          description: "Notícia eliminada com sucesso",
        });
        loadArticles();
      }
      setDeleteId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display text-primary mb-2">Notícias</h1>
          <p className="text-muted-foreground">Gerir artigos e notícias do site</p>
        </div>
        <Button asChild className="btn-primary">
          <Link to="/admin/news/new">
            <Plus className="w-4 h-4 mr-2" />
            Nova Notícia
          </Link>
        </Button>
      </div>

      {articles.length === 0 ? (
        <div className="text-center py-12 border rounded-lg">
          <p className="text-muted-foreground mb-4">Nenhuma notícia criada ainda</p>
          <Button asChild variant="outline">
            <Link to="/admin/news/new">Criar primeira notícia</Link>
          </Button>
        </div>
      ) : (
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Título</TableHead>
                <TableHead>Categoria</TableHead>
                <TableHead>Data</TableHead>
                <TableHead>Autor</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {articles.map((article) => (
                <TableRow key={article.id}>
                  <TableCell className="font-medium">{article.title}</TableCell>
                  <TableCell>
                    {article.category && (
                      <Badge variant="secondary">{article.category}</Badge>
                    )}
                  </TableCell>
                  <TableCell>{article.date}</TableCell>
                  <TableCell>{article.author || "-"}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        asChild
                      >
                        <Link to={`/noticias/${article.slug}`} target="_blank">
                          <Eye className="w-4 h-4" />
                        </Link>
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        asChild
                      >
                        <Link to={`/admin/news/${article.id}/edit`}>
                          <Pencil className="w-4 h-4" />
                        </Link>
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setDeleteId(article.id)}
                      >
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Eliminar Notícia?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta ação não pode ser desfeita. A notícia será permanentemente eliminada.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive">
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default NewsListPage;

