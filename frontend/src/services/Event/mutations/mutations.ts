import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addEvent, deleteEvent, updateEvent } from "../eventApi";
import type { IEventForm } from "../../../utilities";
import { useSnackbar } from "../../../contexts/SnackbarContext";

export const useAddEvent = () => {
  const { showSnackbar } = useSnackbar();
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
      showSnackbar("Evento creato con successo");
    },
    onError: () => {
      console.log("error");
      showSnackbar("Errore nella creazione dell evento");
    },
    // on Settled --> end  mutation
    onSettled: async (_, error) => {
      if (error) console.log(error);
      else await queryClient.invalidateQueries({ queryKey: ["events"] });
    },
  });
};

export const useDeleteEvent = () => {
  const { showSnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deleteEvent(id),
    onSuccess: () => {
      showSnackbar("Evento eliminato con successo");
    },
    onError: () => {
      showSnackbar("Errore nell eliminazione dell evento");
    },
    onSettled: async (_, error) => {
      if (error) console.log(error);
      else await queryClient.invalidateQueries({ queryKey: ["events"] });
    },
  });
};

export const useUpdateEvent = () => {
  const { showSnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<IEventForm> }) =>
      updateEvent(id, data),
    onSuccess: () => {
      showSnackbar("Evento aggiornato con successo");
    },
    onError: () => {
      showSnackbar("Errore nell aggiornamento dell evento");
    },
    onSettled: async (_, error) => {
      if (error) console.log(error);
      else await queryClient.invalidateQueries({ queryKey: ["events"] });
    },
  });
};
