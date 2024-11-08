import { ReactNode } from "react";

interface LayoutContentProps {
  children: ReactNode;
}

export const LayoutContent = ({ children }: LayoutContentProps) => {
  return <div className="mt-[68px] w-full">{children}</div>;
};
