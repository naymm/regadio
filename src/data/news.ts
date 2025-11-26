import project1 from "@/assets/project-1.jpg";
import project3 from "@/assets/project-3.jpg";
import project6 from "@/assets/project-6.jpg";

export interface NewsArticle {
  id: string;
  slug: string;
  image: string;
  date: string;
  title: string;
  description: string;
  category?: string;
  content: string;
  author?: string;
  tags?: string[];
}

export const newsArticles: NewsArticle[] = [
  {
    id: "1",
    slug: "inauguracao-cidade-nova-esperanca",
    image: project6,
    date: "15 Nov 2025",
    title: "Inauguração da Cidade Nova Esperança",
    description: "Marco histórico com entrega de 5.000 habitações e infraestruturas completas para a comunidade.",
    category: "Projectos",
    author: "Equipa de Comunicação REGADIO",
    tags: ["Habitação", "Infraestrutura", "Desenvolvimento Urbano"],
    content: `
      <p class="lead">A REGADIO celebra um marco histórico com a inauguração oficial da Cidade Nova Esperança, um dos maiores projectos de desenvolvimento urbano integrado em Angola.</p>

      <h2>Entrega de 5.000 Habitações</h2>
      <p>O projecto, localizado em Huambo, representa um investimento significativo em habitação social e infraestruturas modernas. A primeira fase inclui a entrega de 5.000 unidades habitacionais, todas equipadas com infraestruturas básicas e espaços verdes.</p>

      <p>Cada habitação foi projectada com foco em sustentabilidade e eficiência energética, incorporando tecnologias solares e sistemas de gestão de água inteligentes. As unidades variam entre T2 e T4, adaptadas às necessidades de diferentes tipos de famílias.</p>

      <h2>Infraestruturas Completas</h2>
      <p>Para além das habitações, a Cidade Nova Esperança inclui:</p>
      <ul>
        <li>Sistema completo de abastecimento de água potável</li>
        <li>Rede de saneamento e tratamento de águas residuais</li>
        <li>Infraestrutura eléctrica com fontes renováveis</li>
        <li>Rede viária com 45 km de estradas pavimentadas</li>
        <li>3 escolas primárias e 1 escola secundária</li>
        <li>Centro de saúde com capacidade para 200 utentes/dia</li>
        <li>Áreas comerciais e espaços de lazer</li>
      </ul>

      <h2>Impacto na Comunidade</h2>
      <p>O projecto já beneficiou directamente mais de 20.000 pessoas, criando também centenas de postos de trabalho durante a fase de construção. A comunidade local foi envolvida em todas as etapas, desde o planeamento até à entrega final.</p>

      <p>O Presidente da REGADIO destacou: "Este projecto representa o nosso compromisso com o desenvolvimento sustentável e a melhoria da qualidade de vida das comunidades angolanas. A Cidade Nova Esperança é um modelo que replicaremos noutras províncias."</p>

      <h2>Próximas Fases</h2>
      <p>A segunda fase do projecto, já em planeamento, incluirá mais 7.000 habitações e infraestruturas adicionais, incluindo um centro desportivo, biblioteca municipal e parque industrial para pequenas e médias empresas.</p>

      <p>A REGADIO continua comprometida com a execução de projectos que transformam comunidades e criam oportunidades de crescimento económico e social.</p>
    `
  },
  {
    id: "2",
    slug: "parceria-banco-africano-desenvolvimento",
    image: project3,
    date: "08 Nov 2025",
    title: "Parceria com Banco Africano de Desenvolvimento",
    description: "Financiamento aprovado para novo mega-projecto de desenvolvimento urbano sustentável.",
    category: "Parcerias",
    author: "Equipa de Comunicação REGADIO",
    tags: ["Financiamento", "Desenvolvimento Sustentável", "Parcerias"],
    content: `
      <p class="lead">A REGADIO anuncia uma parceria estratégica com o Banco Africano de Desenvolvimento (BAD) para financiar um novo mega-projecto de desenvolvimento urbano sustentável em Angola.</p>

      <h2>Financiamento Aprovado</h2>
      <p>O acordo, no valor de 250 milhões de dólares, permitirá à REGADIO avançar com um projecto inovador que combina habitação social, infraestruturas verdes e soluções de energia renovável. Este é um dos maiores financiamentos aprovados pelo BAD para desenvolvimento urbano em África Central.</p>

      <p>O financiamento será utilizado para:</p>
      <ul>
        <li>Desenvolvimento de 15.000 unidades habitacionais</li>
        <li>Implementação de sistemas de energia solar distribuída</li>
        <li>Criação de infraestruturas de água e saneamento sustentáveis</li>
        <li>Desenvolvimento de espaços verdes e corredores ecológicos</li>
        <li>Construção de equipamentos públicos e comunitários</li>
      </ul>

      <h2>Foco em Sustentabilidade</h2>
      <p>O projecto destaca-se pelo seu compromisso com a sustentabilidade ambiental. Todas as habitações serão equipadas com painéis solares, sistemas de recolha de água da chuva e tecnologias de eficiência energética.</p>

      <p>O Director Regional do BAD para África Central comentou: "Este projecto alinha-se perfeitamente com a nossa estratégia de desenvolvimento urbano sustentável. A REGADIO demonstrou capacidade técnica e compromisso com práticas ambientais responsáveis."</p>

      <h2>Impacto Esperado</h2>
      <p>O projecto irá beneficiar directamente mais de 60.000 pessoas e criar aproximadamente 3.000 postos de trabalho durante a fase de construção. Além disso, espera-se que o projecto reduza as emissões de carbono em 40% comparativamente a projectos tradicionais.</p>

      <h2>Próximos Passos</h2>
      <p>A fase de planeamento detalhado já está em curso, com início das obras previsto para o primeiro trimestre de 2026. A REGADIO trabalhará em estreita colaboração com o BAD e autoridades locais para garantir a execução eficiente e transparente do projecto.</p>

      <p>Esta parceria reforça a posição da REGADIO como líder em desenvolvimento urbano sustentável em África e abre portas para futuras colaborações com instituições financeiras internacionais.</p>
    `
  },
  {
    id: "3",
    slug: "premio-excelencia-construcao-2025",
    image: project1,
    date: "01 Nov 2025",
    title: "Prémio de Excelência em Construção 2025",
    description: "REGADIO reconhecida pela qualidade e inovação nos projectos de infraestrutura em África.",
    category: "Reconhecimentos",
    author: "Equipa de Comunicação REGADIO",
    tags: ["Prémios", "Qualidade", "Inovação"],
    content: `
      <p class="lead">A REGADIO foi distinguida com o Prémio de Excelência em Construção 2025, reconhecendo a qualidade, inovação e impacto social dos seus projectos de infraestrutura em África.</p>

      <h2>Reconhecimento Internacional</h2>
      <p>O prémio, atribuído pela Federação Internacional de Engenharia e Construção, reconhece projectos que se destacam pela excelência técnica, inovação e contribuição para o desenvolvimento sustentável.</p>

      <p>A REGADIO foi premiada especificamente pelo projecto "Complexo Residencial Luanda Sul", que demonstrou:</p>
      <ul>
        <li>Excelência em design e planeamento urbano</li>
        <li>Inovação tecnológica na construção</li>
        <li>Compromisso com sustentabilidade ambiental</li>
        <li>Impacto social positivo nas comunidades</li>
        <li>Gestão eficiente de recursos e prazos</li>
      </ul>

      <h2>Inovação e Qualidade</h2>
      <p>O projecto premiado destacou-se pela utilização de tecnologias BIM (Building Information Modeling), sistemas de construção modular e integração de soluções de energia renovável. Estas inovações permitiram reduzir o tempo de construção em 30% e os custos em 15%, mantendo os mais altos padrões de qualidade.</p>

      <p>O CEO da REGADIO expressou: "Este prémio é um reconhecimento do trabalho árduo da nossa equipa e do nosso compromisso com a excelência. Estamos orgulhosos de ser reconhecidos internacionalmente e continuaremos a estabelecer novos padrões na indústria."</p>

      <h2>Impacto no Sector</h2>
      <p>Este reconhecimento posiciona a REGADIO como referência em desenvolvimento urbano sustentável em África. O prémio também valida a estratégia da empresa de investir em tecnologia, formação de equipas e práticas de construção inovadoras.</p>

      <h2>Compromisso Contínuo</h2>
      <p>A REGADIO compromete-se a continuar a aplicar os mais altos padrões de qualidade em todos os seus projectos. Este prémio serve como motivação para continuar a inovar e a contribuir para o desenvolvimento sustentável de cidades africanas.</p>

      <p>O prémio será entregue numa cerimónia oficial que terá lugar em Janeiro de 2026, em Genebra, Suíça, onde a REGADIO partilhará as melhores práticas com outros líderes da indústria.</p>
    `
  },
];

export const getNewsBySlug = (slug: string): NewsArticle | undefined => {
  return newsArticles.find(article => article.slug === slug);
};

export const getNewsById = (id: string): NewsArticle | undefined => {
  return newsArticles.find(article => article.id === id);
};



