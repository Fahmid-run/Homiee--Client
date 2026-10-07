import { ShieldAlert } from "lucide-react";
import Link from "next/link";
import React from "react";

const AccessDenied = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="flex items-center gap-5">
        <div className="p-3 bg-red-300 rounded-full text-center">
          <ShieldAlert className="size-5 text-red-600"></ShieldAlert>
        </div>
        <div>
          <h1>You do not have acess to this page</h1>
          <p>
            Go back to <Link href="/">Home </Link>{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AccessDenied;
