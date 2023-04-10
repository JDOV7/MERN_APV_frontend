import { useState, useEffect, createContext } from "react";
import clienteAxios from "../config/axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [cargando, setCargando] = useState(true);
  useEffect(() => {
    const autenticarUsuario = async () => {
      const token = localStorage.getItem("token");
      // console.log(token);
      if (!token) {
        setCargando(false);
        return;
      }
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      try {
        const { data } = await clienteAxios.get("/veterinarios/perfil", config);
        // console.log(data);
        setAuth(data);
      } catch (error) {
        setAuth({});
        console.log(error.response.data.msg);
      }
      setCargando(false);
      // console.log("si hay token");
    };
    autenticarUsuario();
  }, []);

  const cerrarSesion = () => {
    localStorage.removeItem("token");
    setAuth({});
  };

  const actualizarPerfil = async (datos) => {
    console.log(datos);
    const token = localStorage.getItem("token");
    // console.log(token);
    if (!token) {
      setCargando(false);
      return;
    }
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const url = `/veterinarios/perfil/${datos._id}`;
      const { data } = await clienteAxios.put(url, datos, config);
      return {
        msg: "Almacenado Correctamente",
      };
    } catch (error) {
      // console.log(error.response);
      return {
        msg: error.response.data.msg,
        error: true,
      };
    }
  };

  const guardarPassword = async (datos) => {
    console.log(datos);
    const token = localStorage.getItem("token");
    // console.log(token);
    if (!token) {
      setCargando(false);
      return;
    }
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const url = `/veterinarios/actualizar-password`;
      const { data } = await clienteAxios.put(url, datos, config);
      console.log(data);
      return {
        msg: data.msg,
      };
    } catch (error) {
      console.log(error.response.data.msg);
      return {
        msg: error.response.data.msg,
        error: true,
      };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        cargando,
        cerrarSesion,
        actualizarPerfil,
        guardarPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };

export default AuthContext;
