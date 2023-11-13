import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useParams } from "react-router-dom";

// eslint-disable-next-line react/prop-types
function ProductoDetalle() {
  const { id } = useParams();

  const [detailProduct, setDetailProduct] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [article, setBusqueda] = useState();
  const [timerId, setTimerId] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://back-examen-9e91722ba0f0.herokuapp.com/api/item/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setDetailProduct(data["item"]);
      });
  }, [id]);

  if (!detailProduct) {
    return <h1>Cargando...</h1>;
  }

  const handleInputChange = (e) => {
    clearTimeout(timerId);
    const newArticle = e.target.value;
    setBusqueda(newArticle);

    setTimerId(
      setTimeout(() => {
        navigate(`/items/search/${newArticle}`);
      }, 500)
    ); // 500ms delay
  };

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
              onChange={handleInputChange}
            />
            <label htmlFor="floatingInput">Buscar Articulo</label>
          </div>
        </div>
      </div>

      <div className="card mb-4 mx-4" style={{ backgroundColor: "lightgray" }}>
        <div className="row g-0">
          <div className="col-md-4">
            <Slider
              dots={true}
              infinite={true}
              speed={500}
              slidesToShow={1}
              slidesToScroll={1}
            >
              {detailProduct[0].images.map((image, index) => (
                <div key={index}>
                  <img src={image} className="img-fluid" alt="..." />
                </div>
              ))}
            </Slider>
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="card-title mb-0">{detailProduct[0].title}</h5>
                <p className="card-text mb-0">{detailProduct[0].category}</p>
              </div>
              <p className="card-text mt-3">{detailProduct[0].description}</p>
              <div className="d-flex justify-content-between align-items-center">
                <small className="text-muted">{detailProduct[0].price} €</small>
                <div className="d-flex">
                  {[...Array(5)].map((star, i) => {
                    const ratingValue = i + 1;
                    return (
                      <label key={i}>
                        <FontAwesomeIcon
                          icon={faStar}
                          className={
                            ratingValue <= Math.round(detailProduct[0].rating)
                              ? "text-warning"
                              : ""
                          }
                        />
                      </label>
                    );
                  })}
                </div>
              </div>
              <div className="d-flex justify-content-center mt-auto">
                <button className="btn btn-primary">Comprar</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductoDetalle;
