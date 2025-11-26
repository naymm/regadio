import { Mail, Phone, MapPin, Facebook, Linkedin, Instagram, Twitter } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import logoLight from "@/img/logo-light.png";

const Footer = () => {
  return (
    <footer className="bg-navy-darker text-white">
      <div className="container mx-auto container-padding">
        {/* Main Footer */}
        <div className="py-16 grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <img
                src={logoLight}
                alt="Regadio Engenharia & Construção"
                className="h-16 w-auto"
              />
            </div>
            <p className="text-white/70 mb-6 leading-relaxed">
              Engenharia e Construção especializada em mega-projectos de desenvolvimento urbano e infraestruturas críticas em África.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-accent flex items-center justify-center transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-accent flex items-center justify-center transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-accent flex items-center justify-center transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-accent flex items-center justify-center transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-6 font-display">Links Úteis</h3>
            <ul className="space-y-3">
              {[
                { label: "Sobre Nós", to: "/sobre" },
                { label: "Serviços", to: "/servicos" },
                { label: "Projectos", to: "/projectos" },
                { label: "Notícias", to: "/noticias" },
                { label: "Carreiras", to: "#" },
                { label: "Contactos", to: "/contactos" },
              ].map((item) => (
                <li key={item.label}>
                  {item.to.startsWith("/") ? (
                    <Link to={item.to} className="text-white/70 hover:text-accent transition-colors">
                      {item.label}
                    </Link>
                  ) : (
                    <a href={item.to} className="text-white/70 hover:text-accent transition-colors">
                      {item.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-bold mb-6 font-display">Serviços</h3>
            <ul className="space-y-3">
              {["Construção Civil", "Infraestruturas", "Gestão de Projectos", "Engenharia Civil", "Infraestruturas Urbanas", "Consultoria"].map((service) => (
                <li key={service}>
                  <a href="#" className="text-white/70 hover:text-accent transition-colors">
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div>
            <h3 className="text-lg font-bold mb-6 font-display">Contacto</h3>
            <div className="space-y-4 mb-6">
              <div className="flex gap-3 text-white/70">
                <MapPin className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                <span>Luanda, Angola</span>
              </div>
              <div className="flex gap-3 text-white/70">
                <Phone className="w-5 h-5 text-accent flex-shrink-0" />
                <span>+244 xxx xxx xxx</span>
              </div>
              <div className="flex gap-3 text-white/70">
                <Mail className="w-5 h-5 text-accent flex-shrink-0" />
                <span>info@regadio.co.ao</span>
              </div>
            </div>
            
            <h4 className="font-semibold mb-3">Newsletter</h4>
            <div className="flex gap-2">
              <Input 
                type="email" 
                placeholder="O seu email" 
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
              />
              <Button size="icon" className="bg-accent hover:bg-orange-light flex-shrink-0">
                <Mail className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/60">
            <p>© 2025 REGADIO - Engenharia e Construção, S.A. Todos os direitos reservados.</p>
            <div className="flex gap-6">
                <a href="#" className="hover:text-accent transition-colors">Política de Privacidade</a>
                <a href="#" className="hover:text-accent transition-colors">Termos de Uso</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
