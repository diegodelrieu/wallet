import React from "react";
import Image from "next/image";
import { useInscriptionContent } from "../hooks/useInscriptionContent";

const DisplayContent = ({
  contentType,
  content,
  inscriptionId,
}: {
  contentType: string;
  content: string;
  inscriptionId: string;
}) => {
  const { data: inscriptionContent } = useInscriptionContent(inscriptionId);
  const isImage = contentType && contentType.startsWith("image/");
  return (
    <div className="my-3">
      {isImage ? (
        <Image
          src={content}
          alt="image"
          width={500}
          height={500}
          style={{ objectFit: "contain" }}
        />
      ) : (
        <pre className="max-w-40 whitespace-pre-wrap">
          {JSON.stringify(inscriptionContent, null, 2)}
        </pre>
      )}
    </div>
  );
};

export default DisplayContent;
