import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addEvent, deleteEvent, updateEvent } from "../eventApi";
import type { IEventForm } from "../../../utilities";

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

export const useDeleteEvent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deleteEvent(id),
    onSettled: async (_, error) => {
      if (error) console.log(error);
      else await queryClient.invalidateQueries({ queryKey: ["events"] });
    },
  });
};

export const useUpdateEvent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<IEventForm> }) =>
      updateEvent(id, data),
    onSettled: async (_, error) => {
      if (error) console.log(error);
      else await queryClient.invalidateQueries({ queryKey: ["events"] });
    },
  });
};
