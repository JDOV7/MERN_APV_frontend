import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/axios";

const Registrar = () => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repetirPassword, setRepetirPassword] = useState("");

  const [alerta, setAlerta] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Enviando formulario");
    if ([nombre, email, password, repetirPassword].includes("")) {
      // console.log("hay campos vacios");
      setAlerta({ msg: "Hay Campos Vacios", error: true });
      return;
    }
    if (password !== repetirPassword) {
      setAlerta({ msg: "Los Password no son iguales", error: true });
      return;
    }
    if (password.length < 6) {
      setAlerta({
        msg: "El Password es muy corto, minimo 6 caracteres",
        error: true,
      });
      return;
    }
    setAlerta({});
    try {
      const url = `/veterinarios`;
      const respuesta = await clienteAxios.post(url, {
        nombre,
        email,
        password,
      });
      // console.log(respuesta);
      setAlerta({ msg: "Creado correctmanete, revisa tu email", error: false });
    } catch (error) {
      setAlerta({ msg: error.response.data.msg, error: true });
    }

    // console.log("despues del if");
  };

  const { msg } = alerta;
  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-6xl">
          Crea tu Cuenta y Administra tus{" "}
          <span className="text-black">Pacientes</span>
        </h1>
      </div>

      <div className="mt-20 md:mt-5 shadow-2xl px-5 py-10 rounded-s-xl bg-white">
        {msg && <Alerta alerta={alerta} />}

        <form onSubmit={handleSubmit}>
          <div className="my-5">
            <label className="uppercase text-gray-600 block text-xl font-bold">
              Email
            </label>
            <input
              type="email"
              className="border w-full p-3 mt-6 bg-gray-50 rounded-xl"
              placeholder="Email de Registro"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="my-5">
            <label className="uppercase text-gray-600 block text-xl font-bold">
              Nombre
            </label>
            <input
              type="text"
              className="border w-full p-3 mt-6 bg-gray-50 rounded-xl"
              placeholder="Tu Nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>
          <div className="my-5">
            <label className="uppercase text-gray-600 block text-xl font-bold">
              Password
            </label>
            <input
              type="password"
              className="border w-full p-3 mt-6 bg-gray-50 rounded-xl"
              placeholder="Tu Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="my-5">
            <label className="uppercase text-gray-600 block text-xl font-bold">
              Repetir Password
            </label>
            <input
              type="password"
              className="border w-full p-3 mt-6 bg-gray-50 rounded-xl"
              placeholder="Repite Tu Password"
              value={repetirPassword}
              onChange={(e) => setRepetirPassword(e.target.value)}
            />
          </div>
          <input
            type="submit"
            value="Crear Cuenta"
            className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-900 md:w-auto "
          />
        </form>
        <nav className="mt-10 lg:flex lg:justify-between">
          <Link to="/" className="block text-center my-5 text-gray-500">
            Ya tienes una cuenta? Inicia Sesion
          </Link>
          <Link
            to="/olvide-password"
            className="block text-center my-5 text-gray-500"
          >
            Olvide mi Password
          </Link>
        </nav>
      </div>
    </>
  );
};

export default Registrar;
