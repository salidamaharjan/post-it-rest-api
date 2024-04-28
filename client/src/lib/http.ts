export async function get(url: string) {
  const token = localStorage.getItem("token");
  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const result = await response.json();
  return result;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function post(url: string, body: any) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const data = await response.json();
  return data;
}
