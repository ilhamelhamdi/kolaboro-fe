export interface Canvas {
  address: string;
  background: string;
  created_at: string;
  id: number;
  namespace: string;
  owner: Owner;
  title: string;
  updated_at: string;
}

export interface Owner {
  id: number;
  username: string;
  displayName: string;
}