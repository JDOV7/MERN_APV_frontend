import { BrowserRouter, Routes, Route } from "react-router-dom";

import AuthLayout from "./layout/AuthLayout";
import RutaProtegida from "./layout/RutaProtegida";

import Login from "./paginas/Login";
import Registrar from "./paginas/Registrar";
import OlvidePassword from "./paginas/OlvidePassword";
import ConfirmarCuenta from "./paginas/ConfirmarCuenta";
import NuevoPassword from "./paginas/NuevoPassword";
import AdministrarPacientes from "./paginas/AdministrarPacientes";
import EditarPerfil from "./paginas/EditarPerfil";
import CambiarPassword from "./paginas/CambiarPassword";

import { AuthProvider } from "./context/AuthProvider";
import { PacientesProvider } from "./context/PacientesProvider";
function App() {
  // console.log(import.meta.env.VITE_BACKEND_URL);
  // console.log(import.meta.env.IMAGENES_URL);
  return (
    <BrowserRouter>
      <AuthProvider>
        <PacientesProvider>
          <Routes>
            //Area publica
            <Route path="/" element={<AuthLayout />}>
              <Route index element={<Login></Login>} />
              <Route path="registrar" element={<Registrar></Registrar>}></Route>
              <Route
                path="olvide-password"
                element={<OlvidePassword></OlvidePassword>}
              ></Route>
              <Route
                path="olvide-password/:token"
                element={<NuevoPassword></NuevoPassword>}
              ></Route>
              <Route
                path="confirmar/:id"
                element={<ConfirmarCuenta></ConfirmarCuenta>}
              ></Route>
            </Route>
            //Area privada
            <Route path="/admin" element={<RutaProtegida></RutaProtegida>}>
              <Route
                index
                element={<AdministrarPacientes></AdministrarPacientes>}
              ></Route>
              <Route
                path="perfil"
                element={<EditarPerfil></EditarPerfil>}
              ></Route>
              <Route
                path="cambiar-password"
                element={<CambiarPassword></CambiarPassword>}
              ></Route>
            </Route>
          </Routes>
        </PacientesProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
