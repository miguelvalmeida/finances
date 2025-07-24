import Link from "next/link";
import { PiggyBank } from "lucide-react";

import { Button } from "@/components/ui/button";
import { routes, BRAND_NAME } from "@/lib/constants";

export default function Page() {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center bg-background px-4 py-8 md:py-16 text-foreground">
      <div className="mb-10 flex items-center gap-4 self-center">
        <div className="bg-primary text-primary-foreground flex size-14 md:size-20 items-center justify-center rounded-2xl">
          <PiggyBank className="size-8 md:size-12" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight md:text-5xl md:tracking-tight">
          {BRAND_NAME}
        </h1>
      </div>
      <h2 className="mb-4 text-center text-2xl font-semibold md:text-4xl">
        Controla as tuas finanças com facilidade
      </h2>
      <p className="mb-8 max-w-2xl text-center text-base md:text-lg text-muted-foreground">
        Tostões é a aplicação ideal para acompanhar os teus rendimentos e
        despesas, consultar o teu histórico de transações e muito mais. É
        simples e seguro.
      </p>
      <div className="mb-10 grid w-full max-w-3xl grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex flex-col items-center rounded-xl border bg-card p-6 shadow-sm text-center">
          <span className="mb-2 text-3xl">💸</span>
          <h3 className="mb-1 text-lg font-semibold">
            Gestão de rendimentos e despesas
          </h3>
          <p className="text-sm text-muted-foreground">
            Regista facilmente todos os teus ganhos e gastos.
          </p>
        </div>
        <div className="flex flex-col items-center rounded-xl border bg-card p-6 shadow-sm text-center">
          <span className="mb-2 text-3xl">🔄</span>
          <h3 className="mb-1 text-lg font-semibold">
            Histórico de transações
          </h3>
          <p className="text-sm text-muted-foreground">
            Consulta rapidamente todas as tuas movimentações financeiras.
          </p>
        </div>
        <div className="flex flex-col items-center rounded-xl border bg-card p-6 shadow-sm text-center">
          <span className="mb-2 text-3xl">📊</span>
          <h3 className="mb-1 text-lg font-semibold">
            Visualização do património
          </h3>
          <p className="text-sm text-muted-foreground">
            Acompanha o crescimento do teu património ao longo do tempo.
          </p>
        </div>
        <div className="flex flex-col items-center rounded-xl border bg-card p-6 shadow-sm text-center">
          <span className="mb-2 text-3xl">📈</span>
          <h3 className="mb-1 text-lg font-semibold">
            Acompanhamento de investimentos
          </h3>
          <p className="text-sm text-muted-foreground">
            Controla e analisa os teus investimentos de forma simples.
          </p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <Button asChild size="lg">
          <Link href={routes.signUp.url}>Começar agora</Link>
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link href={routes.signIn.url}>Já tenho conta</Link>
        </Button>
      </div>
    </section>
  );
}
