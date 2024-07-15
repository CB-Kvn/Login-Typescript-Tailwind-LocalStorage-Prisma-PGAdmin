import { createContext, ReactNode, useState } from "react";
import {
  AuthContextType,
  AuthService,
} from "../Interfaces/services.interfaces"; // Importación de tipos y interfaces necesarias
import { ApiAuthService } from "../services/AuthService"; // Importación del servicio de autenticación

// Creación del contexto de autenticación
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Componente AuthProvider que provee el contexto de autenticación a sus hijos
export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  // Estado local para controlar si el usuario está autenticado
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Instancia del servicio de autenticación
  const authService: AuthService = new ApiAuthService();

  // Función para manejar el inicio de sesión
  const login = async (email: string, password: string) => {
    try {
      // Llama al método login del servicio de autenticación para obtener el token
      const token = await authService.login(email, password);

      // Almacena el token en el localStorage para persistencia de la sesión
      localStorage.setItem("token", token);

      // Marca al usuario como autenticado
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Login failed", error);
      setIsAuthenticated(false);
    }
  };

  // Renderiza el proveedor de contexto AuthContext.Provider, pasando el valor del contexto
  return (
    <AuthContext.Provider value={{ isAuthenticated, login }}>
      {children} {/* Renderiza todos los hijos del proveedor */}
    </AuthContext.Provider>
  );
};