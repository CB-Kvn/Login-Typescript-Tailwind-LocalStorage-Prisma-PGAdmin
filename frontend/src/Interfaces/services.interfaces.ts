
export interface AuthService {
  login(email: string, password: string): Promise<string>;
}

export interface AuthContextType {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
}