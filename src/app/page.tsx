"use client";

import Link from "next/link";
import {
  ArrowRight,
  Brain,
  FileText,
  Stethoscope,
  Clock,
  CheckCircle2,
  Play,
  Sparkles,
  ChevronRight,
  Shield,
  Users,
  BarChart,
  Zap,
  MessageSquare,
  Star,
  ChevronDown,
  Clipboard,
  ChevronsUpDown,
  PencilRuler,
  ThumbsUp,
  RefreshCw,
  Mic,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";
import { AudioRecorder } from "@/components/audio-recorder";
import { useRef, useEffect } from "react";

export default function HomePage() {
  // For the "How It Works" section tabs
  const [activeTab, setActiveTab] = useState(1);

  // For FAQ section
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Refs for scroll animation
  const heroRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const painPointsRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const howItWorksRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  // Simple animation on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in");
            entry.target.classList.remove("opacity-0");
            entry.target.classList.add("opacity-100");
          }
        });
      },
      { threshold: 0.1 },
    );

    const refs = [
      heroRef,
      statsRef,
      painPointsRef,
      featuresRef,
      howItWorksRef,
      testimonialsRef,
      ctaRef,
    ];
    refs.forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => {
      refs.forEach((ref) => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
    };
  }, []);

  // Dummy function for demo purposes
  const handleTranscriptionComplete = (text: string) => {
    console.log(text);
  };

  return (
    <main className="flex min-h-screen flex-col">
      {/* Navbar - Enhanced with Sticky Behavior */}
      <nav className="fixed top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md transition-all duration-200">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <Stethoscope className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">EscutaMed</span>
          </div>
          <div className="hidden space-x-8 md:flex">
            <a
              href="#features"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Funcionalidades
            </a>
            <a
              href="#how-it-works"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Como funciona
            </a>
            <a
              href="#testimonials"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Depoimentos
            </a>
            <a
              href="#faq"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              FAQ
            </a>
          </div>
          <Link href="/dashboard">
            <Button variant="default" className="group gap-2">
              Acessar plataforma
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section - Enhanced with Animation and Visual Appeal */}
      <section
        ref={heroRef}
        className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-secondary/50 via-background to-background px-4 pt-16 text-center"
      >
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,hsl(var(--primary)/10%),transparent_70%),radial-gradient(circle_at_bottom_left,hsl(var(--secondary)/15%),transparent_70%)]" />

        <div className="relative translate-y-8 transform space-y-6 opacity-100 transition-all duration-1000">
          <div className="mb-6 inline-flex animate-pulse items-center rounded-full bg-primary/10 px-4 py-2 text-sm text-primary">
            <Sparkles className="mr-2 h-4 w-4" /> Inteligência Artificial a
            serviço da medicina
          </div>
          <h1 className="mb-6 text-5xl font-bold tracking-tight text-foreground sm:text-7xl">
            Atenda com <span className="text-primary">presença</span>,
            <br />
            <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              deixe a IA documentar
            </span>
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-xl leading-relaxed text-muted-foreground">
            Nossa IA avançada escuta, entende e registra suas consultas em tempo
            real. Foque 100% no seu paciente enquanto criamos prontuários
            precisos e completos automaticamente.
          </p>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link href="/dashboard">
              <Button
                size="lg"
                className="group relative gap-2 overflow-hidden text-lg"
              >
                <span className="relative z-10">Experimente gratuitamente</span>
                <ArrowRight className="relative z-10 h-5 w-5 transition-transform group-hover:translate-x-1" />
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary/80 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
              </Button>
            </Link>
            <Button
              variant="outline"
              size="lg"
              className="group gap-2 border-primary/20 text-lg hover:bg-primary/5"
            >
              Ver demonstração
              <Play className="h-5 w-5 transition-transform group-hover:scale-110" />
            </Button>
          </div>
        </div>

        {/* Product Visualization */}
        <div className="mt-16 w-full max-w-4xl transform rounded-xl border border-border bg-card/30 p-6 shadow-lg backdrop-blur-sm transition-all duration-500 hover:shadow-primary/10">
          <div className="flex flex-col items-center gap-8 md:flex-row">
            {/* Left: Audio Recorder Preview */}
            <div className="flex w-full justify-center md:w-1/2">
              <div className="scale-75 md:scale-100">
                <AudioRecorder
                  onTranscriptionComplete={handleTranscriptionComplete}
                />
              </div>
            </div>

            {/* Right: Transcript Preview */}
            <div className="flex w-full flex-col gap-4 md:w-1/2">
              <div className="flex items-center gap-2 text-primary">
                <Clipboard className="h-5 w-5" />
                <h3 className="font-semibold">Transcrição em tempo real</h3>
              </div>
              <div className="rounded-lg border border-border bg-background/80 p-4 shadow-sm">
                <p className="text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">Médico:</span>{" "}
                  Bom dia, Maria. Como está se sentindo hoje?
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">
                    Paciente:
                  </span>{" "}
                  Bom dia, doutor. Estou com dor de cabeça há 3 dias e um pouco
                  de tontura.
                </p>
                <div className="mt-3 flex items-center gap-2">
                  <div className="h-2 w-2 animate-pulse rounded-full bg-primary/80"></div>
                  <span className="text-xs text-primary/80">
                    Transcrição em andamento...
                  </span>
                </div>
              </div>
              <div className="rounded-lg border border-border bg-background/80 p-4 shadow-sm">
                <div className="mb-2 flex items-center gap-2">
                  <FileText className="h-4 w-4 text-primary" />
                  <h4 className="text-sm font-medium">
                    Prontuário gerado automaticamente
                  </h4>
                </div>
                <p className="text-xs text-muted-foreground">
                  <span className="font-semibold">Queixa principal:</span>{" "}
                  Cefaleia há 3 dias com tontura associada.
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  <span className="font-semibold">
                    História da doença atual:
                  </span>{" "}
                  Paciente relata início gradual de dor...
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats with improved visual - Animated on scroll */}
      <section
        ref={statsRef}
        className="bg-gradient-to-r from-background to-secondary/10 py-12"
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="group flex flex-col items-center rounded-xl border border-border bg-card p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-lg">
              <Clock className="mb-4 h-12 w-12 text-primary/80 transition-colors group-hover:text-primary" />
              <span className="mb-2 bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-4xl font-bold text-transparent">
                2h/dia
              </span>
              <span className="text-center text-muted-foreground">
                Tempo economizado em documentação e registros médicos
              </span>
            </div>
            <div className="group flex flex-col items-center rounded-xl border border-border bg-card p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-lg">
              <CheckCircle2 className="mb-4 h-12 w-12 text-primary/80 transition-colors group-hover:text-primary" />
              <span className="mb-2 bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-4xl font-bold text-transparent">
                98%
              </span>
              <span className="text-center text-muted-foreground">
                Precisão da IA na captura e organização das informações clínicas
              </span>
            </div>
            <div className="group flex flex-col items-center rounded-xl border border-border bg-card p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-lg">
              <Users className="mb-4 h-12 w-12 text-primary/80 transition-colors group-hover:text-primary" />
              <span className="mb-2 bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-4xl font-bold text-transparent">
                +5.000
              </span>
              <span className="text-center text-muted-foreground">
                Médicos já estão economizando tempo e melhorando a qualidade do
                atendimento
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof - NEW SECTION */}
      <section className="bg-background py-16">
        <div className="container mx-auto px-4">
          <h3 className="mb-8 text-center text-lg text-muted-foreground">
            Médicos de diversas especialidades já estão usando a EscutaMed
          </h3>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
            {/* These would be replaced with actual logos */}
            <div className="flex h-12 w-32 items-center justify-center rounded-md bg-muted/30 text-sm font-medium text-muted-foreground">
              Hospital A
            </div>
            <div className="flex h-12 w-32 items-center justify-center rounded-md bg-muted/30 text-sm font-medium text-muted-foreground">
              Clínica B
            </div>
            <div className="flex h-12 w-32 items-center justify-center rounded-md bg-muted/30 text-sm font-medium text-muted-foreground">
              Instituto C
            </div>
            <div className="flex h-12 w-32 items-center justify-center rounded-md bg-muted/30 text-sm font-medium text-muted-foreground">
              Consultório D
            </div>
            <div className="flex h-12 w-32 items-center justify-center rounded-md bg-muted/30 text-sm font-medium text-muted-foreground">
              Centro E
            </div>
          </div>
        </div>
      </section>

      {/* Pain Points Section - Enhanced */}
      <section
        id="problems"
        ref={painPointsRef}
        className="bg-gradient-to-b from-card to-background py-24"
      >
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold text-card-foreground">
              Reconhece esses <span className="text-primary">desafios</span> na
              sua rotina?
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              A EscutaMed foi desenvolvida para resolver problemas reais que
              médicos enfrentam todos os dias.
            </p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <Card className="group overflow-hidden border-border bg-card/50 backdrop-blur-sm transition-all duration-300 hover:border-primary/20 hover:shadow-lg">
              <CardHeader className="pb-2">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors group-hover:bg-primary/20">
                  <Clock className="h-6 w-6" />
                </div>
                <CardTitle className="text-lg font-semibold text-foreground transition-colors group-hover:text-primary">
                  Horas extras desnecessárias
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  &quot;Passo pelo menos duas horas por dia completando
                  prontuários e documentando consultas. Isso significa menos
                  tempo com minha família.&quot;
                </p>
              </CardContent>
            </Card>

            <Card className="group overflow-hidden border-border bg-card/50 backdrop-blur-sm transition-all duration-300 hover:border-primary/20 hover:shadow-lg">
              <CardHeader className="pb-2">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors group-hover:bg-primary/20">
                  <FileText className="h-6 w-6" />
                </div>
                <CardTitle className="text-lg font-semibold text-foreground transition-colors group-hover:text-primary">
                  Documentação incompleta
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  &quot;Muitas vezes esqueço de registrar detalhes importantes
                  das consultas porque estou concentrado no paciente. Isso pode
                  levar a problemas de continuidade do cuidado.&quot;
                </p>
              </CardContent>
            </Card>

            <Card className="group overflow-hidden border-border bg-card/50 backdrop-blur-sm transition-all duration-300 hover:border-primary/20 hover:shadow-lg">
              <CardHeader className="pb-2">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors group-hover:bg-primary/20">
                  <Brain className="h-6 w-6" />
                </div>
                <CardTitle className="text-lg font-semibold text-foreground transition-colors group-hover:text-primary">
                  Conexão prejudicada
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  &quot;Dividir minha atenção entre escutar o paciente e digitar
                  no computador prejudica a qualidade da consulta e a relação
                  médico-paciente.&quot;
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section - Enhanced */}
      <section
        id="features"
        ref={featuresRef}
        className="bg-gradient-to-t from-secondary/20 to-background py-24"
      >
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold text-foreground">
              Como a <span className="text-primary">EscutaMed</span> transforma
              sua rotina
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Uma solução completa que se adapta ao seu jeito de trabalhar e
              elimina tarefas administrativas
            </p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <Card className="group relative overflow-hidden border-border transition-all duration-300 hover:border-primary/20 hover:shadow-lg">
              <div className="absolute -right-3 -top-3 z-10 rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                Exclusivo
              </div>
              <div className="absolute -right-24 -top-24 h-48 w-48 rounded-full bg-primary/5 blur-3xl transition-colors group-hover:bg-primary/10"></div>
              <CardHeader>
                <div className="mb-4 inline-block rounded-lg bg-primary/10 p-3 transition-colors group-hover:bg-primary/20">
                  <Brain className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl font-semibold text-card-foreground transition-colors group-hover:text-primary">
                  Foco Total no Paciente
                </CardTitle>
                <CardDescription className="text-base text-muted-foreground">
                  Mantenha contato visual e estabeleça conexões mais profundas
                  com seus pacientes.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="rounded-full bg-primary/10 p-1">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">
                      Transcrição em tempo real
                    </span>{" "}
                    - Captura precisa de toda a conversa sem necessidade de
                    anotações manuais
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="rounded-full bg-primary/10 p-1">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">
                      Estruturação automática
                    </span>{" "}
                    - A IA organiza as informações no formato SOAP sem
                    intervenção manual
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="rounded-full bg-primary/10 p-1">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">
                      Interação natural
                    </span>{" "}
                    - Sem comandos especiais, a IA entende o contexto da
                    consulta
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  variant="ghost"
                  className="group w-full justify-between text-primary hover:text-primary"
                >
                  Saiba mais
                  <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </CardFooter>
            </Card>

            <Card className="group relative overflow-hidden border-border transition-all duration-300 hover:border-primary/20 hover:shadow-lg">
              <div className="absolute -left-24 -top-24 h-48 w-48 rounded-full bg-primary/5 blur-3xl transition-colors group-hover:bg-primary/10"></div>
              <CardHeader>
                <div className="mb-4 inline-block rounded-lg bg-primary/10 p-3 transition-colors group-hover:bg-primary/20">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl font-semibold text-card-foreground transition-colors group-hover:text-primary">
                  Registros Inteligentes
                </CardTitle>
                <CardDescription className="text-base text-muted-foreground">
                  Prontuários completos e precisos criados automaticamente
                  durante a consulta.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="rounded-full bg-primary/10 p-1">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">
                      Detecção de sintomas
                    </span>{" "}
                    - Identifica automaticamente queixas, sinais e sintomas
                    mencionados
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="rounded-full bg-primary/10 p-1">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">
                      Codificação CID
                    </span>{" "}
                    - Sugere automaticamente códigos CID-10 baseados na consulta
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="rounded-full bg-primary/10 p-1">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">
                      Integração com sistemas
                    </span>{" "}
                    - Exportação fácil para os principais sistemas de prontuário
                    eletrônico
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  variant="ghost"
                  className="group w-full justify-between text-primary hover:text-primary"
                >
                  Saiba mais
                  <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </CardFooter>
            </Card>

            <Card className="group relative overflow-hidden border-border transition-all duration-300 hover:border-primary/20 hover:shadow-lg">
              <div className="absolute -bottom-24 -right-24 h-48 w-48 rounded-full bg-primary/5 blur-3xl transition-colors group-hover:bg-primary/10"></div>
              <CardHeader>
                <div className="mb-4 inline-block rounded-lg bg-primary/10 p-3 transition-colors group-hover:bg-primary/20">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl font-semibold text-card-foreground transition-colors group-hover:text-primary">
                  Mais Tempo para Você
                </CardTitle>
                <CardDescription className="text-base text-muted-foreground">
                  Recupere suas horas extras eliminando tarefas administrativas.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="rounded-full bg-primary/10 p-1">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">
                      Economia de 2h diárias
                    </span>{" "}
                    - Elimine o tempo gasto com documentação após o expediente
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="rounded-full bg-primary/10 p-1">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">
                      Consultas otimizadas
                    </span>{" "}
                    - Atenda mais pacientes ou dedique mais tempo a cada um
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="rounded-full bg-primary/10 p-1">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">
                      Qualidade de vida
                    </span>{" "}
                    - Saia do trabalho no horário e aproveite seu tempo livre
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  variant="ghost"
                  className="group w-full justify-between text-primary hover:text-primary"
                >
                  Saiba mais
                  <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section - NEW */}
      <section id="how-it-works" ref={howItWorksRef} className="bg-card py-24">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold text-card-foreground">
              Como a <span className="text-primary">EscutaMed</span> funciona
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Um processo simples e eficiente que se integra naturalmente à sua
              rotina de atendimento
            </p>
          </div>

          {/* Tabs for How It Works */}
          <div className="flex flex-col items-center gap-8 lg:flex-row">
            {/* Steps on left */}
            <div className="w-full lg:w-1/3">
              <div className="space-y-4">
                <button
                  onClick={() => setActiveTab(1)}
                  className={`flex w-full items-center gap-4 rounded-lg p-4 transition-all ${activeTab === 1 ? "bg-primary text-primary-foreground" : "bg-card hover:bg-muted"}`}
                >
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full ${activeTab === 1 ? "bg-primary-foreground text-primary" : "bg-primary/10 text-primary"}`}
                  >
                    <Mic className="h-5 w-5" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-medium">Passo 1</h3>
                    <p
                      className={`text-sm ${activeTab === 1 ? "text-primary-foreground/80" : "text-muted-foreground"}`}
                    >
                      Inicie a gravação
                    </p>
                  </div>
                </button>

                <button
                  onClick={() => setActiveTab(2)}
                  className={`flex w-full items-center gap-4 rounded-lg p-4 transition-all ${activeTab === 2 ? "bg-primary text-primary-foreground" : "bg-card hover:bg-muted"}`}
                >
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full ${activeTab === 2 ? "bg-primary-foreground text-primary" : "bg-primary/10 text-primary"}`}
                  >
                    <MessageSquare className="h-5 w-5" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-medium">Passo 2</h3>
                    <p
                      className={`text-sm ${activeTab === 2 ? "text-primary-foreground/80" : "text-muted-foreground"}`}
                    >
                      Atenda normalmente
                    </p>
                  </div>
                </button>

                <button
                  onClick={() => setActiveTab(3)}
                  className={`flex w-full items-center gap-4 rounded-lg p-4 transition-all ${activeTab === 3 ? "bg-primary text-primary-foreground" : "bg-card hover:bg-muted"}`}
                >
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full ${activeTab === 3 ? "bg-primary-foreground text-primary" : "bg-primary/10 text-primary"}`}
                  >
                    <FileText className="h-5 w-5" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-medium">Passo 3</h3>
                    <p
                      className={`text-sm ${activeTab === 3 ? "text-primary-foreground/80" : "text-muted-foreground"}`}
                    >
                      Revise e aprove
                    </p>
                  </div>
                </button>

                <button
                  onClick={() => setActiveTab(4)}
                  className={`flex w-full items-center gap-4 rounded-lg p-4 transition-all ${activeTab === 4 ? "bg-primary text-primary-foreground" : "bg-card hover:bg-muted"}`}
                >
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full ${activeTab === 4 ? "bg-primary-foreground text-primary" : "bg-primary/10 text-primary"}`}
                  >
                    <Clipboard className="h-5 w-5" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-medium">Passo 4</h3>
                    <p
                      className={`text-sm ${activeTab === 4 ? "text-primary-foreground/80" : "text-muted-foreground"}`}
                    >
                      Salve ou exporte
                    </p>
                  </div>
                </button>
              </div>
            </div>

            {/* Visual representation on right */}
            <div className="relative h-96 w-full overflow-hidden rounded-xl border border-border bg-muted/50 lg:w-2/3">
              {activeTab === 1 && (
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                  <div className="mb-6 rounded-full bg-primary/10 p-4">
                    <Mic className="h-10 w-10 text-primary" />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold">
                    Inicie a gravação com um clique
                  </h3>
                  <p className="max-w-md text-muted-foreground">
                    Basta abrir o aplicativo EscutaMed e clicar no botão de
                    gravação. A IA está pronta para capturar toda a consulta com
                    alta fidelidade.
                  </p>
                  <div className="mt-8 w-full max-w-sm rounded-lg border border-border bg-background/60 p-4 backdrop-blur-sm">
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                        <Mic className="h-6 w-6 text-primary" />
                      </div>
                      <div className="text-left">
                        <p className="text-sm font-medium">Iniciar gravação</p>
                        <p className="text-xs text-muted-foreground">
                          Clique para começar
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 2 && (
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                  <div className="mb-6 rounded-full bg-primary/10 p-4">
                    <MessageSquare className="h-10 w-10 text-primary" />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold">
                    Atenda seu paciente normalmente
                  </h3>
                  <p className="max-w-md text-muted-foreground">
                    Conduza a consulta como sempre fez, mantendo 100% do foco no
                    paciente. A IA captura cada detalhe, sem necessidade de
                    comandos especiais.
                  </p>
                  <div className="mt-8 w-full max-w-sm rounded-lg border border-border bg-background/60 p-4 backdrop-blur-sm">
                    <div className="flex flex-col gap-2">
                      <p className="text-sm">
                        <span className="font-medium">Médico:</span> Conte-me
                        mais sobre essa dor de cabeça.
                      </p>
                      <p className="text-sm">
                        <span className="font-medium">Paciente:</span> Começou
                        do lado direito e é pulsátil...
                      </p>
                      <div className="mt-1 flex items-center gap-2">
                        <div className="h-2 w-2 animate-pulse rounded-full bg-destructive"></div>
                        <span className="text-xs text-destructive">
                          Gravando...
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 3 && (
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                  <div className="mb-6 rounded-full bg-primary/10 p-4">
                    <FileText className="h-10 w-10 text-primary" />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold">
                    Revise o prontuário gerado
                  </h3>
                  <p className="max-w-md text-muted-foreground">
                    Após a consulta, confira o prontuário estruturado criado
                    automaticamente pela IA. Faça ajustes se necessário, tudo
                    com poucos cliques.
                  </p>
                  <div className="mt-8 w-full max-w-sm rounded-lg border border-border bg-background/60 p-4 backdrop-blur-sm">
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-medium">
                          Prontuário - Maria Silva
                        </h4>
                        <div className="flex items-center gap-1">
                          <PencilRuler className="h-3 w-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">
                            Editar
                          </span>
                        </div>
                      </div>
                      <div className="space-y-1 text-left text-xs">
                        <p>
                          <span className="font-medium">S:</span> Paciente
                          queixa-se de cefaleia...
                        </p>
                        <p>
                          <span className="font-medium">O:</span> Ao exame
                          físico, paciente...
                        </p>
                        <p>
                          <span className="font-medium">A:</span> Enxaqueca sem
                          aura (G43.0)
                        </p>
                        <p>
                          <span className="font-medium">P:</span> Prescrição de
                          analgésico...
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 4 && (
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                  <div className="mb-6 rounded-full bg-primary/10 p-4">
                    <Clipboard className="h-10 w-10 text-primary" />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold">
                    Salve ou exporte o documento
                  </h3>
                  <p className="max-w-md text-muted-foreground">
                    Integração nativa com os principais sistemas de prontuário
                    eletrônico. Exporte em PDF, compartilhe ou salve diretamente
                    no seu sistema.
                  </p>
                  <div className="mt-8 w-full max-w-sm rounded-lg border border-border bg-background/60 p-4 backdrop-blur-sm">
                    <div className="flex flex-col gap-3">
                      <h4 className="text-sm font-medium">Exportar para:</h4>
                      <div className="grid grid-cols-2 gap-2">
                        <button className="flex items-center gap-1 rounded-md bg-muted/50 p-2 text-xs transition-colors hover:bg-muted">
                          <RefreshCw className="h-3 w-3" /> Sistema A
                        </button>
                        <button className="flex items-center gap-1 rounded-md bg-muted/50 p-2 text-xs transition-colors hover:bg-muted">
                          <FileText className="h-3 w-3" /> PDF
                        </button>
                        <button className="flex items-center gap-1 rounded-md bg-muted/50 p-2 text-xs transition-colors hover:bg-muted">
                          <ThumbsUp className="h-3 w-3" /> Sistema B
                        </button>
                        <button className="flex items-center gap-1 rounded-md bg-muted/50 p-2 text-xs transition-colors hover:bg-muted">
                          <Clipboard className="h-3 w-3" /> Copiar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section - Enhanced */}
      <section
        id="testimonials"
        ref={testimonialsRef}
        className="bg-gradient-to-b from-background to-secondary/50 py-24"
      >
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold text-foreground">
              O que dizem os médicos que já{" "}
              <span className="text-primary">transformaram</span> sua prática
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Junte-se a milhares de profissionais que recuperaram qualidade de
              vida com a EscutaMed
            </p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {/* Testimony 1 */}
            <div className="group flex flex-col gap-4 rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-lg">
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 overflow-hidden rounded-full bg-gradient-to-br from-primary/20 to-primary/10 p-1">
                  <div className="flex h-full w-full items-center justify-center rounded-full bg-card">
                    <span className="text-lg font-semibold text-primary">
                      MS
                    </span>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-card-foreground">
                    Dra. Maria Silva
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Clínica Geral • São Paulo
                  </p>
                </div>
              </div>
              <div className="mb-2 flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="italic text-muted-foreground">
                &quot;Recuperei 2 horas do meu dia! Antes de usar a EscutaMed eu
                ficava até tarde preenchendo prontuários. Agora consigo terminar
                todo o trabalho durante o expediente e tenho mais tempo para a
                família.&quot;
              </p>
              <div className="mt-auto border-t border-border pt-4">
                <p className="text-sm font-medium text-foreground">
                  Resultados:
                </p>
                <div className="mt-2 flex items-center gap-4">
                  <div className="flex flex-col items-center">
                    <span className="text-xl font-bold text-primary">95%</span>
                    <span className="text-xs text-muted-foreground">
                      Menos horas extras
                    </span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-xl font-bold text-primary">27%</span>
                    <span className="text-xs text-muted-foreground">
                      Mais pacientes
                    </span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-xl font-bold text-primary">100%</span>
                    <span className="text-xs text-muted-foreground">
                      Menos estresse
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Testimony 2 */}
            <div className="group flex flex-col gap-4 rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-lg">
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 overflow-hidden rounded-full bg-gradient-to-br from-primary/20 to-primary/10 p-1">
                  <div className="flex h-full w-full items-center justify-center rounded-full bg-card">
                    <span className="text-lg font-semibold text-primary">
                      CS
                    </span>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-card-foreground">
                    Dr. Carlos Santos
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Cardiologista • Rio de Janeiro
                  </p>
                </div>
              </div>
              <div className="mb-2 flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="italic text-muted-foreground">
                &quot;Meus pacientes notaram a diferença imediatamente. Agora
                mantenho contato visual durante toda a consulta. Consigo ouvir
                melhor, entender mais profundamente e criar uma conexão genuína
                com cada pessoa.&quot;
              </p>
              <div className="mt-auto border-t border-border pt-4">
                <p className="text-sm font-medium text-foreground">
                  Resultados:
                </p>
                <div className="mt-2 flex items-center gap-4">
                  <div className="flex flex-col items-center">
                    <span className="text-xl font-bold text-primary">82%</span>
                    <span className="text-xs text-muted-foreground">
                      + satisfação
                    </span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-xl font-bold text-primary">30%</span>
                    <span className="text-xs text-muted-foreground">
                      + atenção
                    </span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-xl font-bold text-primary">100%</span>
                    <span className="text-xs text-muted-foreground">
                      + qualidade
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Testimony 3 */}
            <div className="group flex flex-col gap-4 rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-lg">
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 overflow-hidden rounded-full bg-gradient-to-br from-primary/20 to-primary/10 p-1">
                  <div className="flex h-full w-full items-center justify-center rounded-full bg-card">
                    <span className="text-lg font-semibold text-primary">
                      AC
                    </span>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-card-foreground">
                    Dra. Ana Costa
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Pediatra • Curitiba
                  </p>
                </div>
              </div>
              <div className="mb-2 flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="italic text-muted-foreground">
                &quot;A qualidade dos meus prontuários melhorou drasticamente. A
                EscutaMed captura detalhes que eu frequentemente esquecia de
                registrar. Isso me dá mais segurança clínica e jurídica no meu
                trabalho.&quot;
              </p>
              <div className="mt-auto border-t border-border pt-4">
                <p className="text-sm font-medium text-foreground">
                  Resultados:
                </p>
                <div className="mt-2 flex items-center gap-4">
                  <div className="flex flex-col items-center">
                    <span className="text-xl font-bold text-primary">98%</span>
                    <span className="text-xs text-muted-foreground">
                      + precisão
                    </span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-xl font-bold text-primary">75%</span>
                    <span className="text-xs text-muted-foreground">
                      + completos
                    </span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-xl font-bold text-primary">100%</span>
                    <span className="text-xs text-muted-foreground">
                      + segurança
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section - NEW */}
      <section id="faq" className="bg-background py-24">
        <div className="mx-auto max-w-4xl px-4">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold text-foreground">
              Perguntas <span className="text-primary">Frequentes</span>
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Tudo que você precisa saber sobre a EscutaMed
            </p>
          </div>

          <div className="space-y-4">
            {/* FAQ Item 1 */}
            <div className="rounded-lg border border-border">
              <button
                onClick={() => setActiveFaq(activeFaq === 1 ? null : 1)}
                className="flex w-full items-center justify-between p-4 text-left"
              >
                <h3 className="font-medium">
                  A IA consegue entender terminologias médicas específicas?
                </h3>
                <ChevronDown
                  className={`h-5 w-5 text-muted-foreground transition-transform ${activeFaq === 1 ? "rotate-180" : ""}`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all ${activeFaq === 1 ? "max-h-96" : "max-h-0"}`}
              >
                <div className="p-4 pt-0 text-muted-foreground">
                  Sim, a EscutaMed foi treinada com uma extensa base de
                  conhecimento médico. Ela reconhece e compreende não apenas
                  terminologias comuns, mas também jargões de especialidades,
                  nomenclaturas anatômicas, nomes de medicamentos, procedimentos
                  e protocolos clínicos. A precisão para terminologia médica é
                  superior a 98%.
                </div>
              </div>
            </div>

            {/* FAQ Item 2 */}
            <div className="rounded-lg border border-border">
              <button
                onClick={() => setActiveFaq(activeFaq === 2 ? null : 2)}
                className="flex w-full items-center justify-between p-4 text-left"
              >
                <h3 className="font-medium">
                  Meus dados e os dados dos pacientes estão seguros?
                </h3>
                <ChevronDown
                  className={`h-5 w-5 text-muted-foreground transition-transform ${activeFaq === 2 ? "rotate-180" : ""}`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all ${activeFaq === 2 ? "max-h-96" : "max-h-0"}`}
              >
                <div className="p-4 pt-0 text-muted-foreground">
                  Absolutamente. A privacidade e segurança são nossas
                  prioridades. Todas as interações são criptografadas
                  end-to-end, e seguimos rigorosamente as normas da LGPD e
                  HIPAA. Os dados são armazenados em servidores com certificação
                  de segurança médica e você tem controle total sobre o
                  armazenamento e o acesso às informações.
                </div>
              </div>
            </div>

            {/* FAQ Item 3 */}
            <div className="rounded-lg border border-border">
              <button
                onClick={() => setActiveFaq(activeFaq === 3 ? null : 3)}
                className="flex w-full items-center justify-between p-4 text-left"
              >
                <h3 className="font-medium">
                  A EscutaMed funciona em quais dispositivos?
                </h3>
                <ChevronDown
                  className={`h-5 w-5 text-muted-foreground transition-transform ${activeFaq === 3 ? "rotate-180" : ""}`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all ${activeFaq === 3 ? "max-h-96" : "max-h-0"}`}
              >
                <div className="p-4 pt-0 text-muted-foreground">
                  Nossa plataforma é completamente responsiva e funciona em
                  qualquer dispositivo moderno com acesso à internet. Temos
                  aplicativos nativos para iOS e Android, além de versão web
                  otimizada para desktop. Você pode alternar entre dispositivos
                  mantendo todos os seus dados sincronizados.
                </div>
              </div>
            </div>

            {/* FAQ Item 4 */}
            <div className="rounded-lg border border-border">
              <button
                onClick={() => setActiveFaq(activeFaq === 4 ? null : 4)}
                className="flex w-full items-center justify-between p-4 text-left"
              >
                <h3 className="font-medium">
                  É necessário ter internet para usar a EscutaMed?
                </h3>
                <ChevronDown
                  className={`h-5 w-5 text-muted-foreground transition-transform ${activeFaq === 4 ? "rotate-180" : ""}`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all ${activeFaq === 4 ? "max-h-96" : "max-h-0"}`}
              >
                <div className="p-4 pt-0 text-muted-foreground">
                  Para funcionalidade completa, sim. No entanto, nosso
                  aplicativo possui um modo offline que permite gravar consultas
                  mesmo sem conexão. Quando a conexão for restabelecida, as
                  gravações são sincronizadas e processadas automaticamente.
                  Isso garante que você nunca perca dados, mesmo em áreas com
                  conectividade limitada.
                </div>
              </div>
            </div>

            {/* FAQ Item 5 */}
            <div className="rounded-lg border border-border">
              <button
                onClick={() => setActiveFaq(activeFaq === 5 ? null : 5)}
                className="flex w-full items-center justify-between p-4 text-left"
              >
                <h3 className="font-medium">
                  Quanto tempo eu economizo usando a EscutaMed?
                </h3>
                <ChevronDown
                  className={`h-5 w-5 text-muted-foreground transition-transform ${activeFaq === 5 ? "rotate-180" : ""}`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all ${activeFaq === 5 ? "max-h-96" : "max-h-0"}`}
              >
                <div className="p-4 pt-0 text-muted-foreground">
                  Nossos usuários relatam uma economia média de 2 horas por dia
                  de trabalho. Médicos que atendem 20 pacientes por dia costumam
                  economizar entre 8 e 12 minutos por consulta no tempo que
                  seria gasto com documentação. Isso representa não apenas mais
                  tempo disponível, mas também redução significativa do estresse
                  e melhoria na qualidade de vida.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - IMPROVED */}
      <section
        ref={ctaRef}
        className="relative overflow-hidden bg-gradient-to-r from-primary to-primary/90 py-24"
      >
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.2),transparent_70%)]"></div>
          <div className="absolute top-0 h-px w-full bg-gradient-to-r from-transparent via-primary-foreground/20 to-transparent"></div>
          <div className="absolute bottom-0 h-px w-full bg-gradient-to-r from-transparent via-primary-foreground/20 to-transparent"></div>
        </div>
        <div className="relative mx-auto max-w-4xl px-4 text-center">
          <h2 className="mb-4 text-4xl font-bold text-primary-foreground">
            Pronto para{" "}
            <span className="underline decoration-primary-foreground/30 underline-offset-8">
              transformar
            </span>{" "}
            seus atendimentos?
          </h2>
          <p className="mb-8 text-xl text-primary-foreground/90">
            Comece agora e recupere o prazer de ser médico. Em apenas 5 minutos
            você estará economizando horas do seu dia.
          </p>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link href="/dashboard" className="w-full sm:w-auto">
              <Button
                size="lg"
                variant="secondary"
                className="group relative w-full overflow-hidden text-lg sm:w-auto"
              >
                <span className="relative z-10">Começar gratuitamente</span>
                <ArrowRight className="relative z-10 ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                <div className="absolute inset-0 bg-white opacity-0 transition-opacity duration-300 group-hover:opacity-10"></div>
              </Button>
            </Link>
            <Button
              variant="outline"
              size="lg"
              className="w-full border-primary-foreground/20 text-lg text-primary-foreground hover:bg-primary-foreground/10 sm:w-auto"
            >
              Agendar demonstração
              <ChevronsUpDown className="ml-2 h-5 w-5" />
            </Button>
          </div>
          <p className="mt-6 text-sm text-primary-foreground/70">
            Sem necessidade de cartão de crédito • Cancele quando quiser •
            Suporte 24/7
          </p>
        </div>
      </section>

      {/* Footer - Improved */}
      <footer className="border-t border-border bg-background py-12">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-8 md:grid-cols-4">
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <Stethoscope className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold">EscutaMed</span>
              </div>
              <p className="mt-4 text-sm text-muted-foreground">
                Transformando a prática médica com tecnologia inteligente que
                respeita seu tempo e valoriza a relação médico-paciente.
              </p>
              <div className="mt-6 flex space-x-4">
                <a
                  href="#"
                  className="rounded-full bg-muted p-2 text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary"
                >
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </a>
                <a
                  href="#"
                  className="rounded-full bg-muted p-2 text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary"
                >
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                  </svg>
                </a>
                <a
                  href="#"
                  className="rounded-full bg-muted p-2 text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary"
                >
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </a>
                <a
                  href="#"
                  className="rounded-full bg-muted p-2 text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary"
                >
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </a>
              </div>
            </div>

            <div className="flex flex-col">
              <h3 className="mb-4 font-semibold text-foreground">Produto</h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li>
                  <Link
                    href="#features"
                    className="transition-colors hover:text-primary"
                  >
                    Funcionalidades
                  </Link>
                </li>
                <li>
                  <Link
                    href="#how-it-works"
                    className="transition-colors hover:text-primary"
                  >
                    Como funciona
                  </Link>
                </li>
                <li>
                  <Link
                    href="#pricing"
                    className="transition-colors hover:text-primary"
                  >
                    Preços
                  </Link>
                </li>
                <li>
                  <Link
                    href="#faq"
                    className="transition-colors hover:text-primary"
                  >
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>

            <div className="flex flex-col">
              <h3 className="mb-4 font-semibold text-foreground">Recursos</h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li>
                  <Link
                    href="/blog"
                    className="transition-colors hover:text-primary"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="/guides"
                    className="transition-colors hover:text-primary"
                  >
                    Guias
                  </Link>
                </li>
                <li>
                  <Link
                    href="/cases"
                    className="transition-colors hover:text-primary"
                  >
                    Casos de Sucesso
                  </Link>
                </li>
                <li>
                  <Link
                    href="/docs"
                    className="transition-colors hover:text-primary"
                  >
                    Documentação
                  </Link>
                </li>
              </ul>
            </div>

            <div className="flex flex-col">
              <h3 className="mb-4 font-semibold text-foreground">Contato</h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li>
                  <a
                    href="mailto:contato@escutamed.com.br"
                    className="flex items-center gap-2 transition-colors hover:text-primary"
                  >
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      ></path>
                    </svg>
                    contato@escutamed.com.br
                  </a>
                </li>
                <li>
                  <a
                    href="tel:+551140028922"
                    className="flex items-center gap-2 transition-colors hover:text-primary"
                  >
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      ></path>
                    </svg>
                    (11) 4002-8922
                  </a>
                </li>
                <li>
                  <a
                    href="https://wa.me/5511999999999"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 transition-colors hover:text-primary"
                  >
                    <svg
                      className="h-4 w-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"></path>
                    </svg>
                    WhatsApp
                  </a>
                </li>
                <li>
                  <Link
                    href="/suporte"
                    className="flex items-center gap-2 transition-colors hover:text-primary"
                  >
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
                      ></path>
                    </svg>
                    Suporte
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 border-t border-border pt-8">
            <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
              <p className="text-sm text-muted-foreground">
                © 2024 EscutaMed. Todos os direitos reservados.
              </p>
              <div className="flex gap-4 text-sm text-muted-foreground">
                <Link href="/privacy" className="hover:text-primary">
                  Política de Privacidade
                </Link>
                <Link href="/terms" className="hover:text-primary">
                  Termos de Uso
                </Link>
                <Link href="/cookies" className="hover:text-primary">
                  Política de Cookies
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
