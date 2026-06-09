interface ContactInput {
  name: string;
  email: string;
  consentToContact: boolean;
}

interface SessionState {
  contactId: string;
  sessionId: string;
}

async function requestJson<T>(url: string, init: RequestInit): Promise<T> {
  const headers = new Headers(init.headers);
  headers.set("Content-Type", "application/json");

  const response = await fetch(url, {
    ...init,
    headers,
  });

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export async function startConversation(
  contact: ContactInput,
): Promise<SessionState> {
  const savedContact = await requestJson<{ id: string }>("/api/contacts", {
    method: "POST",
    body: JSON.stringify(contact),
  });

  const session = await requestJson<{ id: string }>("/api/sessions", {
    method: "POST",
    body: JSON.stringify({ contactId: savedContact.id }),
  });

  const state = { contactId: savedContact.id, sessionId: session.id };

  // Cache only opaque identifiers. The server remains the source of truth.
  localStorage.setItem("conversation_session", JSON.stringify(state));
  return state;
}

export async function sendChatMessage(
  sessionId: string,
  message: string,
): Promise<{ reply: string }> {
  return requestJson("/api/chat", {
    method: "POST",
    body: JSON.stringify({ sessionId, message }),
  });
}
