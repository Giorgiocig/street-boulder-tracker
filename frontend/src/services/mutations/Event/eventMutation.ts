import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addEvent } from "../../api";

export const useAddEvent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: any) => addEvent(data),
    // intercept mutation at each stage of its lifecycle

    // onMutate --> start mutation
    onMutate: () => {
      console.log("mutate");
    },
    onSuccess: () => {
      console.log("success");
    },
    onError: () => {
      console.log("error");
    },
    // on Settled --> end  mutation
    onSettled: async (_, error) => {
      if (error) console.log(error);
      else await queryClient.invalidateQueries({ queryKey: ["events"] });
    },
  });
};
