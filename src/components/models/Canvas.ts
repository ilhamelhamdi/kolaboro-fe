export interface Canvas {
  address: string;
  background: string;
  createdAt: string;
  id: number;
  namespace: string;
  owner: Owner;
  title: string;
  updatedAt: string;
}

export interface Owner {
  id: number;
  username: string;
  displayName: string;
}