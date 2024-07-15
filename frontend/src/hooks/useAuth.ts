import { useContext } from "react";
import { AuthContextType } from "../Interfaces/services.interfaces"; // Importación del tipo de contexto de autenticación
import { AuthContext } from "../contexts/AuthContext"; // Importación del contexto de autenticación

// Hook personalizado useAuth que devuelve el contexto de autenticación
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext); // Obtiene el contexto de autenticación mediante useContext

  // Verifica si el contexto es nulo (no se está usando dentro de AuthProvider)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  // Devuelve el contexto de autenticación
  return context;
};