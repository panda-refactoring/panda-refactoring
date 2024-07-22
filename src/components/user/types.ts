import { UserData } from "src/common/types/data.types";

export interface UserManageProps {
  userData: UserData;
  setToast: ({ message, isError }: { message: string; isError?: boolean }) => void;
}
