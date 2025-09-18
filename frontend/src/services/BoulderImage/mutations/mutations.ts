import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addBoulderImage } from "../boulderImageApi";

export const useAddBoulderImage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ data, boulderId }: { data: File; boulderId: number }) =>
      addBoulderImage(data, boulderId),
    onSuccess: () => {
      console.log("Upload corretto dell'immagine");
    },
    onError: () => {
      console.log("Upload corretto dell'immagine");
    },
    onSettled: async (_, error) => {
      if (error) console.log(error);
      else
        await queryClient.invalidateQueries({
          queryKey: ["boulders"],
        });
    },
  });
};
