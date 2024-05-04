"use client";
import * as z from "zod";
import React from "react";
import ButtonWithLoader from "./ui/ButtonWithLoader";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { useAddressInscriptions } from "./hooks/useAddressInscriptions";

// Zod schema for Bitcoin address
const bitcoinAddressSchema = z
  .string()
  .regex(/^(bc1|[13])[a-zA-HJ-NP-Z0-9]{25,99}$/i);

export type BitcoinAddress = z.infer<typeof bitcoinAddressSchema>;

type FormData = { bitcoinAddress: BitcoinAddress };

export const AddressInput = () => {
  const router = useRouter();
  const { isLoading } = useAddressInscriptions();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = (data) => {
    router.push(`/?address=${data.bitcoinAddress}`);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
        <label className="my-2">Owner Bitcoin Address:</label>
        <input
          type="text"
          className="bg-[#24252C]"
          {...register("bitcoinAddress", {
            required: true,
            validate: (value) => bitcoinAddressSchema.safeParse(value).success,
          })}
        />
        {errors.bitcoinAddress && (
          <p className="text-red-500 my-2">Invalid Bitcoin address</p>
        )}
        <ButtonWithLoader
          type="submit"
          loading={isLoading}
          className="w-100 bg-[#465AE9] p-3 rounded mt-3 mb-5"
        >
          Lookup
        </ButtonWithLoader>
      </form>
    </>
  );
};
