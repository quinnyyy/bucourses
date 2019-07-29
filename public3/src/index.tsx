import * as React from "react";
import * as ReactDOM from "react-dom";
import { Route, Link, Switch, BrowserRouter as Router } from 'react-router-dom'
import '../growth/css/bootstrap4-growth.min.css'

import { ClassInfo } from "./components/ClassInfo";
import { TestHome } from "./components/TestHome";
import { ClassSearch } from "./components/ClassSearch";
import { NavBar } from "./components/NavBar";
import { App } from "./components/App";
import { ClassBundle } from "./components/ClassBundle";

//npx webpack to run and then open index.html
//npm start runs webpack and starts server

const routing = (
    <Router>
      <div>
            <Route path="/" component={App} />
            <Route path="/search" component={ClassBundle} />
      </div>
    </Router>
  )

ReactDOM.render(routing, document.getElementById("root"))