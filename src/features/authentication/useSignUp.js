import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signUp as signupApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useSignUp() {
  const queryClient = useQueryClient();
  const { mutate: signUp, isLoading } = useMutation({
    mutationFn: ({ email, password, fullName }) =>
      signupApi({ email, password, fullName }),
    onSuccess: (user) => {
      toast.success("User created successfuly!");
      queryClient.setQueryData(["user"], (oldData) => {
        return oldData;
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { signUp, isLoading };
}
