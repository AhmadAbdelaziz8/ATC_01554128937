const BASE_URL = import.meta.env.VITE_API_URL;

export async function login({ email, password }) {
  const response = await fetch(`${BASE_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Login failed");
  return data; // { token, user }
}

export async function register({
  fullName,
  email,
  password,
  isRequestingAdminRole,
}) {
  console.log(BASE_URL);
  const response = await fetch(`${BASE_URL}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ fullName, email, password, isRequestingAdminRole }),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Registration failed");
  return data; // { user }
}

export async function getCurrentUser(token) {
  const response = await fetch(`${BASE_URL}/api/auth/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Failed to get user data");

  return data.user;
}
