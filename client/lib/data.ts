export async function fetchMenuList() {
  const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/menu`);

  if (!resp.ok) {
    throw new Error("Failed to fetch menu list");
  }

  return resp.json();
}
