import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import data from '../assets/recipes.js';

const Home = () => {
  const [ GRID, LIST ] = ['grid', 'list'];
  //const [searchFilter, setSearchFilter] = useState('');
  const [isOrderAsc, setIsOrderAsc] = useState(true);
  const [listStyle, setListStyle] = useState(LIST);

  const handleSearchChange = (e) => {
    //setSearchFilter(e.target.value)
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
            {data.map((recipe) => (
              <li className="recipe-list-item" key={recipe.id}>
                <Link to={`/${recipe.path}`} className="button recipe-link floating-button">
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