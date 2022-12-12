import React from 'react';
import { useQuery, gql } from '@apollo/client';
import LoadingSpinner from './LoadingSpinner';

const CATEGORIES_QUERY = gql`
  query CategoriesQuery {
    categories {
      id
      name
    }
  }
`;

const Categories = ({ onCategoryCheck }) => {
  const { loading, error, data } = useQuery(CATEGORIES_QUERY);

  if (loading) return <LoadingSpinner />;
  if (error) return `Error! ${error.message}`;

  return (
    <ul>
      {data.categories.map(category => (
        <li key={category.id}>
          <label>
            {category.name}
            <input
              name={category.id}
              type="checkbox"
              onChange={onCategoryCheck} />
          </label>
        </li>
      ))}
    </ul>
  );
};

export default Categories;
