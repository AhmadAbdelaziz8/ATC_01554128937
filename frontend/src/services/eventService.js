const BASE_URL = import.meta.env.VITE_API_URL;
// Get all events
export async function getAllEvents() {
  const response = await fetch(`${BASE_URL}/api/events`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch events");
  }

  return data;
}

// Get a single event by ID
export async function getEventById(eventId) {
  const response = await fetch(`${BASE_URL}/api/events/${eventId}`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch event");
  }

  return data;
}

// Create a new event (admin only)
export async function createEvent(eventData, token) {
  const response = await fetch(`${BASE_URL}/api/events`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(eventData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to create event");
  }

  return data;
}

// Update an existing event (admin only)
export async function updateEvent(eventId, eventData, token) {
  const response = await fetch(`${BASE_URL}/api/events/${eventId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(eventData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to update event");
  }

  return data;
}

// Delete an event (admin only)
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

  return true; // Successful deletion
}
