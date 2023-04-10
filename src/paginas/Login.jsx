import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/axios";

const Login = () => {
  const { setAuth } = useAuth();
  // console.log(auth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alerta, setAlerta] = useState({});

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("iniciando secion");
    if ([email, password].includes("")) {
      setAlerta({ msg: "Todos los campos son obligatorios", error: true });
      return;
    }

    try {
      const { data } = await clienteAxios.post("/veterinarios/login", {
        email,
        password,
      });
      console.log(data);
      localStorage.setItem("token", data.token);
      setAuth(data);
      console.log(data);
      navigate("/admin");
    } catch (error) {
      setAlerta({ msg: error.response.data.msg, error: true });
    }
  };

  const { msg } = alerta;
  return (
    <>
      {/* <h2>Login</h2> */}
      <div>
        <h1 className="text-indigo-600 font-black text-6xl">
          Inicia Sesion y Administra tus{" "}
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
          <input
            type="submit"
            value="Iniciar Sesion"
            className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-900 md:w-auto "
          />
        </form>
        <nav className="mt-10 lg:flex lg:justify-between">
          <Link
            to="/registrar"
            className="block text-center my-5 text-gray-500"
          >
            ¿No tienes una cuenta? Registrate
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

export default Login;
