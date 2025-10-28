import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addBoulderImage, deleteBoulderImage } from "../boulderImageApi";
import { useSnackbar } from "../../../contexts";

export const useAddBoulderImage = () => {
  const { showSnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ data, boulderId }: { data: File; boulderId: number }) =>
      addBoulderImage(data, boulderId),
    onSuccess: () => {
      console.log("Upload corretto dell'immagine");
      showSnackbar("Upload corretto dell'immagine");
    },
    onError: () => {
      console.log("Errore durante l'upload");
      showSnackbar("Errore durante l'upload");
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

export const useDeleteBoulderImage = () => {
  const { showSnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (publicId: string) => deleteBoulderImage(publicId),
    onSuccess: () => {
      console.log("Immagine eliminata correttamente");
      showSnackbar("Immagine eliminata correttamente");
    },
    onError: () => {
      console.log("Errore durnte l'eliminazione dell'immagine");
      showSnackbar("Errore durnte l'eliminazione dell'immagine");
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
