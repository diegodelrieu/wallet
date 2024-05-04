import { z } from "zod";

export const inscriptionSchema = z.object({
  id: z.string(),
  offset: z.number(),
  content_type: z.string().nullable(),
  number: z.number().optional(),
  address: z.string().optional(),
  genesis_address: z.string().optional(),
  genesis_block_height: z.number().optional(),
  genesis_block_hash: z.string().optional(),
  genesis_tx_id: z.string().optional(),
  genesis_fee: z.number().optional(),
  genesis_timestamp: z.number().optional(),
  location: z.string().optional(),
  ouput: z.string().optional(),
  sat_ordinal: z.number().optional(),
  sat_rarity: z.string().optional(),
  sat_coinbase_height: z.number().optional(),
  mime_type: z.string().optional(),
  content_length: z.number().optional().nullable(),
  tx_id: z.string().optional(),
  timestamp: z.number().optional(),
  value: z.number().optional(),
});

export const ordinalSchema = z.object({
  txid: z.string(),
  vout: z.number(),
  block_height: z.number(),
  value: z.number(),
  sats: z.array(
    z.object({
      number: z.string(),
      rarity_ranking: z.string(),
      offset: z.number(),
    })
  ),
  inscriptions: z.array(inscriptionSchema),
});
export const ordinalResponseSchema = z.object({
  limit: z.number(),
  offset: z.number(),
  total: z.number(),
  results: z.array(ordinalSchema),
});
