import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addBoulder, deleteBoulder, updateBoulder } from "../boulderApi";
import type { IBoulder } from "../../../utilities/interfaces";
import { useSnackbar } from "../../../contexts/SnackbarContext";

export const useAddBoulder = () => {
  const { showSnackbar } = useSnackbar();
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
      showSnackbar("Buolder creato con successo");
    },
    onError: () => {
      console.log("error");
      showSnackbar("Errore nella creazione del boulder");
    },
    // on Settled --> end  mutation
    onSettled: async (_, error) => {
      if (error) console.log(error);
      else
        await queryClient.invalidateQueries({
          queryKey: ["events"],
        });
    },
  });
};

export const useDeleteBoulder = () => {
  const { showSnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deleteBoulder(id),
    onSuccess: () => {
      console.log("success");
      showSnackbar("Buolder eliminato con successo");
    },
    onError: () => {
      console.log("error");
      showSnackbar("Errore nell eliminazione del boulder");
    },
    onSettled: async (_, error) => {
      if (error) console.log(error);
      else await queryClient.invalidateQueries({ queryKey: ["events"] });
    },
  });
};

export const useUpdateBoulder = () => {
  const { showSnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: IBoulder }) =>
      updateBoulder(id, data),
    onSuccess: () => {
      console.log("success");
      showSnackbar("Buolder aggiornato con successo");
    },
    onError: () => {
      console.log("error");
      showSnackbar("Errore nell aggiornamento del boulder");
    },
    onSettled: async (_, error) => {
      if (error) console.log(error);
      else
        await queryClient.invalidateQueries({
          queryKey: ["events"],
        });
    },
  });
};
