import { useState } from "react";
import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";
import project4 from "@/assets/project-4.jpg";
import project5 from "@/assets/project-5.jpg";
import project6 from "@/assets/project-6.jpg";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { X, MapPin, Calendar, Building2 } from "lucide-react";

interface Project {
  image: string;
  images?: string[];
  title: string;
  category: string;
  location?: string;
  description: string;
  status?: string;
  year?: string;
  scope?: string;
}

const projects: Project[] = [
  {
    image: project1,
    images: [project1, project2, project3],
    title: "Complexo Residencial Luanda Sul",
    category: "Habitação",
    location: "Luanda, Angola",
    description: "Um complexo residencial moderno que oferece habitação de qualidade para mais de 5.000 famílias. O projeto inclui unidades residenciais, áreas comerciais, espaços verdes e infraestruturas completas de apoio.",
    status: "Em execução",
    year: "2023-2026",
    scope: "2.500 habitações • 15 hectares"
  },
  {
    image: project2,
    images: [project2, project1, project4],
    title: "Via Expressa Regional",
    category: "Infraestrutura",
    location: "Benguela, Angola",
    description: "Infraestrutura rodoviária de alta capacidade que conecta as principais cidades da região, melhorando a mobilidade e facilitando o transporte de mercadorias. A via inclui pontes, túneis e sistemas de sinalização inteligente.",
    status: "Concluído",
    year: "2021-2024",
    scope: "120 km de vias • 8 pontes"
  },
  {
    image: project3,
    images: [project3, project5, project6],
    title: "Centro Administrativo",
    category: "Edifícios Públicos",
    location: "Huambo, Angola",
    description: "Edifício administrativo moderno que centraliza os serviços públicos da província. O projeto incorpora tecnologias sustentáveis e espaços flexíveis para acomodar diferentes departamentos governamentais.",
    status: "Em execução",
    year: "2024-2026",
    scope: "25.000 m² • 12 pisos"
  },
  {
    image: project4,
    images: [project4, project1, project2],
    title: "Sistema de Abastecimento de Água",
    category: "Saneamento",
    location: "Lubango, Angola",
    description: "Sistema completo de abastecimento de água potável que serve mais de 200.000 habitantes. Inclui estações de tratamento, reservatórios, rede de distribuição e sistemas de monitorização em tempo real.",
    status: "Concluído",
    year: "2020-2023",
    scope: "200.000 habitantes • 150 km de rede"
  },
  {
    image: project5,
    images: [project5, project3, project6],
    title: "Ponte Sobre o Rio Kwanza",
    category: "Pontes",
    location: "Kwanza Sul, Angola",
    description: "Ponte de grande vão que cruza o Rio Kwanza, facilitando a ligação entre as províncias do norte e sul. A estrutura utiliza tecnologia de pontes suspensas e foi projetada para suportar tráfego pesado.",
    status: "Concluído",
    year: "2022-2024",
    scope: "850 metros • 4 faixas"
  },
  {
    image: project6,
    images: [project6, project1, project4, project5],
    title: "Inauguração Cidade Nova Esperança",
    category: "Mega-Projecto",
    location: "Huambo, Angola",
    description: "Cidade planeada do zero com foco em sustentabilidade e qualidade de vida. O projeto inclui habitação, infraestruturas, equipamentos públicos, espaços comerciais e áreas verdes, criando uma comunidade completa e autossuficiente.",
    status: "Em execução",
    year: "2023-2028",
    scope: "4.500 hectares • 12.000 habitações"
  },
];

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setSelectedImageIndex(0);
  };

  const handleClose = () => {
    setSelectedProject(null);
    setSelectedImageIndex(0);
  };

  const nextImage = () => {
    if (selectedProject?.images) {
      setSelectedImageIndex((prev) => (prev + 1) % selectedProject.images!.length);
    }
  };

  const prevImage = () => {
    if (selectedProject?.images) {
      setSelectedImageIndex((prev) => (prev - 1 + selectedProject.images!.length) % selectedProject.images!.length);
    }
  };

  return (
    <>
      <section className="section-padding bg-background">
        <div className="container mx-auto container-padding">
          <div className="text-center mb-16">
            <p className="text-accent font-semibold mb-3 tracking-wide uppercase">Actividades Recentes</p>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-primary font-display">
              Projectos em Destaque
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Transformando comunidades através de infraestruturas de excelência
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div
                key={index}
                onClick={() => handleProjectClick(project)}
                className="group relative overflow-hidden rounded-2xl cursor-pointer card-hover"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform">
                  <span className="inline-block px-3 py-1 bg-accent rounded-full text-xs font-semibold mb-3">
                    {project.category}
                  </span>
                  <h3 className="text-xl font-bold font-display">
                    {project.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Dialog open={selectedProject !== null} onOpenChange={handleClose}>
        <DialogContent className="max-w-5xl max-h-[90vh] p-0 flex flex-col">
          {selectedProject && (
            <>
              <DialogHeader className="p-6 pb-4 flex-shrink-0">
                <DialogTitle className="text-3xl font-display text-primary">
                  {selectedProject.title}
                </DialogTitle>
              </DialogHeader>

              <div className="relative flex-shrink-0">
                {/* Galeria de imagens principal */}
                <div className="relative w-full h-[400px] bg-secondary overflow-hidden">
                  {selectedProject.images && selectedProject.images.length > 0 ? (
                    <>
                      <img
                        src={selectedProject.images[selectedImageIndex]}
                        alt={selectedProject.title}
                        className="w-full h-full object-cover"
                      />
                      {selectedProject.images.length > 1 && (
                        <>
                          <button
                            onClick={prevImage}
                            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                            aria-label="Imagem anterior"
                          >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                          </button>
                          <button
                            onClick={nextImage}
                            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                            aria-label="Próxima imagem"
                          >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </button>
                          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                            {selectedProject.images.map((_, idx) => (
                              <button
                                key={idx}
                                onClick={() => setSelectedImageIndex(idx)}
                                className={`w-2 h-2 rounded-full transition-all ${
                                  idx === selectedImageIndex ? "bg-white w-8" : "bg-white/50"
                                }`}
                                aria-label={`Ver imagem ${idx + 1}`}
                              />
                            ))}
                          </div>
                        </>
                      )}
                    </>
                  ) : (
                    <img
                      src={selectedProject.image}
                      alt={selectedProject.title}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>

                {/* Miniaturas das imagens */}
                {selectedProject.images && selectedProject.images.length > 1 && (
                  <div className="p-4 bg-secondary/50 flex gap-2 overflow-x-auto">
                    {selectedProject.images.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedImageIndex(idx)}
                        className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                          idx === selectedImageIndex ? "border-accent" : "border-transparent opacity-60 hover:opacity-100"
                        }`}
                      >
                        <img
                          src={img}
                          alt={`${selectedProject.title} - Imagem ${idx + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="p-6 space-y-6 overflow-y-auto flex-1">
                {/* Informações do projeto */}
                <div className="flex flex-wrap gap-4">
                  {selectedProject.location && (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="w-5 h-5 text-accent" />
                      <span>{selectedProject.location}</span>
                    </div>
                  )}
                  {selectedProject.status && (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Building2 className="w-5 h-5 text-accent" />
                      <span>{selectedProject.status}</span>
                    </div>
                  )}
                  {selectedProject.year && (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="w-5 h-5 text-accent" />
                      <span>{selectedProject.year}</span>
                    </div>
                  )}
                </div>

                {selectedProject.scope && (
                  <div className="p-4 bg-accent/10 rounded-lg border border-accent/20">
                    <p className="text-primary font-semibold">{selectedProject.scope}</p>
                  </div>
                )}

                {/* Descrição */}
                <div>
                  <h3 className="text-xl font-display text-primary mb-3">Sobre o Projecto</h3>
                  <p className="text-muted-foreground leading-relaxed text-lg">
                    {selectedProject.description}
                  </p>
                </div>

                {/* Categoria */}
                <div>
                  <span className="inline-block px-4 py-2 bg-accent/20 text-accent rounded-full font-semibold">
                    {selectedProject.category}
                  </span>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Projects;
