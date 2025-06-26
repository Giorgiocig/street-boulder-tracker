import type { IBoulder } from "../utilities/interfaces";

export const getBoulders = async (): Promise<IBoulder[]> => {
  const res = await fetch("http://localhost:3000/v1/boulders/get");
  if (!res.ok) throw new Error("non é possibile recuperare i boulders");
  const data = await res.json();
  return data;
};

export const addBoulder = async (boulder: IBoulder): Promise<IBoulder> => {
  const res = await fetch("http://localhost:3000/v1/boulders/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(boulder),
  });
  if (!res.ok) {
    const errorText = await res.text(); // per vedere messaggio d’errore dal server
    console.error("Errore dal server:", errorText);
    throw new Error("Errore nella creazione del boulder");
  }
  return res.json();
};
