/* eslint-disable import/no-named-as-default */
import { NavLink, Route, Switch } from 'react-router-dom';

import HomePage from './HomePage';
import NotFoundPage from './NotFoundPage';
import BackgroundPage from './BackgroundPage';
import OcrAppPage from './OcrAppPage';
import OpenProjectsPage from './OpenProjects';

import PropTypes from 'prop-types';
import React from 'react';
import { hot } from 'react-hot-loader';

// This is a class-based component because the current
// version of hot reloading won't hot reload a stateless
// component at the top-level.

class App extends React.Component {
  render() {
    return (
      <div>
        <div>
          <NavLink to="/background">Explore Work History</NavLink>
          {' | '}
          <NavLink to="/ocr-app">Try App</NavLink>
          {' | '}
          <NavLink to="/open-projects">View Code</NavLink>
        </div>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/background" component={BackgroundPage} />
          <Route path="/background/:id" component={BackgroundPage} />
          <Route path="/ocr-app" component={OcrAppPage} />
          <Route path="/open-projects" component={OpenProjectsPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.element,
};

export default hot(module)(App);
