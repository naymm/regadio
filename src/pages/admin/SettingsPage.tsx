import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { User, Shield } from "lucide-react";

const SettingsPage = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-display text-primary mb-2">Configurações</h1>
        <p className="text-muted-foreground">Gerir configurações do sistema</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <User className="w-5 h-5 text-accent" />
              <CardTitle>Informações da Conta</CardTitle>
            </div>
            <CardDescription>Dados do seu perfil de utilizador</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Nome</Label>
              <Input value={user?.name || ""} disabled />
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input value={user?.email || ""} disabled />
            </div>
            <div className="space-y-2">
              <Label>Função</Label>
              <Input value={user?.role || ""} disabled className="capitalize" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-accent" />
              <CardTitle>Segurança</CardTitle>
            </div>
            <CardDescription>Gerir segurança da conta</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Alterar Senha</Label>
              <Input type="password" placeholder="Nova senha" disabled />
              <p className="text-xs text-muted-foreground">
                Funcionalidade em desenvolvimento
              </p>
            </div>
            <Button variant="outline" disabled>
              Atualizar Senha
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Sobre o Sistema</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p><strong>Versão:</strong> 1.0.0</p>
            <p><strong>Ambiente:</strong> Desenvolvimento</p>
            <p className="pt-4">
              Este painel de administração permite gerir todo o conteúdo dinâmico do site,
              incluindo notícias, projectos e outras secções atualizáveis.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsPage;




