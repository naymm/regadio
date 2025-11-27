import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { newsService, projectsService } from "@/services/dataService";
import { Newspaper, FolderKanban, Plus, TrendingUp, Archive } from "lucide-react";

const DashboardPage = () => {
  const [stats, setStats] = useState({
    news: { total: 0, published: 0, archived: 0 },
    projects: { total: 0, published: 0, archived: 0 },
  });

  useEffect(() => {
    const news = newsService.getAll();
    const projects = projectsService.getAll();

    setStats({
      news: {
        total: news.length,
        published: news.length, // News não tem status published ainda
        archived: 0,
      },
      projects: {
        total: projects.length,
        published: projects.filter((p) => p.published).length,
        archived: projects.filter((p) => p.archived).length,
      },
    });
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-display text-primary mb-2">Dashboard</h1>
        <p className="text-muted-foreground">Visão geral do conteúdo do site</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Notícias</CardTitle>
            <Newspaper className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.news.total}</div>
            <p className="text-xs text-muted-foreground">Artigos criados</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Projectos</CardTitle>
            <FolderKanban className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.projects.total}</div>
            <p className="text-xs text-muted-foreground">
              {stats.projects.published} publicados
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Projectos Publicados</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.projects.published}</div>
            <p className="text-xs text-muted-foreground">Em exibição</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Arquivados</CardTitle>
            <Archive className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.projects.archived}</div>
            <p className="text-xs text-muted-foreground">Projectos arquivados</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Notícias</CardTitle>
            <CardDescription>Gerir artigos e notícias do site</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button asChild className="w-full">
              <Link to="/admin/news">
                <Newspaper className="w-4 h-4 mr-2" />
                Ver Todas as Notícias
              </Link>
            </Button>
            <Button variant="outline" asChild className="w-full">
              <Link to="/admin/news/new">
                <Plus className="w-4 h-4 mr-2" />
                Nova Notícia
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Projectos</CardTitle>
            <CardDescription>Gerir projectos e portfólio</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button asChild className="w-full">
              <Link to="/admin/projects">
                <FolderKanban className="w-4 h-4 mr-2" />
                Ver Todos os Projectos
              </Link>
            </Button>
            <Button variant="outline" asChild className="w-full">
              <Link to="/admin/projects/new">
                <Plus className="w-4 h-4 mr-2" />
                Novo Projecto
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;




