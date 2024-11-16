import { Button } from "@/components/ui/button";

export const ButtonUI = ({
  onClick,
  children,
  className,
  disabled,
}: {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean
}) => {
  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      className={`px-8 py-4 bg-buttonBackground hover:bg-buttonHover text-buttonText rounded-lg w-full select-none ${className}`}
    >
      {children}
    </Button>
  );
};
