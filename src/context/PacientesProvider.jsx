import { createContext, useState, useEffect } from "react";
import clienteAxios from "../config/axios";
import useAuth from "../hooks/useAuth";
const PacientesContext = createContext();

const PacientesProvider = ({ children }) => {
  const [pacientes, setPacientes] = useState([]);
  const [paciente, setPaciente] = useState({});
  const { auth } = useAuth();

  useEffect(() => {
    const obtenerPacientes = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setPacientes([]);
          return;
        }
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        const { data } = await clienteAxios.get("/pacientes", config);
        setPacientes(data);
      } catch (error) {
        console.log(error);
        setPacientes([]);
      }
    };
    obtenerPacientes();
  }, [auth]);

  const guardarPaciente = async (paciente = {}) => {
    console.log(paciente);
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    if (paciente.id) {
      try {
        const { data } = await clienteAxios.put(
          `/pacientes/${paciente.id}`,
          paciente,
          config
        );
        const { createdAt, updatedAt, __v, ...pacienteAlmacenado } = data;
        // console.log(data);
        const pacientesActualizado = pacientes.map((pacienteState) =>
          pacienteState._id === data._id ? data : pacienteState
        );

        setPacientes(pacientesActualizado);
      } catch (error) {
        console.log(error.response.data.msg);
      }
    } else {
      try {
        const { data } = await clienteAxios.post(
          "/pacientes",
          paciente,
          config
        );
        const { createdAt, updatedAt, __v, ...pacienteAlmacenado } = data;
        console.log(pacienteAlmacenado);
        setPacientes([pacienteAlmacenado, ...pacientes]);
      } catch (error) {
        console.log(error.response.data.msg);
        setPacientes([]);
      }
    }
  };

  const setEdicion = (paciente) => {
    console.log("editando", paciente);
    setPaciente(paciente);
  };

  const eliminarPaciente = async (id) => {
    // console.log(id);
    const confirmar = confirm("¿Confirmas que deseas eliminar?");
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    console.log(confirmar);
    if (confirmar) {
      try {
        const { data } = await clienteAxios.delete(`/pacientes/${id}`, config);
        // console.log(data);
        const pacientesActualizado = pacientes.filter(
          (pacientesState) => pacientesState._id !== id
        );
        setPacientes(pacientesActualizado);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <PacientesContext.Provider
      value={{
        pacientes,
        guardarPaciente,
        setEdicion,
        paciente,
        eliminarPaciente,
      }}
    >
      {children}
    </PacientesContext.Provider>
  );
};

export { PacientesProvider };

export default PacientesContext;
