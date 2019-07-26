import * as React from "react";
import * as ReactDOM from "react-dom";
import { Route, Link, Switch, BrowserRouter as Router } from 'react-router-dom'
import '../growth/css/bootstrap4-growth.min.css'

import { ClassInfo } from "./components/ClassInfo";
import { TestHome } from "./components/TestHome";
import { ClassSearch } from "./components/ClassSearch";

//npx webpack to run and then open index.html
//npm start runs webpack and starts server

const routing = (
    <Router>
      <div>
        <Switch>
            <Route exact path="/" component={TestHome} />
            <Route path="/search" component={ClassSearch} />
        </Switch>
      </div>
    </Router>
  )

ReactDOM.render(routing, document.getElementById("root"))