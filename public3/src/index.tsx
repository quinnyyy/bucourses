import * as React from "react";
import * as ReactDOM from "react-dom";
import '../growth/css/bootstrap4-growth.min.css'

import { Hello } from "./components/Hello";

ReactDOM.render(
    <Hello compiler="TypeScript" framework="React" />,
    document.getElementById("example")
);