"use client";

import Payments from "@/components/shared/payment";
import { useGetPaymentList } from "@/hooks/tenant.hook";
import { getErrorMessage } from "@/lib/getErrorMessage";

const PaymentPage = () => {
  return (
    <div>
      <Payments></Payments>
    </div>
  );
};

export default PaymentPage;
