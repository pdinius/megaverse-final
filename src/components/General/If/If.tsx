import { FC } from "react";

interface IfProps {
  condition: boolean;
  children: React.ReactNode;
}

export const If: FC<IfProps> = ({ condition, children }) => {
  return condition ? children : null;
};
