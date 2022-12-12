import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation, gql } from '@apollo/client';
import { AUTH_TOKEN } from '../constants';

const LOGIN_MUTATION = gql`
  mutation LoginMutation(
    $email: String!
    $password: String!
  ) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

const Header = () => {
  const [loginWindowOpen, handleLoginWindowOpen] = useState(false);
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const authToken = localStorage.getItem(AUTH_TOKEN);

  const [login] = useMutation(LOGIN_MUTATION, {
    variables: {
      email: emailValue,
      password: passwordValue
    },
    onCompleted: ({ login }) => {
      localStorage.setItem(AUTH_TOKEN, login.token);
      window.location.reload();
    }
  })

  const handleUsernameChange = (e) => {
    setEmailValue(e.target.value);
  }

  const handlePasswordChange = (e) => {
    setPasswordValue(e.target.value);
  }

  const handleLogin = (e) => {
    e.preventDefault();
    login();
  }

  const handleLogout = () => {
    localStorage.removeItem(AUTH_TOKEN);
    window.location.reload();
  }

  return (
    <header className="header">
      {authToken && (
        <Link to="/add-new" className="button border-button">
            Nytt recept
            <span>
              ➕
            </span>
        </Link>
      )}

      {authToken ? (
        <button onClick={handleLogout} className="button border-button">Logga ut</button>
      ) : (
        <button onClick={() => handleLoginWindowOpen(true)} className="button border-button">Logga in</button>
      )}

      {loginWindowOpen && (
        <div className="login-window">
          <form onSubmit={handleLogin}>
            <input type="text" value={emailValue} onChange={handleUsernameChange} placeholder="E-post" className="recipe-input" />
            <input type="password" value={passwordValue} onChange={handlePasswordChange} placeholder="Lösenord" className="recipe-input" />
            <input type="submit" value="Logga in" className="button border-button" />
          </form>
        </div>
      )}
    </header>
  );
};

export default Header;