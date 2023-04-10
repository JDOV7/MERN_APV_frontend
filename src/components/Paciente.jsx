import React from "react";
import usePacientes from "../hooks/usePacientes";

const Paciente = ({ paciente }) => {
  const { email, fecha, nombre, propietario, sintomas, _id } = paciente;
  const { setEdicion, eliminarPaciente } = usePacientes();
  //   console.log(fecha);
  //   console.log(paciente);

  const formatearFecha = (fecha) => {
    const nuevaFecha = new Date(fecha);
    return Intl.DateTimeFormat("es-MX", { dateStyle: "long" }).format(
      nuevaFecha
    );
  };
  //   console.log(fecha);
  return (
    <div className="mx-5 my-10 bg-white shadow-2xl px-5 py-10 rounded-xl">
      <p className="font-bold uppercase text-indigo-700 my-2">
        Nombre:{" "}
        <span className="font-normal normal-case text-black">{nombre}</span>
      </p>
      <p className="font-bold uppercase text-indigo-700 my-2">
        Propietario:{" "}
        <span className="font-normal normal-case text-black">
          {propietario}
        </span>
      </p>
      <p className="font-bold uppercase text-indigo-700 my-2">
        Email:{" "}
        <span className="font-normal normal-case text-black">{email}</span>
      </p>
      <p className="font-bold uppercase text-indigo-700 my-2">
        Fecha Alta:{" "}
        <span className="font-normal normal-case text-black">
          {formatearFecha(fecha)}
        </span>
      </p>
      <p className="font-bold uppercase text-indigo-700 my-2">
        Sintomas:{" "}
        <span className="font-normal normal-case text-black">{sintomas}</span>
      </p>

      <div className="flex justify-between  my-5">
        <button
          type="button"
          className="py-2 px-10 bg-in bg-indigo-600 hover:bg-indigo-800 text-white uppercase font-bold rounded-lg"
          onClick={() => setEdicion(paciente)}
        >
          Editar
        </button>
        <button
          type="button"
          className="py-2 px-10 bg-in bg-red-600 hover:bg-red-800 text-white uppercase font-bold rounded-lg"
          onClick={() => eliminarPaciente(_id)}
        >
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default Paciente;
