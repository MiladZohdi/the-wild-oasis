import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useCheckout() {
  const queryClient = useQueryClient();

  const { mutate: checkOut, isLoading: isCheckingOut } = useMutation({
    mutationFn: ({ bookingId }) =>
      updateBooking(bookingId, {
        status: "checked-out",
      }),
    onSuccess: (data) => {
      toast.success(`booking #${data.id} is checked out successfully`);
      queryClient.invalidateQueries({ active: true });
    },
    onError: () => toast.error("An error has occurred while checking out"),
  });

  return { checkOut, isCheckingOut };
}
