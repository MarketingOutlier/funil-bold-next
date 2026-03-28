import { useEffect, useRef, useState, useCallback } from 'react';
import {
  Menu, X, ChevronRight, ArrowRight,
  MonitorSmartphone, Briefcase, Megaphone,
  TrendingUp, Bot, Share2, Layers, Search, Mail, Phone,
  Star, Plus, Minus, Zap
} from 'lucide-react';


import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Radar, IconContainer } from './components/ui/radar-effect';

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
    { num: "01", title: "O Diagnóstico Cirúrgico", desc: "Nós olhamos para as métricas que geralmente são ignoradas. Encontramos por onde sua conversão está vazando e definimos a oferta exata de recuperação imediata para o seu momento." },
    { num: "02", title: "A Estratégia de Tração", desc: "Planejamento reverso \"fim-a-fim\". Desenhamos a jornada lógica e emocional do seu futuro cliente: desde o impacto do primeiro anúncio invisível ao clique da compra, removendo toda objeção." },
    { num: "03", title: "A Execução Técnica", desc: "O nosso esquadrão tático assume. Desenvolvemos criativos, instalamos traqueamento, levantamos páginas e ativamos automações completas. Você foca em operar o seu negócio; nós focamos em trazer o volume." },
    { num: "04", title: "A Escala de Caixa", desc: "O teste do fogo. Baseado em captação real de dados iniciais, matamos as campanhas falhas, melhoramos o que perfoma e injetamos força total naquilo que está de fato trazendo lucro." },
  ];

  const testimonials = [
    {
      text: <>A BOLD NEXT não é apenas uma agência, é um braço estratégico. Em 6 meses, escalamos nosso <strong>ROI em 4x</strong> com uma <strong>precisão cirúrgica</strong>.</>,
      name: "Ricardo Homero",
      role: "CEO, TechNexus",
      stars: 5,
    },
    {
      text: <>O <strong>design imersivo</strong> e as <strong>automações de IA</strong> transformaram completamente nosso funil. Nunca tivemos uma <strong>taxa de conversão tão alta</strong>.</>,
      name: "Marina Silva",
      role: "Diretora de Marketing, Elevate",
      stars: 5,
    },
    {
      text: <>O Arsenal de ferramentas deles é incomparável. A transição para o <strong>CRM automatizado salvou centenas de horas</strong> da nossa equipe.</>,
      name: "João Batista",
      role: "Ops Lead, FlowState",
      stars: 5,
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

        @keyframes floatOrb {
          0%   { transform: translateY(0px) scale(1); }
          100% { transform: translateY(-30px) scale(1.08); }
        }
        @keyframes rotateSlow {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes pulseGold {
          0%, 100% { box-shadow: 0 0 20px rgba(201,168,76,0.2); }
          50%       { box-shadow: 0 0 40px rgba(201,168,76,0.5), 0 0 80px rgba(201,168,76,0.15); }
        }
        @keyframes gridMove {
          0%   { transform: translateY(0); }
          100% { transform: translateY(60px); }
        }
        @keyframes marquee {
          0%   { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        @keyframes starPop {
          0%   { transform: scale(0) rotate(-30deg); opacity: 0; }
          60%  { transform: scale(1.2) rotate(5deg); opacity: 1; }
          100% { transform: scale(1) rotate(0deg); opacity: 1; }
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

        {/* ── Hero ───────────────────────────────────────────────────────── */}
        <section className="relative pt-40 pb-20 lg:pt-56 lg:pb-36 px-6 overflow-hidden">
          {/* BG orbs */}
          <FloatingOrb size={600} color="#C9A84C" top="-10%" left="40%" delay={0} />
          <FloatingOrb size={400} color="#9ba8eb" top="50%" left="-10%" delay={1.5} />
          <FloatingOrb size={300} color="#C9A84C" top="70%" left="75%" delay={3} />

          {/* Grid lines */}
          <div className="absolute inset-0 pointer-events-none" style={{ opacity: 0.03 }}>
            <div style={{
              backgroundImage: 'repeating-linear-gradient(0deg,rgba(201,168,76,1) 0,rgba(201,168,76,1) 1px,transparent 0,transparent 50%),repeating-linear-gradient(90deg,rgba(201,168,76,1) 0,rgba(201,168,76,1) 1px,transparent 0,transparent 50%)',
              backgroundSize: '80px 80px', width: '100%', height: '100%',
            }} />
          </div>

          <div className="relative max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center z-10">
            {/* Left — copy */}
            <div>
              <div className="hero-anim mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full"
                style={{ border: '1px solid rgba(201,168,76,0.2)', background: 'rgba(201,168,76,0.05)' }}>
                <Zap className="w-3.5 h-3.5" style={{ color: '#C9A84C' }} />
                <span className="text-xs font-semibold tracking-widest uppercase font-manrope" style={{ color: '#C9A84C' }}>
                  VOCÊ ESTÁ A UM FUNIL DA ESCALA PREVISÍVEL
                </span>
              </div>

              <h1 className="hero-anim font-epilogue text-5xl md:text-6xl lg:text-7xl font-black leading-[1.1] tracking-tight mb-6">
                Pare de patrocinar a concorrência.<br className="hidden lg:block"/> Construa sua{' '}
                <span className="text-gold-gradient italic font-epilogue">Máquina de Vendas.</span>
              </h1>

              <p className="hero-anim text-lg leading-relaxed mb-10 font-manrope" style={{ color: '#a09488', maxWidth: '500px' }}>
                Transformamos operações comerciais travadas em ecossistemas de alta conversão usando IA, 
                tráfego de precisão e funis automatizados. Onde outras agências vendem ilusão de "likes", nós entregamos lucro no seu caixa.
              </p>

              <div className="hero-anim flex flex-col sm:flex-row gap-4">
                <button className="btn-primary h-14 px-8 rounded-md text-base font-manrope font-bold">
                  Quero Agendar Meu Diagnóstico Gratuito
                </button>
                <button className="btn-ghost h-14 px-8 rounded-md text-base flex items-center justify-center gap-2">
                  Como a máquina funciona? <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Stats row */}
              <div className="hero-anim mt-14 flex gap-10">
                {[['4x','ROI médio em 6 meses'],['72h','Primeiros leads'],['50+','Clientes ativos']].map(([val,label]) => (
                  <div key={val}>
                    <div className="text-2xl font-black text-gold-gradient font-epilogue">{val}</div>
                    <div className="text-xs mt-1 font-manrope" style={{ color: '#99907e' }}>{label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — 3D Cube Visual */}
            <div className="hero-3d-obj hidden lg:flex items-center justify-center relative" style={{ minHeight: '420px' }}>
              {/* Outer rings */}
              <div className="absolute rounded-full" style={{
                width: 380, height: 380,
                border: '1px solid rgba(201,168,76,0.12)',
                left: '50%', top: '50%', transform: 'translate(-50%, -50%)',
                animation: 'rotateSlow 25s linear infinite',
              }}>
                <div className="absolute w-3 h-3 rounded-full" style={{ background: '#C9A84C', top: -6, left: '50%', transform: 'translateX(-50%)', boxShadow: '0 0 12px #C9A84C' }} />
              </div>
              <div className="absolute rounded-full" style={{
                width: 280, height: 280,
                border: '1px solid rgba(201,168,76,0.08)',
                left: '50%', top: '50%', transform: 'translate(-50%, -50%)',
                animation: 'rotateSlow 18s linear infinite reverse',
              }}>
                <div className="absolute w-2 h-2 rounded-full" style={{ background: '#9ba8eb', bottom: -4, left: '50%', transform: 'translateX(-50%)', boxShadow: '0 0 8px #9ba8eb' }} />
              </div>

              {/* Glass panel behind cube */}
              <div className="glass-card rounded-3xl" style={{
                width: 240, height: 240, position: 'relative', zIndex: 2,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                animation: 'pulseGold 4s ease-in-out infinite',
              }}>
                {/* Cube */}
                <div className="cube-scene" style={{ width: 180, height: 180, position: 'relative' }}>
                  <div className="cube" style={{ position: 'relative' }}>
                    {['front','back','left','right','top','bottom'].map(f => (
                      <div key={f} className={`cube-face face-${f}`}>
                        <Zap className="w-8 h-8 opacity-40" style={{ color: '#E6C364' }} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating badges */}
              {[
                { label: 'ROAS +340%', sub: 'Meta & Google Ads', top: '5%', right: '0%' },
                { label: '+150 Leads/mês', sub: 'Funil Automatizado', bottom: '5%', left: '-5%' },
              ].map(({ label, sub, ...pos }) => (
                <div key={label} className="absolute glass-card rounded-xl px-4 py-3" style={{ ...pos, zIndex: 3 }}>
                  <div className="text-sm font-bold font-epilogue" style={{ color: '#E6C364' }}>{label}</div>
                  <div className="text-xs font-manrope" style={{ color: '#99907e' }}>{sub}</div>
                </div>
              ))}
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

            {/* 4 Cards horizontais — igual ao Stitch */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {[
                { icon: Megaphone, title: "Tráfego Pago",    desc: "Chega de cliques vazios. Aplicamos escalabilidade preditiva via algoritmos de performance em Meta, Google e TikTok Ads com um foco obsessivo: aumentar o seu ROAS e abaixar o Custo de Aquisição (CAC)." },
                { icon: MonitorSmartphone, title: "Páginas de Alta Conversão", desc: "Sites não servem apenas para existir na web, servem para vender. Criamos experiências imersivas com neuromarketing, design autoral agressivo e carregamento ultrarrápido para que você não perca tempo com leads impacientes." },
                { icon: Layers, title: "Automação CRM",               desc: "A fortuna de qualquer negócio está no follow-up. Fechamos o ciclo de vendas transformando dados frios em relacionamentos e negócios altamente rentáveis. Ninguém mais fica pra trás no funil." },
                { icon: Bot,   title: "Inteligência Artificial & Agentes",       desc: "Seus custos operacionais despencam enquanto a velocidade de conversão voa. Implementamos agentes automatizados cruzando 24h por dia para qualificar, atender e fechar sem precisar triplicar a equipe humana." },
              ].map((svc, i) => (
                <TiltCard key={i} className="svc-card">
                  <div
                    className="relative overflow-hidden rounded-2xl p-7 flex flex-col gap-5 h-full"
                    style={{
                      background: 'linear-gradient(145deg, #17171F 0%, #111118 60%, #0D0D11 100%)',
                      border: '1px solid rgba(201,168,76,0.1)',
                      minHeight: '260px',
                    }}
                  >
                    {/* Watermark number */}
                    <div
                      className="absolute top-4 right-5 font-epilogue font-black select-none pointer-events-none"
                      style={{ fontSize: '5rem', lineHeight: 1, color: 'rgba(201,168,76,0.04)' }}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </div>

                    {/* Ícone com plataforma 3D */}
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
                      style={{
                        background: 'linear-gradient(145deg, #1E1C0F, #111118)',
                        border: '1px solid rgba(201,168,76,0.22)',
                        boxShadow: '0 8px 24px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.04), 0 0 20px rgba(201,168,76,0.08)',
                      }}
                    >
                      <svc.icon className="w-7 h-7" style={{ color: '#C9A84C' }} />
                    </div>

                    {/* Texto */}
                    <div className="relative z-10 mt-auto">
                      <h3 className="font-epilogue text-lg font-bold mb-2" style={{ color: '#E4E1E9' }}>{svc.title}</h3>
                      <p className="font-manrope text-sm leading-relaxed" style={{ color: '#706860' }}>{svc.desc}</p>
                    </div>

                    {/* linha gold no bottom */}
                    <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.25), transparent)' }} />
                  </div>
                </TiltCard>
              ))}
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

        {/* ── Process ────────────────────────────────────────────────────── */}
        <section id="metodo" className="process-section relative py-32 px-6" style={{ background: '#0e0e13' }}>
          <div className="max-w-7xl mx-auto">
            <div className="mb-20 md:w-1/2">
              <span className="inline-block text-xs font-semibold tracking-widest uppercase font-manrope px-3 py-1 rounded-full mb-5" style={{ color: '#C9A84C', border: '1px solid rgba(201,168,76,0.2)', background: 'rgba(201,168,76,0.05)' }}>
                O MÉTODO BOLD
              </span>
              <h2 className="font-epilogue text-4xl md:text-5xl font-black mb-5 leading-tight">
                Como criamos a{' '}
                <span className="text-gold-gradient italic font-epilogue">Engenharia de Crescimento</span>.
              </h2>
              <p className="font-manrope" style={{ color: '#a09488', fontSize: '1.05rem', lineHeight: 1.7 }}>
                Não dependemos da sorte para trazer faturamento. Executamos um processo tático validado em múltiplos nichos.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {processSteps.map((step, i) => (
                <div key={i} className="step-item relative p-8 rounded-2xl" style={{ background: '#1b1b20', border: '1px solid rgba(77,70,55,0.2)' }}>
                  <div className="absolute top-6 right-6 font-black" style={{ fontSize: '5rem', color: 'rgba(201,168,76,0.03)', lineHeight: 1, fontFamily: 'Epilogue' }}>{step.num}</div>
                  <div className="font-mono font-bold mb-5 text-sm" style={{ color: '#C9A84C' }}>{step.num}</div>
                  <h3 className="font-epilogue text-xl font-bold mb-3">{step.title}</h3>
                  <p className="font-manrope text-sm leading-relaxed" style={{ color: '#a09488' }}>{step.desc}</p>
                  {i < processSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-4 z-10" style={{ color: '#C9A84C', opacity: 0.4 }}>
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Portfolio / Cases ───────────────────────────────────────────── */}
        <section id="cases" className="portfolio-section relative py-32 px-6 max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <span className="inline-block text-xs font-semibold tracking-widest uppercase font-manrope px-3 py-1 rounded-full mb-5" style={{ color: '#C9A84C', border: '1px solid rgba(201,168,76,0.2)', background: 'rgba(201,168,76,0.05)' }}>
              CASES DO CAMPO DE BATALHA
            </span>
            <h2 className="font-epilogue text-4xl md:text-5xl font-black mb-5">
              Resultados auditados e <span className="text-gold-gradient italic font-epilogue">provados</span>.
            </h2>
            <p className="max-w-2xl mx-auto font-manrope" style={{ color: '#a09488', fontSize: '1.05rem' }}>
              Conheça as empresas, experts e negócios locais que confiaram no nosso ecossistema e destrincharam as próprias metas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { client: "Clínica Vitale", tags: "Funil Local + GMB", result: "+45% em agendamentos", sub: "Estética" },
              { client: "Restaurante Sabor & Arte", tags: "Cardápio + IA", result: "+R$12k faturados/mês", sub: "Food & Beverage" },
              { client: "Cunha & Associados", tags: "Páginas + SEO + Ads", result: "Em 60 dias no Top 3 BR", sub: "Advocacia" },
              { client: "Boutique Bella", tags: "Social Commerce + Meta", result: "+150% ROAS", sub: "Moda & Lifestyle" },
            ].map((item, i) => (
              <TiltCard key={i} className="portfolio-card">
                <div className="glass-card-dark p-10 rounded-2xl h-full group cursor-pointer">
                  <div className="flex justify-between items-start mb-8">
                    <div>
                      <div className="text-xs font-mono font-semibold tracking-widest uppercase mb-2" style={{ color: '#C9A84C' }}>{item.tags}</div>
                      <h3 className="font-epilogue text-3xl font-black" style={{ color: '#E4E1E9' }}>{item.client}</h3>
                      <div className="text-sm mt-1 font-manrope" style={{ color: '#99907e' }}>{item.sub}</div>
                    </div>
                    <div className="p-3 rounded-xl" style={{ background: 'rgba(201,168,76,0.08)' }}>
                      <TrendingUp className="w-5 h-5" style={{ color: '#C9A84C' }} />
                    </div>
                  </div>
                  <div className="p-4 rounded-xl" style={{ background: 'rgba(201,168,76,0.06)', border: '1px solid rgba(201,168,76,0.12)' }}>
                    <div className="font-bold font-epilogue text-xl" style={{ color: '#E6C364' }}>{item.result}</div>
                    <div className="text-xs font-manrope mt-1" style={{ color: '#99907e' }}>Resultado comprovado em 90 dias</div>
                  </div>
                </div>
              </TiltCard>
            ))}
          </div>
        </section>

        {/* ── Testimonials ───────────────────────────────────────────────── */}
        <section id="depoimentos" className="testimonials-section relative py-32 px-6 overflow-hidden" style={{ background: '#0e0e13' }}>
          <FloatingOrb size={600} color="#9ba8eb" top="0%" left="-10%" delay={0} />
          <FloatingOrb size={400} color="#C9A84C" top="50%" left="70%" delay={2} />

          <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center mb-20">
              <span className="inline-block text-xs font-semibold tracking-widest uppercase font-manrope px-3 py-1 rounded-full mb-5" style={{ color: '#C9A84C', border: '1px solid rgba(201,168,76,0.2)', background: 'rgba(201,168,76,0.05)' }}>
                A TRIBO FALA
              </span>
              <h2 className="font-epilogue text-4xl md:text-5xl font-black mb-5">
                O que nossos <span className="text-gold-gradient italic font-epilogue">parceiros comerciais</span> dizem.
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((t, i) => (
                <TiltCard key={i} className="testimonial-card">
                  <div className="glass-card p-8 rounded-2xl h-full relative overflow-hidden">
                    {/* Gold glow accent */}
                    <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.5), transparent)' }} />
                    
                    {/* Stars */}
                    <div className="flex gap-1 mb-6">
                      {Array.from({ length: t.stars }).map((_, si) => (
                        <Star key={si} className="w-4 h-4" style={{ color: '#C9A84C', fill: '#C9A84C', animation: `starPop 0.4s ease forwards`, animationDelay: `${si * 0.08}s` }} />
                      ))}
                    </div>

                    {/* Quote mark */}
                    <div className="absolute top-6 right-6 font-epilogue font-black" style={{ fontSize: '4rem', color: 'rgba(201,168,76,0.06)', lineHeight: 1 }}>"</div>

                    <p className="font-manrope italic leading-relaxed mb-8" style={{ color: '#c8c0b2', fontSize: '1rem' }}>
                      "{t.text}"
                    </p>

                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold font-epilogue text-sm" style={{ background: 'linear-gradient(135deg, #C9A84C, #E6C364)', color: '#1a1500' }}>
                        {t.name[0]}
                      </div>
                      <div>
                        <div className="font-bold font-epilogue text-sm" style={{ color: '#E4E1E9' }}>{t.name}</div>
                        <div className="text-xs font-mono mt-0.5" style={{ color: '#C9A84C' }}>{t.role}</div>
                      </div>
                    </div>
                  </div>
                </TiltCard>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ────────────────────────────────────────────────────────── */}
        <section id="faq" className="faq-section py-32 px-6 max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-epilogue text-4xl font-black">
              <span className="text-gold-gradient italic font-epilogue">Dúvidas</span> Frequentes
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="faq-item rounded-xl overflow-hidden cursor-pointer transition-all duration-300"
                style={{ background: '#1b1b20', border: `1px solid ${openFaq === i ? 'rgba(201,168,76,0.3)' : 'rgba(77,70,55,0.2)'}` }}
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
              >
                <div className="p-6 flex justify-between items-center">
                  <h4 className="font-bold font-epilogue" style={{ color: '#E4E1E9' }}>{faq.q}</h4>
                  <div style={{ color: '#C9A84C', flexShrink: 0, marginLeft: '1rem' }}>
                    {openFaq === i ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                  </div>
                </div>
                {openFaq === i && (
                  <div className="px-6 pb-6 font-manrope leading-relaxed" style={{ color: '#a09488', borderTop: '1px solid rgba(201,168,76,0.08)', paddingTop: '1rem' }}>
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ── CTA ────────────────────────────────────────────────────────── */}
        <section className="relative py-32 px-6 overflow-hidden">
          <FloatingOrb size={700} color="#C9A84C" top="50%" left="50%" delay={0} />

          <div className="max-w-4xl mx-auto text-center relative z-10 glass-card rounded-3xl p-12 md:p-20" style={{ animation: 'pulseGold 5s ease-in-out infinite' }}>
            <div className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full" style={{ border: '1px solid rgba(201,168,76,0.2)', background: 'rgba(201,168,76,0.05)' }}>
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#C9A84C' }} />
              <span className="text-xs font-semibold tracking-widest uppercase font-manrope" style={{ color: '#C9A84C' }}>VAGAS DE ONBOARDING CUIDADOSAMENTE LIMITADAS</span>
            </div>
            <h2 className="font-epilogue text-4xl md:text-6xl font-black mb-6 leading-tight">
              Você está a apenas uma <span className="text-gold-gradient italic font-epilogue">decisão inteligente</span> de destravar seu faturamento.
            </h2>
            <p className="font-manrope text-lg mb-10 max-w-xl mx-auto" style={{ color: '#a09488' }}>
              A cada segundo com um site fraco ou campanhas aleatórias rodando o seu negócio deixa dinheiro na mesa para o principal concorrente na sua cidade. Agende agora uma consultoria estratégica de diagnóstico gratuita e encontre os buracos críticos no seu funil que podemos consertar rapidamente.
            </p>
            <button className="btn-primary h-14 px-12 rounded-md text-base font-manrope font-bold">
              Quero Agendar Meu Diagnóstico Estratégico Gratuito (E Limitar a Concorrência)
            </button>
          </div>
        </section>

        {/* ── Footer ─────────────────────────────────────────────────────── */}
        <footer className="pt-20 pb-10 px-6 mt-10" style={{ background: '#0e0e13', borderTop: '1px solid rgba(201,168,76,0.06)' }}>
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-2">
              <span className="text-2xl font-black tracking-widest font-epilogue mb-6 inline-block">
                <span className="text-gold-gradient font-light">BOLD</span>
                <span style={{ color: '#A1A1AA' }}>NEXT</span>
              </span>
              <p className="font-manrope max-w-sm mb-6 leading-relaxed" style={{ color: '#a09488' }}>
                Agência digital de alta performance. Máquinas de vendas para negócios locais e experts de alto impacto.
              </p>
              <div className="flex space-x-3">
                {[Mail, Phone].map((Icon, i) => (
                  <div key={i} className="w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition-all" style={{ border: '1px solid rgba(201,168,76,0.15)', color: '#99907e' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = '#C9A84C'; (e.currentTarget as HTMLDivElement).style.color = '#C9A84C'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(201,168,76,0.15)'; (e.currentTarget as HTMLDivElement).style.color = '#99907e'; }}>
                    <Icon className="w-4 h-4" />
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-bold mb-6 text-sm tracking-wider font-epilogue" style={{ color: '#E4E1E9' }}>SOLUÇÕES</h4>
              <ul className="space-y-3 font-manrope text-sm" style={{ color: '#a09488' }}>
                {['Gestão de Tráfego', 'Criação de Sites', 'SEO Local', 'Automação IA'].map(l => (
                  <li key={l}><a href="#" className="hover:text-[#C9A84C] transition-colors">{l}</a></li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-6 text-sm tracking-wider font-epilogue" style={{ color: '#E4E1E9' }}>AGÊNCIA</h4>
              <ul className="space-y-3 font-manrope text-sm" style={{ color: '#a09488' }}>
                {['Manifesto', 'Resultados', 'O Método', 'Contato'].map(l => (
                  <li key={l}><a href="#" className="hover:text-[#C9A84C] transition-colors">{l}</a></li>
                ))}
              </ul>
            </div>
          </div>

          <div className="max-w-7xl mx-auto pt-8 flex flex-col md:flex-row justify-between items-center text-xs font-mono" style={{ borderTop: '1px solid rgba(201,168,76,0.06)', color: '#a09488' }}>
            <p>© 2026 BOLD NEXT AGENCY. TODOS OS DIREITOS RESERVADOS.</p>
            <div className="flex items-center mt-4 md:mt-0">
              <span className="w-2 h-2 rounded-full mr-2 animate-pulse" style={{ background: '#22c55e' }} />
              SYSTEMS OPERATIONAL
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
