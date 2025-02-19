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
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col">
      {/* Navbar */}
      <nav className="fixed top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <Stethoscope className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">EscutaMed</span>
          </div>
          <Link href="/dashboard">
            <Button variant="outline" className="gap-2">
              Acessar plataforma
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-secondary via-background to-background px-4 pt-16 text-center">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5" />

        <div className="animate-fade-in relative space-y-6">
          <div className="mb-6 inline-flex items-center rounded-full bg-primary/10 px-4 py-2 text-sm text-primary">
            <Brain className="mr-2 h-4 w-4" /> Inteligência Artificial a serviço
            da medicina
          </div>
          <h1 className="mb-6 text-6xl font-bold tracking-tight text-foreground sm:text-7xl">
            Atenda com presença,
            <br />
            <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              deixe a IA registrar
            </span>
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-xl leading-relaxed text-muted-foreground">
            Nossa IA avançada escuta, entende e registra suas consultas em tempo
            real. Foque 100% no seu paciente enquanto criamos prontuários
            precisos e completos.
          </p>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link href="/dashboard">
              <Button size="lg" className="group gap-2 text-lg">
                Experimente gratuitamente
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="group gap-2 text-lg">
              Ver em 2 minutos
              <Play className="h-5 w-5 transition-transform group-hover:scale-110" />
            </Button>
          </div>
        </div>

        {/* Stats with improved visual */}
        <div className="relative mt-16 grid grid-cols-1 gap-8 sm:grid-cols-3">
          <div className="group flex flex-col items-center rounded-xl border border-border bg-card p-6 shadow-sm transition-colors hover:bg-card/80">
            <span className="mb-2 text-4xl font-bold text-primary">2h/dia</span>
            <span className="text-sm text-muted-foreground">
              Tempo recuperado
            </span>
          </div>
          <div className="group flex flex-col items-center rounded-xl border border-border bg-card p-6 shadow-sm transition-colors hover:bg-card/80">
            <span className="mb-2 text-4xl font-bold text-primary">100%</span>
            <span className="text-sm text-muted-foreground">
              Precisão da IA
            </span>
          </div>
          <div className="group flex flex-col items-center rounded-xl border border-border bg-card p-6 shadow-sm transition-colors hover:bg-card/80">
            <span className="mb-2 text-4xl font-bold text-primary">+5.000</span>
            <span className="text-sm text-muted-foreground">Consultas/dia</span>
          </div>
        </div>
      </section>

      {/* Pain Points Section - NEW */}
      <section className="bg-card py-24">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold text-card-foreground">
              Reconhece alguma dessas situações?
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Nossa IA resolve os principais desafios que médicos enfrentam
              diariamente.
            </p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-xl border border-border bg-background p-6">
              <Clock className="mb-4 h-8 w-8 text-primary" />
              <h3 className="mb-2 text-lg font-semibold text-foreground">
                Horas extras desnecessárias
              </h3>
              <p className="text-muted-foreground">
                Ficar após o expediente completando registros e prontuários do
                dia
              </p>
            </div>
            <div className="rounded-xl border border-border bg-background p-6">
              <FileText className="mb-4 h-8 w-8 text-primary" />
              <h3 className="mb-2 text-lg font-semibold text-foreground">
                Documentação incompleta
              </h3>
              <p className="text-muted-foreground">
                Esquecer detalhes importantes por não conseguir anotar tudo
                durante a consulta
              </p>
            </div>
            <div className="rounded-xl border border-border bg-background p-6">
              <Brain className="mb-4 h-8 w-8 text-primary" />
              <h3 className="mb-2 text-lg font-semibold text-foreground">
                Conexão prejudicada
              </h3>
              <p className="text-muted-foreground">
                Dividir atenção entre o paciente e as anotações durante o
                atendimento
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - IMPROVED */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold text-foreground">
              Como a EscutaMed transforma sua rotina
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Uma solução completa que se adapta ao seu jeito de trabalhar
            </p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="group relative rounded-xl border border-border bg-card p-8 shadow-sm transition-all hover:border-primary/20 hover:shadow-lg">
              <div className="absolute -right-3 -top-3 rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                Exclusivo
              </div>
              <div className="mb-4 inline-block rounded-lg bg-primary/10 p-3">
                <Brain className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-3 text-xl font-semibold text-card-foreground group-hover:text-primary">
                Foco Total no Paciente
              </h3>
              <p className="text-muted-foreground">
                Mantenha contato visual e estabeleça conexões mais profundas com
                seus pacientes. A EscutaMed cuida de todas as anotações em tempo
                real.
              </p>
              <ul className="mt-4 space-y-2">
                <li className="flex items-center text-sm text-muted-foreground">
                  <CheckCircle2 className="mr-2 h-4 w-4 text-primary" />
                  Transcrição em tempo real
                </li>
                <li className="flex items-center text-sm text-muted-foreground">
                  <CheckCircle2 className="mr-2 h-4 w-4 text-primary" />
                  Estruturação automática
                </li>
                <li className="flex items-center text-sm text-muted-foreground">
                  <CheckCircle2 className="mr-2 h-4 w-4 text-primary" />
                  Revisão simplificada
                </li>
              </ul>
            </div>

            <div className="group rounded-xl border border-border bg-card p-8 shadow-sm transition-all hover:border-primary/20 hover:shadow-lg">
              <div className="mb-4 inline-block rounded-lg bg-primary/10 p-3">
                <Stethoscope className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-3 text-xl font-semibold text-card-foreground group-hover:text-primary">
                Registros Inteligentes
              </h3>
              <p className="text-muted-foreground">
                Prontuários completos e precisos criados automaticamente durante
                a consulta. Sem digitação, sem retrabalho.
              </p>
              <ul className="mt-4 space-y-2">
                <li className="flex items-center text-sm text-muted-foreground">
                  <CheckCircle2 className="mr-2 h-4 w-4 text-primary" />
                  Formatação automática
                </li>
                <li className="flex items-center text-sm text-muted-foreground">
                  <CheckCircle2 className="mr-2 h-4 w-4 text-primary" />
                  Terminologia padronizada
                </li>
                <li className="flex items-center text-sm text-muted-foreground">
                  <CheckCircle2 className="mr-2 h-4 w-4 text-primary" />
                  Exportação facilitada
                </li>
              </ul>
            </div>

            <div className="group rounded-xl border border-border bg-card p-8 shadow-sm transition-all hover:border-primary/20 hover:shadow-lg">
              <div className="mb-4 inline-block rounded-lg bg-primary/10 p-3">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-3 text-xl font-semibold text-card-foreground group-hover:text-primary">
                Mais Tempo para Você
              </h3>
              <p className="text-muted-foreground">
                Recupere suas horas extras eliminando tarefas administrativas.
                Foque no que realmente importa.
              </p>
              <ul className="mt-4 space-y-2">
                <li className="flex items-center text-sm text-muted-foreground">
                  <CheckCircle2 className="mr-2 h-4 w-4 text-primary" />
                  2h economizadas/dia
                </li>
                <li className="flex items-center text-sm text-muted-foreground">
                  <CheckCircle2 className="mr-2 h-4 w-4 text-primary" />
                  Sem trabalho em casa
                </li>
                <li className="flex items-center text-sm text-muted-foreground">
                  <CheckCircle2 className="mr-2 h-4 w-4 text-primary" />
                  Mais qualidade de vida
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section - IMPROVED */}
      <section className="bg-gradient-to-b from-secondary/50 to-background py-24">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold text-foreground">
              O que dizem os médicos que já usam
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Junte-se a milhares de profissionais que transformaram sua prática
            </p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="flex flex-col gap-4 rounded-lg border border-border bg-card p-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-primary/10" />
                <div>
                  <h3 className="font-semibold text-card-foreground">
                    Dra. Maria Silva
                  </h3>
                  <p className="text-sm text-muted-foreground">Clínica Geral</p>
                </div>
              </div>
              <p className="text-muted-foreground">
                &quot;Recuperei minhas noites e fins de semana. Agora consigo
                terminar toda documentação durante a consulta e tenho mais tempo
                para minha família.&quot;
              </p>
            </div>

            <div className="flex flex-col gap-4 rounded-lg border border-border bg-card p-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-primary/10" />
                <div>
                  <h3 className="font-semibold text-card-foreground">
                    Dr. Carlos Santos
                  </h3>
                  <p className="text-sm text-muted-foreground">Cardiologista</p>
                </div>
              </div>
              <p className="text-muted-foreground">
                &quot;Meus pacientes notaram a diferença. Agora posso me
                concentrar totalmente neles durante a consulta. A conexão
                melhorou muito.&quot;
              </p>
            </div>

            <div className="flex flex-col gap-4 rounded-lg border border-border bg-card p-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-primary/10" />
                <div>
                  <h3 className="font-semibold text-card-foreground">
                    Dra. Ana Costa
                  </h3>
                  <p className="text-sm text-muted-foreground">Pediatra</p>
                </div>
              </div>
              <p className="text-muted-foreground">
                &quot;A qualidade dos meus prontuários melhorou muito. Agora
                tenho registros completos sem precisar me preocupar com
                anotações durante o atendimento.&quot;
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - IMPROVED */}
      <section className="relative overflow-hidden bg-primary py-24">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary" />
        <div className="relative mx-auto max-w-4xl px-4 text-center">
          <h2 className="mb-4 text-4xl font-bold text-primary-foreground">
            Pronto para transformar seus atendimentos?
          </h2>
          <p className="mb-8 text-xl text-primary-foreground/90">
            Comece agora e recupere o prazer de ser médico. Seus pacientes e sua
            qualidade de vida agradecem.
          </p>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link href="/dashboard" className="w-full sm:w-auto">
              <Button
                size="lg"
                variant="secondary"
                className="w-full text-lg sm:w-auto"
              >
                Começar gratuitamente
                <ArrowRight />
              </Button>
            </Link>
            <Button
              variant="secondary"
              size="lg"
              className="w-full text-lg sm:w-auto"
            >
              Ver demonstração
              <Play />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer - IMPROVED */}
      <footer className="border-t border-border bg-background py-12">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-8 sm:grid-cols-3">
            <div className="flex flex-col items-center sm:items-start">
              <div className="flex items-center gap-2">
                <Stethoscope className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold">EscutaMed</span>
              </div>
              <p className="mt-4 text-sm text-muted-foreground">
                Transformando a prática médica com tecnologia inteligente
              </p>
            </div>

            <div className="text-center sm:text-left">
              <h3 className="mb-4 font-semibold text-foreground">Produto</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
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
                    href="#pricing"
                    className="transition-colors hover:text-primary"
                  >
                    Preços
                  </Link>
                </li>
                <li>
                  <Link
                    href="#cases"
                    className="transition-colors hover:text-primary"
                  >
                    Casos de Sucesso
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blog"
                    className="transition-colors hover:text-primary"
                  >
                    Blog
                  </Link>
                </li>
              </ul>
            </div>

            <div className="text-center sm:text-left">
              <h3 className="mb-4 font-semibold text-foreground">Contato</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a
                    href="mailto:contato@escutamed.com.br"
                    className="transition-colors hover:text-primary"
                  >
                    contato@escutamed.com.br
                  </a>
                </li>
                <li>
                  <Link
                    href="/suporte"
                    className="transition-colors hover:text-primary"
                  >
                    Suporte
                  </Link>
                </li>
                <li>
                  <a
                    href="https://wa.me/5511999999999"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors hover:text-primary"
                  >
                    WhatsApp
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 border-t border-border pt-8 text-center">
            <p className="text-sm text-muted-foreground">
              © 2024 EscutaMed. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
