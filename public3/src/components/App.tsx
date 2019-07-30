import * as React from "react";
import { NavBar } from './NavBar';
import { Filter } from './Filter';
// Top level component
// State should probably be the current page we are looking at

export class App extends React.Component<{},{}> {
    
    render() {
        return (
            <React.Fragment>
                <NavBar/>
                <Filter/>
            </React.Fragment>
        )
        
    }

}