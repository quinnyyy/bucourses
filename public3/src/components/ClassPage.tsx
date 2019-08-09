import * as React from "react";

type ClassPageState = { code : string };

export class ClassPage extends React.Component<any,ClassPageState> {
    constructor(props : any) {
        super(props);        

        this.state = {
            code : this.props.match.params.code,
        }
    }

    render() {
        return (
            <h1>{this.state.code}</h1>
        )
    }
}