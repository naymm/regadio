import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Building2, MapPin, Phone, Mail, Clock3, Send } from "lucide-react";

const offices = [
  {
    title: "Sede",
    address: "Rua Marechal Brós Tito, nº 35/37, Edifício ESCOM, 4º andar, Luanda – Angola",
  },

];

const supportChannels = [
  { icon: Phone, label: "Linha geral", detail: "+244 926 159 196" },
  { icon: Mail, label: "Propostas & parcerias", detail: "geral@regadio-ao.com" },
  { icon: Clock3, label: "Horário", detail: "Seg-Sex, 08h00 - 17h00" },
];

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <PageHero
          title="Fale connosco"
          description="Partilhe o contexto do seu projecto, solicite propostas técnicas ou marque uma reunião com a nossa equipa executiva."
        />

        <section className="section-padding bg-background">
          <div className="container mx-auto container-padding grid lg:grid-cols-2 gap-10">
            <div className="p-8 bg-white rounded-3xl border border-border shadow-sm">
              <h2 className="text-3xl font-display text-primary mb-6">Envie-nos uma mensagem</h2>
              <form className="space-y-5">
                <div className="grid md:grid-cols-2 gap-4">
                  <Input placeholder="Nome completo" required />
                  <Input type="email" placeholder="Email" required />
                </div>
                <Input placeholder="Empresa / Entidade" />
                <Input type="tel" placeholder="Contacto telefónico" />
                <Textarea placeholder="Descreva o projecto ou pedido" rows={5} required />
                <Button type="submit" size="lg" className="btn-primary w-full justify-center">
                  <Send className="w-5 h-5" />
                  Enviar mensagem
                </Button>
              </form>
              <p className="text-sm text-muted-foreground mt-4">
                Resposta em até 2 dias úteis. Informações tratadas com confidencialidade.
              </p>
            </div>

            <div className="space-y-8">
              <div className="p-8 rounded-3xl bg-primary text-white space-y-6">
                <div className="flex items-center gap-4">
                  <Building2 className="w-10 h-10 text-accent" />
                  <div>
                    <h3 className="text-2xl font-display">Escritórios</h3>
                    <p className="text-white/70">Disponíveis para reuniões presenciais.</p>
                  </div>
                </div>
                <div className="space-y-6">
                  {offices.map((office) => (
                    <div key={office.title} className="border-t border-white/10 pt-4">
                      <h4 className="text-lg font-semibold">{office.title}</h4>
                      <p className="text-white/80 flex items-start gap-2">
                        <MapPin className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                        {office.address}
                      </p>
                      <p className="text-white/80">{office.phone}</p>
                      <p className="text-white/80">{office.email}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-8 rounded-3xl bg-secondary border border-border">
                <h3 className="text-2xl font-display text-primary mb-4">Canais rápidos</h3>
                <ul className="space-y-4">
                  {supportChannels.map((channel) => (
                    <li key={channel.label} className="flex items-center gap-4">
                      <channel.icon className="w-10 h-10 text-accent" />
                      <div>
                        <p className="text-sm uppercase tracking-widest text-muted-foreground">{channel.label}</p>
                        <p className="text-lg text-primary">{channel.detail}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ContactPage;

