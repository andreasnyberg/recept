import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import { useParams } from 'react-router-dom';
import ErrorPage from './ErrorPage';
import LoadingSpinner from './LoadingSpinner';

const RECIPE_QUERY = gql`
  query recipeQuery($pathTitle: String!)
  {
    recipe(pathTitle: $pathTitle) {
      id
      title
      source
      noOfPortions
      pathTitle
      ingredients {
        id
        name
      }
      steps {
        id
        name
      }
    }
  }
`;

const Recipe = () => {
  const [bigFontMode, setBigFontMode] = useState(false);
  let { pathTitle } = useParams();
  const { loading, error, data } = useQuery(RECIPE_QUERY, {
    variables: { pathTitle: pathTitle },
  });

  if (loading) return <LoadingSpinner />;
  if (error) return (
    <ErrorPage>
      <h1>Ajdå! 😕</h1>
      <h3>Error:</h3>
      <p>{error.message}</p>
    </ErrorPage>
  );

  const { recipe } = data;

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
            {recipe.ingredients.map(item => (
              <li key={item.id}>{item.name}</li>
            ))}
          </ul>
        </div>

        <div className="recipe-steps">
          <h2>Tillagning</h2>
          <ul>
            {recipe.steps.map(item => (
              <li key={item.id} className="step-row">
                <input className="checkbox" id={`recipe-step-checkbox-${item.id}`} type="checkbox" value="value1" />
                <label htmlFor={`recipe-step-checkbox-${item.id}`}>{item.name}</label>
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
