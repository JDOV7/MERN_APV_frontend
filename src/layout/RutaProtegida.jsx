import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Header from "../components/Header";
import Footer from "../components/Footer";

const RutaProtegida = () => {
  const { auth, cargando } = useAuth();
  // console.log(auth);
  // console.log(cargando);
  if (cargando) {
    return "cargando";
  }
  return (
    <>
      <Header></Header>
      {auth?._id ? (
        <main className="container mx-auto mt-10">
          <Outlet></Outlet>
        </main>
      ) : (
        <Navigate to="/"></Navigate>
      )}
      <Footer></Footer>
    </>
  );
};

export default RutaProtegida;
