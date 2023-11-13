import React from "react";
import { useParams } from "react-router-dom";

const SobreNostros = () => {
  const { producto } = useParams();
  // Ahora puedes usar el valor de 'producto' en tu componente
  alert(producto);
};
export default SobreNostros;
