"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AddressInput } from "./AddressInput";
import { InscriptionList } from "./InscriptionList";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center  p-10">
      <div className="flex text-center pt-4 pb-2">
        Ordinal inscriptions lookup
      </div>
      <AddressInput />
      <InscriptionList />
    </main>
  );
}
