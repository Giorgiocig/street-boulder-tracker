export const addEvent = async (data: any): Promise<any> => {
  const res = await fetch("http://localhost:3000/v1/events/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};
