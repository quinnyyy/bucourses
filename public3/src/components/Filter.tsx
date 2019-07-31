import * as React from "react";
import * as $ from 'jquery';

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

const dropdownListStyle: any = {
    height: '300px',
    overflowX: 'hidden',
    position: "absolute", 
    willChange: "transform",
    top: "0px", 
    left: "0px", 
    transform: "translate3d(0px,38px,0px)"
};

export class Filter extends React.Component<{},{}> {

    componentDidMount() {
        // This stuff prevents the dropdown from closing after you check a box. Don't know how to do it
        // without Jquery unfortunately..
        $('.dropdown-menu').on('click', function(e: JQuery.Event) {
            e.stopPropagation();
        });
    }

    render() {
        return (
            <div>
                Filter
                <br/>
                <div className="btn-group">
                    <button type="button" className="btn btn-primary dropdown-toggle" data-toggle="dropdown" 
                    aria-haspopup="true" aria-expanded="false">
                        Filter by College...
                    </button>
                    <div className="dropdown-menu" x-placement="bottom-start" style={dropdownListStyle}>
                        <ul style={{listStyle : "none"}}>
                            {
                            Colleges.map( (college, i) => {
                                return (
                                    <li className="custom-control custom-checkbox dropdown-item" key={i}>
                                        <input type="checkbox" className="custom-control-input" id={"customCheck" + i}/>
                                        <label className="custom-control-label" htmlFor={"customCheck" + i}>{college}</label>
                                    </li>
                                )
                            })
                            }
                        </ul>
                    </div>                   
                </div>
                <br/>
                Department
                <br/>
                Credits
            </div>
        )
    }
}