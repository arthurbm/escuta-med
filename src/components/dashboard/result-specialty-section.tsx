import { renderList } from "@/lib/arrays";
import { type PatientInfo } from "@/schemas/patient-schema";

import { type SpecialtyType } from "@/schemas/patient-schema";
import { FileText } from "lucide-react";

interface ResultSpecialtySectionProps {
  patientInfo: PatientInfo | null;
  specialty: SpecialtyType;
}

export function ResultSpecialtySection({
  patientInfo,
  specialty,
}: ResultSpecialtySectionProps) {
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
  return renderSpecialtyFields();
}
