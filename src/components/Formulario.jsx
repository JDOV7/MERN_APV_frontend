import React from "react";
import { useState, useEffect } from "react";
import Alerta from "./Alerta";
import usePacientes from "../hooks/usePacientes";

const Formulario = () => {
  //   const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [nombre, setNombre] = useState("");
  const [propietario, setPropietario] = useState("");
  const [email, setEmail] = useState("");
  const [fecha, setFecha] = useState("");
  const [sintomas, setSintomas] = useState("");
  const [id, setId] = useState(null);

  const [alerta, setAlerta] = useState({});

  const { pacientes, guardarPaciente, paciente } = usePacientes();
  // console.log(paciente);

  useEffect(() => {
    // console.log("render o cambio paciente");
    if (paciente?.nombre) {
      setNombre(paciente.nombre);
      setPropietario(paciente.propietario);
      setEmail(paciente.email);
      setFecha(paciente.fecha);
      setSintomas(paciente.sintomas);
      setId(paciente._id);
    }
  }, [paciente]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    //validar el formulario
    if ([nombre, propietario, email, fecha, sintomas].includes("")) {
      setAlerta({ msg: "Todos los campos son obligatorios", error: true });
      return;
    }
    setAlerta({});
    await guardarPaciente({ nombre, propietario, email, fecha, sintomas, id });
    setAlerta({ msg: "Guardado Correctamente" });
    setNombre("");
    setPropietario("");
    setEmail("");
    setFecha("");
    setSintomas("");
  };

  const { msg } = alerta;

  return (
    <>
      <h2 className="font-black text-3xl text-center">
        Administrador de Pacientes
      </h2>
      <p className="text-xl mt-5 mb-10 text-center">
        Añade tus pacientes y{" "}
        <span className="text-indigo-600 font-bold">Administralos</span>{" "}
      </p>
      <form
        className="bg-white py-10 px-5 mb-10 lg:mb-5 shadow-2xl rounded-lg"
        onSubmit={handleSubmit}
      >
        <div className="mb-5">
          <label
            htmlFor="mascota"
            className="text-gray-700 uppercase font-bold"
          >
            Nombre Mascota
          </label>
          <input
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            type="text"
            id="mascota"
            placeholder="Nombre de la Mascota"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md "
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="propietario"
            className="text-gray-700 uppercase font-bold"
          >
            Nombre Propietario
          </label>
          <input
            value={propietario}
            onChange={(e) => setPropietario(e.target.value)}
            type="text"
            id="propietario"
            placeholder="Nombre del Propietario"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md "
          />
        </div>
        <div className="mb-5">
          <label htmlFor="email" className="text-gray-700 uppercase font-bold">
            Email Propietario
          </label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            id="email"
            placeholder="Email del Propietario"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md "
          />
        </div>
        <div className="mb-5">
          <label htmlFor="fecha" className="text-gray-700 uppercase font-bold">
            Fecha Alta
          </label>
          <input
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            type="date"
            id="fecha"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md "
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="sintomas"
            className="text-gray-700 uppercase font-bold"
          >
            Sintomas
          </label>
          <textarea
            value={sintomas}
            onChange={(e) => setSintomas(e.target.value)}
            id="sintomas"
            placeholder="Describe los Sintomas"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md "
          />
        </div>
        <input
          type="submit"
          value={id ? "Guardar Cambios" : "Agregar Paciente"}
          className="bg-indigo-600 w-full p-3 text-white uppercase font-bold rounded-md hover:bg-indigo-900 cursor-pointer transition-colors"
        />
      </form>
      {msg && <Alerta alerta={alerta}></Alerta>}
    </>
  );
};

export default Formulario;
