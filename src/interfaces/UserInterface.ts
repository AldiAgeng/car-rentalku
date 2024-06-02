export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  token: string;
  refresh_token: string;
  created_at: Date;
  updated_at: Date;
  role_id: string;
}