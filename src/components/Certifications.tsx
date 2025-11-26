import { Award, CheckCircle2, Shield, Globe2 } from "lucide-react";
import workerImage from "@/assets/worker-certification.jpg";

const certifications = [
  { icon: Award, title: "ISO 9001:2015", subtitle: "Gestão da Qualidade" },
  { icon: Shield, title: "ISO 14001:2015", subtitle: "Gestão Ambiental" },
  { icon: CheckCircle2, title: "ISO 45001:2018", subtitle: "Segurança no Trabalho" },
  { icon: Globe2, title: "Compliance Internacional", subtitle: "Padrões Globais" },
];

const Certifications = () => {
  return (
    <section className="relative section-padding overflow-hidden bg-secondary">
      <div className="container mx-auto container-padding">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <p className="text-accent font-semibold mb-3 tracking-wide uppercase">Certificação</p>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-primary font-display">
              Excelência Certificada
            </h2>
            <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
              O nosso compromisso com a qualidade, segurança e sustentabilidade é reconhecido por certificações internacionais e auditado pelos mais rigorosos padrões da indústria.
            </p>

            <div className="grid sm:grid-cols-2 gap-6">
              {certifications.map((cert, index) => (
                <div 
                  key={index}
                  className="p-6 rounded-xl bg-white border border-border hover:border-accent transition-all duration-300 card-hover"
                >
                  <cert.icon className="w-10 h-10 text-accent mb-4" />
                  <h3 className="text-lg font-bold text-primary mb-1 font-display">
                    {cert.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {cert.subtitle}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="absolute -inset-4 bg-accent/10 rounded-2xl blur-2xl"></div>
            <img 
              src={workerImage}
              alt="Profissional em obra certificado"
              className="relative rounded-2xl shadow-2xl w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Certifications;
