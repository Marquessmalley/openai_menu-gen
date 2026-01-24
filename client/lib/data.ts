export async function fetchMenuList() {
  const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/menu`);

  if (!resp.ok) {
    throw new Error("Failed to fetch menu list");
  }

  return resp.json();
}

export async function fetchCurrentMonthMenu() {
  const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/menu/current`);

  if (!resp.ok) {
    throw new Error("Failed to fetch menu list");
  }

  return resp.json();
}

export async function fetchMonthMenu() {
  const resp = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/menu/January/2026`,
  );

  if (!resp.ok) {
    throw new Error("Failed to fetch menu list");
  }

  return resp.json();
}

export async function fetchMonthsMenu() {
  const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/menu/months`);

  if (!resp.ok) {
    throw new Error("Failed to fetch menu list");
  }

  return resp.json();
}
