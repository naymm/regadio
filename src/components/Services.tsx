import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Building, Hammer, FileText, Layers, ClipboardCheck, PenTool, Map, Dam } from "lucide-react";

const services = [
  {
    icon: Building,
    title: "Construção Civil",
    description: "Execução de obras residenciais, comerciais e industriais de grande escala"
  },
  {
    icon: Hammer,
    title: "Infraestruturas",
    description: "Pavimentação, drenagem, saneamento e redes de distribuição"
  },
  {
    icon: FileText,
    title: "Promoção de Betas",
    description: "Gestão de projectos, licenciamentos e documentação técnica"
  },
  {
    icon: Layers,
    title: "Promoção de Agregados",
    description: "Produção e fornecimento de materiais de construção"
  },
  {
    icon: ClipboardCheck,
    title: "Gestão de Projectos",
    description: "Planeamento, coordenação e fiscalização de obras"
  },
  {
    icon: PenTool,
    title: "Engenharia Civil",
    description: "Estudos, projectos e consultoria técnica especializada"
  },
  {
    icon: Map,
    title: "Infraestruturas Urbanas",
    description: "Desenvolvimento de cidades integradas e sustentáveis"
  },
  {
    icon: Dam,
    title: "Construção de Barragens",
    description: "Grandes obras hidráulicas e aproveitamento de recursos"
  },
];

const Services = () => {
  return (
    <section className="section-padding bg-background">
      <div className="container mx-auto container-padding">
        <div className="text-center mb-16">
          <p className="text-accent font-semibold mb-3 tracking-wide uppercase vermelho">Serviços</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-primary font-display">
            Soluções Completas de Engenharia
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Da conceção à entrega, oferecemos serviços integrados para mega-projectos de infraestrutura
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {services.map((service, index) => (
            <div 
              key={index}
              className="p-8 rounded-xl bg-card border border-border hover:border-accent/50 transition-all duration-300 card-hover group"
            >
              <div className="w-16 h-16 bg-accent/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors">
                <service.icon className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-primary font-display">
                {service.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button size="lg" className="btn-primary" asChild>
            <Link to="/servicos">Ver Todos os Serviços</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Services;
