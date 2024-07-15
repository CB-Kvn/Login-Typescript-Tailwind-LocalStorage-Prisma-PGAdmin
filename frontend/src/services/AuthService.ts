import axios, { AxiosResponse } from "axios";
import { AuthService } from "../Interfaces/services.interfaces"; // Importación de la interfaz AuthService

// Implementación de la interfaz AuthService
export class ApiAuthService implements AuthService {
  
  // Método de login que devuelve una promesa con un token
  async login(email: string, password: string): Promise<string> {
    // Realizar una solicitud POST a la API de autenticación
    const response: AxiosResponse<{ token: string }> = await axios.post(
      'http://localhost:5000/authentication/process/logIn', // URL del endpoint de login
      { email, password } // Datos que se envían en el cuerpo de la solicitud
    );
    
    // Devolver el token obtenido del cuerpo de la respuesta
    return response.data.token;
  }
}