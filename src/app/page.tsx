"use client";

import { useState } from "react";
import { experimental_useObject } from "ai/react";
import { patientSchema, type PatientInfo } from "@/schemas/patient-schema";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function HomePage() {
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
    if (!items?.length) return <li>Nenhum registro</li>;
    return items.map((item, index) => <li key={index}>{item}</li>);
  };

  // Helper function to safely get array
  const safeArray = (items: (string | undefined)[] | undefined): string[] => {
    if (!items) return [];
    return items.filter((item): item is string => item !== undefined);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-center font-mono text-sm">
        <div className="flex flex-col items-center gap-8">
          <h1 className="text-4xl font-bold">EscutaMed</h1>

          <div className="flex w-full max-w-2xl flex-col items-center gap-4">
            <Textarea
              value={consultation}
              onChange={(e) => setConsultation(e.target.value)}
              placeholder="Digite ou cole o texto da consulta aqui..."
              className="min-h-[200px]"
            />

            <Button
              size="lg"
              onClick={processConsultation}
              disabled={!consultation.trim() || isLoading}
            >
              {isLoading ? "Processando..." : "Processar Consulta"}
            </Button>

            {patientInfo && (
              <div className="mt-8 w-full max-w-2xl space-y-8 rounded-lg bg-white p-6 shadow-lg">
                {/* Identificação */}
                <section>
                  <h2 className="mb-4 text-2xl font-bold">Identificação</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="font-bold">Nome:</span>{" "}
                      {patientInfo.name}
                    </div>
                    <div>
                      <span className="font-bold">Sexo:</span>{" "}
                      {patientInfo.gender}
                    </div>
                    <div>
                      <span className="font-bold">Idade:</span>{" "}
                      {patientInfo.age}
                    </div>
                    <div>
                      <span className="font-bold">Escolaridade:</span>{" "}
                      {patientInfo.education_level}
                    </div>
                    <div>
                      <span className="font-bold">Cidade Natal:</span>{" "}
                      {patientInfo.birth_city}
                    </div>
                    <div>
                      <span className="font-bold">Cidade Atual:</span>{" "}
                      {patientInfo.current_city}
                    </div>
                    <div>
                      <span className="font-bold">Profissão:</span>{" "}
                      {patientInfo.profession}
                    </div>
                    <div>
                      <span className="font-bold">Estado Civil:</span>{" "}
                      {patientInfo.marital_status}
                    </div>
                  </div>
                </section>

                {/* Queixa Principal */}
                {patientInfo.main_complaint && (
                  <section>
                    <h2 className="mb-4 text-2xl font-bold">
                      Queixa Principal
                    </h2>
                    <div className="space-y-2">
                      <div>
                        <span className="font-bold">Descrição:</span>{" "}
                        {patientInfo.main_complaint.description}
                      </div>
                      <div>
                        <span className="font-bold">Duração:</span>{" "}
                        {patientInfo.main_complaint.duration}
                      </div>
                    </div>
                  </section>
                )}

                {/* História da Doença Atual */}
                <section>
                  <h2 className="mb-4 text-2xl font-bold">
                    História da Doença Atual
                  </h2>
                  <p className="whitespace-pre-wrap">
                    {patientInfo.current_disease_history}
                  </p>
                </section>

                {/* Antecedentes do Paciente */}
                {patientInfo.patient_history && (
                  <section>
                    <h2 className="mb-4 text-2xl font-bold">
                      Antecedentes do Paciente
                    </h2>
                    <div className="space-y-2">
                      <div>
                        <span className="font-bold">Doenças de Base:</span>
                        <ul className="ml-4 list-disc">
                          {renderList(
                            safeArray(
                              patientInfo.patient_history.base_diseases,
                            ),
                          )}
                        </ul>
                      </div>
                      <div>
                        <span className="font-bold">Alergias:</span>
                        <ul className="ml-4 list-disc">
                          {renderList(
                            safeArray(patientInfo.patient_history.allergies),
                          )}
                        </ul>
                      </div>
                      <div>
                        <span className="font-bold">Cirurgias:</span>
                        <ul className="ml-4 list-disc">
                          {renderList(
                            safeArray(patientInfo.patient_history.surgeries),
                          )}
                        </ul>
                      </div>
                      <div>
                        <span className="font-bold">Transfusão Sanguínea:</span>{" "}
                        {patientInfo.patient_history.blood_transfusions
                          ? "Sim"
                          : "Não"}
                      </div>
                    </div>
                  </section>
                )}

                {/* Antecedentes Familiares */}
                {patientInfo.family_history && (
                  <section>
                    <h2 className="mb-4 text-2xl font-bold">
                      Antecedentes Familiares
                    </h2>
                    <div className="space-y-2">
                      <div>
                        <span className="font-bold">Doenças dos Pais:</span>
                        <ul className="ml-4 list-disc">
                          {renderList(
                            safeArray(
                              patientInfo.family_history.parents_diseases,
                            ),
                          )}
                        </ul>
                      </div>
                      <div>
                        <span className="font-bold">
                          Causa da Morte dos Pais:
                        </span>
                        <ul className="ml-4 list-disc">
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
                      <h2 className="mb-4 text-2xl font-bold">
                        Hábitos de Vida
                      </h2>
                      <div className="space-y-4">
                        <div>
                          <div className="font-bold">Tabagismo:</div>
                          <div className="ml-4">
                            <div>
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
                        <div>
                          <div className="font-bold">Álcool:</div>
                          <div className="ml-4">
                            <div>
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
                        <div>
                          <div className="font-bold">Drogas:</div>
                          <div className="ml-4">
                            <div>
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
