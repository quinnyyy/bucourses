import * as React from "react";
import * as ReactDOM from "react-dom";
import '../growth/css/bootstrap4-growth.min.css'

import { Hello } from "./components/Hello";

//npx webpack to run and then open index.html

ReactDOM.render(
    <Hello compiler="TypeScript" framework="React" />,
    document.getElementById("example")
);