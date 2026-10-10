import { ApplicationManagement } from "@/components/shared/application";
import React from "react";

function ApplicationPage() {
  return (
    <div>
      <ApplicationManagement role={"owner"}></ApplicationManagement>
    </div>
  );
}

export default ApplicationPage;
