import { useQuery } from "@tanstack/react-query";

const fetchInscriptionContent = async (inscriptionId: string) => {
  try {
    const response = await fetch(
      `https://ord.xverse.app/content/${inscriptionId}`
    );
    console.log(response);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.text();
    console.log(data);
    return data;
  } catch (e) {
    console.log(e);
    throw new Error(`${e}`);
  }
};

export const useInscriptionContent = (inscriptionId: string) => {
  return useQuery({
    queryKey: ["inscriptionContent", inscriptionId],
    queryFn: () => fetchInscriptionContent(inscriptionId),
    enabled: !!inscriptionId,
  });
};
