import React from "react";

import "../style/style.css";
import getImageUrl from "../utils/imageGetter";

function PromoCard({ name }) {
  return (
    <img src={getImageUrl(name, "webp")} alt={name} className="w-full h-full" />
  );
}

export default PromoCard;
