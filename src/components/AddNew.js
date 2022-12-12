import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useMutation, gql } from '@apollo/client';
import { AUTH_TOKEN } from '../constants';
// import Categories from './Categories';


const CREATE_RECIPE_MUTATION = gql`
  mutation CreateRecipeMutation($input: RecipeInput) {
    createRecipe(input: $input) {
      pathTitle
    }
  }
`;

const AddNew = () => {
  const [newPath, setNewPath] = useState('');
  const [isCreated, setIsCreated] = useState(false);
  const [stepsValues, setStepsValues] = useState({ val: ['', ''] });
  const [selectedCategoryIds, setSelectedCategoryIds] = useState([]);
  const [formState, setFormState] = useState({
    title: '',
    source: '',
    noOfPortions: '',
    ingredients: '',
  });

  const authToken = localStorage.getItem(AUTH_TOKEN);
  const [createRecipe] = useMutation(CREATE_RECIPE_MUTATION, {
    variables: {
      input: {
        title: formState.title,
        source: formState.source,
        noOfPortions: formState.noOfPortions,
        categories: selectedCategoryIds,
        ingredients: formState.ingredients
          .split("\n")
          .filter(item => item),
        steps: stepsValues.val,
      }
    },
    onError(err) {
      console.log(err);
    },
    onCompleted: ({ createRecipe }) => {
      setNewPath(createRecipe.pathTitle);
      setIsCreated(true);
    }
  })

  const handleAddStep = () => {
    setStepsValues({ val: [ ...stepsValues.val, '' ]})
  }

  const handleRecipePost = () => {
    createRecipe();
  }

  const handleStepsValueChange = (e, i) => {
    let vals = [ ...stepsValues.val ];
    vals[i] = e.target.value;
    setStepsValues({ val: vals });
  }

  // Categories coming soon... ✨
  // eslint-disable-next-line no-unused-vars
  const handleCategoryChange = (e) => {
    const id = e.target.name;

    setSelectedCategoryIds(prevSelectedCategoryIds => selectedCategoryIds.includes(id)
      ? prevSelectedCategoryIds.filter(prevId => prevId !== id)
      : [ ...prevSelectedCategoryIds, id ]);
  }

  const renderStepsInputs = () => {
    return stepsValues.val.map((item, i) =>
      <textarea
        key={i}
        autoFocus={i > 1} // Only focus newly added.
        className="recipe-input"
        value={item || ''}
        onChange={(e) => handleStepsValueChange(e, i)}
        placeholder={`Steg ${i + 1}`}
      />
    );
  }

  if (!authToken) {
    return <Redirect to="/" />
  }

  if (isCreated) {
    return <Redirect to={`/recept/${newPath}`} />
  }

  return (
    <div className="add-new-container">
      <h2>Lägg till nytt recept</h2>
      {/* <Categories onCategoryCheck={handleCategoryChange} /> */}

      <input
        className="recipe-input recipe-input--big"
        value={formState.title}
        onChange={(e) =>
          setFormState({
            ...formState,
            title: e.target.value
          })
        }
        type="text"
        placeholder="Titel"
      />

      <div className="source-and-portions-container">
        <input
          className="recipe-input recipe-input--small"
          value={formState.source}
          onChange={(e) =>
            setFormState({
              ...formState,
              source: e.target.value
            })
          }
          type="text"
          placeholder="Länk till original"
        />

        <input
          className="recipe-input recipe-input--small"
          value={formState.noOfPortions}
          onChange={(e) =>
            setFormState({
              ...formState,
              noOfPortions: e.target.value
            })
          }
          type="number"
          placeholder="Antal portioner"
        />
      </div>

      <div className="textarea-container">
        <div className="ingredients-container">
          <textarea
            className="recipe-input"
            value={formState.ingredients}
            onChange={(e) =>
              setFormState({
                ...formState,
                ingredients: e.target.value
              })
            }
            placeholder="Ingredienser"
          />
        </div>

        <div className="steps-container">
          { renderStepsInputs() }

          <button
            className="button border-button border-button--medium add-step-button"
            type="button"
            onClick={handleAddStep}
          >
            Lägg till steg <span>➕</span>
          </button>
        </div>
      </div>

      <button
        className="button border-button border-button--big post-button"
        type="button"
        onClick={handleRecipePost}
      >
        Klar! <span>✔️</span>
      </button>
    </div>
  );
};

export default AddNew;