"use client";

import Link from "next/link";
import {
  ArrowRight,
  Brain,
  FileText,
  Stethoscope,
  Clock,
  Shield,
  CheckCircle2,
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
      <section className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-secondary via-background to-background px-4 pt-16 text-center">
        <div className="animate-fade-in space-y-6">
          <div className="mb-6 inline-flex items-center rounded-full bg-secondary px-4 py-2 text-sm text-primary">
            <Shield className="mr-2 h-4 w-4" /> Tecnologia que entende você
          </div>
          <h1 className="mb-6 text-6xl font-bold tracking-tight text-foreground sm:text-7xl">
            Mais tempo para o que
            <br />
            realmente importa
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-xl leading-relaxed text-muted-foreground">
            Na EscutaMed, entendemos que ser médico é incrível, mas às vezes é
            desafiador gerenciar tudo. Queremos te ajudar a simplificar sua
            rotina médica, para você levar uma vida mais leve.
          </p>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link href="/dashboard">
              <Button size="lg" className="gap-2 text-lg">
                Começar agora
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="gap-2 text-lg">
              Ver demonstração
              <FileText className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 gap-8 sm:grid-cols-3">
          <div className="flex flex-col items-center">
            <span className="text-3xl font-bold text-primary">2h/dia</span>
            <span className="text-sm text-muted-foreground">
              Tempo economizado
            </span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-3xl font-bold text-primary">79.6%</span>
            <span className="text-sm text-muted-foreground">
              Médicos mais satisfeitos
            </span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-3xl font-bold text-primary">100%</span>
            <span className="text-sm text-muted-foreground">
              Foco no paciente
            </span>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold text-foreground">
              Como a EscutaMed simplifica sua vida
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Transforme sua rotina médica em momentos mais significativos com
              seus pacientes
            </p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {/* Feature 1 */}
            <div className="group rounded-xl border border-border bg-card p-8 shadow-sm transition-all hover:border-primary/20 hover:shadow-lg">
              <div className="mb-4 inline-block rounded-lg bg-primary/10 p-3">
                <Brain className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-3 text-xl font-semibold text-card-foreground group-hover:text-primary">
                Foco Total no Paciente
              </h3>
              <p className="text-muted-foreground">
                Mantenha contato visual e estabeleça conexões mais profundas com
                seus pacientes, enquanto a EscutaMed cuida das anotações.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group rounded-xl border border-border bg-card p-8 shadow-sm transition-all hover:border-primary/20 hover:shadow-lg">
              <div className="mb-4 inline-block rounded-lg bg-primary/10 p-3">
                <Stethoscope className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-3 text-xl font-semibold text-card-foreground group-hover:text-primary">
                Documentação Simplificada
              </h3>
              <p className="text-muted-foreground">
                Prontuários completos e precisos gerados automaticamente durante
                a consulta, sem necessidade de digitação.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group rounded-xl border border-border bg-card p-8 shadow-sm transition-all hover:border-primary/20 hover:shadow-lg">
              <div className="mb-4 inline-block rounded-lg bg-primary/10 p-3">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-3 text-xl font-semibold text-card-foreground group-hover:text-primary">
                Mais Tempo para Você
              </h3>
              <p className="text-muted-foreground">
                Recupere até 2 horas por dia eliminando tarefas administrativas
                e foque no que realmente importa.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-gradient-to-b from-secondary/50 to-background py-24">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold text-foreground">
              Por que médicos amam a EscutaMed?
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Descubra como estamos transformando a prática médica diária
            </p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2">
            <div className="flex items-start gap-4 rounded-lg border border-border bg-card p-6">
              <div className="rounded-lg bg-primary/10 p-3">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="mb-2 text-lg font-semibold text-card-foreground">
                  Mais qualidade de vida
                </h3>
                <p className="text-muted-foreground">
                  &quot;Recuperei minhas noites e fins de semana. Agora consigo
                  terminar toda documentação durante a consulta.&quot;
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4 rounded-lg border border-border bg-card p-6">
              <div className="rounded-lg bg-primary/10 p-3">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="mb-2 text-lg font-semibold text-card-foreground">
                  Conexão com pacientes
                </h3>
                <p className="text-muted-foreground">
                  &quot;Meus pacientes notaram a diferença. Agora posso me
                  concentrar totalmente neles durante a consulta.&quot;
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden bg-primary py-24 text-primary-foreground">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="mb-4 text-4xl font-bold">
            Pronto para transformar sua prática médica?
          </h2>
          <p className="mb-8 text-xl text-primary-foreground/90">
            Junte-se aos médicos que já descobriram uma forma mais leve de
            trabalhar.
          </p>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link href="/dashboard">
              <Button size="lg" variant="secondary" className="gap-2 text-lg">
                Começar gratuitamente
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <Button
              variant="outline"
              size="lg"
              className="gap-2 border-primary-foreground text-lg text-primary-foreground hover:bg-primary-foreground/10"
            >
              Falar com especialista
              <FileText className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-background py-12">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <div className="flex items-center justify-center gap-2">
            <Stethoscope className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">EscutaMed</span>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            © 2024 EscutaMed. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </main>
  );
}
