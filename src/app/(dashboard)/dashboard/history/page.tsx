import { Suspense } from "react";
import { HistoryContent } from "./_components/history-content";
import { HistorySkeleton } from "./_components/history-skeleton";

export default async function HistoryPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
          Histórico de Consultas
        </h1>
        <p className="mt-2 text-muted-foreground">
          Visualize e gerencie todas as suas consultas anteriores.
        </p>
      </div>

      <Suspense fallback={<HistorySkeleton />}>
        <HistoryContent />
      </Suspense>
    </div>
  );
}
