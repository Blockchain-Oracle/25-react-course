import React from "react";
import useDebounceAPI from "./hooks/useDebounceAPI";
import "./DebounceAPI.css";

export default function DebounceAPI() {
  const [search, setSearch] = React.useState("");

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const { fetchRecipe, recipes, isLoading } = useDebounceAPI({
    params: search,
  });

  React.useEffect(() => {
    fetchRecipe();
  }, [fetchRecipe]);

  console.log(recipes);

  return (
    <div className="debounce-container">
      <input
        type="text"
        onChange={handleChange}
        value={search}
        className="search-input"
        placeholder="Search recipes..."
      />
      {isLoading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="recipe-list">
          {recipes?.length > 0 ? (
            <>
              {recipes.map((recipe) => (
                <div className="recipe-card" key={recipe.id}>
                  <h3 className="recipe-name">{recipe.name}</h3>
                  <img
                    src={recipe.image}
                    alt={recipe.name}
                    className="recipe-image"
                  />
                  <p className="recipe-cuisine">Cuisine: {recipe.cuisine}</p>
                  <p className="recipe-difficulty">
                    Difficulty: {recipe.difficulty}
                  </p>
                  <p className="recipe-prep-time">
                    Prep Time: {recipe.prepTimeMinutes} minutes
                  </p>
                  <p className="recipe-cook-time">
                    Cook Time: {recipe.cookTimeMinutes} minutes
                  </p>
                  <p className="recipe-servings">Servings: {recipe.servings}</p>
                  <p className="recipe-calories">
                    Calories per Serving: {recipe.caloriesPerServing}
                  </p>
                  <div className="recipe-rating">
                    <span>Rating: {recipe.rating.toFixed(1)}</span>
                    <span>({recipe.reviewCount} reviews)</span>
                  </div>
                  <div className="recipe-tags">
                    {recipe.tags.map((tag, index) => (
                      <span key={index} className="recipe-tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </>
          ) : (
            <h3 className="no-results">No recipes found</h3>
          )}
        </div>
      )}
    </div>
  );
}
