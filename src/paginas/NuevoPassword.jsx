import React from "react";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/axios";
const NuevoPassword = () => {
  const [password, setPassword] = useState("");
  const [alerta, setAlerta] = useState({});
  const [tokenValido, setTokenValido] = useState(false);
  const [passwordModificado, setPsswordModificado] = useState(false);

  const params = useParams();
  console.log(params);
  const { token } = params;
  useEffect(() => {
    const comprobarToken = async () => {
      try {
        await clienteAxios.get(`/veterinarios/olvide-password/${token}`);
        setAlerta({ msg: "Coloca tu Nuevo Password" });
        setTokenValido(true);
      } catch (error) {
        // console.log(er);
        setAlerta({ msg: "Hubo un error con el enlace", error: true });
      }
    };
    comprobarToken();
  }, []);
  const { msg } = alerta;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password.length < 6) {
      // console.log('entramos?');
      setAlerta({
        msg: "El Password debe ser minimo de 6 caracteres",
        error: true,
      });
      return;
    }
    try {
      const url = `/veterinarios/olvide-password/${token}`;
      const { data } = await clienteAxios.post(url, {
        password,
      });
      // console.log(data);
      setAlerta({
        msg: data.msg,
      });
      setPsswordModificado(true);
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true,
      });
    }
  };

  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-6xl">
          Restablece tu Password y no Pierdas Acesso a tus{" "}
          <span className="text-black">Pacientes</span>
        </h1>
      </div>
      <div className="mt-20 md:mt-5 shadow-2xl px-5 py-10 rounded-s-xl bg-white">
        {msg && <Alerta alerta={alerta}></Alerta>}
        {tokenValido && (
          <>
            <form onSubmit={handleSubmit}>
              <div className="my-5">
                <label className="uppercase text-gray-600 block text-xl font-bold">
                  Nuevo Password
                </label>
                <input
                  type="password"
                  className="border w-full p-3 mt-6 bg-gray-50 rounded-xl"
                  placeholder="Tu Nuevo Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <input
                type="submit"
                value="Guardar Nuevo password"
                className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-900 md:w-auto "
              />
            </form>
          </>
        )}
        {passwordModificado && (
          <Link to="/" className="block text-center my-5 text-gray-500">
            Inicia Sesion
          </Link>
        )}
      </div>
    </>
  );
};

export default NuevoPassword;
