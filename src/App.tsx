import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/admin/ProtectedRoute";
import AdminLayout from "@/components/admin/AdminLayout";
import ScrollToTop from "@/components/ScrollToTop";
import Index from "./pages/Index";
import AboutPage from "./pages/AboutPage";
import ServicesPage from "./pages/ServicesPage";
import ProjectsPage from "./pages/ProjectsPage";
import NewsPage from "./pages/NewsPage";
import NewsDetailPage from "./pages/NewsDetailPage";
import ContactPage from "./pages/ContactPage";
import NotFound from "./pages/NotFound";
import LoginPage from "./pages/admin/LoginPage";
import DashboardPage from "./pages/admin/DashboardPage";
import NewsListPage from "./pages/admin/NewsListPage";
import NewsFormPage from "./pages/admin/NewsFormPage";
import ProjectsListPage from "./pages/admin/ProjectsListPage";
import ProjectsFormPage from "./pages/admin/ProjectsFormPage";
import SettingsPage from "./pages/admin/SettingsPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Index />} />
            <Route path="/sobre" element={<AboutPage />} />
            <Route path="/servicos" element={<ServicesPage />} />
            <Route path="/projectos" element={<ProjectsPage />} />
            <Route path="/noticias" element={<NewsPage />} />
            <Route path="/noticias/:slug" element={<NewsDetailPage />} />
            <Route path="/contactos" element={<ContactPage />} />

            {/* Admin Routes */}
            <Route path="/admin/login" element={<LoginPage />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminLayout>
                    <DashboardPage />
                  </AdminLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/news"
              element={
                <ProtectedRoute>
                  <AdminLayout>
                    <NewsListPage />
                  </AdminLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/news/new"
              element={
                <ProtectedRoute requiredPermission="write">
                  <AdminLayout>
                    <NewsFormPage />
                  </AdminLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/news/:id/edit"
              element={
                <ProtectedRoute requiredPermission="write">
                  <AdminLayout>
                    <NewsFormPage />
                  </AdminLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/projects"
              element={
                <ProtectedRoute>
                  <AdminLayout>
                    <ProjectsListPage />
                  </AdminLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/projects/new"
              element={
                <ProtectedRoute requiredPermission="write">
                  <AdminLayout>
                    <ProjectsFormPage />
                  </AdminLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/projects/:id/edit"
              element={
                <ProtectedRoute requiredPermission="write">
                  <AdminLayout>
                    <ProjectsFormPage />
                  </AdminLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/settings"
              element={
                <ProtectedRoute>
                  <AdminLayout>
                    <SettingsPage />
                  </AdminLayout>
                </ProtectedRoute>
              }
            />

            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
