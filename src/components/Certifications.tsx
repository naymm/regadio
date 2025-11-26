import workerImage from "@/assets/worker-certification.jpg";
import iso9001 from "../img/certificados/ISO9001.png";
import iso14001 from "../img/certificados/ISO14001.png";
import iso45001 from "../img/certificados/ISO45001.png";
import leed from "../img/certificados/LEED.png";

const certifications = [
  { image: iso9001, title: "ISO 9001:2015", subtitle: "Gestão da Qualidade" },
  { image: iso14001, title: "ISO 14001:2015", subtitle: "Gestão Ambiental" },
  { image: iso45001, title: "ISO 45001:2018", subtitle: "Segurança no Trabalho" },
  { image: leed, title: "LEED", subtitle: "Práticas sustentáveis em construções" },
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
                  <div className="mb-4 flex items-center justify-center h-20">
                    <img
                      src={cert.image} 
                      alt={cert.title}
                      className="max-h-full max-w-full object-contain certificado"
                    />
                  </div>
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
