import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Crosshair, Cpu, Briefcase, Zap } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 px-6 py-3 flex items-center justify-between min-w-[300px] w-full max-w-2xl ${
        scrolled ? 'glass-nav text-foreground' : 'text-foreground'
      }`}
    >
      <div className="font-heading font-black tracking-tighter text-xl">BOLD NEXT</div>
      <div className="hidden md:flex gap-6 font-mono text-sm font-bold">
        <a href="#features" className="hover:text-accent transition-colors">AQUISIÇÃO</a>
        <a href="#philosophy" className="hover:text-accent transition-colors">SISTEMAS</a>
        <a href="#pricing" className="hover:text-accent transition-colors">ACESSO</a>
      </div>
      <button className="bg-accent text-accent-foreground px-4 py-2 rounded-full font-bold text-sm flex items-center gap-2 btn-magnetic">
        BOARDING <ArrowRight size={16} />
      </button>
    </nav>
  );
}

function Hero() {
  const comp = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from('.hero-text', {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: 'power3.out',
        delay: 0.2
      });
    }, comp);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={comp} className="min-h-svh flex items-end pb-24 px-6 md:px-12 relative overflow-hidden">
      {/* Background Graphic Context */}
      <div className="absolute top-0 right-0 w-2/3 h-full opacity-10 pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(circle at center, #111 2px, transparent 2px)', backgroundSize: '24px 24px' }} />
      
      <div className="relative z-10 w-full max-w-5xl">
        <h1 className="text-5xl md:text-8xl lg:text-[7rem] leading-[0.9] flex flex-col gap-2">
          <span className="hero-text font-heading font-bold uppercase tracking-tighter">Aceleração Brutal</span>
          <span className="hero-text font-drama lowercase text-accent">e Engenharia de Aquisição.</span>
        </h1>
        <p className="hero-text mt-8 max-w-xl text-lg font-mono">
          A maioria das agências vende likes. Nós desenhamos sistemas de infraestrutura e receita de alta frequência para negócios B2B que não toleram mediocridade.
        </p>
        <div className="hero-text mt-12 flex gap-4">
          <button className="bg-accent text-accent-foreground px-8 py-4 rounded-full font-bold text-lg flex items-center gap-2 btn-magnetic">
            INICIAR PROTOCOLO <Zap size={20} />
          </button>
          <button className="border-2 border-border text-foreground px-8 py-4 rounded-full font-bold text-lg flex items-center gap-2 btn-magnetic">
            SISTEMA OPERACIONAL
          </button>
        </div>
      </div>
    </section>
  );
}

function FeatureCards() {
  const comp = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from('.feature-card', {
        scrollTrigger: {
          trigger: comp.current,
          start: 'top 70%',
        },
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out'
      });
    }, comp);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={comp} id="features" className="py-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        <h2 className="text-4xl md:text-6xl uppercase tracking-tighter">
          Artefatos <span className="font-drama text-accent lowercase">funcionais</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="feature-card brutalist-card p-8 min-h-[300px] flex flex-col justify-between">
            <div>
              <Crosshair className="text-accent mb-6" size={40} />
              <h3 className="text-2xl font-bold uppercase mb-2">Engenharia de Aquisição</h3>
              <p className="font-mono text-sm opacity-80">Tráfego de precisão guiado por machine learning, caçando ICPs reais e não curiosos.</p>
            </div>
            <div className="mt-8 pt-4 border-t-2 border-border/10 font-mono text-xs font-bold text-accent">
              STATUS: ATIVO [████████--]
            </div>
          </div>
          
          <div className="feature-card brutalist-card p-8 min-h-[300px] flex flex-col justify-between">
            <div>
              <Briefcase className="text-accent mb-6" size={40} />
              <h3 className="text-2xl font-bold uppercase mb-2">Estruturas Cinemáticas</h3>
              <p className="font-mono text-sm opacity-80">Landing pages 1:1 Pixel-Perfect focadas na pureza da conversão bruta e usabilidade imersiva.</p>
            </div>
            <div className="mt-8 pt-4 border-t-2 border-border/10">
              <div className="w-full bg-border h-4 rounded-full overflow-hidden">
                <div className="bg-accent h-full w-[85%]" />
              </div>
            </div>
          </div>

          <div className="feature-card brutalist-card p-8 min-h-[300px] flex flex-col justify-between">
            <div>
              <Cpu className="text-accent mb-6" size={40} />
              <h3 className="text-2xl font-bold uppercase mb-2">Escala via Inteligência</h3>
              <p className="font-mono text-sm opacity-80">Voice-bots e AI-Chatbots operando o pré-vendas e follow-ups em seu CRM 24/7 sem descanso.</p>
            </div>
            <div className="mt-8 flex gap-2">
              <div className="w-3 h-3 rounded-full bg-accent animate-pulse" />
              <span className="font-mono text-xs font-bold opacity-80">SYSTEM.OPERATIONAL</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Philosophy() {
  const comp = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from('.philo-text', {
        scrollTrigger: {
          trigger: comp.current,
          start: 'top 60%',
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power2.out'
      });
    }, comp);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={comp} id="philosophy" className="py-32 px-6 md:px-12 bg-foreground text-background">
      <div className="max-w-5xl mx-auto flex flex-col justify-center items-center text-center">
        <p className="philo-text font-mono text-xl md:text-2xl opacity-60 mb-6 w-full text-left">
          A MAIORIA DA INDÚSTRIA FOCA EM: MÉTRICAS DE VAIDADE E COMMODITIES.
        </p>
        <p className="philo-text text-4xl md:text-7xl w-full text-left leading-[0.9]">
          <span className="font-heading font-black tracking-tighter uppercase">Nós focamos em </span>
          <br className="hidden md:block" />
          <span className="font-drama text-accent lowercase">infraestrutura de lucro escalável.</span>
        </p>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-foreground text-background pt-24 pb-12 px-6 md:px-12 rounded-t-[3rem] -mt-10 relative z-10 border-t-4 border-accent">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-background/20 pb-12 mb-12">
        <div className="col-span-1 md:col-span-2">
          <div className="font-heading font-black tracking-tighter text-4xl mb-4 text-primary">BOLD NEXT</div>
          <p className="font-mono text-sm opacity-70 max-w-sm">Engenharia de aquisição e UX Cinematográfico para operações B2B que buscam escala além do formato de agência comum.</p>
        </div>
        <div className="flex flex-col gap-4">
          <h4 className="font-bold uppercase tracking-widest text-sm text-accent">Navegação</h4>
          <a href="#" className="font-mono text-sm opacity-70 hover:opacity-100 transition-opacity">Manifesto</a>
          <a href="#" className="font-mono text-sm opacity-70 hover:opacity-100 transition-opacity">Artefatos</a>
          <a href="#" className="font-mono text-sm opacity-70 hover:opacity-100 transition-opacity">Protocolos</a>
        </div>
      </div>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 font-mono text-xs opacity-50">
        <div>© 2026 BOLD NEXT AGENCY. TODOS OS DIREITOS RESERVADOS.</div>
        <div className="flex items-center gap-2 text-accent">
          <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          SYSTEM OPERATIONAL
        </div>
      </div>
    </footer>
  );
}

function App() {
  return (
    <div className="font-sans text-foreground bg-primary selection:bg-accent selection:text-background min-h-screen flex flex-col">
      <Navbar />
      <Hero />
      <FeatureCards />
      <Philosophy />
      <Footer />
    </div>
  );
}

export default App;
