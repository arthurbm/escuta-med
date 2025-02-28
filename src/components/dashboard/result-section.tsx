import { FileText } from "lucide-react";
import { type PatientInfo, type SpecialtyType } from "@/schemas/patient-schema";
import { renderList, safeArray } from "@/lib/arrays";
import { ResultSpecialtySection } from "./result-specialty-section";

interface ResultsSectionProps {
  patientInfo: PatientInfo | null;
  specialty: SpecialtyType;
}

export function ResultSection({ patientInfo, specialty }: ResultsSectionProps) {
  return (
    <>
      {/* Results Section */}
      <div className="space-y-6">
        {patientInfo ? (
          <div className="space-y-6 rounded-lg bg-card p-6 shadow-sm">
            {/* Identificação */}
            <section>
              <h2 className="flex items-center gap-2 text-xl font-bold text-card-foreground">
                <div className="rounded-lg bg-blue-100 p-2">
                  <FileText className="h-5 w-5 text-blue-600" />
                </div>
                Identificação
              </h2>
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="rounded-lg bg-secondary p-3">
                  <span className="text-sm font-medium text-muted-foreground">
                    Nome
                  </span>
                  <div className="mt-1 text-foreground">{patientInfo.name}</div>
                </div>
                <div className="rounded-lg bg-secondary p-3">
                  <span className="text-sm font-medium text-muted-foreground">
                    Sexo
                  </span>
                  <div className="mt-1 text-foreground">
                    {patientInfo.gender}
                  </div>
                </div>
                <div className="rounded-lg bg-secondary p-3">
                  <span className="text-sm font-medium text-muted-foreground">
                    Idade
                  </span>
                  <div className="mt-1 text-foreground">
                    {patientInfo.age} anos
                  </div>
                </div>
                <div className="rounded-lg bg-secondary p-3">
                  <span className="text-sm font-medium text-muted-foreground">
                    Escolaridade
                  </span>
                  <div className="mt-1 text-foreground">
                    {patientInfo.education_level}
                  </div>
                </div>
                <div className="rounded-lg bg-secondary p-3">
                  <span className="text-sm font-medium text-muted-foreground">
                    Cidade Natal
                  </span>
                  <div className="mt-1 text-foreground">
                    {patientInfo.birth_city}
                  </div>
                </div>
                <div className="rounded-lg bg-secondary p-3">
                  <span className="text-sm font-medium text-muted-foreground">
                    Cidade Atual
                  </span>
                  <div className="mt-1 text-foreground">
                    {patientInfo.current_city}
                  </div>
                </div>
                <div className="rounded-lg bg-secondary p-3">
                  <span className="text-sm font-medium text-muted-foreground">
                    Profissão
                  </span>
                  <div className="mt-1 text-foreground">
                    {patientInfo.profession}
                  </div>
                </div>
                <div className="rounded-lg bg-secondary p-3">
                  <span className="text-sm font-medium text-muted-foreground">
                    Estado Civil
                  </span>
                  <div className="mt-1 text-foreground">
                    {patientInfo.marital_status}
                  </div>
                </div>
              </div>
            </section>

            {/* Campos específicos da especialidade */}
            <ResultSpecialtySection
              patientInfo={patientInfo}
              specialty={specialty}
            />

            {/* Queixa Principal */}
            {patientInfo.main_complaint && (
              <section>
                <h2 className="flex items-center gap-2 text-xl font-bold text-card-foreground">
                  <div className="rounded-lg bg-red-100 p-2">
                    <FileText className="h-5 w-5 text-red-600" />
                  </div>
                  Queixa Principal
                </h2>
                <div className="mt-4 space-y-4">
                  <div className="rounded-lg bg-secondary p-4">
                    <span className="text-sm font-medium text-muted-foreground">
                      Descrição
                    </span>
                    <div className="mt-1 text-foreground">
                      {patientInfo.main_complaint.description}
                    </div>
                  </div>
                  <div className="rounded-lg bg-secondary p-4">
                    <span className="text-sm font-medium text-muted-foreground">
                      Duração
                    </span>
                    <div className="mt-1 text-foreground">
                      {patientInfo.main_complaint.duration}
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* História da Doença Atual */}
            <section>
              <h2 className="flex items-center gap-2 text-xl font-bold text-card-foreground">
                <div className="rounded-lg bg-orange-100 p-2">
                  <FileText className="h-5 w-5 text-orange-600" />
                </div>
                História da Doença Atual
              </h2>
              <div className="mt-4 rounded-lg bg-secondary p-4">
                <p className="whitespace-pre-wrap text-foreground">
                  {patientInfo.current_disease_history}
                </p>
              </div>
            </section>

            {/* Antecedentes do Paciente */}
            {patientInfo.patient_history && (
              <section>
                <h2 className="flex items-center gap-2 text-xl font-bold text-card-foreground">
                  <div className="rounded-lg bg-emerald-100 p-2">
                    <FileText className="h-5 w-5 text-emerald-600" />
                  </div>
                  Antecedentes do Paciente
                </h2>
                <div className="mt-4 space-y-4">
                  <div className="rounded-lg bg-secondary p-4">
                    <span className="text-sm font-medium text-muted-foreground">
                      Doenças de Base
                    </span>
                    <ul className="mt-2 list-disc space-y-1 pl-5 text-foreground">
                      {renderList(
                        safeArray(patientInfo.patient_history.base_diseases),
                      )}
                    </ul>
                  </div>
                  <div className="rounded-lg bg-secondary p-4">
                    <span className="text-sm font-medium text-muted-foreground">
                      Alergias
                    </span>
                    <ul className="mt-2 list-disc space-y-1 pl-5 text-foreground">
                      {renderList(
                        safeArray(patientInfo.patient_history.allergies),
                      )}
                    </ul>
                  </div>
                  <div className="rounded-lg bg-secondary p-4">
                    <span className="text-sm font-medium text-muted-foreground">
                      Cirurgias
                    </span>
                    <ul className="mt-2 list-disc space-y-1 pl-5 text-foreground">
                      {renderList(
                        safeArray(patientInfo.patient_history.surgeries),
                      )}
                    </ul>
                  </div>
                  <div className="rounded-lg bg-secondary p-4">
                    <span className="text-sm font-medium text-muted-foreground">
                      Transfusão Sanguínea
                    </span>
                    <div className="mt-1 text-foreground">
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
                <h2 className="flex items-center gap-2 text-xl font-bold text-card-foreground">
                  <div className="rounded-lg bg-amber-100 p-2">
                    <FileText className="h-5 w-5 text-amber-600" />
                  </div>
                  Antecedentes Familiares
                </h2>
                <div className="mt-4 space-y-4">
                  <div className="rounded-lg bg-secondary p-4">
                    <span className="text-sm font-medium text-muted-foreground">
                      Doenças dos Pais
                    </span>
                    <ul className="mt-2 list-disc space-y-1 pl-5 text-foreground">
                      {renderList(
                        safeArray(patientInfo.family_history.parents_diseases),
                      )}
                    </ul>
                  </div>
                  <div className="rounded-lg bg-secondary p-4">
                    <span className="text-sm font-medium text-muted-foreground">
                      Causa da Morte dos Pais
                    </span>
                    <ul className="mt-2 list-disc space-y-1 pl-5 text-foreground">
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
                  <h2 className="flex items-center gap-2 text-xl font-bold text-card-foreground">
                    <div className="rounded-lg bg-indigo-100 p-2">
                      <FileText className="h-5 w-5 text-indigo-600" />
                    </div>
                    Hábitos de Vida
                  </h2>
                  <div className="mt-4 space-y-4">
                    <div className="rounded-lg bg-secondary p-4">
                      <span className="text-sm font-medium text-muted-foreground">
                        Tabagismo
                      </span>
                      <div className="mt-2 space-y-2">
                        <div className="text-foreground">
                          {patientInfo.lifestyle.smoking.is_smoker
                            ? "Fumante"
                            : "Não Fumante"}
                        </div>
                        {patientInfo.lifestyle.smoking.details && (
                          <div className="text-muted-foreground">
                            {patientInfo.lifestyle.smoking.details}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="rounded-lg bg-secondary p-4">
                      <span className="text-sm font-medium text-muted-foreground">
                        Álcool
                      </span>
                      <div className="mt-2 space-y-2">
                        <div className="text-foreground">
                          {patientInfo.lifestyle.alcohol.drinks_alcohol
                            ? "Consome"
                            : "Não Consome"}
                        </div>
                        {patientInfo.lifestyle.alcohol.details && (
                          <div className="text-muted-foreground">
                            {patientInfo.lifestyle.alcohol.details}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="rounded-lg bg-secondary p-4">
                      <span className="text-sm font-medium text-muted-foreground">
                        Drogas
                      </span>
                      <div className="mt-2 space-y-2">
                        <div className="text-foreground">
                          {patientInfo.lifestyle.drugs.uses_drugs
                            ? "Usa"
                            : "Não Usa"}
                        </div>
                        {patientInfo.lifestyle.drugs.details && (
                          <div className="text-muted-foreground">
                            {patientInfo.lifestyle.drugs.details}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </section>
              )}

            {/* Hipótese de Diagnóstico */}
            {patientInfo.diagnostic_hypothesis && (
              <section>
                <h2 className="flex items-center gap-2 text-xl font-bold text-card-foreground">
                  <div className="rounded-lg bg-teal-100 p-2">
                    <FileText className="h-5 w-5 text-teal-600" />
                  </div>
                  Hipótese de Diagnóstico
                </h2>
                <div className="mt-4 rounded-lg bg-secondary p-4">
                  <p className="whitespace-pre-wrap text-foreground">
                    {patientInfo.diagnostic_hypothesis}
                  </p>
                </div>
              </section>
            )}
          </div>
        ) : (
          <div className="flex min-h-[200px] flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/25 bg-muted/5 px-6 py-10 lg:min-h-[300px]">
            <FileText className="mb-4 h-12 w-12 text-muted-foreground/50" />
            <h3 className="text-lg font-semibold text-muted-foreground">
              Nenhuma consulta processada
            </h3>
            <p className="mt-2 text-center text-sm text-muted-foreground/80">
              Grave, envie ou digite o texto da consulta para gerar o relatório
              estruturado.
            </p>
          </div>
        )}
      </div>
    </>
  );
}
