import React from "react";
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/axios";
const ConfirmarCuenta = () => {
  const [cuentaConfirmada, setCuentaConfirmada] = useState(false);
  const [cargando, setCargando] = useState(true);
  const [alerta, setAlerta] = useState({});
  const params = useParams();
  // console.log(params);
  const { id } = params;
  useEffect(() => {
    const confirmarCuenta = async () => {
      try {
        const url = `/veterinarios/confirmar/${id}`;
        const { data } = await clienteAxios.get(url);

        console.log(`datooooooooos: ${data.msg}`);
        setCuentaConfirmada(true);
        setAlerta({ msg: data.msg, error: false });
      } catch (e) {
        // console.log("Errrrooooooooor");
        setAlerta({ msg: e.response.data.msg, error: true });
      }
      setCargando(false);
    };
    confirmarCuenta();
  }, []);
  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-6xl">
          Confirma tu Cuenta y Comienza a Administrar tus{" "}
          <span className="text-black">Pacientes</span>
        </h1>
      </div>

      <div className="mt-20 md:mt-5 shadow-2xl px-5 py-10 rounded-s-xl bg-white">
        {!cargando && <Alerta alerta={alerta}></Alerta>}

        {cuentaConfirmada && (
          <Link to="/" className="block text-center my-5 text-gray-500">
            Iniciar Sesion
          </Link>
        )}
      </div>
    </>
  );
};

export default ConfirmarCuenta;
