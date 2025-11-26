import { Building2, Construction, School, Droplets, Route, Factory, Truck, Mountain } from "lucide-react";

const capabilities = [
  { icon: Building2, title: "Cidades Integradas", count: "10.000+" },
  { icon: Construction, title: "Pontes e Viadutos", count: "50+" },
  { icon: School, title: "Edifícios Públicos", count: "100+" },
  { icon: Droplets, title: "Redes de Água", count: "1.000km" },
  { icon: Route, title: "Vias e Pavimentação", count: "2.000km" },
  { icon: Factory, title: "Centrais de Betão", count: "15" },
  { icon: Truck, title: "Maquinaria Pesada", count: "500+" },
  { icon: Mountain, title: "Agregados", count: "1M ton/ano" },
];

const Production = () => {
  return (
    <section className="section-padding bg-secondary">
      <div className="container mx-auto container-padding">
        <div className="text-center mb-16">
          <p className="text-accent font-semibold mb-3 tracking-wide uppercase">O Que Produzimos</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-primary font-display">
            Capacidades de Produção
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Infraestruturas críticas e desenvolvimento urbano de grande escala
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {capabilities.map((capability, index) => (
            <div 
              key={index}
              className="relative p-8 rounded-xl bg-white border-2 border-border hover:border-accent transition-all duration-300 card-hover overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
              <capability.icon className="w-12 h-12 text-accent mb-4 relative z-10" />
              <p className="text-3xl font-bold text-primary mb-2 font-display relative z-10">
                {capability.count}
              </p>
              <p className="text-sm text-muted-foreground font-medium relative z-10">
                {capability.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Production;
