import { useCallback, useEffect, useMemo, useState } from "react";
import useFetchProductPractice from "../hooks/useFetchProductPractice";
import "./filterProductsPractice.css";

export default function FilterProductsPractice() {
  const [currentSelectedCategory, setCurrentSelectedCategory] = useState(null);
  const [filterProduct, setFilterProduct] = useState([]);
  const { fetching, loading, product } = useFetchProductPractice();
  const url = useMemo(() => "https://fakestoreapi.com/products", []);

  //note when using memo use must use return
  //this get all category in products
  const uniqueCategories = useMemo(() => {
    return [...new Set(product?.map((product) => product.category))];
  }, [product]);

  const handleCategoryClick = useCallback(
    (category) => {
      setCurrentSelectedCategory(
        currentSelectedCategory === category ? null : category
      );
    },
    [currentSelectedCategory]
  );

  useEffect(() => {
    currentSelectedCategory
      ? setFilterProduct(
          product.filter(
            (product) =>
              product.category?.toLowerCase() ===
              currentSelectedCategory.toLowerCase()
          )
        )
      : setFilterProduct(product);
  }, [product, currentSelectedCategory]);

  //fetching products
  useEffect(() => {
    fetching(url);
  }, [fetching, url]);

  const buttonHeaderCategory = useMemo(() => {
    return (
      <>
        <button
          className={`filter-products-category ${
            currentSelectedCategory === null ? "active" : ""
          }`}
          onClick={() => handleCategoryClick(null)}
        >
          All
        </button>
        {uniqueCategories?.map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryClick(category)}
            className={`filter-products-category ${
              currentSelectedCategory === category ? "active" : ""
            }`}
          >
            {category}
          </button>
        ))}
      </>
    );
  }, [currentSelectedCategory, handleCategoryClick, uniqueCategories]);

  const productlist = useMemo(() => {
    return (
      <ul className="filter-products-list">
        {filterProduct?.map((product) => (
          <li key={product.id} className="filter-products-item">
            <p className="filter-products-item-title">{product.title}</p>
            <img
              className="filter-products-item-image"
              src={product.image}
              alt={product.title}
            />
            <button
              className="filter-products-item-button"
              onClick={() => handleCategoryClick(product.category)}
            >
              {product.category}
            </button>
          </li>
        ))}
      </ul>
    );
  }, [filterProduct, handleCategoryClick]);

  return (
    <div className="filter-products-container">
      {loading ? (
        <div className="loading-spinner">
          <p>Loading... products</p>
          <div className="spinner"></div>
        </div>
      ) : (
        <>
          <div className="filter-products-header">
            <h1>Category</h1>
            <div className="filter-products-categories">
              {buttonHeaderCategory}
            </div>
          </div>
          <div className="filter-products-list-container">{productlist}</div>
        </>
      )}
    </div>
  );
}
