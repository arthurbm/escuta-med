"use client";

import Link from "next/link";
import Image from "next/image";
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
      <nav className="fixed top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <Stethoscope className="h-6 w-6 text-blue-600" />
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
      <section className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-blue-50 via-white to-white px-4 pt-16 text-center">
        <div className="animate-fade-in space-y-6">
          <div className="mb-6 inline-flex items-center rounded-full bg-blue-100 px-4 py-2 text-sm text-blue-700">
            <Shield className="mr-2 h-4 w-4" /> Tecnologia confiável e segura
          </div>
          <h1 className="mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-6xl font-bold tracking-tight text-transparent sm:text-7xl">
            EscutaMed
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-xl leading-relaxed text-gray-600">
            Revolucione suas consultas médicas com IA. Transforme textos em
            prontuários estruturados, mantendo o foco no que mais importa:
            <span className="font-semibold text-blue-600">
              {" "}
              o cuidado com o paciente
            </span>
            .
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
        <div className="mt-16 grid grid-cols-2 gap-8 sm:grid-cols-4">
          <div className="flex flex-col items-center">
            <span className="text-3xl font-bold text-blue-600">99%</span>
            <span className="text-sm text-gray-600">Precisão</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-3xl font-bold text-blue-600">5x</span>
            <span className="text-sm text-gray-600">Mais rápido</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-3xl font-bold text-blue-600">1000+</span>
            <span className="text-sm text-gray-600">Médicos</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-3xl font-bold text-blue-600">24/7</span>
            <span className="text-sm text-gray-600">Disponível</span>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold text-gray-900">
              Recursos Principais
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">
              Tecnologia de ponta para transformar a maneira como você registra
              e analisa consultas médicas.
            </p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {/* Feature 1 */}
            <div className="group rounded-xl border border-gray-200 bg-white p-8 shadow-sm transition-all hover:border-blue-100 hover:shadow-lg hover:shadow-blue-100/50">
              <div className="mb-4 inline-block rounded-lg bg-blue-100 p-3">
                <Brain className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="mb-3 text-xl font-semibold group-hover:text-blue-600">
                Processamento Inteligente
              </h3>
              <p className="text-gray-600">
                Utilize IA avançada para extrair automaticamente informações
                relevantes das consultas médicas, com níveis de confiança para
                cada dado extraído.
              </p>
              <ul className="mt-4 space-y-2">
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" />
                  Extração automática de dados
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" />
                  Níveis de confiança
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" />
                  Processamento em tempo real
                </li>
              </ul>
            </div>

            {/* Feature 2 */}
            <div className="group rounded-xl border border-gray-200 bg-white p-8 shadow-sm transition-all hover:border-green-100 hover:shadow-lg hover:shadow-green-100/50">
              <div className="mb-4 inline-block rounded-lg bg-green-100 p-3">
                <Stethoscope className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="mb-3 text-xl font-semibold group-hover:text-green-600">
                Terminologia Médica Precisa
              </h3>
              <p className="text-gray-600">
                Conversão automática para vocabulário técnico médico
                padronizado, garantindo precisão e consistência nos registros.
              </p>
              <ul className="mt-4 space-y-2">
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" />
                  Vocabulário técnico padronizado
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" />
                  Consistência nos registros
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" />
                  Conformidade com padrões médicos
                </li>
              </ul>
            </div>

            {/* Feature 3 */}
            <div className="group rounded-xl border border-gray-200 bg-white p-8 shadow-sm transition-all hover:border-purple-100 hover:shadow-lg hover:shadow-purple-100/50">
              <div className="mb-4 inline-block rounded-lg bg-purple-100 p-3">
                <FileText className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="mb-3 text-xl font-semibold group-hover:text-purple-600">
                Informações Estruturadas
              </h3>
              <p className="text-gray-600">
                Organize automaticamente dados do paciente em categorias como
                identificação, queixas, histórico e antecedentes.
              </p>
              <ul className="mt-4 space-y-2">
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" />
                  Dados organizados por categoria
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" />
                  Fácil consulta e análise
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" />
                  Histórico completo do paciente
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-24">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold text-gray-900">
              Por que escolher o EscutaMed?
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">
              Benefícios que fazem a diferença na sua prática médica diária
            </p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2">
            <div className="flex items-start gap-4 rounded-lg border border-gray-200 bg-white p-6">
              <div className="rounded-lg bg-blue-100 p-3">
                <Clock className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="mb-2 text-lg font-semibold">
                  Economia de Tempo
                </h3>
                <p className="text-gray-600">
                  Reduza o tempo gasto com documentação em até 80%, focando mais
                  no atendimento ao paciente.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4 rounded-lg border border-gray-200 bg-white p-6">
              <div className="rounded-lg bg-green-100 p-3">
                <Shield className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className="mb-2 text-lg font-semibold">Segurança Total</h3>
                <p className="text-gray-600">
                  Dados criptografados e em conformidade com LGPD e normas de
                  segurança médica.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden bg-blue-600 py-24 text-white">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f46e5,#06b6d4)] opacity-50"></div>
        <div className="relative mx-auto max-w-4xl px-4 text-center">
          <h2 className="mb-4 text-4xl font-bold">
            Pronto para revolucionar suas consultas?
          </h2>
          <p className="mb-8 text-xl text-blue-100">
            Junte-se a milhares de médicos que já transformaram sua forma de
            trabalhar com o EscutaMed.
          </p>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link href="/dashboard">
              <Button
                size="lg"
                variant="secondary"
                className="gap-2 bg-white text-lg text-blue-600 hover:bg-blue-50"
              >
                Começar gratuitamente
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <Button
              variant="outline"
              size="lg"
              className="gap-2 border-white text-lg text-white hover:bg-white/10"
            >
              Falar com especialista
              <FileText className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white py-12">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <div className="flex items-center justify-center gap-2">
            <Stethoscope className="h-6 w-6 text-blue-600" />
            <span className="text-xl font-bold">EscutaMed</span>
          </div>
          <p className="mt-4 text-sm text-gray-600">
            © 2024 EscutaMed. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </main>
  );
}
