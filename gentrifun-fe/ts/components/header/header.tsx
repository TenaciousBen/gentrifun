import * as React from 'react';
import logo from './logo.svg';
import './header.css';

class Header extends React.Component<{}, {}> {
  constructor() {
    super();
  }

  render() {
    return (
      <div id="header">
        <img src={logo} alt="logo" />
        <h2>Gentrifun</h2>
        <ul>
          <li>
            <a href="/">Area Selector</a>
            <a href="/overview">Overview</a>
          </li>
        </ul>
      </div>
    );
  }
}

export default Header;
