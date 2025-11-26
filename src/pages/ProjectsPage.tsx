import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Projects from "@/components/Projects";
import PageHero from "@/components/PageHero";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Map, Building2, Droplets, Route, ArrowUpRight, CalendarCheck } from "lucide-react";

const focusAreas = [
  { icon: Map, title: "Planos Diretores", description: "Masterplans completos com modelação urbana, mobilidade e clusters económicos." },
  { icon: Droplets, title: "Infraestruturas Críticas", description: "Sistemas de água, saneamento, energia e gestão de resíduos prontos a operar." },
  { icon: Route, title: "Conectividade", description: "Vias rápidas, BRT, corredores logísticos e integração com infra regional." },
  { icon: Building2, title: "Habitação", description: "Edifícios residenciais, equipamentos públicos e soluções mistas para 10k+ habitantes." },
];

const caseStudies = [
  {
    title: "Cidade Integrada Nova Esperança",
    location: "Huambo, Angola",
    scope: "4.500 ha • 12.000 habitações",
    status: "Em execução",
    highlight: "Modelo urbano resiliente focado em água e energia limpa."
  },
  {
    title: "Corredor Logístico Transfronteiriço",
    location: "Namíbia / Angola",
    scope: "820 km de infraestruturas",
    status: "Concluído",
    highlight: "Integração de porto seco, centro administrativo e parque industrial."
  },
  {
    title: "Plano Director Provincias do Sul",
    location: "Lubango, Angola",
    scope: "Planeamento estratégico para 3 capitais provinciais",
    status: "Estudos finalizados",
    highlight: "Metodologia BIM + SIG para reduzir em 30% o ciclo de aprovação."
  },
];

const ProjectsPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <PageHero
          kicker="Projectos"
          title="Portefólio de mega-projectos urbanos"
          description="Executamos programas multi-anuais com foco em acelerar a oferta habitacional e infraestruturas críticas para cidades emergentes em África."
          actions={
            <>
              <Button className="btn-primary" asChild>
                <Link to="/contactos">Agendar apresentação</Link>
              </Button>
              <Button variant="outline" className="border-white/30 text-white hover:bg-white/10" asChild>
                <Link to="/servicos">Conhecer entregáveis</Link>
              </Button>
            </>
          }
        />

        <section className="section-padding bg-background">
          <div className="container mx-auto container-padding">
            <div className="text-center mb-12 max-w-3xl mx-auto">
              <p className="text-accent font-semibold mb-3 tracking-wide uppercase">Especialização</p>
              <h2 className="text-4xl font-display text-primary mb-4">Áreas de actuação prioritárias</h2>
              <p className="text-lg text-muted-foreground">
                Trabalhamos com governos centrais, províncias e investidores privados para planear e construir infraestruturas essenciais.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {focusAreas.map((area) => (
                <div key={area.title} className="p-8 rounded-2xl border border-border bg-white card-hover">
                  <area.icon className="w-12 h-12 text-accent mb-4" />
                  <h3 className="text-2xl font-display text-primary mb-3">{area.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{area.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Projects />

        <section className="section-padding bg-secondary">
          <div className="container mx-auto container-padding">
            <div className="flex flex-col lg:flex-row gap-10 mb-12">
              <div className="flex-1">
                <p className="text-accent font-semibold mb-3 tracking-wide uppercase">Entrega</p>
                <h2 className="text-4xl font-display text-primary mb-4">Casos de estudo</h2>
                <p className="text-lg text-muted-foreground mb-6">
                  Seleccionámos projectos que representam diferentes escalas e desafios territoriais, todos com governança robusta e métricas claras.
                </p>
                <Button size="lg" className="btn-secondary" asChild>
                  <Link to="/contactos">Receber dossier completo</Link>
                </Button>
              </div>
              <div className="flex-1 space-y-6">
                {caseStudies.map((study) => (
                  <div key={study.title} className="p-6 rounded-2xl bg-white border border-border card-hover">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div>
                        <p className="text-sm uppercase tracking-widest text-muted-foreground">{study.location}</p>
                        <h3 className="text-2xl font-display text-primary">{study.title}</h3>
                      </div>
                      <span className="inline-flex items-center gap-2 text-accent font-semibold">
                        {study.status}
                        <ArrowUpRight className="w-4 h-4" />
                      </span>
                    </div>
                    <p className="text-muted-foreground mb-2">{study.scope}</p>
                    <p className="text-primary font-medium">{study.highlight}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-3xl border border-dashed border-accent/40 p-6 bg-white/80 flex flex-col md:flex-row items-center gap-6">
              <div className="flex items-center gap-4">
                <CalendarCheck className="w-12 h-12 text-accent" />
                <div>
                  <h4 className="text-xl font-display text-primary">Pipeline validado</h4>
                  <p className="text-muted-foreground">Mais de 2 mil ha em preparação para 2026-2028.</p>
                </div>
              </div>
              <Button className="btn-primary w-full md:w-auto" asChild>
                <Link to="/contactos">Marcar reunião com PMO</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ProjectsPage;

