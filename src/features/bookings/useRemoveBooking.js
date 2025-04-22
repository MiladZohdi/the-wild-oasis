import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useRemoveBooking() {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: removeBooking } = useMutation({
    mutationFn: ({ bookingId }) => deleteBooking(bookingId),
    onSuccess: () => {
      toast.success("Cabin successfully deleted");

      queryClient.invalidateQueries({
        queryKey: ["bookings"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, removeBooking };
}
