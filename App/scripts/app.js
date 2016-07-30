import React from 'react';
import ReactDOM from 'react-dom';
import { IndexRoute, Router, Route } from 'react-router'

import AppHeader from './Components/Header';

// Views
import Home from './Views/Home';
import About from './Views/About';
import Contact from './Views/Contact';

var routes = (
  <Route path="/" component={AppHeader}>
    <IndexRoute component={Home} />
    <Route path="about" component={About}/>
    <Route path="contact" component={Contact}/>
  </Route>
);

ReactDOM.render(<Router>{routes}</Router>, document.body);
