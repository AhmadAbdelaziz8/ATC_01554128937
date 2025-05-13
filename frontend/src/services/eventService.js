const API_BASE_URL = import.meta.env.BASE_API_URL;

export async function getAllEvents() {
  try {
    // const response = await fetch(`${API_BASE_URL}/api/events`);
    const response = await fetch(`http://localhost:4000/api/events`);

    if (!response.ok) {
      throw new Error("Failed to fetch events");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching events:", error);
    throw error;
  }
}

export async function getEventById(eventId) {
  try {
    const response = await fetch(`${API_BASE_URL}/events/${eventId}`);
    if (!response.ok) {
      throw new Error("Failed to fetch event");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching event:", error);
    throw error;
  }
}
