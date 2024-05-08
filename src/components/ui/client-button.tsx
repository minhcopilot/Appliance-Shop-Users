"use client"; // Đánh dấu đây là Client Component

import { Button, ButtonProps } from "@/components/ui/button";

interface ClientButtonProps extends ButtonProps {
  onClick: () => void;
}

const ClientButton = ({ children, onClick, ...props }: ClientButtonProps) => {
  return (
    <Button onClick={onClick} {...props}>
      {children}
    </Button>
  );
};

export default ClientButton;
