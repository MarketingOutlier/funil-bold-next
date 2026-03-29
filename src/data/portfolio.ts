export interface Project {
  id: string;
  title: string;
  client: string;
  segment: string;
  tags: string[];
  desafio: string;
  solucao: string;
  resultados: string[];
  depoimento: {
    text: string;
    author: string;
  };
}

export const portfolioData: Project[] = [
  {
    id: "P01",
    title: "Google Meu Negócio",
    client: "Padaria Pão & Arte",
    segment: "Alimentação — Padaria artesanal (Interior de SP)",
    tags: ["GMN", "Local SEO"],
    desafio: "Perfil do Google desatualizado, sem fotos, horário errado e sem respostas às avaliações. Não aparecia em buscas locais.",
    solucao: "Otimização completa (40+ fotos, horários corrigidos, posts semanais, resposta a 100% das avaliações e configuração de atributos).",
    resultados: ["+320% visualizações em 60 dias", "+180% chamadas diretas", "Nota: 3,9 para 4,8"],
    depoimento: {
      text: "Nunca imaginei que um perfil no Google pudesse trazer tanta gente nova. Hoje recebo clientes dizendo que me encontraram pelo Maps.",
      author: "Carla Mendes, proprietária"
    }
  },
  {
    id: "P02",
    title: "Gestão de Tráfego",
    client: "Clínica Estética Lumini",
    segment: "Saúde & Beleza (Belo Horizonte/MG)",
    tags: ["Ads", "ROI 23x"],
    desafio: "Investimento ineficaz de R$ 2.000/mês no Google; Custo por Lead (CPL) de R$ 180 e conversão < 8%.",
    solucao: "Reestruturação de tráfego pago com campanhas segmentadas por procedimento, Landing Pages exclusivas e remarketing.",
    resultados: ["CPL: R$ 180 para R$ 38", "Conversão: 8% para 31%", "ROAS de 23x"],
    depoimento: {
      text: "Em 30 dias a clínica estava com a agenda lotada. Antes jogávamos dinheiro fora; agora cada real retorna multiplicado.",
      author: "Dra. Fernanda Luz, diretora"
    }
  },
  {
    id: "P03",
    title: "Criação de Site",
    client: "Advocacy Souza & Reis",
    segment: "Jurídico — Direito Trabalhista (Recife/PE)",
    tags: ["Web", "Autoridade"],
    desafio: "Ausência de presença digital; novos clientes vinham apenas por indicação.",
    solucao: "Site institucional moderno com SEO técnico, copy persuasivo e integração direta com WhatsApp.",
    resultados: ["45 novos contatos/mês", "+60% percepção de valor", "Contratos maiores fechados"],
    depoimento: {
      text: "Nosso novo site transmite a autoridade necessária para fechar contratos maiores. É nossa melhor ferramenta de vendas.",
      author: "Dr. Ricardo Souza, sócio"
    }
  },
  {
    id: "P04",
    title: "App Web PWA",
    client: "TalkFlow Idiomas",
    segment: "Educação (Curitiba/PR)",
    tags: ["PWA", "Automação"],
    desafio: "Gestão manual de 300+ alunos em planilhas; inadimplência de 22% e falhas de comunicação.",
    solucao: "Desenvolvimento de Web App (PWA) com área do aluno, controle financeiro, alertas automáticos e pagamentos via Pix.",
    resultados: ["Inadimplência: 22% para 6%", "92% engajamento no app", "Economia 15h/semana Ops"],
    depoimento: {
      text: "O app resolveu problemas operacionais de anos. Nossa equipe agora foca no atendimento, não em planilhas.",
      author: "João Augusto, diretor"
    }
  },
  {
    id: "P05",
    title: "Cardápio Online",
    client: "Restaurante Sabor Carioca",
    segment: "Alimentação (Rio de Janeiro/RJ)",
    tags: ["SaaS", "E-commerce"],
    desafio: "Dependência extrema de iFood/Rappi (taxas de 30%); falta de dados e contato direto com clientes.",
    solucao: "Cardápio digital próprio com QR code e sistema de delivery integrado via WhatsApp e Pix.",
    resultados: ["30% migração pedidos diretos", "Economia R$ 8.400/mês taxas", "Ticket médio +22%"],
    depoimento: {
      text: "Ter nosso próprio canal foi libertador. Paramos de depender só dos apps e conhecemos nossos clientes de verdade.",
      author: "Mariana Costa, gerente"
    }
  },
  {
    id: "P06",
    title: "Automação de Leads",
    client: "Imobiliária Horizonte",
    segment: "Imóveis (Goiânia/GO)",
    tags: ["IA", "Conversão"],
    desafio: "Gestão de leads lenta (4h+ para resposta); perda de 30% dos potenciais clientes por falta de follow-up.",
    solucao: "Chatbot com IA para triagem de perfil e agendamento automático de visitas via Calendly.",
    resultados: ["Resposta: 4h para 2 min", "40% redução CPL Qualificado", "+52% visitas agendadas"],
    depoimento: {
      text: "Nossa equipe foca apenas em clientes prontos para fechar, sem perder tempo com 'curiosos'.",
      author: "Roberto Silva, diretor"
    }
  },
  {
    id: "P07",
    title: "Agente de IA 24/7",
    client: "PetLovers E-commerce",
    segment: "Varejo Pets (São Paulo/SP)",
    tags: ["IA", "Faturamento"],
    desafio: "200+ mensagens diárias sem resposta rápida (mínimo 6h de espera); perda de vendas por lentidão.",
    solucao: "Agente de IA integrado ao banco de dados para responder dúvidas técnicas, sugerir produtos e rastrear pedidos.",
    resultados: ["85% resolvidas autonomamente", "-80% tempo de resposta", "18% conversão no chat"],
    depoimento: {
      text: "Nossa IA atende 24/7 com precisão total. Liberamos o time humano e as vendas subiram.",
      author: "Bianca Torres, CEO"
    }
  },
  {
    id: "P08",
    title: "IA no Recrutamento",
    client: "Consultoria Talent+",
    segment: "Recursos Humanos (São Paulo/SP)",
    tags: ["IA", "Scale"],
    desafio: "Triagem manual de 500+ currículos por vaga; extrema carga operacional e lentidão nos processos.",
    solucao: "IA para análise de currículos baseada em competências, ranking automático e chatbot para pré-entrevista.",
    resultados: ["-70% tempo de triagem", "Escala +25 clientes/mesmo time", "+40% qualidade contratação"],
    depoimento: {
      text: "A IA libertou nossos analistas para o que realmente importa. Nosso negócio escalou de verdade.",
      author: "Roberta Fonseca, fundadora"
    }
  },
  {
    id: "P09",
    title: "Meta Ads Performance",
    client: "GlobalSpeak School",
    segment: "Educação (Fortaleza/CE)",
    tags: ["Ads", "ROI 14x"],
    desafio: "Dependência de panfletos; levavam 2 meses para fechar turmas de 45 alunos.",
    solucao: "Campanhas no Meta Ads com segmentação precisa e oferta de 'Teste de Nível Gratuito'.",
    resultados: ["3 turmas lotadas em 18 dias", "CPL: R$ 210 para R$ 67", "ROI de 14x"],
    depoimento: {
      text: "Abrimos inscrições na segunda e na sexta as turmas estavam lotadas. Nunca vimos isso em 8 anos.",
      author: "Anderson Freitas, diretor"
    }
  },
  {
    id: "P10",
    title: "Branding B2B",
    client: "Alimentos Frescos",
    segment: "Atacado (Ribeirão Preto/SP)",
    tags: ["Design", "B2B"],
    desafio: "Identidade visual inconsistente e amadora; dificuldade em fechar com grandes redes de supermercados.",
    solucao: "Redesign de marca completo e manual de identidade visual profissional aplicado em toda a frota e materiais.",
    resultados: ["+25% fechamento B2B", "Percepção Premium", "Contratos maiores fechados"],
    depoimento: {
      text: "A nova marca nos abriu portas em grandes redes que antes nos ignoravam. O design transformou a confiança do mercado.",
      author: "Ricardo Oliveira, sócio"
    }
  },
  {
    id: "P11",
    title: "Identidade Visual",
    client: "Barbearia King Style",
    segment: "Serviços Premium (Vitória/ES)",
    tags: ["Logo", "Autoridade"],
    desafio: "Logotipo genérico que não atraía o público de alto ticket (Classe AB).",
    solucao: "Novo logotipo sofisticado (Black & Gold) focado em autoridade e estética masculina moderna.",
    resultados: ["+28% ticket médio", "Referência visual local", "Atração público High-Ticket"],
    depoimento: {
      text: "Todo dia alguém elogia o logo. A Bold Next elevou meu negócio para o patamar que eu sempre quis.",
      author: "Rafael King, proprietário"
    }
  },
  {
    id: "P12",
    title: "E-mail Marketing",
    client: "Loja Estilo Único",
    segment: "Varejo de Moda (Natal/RN)",
    tags: ["Leads", "Vendas"],
    desafio: "Baixa abertura de e-mails (8%) e cancelamentos de lista por falta de personalização.",
    solucao: "Estratégia de segmentação de base (VIP, Ocasionais, Inativas) e fluxos de mensagens personalizados.",
    resultados: ["Abertura: 8% para 41%", "Receita Campanha 3.4x maior", "R$ 28k na 1ª campanha"],
    depoimento: {
      text: "Paramos de falar com todo mundo da mesma forma e passamos a vender de verdade para cada perfil de cliente.",
      author: "Tatiane Rocha, fundadora"
    }
  },
  {
    id: "P13",
    title: "Copywriting de Lançamento",
    client: "Investimento Smart",
    segment: "Educação Financeira (Online)",
    tags: ["Copy", "ROI 8x"],
    desafio: "Conversão de 1,8% na Landing Page; copy sem gatilhos mentais ou urgência.",
    solucao: "Copywriting estratégico focado em benefícios e prova social; scripts de recuperação de carrinho.",
    resultados: ["Conversão: 1.8% para 5.4%", "ROI de 8.2x", "-30% Abandono de carrinho"],
    depoimento: {
      text: "O novo copy mudou o jogo. Finalmente senti que estávamos vendendo com as palavras certas.",
      author: "André Lima, infoprodutor"
    }
  },
  {
    id: "P14",
    title: "Google Meu Negócio",
    client: "Ótica Visão Clara",
    segment: "Saúde Visual (Manaus/AM)",
    tags: ["GMN", "Local SEO"],
    desafio: "Perfis de Google Maps duplicados, com fotos antigas e avaliações negativas sem resposta.",
    solucao: "Consolidação de perfis, produção de 120+ fotos profissionais e gestão ativa de avaliações.",
    resultados: ["+510% visualizações 90d", "100% respostas < 2h", "Nota: 4,9 estrelas"],
    depoimento: {
      text: "O Google agora é nosso principal canal de captação. Resolveram algo que tentávamos há dois anos.",
      author: "Dr. Fábio Visão, diretor"
    }
  },
  {
    id: "P15",
    title: "Venda de Pilates",
    client: "Estúdio Equilíbrio",
    segment: "Bem-estar & Saúde (Florianópolis/SC)",
    tags: ["Ads", "Growth"],
    desafio: "100% dos alunos vinham por indicação; falta de escalabilidade no fluxo de novos alunos.",
    solucao: "Campanhas táticas focadas em vídeos de aulas e depoimentos reais via Facebook/Instagram Ads.",
    resultados: ["42 novos planos em 45 dias", "CPL de R$ 12", "Faturamento +35% Trimestre"],
    depoimento: {
      text: "Nossa agenda nunca esteve tão cheia. O investimento se pagou logo no primeiro mês.",
      author: "Luciana Paes, fundadora"
    }
  },
  {
    id: "P16",
    title: "Site Corporativo",
    client: "Construtora Edifica",
    segment: "Engenharia & Construção B2B (Londrina/PR)",
    tags: ["Web", "B2B"],
    desafio: "Site antigo perdendo credibilidade em licitações privadas de alto valor.",
    solucao: "Novo site com portfólio interativo de obras e área dedicada para clientes e certificações.",
    resultados: ["Site em 21 dias", "Aprovação em 3 Licitações High", "+19 orçamentos/mês"],
    depoimento: {
      text: "O site profissional foi decisivo para vencermos concorrências de alto nível recentemente.",
      author: "Eng. Paulo Rumos, diretor"
    }
  },
  {
    id: "P17",
    title: "Agendamento Inteligente",
    client: "Odonto SorriFácil",
    segment: "Odontologia (Brasília/DF)",
    tags: ["Automação", "Eficiência"],
    desafio: "Agendamento manual sobrecarregando a recepção; taxa de faltas (absenteísmo) de 34%.",
    solucao: "Web App de agendamento online com confirmação e lembretes automáticos via WhatsApp.",
    resultados: ["Faltas: 34% para 9%", "80% agendamentos automáticos", "Recepção liberada 3h/dia"],
    depoimento: {
      text: "O app foi um divisor de águas. As faltas caíram e nossa recepção agora foca no acolhimento.",
      author: "Dra. Letícia Sorridente, diretora"
    }
  },
  {
    id: "P18",
    title: "Funil de Matrícula",
    client: "Escola ProSaber",
    segment: "Educação (Belém/PA)",
    tags: ["Make", "N8N"],
    desafio: "Matrículas 100% manuais e lentas; 3 funcionários focados apenas em controlar documentos.",
    solucao: "Automação do funil de matrículas: contrato digital, upload de documentos e pagamento Pix automático.",
    resultados: ["Tempo: 4 dias para 40 min", "+60 matrículas/mês extras", "Zero erro documental"],
    depoimento: {
      text: "A automação nos libertou para pensar estrategicamente em novos cursos.",
      author: "Marcos ProSaber, diretor"
    }
  },
  {
    id: "P19",
    title: "Secretária de IA",
    client: "Clínica MedFácil",
    segment: "Saúde (Salvador/BA)",
    tags: ["IA", "Conversão"],
    desafio: "Central telefônica sempre ocupada; perda de pacientes por espera excessiva no agendamento.",
    solucao: "Agente de IA multicanal (WhatsApp/Site) integrado ao sistema de agenda da clínica.",
    resultados: ["Espera: 18 min para 45 seg", "73% pacientes via IA", "+210 consultas/mês"],
    depoimento: {
      text: "Hoje os pacientes agendam em segundos. A Bold Next resolveu um problema que parecia impossível.",
      author: "Dr. Antônio MedFácil, CEO"
    }
  },
  {
    id: "P20",
    title: "Dashboard de BI",
    client: "Franquias LavaJá",
    segment: "Serviços/Lavanderias (São Paulo/SP)",
    tags: ["IA", "BI"],
    desafio: "Franqueadora sem visibilidade em tempo real; decisões baseadas em dados atrasados de 30 dias.",
    solucao: "Dashboard de BI com IA preditiva para detecção de anomalias e previsão de demanda por unidade.",
    resultados: ["Visão real: 28 unidades", "Antecipação queda receita", "+18% Crescimento médio"],
    depoimento: {
      text: "Finalmente tenho um relatório toda segunda explicando o que aconteceu e o que preciso fazer.",
      author: "Carina LavaJá, CEO"
    }
  },
  {
    id: "P21",
    title: "Retomada Local",
    client: "Hospital PetVida",
    segment: "Saúde Animal (Porto Alegre/RS)",
    tags: ["Ads", "ROI 9x"],
    desafio: "Queda de 20% no fluxo devido à abertura de um concorrente vizinho.",
    solucao: "Google Ads focado em alta intenção (emergências e vacinas) e reestruturação do GMN local.",
    resultados: ["+110 clientes novos/mês", "Recuperação total fluxo", "ROI de 9x"],
    depoimento: {
      text: "Recuperamos nosso espaço no mercado e crescemos mesmo com a nova concorrência.",
      author: "Dra. Juliana PetVida, sócia"
    }
  },
  {
    id: "P22",
    title: "Pitch Deck & Branding",
    client: "Coderise Fintech",
    segment: "Tecnologia B2B (São Paulo/SP)",
    tags: ["Identity", "Equity"],
    desafio: "Materiais visuais e Pitch Deck improvisados prejudicando a captação de investimento.",
    solucao: "Branding completo e Pitch Deck profissional focado em VC (Venture Capital).",
    resultados: ["Rodada Seed R$ 1.2M", "Captação em 60 dias", "Alta confiança investidor"],
    depoimento: {
      text: "Com o material da Bold Next, entramos nas reuniões com investidores prontos para fechar.",
      author: "Felipe Rise, CEO"
    }
  },
  {
    id: "P23",
    title: "Rebranding Premium",
    client: "Confeitaria Encanto",
    segment: "Alimentação (Campinas/SP)",
    tags: ["Design", "Vendas"],
    desafio: "Empresa cresceu mas a marca era amadora (logo do Canva); dificuldade em parcerias maiores.",
    solucao: "Brandbook completo e estratégias de posicionamento de marca premium.",
    resultados: ["Ticket médio +35%", "Entrada redes supermercado", "Manual de marca 14 dias"],
    depoimento: {
      text: "A marca nova abriu portas que eu nem sabia que existiam. Meu ateliê valorizou 100%.",
      author: "Renata Doce, fundadora"
    }
  },
  {
    id: "P24",
    title: "Retenção de Clientes",
    client: "Academia de Música",
    segment: "Educação & Arte (Belo Horizonte/MG)",
    tags: ["Automação", "LTV"],
    desafio: "Baixa retenção de alunos (52%); comunicação genérica para perfis diferentes de estudantes.",
    solucao: "Segmentação de público em 5 clusters com comunicações personalizadas e campanhas de reativação.",
    resultados: ["Renovação: 52% para 71%", "Churn reduzido 43%", "LTV aumentado 2.1x"],
    depoimento: {
      text: "Entendemos as motivações diferentes de cada aluno e os resultados na retenção foram imediatos.",
      author: "Eduardo Allegro, diretor"
    }
  }
];
