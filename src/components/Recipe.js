import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import ErrorPage from './ErrorPage';
import data from '../recipes.js';

const Recipe = () => {
  const [bigFontMode, setBigFontMode] = useState(false);
  let { path } = useParams();
  const recipe = data.find(item => item.path === path);

  if (!recipe) return (
    <ErrorPage>
      <h1>Ajdå! 😕</h1>
      <h3>Receptet kan ej hittas...</h3>
    </ErrorPage>
  );

  const handleBigFontMode = () => {
    setBigFontMode(!bigFontMode);
  }

  return (
    <div className={`recipe ${bigFontMode ? 'bigfont-mode' : ''}`}>
      <h1>{recipe.title}</h1>

      {
        (recipe.noOfPortions || recipe.source) && (
          <div className="recipe-meta">
            {recipe.noOfPortions && (
              <p>{recipe.noOfPortions} portioner</p>
            )}

            {(recipe.noOfPortions && recipe.source) && (
              <span className="recipe-meta-separator">|</span>
            )}

            {recipe.source && (
              <a href={recipe.source}>Länk till original</a>
            )}
          </div>
        )
      }

      <div className="recipe-sections">
        <div className="recipe-ingredients">
          <h2>Ingredienser</h2>
          <ul>
            {recipe.ingredients.map(ingredient => (
              <li key={ingredient}>{ingredient}</li>
            ))}
          </ul>
        </div>

        <div className="recipe-steps">
          <h2>Tillagning</h2>
          <ul>
            {recipe.steps.map((step, index) => (
              <li key={step} className="step-row">
                <input className="checkbox" id={`recipe-step-checkbox-${index}`} type="checkbox" value="value1" />
                <label htmlFor={`recipe-step-checkbox-${index}`}>{step}</label>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <button
        onClick={handleBigFontMode}
        className="button toggle-bigfont-mode floating-button floating-button--round"
      />
    </div>
  );
}

export default Recipe;
