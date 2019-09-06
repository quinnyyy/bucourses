import * as React from "react";

import { Dropdown } from "./Dropdown";
import { SingleClass } from "../types/SingleClassType";
import { FilterContainer } from '../styles/FilterStyles';
import { string } from "prop-types";

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
type Filter2Props = { callback : ( newCurrentSelections : Array<SingleClass> ) => void};

export class Filter2 extends React.Component<Filter2Props,Filter2State> {
    constructor(props: Filter2Props) {
        super(props);

        let queryObject : queryParameters = {
            College : [],
            Credits : [],
            CreditsMin: []
        }

        this.state = {
            queryObject : queryObject
        }
    }

    private setQueryFromDropdown = (dropdownState : checkedMap, queryCategory : string) : void => {
        let newQuery : string[] = [];
        Object.keys(dropdownState).forEach( (college) => {
            if (dropdownState[college] == true) {
                newQuery.push(college);
            }
        });

        let updatedQueryObject : queryParameters = Object.assign({}, this.state.queryObject, {[queryCategory]: newQuery});
        this.setState({ queryObject : updatedQueryObject}, this.sendGetRequest);
    }

    private setQueryFromDropdownCredits = (dropdownState : checkedMap, queryCategory : string) : void => {
        let newQuery : string[] = [];
        let newQuery2 : string[] = [];
        Object.keys(dropdownState).forEach( (creditOption) => {
            if (dropdownState[creditOption] == true) {
                if (creditOption == '5+') {
                    newQuery2.push('5');
                }
                else if (creditOption == '0-1') {
                    newQuery.push('0');
                    newQuery.push('1');
                }
                else {
                    newQuery.push(creditOption);
                }
            }
        });
        let updatedQueryObject : queryParameters = Object.assign({}, this.state.queryObject, {[queryCategory]: newQuery, ['CreditsMin']: newQuery2});
        this.setState({ queryObject: updatedQueryObject}, this.sendGetRequest);
        console.log(this.getParameterString("CreditsMin"));
        console.log(this.getParameterString("Credits"));
    }

    private getParameterString = (Parameter : string) : string => {
        let ParameterString : string = "";
        this.state.queryObject[Parameter].forEach( (element : string) => {
            ParameterString += ('&' + Parameter.toLowerCase() + '=' + element);
        })
        return ParameterString;
    }

    private sendGetRequest = () : void => {
        let host : string = 'http://localhost:3000';
        let query : string = '/class?limit=100';
        //let query : string = '/class?limit=10' + this.getParameterString('College');
        Object.keys(this.state.queryObject).forEach(parameter => {
            query += this.getParameterString(parameter);
        });
        fetch(host + query)
            .then( res => {
                if(res.ok) {
                    return res.json();
                } else {
                    throw new Error('Could not connect');
                }
            })
            .then( resJson => {
                this.props.callback(resJson);
            })
            .catch(error => {
                console.log(error);
            })
    }

    render() {
        return (
            <div style={FilterContainer}>
                <Dropdown name="Filter by College..." options={Colleges} identifier={'College'} propogateState={this.setQueryFromDropdown}/>
                <Dropdown name="Filter by Credits..." options={CreditOptions} identifier={'Credits'} propogateState={this.setQueryFromDropdownCredits}/>
            </div>
        )
    }



}