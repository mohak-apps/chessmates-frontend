import {
  AlertDialog as AlertDialogCN,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const AlertDialog = ({
  setShowPasswordConflict,
  showPasswordConflict,
  setShowInputPasswordModal,
}: {
  setShowPasswordConflict: React.Dispatch<React.SetStateAction<boolean>>;
  setShowInputPasswordModal: React.Dispatch<React.SetStateAction<boolean>>;
  showPasswordConflict: boolean;
}) => {
  return (
    <AlertDialogCN
      open={showPasswordConflict}
      onOpenChange={setShowPasswordConflict}
    >
      <AlertDialogContent className="bg-secondaryBackground">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-defaultText font-thin">
            You already have Google account set up. <br /> Would you like to:
          </AlertDialogTitle>
          <AlertDialogDescription className="flex justify-between flex-col">
            <AlertDialogAction
              onClick={() => {
                setShowPasswordConflict(false);
                setShowInputPasswordModal(true);
              }}
              className="bg-buttonBackground hover:bg-buttonHover text-buttonText rounded-lg w-full select-none"
            >
              Continue with Email
            </AlertDialogAction>
            <br />
            <AlertDialogCancel
              title="Go back and login through Google Authentication"
              className="bg-buttonBackground2 hover:bg-buttonHover2 text-buttonText "
            >
              Go back
            </AlertDialogCancel>
          </AlertDialogDescription>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialogCN>
  );
};

export default AlertDialog;
