export async function get(url: string) {
  const token = localStorage.getItem("token");
  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (response.status === 401) {
    localStorage.removeItem("token");
    window.location.href = "/login";
    return;
  }
  const result = await response.json();
  return result;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function post(url: string, body: any) {
  const token = localStorage.getItem("token");
  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  if (response.status === 401) {
    localStorage.removeItem("token");
    window.location.href = "/login";
    return;
  }
  const data = await response.json();
  return data;
}
export async function doDelete(url: string) {
  const token = localStorage.getItem("token");
  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      // "Content-Type": "application/json",
    },
  });
  if (response.status === 401) {
    console.log("error");
    localStorage.removeItem("token");
    window.location.href = "/login";
    return;
  }
  const data = await response.json();
  return data;
}
