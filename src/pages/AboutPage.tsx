import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import About from "@/components/About";
import Stats from "@/components/Stats";
import Vision from "@/components/Vision";
import Certifications from "@/components/Certifications";
import PageHero from "@/components/PageHero";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Building2, ShieldCheck, Users2, Target, LineChart, Gavel, ScrollText } from "lucide-react";

const values = [
  {
    icon: Target,
    title: "Foco no Impacto",
    description: "Cada projecto é desenhado para acelerar o desenvolvimento socioeconómico das comunidades."
  },
  {
    icon: ShieldCheck,
    title: "Governança Sólida",
    description: "Compliance robusto alinhado com os requisitos de bancos multilaterais e fundos globais."
  },
  {
    icon: Users2,
    title: "Equipa Multidisciplinar",
    description: "Especialistas internacionais em planeamento urbano, engenharia e operação de infraestruturas."
  },
  {
    icon: LineChart,
    title: "Eficiência Operacional",
    description: "Metodologias ágeis e indicadores de desempenho em tempo real para decisões informadas."
  },
];

const governancePillars = [
  {
    icon: Building2,
    title: "Modelo Corporativo",
    description: "Estrutura societária transparente com auditorias independentes e relatórios trimestrais."
  },
  {
    icon: Gavel,
    title: "Compliance & ESG",
    description: "Políticas de ética, anticorrupção e sustentabilidade ambiental aplicadas em todas as operações."
  },
  {
    icon: ScrollText,
    title: "Contratos & Parcerias",
    description: "Gestão documental digital, rastreável e acessível a investidores e entidades reguladoras."
  },
];

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <PageHero
          title="Quem Somos"
          description="Somos uma plataforma africana de engenharia e construção que integra planeamento urbano, produção industrial e gestão de projectos complexos para criar cidades resilientes."
          actions={
            <>
              <Button className="btn-primary" asChild>
                <Link to="/contactos">Fale com a nossa equipa</Link>
              </Button>
            </>
          }
        />

        <About />
        <Stats />

        <section className="section-padding bg-background">
          <div className="container mx-auto container-padding">
            <div className="text-center mb-12 max-w-3xl mx-auto">
              <p className="text-accent font-semibold mb-3 tracking-wide uppercase">Os Nossos Valores</p>
              <h2 className="text-4xl font-display text-primary mb-4">Cultura orientada para resultados</h2>
              <p className="text-lg text-muted-foreground">
                Operamos com rigor técnico, disciplina financeira e um compromisso inabalável com as comunidades onde actuamos.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {values.map((value) => (
                <div
                  key={value.title}
                  className="p-8 rounded-2xl border border-border bg-white shadow-sm card-hover flex gap-6"
                >
                  <value.icon className="w-12 h-12 text-accent flex-shrink-0" />
                  <div>
                    <h3 className="text-2xl font-display text-primary mb-3">{value.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section-padding bg-secondary">
          <div className="container mx-auto container-padding">
            <div className="grid md:grid-cols-2 gap-10 mb-12">
              <div>
                <p className="text-accent font-semibold mb-3 tracking-wide uppercase">Governança</p>
                <h2 className="text-4xl font-display text-primary mb-6">Arquitectura Corporativa</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Estruturamos a REGADIO para responder aos requisitos de diligência dos principais financiadores internacionais. Mantemos equipas dedicadas a compliance, ESG e auditoria, garantindo que cada projecto é rastreável e sustentável.
                </p>
              </div>
              <div className="bg-white rounded-2xl border border-border p-8 shadow-sm">
                <dl className="space-y-6">
                  {governancePillars.map((pillar) => (
                    <div key={pillar.title} className="flex gap-4">
                      <pillar.icon className="w-10 h-10 text-accent flex-shrink-0" />
                      <div>
                        <dt className="text-xl font-display text-primary">{pillar.title}</dt>
                        <dd className="text-muted-foreground">{pillar.description}</dd>
                      </div>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </section>

        <Vision />
        <Certifications />
      </main>
      <Footer />
    </div>
  );
};

export default AboutPage;

