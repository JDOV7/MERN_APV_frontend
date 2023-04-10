import React, { useEffect, useState } from "react";
import AdminNav from "./AdminNav";
import useAuth from "../hooks/useAuth";
import Alerta from "../components/Alerta";

const EditarPerfil = () => {
  const { auth, actualizarPerfil } = useAuth();
  const [perfil, setPerfil] = useState({});
  const [alerta, setAlerta] = useState({});

  useEffect(() => {
    setPerfil(auth);
  }, [auth]);
  //   console.log(perfil);
  //   console.log(auth);
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("enviamos?");
    const { nombre, email } = perfil;
    console.log(perfil);
    console.log(perfil.nombre);
    if ([nombre, email].includes("")) {
      console.log("error");
      setAlerta({ msg: "Nombre e Email Requeridos", error: true });
      return;
    }
    const resultado = await actualizarPerfil(perfil);
    setAlerta(resultado);
  };
  const { msg } = alerta;
  return (
    <>
      <AdminNav></AdminNav>
      <h2 className="font-black text-3xl text-center mt-10">Editar Perfil</h2>
      <p className="text-xl mt-5 mb-10 text-center">
        Modifica tu{" "}
        <span className="text-indigo-600 font-bold">Informacion aqui</span>
      </p>
      <div className="flex justify-center ">
        <div className="w-full md:w-1/2 bg-white shadow-2xl rounded-xl p-5">
          <form onSubmit={handleSubmit} className="p-10">
            <div className="my-3">
              <label htmlFor="" className="uppercase font-bold text-gray-600 ">
                Nombre
              </label>
              <input
                type="text"
                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                name="nombre"
                value={perfil.nombre || ""}
                onChange={(e) =>
                  setPerfil({
                    ...perfil,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            </div>
            <div className="my-3">
              <label htmlFor="" className="uppercase font-bold text-gray-600 ">
                Sitio web
              </label>
              <input
                type="text"
                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                name="web"
                value={perfil.web || ""}
                onChange={(e) =>
                  setPerfil({
                    ...perfil,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            </div>
            <div className="my-3">
              <label htmlFor="" className="uppercase font-bold text-gray-600 ">
                Telefono
              </label>
              <input
                type="text"
                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                name="telefono"
                value={perfil.telefono || ""}
                onChange={(e) =>
                  setPerfil({
                    ...perfil,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            </div>
            <div className="my-3">
              <label htmlFor="" className="uppercase font-bold text-gray-600 ">
                Email
              </label>
              <input
                type="text"
                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                name="email"
                value={perfil.email || ""}
                onChange={(e) =>
                  setPerfil({
                    ...perfil,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            </div>
            <input
              type="submit"
              value="Guardar Cambios"
              className="bg-indigo-700 px-10 py-3 font-bold text-white rounded-lg uppercase w-full mt-5"
            />
          </form>
          {msg && <Alerta alerta={alerta}></Alerta>}
        </div>
      </div>
    </>
  );
};

export default EditarPerfil;
