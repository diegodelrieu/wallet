import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { BitcoinAddress } from "../AddressInput";
import { ordinalResponseSchema } from "../schemas";

export const ITEMS_PER_PAGE = 30;
const fetchBitcoinInscriptions = async (address?: BitcoinAddress, page = 0) => {
  const response = await fetch(
    `https://api-3.xverse.app/v1/address/${address}/ordinal-utxo?offset=${
      page * ITEMS_PER_PAGE
    }`
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  return ordinalResponseSchema.parse(data).results;
};

export const useAddressInscriptions = (address?: BitcoinAddress, page = 0) => {
  return useQuery({
    queryKey: ["inscriptions", address, page],
    queryFn: () => fetchBitcoinInscriptions(address, page),
    enabled: !!address,
    placeholderData: keepPreviousData,
  });
};
