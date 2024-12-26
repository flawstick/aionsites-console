export async function api(
  type: "POST" | "GET" | "PUT" | "DELETE",
  path: string,
  data?: any,
) {
  const result = await fetch(`https://api.aionsites.com${path}`, {
    method: type,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
    // if type is post or get, include body
    body: type === "POST" || type === "PUT" ? JSON.stringify(data) : undefined,
  });

  if (!result.ok) throw new Error("API request failed.");
  return result.json();
}
