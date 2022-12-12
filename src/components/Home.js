import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useLazyQuery, gql } from '@apollo/client';
import _ from 'lodash';

const RECIPES_FEED_QUERY = gql`
  query RecipeFeedQuery(
    $filter: String!
    $orderBy: RecipeOrderByInput
  ) {
    recipeFeed(filter: $filter, orderBy: $orderBy) {
      id
      recipes {
        id
        createdAt
        title
        pathTitle
      }
    }
  }
`;

const Home = () => {
  const [ GRID, LIST ] = ['grid', 'list'];
  const [searchFilter, setSearchFilter] = useState('');
  const [isOrderAsc, setIsOrderAsc] = useState(true);
  const [listStyle, setListStyle] = useState(GRID);
  const [executeQuery, { data }] = useLazyQuery(
    RECIPES_FEED_QUERY,
    { fetchPolicy: 'no-cache' }
  );

  useEffect(() => {
    const orderByValue = isOrderAsc ? 'asc' : 'desc';

    executeQuery({
      variables: {
        filter: searchFilter,
        orderBy: { title: orderByValue },
      }
    })
  }, [executeQuery, searchFilter, isOrderAsc]);

  const handleSearchChange = (e) => {
    console.log('handleSearchChange');
    setSearchFilter(e.target.value)
  }

  const debouncedSearchChangeHandler = useMemo(
    () => _.debounce(handleSearchChange, 300),
  []);

  const toggleOrderBy = () => {
    setIsOrderAsc(!isOrderAsc)
  }

  const toggleListStyle = () => {
    const newListStyle = listStyle === GRID ? LIST : GRID;
    setListStyle(newListStyle);
  }

  return (
    <div className="home">
      <div className="list-tools">
        <div className="list-tools-col--wide">
          <span className="search-icon">
            <input
              type="text"
              className="recipe-input search-input"
              onChange={debouncedSearchChangeHandler}
            />
          </span>
        </div>

        <div className="list-tools-col">
          <button
            className="button floating-button list-tool-button list-tool-button--order"
            onClick={toggleOrderBy}
          >
            <span className={`icon ${isOrderAsc ? 'isAsc' : ''}`} />
          </button>
        </div>

        <div className="list-tools-col">
          <button
            className="button floating-button list-tool-button list-tool-button--list-style"
            onClick={toggleListStyle}
          >
            <span className={`icon ${listStyle === GRID ? 'isGrid' : ''}`} />
          </button>
        </div>
      </div>

      <ul className={`recipe-list ${listStyle}`}>
        {data && (
          <>
            {data.recipeFeed.recipes.map((recipe) => (
              <li className="recipe-list-item" key={recipe.id}>
                <Link to={`/recept/${recipe.pathTitle}`} className="button recipe-link floating-button">
                  <h2>{recipe.title}</h2>
                </Link>
              </li>
            ))}
          </>
        )}
      </ul>
    </div>
  );
};

export default Home;