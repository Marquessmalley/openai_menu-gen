// Build-safe fallbacks
const emptyMenuList: any[] = [];
const emptyCurrentMonthMenu: { schedule: any[] } = { schedule: [] };
const emptyMonthMenu: { schedule: any[] } = { schedule: [] };
const emptyMonthsMenu: any[] = [];

export async function fetchMenuList() {
  // Skip fetch at build time if API URL is not available
  if (typeof window === "undefined" && !process.env.NEXT_PUBLIC_API_URL) {
    return emptyMenuList;
  }
  const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/menu`);

  if (!resp.ok) {
    // At build time, return fallback instead of throwing
    if (typeof window === "undefined") {
      console.warn("Failed to fetch menu list at build time, using fallback");
      return emptyMenuList;
    }
    throw new Error("Failed to fetch menu list");
  }

  return resp.json();
}

export async function fetchCurrentMonthMenu() {
  // Skip fetch at build time if API URL is not available
  if (typeof window === "undefined" && !process.env.NEXT_PUBLIC_API_URL) {
    return emptyCurrentMonthMenu;
  }
  const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/menu/current`);

  if (!resp.ok) {
    // At build time, return fallback instead of throwing
    if (typeof window === "undefined") {
      console.warn(
        "Failed to fetch current month menu at build time, using fallback",
      );
      return emptyCurrentMonthMenu;
    }
    throw new Error("Failed to fetch menu list");
  }

  return resp.json();
}

export async function fetchMonthMenu() {
  // Skip fetch at build time if API URL is not available
  if (typeof window === "undefined" && !process.env.NEXT_PUBLIC_API_URL) {
    return emptyMonthMenu;
  }
  const resp = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/menu/January/2026`,
  );

  if (!resp.ok) {
    // At build time, return fallback instead of throwing
    if (typeof window === "undefined") {
      console.warn("Failed to fetch month menu at build time, using fallback");
      return emptyMonthMenu;
    }
    throw new Error("Failed to fetch menu list");
  }

  return resp.json();
}

export async function fetchMonthsMenu() {
  // Skip fetch at build time if API URL is not available
  if (typeof window === "undefined" && !process.env.NEXT_PUBLIC_API_URL) {
    return emptyMonthsMenu;
  }
  const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/menu/months`);

  if (!resp.ok) {
    // At build time, return fallback instead of throwing
    if (typeof window === "undefined") {
      console.warn("Failed to fetch months menu at build time, using fallback");
      return emptyMonthsMenu;
    }
    throw new Error("Failed to fetch menu list");
  }

  return resp.json();
}
