import * as React from "react";
import * as ReactDOM from "react-dom";
import { Route, Link, Switch, BrowserRouter as Router } from 'react-router-dom'
import '../growth/css/bootstrap4-growth.min.css'
import 'bootstrap/dist/js/bootstrap.min.js';

import { ClassInfo } from "./components/ClassInfo";
import { TestHome } from "./components/TestHome";
import { ClassSearch } from "./components/ClassSearch";
import { NavBar } from "./components/NavBar";
import { App } from "./components/App";
import { ClassBundle } from "./components/ClassBundle";
<<<<<<< HEAD
import { Authentication } from "./components/Authentication";
=======
import { ClassPage } from './components/ClassPage';
import { ClassTopLevel } from "./components/ClassTopLevel";
>>>>>>> 1a4fe2c0b5749daead675cb8c1af837aa3ce3d1a

//npx webpack to run and then open index.html
//npm start runs webpack and starts server

const routing = (
  
    <Router>
      <div>
<<<<<<< HEAD
            <Route path="/auth" component={Authentication} />
            <Route path="/" component={App} />
            <Route path="/search" component={ClassBundle} />
=======
        <NavBar/>
        <Switch>
          <Route path="/class/:code" component={ClassPage}/>
          <Route path="/" component={ClassTopLevel} />
        </Switch>
>>>>>>> 1a4fe2c0b5749daead675cb8c1af837aa3ce3d1a
      </div>
    </Router>
    
)

ReactDOM.render(routing, document.getElementById("root"))