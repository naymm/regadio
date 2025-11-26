import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { projectsService, Project } from "@/services/dataService";
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
import { Plus, Pencil, Trash2, Eye, CheckCircle2, Archive } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ProjectsListPage = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = () => {
    const allProjects = projectsService.getAll();
    setProjects(allProjects);
  };

  const handleDelete = () => {
    if (deleteId) {
      const success = projectsService.delete(deleteId);
      if (success) {
        toast({
          title: "Sucesso",
          description: "Projecto eliminado com sucesso",
        });
        loadProjects();
      }
      setDeleteId(null);
    }
  };

  const handlePublish = (id: string) => {
    const success = projectsService.publish(id);
    if (success) {
      toast({
        title: "Sucesso",
        description: "Projecto publicado com sucesso",
      });
      loadProjects();
    }
  };

  const handleArchive = (id: string) => {
    const success = projectsService.archive(id);
    if (success) {
      toast({
        title: "Sucesso",
        description: "Projecto arquivado com sucesso",
      });
      loadProjects();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display text-primary mb-2">Projectos</h1>
          <p className="text-muted-foreground">Gerir projectos e portfólio</p>
        </div>
        <Button asChild className="btn-primary">
          <Link to="/admin/projects/new">
            <Plus className="w-4 h-4 mr-2" />
            Novo Projecto
          </Link>
        </Button>
      </div>

      {projects.length === 0 ? (
        <div className="text-center py-12 border rounded-lg">
          <p className="text-muted-foreground mb-4">Nenhum projecto criado ainda</p>
          <Button asChild variant="outline">
            <Link to="/admin/projects/new">Criar primeiro projecto</Link>
          </Button>
        </div>
      ) : (
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Imagem</TableHead>
                <TableHead>Título</TableHead>
                <TableHead>Categoria</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Localização</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projects.map((project) => (
                <TableRow key={project.id}>
                  <TableCell>
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-16 h-16 object-cover rounded"
                    />
                  </TableCell>
                  <TableCell className="font-medium">{project.title}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{project.category}</Badge>
                  </TableCell>
                  <TableCell>
                    {project.published ? (
                      <Badge className="bg-green-500">Publicado</Badge>
                    ) : project.archived ? (
                      <Badge variant="outline">Arquivado</Badge>
                    ) : (
                      <Badge variant="secondary">Rascunho</Badge>
                    )}
                  </TableCell>
                  <TableCell>{project.location || "-"}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      {!project.published && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handlePublish(project.id)}
                          title="Publicar"
                        >
                          <CheckCircle2 className="w-4 h-4 text-green-600" />
                        </Button>
                      )}
                      {project.published && !project.archived && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleArchive(project.id)}
                          title="Arquivar"
                        >
                          <Archive className="w-4 h-4" />
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        asChild
                      >
                        <Link to={`/admin/projects/${project.id}/edit`}>
                          <Pencil className="w-4 h-4" />
                        </Link>
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setDeleteId(project.id)}
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
            <AlertDialogTitle>Eliminar Projecto?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta ação não pode ser desfeita. O projecto será permanentemente eliminado.
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

export default ProjectsListPage;



