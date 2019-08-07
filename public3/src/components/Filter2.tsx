import * as React from "react";

import { Dropdown } from "./Dropdown";
import { FilterContainer } from '../styles/FilterStyles';

const Colleges : Array<string> = [
    'Arts and Sciences',
    'Communication',
    'Engineering',
    'Questrom',
    'Fine Arts',
    'General Studies',
    'Sargeant',
    'Wheelock',
    'Hospitality Administration',
    'Kilachand Honors College',
    'Graduate Medical Sciences',
    'Graduate Arts and Sciences',
    'Dental Medicine',
    'Metropolitan College',
    'Law',
    'Medicine',
    'Public Health',
    'Social Work',
    'Theology'
];

const CreditOptions : Array<string> = [
    '0-1',
    '2',
    '3',
    '4',
    '5+'
]

interface checkedMap {[key: string] : boolean};
interface queryParameters {[key: string] : Array<any>};

type Filter2State = { queryObject: queryParameters };

export class Filter2 extends React.Component<{},Filter2State> {
    constructor(props: {}) {
        super(props);

        let queryObject : queryParameters = {
            Colleges : [],
            CreditOptions : []
        }

        this.state = {
            queryObject : queryObject
        }
    }

    private setQueryFromDropdown = (dropdownState : checkedMap, queryCategory : string) : void => {
        console.log('parse and fill in here :)')
    }

    /* template to remind how to do this
    private setCheckedOption = (option : string, checked : boolean) : void => {
        let updatedCheckedOptions : checkedMap = Object.assign({}, this.state.checkedOptions, {[option]: checked});
        console.log(updatedCheckedOptions);
        this.setState({checkedOptions : updatedCheckedOptions});
    }
    */

    render() {
        return (
            <div style={FilterContainer}>

                <Dropdown name="Filter by College..." options={Colleges} identifier={'college-identifier'}/>
                <Dropdown name="Filter by Credits..." options={CreditOptions} identifier={'credit-options-identifier'}/>

            </div>

        )

    }



}