import type { IEventForm } from "../../../utilities";

export const addEvent = async (data: any): Promise<any> => {
  const res = await fetch("http://localhost:3000/v1/events/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const getEvents = async (): Promise<any> => {
  const res = await fetch("http://localhost:3000/v1/events/get");
  const data = await res.json();
  return data;
};

export const deleteEvent = async (id: number): Promise<any> => {
  const res = await fetch(`http://localhost:3000/v1/events/${id}`, {
    method: "DELETE",
  });
  return res.json();
};

export const updateEvent = async (
  id: number,
  data: Partial<IEventForm>
): Promise<any> => {
  const res = await fetch(`http://localhost:3000/v1/events/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json;
};
