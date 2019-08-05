import * as React from "react";

import { Dropdown } from "./Dropdown";

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

export class Filter2 extends React.Component<{},{}> {

    render() {
        return (
            <div>

                <Dropdown name="Filter by College..." options={Colleges} identifier={'college-identifier'}/>
                <Dropdown name="Filter by Credits..." options={CreditOptions} identifier={'credit-options-identifier'}/>

            </div>

        )

    }



}