import React, { useState, useEffect } from "react";
import axios from "axios";
import FileUpload from "./FileUpload";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [photos, setPhotos] = useState([]);
  console.log(photos);
  useEffect(() => {
    const getProducts = async () => {
      let res = await axios.get("/api/product/products");
      setProducts(res.data);
    };
    getProducts();
  }, []);

  const getPhotos = photos => {
    setPhotos(photos);
  };
  return (
    <div>
      <div>
        {products.length
          ? products.map((product, i) => (
              <div
                key={i}
                className="w-75 d-flex mx-auto mt-5 align-items-center p-3 justify-content-around"
                style={{ border: "1px solid red" }}
              >
                <div className="w-75" style={{ border: "1px solid red" }}>
                  {photos.length > 0 ? (
                    <img src={`/${photos[0].path}`} />
                  ) : null}
                  <FileUpload product_id={product._id} getPhotos={getPhotos} />
                </div>
                <div>
                  <p>{product.name}</p>
                </div>
              </div>
            ))
          : "Loading..."}
      </div>
    </div>
  );
};

export default Products;
