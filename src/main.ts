import {
  getPreferences,
  addPreference,
  updatePreference,
  deletePreference,
  getSubscriptions,
  addSubscription,
  updateSubscription,
  deleteSubscription,
  getUsers,
} from "./api";
import { Preference, Subscription, User } from "./types";

// DOM Elements
const preferencesList = document.getElementById(
  "preferencesList"
) as HTMLUListElement | null;
const subscriptionsList = document.getElementById(
  "subscriptionsList"
) as HTMLUListElement | null;
const usersList = document.getElementById(
  "usersList"
) as HTMLUListElement | null;
const addPreferenceForm = document.getElementById(
  "addPreferenceForm"
) as HTMLFormElement | null;
const addSubscriptionForm = document.getElementById(
  "addSubscriptionForm"
) as HTMLFormElement | null;

const createPreferenceListItem = (preference: Preference) => {
  const li = document.createElement("li"); // Create with edit and delete buttons
  li.textContent = `${preference.name}: ${preference.description}  ID: ${preference.id}`;

  const editButton = document.createElement("button");
  editButton.textContent = "Edit";
  editButton.className = "bg-yellow-500 text-white px-2 py-1 rounded ml-2";
  editButton.onclick = async () => {
    const newName = prompt("Enter new name:", preference.name);
    const newDescription = prompt(
      "Enter new description:",
      preference.description
    );
    if (newName && newDescription && preference.id !== undefined) {
      await updatePreference(preference.id, {
        name: newName,
        description: newDescription,
      });
      loadPreferences();
    }
  };

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.className = "bg-red-500 text-white px-2 py-1 rounded ml-2";
  deleteButton.onclick = async () => {
    if (
      confirm("Are you sure you want to delete this preference?") &&
      preference.id !== undefined
    ) {
      await deletePreference(preference.id);
      loadPreferences();
    }
  };

  li.appendChild(editButton);
  li.appendChild(deleteButton);

  return li;
};

const createSubscriptionListItem = (subscription: Subscription) => {
  const li = document.createElement("li"); // Create item  with subscribe and delete buttons
  li.textContent = `User ID: ${subscription.user_id}, Preference ID: ${subscription.preference_id}, Enabled: ${subscription.enabled}`;

  const toggleButton = document.createElement("button");
  toggleButton.textContent = subscription.enabled ? "Unsubscribe" : "Subscribe";
  toggleButton.className = "bg-blue-500 text-white px-2 py-1 rounded ml-2";

  toggleButton.onclick = async () => {
    const newEnabled = !subscription.enabled;
    if (subscription.id !== undefined) {
      await updateSubscription(subscription.id, { enabled: newEnabled }); // Update the button text based on the new state
      toggleButton.textContent = newEnabled ? "Unsubscribe" : "Subscribe";
      loadSubscriptions();
    }
  };

  li.appendChild(toggleButton);

  // Delete button
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.className = "bg-red-500 text-white px-2 py-1 rounded ml-2";
  deleteButton.onclick = async () => {
    if (
      confirm("Are you sure you want to delete this subscription?") &&
      subscription.id !== undefined
    ) {
      await deleteSubscription(subscription.id);
      loadSubscriptions();
    }
  };

  li.appendChild(deleteButton);

  return li;
};

// LOAD FUNCTIONS ------------

const loadPreferences = async (): Promise<void> => {
  const preferences: Preference[] = await getPreferences();

  if (preferencesList) {
    preferencesList.innerHTML = "";
    preferences.forEach((preference: Preference) => {
      const li = createPreferenceListItem(preference);
      preferencesList.appendChild(li);
    });
  }
};

const loadSubscriptions = async (): Promise<void> => {
  const subscriptions: Subscription[] = await getSubscriptions();

  if (subscriptionsList) {
    subscriptionsList.innerHTML = "";
    subscriptions.forEach((subscription: Subscription) => {
      const li = createSubscriptionListItem(subscription);
      subscriptionsList.appendChild(li);
    });
  }
};

const loadUsers = async (): Promise<void> => {
  const users: User[] = await getUsers();

  if (usersList) {
    usersList.innerHTML = "";
    users.forEach((user: User) => {
      const li = document.createElement("li");
      li.textContent = `${user.name} (ID: ${user.id})`;
      usersList.appendChild(li);
    });
  }
};

if (addPreferenceForm) {
  addPreferenceForm.addEventListener("submit", async (event: Event) => {
    event.preventDefault();

    const nameInput = document.getElementById(
      "preferenceName"
    ) as HTMLInputElement | null;
    const descriptionInput = document.getElementById(
      "preferenceDescription"
    ) as HTMLInputElement | null;

    if (nameInput && descriptionInput) {
      const name: string = nameInput.value;
      const description: string = descriptionInput.value;

      await addPreference({ name, description });
      loadPreferences();
      addPreferenceForm.reset();
    }
  });
}

if (addSubscriptionForm) {
  addSubscriptionForm.addEventListener("submit", async (event: Event) => {
    event.preventDefault();

    const userIdInput = document.getElementById(
      "subscriptionUserId"
    ) as HTMLInputElement | null;
    const preferenceIdInput = document.getElementById(
      "subscriptionPreferenceId"
    ) as HTMLInputElement | null;

    if (userIdInput && preferenceIdInput) {
      const user_id: string = userIdInput.value;
      const preference_id: number = parseInt(preferenceIdInput.value, 10);

      await addSubscription({ preference_id, enabled: true, user_id });
      loadSubscriptions();
      addSubscriptionForm.reset();
    }
  });
}

// first load
loadPreferences();
loadSubscriptions();
loadUsers();
