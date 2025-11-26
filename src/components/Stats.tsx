import { Users, Building2, Route, Home, Award, Briefcase, Globe, CheckCircle } from "lucide-react";

const stats = [
  { icon: Users, value: "+100", label: "Colaboradores" },
  { icon: Building2, value: "1.500m²", label: "Construídos" },
  { icon: Route, value: "+100km", label: "Infraestrutura" },
  { icon: Home, value: "+79", label: "Obras Realizadas" },
  { icon: Award, value: "+7", label: "Anos de Experiência" },
  { icon: Briefcase, value: "+21", label: "Projectos em Curso" },
  { icon: Globe, value: "18", label: "Províncias" },
  { icon: CheckCircle, value: "+5", label: "Certificações em Curso" },
];

const Stats = () => {
  return (
    <section className="section-padding bg-primary text-white">
      <div className="container mx-auto container-padding">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 font-display">
            Fazemos Acontecer
          </h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Números que demonstram a nossa capacidade e compromisso com a excelência
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="text-center p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300 card-hover group"
            >
              <stat.icon className="w-12 vermelho h-12 mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <p className="text-4xl md:text-5xl font-bold mb-2 font-display branco">
                {stat.value}
              </p>
              <p className="text-white/70 text-sm uppercase tracking-wide">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
