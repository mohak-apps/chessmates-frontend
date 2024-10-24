import { Button } from "@/components/ui/button";

export const ButtonUI = ({
  onClick,
  children,
  className,
}: {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <Button
      onClick={onClick}
      className={`px-8 py-4 bg-buttonBackground hover:bg-buttonHover text-buttonText rounded-lg w-full ${className}`}
    >
      {children}
    </Button>
  );
};
