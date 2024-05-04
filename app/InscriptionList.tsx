import Link from "next/link";
import {
  ITEMS_PER_PAGE,
  useAddressInscriptions,
} from "./hooks/useAddressInscriptions";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import ButtonWithLoader from "./ui/ButtonWithLoader";
import { useState } from "react";

export const InscriptionList = () => {
  const [page, setPage] = useState(0);
  const address = useSearchParams()?.get("address");
  const {
    data: ordinals,
    error,
    isLoading,
  } = useAddressInscriptions(address ?? undefined, page);
  console.log(ordinals?.map((ordi) => ordi.txid));
  return (
    <>
      {ordinals && <p>Results</p>}
      {ordinals &&
        ordinals.map((ordinal, index) => (
          <div key={`${ordinal.txid}-${ordinal.inscriptions[0]?.id ?? index}`}>
            {Boolean(ordinal.inscriptions[0]?.id) && (
              <Link
                href={`/inscription/${address}/${ordinal.inscriptions[0].id}`}
              >
                <div
                  key={ordinal.txid}
                  className=" flex text-white w-screen justify-between align-middle p-5"
                >
                  <h4 className="mr-4">
                    Inscription {ordinal.inscriptions[0].id.slice(0, 8)}
                  </h4>
                  <Image src="/Arrow.svg" alt="arrow" width={12} height={12} />
                </div>
              </Link>
            )}
          </div>
        ))}
      {error && (
        <div className="text-red-500">
          Something went wrong fetching inscriptions{JSON.stringify(error)}
        </div>
      )}
      {ordinals?.length === ITEMS_PER_PAGE && (
        <ButtonWithLoader
          loading={isLoading}
          className="w-100 bg-[#465AE9] p-2 rounded mt-3 mb-5"
          onClick={() => setPage((old) => old + 1)}
        >
          Load more
        </ButtonWithLoader>
      )}
    </>
  );
};
