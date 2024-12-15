export interface User {
  id: number;
  email: string;
  username: string;
  display_name: string;
  // avatar: string;
  registered_at: string;
  modified_at: string;
}

export interface AuthContextInterface {
  user: User
  setUser: (user: User) => void
  isAuthenticated: boolean
  setIsAuthenticated: (isAuthenticated: boolean) => void
  getAccessToken: () => string
  setAccessToken: (accessToken: string) => void
  logout: () => void
}

export interface AuthContextProviderProps {
  children: React.ReactNode
}