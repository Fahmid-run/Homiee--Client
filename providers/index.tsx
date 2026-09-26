import { ReactNode } from "react";
import QueryProvider from ".";

const Provider = ({ children }: { children: React.ReactNode }) => {
  return <QueryProvider>{children}</QueryProvider>;
};

export default Provider;
