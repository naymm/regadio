import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";
import project4 from "@/assets/project-4.jpg";
import project5 from "@/assets/project-5.jpg";
import project6 from "@/assets/project-6.jpg";

const projects = [
  { image: project1, title: "Complexo Residencial Luanda Sul", category: "Habitação" },
  { image: project2, title: "Via Expressa Regional", category: "Infraestrutura" },
  { image: project3, title: "Centro Administrativo", category: "Edifícios Públicos" },
  { image: project4, title: "Sistema de Abastecimento de Água", category: "Saneamento" },
  { image: project5, title: "Ponte Sobre o Rio Kwanza", category: "Pontes" },
  { image: project6, title: "Inauguração Cidade Nova Esperança", category: "Mega-Projecto" },
];

const Projects = () => {
  return (
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
  );
};

export default Projects;
