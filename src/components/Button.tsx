import { Button } from "@/components/ui/button";

export const ButtonUI = ({
  onClick,
  children,
}: {
  onClick: () => void;
  children: React.ReactNode;
}) => {
  return (
    <Button
      onClick={onClick}
      className="px-8 py-4 bg-buttonBackground hover:bg-buttonHover text-buttonText font-bold rounded"
    >
      {children}
    </Button>
  );
};
