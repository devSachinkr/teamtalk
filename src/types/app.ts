export type USER = {
  avatar_url: string;
  channels: string[] | null;
  created_at: string | null;
  email: string;
  id: string;
  is_away: boolean;
  name: string | null;
  phone: string | null;
  type: string | null;
  workplaces: string[] | null;
};

export type Workplaces = {
  channels: string[] | null
  created_at: string
  id: string
  image: string | null
  invite_code: string | null
  members: string[] | null
  name: string
  regulators: string[] | null
  slug: string
  super_admin: string
};
