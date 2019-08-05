import * as React from "react";
import { NavBar } from './NavBar';
import { Filter } from './Filter';
import { Dropdown } from "./Dropdown";
// Top level component
// State should probably be the current page we are looking at

export class App extends React.Component<{},{}> {
    
    render() {
        return (
            <React.Fragment>
                <NavBar/>
                <Dropdown options={['option 1', 'option 2', 'option 3', 'option 4', 'option 5']} identifier={'colleges-identifier'}/>
            </React.Fragment>
        )
        
    }

}