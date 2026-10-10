import RentalDocuments from "@/components/shared/rental-document";
import React from "react";

const DocumentUpload = () => {
  return (
    <div>
      <RentalDocuments role={"PROPERTY_OWNER"}></RentalDocuments>
    </div>
  );
};

export default DocumentUpload;
