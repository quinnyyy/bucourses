import * as React from "react";

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
]

export class Filter extends React.Component<{},{}> {
    render() {
        return (
            <div>
                Filter
                <br/>
                {
                    //Have to fix the id and htmlFor. Should do customCheck# so it works
                    Colleges.map( (college) => {
                        return (
                                <div className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input" id="customCheck1"/>
                                    <label className="custom-control-label" htmlFor="customCheck1">{college}</label>
                                </div>
                        )
                    })
                }
                <br/>
                Department
                <br/>
                Credits
            </div>
        )
    }
}