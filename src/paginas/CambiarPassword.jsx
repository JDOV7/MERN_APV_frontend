import { useState } from "react";
import React from "react";
import AdminNav from "./AdminNav";
import Alerta from "../components/Alerta";
import useAuth from "../hooks/useAuth";

const CambiarPassword = () => {
  const [alerta, setAlerta] = useState({});
  const [password, setPassword] = useState({
    pwd_actual: "",
    pwd_nuevo: "",
  });

  const { guardarPassword } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("editar pass");
    // console.log(Object.values(password).some((campo) => campo === ""));
    if (Object.values(password).some((campo) => campo === "")) {
      setAlerta({ msg: "todos los campos son obligatorios", error: true });
      return;
    }

    if (password.pwd_nuevo.length < 6) {
      setAlerta({ msg: "password minimo de 6 caracteres", error: true });
      return;
    }

    const respuesta = await guardarPassword(password);
    setAlerta(respuesta);
  };
  const { msg } = alerta;
  return (
    <>
      <AdminNav></AdminNav>
      <h2 className="font-black text-3xl text-center mt-10">
        Cambiar Password
      </h2>
      <p className="text-xl mt-5 mb-10 text-center">
        Modifica tu{" "}
        <span className="text-indigo-600 font-bold">Password aqui</span>
      </p>

      <div className="flex justify-center ">
        <div className="w-full md:w-1/2 bg-white shadow-2xl rounded-xl p-5">
          <form onSubmit={handleSubmit} className="p-10">
            <div className="my-3">
              <label htmlFor="" className="uppercase font-bold text-gray-600 ">
                Password Actual
              </label>
              <input
                type="password"
                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                placeholder="Escribi tu password actual"
                name="pwd_actual"
                // value={perfil.nombre || ""}
                onChange={(e) =>
                  setPassword({ ...password, [e.target.name]: e.target.value })
                }
              />
            </div>
            <div className="my-3">
              <label htmlFor="" className="uppercase font-bold text-gray-600 ">
                Password Nuevo
              </label>
              <input
                type="password"
                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                placeholder="Escribi tu nuevo password"
                name="pwd_nuevo"
                // value={perfil.nombre || ""}
                onChange={(e) =>
                  setPassword({ ...password, [e.target.name]: e.target.value })
                }
              />
            </div>
            <input
              type="submit"
              value="Actualizar Password"
              className="bg-indigo-700 px-10 py-3 font-bold text-white rounded-lg uppercase w-full mt-5"
            />
          </form>
          {msg && <Alerta alerta={alerta}></Alerta>}
        </div>
      </div>
    </>
  );
};

export default CambiarPassword;
