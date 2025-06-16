import { ReactNode } from "react";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

type Props = {
  deleteButton: ReactNode;
  confirmMessage: string;
  onDelete: () => void;
};

export function DeleteWithConfirm({ ...props }: Props) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{props.deleteButton}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{props.confirmMessage}</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="cursor-pointer">
            キャンセル
          </AlertDialogCancel>
          <AlertDialogAction
            className="submit-button cursor-pointer"
            onClick={props.onDelete}
          >
            削除する
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
