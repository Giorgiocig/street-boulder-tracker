import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addBoulder } from "../api";
import type { IBoulder } from "../../utilities/interfaces";

export const useAddBoulder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: IBoulder) => addBoulder(data),
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
      else await queryClient.invalidateQueries({ queryKey: ["boulders"] });
    },
  });
};
