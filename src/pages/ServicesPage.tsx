import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Services from "@/components/Services";
import Production from "@/components/Production";
import PageHero from "@/components/PageHero";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Compass, Ruler, HardHat, Settings2, Shield, PlugZap, Factory, Workflow } from "lucide-react";

const deliverySteps = [
  {
    icon: Compass,
    title: "Estudo & Planeamento",
    description: "Modelação territorial, estudos de impacto e arquitectura conceptual integrada."
  },
  {
    icon: Ruler,
    title: "Projecto Executivo",
    description: "Engenharia multidisciplinar, BIM e coordenação técnica completa."
  },
  {
    icon: HardHat,
    title: "Construção & Supervisão",
    description: "Equipas próprias, controlo de qualidade e reporting diário para clientes e financiadores."
  },
  {
    icon: Settings2,
    title: "Operação Assistida",
    description: "Comissionamento, formação de equipas locais e manutenção assistida."
  },
];

const serviceHighlights = [
  { icon: Shield, title: "Compliance Operacional", detail: "Protocolos ISO e auditorias independentes em todas as obras." },
  { icon: PlugZap, title: "Integração Industrial", detail: "Unidades próprias de betão, agregados e prefabricação para ganho de escala." },
  { icon: Factory, title: "Logística Controlada", detail: "Frota dedicada, rastreamento satélite e gestão centralizada de estaleiros." },
  { icon: Workflow, title: "Tecnologia & Dados", detail: "Planeamento em BIM 5D e dashboards de performance em tempo real." },
];

const ServicesPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <PageHero
          title="Engenharia completa, ponta a ponta"
          description="Operamos toda a cadeia de valor, da conceção ao comissionamento, com equipas especializadas e activos próprios que reduzem risco, prazos e custos."
          actions={
            <>
              <Button className="btn-primary" asChild>
                <Link to="/contactos">Solicitar proposta</Link>
              </Button>
            </>
          }
        />

        <Services />

        <section className="section-padding bg-secondary">
          <div className="container mx-auto container-padding">
            <div className="text-center mb-12 max-w-3xl mx-auto">
              <p className="text-accent font-semibold mb-3 tracking-wide uppercase">Metodologia</p>
              <h2 className="text-4xl font-display text-primary mb-4">Processo integrado de entrega</h2>
              <p className="text-lg text-muted-foreground">
                Estruturamos equipas dedicadas para cada fase, garantindo transição fluida entre engenharia, construção e operação.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {deliverySteps.map((step, index) => (
                <div
                  key={step.title}
                  className="relative p-8 bg-white rounded-2xl border border-border card-hover"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center text-accent text-2xl font-display">
                      {String(index + 1).padStart(2, "0")}
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <step.icon className="w-6 h-6 text-accent" />
                        <span className="text-sm uppercase tracking-widest text-muted-foreground">Fase {index + 1}</span>
                      </div>
                      <h3 className="text-2xl font-display text-primary mb-3">{step.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Production />

        <section className="section-padding bg-background">
          <div className="container mx-auto container-padding">
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              <div>
                <p className="text-accent font-semibold mb-3 tracking-wide uppercase">Diferenciadores</p>
                <h2 className="text-4xl font-display text-primary mb-4">Infraestrutura própria para escalar</h2>
                <p className="text-lg text-muted-foreground mb-6">
                  Reduzimos a dependência de terceiros com activos industriais próprios e tecnologia integrada, mantendo previsibilidade em projectos multi-anuais.
                </p>
                <Button size="lg" className="btn-secondary" asChild>
                  <Link to="/contactos">Marcar reunião técnica</Link>
                </Button>
              </div>
              <div className="grid sm:grid-cols-2 gap-6">
                {serviceHighlights.map((highlight) => (
                  <div
                    key={highlight.title}
                    className="p-6 rounded-2xl border border-border bg-white card-hover"
                  >
                    <highlight.icon className="w-10 h-10 text-accent mb-4" />
                    <h3 className="text-xl font-display text-primary mb-2">{highlight.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{highlight.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ServicesPage;

