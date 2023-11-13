import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useParams } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const Productos = () => {
  const { article } = useParams();

  const [productos, setProductos] = useState([]);
  const [producto, setBusqueda] = useState(article || "");

  const navigate = useNavigate();

  const cargarDetalles = (id) => {
    navigate(`/item/${id}`);
  };

  const cargarProductos = () => {
    navigate(`/items/search/${producto}`);

    fetch(
      `https://back-examen-9e91722ba0f0.herokuapp.com/api/items/search=${producto}`
    )
      .then((res) => res.json())
      .then((data) => {
        setProductos(data["items"]);
      });
  };

  useEffect(() => {
    fetch(
      `https://back-examen-9e91722ba0f0.herokuapp.com/api/items/search=${producto}`
    )
      .then((res) => res.json())
      .then((data) => {
        setProductos(data["items"]);
      });
  }, [article]);

  useEffect(() => {
    cargarProductos();
  }, [producto]);

  return (
    <>
      <div className="d-flex align-items-center">
        <img
          src="../../images/bolsaCompra.png "
          className="img-fluid"
          alt="logo"
          style={{
            width: "4rem",
            height: "4rem",
          }}
        />

        <div className="mx-auto">
          <div className="form-floating mb-3 mt-4 flex-grow-1">
            <input
              type="text"
              className="form-control"
              onChange={(e) => {
                setBusqueda(e.target.value);
                cargarProductos();
              }}
            />
            <label htmlFor="floatingInput">Buscar Articulo</label>
          </div>

          <label htmlFor="">
            Resultados de la busqueda de {producto}: {productos.length}
          </label>
        </div>
      </div>

      {productos == [] ? (
        <h1>No hay productos</h1>
      ) : (
        productos.map((producto) => {
          return (
            <div
              className="card mb-4 mx-4 mt-3"
              key={producto.id}
              onClick={() => {
                cargarDetalles(producto.id);
              }}
            >
              <div className="row g-0">
                <div className="col-md-4">
                  <img
                    src={producto.images[0]}
                    className="img-fluid rounded-start"
                    alt="..."
                  />
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center">
                      <h5 className="card-title mb-0">{producto.title}</h5>
                      <p className="card-text mb-0">{producto.category}</p>
                    </div>
                    <p className="card-text mt-3">{producto.description}</p>
                    <div className="d-flex justify-content-between align-items-center">
                      <small className="text-muted">{producto.price} €</small>
                      <div className="d-flex">
                        {[...Array(5)].map((star, i) => {
                          const ratingValue = i + 1;
                          return (
                            <label key={i}>
                              <FontAwesomeIcon
                                icon={faStar}
                                className={
                                  ratingValue <= Math.round(producto.rating)
                                    ? "text-warning"
                                    : ""
                                }
                              />
                            </label>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })
      )}
    </>
  );
};

export default Productos;
