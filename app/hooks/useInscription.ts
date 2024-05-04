import { useQuery } from "@tanstack/react-query";
import { BitcoinAddress } from "../AddressInput";
import { inscriptionSchema } from "../schemas";

const fetchBitcoinInscription = async (
  address: BitcoinAddress,
  inscriptionId: string
) => {
  const response = await fetch(
    `https://api-3.xverse.app/v1/address/${address}/ordinals/inscriptions/${inscriptionId}`
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  return inscriptionSchema.parse(data);
};

export const useInscription = (
  address: BitcoinAddress,
  inscriptionId: string
) => {
  return useQuery({
    queryKey: ["inscription", address, inscriptionId],
    queryFn: () => fetchBitcoinInscription(address, inscriptionId),
    enabled: !!address,
  });
};
