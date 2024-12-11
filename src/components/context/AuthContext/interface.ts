export interface AuthContextInterface {
  user: User
  setUser: React.Dispatch<React.SetStateAction<User>>
  isAuthenticated: boolean
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
  getUser: () => Promise<User | undefined>
}

export interface User {
  id: string
  email: string
  username: string
  displayName: string
  registeredAt: string
  modifiedAt: string
}