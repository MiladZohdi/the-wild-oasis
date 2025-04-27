import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateUser as updateUserApi } from "../../services/apiAuth";

export function useUpdateUser() {
  const queryClient = useQueryClient();
  const { mutate: updateUser, isLoading } = useMutation({
    mutationFn: ({ name, avatar }) => updateUserApi({ name, avatar }),
    onSuccess: () => {
      toast.success("User updated successfuly!");
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },

    onError: (err) => {
      toast.success(err.message);
    },
  });

  return { updateUser, isLoading };
}
