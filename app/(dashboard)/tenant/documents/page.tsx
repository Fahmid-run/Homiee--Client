"use client";
import AuthLoader from "@/components/auth/auth-loader";
import { AddPropertyDialog } from "@/components/property/add-property";
import RentalDocuments from "@/components/shared/rental-document";
import { useGetMe } from "@/hooks";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const documentUpload = () => {
  const { data, isError, isPending } = useGetMe();

  const user = data?.data;

  const router = useRouter();

  useEffect(() => {
    if (isPending) {
      return;
    }
    if (isError || !user) {
      router.replace("/auth");
    }
  }, [isError, isPending, user]);

  if (isPending) {
    return <AuthLoader></AuthLoader>;
  }

  return (
    <div>
      <RentalDocuments role={user.role}></RentalDocuments>
    </div>
  );
};

export default documentUpload;
