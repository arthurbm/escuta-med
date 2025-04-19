import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Navbar } from "../../components/ui/navbar";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { getConsultations } from "@/app/actions";

export default async function HistoryPage() {
  // getConsultations agora retorna ConsultationWithIncludes[]
  const consultations = await getConsultations();
  await new Promise((resolve) => setTimeout(resolve, 10000));

  const getSpecialtyLabel = (specialty: string): string => {
    switch (specialty) {
      case "cardiology":
        return "Cardiologia";
      case "ophthalmology":
        return "Oftalmologia";
      case "neurology":
        return "Neurologia";
      default:
        return "Geral";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="mb-8 text-3xl font-bold">Histórico de Consultas</h1>

        {consultations.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-muted-foreground">
              Nenhuma consulta encontrada.
            </p>
            <Link href="/dashboard" className="mt-4">
              <Button>Realizar nova consulta</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {consultations.map((consultation) => (
              <Card key={consultation.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>
                      {/* Acesso direto pela relação */}
                      {consultation.patientIdentification?.name ||
                        "Paciente sem nome"}
                    </CardTitle>
                    <div className="flex items-center gap-4">
                      <span className="rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">
                        {getSpecialtyLabel(consultation.specialty)}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {format(new Date(consultation.createdAt), "PPP", {
                          locale: ptBR,
                        })}
                      </span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="summary">
                    <TabsList className="mb-4">
                      <TabsTrigger value="summary">Resumo</TabsTrigger>
                      <TabsTrigger value="raw">Transcrição</TabsTrigger>
                    </TabsList>

                    <TabsContent value="summary">
                      <div className="space-y-4">
                        {/* Renderiza a seção de identificação apenas se existir */}
                        {consultation.patientIdentification && (
                          <div>
                            <h3 className="mb-2 font-semibold">
                              Informações do Paciente
                            </h3>
                            <div className="grid grid-cols-2 gap-2">
                              <div>
                                <p className="text-sm text-muted-foreground">
                                  Nome
                                </p>
                                <p>
                                  {consultation.patientIdentification.name ??
                                    "N/A"}
                                </p>
                              </div>
                              <div>
                                <p className="text-sm text-muted-foreground">
                                  Idade
                                </p>
                                <p>
                                  {consultation.patientIdentification.age ??
                                    "N/A"}
                                </p>
                              </div>
                              <div>
                                <p className="text-sm text-muted-foreground">
                                  Gênero
                                </p>
                                <p>
                                  {consultation.patientIdentification.gender ??
                                    "N/A"}
                                </p>
                              </div>
                              {/* Adicionar outros campos de identificação aqui se necessário */}
                            </div>
                          </div>
                        )}

                        {/* Renderiza Queixa Principal se existir */}
                        {consultation.mainComplaint && (
                          <div>
                            <h3 className="mb-2 font-semibold">
                              Queixa Principal
                            </h3>
                            <p>
                              {consultation.mainComplaint.description ?? "N/A"}
                            </p>
                          </div>
                        )}

                        {/* Renderiza Hipótese Diagnóstica se existir */}
                        {consultation.diagnosticHypothesis && (
                          <div>
                            <h3 className="mb-2 font-semibold">Diagnóstico</h3>
                            <p>
                              {consultation.diagnosticHypothesis.hypothesis ??
                                "N/A"}
                            </p>
                          </div>
                        )}

                        {/* Adicionar renderização para outras seções aqui (patientHistory, etc.) */}
                      </div>
                    </TabsContent>

                    <TabsContent value="raw">
                      <div className="whitespace-pre-wrap rounded-md bg-muted p-4">
                        {consultation.text}
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
