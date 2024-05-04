"use client";
import { BitcoinAddress } from "@/app/AddressInput";
import { useInscription } from "@/app/hooks/useInscription";
import DisplayContent from "@/app/ui/DisplayContent";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Inscription({
  params: { address, inscriptionId },
}: {
  params: { address: BitcoinAddress; inscriptionId: string };
}) {
  const router = useRouter();
  const { data: inscription, error } = useInscription(address, inscriptionId);
  const handleGoBack = () => {
    router.back();
  };

  return (
    <main className="flex min-h-screen justify-center">
      <div className="flex flex-col  justify-between p-20">
        <div className="flex justify-between w-screen p-6">
          <div
            onClick={handleGoBack}
            style={{ transform: "rotate(180deg)", cursor: "pointer" }}
          >
            <Image src="/Arrow.svg" alt="arrow" width={12} height={12} />
          </div>
          <button className="align-self-start">Details</button>
          <div />
        </div>
        <div className="flex items-center justify-center flex-col">
          {inscription?.content_type && (
            <DisplayContent
              content={`https://ord.xverse.app/content/${inscriptionId}`}
              contentType={inscription?.content_type}
              inscriptionId={inscription.id}
            />
          )}
          <div className="flex flex-col justify-start">
            {Object.keys(inscription ?? {}).map((key) => (
              <div key={key}>
                {inscription && (
                  <Card
                    title={key}
                    content={inscription[key as keyof typeof inscription]}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
        {error && (
          <p className="text-red-500">
            {" "}
            Something went wrong fetching inscription
            {JSON.stringify(error)}
          </p>
        )}
      </div>
    </main>
  );
}
const Card = ({
  title,
  content,
}: {
  title: string;
  content: string | number | undefined | null;
}) => {
  return (
    <div className="max-w-lg shadow-md rounded-md overflow-hidden my-2">
      <div className="p-4">
        <h2 className="text-lg font-semibold text-[#FFFFFFB2]">{title}</h2>
        <p className="mt-2 text-sm text-white bg-[#24252C] p-3 overflow-hidden rounded">
          {content}
        </p>
      </div>
    </div>
  );
};
