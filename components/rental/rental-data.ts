export type RentalStatus = "active" | "pending" | "ended" | "terminated";
export type PaymentStatus = "paid" | "due" | "overdue" | "processing";

export type PaymentRecord = {
  id: string;
  period: string;
  dueDate: string;
  paidDate?: string;
  amount: number;
  method?: string;
  status: PaymentStatus;
};

export type RentalDocument = {
  id: string;
  name: string;
  type: string;
  size: string;
  uploadedDate: string;
};

export type TimelineEvent = {
  id: string;
  title: string;
  description: string;
  date: string;
  kind: "application" | "rental" | "payment-initiated" | "payment-completed";
};

export type Rental = {
  id: string;
  reference: string;
  status: RentalStatus;
  paymentStatus: PaymentStatus;
  property: {
    name: string;
    address: string;
    image: string;
  };
  room: {
    name: string;
    floor: string;
  };
  tenant: {
    name: string;
    email: string;
    avatar: string;
  };
  owner: {
    name: string;
    email: string;
    avatar: string;
  };
  monthlyRent: number;
  currency: string;
  deposit: number;
  startDate: string;
  endDate?: string;
  createdDate: string;
  currentRent: {
    period: string;
    amount: number;
  };
  nextDueDate: string;
  payments: PaymentRecord[];
  documents: RentalDocument[];
  timeline: TimelineEvent[];
};

export const rental: Rental = {
  id: "rnt_8842",
  reference: "RNT-2026-8842",
  status: "active",
  paymentStatus: "due",
  property: {
    name: "Maple Court Residences",
    address: "128 Elmwood Avenue, Brooklyn, NY 11201",
    image: "/modern-apartment-building-exterior.png",
  },
  room: {
    name: "Unit 4B — Corner Suite",
    floor: "4th Floor",
  },
  tenant: {
    name: "Sofia Renard",
    email: "sofia.renard@email.com",
    avatar: "/woman-portrait.png",
  },
  owner: {
    name: "Daniel Whitmore",
    email: "d.whitmore@maplecourt.com",
    avatar: "/thoughtful-man-portrait.png",
  },
  monthlyRent: 2400,
  currency: "USD",
  deposit: 4800,
  startDate: "2025-09-01",
  endDate: "2026-08-31",
  createdDate: "2025-08-14",
  currentRent: {
    period: "October 2026",
    amount: 2400,
  },
  nextDueDate: "2026-10-01",
  payments: [
    {
      id: "pay_006",
      period: "October 2026",
      dueDate: "2026-10-01",
      amount: 2400,
      status: "due",
    },
    {
      id: "pay_005",
      period: "September 2026",
      dueDate: "2026-09-01",
      paidDate: "2026-08-30",
      amount: 2400,
      method: "Bank transfer",
      status: "paid",
    },
    {
      id: "pay_004",
      period: "August 2026",
      dueDate: "2026-08-01",
      paidDate: "2026-08-02",
      amount: 2400,
      method: "Card •••• 4291",
      status: "paid",
    },
    {
      id: "pay_003",
      period: "July 2026",
      dueDate: "2026-07-01",
      paidDate: "2026-07-01",
      amount: 2400,
      method: "Bank transfer",
      status: "paid",
    },
    {
      id: "pay_002",
      period: "June 2026",
      dueDate: "2026-06-01",
      paidDate: "2026-06-03",
      amount: 2400,
      method: "Card •••• 4291",
      status: "paid",
    },
  ],
  documents: [
    {
      id: "doc_001",
      name: "Lease Agreement",
      type: "PDF",
      size: "1.8 MB",
      uploadedDate: "2025-08-14",
    },
    {
      id: "doc_002",
      name: "Property Condition Report",
      type: "PDF",
      size: "3.2 MB",
      uploadedDate: "2025-08-28",
    },
    {
      id: "doc_003",
      name: "Deposit Receipt",
      type: "PDF",
      size: "412 KB",
      uploadedDate: "2025-08-30",
    },
    {
      id: "doc_004",
      name: "House Rules & Addendum",
      type: "PDF",
      size: "624 KB",
      uploadedDate: "2025-09-01",
    },
  ],
  timeline: [
    {
      id: "evt_001",
      title: "Application accepted",
      description:
        "Owner approved the rental application submitted by Sofia Renard.",
      date: "2025-08-12T14:20:00",
      kind: "application",
    },
    {
      id: "evt_002",
      title: "Rental created",
      description: "Lease agreement generated and rental record activated.",
      date: "2025-08-14T09:05:00",
      kind: "rental",
    },
    {
      id: "evt_003",
      title: "Payment initiated",
      description: "September rent payment initiated via bank transfer.",
      date: "2026-08-30T18:42:00",
      kind: "payment-initiated",
    },
    {
      id: "evt_004",
      title: "Payment completed",
      description: "September rent of $2,400 cleared and reconciled.",
      date: "2026-08-31T07:15:00",
      kind: "payment-completed",
    },
  ],
};

export function formatCurrency(amount: number, currency = "USD") {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function formatDateTime(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}
