import axios from "axios";

const SUPABASE_URL = "API URL HERE :)";
const SUPABASE_API_KEY = "API_KEY_HERE :)";

const headers = {
  apikey: SUPABASE_API_KEY,
  Authorization: `Bearer ${SUPABASE_API_KEY}`,
  "Content-Type": "application/json",
};

// Preferences ------------

// GET
export const getPreferences = async () => {
  const response = await axios.get(`${SUPABASE_URL}preferences`, {
    headers,
  });
  console.log(response.data);
  return response.data;
};

// POST
export const addPreference = async (preference: {
  name: string;
  description: string;
}) => {
  const response = await axios.post(`${SUPABASE_URL}preferences`, preference, {
    headers,
  });
  return response.data;
};

// Update / PATCH
export const updatePreference = async (
  id: number,
  updatedData: { name?: string; description?: string }
) => {
  const response = await axios.patch(
    `${SUPABASE_URL}preferences?id=eq.${id}`,
    updatedData,
    { headers }
  );
  return response.data;
};

// DELETE
export const deletePreference = async (id: number) => {
  const response = await axios.delete(
    `${SUPABASE_URL}preferences?id=eq.${id}`,
    { headers }
  );
  return response.data;
};

// Subscriptions  ----------

// GET
export const getSubscriptions = async () => {
  const response = await axios.get(`${SUPABASE_URL}subscriptions?select=*`, {
    headers,
  });
  return response.data;
};

// POST
export const addSubscription = async (subscription: {
  preference_id: number;
  enabled: boolean;
  user_id: string;
}) => {
  const response = await axios.post(
    `${SUPABASE_URL}subscriptions`,
    subscription,
    { headers }
  );
  return response.data;
};

// Update / PATCH
export const updateSubscription = async (
  id: number,
  updatedData: { enabled?: boolean }
) => {
  const response = await axios.patch(
    `${SUPABASE_URL}subscriptions?id=eq.${id}`,
    updatedData,
    { headers }
  );
  return response.data;
};

// DELETE
export const deleteSubscription = async (id: number) => {
  const response = await axios.delete(
    `${SUPABASE_URL}subscriptions?id=eq.${id}`,
    { headers }
  );
  return response.data;
};

// Users  ----------
export const getUsers = async () => {
  const response = await axios.get(`${SUPABASE_URL}users?select=*`, {
    headers,
  });
  return response.data;
};
