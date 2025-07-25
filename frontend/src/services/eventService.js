const BASE_URL = import.meta.env.VITE_API_URL;

// Get all events with pagination
export async function getAllEvents(
  token = null,
  location = null,
  page = 1,
  limit = 8,
  category = null
) {
  const headers = {};

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const params = new URLSearchParams();

  if (location && location.trim()) {
    params.append("location", location.trim());
  }

  if (category && category.trim()) {
    params.append("category", category.trim());
  }

  params.append("page", page.toString());
  params.append("limit", limit.toString());

  // Build the final URL
  const url = `${BASE_URL}/api/events?${params.toString()}`;

  const response = await fetch(url, {
    headers,
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch events");
  }

  return data;
}

// Get a single event by ID
export async function getEventById(eventId, token = null) {
  const headers = {};

  // Add authorization header if token is provided
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${BASE_URL}/api/events/${eventId}`, {
    headers,
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch event");
  }

  return data;
}

// Create a new event (admin only)
export async function createEvent(eventData, token) {
  // Determine if eventData is FormData (has image file) or regular JSON
  const isFormData = eventData instanceof FormData;

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  // Only add Content-Type for JSON data, browser will set it automatically for FormData
  if (!isFormData) {
    headers["Content-Type"] = "application/json";
  }

  const response = await fetch(`${BASE_URL}/api/events`, {
    method: "POST",
    headers,
    body: isFormData ? eventData : JSON.stringify(eventData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to create event");
  }

  return data;
}

// Update an existing event (admin only)
export async function updateEvent(eventId, eventData, token) {
  const isFormData = eventData instanceof FormData;

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  if (!isFormData) {
    headers["Content-Type"] = "application/json";
  }

  const response = await fetch(`${BASE_URL}/api/events/${eventId}`, {
    method: "PUT",
    headers,
    body: isFormData ? eventData : JSON.stringify(eventData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to update event");
  }

  return data;
}

export async function deleteEvent(eventId, token) {
  const response = await fetch(`${BASE_URL}/api/events/${eventId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const data = await response
      .json()
      .catch(() => ({ message: "Failed to delete event" }));
    throw new Error(data.message || "Failed to delete event");
  }

  return true;
}
