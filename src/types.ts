export interface Subscription {
  id?: number;
  created_at?: string;
  preference_id: number;
  enabled: boolean;
  user_id: string;
}

export interface Preference {
  id?: number;
  description: string;
  name: string;
  created_at?: string;
}

export interface User {
  id: string;
  name: string;
  created_at?: string;
}
