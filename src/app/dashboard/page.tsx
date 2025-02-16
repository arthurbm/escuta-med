"use client";

import { useState } from "react";
import { experimental_useObject } from "ai/react";
import { patientSchema, type PatientInfo } from "@/schemas/patient-schema";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Stethoscope, FileText, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const [consultation, setConsultation] = useState("");

  const {
    object: patientInfo,
    submit,
    isLoading,
  } = experimental_useObject<PatientInfo>({
    api: "/api/process-consultation",
    schema: patientSchema,
  });

  const processConsultation = async () => {
    if (!consultation.trim()) return;

    try {
      submit({ text: consultation });
    } catch (error) {
      console.error("Error processing consultation:", error);
    }
  };

  // Helper function to render a list of items
  const renderList = (items: string[]) => {
    if (!items?.length)
      return <li className="text-gray-500">Nenhum registro</li>;
    return items.map((item, index) => (
      <li key={index} className="text-gray-700">
        {item}
      </li>
    ));
  };

  // Helper function to safely get array
  const safeArray = (items: (string | undefined)[] | undefined): string[] => {
    if (!items) return [];
    return items.filter((item): item is string => item !== undefined);
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <Stethoscope className="h-6 w-6 text-blue-600" />
            <span className="text-xl font-bold">EscutaMed</span>
          </div>
          <Link href="/">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Voltar para home
            </Button>
          </Link>
        </div>
      </nav>

      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Processar Consulta
          </h1>
          <p className="mt-2 text-gray-600">
            Cole o texto da consulta abaixo para gerar um relatório estruturado.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr,1.5fr]">
          {/* Input Section */}
          <div className="space-y-4 rounded-lg bg-white p-6 shadow-sm">
            <div className="flex items-center gap-2 text-lg font-semibold text-gray-900">
              <FileText className="h-5 w-5 text-blue-600" />
              Texto da Consulta
            </div>
            <Textarea
              value={consultation}
              onChange={(e) => setConsultation(e.target.value)}
              placeholder="Digite ou cole o texto da consulta aqui..."
              className="min-h-[400px] resize-none"
            />
            <Button
              size="lg"
              onClick={processConsultation}
              disabled={!consultation.trim() || isLoading}
              className="w-full"
            >
              {isLoading ? "Processando..." : "Processar Consulta"}
            </Button>
          </div>

          {/* Results Section */}
          <div className="space-y-6">
            {patientInfo && (
              <div className="space-y-6 rounded-lg bg-white p-6 shadow-sm">
                {/* Identificação */}
                <section>
                  <h2 className="flex items-center gap-2 text-xl font-bold text-gray-900">
                    <div className="rounded-lg bg-blue-100 p-2">
                      <FileText className="h-5 w-5 text-blue-600" />
                    </div>
                    Identificação
                  </h2>
                  <div className="mt-4 grid grid-cols-2 gap-4">
                    <div className="rounded-lg bg-gray-50 p-3">
                      <span className="text-sm font-medium text-gray-500">
                        Nome
                      </span>
                      <div className="mt-1 text-gray-900">
                        {patientInfo.name}
                      </div>
                    </div>
                    <div className="rounded-lg bg-gray-50 p-3">
                      <span className="text-sm font-medium text-gray-500">
                        Sexo
                      </span>
                      <div className="mt-1 text-gray-900">
                        {patientInfo.gender}
                      </div>
                    </div>
                    <div className="rounded-lg bg-gray-50 p-3">
                      <span className="text-sm font-medium text-gray-500">
                        Idade
                      </span>
                      <div className="mt-1 text-gray-900">
                        {patientInfo.age} anos
                      </div>
                    </div>
                    <div className="rounded-lg bg-gray-50 p-3">
                      <span className="text-sm font-medium text-gray-500">
                        Escolaridade
                      </span>
                      <div className="mt-1 text-gray-900">
                        {patientInfo.education_level}
                      </div>
                    </div>
                    <div className="rounded-lg bg-gray-50 p-3">
                      <span className="text-sm font-medium text-gray-500">
                        Cidade Natal
                      </span>
                      <div className="mt-1 text-gray-900">
                        {patientInfo.birth_city}
                      </div>
                    </div>
                    <div className="rounded-lg bg-gray-50 p-3">
                      <span className="text-sm font-medium text-gray-500">
                        Cidade Atual
                      </span>
                      <div className="mt-1 text-gray-900">
                        {patientInfo.current_city}
                      </div>
                    </div>
                    <div className="rounded-lg bg-gray-50 p-3">
                      <span className="text-sm font-medium text-gray-500">
                        Profissão
                      </span>
                      <div className="mt-1 text-gray-900">
                        {patientInfo.profession}
                      </div>
                    </div>
                    <div className="rounded-lg bg-gray-50 p-3">
                      <span className="text-sm font-medium text-gray-500">
                        Estado Civil
                      </span>
                      <div className="mt-1 text-gray-900">
                        {patientInfo.marital_status}
                      </div>
                    </div>
                  </div>
                </section>

                {/* Queixa Principal */}
                {patientInfo.main_complaint && (
                  <section>
                    <h2 className="flex items-center gap-2 text-xl font-bold text-gray-900">
                      <div className="rounded-lg bg-green-100 p-2">
                        <FileText className="h-5 w-5 text-green-600" />
                      </div>
                      Queixa Principal
                    </h2>
                    <div className="mt-4 space-y-4">
                      <div className="rounded-lg bg-gray-50 p-4">
                        <span className="text-sm font-medium text-gray-500">
                          Descrição
                        </span>
                        <div className="mt-1 text-gray-900">
                          {patientInfo.main_complaint.description}
                        </div>
                      </div>
                      <div className="rounded-lg bg-gray-50 p-4">
                        <span className="text-sm font-medium text-gray-500">
                          Duração
                        </span>
                        <div className="mt-1 text-gray-900">
                          {patientInfo.main_complaint.duration}
                        </div>
                      </div>
                    </div>
                  </section>
                )}

                {/* História da Doença Atual */}
                <section>
                  <h2 className="flex items-center gap-2 text-xl font-bold text-gray-900">
                    <div className="rounded-lg bg-purple-100 p-2">
                      <FileText className="h-5 w-5 text-purple-600" />
                    </div>
                    História da Doença Atual
                  </h2>
                  <div className="mt-4 rounded-lg bg-gray-50 p-4">
                    <p className="whitespace-pre-wrap text-gray-700">
                      {patientInfo.current_disease_history}
                    </p>
                  </div>
                </section>

                {/* Antecedentes do Paciente */}
                {patientInfo.patient_history && (
                  <section>
                    <h2 className="flex items-center gap-2 text-xl font-bold text-gray-900">
                      <div className="rounded-lg bg-orange-100 p-2">
                        <FileText className="h-5 w-5 text-orange-600" />
                      </div>
                      Antecedentes do Paciente
                    </h2>
                    <div className="mt-4 space-y-4">
                      <div className="rounded-lg bg-gray-50 p-4">
                        <span className="text-sm font-medium text-gray-500">
                          Doenças de Base
                        </span>
                        <ul className="mt-2 list-disc space-y-1 pl-5">
                          {renderList(
                            safeArray(
                              patientInfo.patient_history.base_diseases,
                            ),
                          )}
                        </ul>
                      </div>
                      <div className="rounded-lg bg-gray-50 p-4">
                        <span className="text-sm font-medium text-gray-500">
                          Alergias
                        </span>
                        <ul className="mt-2 list-disc space-y-1 pl-5">
                          {renderList(
                            safeArray(patientInfo.patient_history.allergies),
                          )}
                        </ul>
                      </div>
                      <div className="rounded-lg bg-gray-50 p-4">
                        <span className="text-sm font-medium text-gray-500">
                          Cirurgias
                        </span>
                        <ul className="mt-2 list-disc space-y-1 pl-5">
                          {renderList(
                            safeArray(patientInfo.patient_history.surgeries),
                          )}
                        </ul>
                      </div>
                      <div className="rounded-lg bg-gray-50 p-4">
                        <span className="text-sm font-medium text-gray-500">
                          Transfusão Sanguínea
                        </span>
                        <div className="mt-1 text-gray-900">
                          {patientInfo.patient_history.blood_transfusions
                            ? "Sim"
                            : "Não"}
                        </div>
                      </div>
                    </div>
                  </section>
                )}

                {/* Antecedentes Familiares */}
                {patientInfo.family_history && (
                  <section>
                    <h2 className="flex items-center gap-2 text-xl font-bold text-gray-900">
                      <div className="rounded-lg bg-red-100 p-2">
                        <FileText className="h-5 w-5 text-red-600" />
                      </div>
                      Antecedentes Familiares
                    </h2>
                    <div className="mt-4 space-y-4">
                      <div className="rounded-lg bg-gray-50 p-4">
                        <span className="text-sm font-medium text-gray-500">
                          Doenças dos Pais
                        </span>
                        <ul className="mt-2 list-disc space-y-1 pl-5">
                          {renderList(
                            safeArray(
                              patientInfo.family_history.parents_diseases,
                            ),
                          )}
                        </ul>
                      </div>
                      <div className="rounded-lg bg-gray-50 p-4">
                        <span className="text-sm font-medium text-gray-500">
                          Causa da Morte dos Pais
                        </span>
                        <ul className="mt-2 list-disc space-y-1 pl-5">
                          {renderList(
                            safeArray(
                              patientInfo.family_history.parents_cause_of_death,
                            ),
                          )}
                        </ul>
                      </div>
                    </div>
                  </section>
                )}

                {/* Hábitos de Vida */}
                {patientInfo.lifestyle?.smoking &&
                  patientInfo.lifestyle.alcohol &&
                  patientInfo.lifestyle.drugs && (
                    <section>
                      <h2 className="flex items-center gap-2 text-xl font-bold text-gray-900">
                        <div className="rounded-lg bg-teal-100 p-2">
                          <FileText className="h-5 w-5 text-teal-600" />
                        </div>
                        Hábitos de Vida
                      </h2>
                      <div className="mt-4 space-y-4">
                        <div className="rounded-lg bg-gray-50 p-4">
                          <span className="text-sm font-medium text-gray-500">
                            Tabagismo
                          </span>
                          <div className="mt-2 space-y-2">
                            <div className="text-gray-900">
                              {patientInfo.lifestyle.smoking.is_smoker
                                ? "Fumante"
                                : "Não Fumante"}
                            </div>
                            {patientInfo.lifestyle.smoking.details && (
                              <div className="text-gray-600">
                                {patientInfo.lifestyle.smoking.details}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="rounded-lg bg-gray-50 p-4">
                          <span className="text-sm font-medium text-gray-500">
                            Álcool
                          </span>
                          <div className="mt-2 space-y-2">
                            <div className="text-gray-900">
                              {patientInfo.lifestyle.alcohol.drinks_alcohol
                                ? "Consome"
                                : "Não Consome"}
                            </div>
                            {patientInfo.lifestyle.alcohol.details && (
                              <div className="text-gray-600">
                                {patientInfo.lifestyle.alcohol.details}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="rounded-lg bg-gray-50 p-4">
                          <span className="text-sm font-medium text-gray-500">
                            Drogas
                          </span>
                          <div className="mt-2 space-y-2">
                            <div className="text-gray-900">
                              {patientInfo.lifestyle.drugs.uses_drugs
                                ? "Usa"
                                : "Não Usa"}
                            </div>
                            {patientInfo.lifestyle.drugs.details && (
                              <div className="text-gray-600">
                                {patientInfo.lifestyle.drugs.details}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </section>
                  )}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
