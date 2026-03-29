import { useEffect, useRef, useState, useCallback } from 'react';
import {
  Menu, X, ChevronRight, ArrowRight,
  MonitorSmartphone, Briefcase, Megaphone,
  TrendingUp, Bot, Share2, Layers, Search, Mail, Phone,
  Star, Plus, Minus, ShieldCheck, CheckCircle
} from 'lucide-react';


import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Radar, IconContainer } from './components/ui/radar-effect';
import { portfolioData, type Project } from './data/portfolio';
import { motion, AnimatePresence } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

// ─── 3D Tilt Card ──────────────────────────────────────────────────────────────
function TiltCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;
    el.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03,1.03,1.03)`;
    el.style.boxShadow = `0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(201,168,76,0.12), ${rotateY > 0 ? '-' : ''}4px 0 20px rgba(201,168,76,0.08)`;
  }, []);

  const handleMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)';
    el.style.boxShadow = '';
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transition: 'transform 0.15s ease, box-shadow 0.15s ease', transformStyle: 'preserve-3d' }}
    >
      {children}
    </div>
  );
}

// ─── Floating 3D Orb ───────────────────────────────────────────────────────────
function FloatingOrb({ size, color, top, left, delay }: { size: number; color: string; top: string; left: string; delay: number }) {
  return (
    <div
      className="absolute rounded-full pointer-events-none"
      style={{
        width: size, height: size,
        top, left,
        background: `radial-gradient(circle at 30% 30%, ${color}40, ${color}08 60%, transparent)`,
        filter: 'blur(40px)',
        animation: `floatOrb ${4 + delay}s ease-in-out infinite alternate`,
        animationDelay: `${delay}s`,
      }}
    />
  );
}

// ─── Main App ──────────────────────────────────────────────────────────────────
export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const comp = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.hero-anim',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.18, ease: 'power4.out', delay: 0.2 }
      );

      // 3D hero object
      gsap.fromTo('.hero-3d-obj',
        { rotateY: -20, rotateX: 10, opacity: 0, scale: 0.8 },
        { rotateY: 0, rotateX: 0, opacity: 1, scale: 1, duration: 1.4, ease: 'power3.out', delay: 0.5 }
      );
      gsap.to('.hero-3d-obj', {
        y: -14, rotateZ: 1.5,
        duration: 3.5, ease: 'sine.inOut',
        yoyo: true, repeat: -1, delay: 1.5
      });

      gsap.fromTo('.radar-text',
        { y: 30, opacity: 0 },
        { scrollTrigger: { trigger: '.radar-section', start: 'top 80%' },
          y: 0, opacity: 1, duration: 0.7, stagger: 0.12, ease: 'power3.out' }
      );

      gsap.fromTo('.svc-card',
        { y: 40, opacity: 0, rotateX: 10 },
        { scrollTrigger: { trigger: '.services-section', start: 'top 85%' },
          y: 0, opacity: 1, rotateX: 0, duration: 0.6, stagger: 0.07, ease: 'power3.out' }
      );

      gsap.fromTo('.step-item',
        { y: 30, opacity: 0 },
        { scrollTrigger: { trigger: '.process-section', start: 'top 80%' },
          y: 0, opacity: 1, duration: 0.6, stagger: 0.12, ease: 'power3.out' }
      );

      gsap.fromTo('.portfolio-card',
        { y: 30, opacity: 0 },
        { scrollTrigger: { trigger: '.portfolio-section', start: 'top 80%' },
          y: 0, opacity: 1, duration: 0.6, stagger: 0.12, ease: 'power3.out' }
      );

      gsap.fromTo('.testimonial-card',
        { y: 30, opacity: 0, rotateX: 6 },
        { scrollTrigger: { trigger: '.testimonials-section', start: 'top 80%' },
          y: 0, opacity: 1, rotateX: 0, duration: 0.7, stagger: 0.14, ease: 'power3.out' }
      );

      gsap.fromTo('.faq-item',
        { opacity: 0, x: -24 },
        { scrollTrigger: { trigger: '.faq-section', start: 'top 80%' },
          opacity: 1, x: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out' }
      );
    }, comp);
    return () => ctx.revert();
  }, []);



  const processSteps = [
    { 
      num: "01", 
      title: "O Diagnóstico Cirúrgico", 
      desc: "Nós olhamos para as métricas que geralmente são ignoradas. Encontramos por onde sua conversão está vazando e definimos a oferta exata de recuperação imediata para o seu momento.",
      tags: ["Audit", "GAPs", "ROI Setup"],
      icon: <Search className="w-5 h-5" />
    },
    { 
      num: "02", 
      title: "A Estratégia de Tração", 
      desc: "Planejamento reverso \"fim-a-fim\". Desenhamos a jornada lógica e emocional do seu futuro cliente: desde o impacto do primeiro anúncio invisível ao clique da compra.",
      tags: ["Funnel Map", "Neuro-Copy", "Offers"],
      icon: <Layers className="w-5 h-5" />
    },
    { 
      num: "03", 
      title: "A Execução Técnica", 
      desc: "O nosso esquadrão tático assume. Desenvolvemos criativos, instalamos traqueamento, levantamos páginas e ativamos automações completas. Você foca em operar; nós no volume.",
      tags: ["Dev Flow", "Ads Setup", "IA Agents"],
      icon: <Briefcase className="w-5 h-5" />
    },
    { 
      num: "04", 
      title: "A Escala de Caixa", 
      desc: "O teste do fogo. Baseado em captação real de dados iniciais, matamos as campanhas falhas, melhoramos o que perfoma e injetamos força total naquilo que traz lucro real.",
      tags: ["Scale Up", "LTV Focus", "Obsessive ROI"],
      icon: <TrendingUp className="w-5 h-5" />
    },
  ];


  const faqs = [
    { q: "Demora muito para eu ver resultados?", a: "Nosso foco é tração rápida. Campanhas de tráfego direto podem gerar os primeiros leads em 48 a 72 horas após ativadas. Projetos como SEO e Posicionamento levam mais tempo, mas o Funil entra em ação imediatamente." },
    { q: "A Bold Next atende empresas da minha cidade?", a: "Completamente. Nascemos no digital e já estruturamos máquinas de crescimento para negócios de ponta a ponta do Brasil. Seu cliente ideal está online, e nós sabemos como rastreá-lo." },
    { q: "Acho que só preciso de \"alguns posts\". Vocês fazem isso?", a: "Se você quer apenas posts bonitinhos para agradar o ego, talvez não sejamos para você. Se você quer conteúdos que atuem como 'anzóis' para trazer clientes reais e colocar dinheiro no caixa, então sim, é exatamente o que fazemos." },
    { q: "Qual o investimento necessário?", a: "Depende exclusivamente da Velocidade e do Escopo que vamos desenhar para você. Por isso nosso Diagnóstico é o primeiro passo absoluto. Agende o seu, não custa nada para entender." },
  ];

  return (
    <>
      {/* Global animation keyframes & fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Epilogue:wght@300;400;500;700;800;900&family=Manrope:wght@300;400;500;600;700&display=swap');

        @keyframes drawingLine {
          0%   { height: 0%; opacity: 0; }
          100% { height: 100%; opacity: 1; }
        }
        @keyframes orbit {
          from { transform: rotate(0deg) translateX(40px) rotate(0deg); }
          to   { transform: rotate(360deg) translateX(40px) rotate(-360deg); }
        }
        @keyframes strokeDash {
          to { stroke-dashoffset: 0; }
        }
        @keyframes marqueeScroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes pulseGoldGlow {
          0%   { box-shadow: 0 0 0 0 rgba(201, 168, 76, 0.4); }
          70%  { box-shadow: 0 0 0 20px rgba(201, 168, 76, 0); }
          100% { box-shadow: 0 0 0 0 rgba(201, 168, 76, 0); }
        }
        .btn-pulse {
          animation: pulseGoldGlow 2s infinite;
        }

        .font-epilogue { font-family: 'Epilogue', sans-serif; }
        .font-manrope  { font-family: 'Manrope', sans-serif; }

        .text-gold-gradient {
          background: linear-gradient(135deg, #FDE68A 0%, #C9A84C 45%, #E6C364 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 4s linear infinite;
        }

        .glass-card {
          background: rgba(35, 33, 47, 0.6);
          backdrop-filter: blur(28px);
          -webkit-backdrop-filter: blur(28px);
          border: 1px solid rgba(201,168,76,0.12);
        }

        .glass-card-dark {
          background: rgba(14, 14, 19, 0.75);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(201,168,76,0.1);
        }

        .btn-primary {
          background: linear-gradient(135deg, #C9A84C 0%, #E6C364 100%);
          color: #1a1500;
          font-weight: 700;
          font-family: 'Manrope', sans-serif;
          letter-spacing: 0.03em;
          transition: all 0.3s ease;
          box-shadow: 0 4px 20px rgba(201,168,76,0.25), inset 0 1px 0 rgba(255,255,255,0.2);
        }
        .btn-primary:hover {
          transform: translateY(-2px) scale(1.02);
          box-shadow: 0 8px 32px rgba(201,168,76,0.4), inset 0 1px 0 rgba(255,255,255,0.25);
        }

        .btn-ghost {
          border: 1px solid rgba(255,255,255,0.15);
          color: rgba(228,225,233,0.9);
          font-family: 'Manrope', sans-serif;
          transition: all 0.3s ease;
          background: transparent;
        }
        .btn-ghost:hover {
          background: rgba(201,168,76,0.08);
          border-color: rgba(201,168,76,0.3);
          color: #E6C364;
        }

        .svc-card-inner {
          background: #1f1f25;
          border: 1px solid rgba(77,70,55,0.25);
          border-radius: 1rem;
          transition: border-color 0.3s ease;
        }
        .svc-card-inner:hover {
          border-color: rgba(201,168,76,0.4);
        }

        /* 3D hero cube ─────────────────── */
        .cube-scene { perspective: 900px; }
        .cube {
          width: 180px; height: 180px;
          transform-style: preserve-3d;
          animation: rotateSlow 18s linear infinite;
        }
        .cube-face {
          position: absolute;
          width: 180px; height: 180px;
          border: 1px solid rgba(201,168,76,0.35);
          background: rgba(201,168,76,0.04);
          backdrop-filter: blur(4px);
          display: flex; align-items: center; justify-content: center;
        }
        .face-front  { transform: translateZ(90px); }
        .face-back   { transform: rotateY(180deg) translateZ(90px); }
        .face-left   { transform: rotateY(-90deg) translateZ(90px); }
        .face-right  { transform: rotateY(90deg) translateZ(90px); }
        .face-top    { transform: rotateX(90deg) translateZ(90px); }
        .face-bottom { transform: rotateX(-90deg) translateZ(90px); }

        /* New Premium Utilities */
        .glass-badge {
          background: rgba(14, 14, 19, 0.5);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(201,168,76,0.15);
          box-shadow: 0 10px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05);
        }
        .hero-glow {
          position: absolute;
          width: 80vw;
          height: 80vh;
          background: radial-gradient(ellipse at center, rgba(201,168,76,0.08) 0%, transparent 60%);
          filter: blur(80px);
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          pointer-events: none;
        }

        .bento-card {
          position: relative;
          background: rgba(14, 14, 19, 0.4);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(201,168,76,0.1);
          border-radius: 1.5rem;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        .bento-card:hover {
          transform: translateY(-4px);
          border-color: rgba(201,168,76,0.3);
          box-shadow: 0 20px 40px rgba(0,0,0,0.6), 0 0 40px rgba(201,168,76,0.1);
        }
        .bento-glow {
          position: absolute;
          width: 300px;
          height: 300px;
          background: radial-gradient(circle, rgba(201,168,76,0.15) 0%, transparent 60%);
          filter: blur(40px);
          border-radius: 50%;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.6s ease;
          mix-blend-mode: screen;
        }
        .bento-card:hover .bento-glow {
          opacity: 1;
        }

        /* Scrollbar */
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: #0A0A0F; }
        ::-webkit-scrollbar-thumb { background: #C9A84C; border-radius: 3px; }
      `}</style>

      <div
        ref={comp}
        className="min-h-screen overflow-x-hidden font-manrope"
        style={{ background: '#0A0A0F', color: '#E4E1E9' }}
      >

        {/* ── Navbar ─────────────────────────────────────────────────────── */}
        <nav
          className="fixed w-full z-50 transition-all duration-300"
          style={isScrolled
            ? { background: 'rgba(10,10,15,0.85)', backdropFilter: 'blur(24px)', borderBottom: '1px solid rgba(201,168,76,0.08)', padding: '14px 0' }
            : { background: 'transparent', padding: '24px 0' }
          }
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-10 flex justify-between items-center">
            <span className="text-2xl font-bold tracking-widest font-epilogue">
              <span className="text-gold-gradient font-light">BOLD</span>
              <span style={{ color: '#E4E1E9' }}>NEXT</span>
            </span>

            <div className="hidden md:flex space-x-8 text-sm font-medium" style={{ color: '#d0c5b2', letterSpacing: '0.04em' }}>
              {[['#solucoes','O Arsenal'],['#metodo','O Método'],['#cases','Resultados'],['#depoimentos','Tribu'],['#faq','F.A.Q.']].map(([href,label]) => (
                <a key={href} href={href} className="hover:text-[#E6C364] transition-colors duration-200">{label}</a>
              ))}
            </div>

            <div className="hidden md:flex">
              <button className="btn-primary px-6 py-2.5 rounded-md text-sm flex items-center gap-1.5">
                Agendar Call <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <button className="md:hidden" style={{ color: '#E4E1E9' }} onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {mobileMenuOpen && (
            <div className="absolute top-full left-0 w-full py-6 px-6 flex flex-col space-y-5 md:hidden"
              style={{ background: 'rgba(10,10,15,0.97)', borderTop: '1px solid rgba(201,168,76,0.08)' }}>
              {[['#solucoes','O Arsenal'],['#metodo','O Método'],['#cases','Resultados'],['#depoimentos','Tribu'],['#faq','F.A.Q.']].map(([href,label]) => (
                <a key={href} href={href} className="text-lg font-medium" style={{ color: '#d0c5b2' }} onClick={() => setMobileMenuOpen(false)}>{label}</a>
              ))}
              <button className="btn-primary w-full py-3 rounded-md text-sm mt-2">Agendar Call</button>
            </div>
          )}
        </nav>

        {/* ── Hero Premium ───────────────────────────────────────────────────────── */}
        <section className="relative min-h-[90vh] flex items-center justify-center pt-32 pb-20 px-6 overflow-hidden">
          {/* Ambient Glow & Orbs */}
          <div className="hero-glow" />
          <FloatingOrb size={500} color="#C9A84C" top="-10%" left="15%" delay={0} />
          <FloatingOrb size={400} color="#9ba8eb" top="40%" left="70%" delay={1.5} />
          <FloatingOrb size={600} color="#E6C364" top="80%" left="30%" delay={3} />

          {/* Grid lines micro-texture */}
          <div className="absolute inset-0 pointer-events-none" style={{ opacity: 0.04 }}>
            <div style={{
              backgroundImage: 'repeating-linear-gradient(0deg,rgba(201,168,76,1) 0,rgba(201,168,76,1) 1px,transparent 0,transparent 50%),repeating-linear-gradient(90deg,rgba(201,168,76,1) 0,rgba(201,168,76,1) 1px,transparent 0,transparent 50%)',
              backgroundSize: '80px 80px', width: '100%', height: '100%',
              maskImage: 'radial-gradient(ellipse at center, black 10%, transparent 80%)',
              WebkitMaskImage: 'radial-gradient(ellipse at center, black 10%, transparent 80%)'
            }} />
          </div>

          <div className="relative max-w-5xl mx-auto flex flex-col items-center text-center z-10">
            
            {/* Top Badge */}
            <div className="hero-anim mb-8 inline-flex items-center gap-2 px-5 py-2.5 rounded-full"
              style={{ border: '1px solid rgba(201,168,76,0.3)', background: 'rgba(201,168,76,0.08)', backdropFilter: 'blur(10px)' }}>
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E6C364] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-[#C9A84C]"></span>
              </span>
              <span className="text-xs font-bold tracking-[0.2em] uppercase font-manrope" style={{ color: '#E6C364' }}>
                Chega de Métricas de Vaidade
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="hero-anim font-epilogue text-5xl md:text-7xl lg:text-8xl font-black leading-[1.05] tracking-tight mb-8">
              Nós construímos <br className="hidden md:block" />
              <span className="text-gold-gradient italic font-epilogue">Máquinas de Lucro</span> B2B.
            </h1>

            {/* Subheadline */}
            <p className="hero-anim text-lg md:text-xl leading-relaxed mb-12 font-manrope" style={{ color: '#a09488', maxWidth: '680px' }}>
              Transformamos operações comerciais estagnadas em ecossistemas agressivos de alta conversão. Usamos inteligência artificial, tráfego de precisão e funis impossíveis de serem ignorados.
            </p>

            {/* CTAs */}
            <div className="hero-anim flex flex-col sm:flex-row gap-5 justify-center w-full sm:w-auto">
              <button className="btn-primary h-14 md:h-16 px-10 rounded-lg text-base md:text-lg font-manrope font-bold flex items-center justify-center gap-2 group">
                Agendar Diagnóstico C-Level
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="btn-ghost h-14 md:h-16 px-10 rounded-lg text-base md:text-lg flex items-center justify-center gap-2">
                Ver Casos de Sucesso
              </button>
            </div>

            {/* Floating Glass Badges (Parallax simulated in CSS or GSAP) */}
            <div className="hero-3d-obj absolute hidden lg:flex glass-badge rounded-2xl px-6 py-4 items-center gap-4" style={{ top: '20%', left: '-10%', transform: 'rotate(-4deg)' }}>
              <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: 'rgba(201,168,76,0.1)' }}>
                <TrendingUp className="w-6 h-6" style={{ color: '#C9A84C' }} />
              </div>
              <div className="text-left">
                <div className="text-xl font-black font-epilogue" style={{ color: '#E4E1E9' }}>ROAS +340%</div>
                <div className="text-xs font-manrope" style={{ color: '#a09488' }}>Escala Preditiva</div>
              </div>
            </div>

            <div className="hero-3d-obj absolute hidden lg:flex glass-badge rounded-2xl px-6 py-4 items-center gap-4" style={{ bottom: '15%', right: '-5%', transform: 'rotate(3deg)' }}>
              <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: 'rgba(201,168,76,0.1)' }}>
                <Bot className="w-6 h-6" style={{ color: '#C9A84C' }} />
              </div>
              <div className="text-left">
                <div className="text-xl font-black font-epilogue" style={{ color: '#E4E1E9' }}>+150 Leads/mês</div>
                <div className="text-xs font-manrope" style={{ color: '#a09488' }}>Automação IA</div>
              </div>
            </div>

          </div>
        </section>

        {/* ── Radar / Manifesto ──────────────────────────────────────────── */}
        <section className="radar-section relative py-24 px-6 overflow-hidden" style={{ background: '#111118', borderTop: '1px solid rgba(201,168,76,0.06)', borderBottom: '1px solid rgba(201,168,76,0.06)' }}>
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2 relative min-h-[380px] w-full flex items-center justify-center">
              <div className="relative flex w-full max-w-md flex-col items-center justify-center space-y-4 overflow-hidden px-4">
                <div className="mx-auto w-full">
                  <div className="flex w-full items-center justify-between">
                    <IconContainer text="Tráfego Pago" delay={0.2} icon={<Megaphone className="h-6 w-6 text-[#C9A84C]" />} />
                    <IconContainer delay={0.4} text="Sites" icon={<MonitorSmartphone className="h-6 w-6 text-[#C9A84C]" />} />
                    <IconContainer text="CRM" delay={0.3} icon={<Layers className="h-6 w-6 text-[#C9A84C]" />} />
                  </div>
                </div>
                <div className="mx-auto w-full max-w-[80%]">
                  <div className="flex w-full items-center justify-between">
                    <IconContainer text="SEO" delay={0.5} icon={<Search className="h-6 w-6 text-[#C9A84C]" />} />
                    <IconContainer text="Automação" delay={0.8} icon={<Bot className="h-6 w-6 text-[#C9A84C]" />} />
                  </div>
                </div>
                <div className="mx-auto w-full">
                  <div className="flex w-full items-center justify-between">
                    <IconContainer delay={0.6} text="GMB" icon={<Briefcase className="h-6 w-6 text-[#C9A84C]" />} />
                    <IconContainer delay={0.7} text="Social" icon={<Share2 className="h-6 w-6 text-[#C9A84C]" />} />
                  </div>
                </div>
                <Radar className="absolute -bottom-12" />
                <div className="absolute bottom-0 z-[41] h-px w-full" style={{ background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.4), transparent)' }} />
              </div>
            </div>

            <div className="lg:w-1/2 space-y-6">
              <span className="inline-block text-xs font-semibold tracking-widest uppercase font-manrope px-3 py-1 rounded-full" style={{ color: '#C9A84C', border: '1px solid rgba(201,168,76,0.2)', background: 'rgba(201,168,76,0.05)' }}>
                O SEU ECOSSISTEMA DIGITAL
              </span>
              <h2 className="radar-text font-epilogue text-3xl md:text-5xl font-black leading-tight">
                O seu <span className="text-gold-gradient">melhor cliente</span> já está com o{' '}
                cartão na mão. Ele só ainda não conseguiu te achar.
              </h2>
              <p className="radar-text leading-relaxed" style={{ color: '#a09488', fontSize: '1.05rem' }}>
                O problema raramente está no serviço ou produto que você vende. O problema é como ele está sendo empacotado no mercado digital.
                Nosso radar detecta cirurgicamente os "furos do balde" onde você está perdendo dinheiro hoje, constrói as pontes certas e posiciona ofertas irresistíveis (armadilhas éticas) exatamente onde seu cliente já está procurando.
              </p>
              <p className="radar-text leading-relaxed" style={{ color: '#a09488', fontSize: '1.05rem' }}>
                Sem "teste com o dinheiro do cliente", sem achismos. Nós usamos inteligência de dados para rastrear e dominar o topo do seu nicho, garantindo previsibilidade.
              </p>
            </div>
          </div>
        </section>

        {/* ── Services / Arsenal ─────────────────────────────────────────── */}
        <section id="solucoes" className="services-section relative py-24 px-6 overflow-hidden" style={{ background: '#0D0D11' }}>
          <FloatingOrb size={500} color="#C9A84C" top="20%" left="70%" delay={2} />

          <div className="max-w-7xl mx-auto relative z-10">
            {/* Header — título grande + linha gold = igual ao Stitch */}
            <div className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <div>
                <div className="w-10 h-0.5 mb-5" style={{ background: '#C9A84C' }} />
                <h2 className="font-epilogue text-5xl md:text-7xl font-black leading-none tracking-tight">
                  O nosso Arsenal de Escala.
                </h2>
                <p className="mt-4 font-manrope max-w-md" style={{ color: '#a09488', fontSize: '1rem', lineHeight: 1.7 }}>
                  Um funil quebrado não sobrevive apenas com "anúncios". Nós armamos a sua estrutura com absolutamente tudo o que você precisa para dominar o nicho e obliterar a concorrência.
                </p>
              </div>
              <button className="btn-primary self-start md:self-auto h-12 px-7 rounded-md text-sm font-manrope font-bold whitespace-nowrap">
                Quero montar o meu Arsenal <ChevronRight className="inline w-4 h-4 ml-1" />
              </button>
            </div>

            {/* Bento Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

              {/* Bento Card 1: Tráfego (Largo) */}
              <TiltCard className="bento-card lg:col-span-2 group flex flex-col justify-between p-8 md:p-10 min-h-[360px]">
                <div className="bento-glow" style={{ bottom: '-50px', right: '-50px' }} />
                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity duration-700">
                  <Megaphone className="w-48 h-48" style={{ color: '#C9A84C' }} />
                </div>
                
                <div className="relative z-10">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-6" style={{ background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.2)' }}>
                    <span className="w-2 h-2 rounded-full bg-[#E6C364] animate-pulse" />
                    <span className="text-[10px] font-bold tracking-widest text-[#E6C364] uppercase font-manrope">Performance Ads</span>
                  </div>
                  
                  <h3 className="font-epilogue text-3xl md:text-5xl font-black mb-4 leading-tight text-[#E4E1E9]">
                    Data-Driven <br/><span className="text-gold-gradient italic">Acquisition.</span>
                  </h3>
                  <p className="font-manrope text-base leading-relaxed max-w-lg" style={{ color: '#a09488' }}>
                    Abandonamos o "boost" e aplicamos arquitetura de dados e tráfego direto preditivo em Meta e Google. Focamos obsessivamente em abaixar seu Custo de Aquisição e maximizar a margem de lucro.
                  </p>
                </div>

                <div className="relative z-10 mt-8 flex flex-wrap items-center gap-3 border-t pt-6" style={{ borderColor: 'rgba(201,168,76,0.1)' }}>
                  <div className="bg-[#111118] border border-[#23212F] px-4 py-2 rounded-lg text-sm font-bold font-epilogue text-[#E6C364]">+300% ROAS</div>
                  <div className="bg-[#111118] border border-[#23212F] px-4 py-2 rounded-lg text-sm font-bold font-epilogue text-[#a09488]">CPA Otimizado</div>
                  <div className="bg-[#111118] border border-[#23212F] px-4 py-2 rounded-lg text-sm font-bold font-epilogue text-[#a09488]">LTV Growth</div>
                </div>
              </TiltCard>

              {/* Bento Card 2: Páginas (Vertical) */}
              <TiltCard className="bento-card lg:col-span-1 group flex flex-col justify-between p-8 md:p-10 min-h-[360px]">
                <div className="bento-glow" style={{ top: '-100px', left: '-100px' }} />
                
                <div className="relative z-10 mb-8">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6" style={{ background: 'linear-gradient(145deg, #1E1C0F, #111118)', border: '1px solid rgba(201,168,76,0.3)', boxShadow: '0 8px 24px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.04), 0 0 20px rgba(201,168,76,0.15)' }}>
                    <MonitorSmartphone className="w-8 h-8 text-[#C9A84C]" />
                  </div>
                   <h3 className="font-epilogue text-2xl md:text-3xl font-black mb-3 text-[#E4E1E9]">
                    Páginas de Alta Conversão
                  </h3>
                  <p className="font-manrope text-sm leading-relaxed" style={{ color: '#a09488' }}>
                    Seu site não é um panfleto estético. É seu melhor vendedor. Usamos design premium, neuro-copy e carregamento super otimizado para não perder 1% dos leads entrantes.
                  </p>
                </div>
                
                <div className="relative z-10 text-[11px] uppercase tracking-[0.2em] font-bold text-[#706860] border-t border-[#23212F] pt-4">
                  Experiências Imersivas
                </div>
              </TiltCard>

              {/* Bento Card 3: Automação (Wide Bottom) */}
              <TiltCard className="bento-card lg:col-span-3 group flex flex-col md:flex-row items-center justify-between p-8 md:p-12 gap-8 min-h-[260px]">
                <div className="bento-glow" style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '500px', height: '500px', opacity: 0, transition: 'opacity 1s' }} />
                <style>{`.bento-card:hover .bento-glow { opacity: 0.8 !important; }`}</style>
                
                <div className="md:w-[55%] relative z-10">
                   <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-4" style={{ background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.2)' }}>
                    <Bot className="w-3.5 h-3.5 text-[#E6C364]" />
                    <span className="text-[10px] font-bold tracking-widest text-[#E6C364] uppercase font-manrope">Agentes IA & Automação</span>
                  </div>
                  <h3 className="font-epilogue text-3xl md:text-5xl font-black mb-4 text-[#E4E1E9]">
                    Operações Autônomas <span className="text-gold-gradient italic">24/7.</span>
                  </h3>
                  <p className="font-manrope text-base leading-relaxed" style={{ color: '#a09488' }}>
                    Não adianta trazer 1.000 leads se você leva 4 horas para responder. Fechamos os gargalos de retenção criando CRMs inteligentes, agentes qualificados em IA e follow-ups brutais de Email e WhatsApp.
                  </p>
                </div>

                <div className="md:w-[40%] w-full flex flex-col gap-3 relative z-10">
                   {[
                     { l: 'Qualificação Instantânea', v: 'IA' },
                     { l: 'Recuperação de Vendas', v: 'Auto' },
                     { l: 'Follow-ups Persuasivos', v: 'N8N' }
                   ].map(tag => (
                     <div key={tag.l} className="flex items-center justify-between px-5 py-3 rounded-xl bg-[#0D0D11] border border-[#23212F] group-hover:border-[#C9A84C]/30 transition-colors">
                       <span className="text-sm font-bold font-manrope text-[#d0c5b2]">{tag.l}</span>
                       <span className="text-xs tracking-widest uppercase font-epilogue text-[#C9A84C] opacity-70">{tag.v}</span>
                     </div>
                   ))}
                </div>
              </TiltCard>

            </div>

            {/* Ticker marquee */}
            <div className="mt-14 overflow-hidden" style={{ maskImage: 'linear-gradient(90deg, transparent, black 8%, black 92%, transparent)', WebkitMaskImage: 'linear-gradient(90deg, transparent, black 8%, black 92%, transparent)' }}>
              <div className="flex gap-12 items-center whitespace-nowrap" style={{ animation: 'marquee 22s linear infinite', width: 'max-content' }}>
                {['ROI OBSESSIVO', 'CRESCIMENTO PREVISÍVEL', 'DATA-DRIVEN', 'ESCALA RÁPIDA', 'BOLD NEXT', 'SQUAD SÊNIOR', 'ROI OBSESSIVO', 'CRESCIMENTO PREVISÍVEL', 'DATA-DRIVEN', 'ESCALA RÁPIDA', 'BOLD NEXT', 'SQUAD SÊNIOR'].map((tag, i) => (
                  <span key={i} className="font-epilogue font-black text-sm tracking-[0.3em] select-none" style={{ color: i % 2 === 0 ? 'rgba(201,168,76,0.22)' : 'rgba(228,225,233,0.06)' }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── High-Tech Process Timeline ──────────────────────────────────── */}
        <section id="metodo" className="process-section relative py-32 px-6 overflow-hidden" style={{ background: '#0A0A0F' }}>
          
          {/* Background Micro-Textura de Engenharia */}
          <div className="absolute inset-0 pointer-events-none opacity-5">
            <div style={{
              backgroundImage: 'radial-gradient(circle, rgba(201,168,76,1) 1px, transparent 1px)',
              backgroundSize: '40px 40px', width: '100%', height: '100%'
            }} />
          </div>

          <div className="max-w-6xl mx-auto relative z-10">
            <div className="text-center mb-24 max-w-2xl mx-auto">
              <div className="w-12 h-0.5 bg-[#C9A84C] mx-auto mb-6" />
              <h2 className="font-epilogue text-4xl md:text-6xl font-black mb-6 leading-tight tracking-tight">
                A Ciência por trás da <span className="text-gold-gradient italic">Escala.</span>
              </h2>
              <p className="font-manrope text-lg" style={{ color: '#a09488' }}>
                Não dependemos da sorte. O Método Bold é uma sequência de engenharia comercial tática, desenhada para reduzir o risco e maximizar o lucro imediato.
              </p>
            </div>

            <div className="relative">
              {/* Timeline Center Line (Visible on Desktop) */}
              <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2" 
                style={{ background: 'linear-gradient(to bottom, transparent, rgba(201,168,76,0.3) 10%, rgba(201,168,76,0.3) 90%, transparent)' }} 
              />

              <div className="space-y-24 md:space-y-32">
                {processSteps.map((step, i) => (
                  <div key={i} className={`step-item flex flex-col items-center gap-8 ${i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
                    
                    {/* Step Content Card */}
                    <div className="w-full lg:w-[45%]">
                      <TiltCard className="bento-card p-8 md:p-10 group relative border-l-4 border-l-[#C9A84C]">
                        <div className="bento-glow" style={{ top: '-10% ', left: '-10%' }} />
                        
                        <div className="flex items-center justify-between mb-8">
                          <div className="text-sm font-black font-mono tracking-[0.3em] uppercase" style={{ color: '#E6C364' }}>
                            Passo {step.num}
                          </div>
                          <div className="w-10 h-10 rounded-full flex items-center justify-center border border-[#C9A84C]/20 text-[#C9A84C] group-hover:scale-110 group-hover:bg-[#C9A84C]/10 transition-all duration-300">
                            {step.icon}
                          </div>
                        </div>

                        <h3 className="font-epilogue text-2xl md:text-3xl font-black mb-4 text-[#E4E1E9]">
                          {step.title}
                        </h3>
                        <p className="font-manrope text-sm md:text-base leading-relaxed mb-8" style={{ color: '#a09488' }}>
                          {step.desc}
                        </p>

                        <div className="flex flex-wrap gap-2 pt-6 border-t border-[#23212F]">
                          {step.tags.map((tag, ti) => (
                            <span key={ti} className="text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded bg-[#111118] text-[#706860] border border-[#23212F]">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </TiltCard>
                    </div>

                    {/* Timeline Center Marker */}
                    <div className="relative hidden lg:flex items-center justify-center w-[10%] shrink-0">
                      <div className="w-5 h-5 rounded-full border-2 border-[#C9A84C] bg-[#0D0D11] z-10 shadow-[0_0_15px_rgba(201,168,76,0.5)]" />
                      <div className="absolute w-[1px] h-32 bg-gradient-to-b from-[#C9A84C]/0 via-[#C9A84C]/40 to-[#C9A84C]/0" />
                    </div>

                    {/* Step Visual Artifact (Empty for balance, or could add an illustration) */}
                    <div className="w-full lg:w-[45%] flex justify-center">
                       {/* Visual placeholder with subtle glow */}
                       <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full flex items-center justify-center border border-[#C9A84C]/5">
                          <div className="absolute inset-0 rounded-full blur-3xl opacity-10" style={{ background: '#C9A84C' }} />
                          <div className="absolute inset-0 rounded-full animate-pulse border border-[#C9A84C]/10" />
                          <div className="text-[8rem] font-epilogue font-black text-white/5 select-none">{step.num}</div>
                       </div>
                    </div>

                  </div>
                ))}
              </div>
            </div>

            {/* Final CTA of Process */}
            <div className="mt-32 text-center">
               <button className="btn-primary px-10 py-5 rounded-lg text-lg font-black group">
                 Agendar Engenharia de Crescimento
                 <ArrowRight className="inline w-6 h-6 ml-2 group-hover:translate-x-1 transition-transform" />
               </button>
            </div>
          </div>
        </section>

        {/* ── Wall of Proof (Cases + Testimonials) ────────────────────── */}
        <section id="cases" className="relative py-32 overflow-hidden" style={{ background: '#0A0A0F' }}>
          
          {/* Top Marquee: Logos / Nichos atendidos */}
          <div className="mb-32 relative py-12 border-y border-white/5 bg-[#0a0a10]">
            <div className="flex whitespace-nowrap overflow-hidden group">
              <div className="flex animate-[marqueeScroll_30s_linear_infinite] group-hover:[animation-play-state:paused] gap-20 items-center px-10">
                {["ODONTOLOGIA", "ESTÉTICA", "INFORPRODUTOS", "IMOBILIÁRIAS", "ECOMMERCE", "ADVOCACIA", "MÉDICOS", "ENGENHARIA"].map((nicho, idx) => (
                  <div key={idx} className="flex items-center gap-4 grayscale opacity-20 hover:grayscale-0 hover:opacity-80 transition-all duration-500">
                    <span className="font-epilogue font-black text-4xl tracking-tighter text-white">{nicho}</span>
                    <div className="w-2 h-2 rounded-full bg-[#10b981]" />
                  </div>
                ))}
              </div>
              {/* Duplicate for infinite loop */}
              <div className="flex animate-[marqueeScroll_30s_linear_infinite] group-hover:[animation-play-state:paused] gap-20 items-center px-10">
                {["ODONTOLOGIA", "ESTÉTICA", "INFORPRODUTOS", "IMOBILIÁRIAS", "ECOMMERCE", "ADVOCACIA", "MÉDICOS", "ENGENHARIA"].map((nicho, idx) => (
                  <div key={idx} className="flex items-center gap-4 grayscale opacity-20 hover:grayscale-0 hover:opacity-80 transition-all duration-500">
                    <span className="font-epilogue font-black text-4xl tracking-tighter text-white">{nicho}</span>
                    <div className="w-2 h-2 rounded-full bg-[#10b981]" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-24 max-w-3xl mx-auto">
              <span className="text-[10px] font-black tracking-[0.4em] uppercase text-[#10b981] mb-6 block">MURALHA DE PROVA</span>
              <h2 className="font-epilogue text-4xl md:text-6xl font-black mb-8 leading-tight">
                Auditados pelo <span className="text-emerald-gradient italic">Lucro Líquido.</span>
              </h2>
              <p className="font-manrope text-lg text-zinc-500">
                Não medimos impressões. Medimos caixa. Conheça as operações reais que escalaram nas mãos do nosso esquadrão tático.
              </p>
            </div>

            {/* Portfolio Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
              {portfolioData.slice(0, showAllProjects ? 24 : 6).map((project, i) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  viewport={{ once: true }}
                >
                  <TiltCard className="bento-card group p-1 w-full h-full rounded-2xl overflow-hidden bg-gradient-to-br from-white/5 to-transparent border border-white/5">
                    <div className="bg-[#0A0A10] p-8 h-full rounded-2xl flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start mb-6">
                           <span className="text-[10px] font-bold tracking-widest text-[#10b981] uppercase py-1 px-3 rounded-full bg-[#10b981]/10 border border-[#10b981]/20">
                             {project.tags[1] || project.tags[0]}
                           </span>
                           <span className="text-[10px] font-mono font-bold text-zinc-700 uppercase">{project.id}</span>
                        </div>
                        <h3 className="font-epilogue text-xl font-black mb-2 text-white group-hover:text-[#C9A84C] transition-colors">{project.client}</h3>
                        <p className="text-sm font-manrope text-zinc-500 mb-6 line-clamp-2">{project.title} — {project.segment}</p>
                      </div>

                      <div className="space-y-4">
                        <div className="text-2xl font-black font-epilogue text-emerald-gradient">
                          {project.resultados[0]}
                        </div>
                        <button 
                          onClick={() => setSelectedProject(project)}
                          className="w-full py-3 rounded-lg border border-white/10 hover:border-[#C9A84C]/40 hover:bg-white/[0.02] text-xs font-bold font-epilogue tracking-widest text-zinc-400 hover:text-white transition-all flex items-center justify-center gap-2 group/btn"
                        >
                          VER DETALHES
                          <Plus className="w-4 h-4 group-hover/btn:rotate-90 transition-transform" />
                        </button>
                      </div>
                    </div>
                  </TiltCard>
                </motion.div>
              ))}
            </div>

            {/* Portfolio Controls */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-40">
              <button 
                onClick={() => setShowAllProjects(!showAllProjects)}
                className="px-12 py-4 rounded-xl border border-[#C9A84C]/20 bg-gradient-to-b from-white/[0.03] to-transparent font-epilogue font-black text-sm text-white hover:border-[#C9A84C]/50 transition-all flex items-center gap-4"
              >
                {showAllProjects ? "VER MENOS" : "EXPLORAR TODOS OS 24 CASES"}
                {showAllProjects ? <Minus className="w-5 h-5" /> : <Layers className="w-5 h-5" />}
              </button>
              
              <a 
                href="/portfolio-boldnext.docx.pdf" 
                download
                className="px-12 py-4 rounded-xl bg-white/5 border border-white/10 font-epilogue font-black text-sm text-zinc-400 hover:bg-white/10 hover:text-white transition-all flex items-center gap-4"
              >
                BAIXAR PDF COMPLETO
                <Briefcase className="w-5 h-5" />
              </a>
            </div>

            {/* Testimonials Social Feed */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { name: "@marcelo_mkt", role: "CEO Agência X", text: "A Bold Next não é agência, é um laboratório de escala. O que fizeram no meu funil em 15 dias eu não consegui em 1 ano sozinhos.", stars: 5 },
                { name: "Dra. Eliana S.", role: "Clínica Integrada", text: "Finalmente um time que entende de MÉTRICA de verdade. Meu WhatsApp não para de tocar com leads qualificados. Recomendo de olhos fechados.", stars: 5 },
                { name: "Expert Senior", role: "Infoprodutor 7D", text: "Páginas absurdamente rápidas e copy que converte até pedra. O suporte é outro nível. O ROI veio logo na primeira semana de ads.", stars: 5 },
              ].map((t, i) => (
                <div key={i} className="glass-card-dark p-8 rounded-2xl border border-white/5 relative group hover:border-[#10b981]/30 transition-all duration-500">
                  <div className="flex gap-1 mb-6">
                    {Array.from({ length: t.stars }).map((_, si) => (
                      <Star key={si} className="w-3 h-3 fill-[#10b981] text-[#10b981]" />
                    ))}
                  </div>
                  <p className="font-manrope text-sm leading-relaxed text-zinc-300 mb-10 italic">
                    "{t.text}"
                  </p>
                  <div className="flex items-center gap-3 border-t border-white/5 pt-6">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#10b981]/20 to-[#10b981]/5 flex items-center justify-center font-black font-epilogue text-[#10b981]">
                      {t.name[1]}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white mb-0.5">{t.name}</div>
                      <div className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-widest">{t.role}</div>
                    </div>
                    <div className="ml-auto">
                      <ShieldCheck className="w-5 h-5 text-[#10b981]/30" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ Hub ────────────────────────────────────────────────────── */}
        <section id="faq" className="py-32 px-6 max-w-5xl mx-auto relative overflow-hidden">
          <div className="flex flex-col md:flex-row gap-16 items-start">
            <div className="w-full md:w-1/3 sticky top-40">
              <span className="text-[10px] font-black tracking-[0.4em] uppercase text-[#C9A84C] mb-6 block">KNOWLEDGE HUB</span>
              <h2 className="font-epilogue text-4xl font-black mb-8 leading-tight">
                Dúvidas <br/> Técnicas <br/> & <br/> <span className="text-gold-gradient italic">Operação.</span>
              </h2>
              <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/5">
                <p className="text-sm font-manrope text-zinc-500 mb-6">
                  Sua dúvida não está aqui? Fale com nosso suporte técnico via WhatsApp para uma resposta imediata.
                </p>
                <button className="text-xs font-bold font-mono text-[#C9A84C] flex items-center gap-2 hover:opacity-80 transition-opacity">
                   <Mail className="w-4 h-4" /> SUPORTE@BOLDNEXT.AGENCY
                </button>
              </div>
            </div>

            <div className="w-full md:w-2/3 space-y-4">
              {faqs.map((faq, i) => (
                <div
                  key={i}
                  className="group rounded-2xl overflow-hidden cursor-pointer transition-all duration-500"
                  style={{ background: '#0a0a0f', border: `1px solid ${openFaq === i ? 'rgba(201,168,76,0.3)' : 'rgba(255,255,255,0.05)'}` }}
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <div className="p-8 flex justify-between items-center group-hover:bg-white/[0.02] transition-colors">
                    <h4 className="font-bold font-epilogue text-lg" style={{ color: openFaq === i ? '#C9A84C' : '#white' }}>{faq.q}</h4>
                    <div style={{ color: '#C9A84C', flexShrink: 0, marginLeft: '1rem' }}>
                      {openFaq === i ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                    </div>
                  </div>
                  {openFaq === i && (
                    <div className="px-8 pb-8 font-manrope leading-relaxed text-zinc-400 border-t border-white/5 pt-6 animate-in fade-in slide-in-from-top-4 duration-300">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Closing Focus (CTA) ────────────────────────────────────────── */}
        <section className="relative py-40 px-6 overflow-hidden bg-[#050508]">
          <FloatingOrb size={800} color="#C9A84C" top="50%" left="50%" delay={0} />

          <div className="max-w-4xl mx-auto text-center relative z-10 glass-card rounded-[3rem] p-12 md:p-24 border border-white/5">
            <div className="mb-10 inline-flex items-center gap-3 px-6 py-2 rounded-full bg-[#10b981]/10 border border-[#10b981]/20">
              <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />
              <span className="text-[10px] font-black tracking-[0.2em] uppercase text-[#10b981]">VAGAS PARA ABRIL: 1 DISPONÍVEL</span>
            </div>
            
            <h2 className="font-epilogue text-5xl md:text-7xl font-black mb-10 leading-[1.1] text-white">
              Sua decisão hoje <br/> define o seu <br/> <span className="text-gold-gradient italic">próximo nível.</span>
            </h2>
            
            <p className="font-manrope text-xl mb-12 max-w-2xl mx-auto text-zinc-500">
              Não somos uma agência de "posts". Somos uma boutique de engenharia de caixa. Se o seu negócio tem base sólida e faturou no mínimo R$ 20k no último mês, aplique agora para o Diagnóstico Tático.
            </p>

            <button className="btn-primary btn-pulse h-20 px-16 rounded-xl text-xl font-epilogue font-black transition-all transform hover:scale-105 active:scale-95 flex items-center gap-4 mx-auto">
              APLICAR PARA O DIAGNÓSTICO ESTRATÉGICO
              <ChevronRight className="w-6 h-6" />
            </button>

            <div className="mt-12 flex items-center justify-center gap-8 text-[10px] font-black tracking-widest text-zinc-600 uppercase">
               <div className="flex items-center gap-2"> <ShieldCheck className="w-4 h-4 text-[#10b981]" /> PRIVACIDADE GARANTIDA</div>
               <div className="flex items-center gap-2"> <Star className="w-4 h-4 text-[#C9A84C]" /> AGÊNCIA 5 ESTRELAS</div>
            </div>
          </div>
        </section>

        {/* ── Footer ─────────────────────────────────────────────────────── */}
        <footer className="pt-32 pb-12 px-6" style={{ background: '#050508', borderTop: '1px solid rgba(255,255,255,0.03)' }}>
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-20 mb-32">
            <div className="col-span-1 md:col-span-2">
              <span className="text-3xl font-black tracking-widest font-epilogue mb-8 inline-block">
                <span className="text-gold-gradient font-light">BOLD</span>
                <span className="text-zinc-600">NEXT</span>
              </span>
              <p className="font-manrope text-zinc-500 max-w-sm mb-10 leading-relaxed text-lg">
                Engenharia de Crescimento para Empresas Exigentes. <br/> Zero Vaidade. 100% Resultado.
              </p>
              <div className="flex gap-4">
                {[Mail, Phone].map((Icon, i) => (
                  <div key={i} className="w-12 h-12 rounded-xl flex items-center justify-center cursor-pointer transition-all bg-white/[0.03] border border-white/5 hover:border-[#C9A84C]/40 text-zinc-500 hover:text-[#C9A84C]">
                    <Icon className="w-5 h-5" />
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-bold mb-8 text-xs tracking-[0.3em] uppercase text-zinc-400 font-epilogue">Navegação</h4>
              <ul className="space-y-4 font-manrope text-sm text-zinc-500">
                {['Manifesto/Home', 'O Método', 'Muralha de Prova', 'Diagnóstico'].map(l => (
                  <li key={l}><a href="#" className="hover:text-[#C9A84C] transition-colors">{l}</a></li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-8 text-xs tracking-[0.3em] uppercase text-zinc-400 font-epilogue">Compliance</h4>
              <ul className="space-y-4 font-manrope text-sm text-zinc-500">
                {['Privacidade', 'Termos de Uso', 'LGPD', 'Anti-Spam Policity'].map(l => (
                  <li key={l}><a href="#" className="hover:text-[#C9A84C] transition-colors">{l}</a></li>
                ))}
              </ul>
            </div>
          </div>

          <div className="max-w-7xl mx-auto pt-12 flex flex-col md:flex-row justify-between items-center text-[10px] font-black tracking-widest text-zinc-700 uppercase border-t border-white/5">
            <p>© 2026 BOLD NEXT AGENCY. ALL RIGHTS RESERVED.</p>
            <div className="flex items-center mt-6 md:mt-0 gap-6">
              <span className="flex items-center gap-2"> <TrendingUp className="w-3 h-3 text-[#10b981]" /> SCALABILITY: LEVEL 4 </span>
              <span className="flex items-center gap-2"> <div className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" /> CLOUD OPS UP </span>
            </div>
          </div>
        </footer>

        {/* ── Project Details Modal ──────────────────────────────────────── */}
        <AnimatePresence mode="wait">
          {selectedProject && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-[#050508]/90 backdrop-blur-2xl"
              onClick={() => setSelectedProject(null)}
            >
              <motion.div 
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                className="relative w-full max-w-4xl bg-[#0F0F16] rounded-[2rem] border border-white/10 shadow-[0_40px_100px_rgba(0,0,0,0.8)] overflow-hidden"
                onClick={e => e.stopPropagation()}
              >
                {/* Modal Header */}
                <div className="p-8 md:p-12 border-b border-white/5 flex justify-between items-start bg-gradient-to-b from-white/[0.02] to-transparent">
                  <div>
                    <div className="flex items-center gap-4 mb-4">
                      <span className="text-xs font-mono font-black text-[#C9A84C] tracking-[0.3em] uppercase">CASE {selectedProject.id}</span>
                      <div className="px-3 py-1 rounded-full border border-[#10b981]/30 bg-[#10b981]/10 text-[10px] font-black text-[#10b981] uppercase tracking-widest">
                        {selectedProject.tags[0]}
                      </div>
                    </div>
                    <h2 className="font-epilogue text-4xl md:text-5xl font-black text-white">{selectedProject.client}</h2>
                    <p className="text-zinc-500 font-manrope mt-2 italic">{selectedProject.segment}</p>
                  </div>
                  <button 
                    onClick={() => setSelectedProject(null)}
                    className="p-4 rounded-full bg-white/5 hover:bg-white/10 transition-colors text-white"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Modal Content */}
                <div className="p-8 md:p-12 max-h-[60vh] overflow-y-auto custom-scrollbar">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="space-y-10">
                      <div>
                        <h4 className="text-[10px] font-black tracking-[0.4em] text-zinc-600 uppercase mb-4">O Desafio</h4>
                        <p className="font-manrope text-zinc-400 leading-relaxed text-lg">{selectedProject.desafio}</p>
                      </div>
                      <div>
                        <h4 className="text-[10px] font-black tracking-[0.4em] text-[#C9A84C] uppercase mb-4">Engenharia Tática (Solução)</h4>
                        <p className="font-manrope text-white leading-relaxed text-lg">{selectedProject.solucao}</p>
                      </div>
                    </div>

                    <div className="space-y-10">
                      <div>
                        <h4 className="text-[10px] font-black tracking-[0.4em] text-[#10b981] uppercase mb-4">Resultados Verificados</h4>
                        <div className="space-y-3">
                          {selectedProject.resultados.map((res, ri) => (
                            <div key={ri} className="flex items-center gap-4 p-4 rounded-xl bg-[#10b981]/5 border border-[#10b981]/10">
                              <CheckCircle className="w-5 h-5 text-[#10b981] shrink-0" />
                              <span className="font-epilogue font-bold text-white uppercase text-sm tracking-tight">{res}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="p-8 rounded-2xl bg-gradient-to-br from-white/[0.03] to-transparent border border-white/5">
                        <Star className="w-6 h-6 text-[#C9A84C] mb-4 fill-[#C9A84C]" />
                        <p className="font-manrope text-zinc-300 italic mb-6 leading-relaxed">
                          "{selectedProject.depoimento.text}"
                        </p>
                        <div className="font-epilogue font-bold text-white text-sm">
                          {selectedProject.depoimento.author}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Modal Footer */}
                <div className="p-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                  <div className="flex items-center gap-2 text-[10px] font-black text-zinc-600 tracking-widest">
                    <ShieldCheck className="w-4 h-4 text-[#10b981]" /> DADOS AUDITADOS PELA BOLD NEXT
                  </div>
                  <button className="btn-primary px-8 py-4 rounded-xl text-xs font-black w-full md:w-auto">
                    QUERO RESULTADOS SIMILARES
                    <ArrowRight className="inline w-4 h-4 ml-2" />
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
