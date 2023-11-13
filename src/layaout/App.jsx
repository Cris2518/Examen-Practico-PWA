import { useState } from "react";
import Productos from "../components/Productos";
import { Route, Routes, useNavigate } from "react-router-dom";
import ProductoDetalle from "../components/ProductoDetalle";

const App = () => {
  const [producto, setProducto] = useState("");
  const navigate = useNavigate();

  //Funcion para redireccionar a la ruta /users
  const handleClick = () => {
    navigate(`/items/search/${producto}`);
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className="container d-flex flex-column justify-content-center align-items-center vh-100">
            <img
              className="img-fluid mx-auto d-block"
              src="../../images/bolsaCompra.png "
              alt="logo"
              style={{
                width: "6rem",
                height: "6rem",
              }}
            />

            <div className="d-flex flex-column align-items-center">
              <h1 className="mt-3">Bazar Online</h1>

              <div className="form-floating mb-3 mt-4 flex-grow-1">
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) => {
                    setProducto(e.target.value);
                  }}
                />
                <label htmlFor="floatingInput">Buscar Articulo</label>
              </div>

              <button className="btn btn-success mt-2" onClick={handleClick}>
                Buscar
              </button>
            </div>
          </div>
        }
      />
      <Route path="/items/search/:article" element={<Productos />} />
      <Route path="/items/search/" element={<Productos />} />
      <Route path="/item/:id" element={<ProductoDetalle />} />
    </Routes>
  );
};

export default App;
