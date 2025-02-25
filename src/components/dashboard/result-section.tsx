import { FileText } from "lucide-react";
import { type PatientInfo, type SpecialtyType } from "@/schemas/patient-schema";

interface ResultsSectionProps {
  patientInfo: PatientInfo | null;
  specialty: SpecialtyType;
}

export function ResultSection({ patientInfo, specialty }: ResultsSectionProps) {
  // Helper function to safely get array
  const safeArray = (items: (string | undefined)[] | undefined): string[] => {
    if (!items) return [];
    return items.filter((item): item is string => item !== undefined);
  };

  // Função auxiliar para renderizar campos específicos de especialidade
  const renderSpecialtyFields = () => {
    if (!patientInfo) return null;

    switch (specialty) {
      case "cardiology":
        // Verificar se o objeto tem a propriedade cardiology_specific
        if (!("cardiology_specific" in patientInfo)) return null;

        // Converter para o tipo correto
        const cardioInfo = patientInfo;
        if (!cardioInfo.cardiology_specific) return null;

        return (
          <section>
            <h2 className="flex items-center gap-2 text-xl font-bold text-card-foreground">
              <div className="rounded-lg bg-red-100 p-2">
                <FileText className="h-5 w-5 text-red-600" />
              </div>
              Informações Cardiológicas
            </h2>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="rounded-lg bg-secondary p-3">
                <span className="text-sm font-medium text-muted-foreground">
                  Frequência Cardíaca
                </span>
                <div className="mt-1 text-foreground">
                  {cardioInfo.cardiology_specific.heart_rate}
                </div>
              </div>
              <div className="rounded-lg bg-secondary p-3">
                <span className="text-sm font-medium text-muted-foreground">
                  Pressão Arterial
                </span>
                <div className="mt-1 text-foreground">
                  {cardioInfo.cardiology_specific.blood_pressure}
                </div>
              </div>
              <div className="rounded-lg bg-secondary p-3">
                <span className="text-sm font-medium text-muted-foreground">
                  Ausculta Cardíaca
                </span>
                <div className="mt-1 text-foreground">
                  {cardioInfo.cardiology_specific.heart_sounds}
                </div>
              </div>
              {cardioInfo.cardiology_specific.ecg_findings && (
                <div className="rounded-lg bg-secondary p-3">
                  <span className="text-sm font-medium text-muted-foreground">
                    Achados do ECG
                  </span>
                  <div className="mt-1 text-foreground">
                    {cardioInfo.cardiology_specific.ecg_findings}
                  </div>
                </div>
              )}
              {cardioInfo.cardiology_specific.previous_cardiac_events &&
                cardioInfo.cardiology_specific.previous_cardiac_events.length >
                  0 && (
                  <div className="col-span-2 rounded-lg bg-secondary p-3">
                    <span className="text-sm font-medium text-muted-foreground">
                      Eventos Cardíacos Prévios
                    </span>
                    <ul className="mt-2 list-disc space-y-1 pl-5 text-foreground">
                      {renderList(
                        cardioInfo.cardiology_specific.previous_cardiac_events,
                      )}
                    </ul>
                  </div>
                )}
              {cardioInfo.cardiology_specific.chest_pain_characteristics && (
                <div className="col-span-2 rounded-lg bg-secondary p-3">
                  <span className="text-sm font-medium text-muted-foreground">
                    Características da Dor Torácica
                  </span>
                  <div className="mt-1 text-foreground">
                    {cardioInfo.cardiology_specific.chest_pain_characteristics}
                  </div>
                </div>
              )}
              {cardioInfo.cardiology_specific.dyspnea && (
                <div className="rounded-lg bg-secondary p-3">
                  <span className="text-sm font-medium text-muted-foreground">
                    Dispneia
                  </span>
                  <div className="mt-1 text-foreground">
                    {cardioInfo.cardiology_specific.dyspnea}
                  </div>
                </div>
              )}
              {cardioInfo.cardiology_specific.edema && (
                <div className="rounded-lg bg-secondary p-3">
                  <span className="text-sm font-medium text-muted-foreground">
                    Edema
                  </span>
                  <div className="mt-1 text-foreground">
                    {cardioInfo.cardiology_specific.edema}
                  </div>
                </div>
              )}
            </div>
          </section>
        );

      case "ophthalmology":
        // Verificar se o objeto tem a propriedade ophthalmology_specific
        if (!("ophthalmology_specific" in patientInfo)) return null;

        // Converter para o tipo correto
        const ophthalmoInfo = patientInfo;
        if (!ophthalmoInfo.ophthalmology_specific) return null;

        return (
          <section>
            <h2 className="flex items-center gap-2 text-xl font-bold text-card-foreground">
              <div className="rounded-lg bg-blue-100 p-2">
                <FileText className="h-5 w-5 text-blue-600" />
              </div>
              Informações Oftalmológicas
            </h2>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="rounded-lg bg-secondary p-3">
                <span className="text-sm font-medium text-muted-foreground">
                  Acuidade Visual (OD)
                </span>
                <div className="mt-1 text-foreground">
                  {ophthalmoInfo.ophthalmology_specific.visual_acuity_right}
                </div>
              </div>
              <div className="rounded-lg bg-secondary p-3">
                <span className="text-sm font-medium text-muted-foreground">
                  Acuidade Visual (OE)
                </span>
                <div className="mt-1 text-foreground">
                  {ophthalmoInfo.ophthalmology_specific.visual_acuity_left}
                </div>
              </div>
              <div className="rounded-lg bg-secondary p-3">
                <span className="text-sm font-medium text-muted-foreground">
                  Pressão Intraocular (OD)
                </span>
                <div className="mt-1 text-foreground">
                  {
                    ophthalmoInfo.ophthalmology_specific
                      .intraocular_pressure_right
                  }
                </div>
              </div>
              <div className="rounded-lg bg-secondary p-3">
                <span className="text-sm font-medium text-muted-foreground">
                  Pressão Intraocular (OE)
                </span>
                <div className="mt-1 text-foreground">
                  {
                    ophthalmoInfo.ophthalmology_specific
                      .intraocular_pressure_left
                  }
                </div>
              </div>
              <div className="col-span-2 rounded-lg bg-secondary p-3">
                <span className="text-sm font-medium text-muted-foreground">
                  Fundoscopia
                </span>
                <div className="mt-1 text-foreground">
                  {ophthalmoInfo.ophthalmology_specific.fundoscopy}
                </div>
              </div>
              <div className="col-span-2 rounded-lg bg-secondary p-3">
                <span className="text-sm font-medium text-muted-foreground">
                  Segmento Anterior
                </span>
                <div className="mt-1 text-foreground">
                  {ophthalmoInfo.ophthalmology_specific.anterior_segment}
                </div>
              </div>
              {ophthalmoInfo.ophthalmology_specific.visual_field && (
                <div className="rounded-lg bg-secondary p-3">
                  <span className="text-sm font-medium text-muted-foreground">
                    Campo Visual
                  </span>
                  <div className="mt-1 text-foreground">
                    {ophthalmoInfo.ophthalmology_specific.visual_field}
                  </div>
                </div>
              )}
              {ophthalmoInfo.ophthalmology_specific.color_vision && (
                <div className="rounded-lg bg-secondary p-3">
                  <span className="text-sm font-medium text-muted-foreground">
                    Visão de Cores
                  </span>
                  <div className="mt-1 text-foreground">
                    {ophthalmoInfo.ophthalmology_specific.color_vision}
                  </div>
                </div>
              )}
              {ophthalmoInfo.ophthalmology_specific.ocular_motility && (
                <div className="col-span-2 rounded-lg bg-secondary p-3">
                  <span className="text-sm font-medium text-muted-foreground">
                    Motilidade Ocular
                  </span>
                  <div className="mt-1 text-foreground">
                    {ophthalmoInfo.ophthalmology_specific.ocular_motility}
                  </div>
                </div>
              )}
            </div>
          </section>
        );

      case "neurology":
        // Verificar se o objeto tem a propriedade neurology_specific
        if (!("neurology_specific" in patientInfo)) return null;

        // Converter para o tipo correto
        const neuroInfo = patientInfo;
        if (!neuroInfo.neurology_specific) return null;

        return (
          <section>
            <h2 className="flex items-center gap-2 text-xl font-bold text-card-foreground">
              <div className="rounded-lg bg-purple-100 p-2">
                <FileText className="h-5 w-5 text-purple-600" />
              </div>
              Informações Neurológicas
            </h2>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="rounded-lg bg-secondary p-3">
                <span className="text-sm font-medium text-muted-foreground">
                  Estado Mental
                </span>
                <div className="mt-1 text-foreground">
                  {neuroInfo.neurology_specific.mental_status}
                </div>
              </div>
              <div className="rounded-lg bg-secondary p-3">
                <span className="text-sm font-medium text-muted-foreground">
                  Nervos Cranianos
                </span>
                <div className="mt-1 text-foreground">
                  {neuroInfo.neurology_specific.cranial_nerves}
                </div>
              </div>
              <div className="rounded-lg bg-secondary p-3">
                <span className="text-sm font-medium text-muted-foreground">
                  Sistema Motor
                </span>
                <div className="mt-1 text-foreground">
                  {neuroInfo.neurology_specific.motor_system}
                </div>
              </div>
              <div className="rounded-lg bg-secondary p-3">
                <span className="text-sm font-medium text-muted-foreground">
                  Sistema Sensorial
                </span>
                <div className="mt-1 text-foreground">
                  {neuroInfo.neurology_specific.sensory_system}
                </div>
              </div>
              <div className="rounded-lg bg-secondary p-3">
                <span className="text-sm font-medium text-muted-foreground">
                  Reflexos
                </span>
                <div className="mt-1 text-foreground">
                  {neuroInfo.neurology_specific.reflexes}
                </div>
              </div>
              <div className="rounded-lg bg-secondary p-3">
                <span className="text-sm font-medium text-muted-foreground">
                  Coordenação
                </span>
                <div className="mt-1 text-foreground">
                  {neuroInfo.neurology_specific.coordination}
                </div>
              </div>
              <div className="rounded-lg bg-secondary p-3">
                <span className="text-sm font-medium text-muted-foreground">
                  Marcha
                </span>
                <div className="mt-1 text-foreground">
                  {neuroInfo.neurology_specific.gait}
                </div>
              </div>
              {neuroInfo.neurology_specific.imaging_findings && (
                <div className="rounded-lg bg-secondary p-3">
                  <span className="text-sm font-medium text-muted-foreground">
                    Achados de Neuroimagem
                  </span>
                  <div className="mt-1 text-foreground">
                    {neuroInfo.neurology_specific.imaging_findings}
                  </div>
                </div>
              )}
            </div>
          </section>
        );

      default:
        return null;
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
            {renderSpecialtyFields()}

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
