import * as React from "react";
import { SingleClass } from "../types/SingleClassType";

type ClassListState = { classes : Array<SingleClass> ; isLoading : boolean};

export class ClassList extends React.Component<{},ClassListState> {
    constructor(props: {}) {
        super(props);

        this.state = {
            isLoading : true,
            classes : []
        }
    }

    componentDidMount() {
        let query : string = '/class?limit=10';
        fetch('http://localhost:3000' + query)
            .then( res => {
                if (res.ok) {
                    return res.json();
                } else {
                    throw new Error('Could not connect');
                }
            })
            .then( resJson => {
                this.setState({
                    classes : resJson,
                    isLoading : false
                })
            })
            .catch(error => {
                console.log(error);
            })
    }

    render() {
        if (this.state.isLoading) {
            return (
                <h1>Loading...</h1>
            )
        } else {
            return (
                <ul>
                    {this.state.classes.map( (classInfo : SingleClass, i : number) => {
                        return (
                            <li key={i}>{classInfo.ClassName}</li>
                        )   
                    })}
                </ul>
            )
        }
    }

}