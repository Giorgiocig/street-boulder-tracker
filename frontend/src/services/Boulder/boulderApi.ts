import type { IBoulder } from "../../utilities/interfaces";

export const getBoulders = async (): Promise<IBoulder[]> => {
  const res = await fetch("http://localhost:3000/v1/boulders/get");
  const data = await res.json();
  return data;
};

export const addBoulder = async (data: IBoulder): Promise<IBoulder> => {
  const res = await fetch("http://localhost:3000/v1/boulders/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const deleteBoulder = async (id: number): Promise<any> => {
  const res = await fetch(`http://localhost:3000/v1/boulders/${id}`, {
    method: "DELETE",
  });
  return await res.json();
};

export const updateBoulder = async (
  id: number,
  data: IBoulder
): Promise<any> => {
  const res = await fetch(`http://localhost:3000/v1/boulders/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return await res.json();
};
