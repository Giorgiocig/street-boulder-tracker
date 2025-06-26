import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addBoulder } from "../api";

export const useAddBoulder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addBoulder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["boulders"] });
    },
  });
};
