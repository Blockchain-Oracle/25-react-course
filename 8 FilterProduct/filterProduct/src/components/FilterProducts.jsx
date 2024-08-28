import { useEffect, useMemo, useState, useCallback } from "react";
import "./filterProducts.css";
import useFetchProducts from "../hooks/useFetchProducts";

export default function FilterProducts() {
  const { loading, products, fetchingProducts } = useFetchProducts();
  const url = useMemo(() => "https://fakestoreapi.com/products", []);
  const [currentSelectedCategory, setCurrentSelectedCategory] = useState(null);
  const [filterItems, setFilterItems] = useState([]);

  //this creates a set of unique categories
  const uniqueCategories = useMemo(() => {
    return [...new Set(products?.map((product) => product.category))];
  }, [products]);

  //this is to fetch the products
  useEffect(() => {
    fetchingProducts(url);
  }, [fetchingProducts, url]);

  //this is to filter the products based on click on category
  useEffect(() => {
    if (currentSelectedCategory) {
      setFilterItems(
        products.filter(
          (product) =>
            product.category.toLowerCase() ===
            currentSelectedCategory.toLowerCase()
        )
      );
    } else {
      setFilterItems(products);
    }
  }, [currentSelectedCategory, products]);

  const handleCategoryClick = useCallback(
    (category) => {
      setCurrentSelectedCategory(
        currentSelectedCategory === category ? null : category
      );
    },
    [currentSelectedCategory]
  );

  //this is to display header button
  const categoryHeaderButton = useMemo(() => {
    return (
      <>
        <button
          key="all"
          onClick={() => handleCategoryClick(null)}
          className={`filter-products-category ${
            !currentSelectedCategory ? "active" : ""
          }`}
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
  }, [currentSelectedCategory, uniqueCategories, handleCategoryClick]);

  //this is to display the products
  const productList = useMemo(() => {
    return (
      <ul className="filter-products-list">
        {filterItems?.map((product) => (
          <li key={product.id} className="filter-products-item">
            <p>{product.title}</p>
            <img
              src={product.image}
              alt={product.title}
              style={{
                maxWidth: "100%",
                height: "150px",
                objectFit: "contain",
                marginBottom: "10px",
              }}
            />
            <button onClick={() => handleCategoryClick(product.category)}>
              {product.category}
            </button>
          </li>
        ))}
      </ul>
    );
  }, [filterItems, handleCategoryClick]);

  return (
    <div className="app-container">
      <div className="filter-products-container">
        <div className="filter-products-header">
          <h1>Filter Products By Category</h1>
        </div>
        <div className="filter-products-body">
          {loading || products.length <= 0 ? (
            <div className="loading-spinner">
              <div className="spinner"></div>
              <p>Loading products...</p>
            </div>
          ) : (
            <>
              <div className="filter-products-categories">
                <h2>Categories</h2>
                {categoryHeaderButton}
              </div>
              <div className="filter-products-list">{productList}</div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
