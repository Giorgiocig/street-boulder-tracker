import type { IBoulderImage } from "../../utilities";

// POST
export const addBoulderImage = async (
  file: File,
  boulderId: number
): Promise<any> => {
  const formData = new FormData();
  formData.append("file", file);
  const res = await fetch(
    `http://localhost:3000/v1/boulders/${boulderId}/image`,
    {
      method: "POST",
      body: formData,
    }
  );
  if (!res.ok) {
    throw new Error(`Failed to upload image: ${res.statusText}`);
  }
  return await res.json();
};

// GET
export const getBoulderImages = async (
  boulderId: number
): Promise<IBoulderImage[]> => {
  const res = await fetch(
    `http://localhost:3000/v1/boulders/${boulderId}/images`
  );
  const data = await res.json();
  return data;
};
