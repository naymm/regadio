import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { NavLink as RouterNavLink } from "@/components/NavLink";
import logoBlack from "../img/logo-black.png";
import logoLight from "../img/logo-light.png";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Início", to: "/" },
    { label: "Sobre", to: "/sobre" },
    { label: "Serviços", to: "/servicos" },
    { label: "Projectos", to: "/projectos" },
    { label: "Notícias", to: "/noticias" },
    { label: "Contactos", to: "/contactos" },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? "bg-white shadow-lg py-4" : "bg-transparent py-6"
    }`}>
      <div className="container mx-auto container-padding">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <img
              src={isScrolled ? logoBlack : logoLight}
              alt="Regadio Engenharia & Construção"
              className="h-12 w-auto drop-shadow"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <RouterNavLink
                key={link.to}
                to={link.to}
                className={`font-medium transition-colors ${
                  isScrolled ? "text-foreground" : "text-white"
                }`}
                activeClassName="text-accent"
              >
                {link.label}
              </RouterNavLink>
            ))}
            <Button
              className={isScrolled ? "btn-primary" : "bg-accent hover:bg-orange-light text-white"}
              asChild
            >
              <Link to="/contactos">Fale Connosco</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className={`w-6 h-6 ${isScrolled ? "text-primary" : "text-white"}`} />
            ) : (
              <Menu className={`w-6 h-6 ${isScrolled ? "text-primary" : "text-white"}`} />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-6 pb-6 space-y-4 animate-fade-in">
            {navLinks.map((link) => (
              <RouterNavLink
                key={link.to}
                to={link.to}
                className={`block font-medium transition-colors ${
                  isScrolled ? "text-foreground" : "text-white"
                }`}
                activeClassName="text-accent"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </RouterNavLink>
            ))}
            <Button className="w-full btn-primary" asChild onClick={() => setIsMobileMenuOpen(false)}>
              <Link to="/contactos">Fale Connosco</Link>
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
